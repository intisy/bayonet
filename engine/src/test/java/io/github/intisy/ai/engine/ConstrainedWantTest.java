package io.github.intisy.ai.engine;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;

class ConstrainedWantTest {

    private static final ConstraintVocabulary REPLICAS = ConstraintVocabulary.of(Arrays.asList(
            new ConstraintVocabulary.Entry("minReplicas", "maxReplicas", ConstraintVocabulary.Bound.LOWER)));

    /** A provider whose live attributes are scripted per read, and which records what it was asked. */
    private static final class ScriptedProvider implements ServiceProvider {
        private final List<Map<String, Double>> byRead;
        private final boolean servesOnlyUnconstrained;
        private final List<Boolean> asks = new ArrayList<Boolean>();
        private int reads;

        ScriptedProvider(List<Map<String, Double>> byRead, boolean servesOnlyUnconstrained) {
            this.byRead = byRead;
            this.servesOnlyUnconstrained = servesOnlyUnconstrained;
        }

        @Override
        public Map<String, Double> attributes() {
            reads++;
            return byRead.get(Math.min(reads, byRead.size()) - 1);
        }

        @Override
        public Object serviceFor(Map<String, Double> constraints) {
            asks.add(Boolean.valueOf(!constraints.isEmpty()));
            return servesOnlyUnconstrained && !constraints.isEmpty() ? null : "the service";
        }
    }

    private static Map<String, Double> numbers(String key, double value) {
        Map<String, Double> map = new LinkedHashMap<String, Double>();
        map.put(key, Double.valueOf(value));
        return map;
    }

    private static final class Settled implements Pending.Settlement<Object> {
        private Object value;
        private PluginException failure;

        @Override
        public void value(Object result) {
            this.value = result;
        }

        @Override
        public void failure(PluginException reason) {
            this.failure = reason;
        }
    }

    private static Settled resolve(ServiceHub hub, ManualScheduler scheduler, ServiceRequirement requirement, Budget budget) {
        Settled settled = new Settled();
        hub.forPlugin("consumer").want(requirement, budget).then(settled);
        for (int tick = 0; tick < 50 && settled.value == null && settled.failure == null; tick++) {
            scheduler.fireAll();
        }
        return settled;
    }

    private static ServiceHub hub(ManualScheduler scheduler) {
        ServiceHub hub = new ServiceHub(scheduler, null);
        hub.wellKnown(Arrays.asList("storage.object"));
        hub.constraintVocabulary(REPLICAS);
        return hub;
    }

    private static ServiceRequirement constrained(boolean degradable) {
        Map<String, Object> declared = new LinkedHashMap<String, Object>();
        declared.put("id", "storage.object");
        declared.put("optional", Boolean.FALSE);
        declared.put("degradable", Boolean.valueOf(degradable));
        declared.put("constraints", numbers("minReplicas", 3));
        return ServiceRequirement.of(declared);
    }

    @Test
    void servesOnceTheAttributesSatisfyBeforeTheDeadline() {
        ManualScheduler scheduler = new ManualScheduler();
        ServiceHub hub = hub(scheduler);
        ScriptedProvider provider = new ScriptedProvider(
                Arrays.asList(numbers("maxReplicas", 1), numbers("maxReplicas", 3)), false);
        hub.forPlugin("store").register("storage.object", provider, numbers("maxReplicas", 1));
        Settled settled = resolve(hub, scheduler, constrained(false), Budget.of(30000, 1000));
        assertEquals("the service", settled.value);
        assertEquals(2, provider.reads);
    }

    @Test
    void anEmptyLiveAttributeMapKeepsTheAdvertisedClaim() {
        ManualScheduler scheduler = new ManualScheduler();
        ServiceHub hub = hub(scheduler);
        ScriptedProvider provider = new ScriptedProvider(
                Arrays.asList(new LinkedHashMap<String, Double>()), false);
        hub.forPlugin("store").register("storage.object", provider, numbers("maxReplicas", 3));
        Settled settled = resolve(hub, scheduler, constrained(false), Budget.of(30000, 1000));
        assertEquals("the service", settled.value);
        assertEquals(1, provider.reads);
    }

