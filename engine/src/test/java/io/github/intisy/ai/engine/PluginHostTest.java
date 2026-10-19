package io.github.intisy.ai.engine;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;

class PluginHostTest {

    private static final List<String> KNOWN = Arrays.asList("screens", "settings", "commands");
    private static final Object MANIFEST = new Object();

    private static ManifestFacts screens() {
        return new ManifestFacts("config-ledger", 1, Arrays.asList("screens"), Arrays.asList("config:write"), MANIFEST);
    }

    private static PluginHost host() {
        PluginHost host = new PluginHost("claude", 1, Arrays.asList("tui"));
        host.knownCapabilities(KNOWN);
        host.wellKnownServices(Arrays.asList("accounts", "routing", "activity"));
        return host;
    }

    @AfterEach
    void restoreDiagnostics() {
        Diagnostics.setSink(null);
    }

    @Test
    void refusesOnlyAPluginWhoseApiFloorIsAboveTheHost() {
        PluginHost host = new PluginHost("claude", 2, null);
        assertNull(host.supports("old", 1));
        assertNull(host.supports("old", 2));
        PluginException error = host.supports("new", 3);
        assertEquals("needs api 3, this host has api 2", error.getDetail());
        assertEquals("update the app to a version that implements api 3 or later", error.getFix());
    }

    @Test
    void refusesAPluginBuiltForAnotherApplication() {
        PluginHost claude = new PluginHost("claude", 2, Arrays.asList("tui"));
        ManifestFacts elsewhere = new ManifestFacts("studio-thing", 1, null, null,
                Arrays.asList("studio"), MANIFEST);
        PluginException refusal = claude.supports(elsewhere);
        assertNotNull(refusal);
        assertTrue(refusal.getDetail().contains("studio"));
        assertTrue(refusal.getDetail().contains("claude"));
        assertNotNull(refusal.getFix());
    }

    @Test
    void acceptsAPluginThatNamesThisApplicationAmongOthers() {
        PluginHost claude = new PluginHost("claude", 2, Arrays.asList("tui"));
        ManifestFacts both = new ManifestFacts("shared-thing", 1, null, null,
                Arrays.asList("studio", "claude"), MANIFEST);
        assertNull(claude.supports(both));
    }

    @Test
    void acceptsAPluginThatTargetsNothing() {
        PluginHost claude = new PluginHost("claude", 2, Arrays.asList("tui"));
        ManifestFacts anywhere = new ManifestFacts("old-thing", 1, null, null, MANIFEST);
        assertNull(claude.supports(anywhere));
    }

    @Test
    void checksTheApplicationBeforeTheApiFloor() {
        PluginHost claude = new PluginHost("claude", 2, Arrays.asList("tui"));
        ManifestFacts wrongOnBoth = new ManifestFacts("studio-thing", 99, null, null,
                Arrays.asList("studio"), MANIFEST);
        PluginException refusal = claude.supports(wrongOnBoth);
        assertNotNull(refusal);
        assertTrue(refusal.getDetail().contains("studio"));
    }

    @Test
    void aCompositeHostsEveryApplicationItDeclares() {
        PluginHost composite = new PluginHost("claude", Arrays.asList("claude", "studio"), 2,
                Arrays.asList("tui"));
        ManifestFacts forStudio = new ManifestFacts("studio-thing", 1, null, null,
                Arrays.asList("studio"), MANIFEST);
        ManifestFacts forClaude = new ManifestFacts("claude-thing", 1, null, null,
                Arrays.asList("claude"), MANIFEST);
        assertNull(composite.supports(forStudio));
        assertNull(composite.supports(forClaude));
    }

    @Test
    void aCompositeStillRefusesAnApplicationItDoesNotHost() {
        PluginHost composite = new PluginHost("claude", Arrays.asList("claude", "studio"), 2,
                Arrays.asList("tui"));
        ManifestFacts elsewhere = new ManifestFacts("kernel-thing", 1, null, null,
                Arrays.asList("kernel"), MANIFEST);
        PluginException refusal = composite.supports(elsewhere);
        assertNotNull(refusal);
        assertTrue(refusal.getDetail().contains("kernel"));
        assertTrue(refusal.getDetail().contains("claude"));
        assertTrue(refusal.getDetail().contains("studio"));
    }

