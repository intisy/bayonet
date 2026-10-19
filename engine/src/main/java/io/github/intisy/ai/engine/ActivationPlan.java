package io.github.intisy.ai.engine;

import java.util.Collections;
import java.util.List;

/**
 * The order plugins activate in, the dependency cycles that kept some of them out of it, and the
 * refusals that kept the rest out.
 */
public final class ActivationPlan {

    private final List<String> order;
    private final List<List<String>> cycles;
    private final List<PluginException> refusals;

    ActivationPlan(List<String> order, List<List<String>> cycles, List<PluginException> refusals) {
        this.order = Collections.unmodifiableList(order);
        this.cycles = Collections.unmodifiableList(cycles);
        this.refusals = Collections.unmodifiableList(refusals);
    }

    /**
     * Plugin ids in activation order, providers before consumers.
     *
     * @return the resolvable plugin ids in order, excluding any plugin left out by a cycle or by a
     * refusal
     */
    public List<String> getOrder() {
        return order;
    }

    /**
     * Each set of plugins that depend on one another, which is a load error naming the cycle.
     *
     * @return the dependency cycles found, or empty when the plugins have no such cycle
     */
    public List<List<String>> getCycles() {
        return cycles;
    }

    /**
     * One refusal per plugin whose mandatory need nothing in the set meets, naming both sides.
     *
     * @return the refusals, or empty when every mandatory need is met
     * @implNote Returned rather than thrown, like {@code PluginHost.supports}'s, because a host
     * quarantines the units it cannot start and carries on with the ones it can. A set where every
     * unit is refused is reported as an empty order and a full list here, never as silence.
     */
    public List<PluginException> getRefusals() {
        return refusals;
    }
}