    /**
     * The overlay rule where it actually bites. The empty-map case above cannot distinguish a per
     * key overlay from a replacement, because merging an empty map changes nothing either way: only
     * a live map that reports ONE key while the declaration claims another can.
     */
    @Test
    void aLiveAttributeDoesNotEraseTheOtherAdvertisedOnes() {
        ManualScheduler scheduler = new ManualScheduler();
        ServiceHub hub = new ServiceHub(scheduler, null);
        hub.wellKnown(Arrays.asList("storage.object"));
        hub.constraintVocabulary(ConstraintVocabulary.of(Arrays.asList(
                new ConstraintVocabulary.Entry("minReplicas", "maxReplicas", ConstraintVocabulary.Bound.LOWER),
                new ConstraintVocabulary.Entry("maxLatencyMs", "latencyMs", ConstraintVocabulary.Bound.UPPER))));
        Map<String, Double> advertised = new LinkedHashMap<String, Double>();
        advertised.put("maxReplicas", Double.valueOf(3));
        advertised.put("latencyMs", Double.valueOf(10));
        hub.forPlugin("store").register("storage.object",
                new ScriptedProvider(Arrays.asList(numbers("maxReplicas", 5)), false), advertised);

        Map<String, Object> declared = new LinkedHashMap<String, Object>();
        declared.put("id", "storage.object");
        declared.put("degradable", Boolean.FALSE);
        Map<String, Double> constraints = new LinkedHashMap<String, Double>();
        constraints.put("minReplicas", Double.valueOf(3));
        constraints.put("maxLatencyMs", Double.valueOf(50));
        declared.put("constraints", constraints);

        Settled settled = resolve(hub, scheduler, ServiceRequirement.of(declared), Budget.of(2000, 1000));
        assertEquals("the service", settled.value, settled.failure == null ? "" : settled.failure.getDetail());
    }

    @Test
    void refusesWhenNeverSatisfiedAndNotDegradable() {
        ManualScheduler scheduler = new ManualScheduler();
        ServiceHub hub = hub(scheduler);
        hub.forPlugin("store").register("storage.object",
                new ScriptedProvider(Arrays.asList(numbers("maxReplicas", 1)), false), numbers("maxReplicas", 1));
        Settled settled = resolve(hub, scheduler, constrained(false), Budget.of(2000, 1000));
        assertNull(settled.value);
        String detail = settled.failure.getDetail();
        assertTrue(detail.contains("minReplicas"), detail);
        assertTrue(detail.contains("maxReplicas"), detail);
        assertTrue(detail.contains("2000"), detail);
    }

    @Test
    void degradesWithAReportWhenNeverSatisfiedAndDegradable() {
        final List<String> reports = new ArrayList<String>();
        Diagnostics.setSink(new Diagnostics.Sink() {
            @Override
            public void accept(String message) {
                reports.add(message);
            }
        });
        try {
            ManualScheduler scheduler = new ManualScheduler();
            ServiceHub hub = hub(scheduler);
            hub.forPlugin("store").register("storage.object",
                    new ScriptedProvider(Arrays.asList(numbers("maxReplicas", 1)), false), numbers("maxReplicas", 1));
            Settled settled = resolve(hub, scheduler, constrained(true), Budget.of(2000, 1000));
            assertEquals("the service", settled.value);
            assertEquals(1, reports.size(), reports.toString());
            assertTrue(reports.get(0).contains("minReplicas"), reports.get(0));
            assertTrue(reports.get(0).contains("maxReplicas"), reports.get(0));
        } finally {
            Diagnostics.setSink(null);
        }
    }

    @Test
    void asksWithTheConsumersConstraintsBeforeFallingBack() {
        ManualScheduler scheduler = new ManualScheduler();
        ServiceHub hub = hub(scheduler);
        ScriptedProvider provider = new ScriptedProvider(Arrays.asList(numbers("maxReplicas", 1)), true);
        hub.forPlugin("store").register("storage.object", provider, numbers("maxReplicas", 1));
        Settled settled = resolve(hub, scheduler, constrained(true), Budget.of(2000, 1000));
        assertEquals("the service", settled.value);
        assertEquals(Arrays.asList(Boolean.TRUE, Boolean.FALSE), provider.asks);
    }

