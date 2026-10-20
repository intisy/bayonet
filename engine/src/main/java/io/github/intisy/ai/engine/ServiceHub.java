package io.github.intisy.ai.engine;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * The live service registry a host shares between every plugin it loads.
 *
 * @implNote get is for optional use, want for an awaited arrival and watch for churn. That triple is
 * what lets a plugin be installed, enabled, disabled and updated at runtime while its consumers keep
 * working, at any ecosystem size.
 */
public final class ServiceHub {

    /** Where the host records who provides and who consumes what. */
    public interface Recorder {
        /**
         * @param pluginId the plugin that registered the service
         * @param serviceId the service id it registered
         */
        void provided(String pluginId, String serviceId);

        /**
         * @param pluginId the plugin that consumed the service
         * @param serviceId the service id it consumed
         */
        void consumed(String pluginId, String serviceId);
    }

    /** Called when a watched service arrives or goes away. */
    public interface Listener {
        /**
         * @param service the service that was registered, or null when {@code registered} is false
         * @param registered true when the service was just registered, false when it was just unregistered
         */
        void changed(Object service, boolean registered);
    }

    /** One plugin's view of the registry, which is what stamps and enforces its namespace. */
    public interface Registry {
        /**
         * @param id the service id to look up
         * @return the registered service, or null when nothing provides it
         */
        Object get(String id);

        /**
         * @param id the service id to await
         * @return a value that settles once the service is registered; never times out
         */
        Pending<Object> want(String id);

        /**
         * @param id the service id to await
         * @param timeoutMillis how long to wait before rejecting, in milliseconds
         * @return a value that settles once the service is registered, or rejects when the timeout elapses first
         */
        Pending<Object> want(String id, long timeoutMillis);

        /**
         * @param id the service id to watch
         * @param listener called each time the service is registered or unregistered
         * @return a handle that stops the watch when cancelled
         */
        Scheduler.Cancellable watch(String id, Listener listener);

        /**
         * @param id the service id to register, which must be namespaced to this plugin unless it is a well-known id
         * @param service this plugin's implementation to register
         * @return a handle that unregisters the service when cancelled
         */
        Scheduler.Cancellable register(String id, Object service);

        /**
         * @param id the service id to register, which must be namespaced to this plugin unless it is a well-known id
         * @param provider what answers for the service: its live attributes, and whether it serves a constrained ask
         * @param advertised what the service claims until the provider reports otherwise, or null when it claims nothing
         * @return a handle that unregisters the service when cancelled
         */
        Scheduler.Cancellable register(String id, ServiceProvider provider, Map<String, Double> advertised);

        /**
         * Waits for a service that satisfies this requirement's constraints, re-asking until the
         * budget is spent and then degrading with a report or refusing.
         *
         * @param requirement what the plugin asks for, and what a shortfall costs it
         * @param budget how long to keep re-asking, and how often
         * @return a value that settles with the service, or rejects when the budget is spent and the requirement is not degradable
         */
        Pending<Object> want(ServiceRequirement requirement, Budget budget);

        /** @return every currently registered service id */
        List<String> ids();
    }

    /** One registration: who owns it, who answers for it, and what its declaration claimed. */
    static final class Entry {
        private final String pluginId;
        private final String serviceId;
        private final ServiceProvider provider;
        private final Map<String, Double> advertised;
        private final List<Object> served = new ArrayList<Object>();
        private final List<Handles.Handle> handed = new ArrayList<Handles.Handle>();
        private boolean withdrawn;

        Entry(String pluginId, String serviceId, ServiceProvider provider, Map<String, Double> advertised) {
            this.pluginId = pluginId;
            this.serviceId = serviceId;
            this.provider = provider;
            this.advertised = advertised == null
                    ? Collections.<String, Double>emptyMap()
                    : Collections.unmodifiableMap(new LinkedHashMap<String, Double>(advertised));
        }

        ServiceProvider getProvider() {
            return provider;
        }

        Map<String, Double> getAdvertised() {
            return advertised;
        }

        /**
         * @implNote Asked for rather than held, because a provider may serve a different instance
         * to a differently constrained consumer. A plain registration answers the same object
         * every time, which is what {@link ServiceProviders#constant} is for.
         */
        Object unconstrained(Handles handles) {
            return serve(handles, Collections.<String, Double>emptyMap());
        }

