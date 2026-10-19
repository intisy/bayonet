package io.github.intisy.ai.conformance;

import io.github.intisy.ai.engine.ServiceProvider;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * A provider whose live attributes are scripted per read, and which records what it was asked.
 *
 * @implNote The script is clamped at its last entry rather than running out, so a budget that
 * outlasts the script keeps reporting the last state instead of silently reverting to the
 * declaration's claim, which is a different vector's subject.
 */
final class ScriptedProvider implements ServiceProvider {

    private final List<Map<String, Double>> byRead;
    private final boolean servesOnlyUnconstrained;
    final List<Boolean> asks = new ArrayList<Boolean>();
    int reads;
    int readsAtService;

    ScriptedProvider(List<Map<String, Double>> byRead, boolean servesOnlyUnconstrained) {
        this.byRead = byRead;
        this.servesOnlyUnconstrained = servesOnlyUnconstrained;
    }

    @Override
    public Map<String, Double> attributes() {
        reads++;
        return current();
    }

    @Override
    public Object serviceFor(Map<String, Double> constraints) {
        boolean carriedTheConsumersConstraints = !constraints.isEmpty();
        asks.add(Boolean.valueOf(carriedTheConsumersConstraints));
        if (servesOnlyUnconstrained && carriedTheConsumersConstraints) {
            return null;
        }
        readsAtService = reads;
        return "the conformance service";
    }

    Map<String, Double> current() {
        return byRead.get(Math.min(Math.max(reads, 1), byRead.size()) - 1);
    }
}