    @Test
    void refusesAConstraintTheVocabularyDoesNotKnowRatherThanMatchingEverything() {
        ManualScheduler scheduler = new ManualScheduler();
        ServiceHub hub = new ServiceHub(scheduler, null);
        hub.wellKnown(Arrays.asList("storage.object"));
        hub.forPlugin("store").register("storage.object",
                new ScriptedProvider(Arrays.asList(numbers("maxReplicas", 9)), false), numbers("maxReplicas", 9));
        Settled settled = resolve(hub, scheduler, constrained(false), Budget.of(2000, 1000));
        assertNull(settled.value);
        assertTrue(settled.failure.getDetail().contains("minReplicas"), settled.failure.getDetail());
    }

    /** A provider that throws, which is plugin code doing what plugin code does. */
    private static final class ThrowingProvider implements ServiceProvider {
        @Override
        public Map<String, Double> attributes() {
            throw new IllegalStateException("the provider is broken");
        }

        @Override
        public Object serviceFor(Map<String, Double> constraints) {
            throw new IllegalStateException("the provider is broken");
        }
    }

    @Test
    void aProviderThatThrowsSettlesTheWantRatherThanWedgingIt() {
        ManualScheduler scheduler = new ManualScheduler();
        ServiceHub hub = hub(scheduler);
        hub.forPlugin("store").register("storage.object", new ThrowingProvider(), numbers("maxReplicas", 3));
        Settled settled = resolve(hub, scheduler, constrained(false), Budget.of(2000, 1000));
        assertNull(settled.value);
        assertTrue(settled.failure != null, "a want over a throwing provider never settled at all");
    }

    @Test
    void refusesABudgetThatCouldNeverBeSpent() {
        assertThrows(IllegalArgumentException.class, new Executable() {
            @Override
            public void execute() {
                Budget.of(30000, 0);
            }
        });
    }

    @Test
    void releasingThePluginRejectsItsConstrainedWantAndStopsThePolling() {
        ManualScheduler scheduler = new ManualScheduler();
        ServiceHub hub = hub(scheduler);
        ScriptedProvider provider = new ScriptedProvider(Arrays.asList(numbers("maxReplicas", 1)), false);
        hub.forPlugin("store").register("storage.object", provider, numbers("maxReplicas", 1));

        Settled settled = new Settled();
        hub.forPlugin("consumer").want(constrained(false), Budget.of(30000, 1000)).then(settled);
        int readsBeforeRelease = provider.reads;
        hub.releasePlugin("consumer");
        assertTrue(settled.failure != null, "the released plugin's want is still pending");
        for (int tick = 0; tick < 5; tick++) {
            scheduler.fireAll();
        }
        assertEquals(readsBeforeRelease, provider.reads, "a released plugin kept polling the provider");
    }

    @Test
    void saysAConstraintIsUnknownOnceRatherThanOncePerPoll() {
        final List<String> reports = new ArrayList<String>();
        Diagnostics.setSink(new Diagnostics.Sink() {
            @Override
            public void accept(String message) {
                reports.add(message);
            }
        });
        try {
            ManualScheduler scheduler = new ManualScheduler();
            ServiceHub hub = new ServiceHub(scheduler, null);
            hub.wellKnown(Arrays.asList("storage.object"));
            hub.forPlugin("store").register("storage.object",
                    new ScriptedProvider(Arrays.asList(numbers("maxReplicas", 9)), false), numbers("maxReplicas", 9));
            resolve(hub, scheduler, constrained(false), Budget.of(10000, 1000));
            int unknown = 0;
            for (String report : reports) {
                if (report.contains("minReplicas")) {
                    unknown++;
                }
            }
            assertEquals(1, unknown, reports.toString());
        } finally {
            Diagnostics.setSink(null);
        }
    }
}
