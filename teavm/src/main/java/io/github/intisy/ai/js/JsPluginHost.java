package io.github.intisy.ai.js;

import io.github.intisy.ai.api.Api;
import io.github.intisy.ai.engine.CapabilityRecord;
import io.github.intisy.ai.engine.EventBus;
import io.github.intisy.ai.engine.LedgerEntry;
import io.github.intisy.ai.engine.ManifestFacts;
import io.github.intisy.ai.engine.PluginException;
import io.github.intisy.ai.engine.PluginHost;
import io.github.intisy.ai.engine.PluginSession;
import io.github.intisy.ai.engine.PluginStatus;
import io.github.intisy.ai.engine.Pending;
import io.github.intisy.ai.engine.Scheduler;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.teavm.jso.JSBody;
import org.teavm.jso.JSFunctor;
import org.teavm.jso.JSObject;
import org.teavm.jso.core.JSArray;
import org.teavm.jso.core.JSPromise;
import org.teavm.jso.function.JSConsumer;

/**
 * @implNote Shape only. Every decision this class appears to make is the engine's: it converts a
 * status enum to the lower-case string a surface renders ({@link #lower}), a boolean to the
 * "register"/"unregister" string a service watcher renders ({@link #serviceEvent}), a Pending to a
 * Promise, a Java list to a JSArray, a PluginException to a marked JavaScript Error, and an absent
 * Java null to the JavaScript undefined a missing value actually is ({@link #orUndefined}). A branch
 * here that is not one of those six conversions belongs in
 * {@link io.github.intisy.ai.engine.PluginHost} instead.
 *
 * <p>A capability implementation and a service travel as opaque JSObject and are handed back by
 * identity, never rebuilt, because a plugin's implementation is a live object with methods and a copy
 * of it would be a different thing that merely looked the same.
 */
final class JsPluginHost implements JSObject {

    private JsPluginHost() {
    }

    @JSFunctor
    interface ManifestFn extends JSObject {
        JSObject call(JSObject manifest);
    }

    @JSFunctor
    interface ContextForFn extends JSObject {
        JSObject call(JSObject manifest, JsRuntime runtime);
    }

    @JSFunctor
    interface IdFn extends JSObject {
        JSObject call(String id);
    }

    @JSFunctor
    interface EntriesFn extends JSObject {
        JSObject call();
    }

    @JSFunctor
    interface RecordDeclaredFn extends JSObject {
        void call(JSObject manifest);
    }

    @JSFunctor
    interface ProvideServiceFn extends JSObject {
        void call(String id, JSObject service);
    }

    @JSFunctor
    interface MarkBrokenFn extends JSObject {
        void call(String pluginId, JSObject error);
    }

    @JSFunctor
    interface ReleaseFn extends JSObject {
        void call(String pluginId);
    }

    /** Reads the options tree {@code EngineJs.createPluginHost} already converted, and builds the host. */
    static JsPluginHost from(Object tree) {
        int api = intOr(tree, "api", Api.API_VERSION);
        List<String> surfaces = strings(member(tree, "surfaces"));
        List<String> vocabulary = strings(member(tree, "vocabulary"));
        List<String> wellKnownServices = strings(member(tree, "wellKnownServices"));
        PluginHost host = hostOf(tree, api, surfaces);
        host.knownCapabilities(vocabulary);
        host.wellKnownServices(wellKnownServices);
        return build(host);
    }

    /**
     * @implNote An absent or empty {@code applications} passes null rather than the empty list, so
     * the engine takes the home as the one application hosted: that is what every caller written
     * before the two were distinguished meant, and passing the empty list instead would silently
     * widen such a host to hosting EVERY application.
     */
    private static PluginHost hostOf(Object tree, int api, List<String> surfaces) {
        List<String> applications = strings(member(tree, "applications"));
        return new PluginHost(text(tree, "app"), applications.isEmpty() ? null : applications,
                api, surfaces, new JsScheduler());
    }

