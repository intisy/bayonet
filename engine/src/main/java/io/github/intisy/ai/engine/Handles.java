package io.github.intisy.ai.engine;

/**
 * How a served service is wrapped so that calls made after it is withdrawn fail.
 *
 * @implNote A seam rather than an implementation, for the reason {@link Scheduler} is one: this
 * module transpiles, so it cannot reach for a JDK dynamic proxy, and the JavaScript target has its
 * own Proxy that needs no reflection at all. The portable default REPORTS that it cannot wrap
 * rather than pretending it did, because a consumer silently handed a dead object is the failure
 * this seam exists to prevent.
 */
public interface Handles {

    /** One served instance, and the means to kill it. */
    interface Handle {
        /** @return what the consumer receives, which is the wrapper when there is one */
        Object get();

        /** Makes every later call through {@link #get} fail with {@link ServiceRevoked}. */
        void revoke();
    }

    /**
     * @param serviceId the id the service is registered under, named in a revoked call's failure
     * @param service the instance to wrap
     * @return a handle to hand the consumer
     */
    Handle around(String serviceId, Object service);

    /**
     * The backing of a host that has supplied none: it hands the service over as it is, and says so
     * at the moment that costs something.
     *
     * @implNote Reported on REVOCATION rather than on wrapping. Wrapping is the happy path and
     * happens on every lookup, so reporting there would bury the log in a warning about something
     * that has not happened yet; withdrawal is the moment the promise is actually broken, and it is
     * rare. A silent fallback is what this seam exists to prevent, so this one is not silent, it is
     * quiet until it matters.
     */
    Handles UNWRAPPED = new Handles() {
        @Override
        public Handle around(final String serviceId, final Object service) {
            return new Handle() {
                @Override
                public Object get() {
                    return service;
                }

                @Override
                public void revoke() {
                    Diagnostics.report("service \"" + serviceId + "\" was withdrawn, and a consumer"
                            + " holding it was handed the instance unwrapped, so nothing will tell it");
                }
            };
        }
    };
}