    @Test
    void aHostThatDeclaresNoApplicationHostsEverything() {
        PluginHost anyHost = new PluginHost("claude", new ArrayList<String>(), 2, Arrays.asList("tui"));
        ManifestFacts forStudio = new ManifestFacts("studio-thing", 1, null, null,
                Arrays.asList("studio"), MANIFEST);
        assertNull(anyHost.supports(forStudio));
    }

    @Test
    void theScalarConstructorIsTheOneApplicationCase() {
        PluginHost claude = new PluginHost("claude", 2, Arrays.asList("tui"));
        assertEquals(Arrays.asList("claude"), claude.getApplications());
    }

    @Test
    void aBlankAppIsNoApplicationRatherThanOneNamedEmptyString() {
        PluginHost blank = new PluginHost("", 2, Arrays.asList("tui"));
        assertTrue(blank.getApplications().isEmpty());
        ManifestFacts forStudio = new ManifestFacts("studio-thing", 1, null, null,
                Arrays.asList("studio"), MANIFEST);
        assertNull(blank.supports(forStudio));
    }

    @Test
    void handsAPluginASessionCarryingItsManifestAndItsFencedRegistry() {
        PluginHost host = host();
        final PluginSession session = host.sessionFor(screens(), new RecordingBus());
        assertSame(MANIFEST, session.getFacts().getPayload());
        assertEquals("claude", host.getApp());
        assertEquals(Arrays.asList("tui"), host.getSurfaces());
        PluginException failure = assertThrows(PluginException.class, new Executable() {
            @Override
            public void execute() {
                session.getServices().register("plugin-updater:catalog", new Object());
            }
        });
        assertTrue(failure.getDetail().contains("belongs to another plugin"));
    }

    @Test
    void collectsAProvidedCapabilityUnderThePluginThatProvidedIt() {
        PluginHost host = host();
        Object implementation = new Object();
        host.sessionFor(screens(), new RecordingBus()).provide("screens", implementation);
        assertEquals(1, host.capability("screens").size());
        assertEquals("config-ledger", host.capability("screens").get(0).getPluginId());
        assertSame(implementation, host.capability("screens").get(0).getImplementation());
        assertEquals(Arrays.asList("screens"), host.getLedger().entry("config-ledger").getCapabilitiesProvided());
    }

    @Test
    void keepsAnUnknownCapabilityIdButReportsItAsIgnored() {
        final List<String> seen = new ArrayList<String>();
        Diagnostics.setSink(new Diagnostics.Sink() {
            @Override
            public void accept(String message) {
                seen.add(message);
            }
        });
        PluginHost host = host();
        ManifestFacts typo = new ManifestFacts("wakatime-sync", 1, Arrays.asList("screns"), null, MANIFEST);
        host.sessionFor(typo, new RecordingBus()).provide("screns", new Object());
        assertEquals(Arrays.asList("ignored unknown capability \"screns\" from wakatime-sync"), seen);
        assertEquals(1, host.capability("screns").size());
    }

    @Test
    void reportsNothingWhenTheHostDeclaredNoVocabulary() {
        final List<String> seen = new ArrayList<String>();
        Diagnostics.setSink(new Diagnostics.Sink() {
            @Override
            public void accept(String message) {
                seen.add(message);
            }
        });
        PluginHost host = new PluginHost("claude", 1, null);
        ManifestFacts typo = new ManifestFacts("wakatime-sync", 1, Arrays.asList("screns"), null, MANIFEST);
        host.sessionFor(typo, new RecordingBus()).provide("screns", new Object());
        assertEquals(new ArrayList<String>(), seen);
        assertEquals(1, host.capability("screns").size());
    }

    @Test
    void rejectsProvidingTheSameCapabilityTwice() {
        PluginHost host = host();
        final PluginSession session = host.sessionFor(screens(), new RecordingBus());
        session.provide("screens", new Object());
        PluginException failure = assertThrows(PluginException.class, new Executable() {
            @Override
            public void execute() {
                session.provide("screens", new Object());
            }
        });
        assertEquals("provided capability \"screens\" twice", failure.getDetail());
        assertEquals("call ctx.provide once per capability in activate", failure.getFix());
    }