        /**
         * @implNote One handle per INSTANCE, not per lookup. Every instance handed out is
         * remembered, because withdrawal has to reach the consumers already holding one and a
         * provider may have served each of them differently; wrapping afresh on every lookup would
         * also break the identity a lookup used to have, since two wrappers over one service are
         * equal to neither each other nor it.
         * @implNote Re-checked after the provider answers, because a provider is plugin code and
         * may withdraw the registration while it is being asked. A handle minted into a withdrawn
         * entry would be held by a consumer and revocable by nobody.
         */
        Object serve(Handles handles, Map<String, Double> constraints) {
            if (withdrawn) {
                return null;
            }
            Object instance = provider.serviceFor(constraints);
            if (instance == null) {
                return null;
            }
            Handles.Handle known = handleFor(instance);
            if (known != null) {
                return known.get();
            }
            Handles.Handle handle = handles.around(serviceId, instance);
            if (withdrawn) {
                handle.revoke();
                return null;
            }
            served.add(instance);
            handed.add(handle);
            return handle.get();
        }

        private Handles.Handle handleFor(Object instance) {
            for (int index = 0; index < served.size(); index++) {
                if (served.get(index) == instance) {
                    return handed.get(index);
                }
            }
            return null;
        }

        void revokeAll() {
            withdrawn = true;
            for (Handles.Handle handle : handed) {
                handle.revoke();
            }
            handed.clear();
            served.clear();
        }
    }

    private static final class Waiter {
        private final String pluginId;
        private final Pending<Object> settled;
        private Scheduler.Cancellable timer;

        Waiter(String pluginId, Pending<Object> settled) {
            this.pluginId = pluginId;
            this.settled = settled;
        }
    }

    private final Scheduler scheduler;
    private final Recorder recorder;
    private final Map<String, Entry> entries = new LinkedHashMap<String, Entry>();
    private final Map<String, Set<Waiter>> waiters = new LinkedHashMap<String, Set<Waiter>>();
    private final Map<String, Set<Listener>> watchers = new LinkedHashMap<String, Set<Listener>>();
    private final Map<String, List<Scheduler.Cancellable>> watching = new LinkedHashMap<String, List<Scheduler.Cancellable>>();
    private final Map<String, List<ConstrainedWant>> constrainedWants = new LinkedHashMap<String, List<ConstrainedWant>>();
    private List<String> wellKnown = new ArrayList<String>();
    private ConstraintVocabulary vocabulary = ConstraintVocabulary.EMPTY;
    private Handles handles = Handles.UNWRAPPED;

    // No plugin can own this, because a manifest id is never empty, which is what keeps a host's own
    // service out of every per-plugin sweep.
    private static final String HOST_OWNER = "";

    /**
     * @param scheduler the timer source used to expire an unmet {@code want}; null falls back to {@link Scheduler#NEVER}
     * @param recorder where registrations and consumptions are reported, or null to report nowhere
     */
    public ServiceHub(Scheduler scheduler, Recorder recorder) {
        this.scheduler = scheduler == null ? Scheduler.NEVER : scheduler;
        this.recorder = recorder;
    }

    /**
     * The bare ids any plugin may register, because they name a CONTRACT rather than one plugin's own
     * offering.
     *
     * @param ids the bare service ids any plugin may register, replacing any set previously; null or empty means none
     * @implNote Set by the host rather than held as a constant, because this package mints no
     * vocabulary. A hub told nothing treats every bare id as squatting.
     */
    public void wellKnown(List<String> ids) {
        this.wellKnown = ids == null ? new ArrayList<String>() : new ArrayList<String>(ids);
    }

    /**
     * The constraint names this host understands, which is what a constrained want is matched with.
     *
     * @param declared the vocabulary, or null for none, under which every constraint is unknown
     * @implNote Set by the host for the reason {@link #wellKnown} is: this package mints no
     * vocabulary, and a constraint it cannot find in one is refused rather than waved through.
     */
    public void constraintVocabulary(ConstraintVocabulary declared) {
        this.vocabulary = declared == null ? ConstraintVocabulary.EMPTY : declared;
    }

    ConstraintVocabulary constraintVocabulary() {
        return vocabulary;
    }

