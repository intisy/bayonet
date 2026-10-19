package io.github.intisy.ai.engine;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * One entry of a manifest's {@code services.consumes}: what a plugin asks for, and what its absence
 * or its shortfall costs.
 *
 * @implNote A bare id reads as optional and not degradable, which is what every manifest written
 * before the object form already meant: a consumed service nobody provides drew no edge and the
 * consumer activated anyway. So the shorthand is not a default chosen here, it is the old behaviour
 * spelled out.
 */
public final class ServiceRequirement {

    private final String id;
    private final boolean optional;
    private final boolean degradable;
    private final Map<String, Double> constraints;

    private ServiceRequirement(String id, boolean optional, boolean degradable, Map<String, Double> constraints) {
        this.id = id;
        this.optional = optional;
        this.degradable = degradable;
        this.constraints = constraints;
    }

    /**
     * @param declaration one entry of {@code services.consumes}, either the bare service id or the
     * object form carrying {@code id}, {@code optional}, {@code degradable} and {@code constraints}
     * @return what the entry asks for
     */
    public static ServiceRequirement of(Object declaration) {
        if (!(declaration instanceof Map)) {
            return new ServiceRequirement(String.valueOf(declaration), true, false,
                    Collections.<String, Double>emptyMap());
        }
        Map<?, ?> entry = (Map<?, ?>) declaration;
        return new ServiceRequirement(String.valueOf(entry.get("id")),
                flag(entry.get("optional"), true),
                flag(entry.get("degradable"), false),
                numbers(entry.get("constraints")));
    }

    /** @return the service id this entry asks for */
    public String getId() {
        return id;
    }

    /** @return whether the plugin still starts when nothing provides the service */
    public boolean isOptional() {
        return optional;
    }

    /** @return whether the plugin accepts a service that never satisfies its constraints */
    public boolean isDegradable() {
        return degradable;
    }

    /** @return what the plugin needs of the service, keyed by constraint name, or empty when it declares none */
    public Map<String, Double> getConstraints() {
        return constraints;
    }

    static boolean flag(Object value, boolean absent) {
        return value instanceof Boolean ? ((Boolean) value).booleanValue() : absent;
    }

    static Map<String, Double> numbers(Object value) {
        if (!(value instanceof Map)) {
            return Collections.emptyMap();
        }
        Map<String, Double> out = new LinkedHashMap<String, Double>();
        for (Map.Entry<?, ?> entry : ((Map<?, ?>) value).entrySet()) {
            if (entry.getValue() instanceof Number) {
                out.put(String.valueOf(entry.getKey()), Double.valueOf(((Number) entry.getValue()).doubleValue()));
            }
        }
        return Collections.unmodifiableMap(out);
    }

    /**
     * @param declaration one entry of {@code services.provides} or {@code services.consumes}
     * @return the service id it names, whichever form it is written in
     */
    public static String idOf(Object declaration) {
        if (!(declaration instanceof Map)) {
            return String.valueOf(declaration);
        }
        return String.valueOf(((Map<?, ?>) declaration).get("id"));
    }
}
