package io.github.intisy.ai.conformance;

/**
 * The service a revoke vector registers and holds.
 *
 * @implNote An interface because that is what every real service is, and what a JVM handle needs
 * to stand in for one. A bare class with no interface is its own case, covered by the seam's own
 * test rather than by a vector.
 */
interface ConformanceService {
    /** @return something to call, so a revoked call has something to fail at */
    String name();
}
