package io.github.intisy.ai.engine;

import java.util.Map;

/**
 * A registration that can answer for itself: what it offers right now, and whether it will serve a
 * consumer asking under constraints.
 *
 * @implNote Separate from the service instance so a provider may serve different instances to
 * differently constrained consumers, and so a consumer's constraints are compared against what is
 * true NOW rather than against what a manifest claimed when it was written.
 */
public interface ServiceProvider {

    /**
     * What this provider offers right now, keyed by attribute name.
     *
     * @return the live attributes, or empty when it has nothing live to add, which leaves the
     * advertised claim standing rather than erasing it
     */
    Map<String, Double> attributes();

    /**
     * The instance to serve a consumer asking under these constraints.
     *
     * @param constraints what the consumer needs, keyed by constraint name, empty when it asks
     * for nothing in particular
     * @return the service to hand over, or null when this provider will not serve under them
     */
    Object serviceFor(Map<String, Double> constraints);
}
