package io.github.intisy.ai.engine;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Sorts units so a provider activates before its consumers, and refuses the ones whose mandatory
 * needs nothing in the set meets.
 *
 * @implNote Which declarations draw the edges is the caller's to say. A capability is consumed by
 * the HOST after every activation finishes, while a service is the plugin-to-plugin channel during
 * activation, so a plugin host orders on services and a kernel on capabilities.
 * @implNote Whether an absence is tolerated is declared per need rather than decided here, which is
 * what lets one ordering serve a plugin host and a kernel. A caller whose units declare nothing
 * gets the older behaviour, every need optional, because that is what a bare service id in a
 * manifest means.
 */
public final class Activation {

    private Activation() {
    }

    /**
     * Computes an activation order for a set of plugin ids from what each provides and consumes.
     *
     * @param ids the plugin ids to order
     * @param provides service ids each plugin id provides, keyed by plugin id
     * @param consumes service ids each plugin id consumes, keyed by plugin id
     * @return the resulting order, plus the dependency cycles that were left out of it
     * @implNote Every need read this way is optional, which is what a bare service id means: a
     * consumed service nobody provides draws no edge, the consumer activates anyway and resolves
     * later or times out, because at ecosystem scale providers appear and disappear and a hard
     * order fails the moment one is disabled.
     */
    public static ActivationPlan order(List<String> ids, Map<String, List<String>> provides, Map<String, List<String>> consumes) {
        List<ActivationUnit> units = new ArrayList<ActivationUnit>();
        for (String id : ids) {
            List<ActivationUnit.Offer> offers = new ArrayList<ActivationUnit.Offer>();
            for (String serviceId : listOf(provides, id)) {
                offers.add(new ActivationUnit.Offer(DeclarationKind.SERVICE, serviceId));
            }
            List<ActivationUnit.Need> needs = new ArrayList<ActivationUnit.Need>();
            for (String serviceId : listOf(consumes, id)) {
                needs.add(new ActivationUnit.Need(DeclarationKind.SERVICE, serviceId, true, false));
            }
            units.add(new ActivationUnit(id, offers, needs));
        }
        return order(units);
    }

    /**
     * Computes an activation order for a set of units from their SERVICE declarations.
     *
     * @param units the units to order
     * @return the resulting order, the dependency cycles left out of it, and one refusal per unit
     * that cannot start
     */
    public static ActivationPlan order(List<ActivationUnit> units) {
        return order(units, DeclarationKind.SERVICE);
    }

    /**
     * Computes an activation order for a set of units, refusing each one whose mandatory needs
     * nothing in the set meets.
     *
     * @param units the units to order
     * @param edgeSource which kind of declaration draws the edges; declarations of the other kind
     * are ignored entirely, for ordering and for refusal alike
     * @return the resulting order, the dependency cycles left out of it, and one refusal per unit
     * that cannot start
     * @implNote A parameter rather than a constant because the right answer differs by caller and
     * not by opinion: a plugin host orders on services, since a capability is consumed by the host
     * after every activation finishes, while a kernel orders on capabilities, since one capability
     * genuinely must start before another.
     */
    public static ActivationPlan order(List<ActivationUnit> units, DeclarationKind edgeSource) {
        Set<String> refusedIds = new LinkedHashSet<String>();
        List<PluginException> refusals = refusals(units, refusedIds, edgeSource);

        List<String> ids = new ArrayList<String>();
        for (ActivationUnit unit : units) {
            if (!refusedIds.contains(unit.getId())) {
                ids.add(unit.getId());
            }
        }

        Map<String, List<String>> providersOf = providersOf(units, refusedIds, edgeSource);
        Map<String, Set<String>> dependencies = new HashMap<String, Set<String>>();
        for (String id : ids) {
            dependencies.put(id, new LinkedHashSet<String>());
        }
        for (ActivationUnit unit : units) {
            if (refusedIds.contains(unit.getId())) {
                continue;
            }
            Set<String> needed = dependencies.get(unit.getId());
            for (ActivationUnit.Need need : unit.getRequires()) {
                if (need.getKind() != edgeSource) {
                    continue;
                }
                for (String provider : listOf(providersOf, need.getId())) {
                    if (!provider.equals(unit.getId())) {
                        needed.add(provider);
                    }
                }
            }
        }

        List<List<String>> cycles = findCycles(ids, dependencies);
        Set<String> settled = new HashSet<String>();
        for (List<String> cycle : cycles) {
            settled.addAll(cycle);
        }

        List<String> order = new ArrayList<String>();
        boolean progressed = true;
        while (progressed) {
            progressed = false;
            for (String id : ids) {
                if (settled.contains(id)) {
                    continue;
                }
                boolean pending = false;
                for (String dependency : dependencies.get(id)) {
                    if (!settled.contains(dependency)) {
                        pending = true;
                        break;
                    }
                }
                if (pending) {
                    continue;
                }
                order.add(id);
                settled.add(id);
                progressed = true;
            }
        }

        return new ActivationPlan(order, cycles, refusals);
    }