    @Test
    void failsActivationWhenADeclaredCapabilityWasNeverProvided() {
        PluginHost host = host();
        host.sessionFor(screens(), new RecordingBus());
        PluginException error = host.verifyActivation(screens());
        assertEquals("capabilities declared but never provided: screens", error.getDetail());
        assertEquals("call ctx.provide(\"screens\", ...) in activate, or remove it from \"capabilities\" in plugin.json", error.getFix());
    }

    @Test
    void failsActivationWhenACapabilityWasProvidedWithoutBeingDeclared() {
        PluginHost host = host();
        ManifestFacts silent = new ManifestFacts("config-ledger", 1, null, null, MANIFEST);
        host.sessionFor(silent, new RecordingBus()).provide("screens", new Object());
        PluginException error = host.verifyActivation(silent);
        assertEquals("capabilities provided but never declared: screens", error.getDetail());
        assertEquals("add \"screens\" to \"capabilities\" in plugin.json", error.getFix());
    }

    @Test
    void marksAPluginActiveWhenTheManifestAndTheActivationAgree() {
        PluginHost host = host();
        host.sessionFor(screens(), new RecordingBus()).provide("screens", new Object());
        assertNull(host.verifyActivation(screens()));
        assertEquals(PluginStatus.ACTIVE, host.getLedger().entry("config-ledger").getStatus());
        assertEquals(Arrays.asList("config:write"), host.getLedger().entry("config-ledger").getPermissions());
    }

    @Test
    void recordsTheTopicsAPluginSubscribesTo() {
        PluginHost host = host();
        PluginSession session = host.sessionFor(screens(), new RecordingBus());
        session.getEvents().subscribe("config.changed", new EventBus.Listener() {
            @Override
            public void received(Object payload) {
            }
        });
        assertEquals(Arrays.asList("config.changed"), host.getLedger().entry("config-ledger").getTopics());
    }

    @Test
    void dropsAReleasedPluginsCapabilitiesAndServices() {
        PluginHost host = host();
        PluginSession session = host.sessionFor(screens(), new RecordingBus());
        session.provide("screens", new Object());
        session.getServices().register("config-ledger:history", new Object());
        host.release("config-ledger");
        assertEquals(0, host.capability("screens").size());
        assertNull(host.service("config-ledger:history"));
        assertEquals(PluginStatus.STOPPED, host.getLedger().entry("config-ledger").getStatus());
    }

    @Test
    void quarantinesABrokenPluginWithTheErrorAttributedToIt() {
        PluginHost host = host();
        PluginSession session = host.sessionFor(screens(), new RecordingBus());
        session.provide("screens", new Object());
        ManifestFacts extra = new ManifestFacts("config-ledger", 1, Arrays.asList("screens", "settings"), null, MANIFEST);
        PluginException error = host.verifyActivation(extra);
        assertNotNull(error);
        host.markBroken("config-ledger", error);
        LedgerEntry entry = host.getLedger().entry("config-ledger");
        assertEquals(PluginStatus.BROKEN, entry.getStatus());
        assertEquals(error.getDetail(), entry.getErrorDetail());
        assertEquals(error.getFix(), entry.getErrorFix());
        assertEquals(0, host.capability("screens").size());
    }

    @Test
    void stopsAQuarantinedPluginsEventSubscriptions() {
        PluginHost host = host();
        RecordingBus shared = new RecordingBus();
        final List<Object> seen = new ArrayList<Object>();
        PluginSession session = host.sessionFor(screens(), shared);
        session.getEvents().subscribe("config.changed", new EventBus.Listener() {
            @Override
            public void received(Object payload) {
                seen.add(payload);
            }
        });
        shared.publish("config.changed", "before");
        host.markBroken("config-ledger", new PluginException("config-ledger", "boom", "fix it"));
        shared.publish("config.changed", "after");
        assertEquals(Arrays.asList((Object) "before"), seen);
    }