    static JsPluginHost build(final PluginHost host) {
        final JSObject descriptor = descriptorObject(host.getApp(), host.getApi(), JsJson.fromStrings(host.getSurfaces()));

        ManifestFn supports = new ManifestFn() {
            @Override
            public JSObject call(JSObject manifest) {
                ManifestFacts facts = factsOf(manifest);
                PluginException failure = host.supports(facts);
                return failure == null ? null : JsErrors.of(failure);
            }
        };
        ManifestFn verifyActivation = new ManifestFn() {
            @Override
            public JSObject call(JSObject manifest) {
                PluginException failure = host.verifyActivation(factsOf(manifest));
                return failure == null ? null : JsErrors.of(failure);
            }
        };
        ContextForFn contextFor = new ContextForFn() {
            @Override
            public JSObject call(JSObject manifest, JsRuntime runtime) {
                ManifestFacts facts = factsOf(manifest);
                EventBus bus = wrapBus(runtime.getEvents());
                PluginSession session = host.sessionFor(facts, bus);
                return JsPluginContext.build(session, runtime, descriptor);
            }
        };
        IdFn capability = new IdFn() {
            @Override
            public JSObject call(String id) {
                List<CapabilityRecord> records = host.capability(id);
                JSArray<JSObject> out = JSArray.create();
                for (int index = 0; index < records.size(); index++) {
                    CapabilityRecord record = records.get(index);
                    out.set(index, capabilityRecord(record.getPluginId(), (JSObject) record.getImplementation()));
                }
                return out;
            }
        };
        IdFn service = new IdFn() {
            @Override
            public JSObject call(String id) {
                return orUndefined((JSObject) host.service(id));
            }
        };
        ProvideServiceFn provideService = new ProvideServiceFn() {
            @Override
            public void call(String id, JSObject service) {
                host.provideService(id, service);
            }
        };
        MarkBrokenFn markBroken = new MarkBrokenFn() {
            @Override
            public void call(String pluginId, JSObject error) {
                host.markBroken(pluginId, errorOf(pluginId, error));
            }
        };
        ReleaseFn release = new ReleaseFn() {
            @Override
            public void call(String pluginId) {
                host.release(pluginId);
            }
        };
        EntriesFn entries = new EntriesFn() {
            @Override
            public JSObject call() {
                List<LedgerEntry> rows = host.getLedger().entries();
                JSArray<JSObject> out = JSArray.create();
                for (int index = 0; index < rows.size(); index++) {
                    out.set(index, ledgerRow(rows.get(index)));
                }
                return out;
            }
        };
        IdFn entry = new IdFn() {
            @Override
            public JSObject call(String pluginId) {
                LedgerEntry found = host.getLedger().entry(pluginId);
                return orUndefined(found == null ? null : ledgerRow(found));
            }
        };
        RecordDeclaredFn recordDeclared = new RecordDeclaredFn() {
            @Override
            public void call(JSObject manifest) {
                ManifestFacts facts = factsOf(manifest);
                host.getLedger().recordDeclared(facts.getId(), facts.getCapabilities(), facts.getPermissions());
            }
        };
        JSObject ledger = ledgerObject(entries, entry, recordDeclared);

        return assemble(descriptor, ledger, supports, contextFor, verifyActivation, capability, service,
                provideService, markBroken, release);
    }

    /**
     * @implNote {@code JSPromise.Resolver}/{@code Rejector} do not exist in teavm-jso-apis 0.15.0,
     * hence the {@link JSConsumer} executor shape rather than the resolve/reject objects a newer
     * TeaVM might offer.
     */
    static JSPromise<JSObject> promise(final Pending<Object> pending) {
        return guarded(new JSPromise<JSObject>(new JSPromise.Executor<JSObject>() {
            @Override
            public void onExecute(final JSConsumer<JSObject> resolve, final JSConsumer<Object> reject) {
                pending.then(new Pending.Settlement<Object>() {
                    @Override
                    public void value(Object value) {
                        resolve.accept((JSObject) value);
                    }

                    @Override
                    public void failure(PluginException reason) {
                        reject.accept(JsErrors.of(reason));
                    }
                });
            }
        }));
    }

    /**
     * @implNote A dropped {@code want} (nobody awaits or catches it) must not raise an unhandled
     * rejection and take the whole host down.
     */
    @JSBody(params = "promise", script = "promise.catch(function () {}); return promise;")
    private static native JSPromise<JSObject> guarded(JSPromise<JSObject> promise);

    private static ManifestFacts factsOf(JSObject manifestObj) {
        Object tree = JsJson.toTree(manifestObj);
        String id = text(tree, "id");
        int api = intOr(tree, "api", 0);
        List<String> capabilities = strings(member(tree, "capabilities"));
        List<String> permissions = strings(member(tree, "permissions"));
        List<String> targets = strings(member(tree, "targets"));
        return new ManifestFacts(id, api, capabilities, permissions, targets, manifestObj);
    }

    private static PluginException errorOf(String pluginId, JSObject error) {
        Object tree = JsJson.toTree(error);
        return new PluginException(pluginId, text(tree, "detail"), text(tree, "fix"));
    }

    private static EventBus wrapBus(final JsRuntime.Bus bus) {
        return new EventBus() {
            @Override
            public void publish(String topic, Object payload) {
                bus.publish(topic, (JSObject) payload);
            }

            @Override
            public Scheduler.Cancellable subscribe(String topic, final EventBus.Listener listener) {
                final JsRuntime.Disposer disposer = bus.subscribe(topic, new JsRuntime.Listener() {
                    @Override
                    public void received(JSObject payload) {
                        listener.received(payload);
                    }
                });
                return new Scheduler.Cancellable() {
                    @Override
                    public void cancel() {
                        disposer.dispose();
                    }
                };
            }
        };
    }

