package io.github.intisy.ai.engine;

import java.util.Map;

/**
 * One entry of a manifest's {@code services.provides}: a service a plugin registers, and what that
 * service claims before it is running to answer for itself.
 */
public final class ServiceOffer {

    private final String id;
    private final Map<String, Double> attributes;

    private ServiceOffer(String id, Map<String, Double> attributes) {
        this.id = id;
        this.attributes = attributes;
    }

    /**
     * @param declaration one entry of {@code services.provides}, either the bare service id or the
     * object form carrying {@code id} and {@code attributes}
     * @return what the entry offers
     */
    public static ServiceOffer of(Object declaration) {
        if (!(declaration instanceof Map)) {
            return new ServiceOffer(String.valueOf(declaration), ServiceRequirement.numbers(null));
        }
        Map<?, ?> entry = (Map<?, ?>) declaration;
        return new ServiceOffer(String.valueOf(entry.get("id")), ServiceRequirement.numbers(entry.get("attributes")));
    }

    /** @return the service id this entry registers */
    public String getId() {
        return id;
    }

    /** @return what the service claims, keyed by attribute name, or empty when it claims nothing */
    public Map<String, Double> getAttributes() {
        return attributes;
    }
}