    @Test
    void stopsAReleasedPluginsEventSubscriptions() {
        PluginHost host = host();
        RecordingBus shared = new RecordingBus();
        final List<Object> seen = new ArrayList<Object>();
        host.sessionFor(screens(), shared).getEvents().subscribe("config.changed", new EventBus.Listener() {
            @Override
            public void received(Object payload) {
                seen.add(payload);
            }
        });
        host.release("config-ledger");
        shared.publish("config.changed", "after");
        assertEquals(new ArrayList<Object>(), seen);
    }

    @Test
    void cancelingATrackedDisposerTwiceHasNoFurtherEffect() {
        PluginHost host = host();
        final RecordingBus shared = new RecordingBus();
        final int[] underlyingCancels = new int[1];
        EventBus counted = new EventBus() {
            @Override
            public void publish(String topic, Object payload) {
                shared.publish(topic, payload);
            }

            @Override
            public Scheduler.Cancellable subscribe(String topic, Listener listener) {
                final Scheduler.Cancellable real = shared.subscribe(topic, listener);
                return new Scheduler.Cancellable() {
                    @Override
                    public void cancel() {
                        underlyingCancels[0]++;
                        real.cancel();
                    }
                };
            }
        };
        final List<Object> seen = new ArrayList<Object>();
        PluginSession session = host.sessionFor(screens(), counted);
        Scheduler.Cancellable stop = session.getEvents().subscribe("config.changed", new EventBus.Listener() {
            @Override
            public void received(Object payload) {
                seen.add(payload);
            }
        });
        shared.publish("config.changed", "before");
        assertEquals(Arrays.asList((Object) "before"), seen);
        stop.cancel();
        shared.publish("config.changed", "after");
        assertEquals(Arrays.asList((Object) "before"), seen);
        assertEquals(1, underlyingCancels[0]);
        stop.cancel();
        shared.publish("config.changed", "again");
        assertEquals(Arrays.asList((Object) "before"), seen);
        assertEquals(1, underlyingCancels[0]);
    }

    @Test
    void scopesTheDeclaredAndProvidedCheckToTheCurrentActivation() {
        PluginHost host = host();
        host.sessionFor(screens(), new RecordingBus()).provide("screens", new Object());
        assertNull(host.verifyActivation(screens()));
        host.release("config-ledger");
        ManifestFacts later = new ManifestFacts("config-ledger", 1, null, null, MANIFEST);
        host.sessionFor(later, new RecordingBus());
        assertNull(host.verifyActivation(later));
        assertEquals(new ArrayList<String>(), host.getLedger().entry("config-ledger").getCapabilitiesProvided());
    }

    @Test
    void refusesAQuarantinedPluginsLateProvideAndLateRegistration() {
        final List<String> seen = new ArrayList<String>();
        Diagnostics.setSink(new Diagnostics.Sink() {
            @Override
            public void accept(String message) {
                seen.add(message);
            }
        });
        PluginHost host = host();
        PluginSession session = host.sessionFor(screens(), new RecordingBus());
        host.markBroken("config-ledger", new PluginException("config-ledger", "took too long", "return sooner"));
        session.provide("screens", new Object());
        session.getServices().register("config-ledger:history", new Object()).cancel();
        assertEquals(0, host.capability("screens").size());
        assertNull(host.service("config-ledger:history"));
        assertEquals(PluginStatus.BROKEN, host.getLedger().entry("config-ledger").getStatus());
        assertEquals(Arrays.asList(
                "ignored a late provision of capability \"screens\" from config-ledger, which is no longer running",
                "ignored a late registration of service \"config-ledger:history\" from config-ledger, which is no longer running"), seen);
    }

    @Test
    void refusesAReleasedPluginsLateWatch() {
        Diagnostics.setSink(new Diagnostics.Sink() {
            @Override
            public void accept(String message) {
            }
        });
        PluginHost host = host();
        PluginSession session = host.sessionFor(screens(), new RecordingBus());
        host.release("config-ledger");
        final List<Object> seen = new ArrayList<Object>();
        session.getServices().watch("accounts", new ServiceHub.Listener() {
            @Override
            public void changed(Object service, boolean registered) {
                seen.add(service);
            }
        });
        ManifestFacts auth = new ManifestFacts("core-auth", 1, null, null, MANIFEST);
        host.sessionFor(auth, new RecordingBus()).getServices().register("accounts", new Object());
        assertEquals(new ArrayList<Object>(), seen);
    }

