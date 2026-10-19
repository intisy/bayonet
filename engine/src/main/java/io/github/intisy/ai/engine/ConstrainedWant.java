package io.github.intisy.ai.engine;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * One consumer's constrained wait for a service: re-ask to a budget, then degrade with a report or
 * refuse.
 *
 * @implNote Scheduled rather than slept. This module transpiles and has no threads, so the budget
 * is spent in scheduled ticks on the host's own timer, which is also what lets a test spend a 30
 * second budget instantly.
 */
final class ConstrainedWant {

    private final ServiceHub hub;
    private final String consumerId;
    private final ServiceRequirement requirement;
    private final Budget budget;
    private final Pending<Object> settled = new Pending<Object>();
    private Map<String, Double> seen = Collections.emptyMap();
    private long elapsed;

    ConstrainedWant(ServiceHub hub, String consumerId, ServiceRequirement requirement, Budget budget) {
        this.hub = hub;
        this.consumerId = consumerId;
        this.requirement = requirement;
        this.budget = budget;
    }

    Pending<Object> start() {
        attempt();
        return settled;
    }

    private void attempt() {
        ServiceHub.Entry entry = hub.entryOf(requirement.getId());
        if (entry != null) {
            seen = overlay(entry.getAdvertised(), entry.getProvider().attributes());
            if (hub.constraintVocabulary().satisfies(requirement.getConstraints(), seen)) {
                Object served = entry.getProvider().serviceFor(requirement.getConstraints());
                if (served != null) {
                    settled.resolve(served);
                    return;
                }
            }
        }
        if (elapsed >= budget.getBudgetMillis()) {
            degradeOrRefuse(entry);
            return;
        }
        elapsed += budget.getPollMillis();
        hub.scheduler().schedule(new Runnable() {
            @Override
            public void run() {
                attempt();
            }
        }, budget.getPollMillis());
    }

    /**
     * @implNote A per key overlay, not a choice between the two sets: a provider reporting only the
     * one attribute that changes live would otherwise drop every claim its declaration made, and a
     * consumer constraining one of those is then refused by a provider that serves it perfectly
     * well.
     */
    private static Map<String, Double> overlay(Map<String, Double> advertised, Map<String, Double> live) {
        if (live == null || live.isEmpty()) {
            return advertised;
        }
        Map<String, Double> merged = new LinkedHashMap<String, Double>(advertised);
        merged.putAll(live);
        return merged;
    }

    /**
     * @implNote Silent degradation is rejected, so the degradable path reports what it was given
     * before handing it over: a durability constraint quietly downgraded is a lie a consumer cannot
     * detect. It also asks once more with the consumer's own constraints first, because a provider
     * may have started satisfying them in the instant after the budget expired, and handing back a
     * degraded service when the full one was available is a downgrade nobody asked for.
     */
    private void degradeOrRefuse(ServiceHub.Entry entry) {
        if (!requirement.isDegradable()) {
            settled.reject(unsatisfied(entry));
            return;
        }
        if (entry == null) {
            settled.reject(unsatisfied(null));
            return;
        }
        Object served = entry.getProvider().serviceFor(requirement.getConstraints());
        if (served == null) {
            served = entry.getProvider().serviceFor(Collections.<String, Double>emptyMap());
        }
        if (served == null) {
            settled.reject(new PluginException(consumerId,
                    "requires \"" + requirement.getId() + "\" and its provider served nothing at all",
                    "have the provider serve an unconstrained request, or stop declaring the requirement degradable"));
            return;
        }
        Diagnostics.report(consumerId + " accepted a degraded \"" + requirement.getId()
                + "\": asked " + requirement.getConstraints() + ", got " + seen);
        settled.resolve(served);
    }

    private PluginException unsatisfied(ServiceHub.Entry entry) {
        String offered = entry == null ? "nothing provides it at all" : "the provider still offers only " + seen;
        return new PluginException(consumerId,
                "requires \"" + requirement.getId() + "\" with " + requirement.getConstraints()
                        + ", and after " + budget.getBudgetMillis() + " ms " + offered,
                "run a provider that meets " + requirement.getConstraints()
                        + ", or mark the requirement degradable to accept what there is");
    }
}