    /**
     * @implNote Run to a fixed point, because a unit refused for its own missing need stops being a
     * provider: a consumer whose only provider was refused has its mandatory need unmet just as
     * surely as one nobody ever offered, and calling it started would be a lie the host acts on.
     */
    private static List<PluginException> refusals(List<ActivationUnit> units, Set<String> refusedIds, DeclarationKind edgeSource) {
        List<PluginException> refusals = new ArrayList<PluginException>();
        boolean refusedMore = true;
        while (refusedMore) {
            refusedMore = false;
            Map<String, List<String>> providersOf = providersOf(units, refusedIds, edgeSource);
            for (ActivationUnit unit : units) {
                if (refusedIds.contains(unit.getId())) {
                    continue;
                }
                for (ActivationUnit.Need need : unit.getRequires()) {
                    if (need.getKind() != edgeSource || need.isOptional()
                            || !listOf(providersOf, need.getId()).isEmpty()) {
                        continue;
                    }
                    refusedIds.add(unit.getId());
                    refusals.add(new PluginException(unit.getId(),
                            "requires \"" + need.getId() + "\", which nothing here provides",
                            "install something that provides \"" + need.getId()
                                    + "\", or mark the requirement optional"));
                    refusedMore = true;
                    break;
                }
            }
        }
        return refusals;
    }

    private static Map<String, List<String>> providersOf(List<ActivationUnit> units, Set<String> refusedIds, DeclarationKind edgeSource) {
        Map<String, List<String>> providersOf = new HashMap<String, List<String>>();
        for (ActivationUnit unit : units) {
            if (refusedIds.contains(unit.getId())) {
                continue;
            }
            for (ActivationUnit.Offer offer : unit.getProvides()) {
                if (offer.getKind() != edgeSource) {
                    continue;
                }
                List<String> owners = providersOf.get(offer.getId());
                if (owners == null) {
                    owners = new ArrayList<String>();
                    providersOf.put(offer.getId(), owners);
                }
                owners.add(unit.getId());
            }
        }
        return providersOf;
    }

    private static List<String> listOf(Map<String, List<String>> source, String key) {
        List<String> found = source == null ? null : source.get(key);
        return found == null ? new ArrayList<String>() : found;
    }

    /**
     * @implNote Tarjan's strongly-connected components. A component of one is not a cycle, and each
     * reported component is reversed so the message reads as a chain rather than backwards.
     */
    private static List<List<String>> findCycles(List<String> ids, Map<String, Set<String>> dependencies) {
        Tarjan state = new Tarjan(dependencies);
        for (String id : ids) {
            if (!state.index.containsKey(id)) {
                state.visit(id);
            }
        }
        return state.cycles;
    }

    private static final class Tarjan {
        private final Map<String, Set<String>> dependencies;
        private final Map<String, Integer> index = new HashMap<String, Integer>();
        private final Map<String, Integer> lowLink = new HashMap<String, Integer>();
        private final Set<String> onStack = new HashSet<String>();
        private final Deque<String> stack = new ArrayDeque<String>();
        private final List<List<String>> cycles = new ArrayList<List<String>>();
        private int counter = 0;

        Tarjan(Map<String, Set<String>> dependencies) {
            this.dependencies = dependencies;
        }

        void visit(String id) {
            index.put(id, Integer.valueOf(counter));
            lowLink.put(id, Integer.valueOf(counter));
            counter++;
            stack.push(id);
            onStack.add(id);

            Set<String> needed = dependencies.get(id);
            if (needed != null) {
                for (String dependency : needed) {
                    if (!index.containsKey(dependency)) {
                        visit(dependency);
                        lowLink.put(id, Integer.valueOf(Math.min(lowLink.get(id).intValue(), lowLink.get(dependency).intValue())));
                    } else if (onStack.contains(dependency)) {
                        lowLink.put(id, Integer.valueOf(Math.min(lowLink.get(id).intValue(), index.get(dependency).intValue())));
                    }
                }
            }

            if (!lowLink.get(id).equals(index.get(id))) {
                return;
            }
            List<String> component = new ArrayList<String>();
            String member;
            do {
                member = stack.pop();
                onStack.remove(member);
                component.add(member);
            } while (!member.equals(id));
            if (component.size() > 1) {
                java.util.Collections.reverse(component);
                cycles.add(component);
            }
        }
    }
}
