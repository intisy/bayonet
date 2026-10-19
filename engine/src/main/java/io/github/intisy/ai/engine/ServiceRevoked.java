package io.github.intisy.ai.engine;

/**
 * What a call on a service that has since been withdrawn throws.
 *
 * @implNote A consumer that already holds a service learns nothing from a watch it never
 * installed, so the handle it holds has to be what tells it. Distinct from {@link PluginException}
 * because nothing here is a plugin's mistake: the service was correct, and then it was gone.
 */
public final class ServiceRevoked extends RuntimeException {

    private static final long serialVersionUID = 1L;

    /** The id of the service that was withdrawn. */
    private final String serviceId;

    /** @param serviceId the id of the service that was withdrawn */
    public ServiceRevoked(String serviceId) {
        super("service \"" + serviceId + "\" was withdrawn while a consumer was still holding it");
        this.serviceId = serviceId;
    }

    /** @return the id of the service that was withdrawn */
    public String getServiceId() {
        return serviceId;
    }
}