    /**
     * How a served service is wrapped so a consumer still holding one is told when it is withdrawn.
     *
     * @param backing the wrapping to use, or null for the portable one that reports that it cannot
     * @implNote Set by the host because the answer is platform-specific: a JVM host wraps with a
     * dynamic proxy, a JavaScript one with the language's own Proxy, and a host that supplies
     * neither is told what it is giving up rather than left to assume it has it.
     */
    public void handles(Handles backing) {
        this.handles = backing == null ? Handles.UNWRAPPED : backing;
    }

    Handles handles() {
        return handles;
    }

    Scheduler scheduler() {
        return scheduler;
    }

    Entry entryOf(String id) {
        return entries.get(id);
    }

    /**
     * @param pluginId the plugin the returned registry is scoped to
     * @return a registry that attributes this plugin's own registrations, reads and consumptions to it
     */
    public Registry forPlugin(final String pluginId) {
        return new Registry() {
            @Override
            public Object get(String id) {
                consumed(pluginId, id);
                Entry entry = entries.get(id);
                return entry == null ? null : entry.unconstrained(handles);
            }

            @Override
            public Pending<Object> want(String id) {
                return awaitService(pluginId, id, null);
            }

            @Override
            public Pending<Object> want(String id, long timeoutMillis) {
                return awaitService(pluginId, id, Long.valueOf(timeoutMillis));
            }

            @Override
            public Scheduler.Cancellable watch(String id, Listener listener) {
                return addWatcher(pluginId, id, listener);
            }

            @Override
            public Scheduler.Cancellable register(String id, Object service) {
                return addService(pluginId, id, ServiceProviders.constant(service), null);
            }

            @Override
            public Scheduler.Cancellable register(String id, ServiceProvider provider, Map<String, Double> advertised) {
                return addService(pluginId, id, provider, advertised);
            }

            @Override
            public Pending<Object> want(ServiceRequirement requirement, Budget budget) {
                consumed(pluginId, requirement.getId());
                return awaitUnderConstraints(pluginId, requirement, budget);
            }

            @Override
            public List<String> ids() {
                return ServiceHub.this.ids();
            }
        };
    }

    /**
     * Registers a service the HOST supplies rather than a plugin.
     *
     * @param id the service id to register it under
     * @param service the host's own service implementation
     * @implNote Owned by no plugin, so quarantining or deactivating one never takes it away, and it
     * is exempt from the namespacing rule a plugin registration is held to: the ids a host offers
     * are ones it defines rather than ones it is claiming from a shared space. Registering the same
     * id twice replaces it, because a host wiring itself up twice is a restart, not a conflict,
     * and the handles over the one it replaces are revoked for the same reason: a consumer still
     * holding the old instance is holding something the host has stopped offering.
     */
    public void hostService(String id, Object service) {
        Entry replaced = entries.get(id);
        if (replaced != null) {
            replaced.revokeAll();
        }
        entries.put(id, new Entry(HOST_OWNER, id, ServiceProviders.constant(service), null));
        announceArrival(id);
    }

    /**
     * The service now, or null, without attributing the read to a plugin.
     *
     * @param id the service id to look up
     * @return the registered service, or null when nothing provides it
     */
    public Object get(String id) {
        Entry entry = entries.get(id);
        return entry == null ? null : entry.unconstrained(handles);
    }

    /** @return every currently registered service id */
    public List<String> ids() {
        return new ArrayList<String>(entries.keySet());
    }

    /**
     * Unregisters everything a plugin registered, stops the watchers it installed, and rejects the
     * want calls it is still waiting on, so a deactivated or quarantined plugin is inert.
     *
     * @param pluginId the plugin to release
     */
    public void releasePlugin(String pluginId) {
        List<ConstrainedWant> constrained = constrainedWants.remove(pluginId);
        if (constrained != null) {
            for (ConstrainedWant want : constrained) {
                want.stop();
            }
        }

        List<Scheduler.Cancellable> owned = watching.get(pluginId);
        if (owned != null) {
            for (Scheduler.Cancellable stop : new ArrayList<Scheduler.Cancellable>(owned)) {
                stop.cancel();
            }
        }
        watching.remove(pluginId);

        for (Map.Entry<String, Entry> registered : new ArrayList<Map.Entry<String, Entry>>(entries.entrySet())) {
            if (registered.getValue().pluginId.equals(pluginId)) {
                unregister(pluginId, registered.getKey());
            }
        }

        Iterator<Map.Entry<String, Set<Waiter>>> pending = waiters.entrySet().iterator();
        while (pending.hasNext()) {
            Map.Entry<String, Set<Waiter>> waiting = pending.next();
            for (Waiter waiter : new ArrayList<Waiter>(waiting.getValue())) {
                if (!waiter.pluginId.equals(pluginId)) {
                    continue;
                }
                waiting.getValue().remove(waiter);
                if (waiter.timer != null) {
                    waiter.timer.cancel();
                }
                waiter.settled.reject(stoppedWaiting(pluginId, waiting.getKey()));
            }
            if (waiting.getValue().isEmpty()) {
                pending.remove();
            }
        }
    }

