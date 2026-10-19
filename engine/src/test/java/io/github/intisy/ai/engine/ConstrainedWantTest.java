package io.github.intisy.ai.engine;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;

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
}