    private static String lower(PluginStatus status) {
        if (status == PluginStatus.ACTIVE) {
            return "active";
        }
        if (status == PluginStatus.BROKEN) {
            return "broken";
        }
        if (status == PluginStatus.STOPPED) {
            return "stopped";
        }
        return "activating";
    }

    /** The other named mapping table, beside {@link #lower}: what a service watcher's event string reads. */
    static String serviceEvent(boolean registered) {
        return registered ? "register" : "unregister";
    }

    /**
     * @implNote A Java null reference crosses to JavaScript as {@code null}, but several members
     * (a missing service, a missing ledger entry, the service a watcher sees on unregister) are
     * declared absent rather than null, and an absence in JavaScript is {@code undefined} rather
     * than {@code null}. This is the one place that difference
     * is corrected, rather than leaving every caller to tell {@code null} and {@code undefined} apart.
     */
    @JSBody(params = "value", script = "return value === null ? undefined : value;")
    static native JSObject orUndefined(JSObject value);

    private static JSObject ledgerRow(LedgerEntry entry) {
        return ledgerRowObject(entry.getPluginId(), lower(entry.getStatus()),
                JsJson.fromStrings(entry.getCapabilitiesDeclared()), JsJson.fromStrings(entry.getCapabilitiesProvided()),
                JsJson.fromStrings(entry.getServicesProvided()), JsJson.fromStrings(entry.getServicesConsumed()),
                JsJson.fromStrings(entry.getTopics()), JsJson.fromStrings(entry.getPermissions()),
                entry.getErrorDetail(), entry.getErrorFix());
    }

    private static Object member(Object tree, String name) {
        return tree instanceof Map ? ((Map<?, ?>) tree).get(name) : null;
    }

    private static String text(Object tree, String name) {
        Object found = member(tree, name);
        return found == null ? null : String.valueOf(found);
    }

    private static int intOr(Object tree, String name, int fallback) {
        Object found = member(tree, name);
        return found instanceof Number ? ((Number) found).intValue() : fallback;
    }

    private static List<String> strings(Object value) {
        List<String> out = new ArrayList<String>();
        if (value instanceof List) {
            for (Object item : (List<?>) value) {
                out.add(String.valueOf(item));
            }
        }
        return out;
    }

    @JSBody(params = {"app", "api", "surfaces"}, script = "return { app: app, api: api, surfaces: surfaces };")
    private static native JSObject descriptorObject(String app, int api, JSObject surfaces);

    @JSBody(params = {"entries", "entry", "recordDeclared"}, script =
            "return { entries: entries, entry: entry, recordDeclared: recordDeclared };")
    private static native JSObject ledgerObject(EntriesFn entries, IdFn entry, RecordDeclaredFn recordDeclared);

    @JSBody(params = {"pluginId", "implementation"}, script = "return { pluginId: pluginId, implementation: implementation };")
    private static native JSObject capabilityRecord(String pluginId, JSObject implementation);

    @JSBody(params = {"pluginId", "status", "capabilitiesDeclared", "capabilitiesProvided", "servicesProvided",
            "servicesConsumed", "topics", "permissions", "errorDetail", "errorFix"}, script =
            "var row = { pluginId: pluginId, status: status, capabilitiesDeclared: capabilitiesDeclared, "
            + "capabilitiesProvided: capabilitiesProvided, servicesProvided: servicesProvided, "
            + "servicesConsumed: servicesConsumed, topics: topics, permissions: permissions };"
            + "if (errorDetail !== null) { row.error = { detail: errorDetail, fix: errorFix }; }"
            + "return row;")
    private static native JSObject ledgerRowObject(String pluginId, String status, JSObject capabilitiesDeclared,
            JSObject capabilitiesProvided, JSObject servicesProvided, JSObject servicesConsumed, JSObject topics,
            JSObject permissions, String errorDetail, String errorFix);

    @JSBody(params = {"descriptor", "ledger", "supports", "contextFor", "verifyActivation", "capability", "service",
            "provideService", "markBroken", "release"}, script =
            "return { descriptor: descriptor, ledger: ledger, supports: supports, contextFor: contextFor, "
            + "verifyActivation: verifyActivation, capability: capability, service: service, "
            + "provideService: provideService, markBroken: markBroken, release: release };")
    private static native JsPluginHost assemble(JSObject descriptor, JSObject ledger, ManifestFn supports,
            ContextForFn contextFor, ManifestFn verifyActivation, IdFn capability, IdFn service,
            ProvideServiceFn provideService, MarkBrokenFn markBroken, ReleaseFn release);
}
