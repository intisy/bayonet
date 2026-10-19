package io.github.intisy.ai.engine;

import java.util.Collections;
import java.util.Map;

/** The providers a host needs without writing one. */
public final class ServiceProviders {

    private ServiceProviders() {
    }

    /**
     * A provider that serves one instance to everyone and claims nothing live.
     *
     * @param service the instance to serve
     * @return a provider answering that instance under any constraints
     * @implNote What a plain {@code register(id, service)} becomes, so the hub holds one shape.
     * Claiming nothing live leaves the declaration's advertised claim standing, which is the
     * overlay rule and not a special case for this provider.
     */
    public static ServiceProvider constant(final Object service) {
        return new ServiceProvider() {
            @Override
            public Map<String, Double> attributes() {
                return Collections.emptyMap();
            }

            @Override
            public Object serviceFor(Map<String, Double> constraints) {
                return service;
            }
        };
    }
}
