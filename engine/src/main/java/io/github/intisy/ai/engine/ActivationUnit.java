package io.github.intisy.ai.engine;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/** One thing to activate, with what it offers the others and what it needs from them. */
public final class ActivationUnit {

    /** One service or capability a unit offers. */
    public static final class Offer {
        private final DeclarationKind kind;
        private final String id;

        /**
         * @param kind whether the offer is a service or a capability
         * @param id the service or capability id offered
         */
        public Offer(DeclarationKind kind, String id) {
            this.kind = kind;
            this.id = id;
        }

        /** @return whether this offer is a service or a capability */
        public DeclarationKind getKind() {
            return kind;
        }

        /** @return the service or capability id offered */
        public String getId() {
            return id;
        }
    }

    /** One service or capability a unit needs, and what its absence or its shortfall costs. */
    public static final class Need {
        private final DeclarationKind kind;
        private final String id;
        private final boolean optional;
        private final boolean degradable;

        /**
         * @param kind whether the need is a service or a capability
         * @param id the service or capability id needed
         * @param optional whether the unit still starts when nothing offers it
         * @param degradable whether the unit accepts an offer that never satisfies its constraints
         */
        public Need(DeclarationKind kind, String id, boolean optional, boolean degradable) {
            this.kind = kind;
            this.id = id;
            this.optional = optional;
            this.degradable = degradable;
        }

        /** @return whether this need is a service or a capability */
        public DeclarationKind getKind() {
            return kind;
        }

        /** @return the service or capability id needed */
        public String getId() {
            return id;
        }

        /** @return whether the unit still starts when nothing offers it */
        public boolean isOptional() {
            return optional;
        }

        /**
         * @return whether the unit accepts an offer that never satisfies its constraints
         * @implNote A different axis from {@link #isOptional()}, never a softer form of it: a need
         * that is degradable and not optional is still refused when nothing offers it at all.
         */
        public boolean isDegradable() {
            return degradable;
        }
    }

    private final String id;
    private final List<Offer> provides;
    private final List<Need> requires;

    /**
     * @param id the unit's own id
     * @param provides what it offers, copied so later mutation of the argument has no effect
     * @param requires what it needs, copied so later mutation of the argument has no effect
     */
    public ActivationUnit(String id, List<Offer> provides, List<Need> requires) {
        this.id = id;
        this.provides = provides == null ? new ArrayList<Offer>() : new ArrayList<Offer>(provides);
        this.requires = requires == null ? new ArrayList<Need>() : new ArrayList<Need>(requires);
    }

    /** @return the unit's own id */
    public String getId() {
        return id;
    }

    /** @return what the unit offers */
    public List<Offer> getProvides() {
        return Collections.unmodifiableList(provides);
    }

    /** @return what the unit needs */
    public List<Need> getRequires() {
        return Collections.unmodifiableList(requires);
    }
}
