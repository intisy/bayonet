package io.github.intisy.ai.engine;

/**
 * What a unit's declaration names.
 *
 * @implNote The two are ordered on different graphs and deliberately so: a service is the
 * plugin-to-plugin channel during activation, while a capability is consumed by the host after
 * every activation finishes. Which one draws the edges is the caller's to say, because the answer
 * differs between a plugin host and a kernel rather than between two opinions.
 */
public enum DeclarationKind {
    /** A service one unit registers for another to look up. */
    SERVICE,
    /** A host-facing ability a unit provides once it is active. */
    CAPABILITY
}