    @Test
    void refusesAQuarantinedPluginsLateSubscriptionAndLeavesItsDisposerSafe() {
        final List<String> reported = new ArrayList<String>();
        Diagnostics.setSink(new Diagnostics.Sink() {
            @Override
            public void accept(String message) {
                reported.add(message);
            }
        });
        PluginHost host = host();
        RecordingBus shared = new RecordingBus();
        PluginSession session = host.sessionFor(screens(), shared);
        host.markBroken("config-ledger", new PluginException("config-ledger", "took too long", "return sooner"));
        final List<Object> seen = new ArrayList<Object>();
        Scheduler.Cancellable stop = session.getEvents().subscribe("config.changed", new EventBus.Listener() {
            @Override
            public void received(Object payload) {
                seen.add(payload);
            }
        });
        shared.publish("config.changed", "after");
        assertEquals(new ArrayList<Object>(), seen);
        stop.cancel();
        assertEquals(new ArrayList<String>(), host.getLedger().entry("config-ledger").getTopics());
        assertEquals(Arrays.asList(
                "ignored a late subscription to topic \"config.changed\" from config-ledger, which is no longer running"), reported);
    }

    @Test
    void refusesAQuarantinedPluginsLateWant() {
        Diagnostics.setSink(new Diagnostics.Sink() {
            @Override
            public void accept(String message) {
            }
        });
        PluginHost host = host();
        PluginSession session = host.sessionFor(screens(), new RecordingBus());
        host.markBroken("config-ledger", new PluginException("config-ledger", "took too long", "return sooner"));
        Settled<Object> refused = Settled.of(session.getServices().want("accounts"));
        session.getServices().want("routing");
        ManifestFacts auth = new ManifestFacts("core-auth", 1, null, null, MANIFEST);
        host.sessionFor(auth, new RecordingBus()).getServices().register("accounts", new Object());
        assertEquals("config-ledger", refused.failure().getPluginId());
        assertEquals("stopped while waiting for service \"accounts\"", refused.failure().getDetail());
        assertEquals("provide \"accounts\" before this plugin is stopped, or use get() and carry on without it", refused.failure().getFix());
        assertNull(refused.value());
        assertEquals(new ArrayList<String>(), host.getLedger().entry("config-ledger").getServicesConsumed());
    }

    @Test
    void letsAPluginThatActivatesAgainRegisterOnceMore() {
        PluginHost host = host();
        host.markBroken("config-ledger", new PluginException("config-ledger", "took too long", "return sooner"));
        PluginSession session = host.sessionFor(screens(), new RecordingBus());
        session.provide("screens", new Object());
        session.getServices().register("config-ledger:history", new Object());
        assertNull(host.verifyActivation(screens()));
        assertEquals(1, host.capability("screens").size());
        assertNotNull(host.service("config-ledger:history"));
    }

    @Test
    void failsAReactivationWhoseDeclaredCapabilityIsNotProvidedAgain() {
        PluginHost host = host();
        host.sessionFor(screens(), new RecordingBus()).provide("screens", new Object());
        assertNull(host.verifyActivation(screens()));
        host.release("config-ledger");
        host.sessionFor(screens(), new RecordingBus());
        assertEquals("capabilities declared but never provided: screens", host.verifyActivation(screens()).getDetail());
    }

    @Test
    void handsOutLedgerCopiesRatherThanItsOwnState() {
        final PluginHost host = host();
        host.sessionFor(screens(), new RecordingBus());
        assertThrows(UnsupportedOperationException.class, new Executable() {
            @Override
            public void execute() {
                host.getLedger().entry("config-ledger").getCapabilitiesDeclared().add("tampered");
            }
        });
        assertEquals(Arrays.asList("screens"), host.getLedger().entry("config-ledger").getCapabilitiesDeclared());
    }
}