    private Scheduler.Cancellable addService(final String pluginId, final String id,
                                             ServiceProvider provider, Map<String, Double> advertised) {
        if (!mayRegister(pluginId, id)) {
            String name = id.contains(":") ? id.substring(id.lastIndexOf(':') + 1) : id;
            throw new PluginException(pluginId,
                    "cannot register service \"" + id + "\", which belongs to another plugin",
                    "namespace it as \"" + pluginId + ":" + name + "\", or register one of the well-known ids: " + join(wellKnown));
        }
        Entry existing = entries.get(id);
        if (existing != null) {
            throw new PluginException(pluginId,
                    "service \"" + id + "\" is already registered by " + existing.pluginId,
                    "disable one of the two plugins, or have each register its own namespaced id so consumers can ask for the one they want");
        }
        entries.put(id, new Entry(pluginId, id, provider, advertised));
        provided(pluginId, id);
        announceArrival(id);
        return new Scheduler.Cancellable() {
            @Override
            public void cancel() {
                unregister(pluginId, id);
            }
        };
    }

    /**
     * Tells whoever is waiting for this id that it is there now, through the same handle a lookup
     * would hand them.
     *
     * @implNote The instance is asked for only when somebody is listening: {@link
     * Entry#unconstrained} is a call into the provider, and a registration nobody is waiting on
     * must not look to that provider like a consumer arriving.
     * @implNote A provider that will not serve an unconstrained ask has not ARRIVED for a plain
     * waiter or watcher, so neither is told: resolving a want with null would be
     * indistinguishable from success at the call site, and a watcher told "registered" with
     * nothing to hand over is the same lie in the other direction. The registration itself stands,
     * and a constrained want still finds it.
     */
    private void announceArrival(String id) {
        boolean watched = watchers.get(id) != null && !watchers.get(id).isEmpty();
        boolean awaited = waiters.get(id) != null && !waiters.get(id).isEmpty();
        Object service = watched || awaited ? entries.get(id).unconstrained(handles) : null;
        if (service == null) {
            return;
        }
        Set<Waiter> pending = waiters.remove(id);
        if (pending != null) {
            for (Waiter waiter : pending) {
                if (waiter.timer != null) {
                    waiter.timer.cancel();
                }
                waiter.settled.resolve(service);
            }
        }
        notifyWatchers(id, service, true);
    }

    private void unregister(String pluginId, String id) {
        Entry entry = entries.get(id);
        if (entry == null || !entry.pluginId.equals(pluginId)) {
            return;
        }
        entries.remove(id);
        entry.revokeAll();
        notifyWatchers(id, null, false);
    }

    /**
     * @implNote A Pending nobody watched is inert, so a want whose caller dropped it needs no guard.
     * The JavaScript boundary is where that stops being true, and it attaches the catch there.
     */
    private Pending<Object> awaitService(final String pluginId, final String id, Long timeoutMillis) {
        consumed(pluginId, id);
        Entry entry = entries.get(id);
        Object now = entry == null ? null : entry.unconstrained(handles);
        if (now != null) {
            return Pending.of(now);
        }
        Pending<Object> settled = new Pending<Object>();
        final Waiter waiter = new Waiter(pluginId, settled);
        if (timeoutMillis != null) {
            final long millis = timeoutMillis.longValue();
            waiter.timer = scheduler.schedule(new Runnable() {
                @Override
                public void run() {
                    Set<Waiter> pending = waiters.get(id);
                    if (pending != null) {
                        pending.remove(waiter);
                    }
                    waiter.settled.reject(new PluginException(pluginId,
                            "waited " + millis + "ms for service \"" + id + "\" and nothing registered it",
                            "install a plugin that provides \"" + id + "\", or use get() and carry on without it"));
                }
            }, millis);
        }
        Set<Waiter> pending = waiters.get(id);
        if (pending == null) {
            pending = new LinkedHashSet<Waiter>();
            waiters.put(id, pending);
        }
        pending.add(waiter);
        return settled;
    }

    /**
     * @implNote Tracked per plugin so {@link #releasePlugin} can end it. A constrained want spends
     * its budget in scheduled ticks that call into providers, so one left running on behalf of a
     * stopped plugin keeps asking for minutes and can resolve into a plugin that no longer exists.
     */
    private Pending<Object> awaitUnderConstraints(String pluginId, ServiceRequirement requirement, Budget budget) {
        ConstrainedWant want = new ConstrainedWant(this, pluginId, requirement, budget);
        List<ConstrainedWant> running = constrainedWants.get(pluginId);
        if (running == null) {
            running = new ArrayList<ConstrainedWant>();
            constrainedWants.put(pluginId, running);
        }
        running.add(want);
        return want.start();
    }

    private Scheduler.Cancellable addWatcher(String pluginId, String id, final Listener listener) {
        consumed(pluginId, id);
        Set<Listener> listeners = watchers.get(id);
        if (listeners == null) {
            listeners = new LinkedHashSet<Listener>();
            watchers.put(id, listeners);
        }
        final Set<Listener> installed = listeners;
        installed.add(listener);
        return tracked(pluginId, new Scheduler.Cancellable() {
            @Override
            public void cancel() {
                installed.remove(listener);
            }
        });
    }

    private Scheduler.Cancellable tracked(final String pluginId, final Scheduler.Cancellable dispose) {
        final boolean[] done = new boolean[1];
        final Scheduler.Cancellable[] self = new Scheduler.Cancellable[1];
        self[0] = new Scheduler.Cancellable() {
            @Override
            public void cancel() {
                if (done[0]) {
                    return;
                }
                done[0] = true;
                dispose.cancel();
                List<Scheduler.Cancellable> owned = watching.get(pluginId);
                if (owned == null) {
                    return;
                }
                owned.remove(self[0]);
                if (owned.isEmpty()) {
                    watching.remove(pluginId);
                }
            }
        };
        List<Scheduler.Cancellable> owned = watching.get(pluginId);
        if (owned == null) {
            owned = new ArrayList<Scheduler.Cancellable>();
            watching.put(pluginId, owned);
        }
        owned.add(self[0]);
        return self[0];
    }

    /**
     * @implNote A watcher that throws is reported and iteration continues, because one bad consumer
     * must not stop the others from hearing about a registration. A watcher removed during the
     * iteration is skipped rather than called.
     */
    private void notifyWatchers(String id, Object service, boolean registered) {
        Set<Listener> listeners = watchers.get(id);
        if (listeners == null) {
            return;
        }
        for (Listener listener : new ArrayList<Listener>(listeners)) {
            if (!listeners.contains(listener)) {
                continue;
            }
            try {
                listener.changed(service, registered);
            } catch (RuntimeException failure) {
                Diagnostics.report("a watcher of \"" + id + "\" threw while handling "
                        + (registered ? "register" : "unregister") + ": " + failure);
            }
        }
    }

    private boolean mayRegister(String pluginId, String serviceId) {
        if (wellKnown.contains(serviceId)) {
            return true;
        }
        int separator = serviceId.indexOf(':');
        if (separator <= 0 || separator == serviceId.length() - 1) {
            return false;
        }
        return serviceId.substring(0, separator).equals(pluginId);
    }

    static PluginException stoppedWaiting(String pluginId, String id) {
        return new PluginException(pluginId,
                "stopped while waiting for service \"" + id + "\"",
                "provide \"" + id + "\" before this plugin is stopped, or use get() and carry on without it");
    }

    private void provided(String pluginId, String serviceId) {
        if (recorder != null) {
            recorder.provided(pluginId, serviceId);
        }
    }

    private void consumed(String pluginId, String serviceId) {
        if (recorder != null) {
            recorder.consumed(pluginId, serviceId);
        }
    }

    private static String join(List<String> values) {
        StringBuilder out = new StringBuilder();
        for (int index = 0; index < values.size(); index++) {
            if (index > 0) {
                out.append(", ");
            }
            out.append(values.get(index));
        }
        return out.toString();
    }
}
