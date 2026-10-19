package io.github.intisy.ai.engine;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * Which constraint name is compared against which advertised attribute, and in which direction.
 *
 * @implNote Supplied by the host rather than held as a constant, for the reason the well-known
 * service ids are: this package mints no vocabulary. "minReplicas" and "maxLatencyMs" are one
 * product's words, and an engine that knew them would be that product's engine.
 * @implNote A constraint no vocabulary declares is NOT satisfied, and says so. Treating it as met
 * would make a typo in a manifest read as a requirement nothing has to meet, which is the silent
 * default this tree keeps being burned by; refusing to match is the loud half of the same
 * open-vocabulary rule that ignores an unknown FIELD.
 */
public final class ConstraintVocabulary {

    /** Whether a constraint sets a floor under the advertised value or a ceiling over it. */
    public enum Bound {
        /** The advertised value must be at most the constraint, as a latency ceiling is. */
        UPPER,
        /** The advertised value must be at least the constraint, as a replica floor is. */
        LOWER
    }

    /** One constraint name, the attribute it is compared against, and the direction. */
    public static final class Entry {
        private final String constraintName;
        private final String attributeName;
        private final Bound bound;

        /**
         * @param constraintName the name a consumer writes in its requirement
         * @param attributeName the name a provider advertises it under
         * @param bound whether the advertised value must be at least or at most the constraint
         */
        public Entry(String constraintName, String attributeName, Bound bound) {
            this.constraintName = constraintName;
            this.attributeName = attributeName;
            this.bound = bound;
        }

        /** @return the name a consumer writes in its requirement */
        public String getConstraintName() {
            return constraintName;
        }

        /** @return the name a provider advertises it under */
        public String getAttributeName() {
            return attributeName;
        }

        /** @return whether the advertised value must be at least or at most the constraint */
        public Bound getBound() {
            return bound;
        }

        boolean isSatisfiedBy(double constraint, double advertised) {
            return bound == Bound.UPPER ? advertised <= constraint : advertised >= constraint;
        }
    }

    /** The vocabulary of a host that has declared none, under which every constraint is unknown. */
    public static final ConstraintVocabulary EMPTY = of(Collections.<Entry>emptyList());

    private final List<Entry> entries;

    private ConstraintVocabulary(List<Entry> entries) {
        this.entries = entries;
    }

    /**
     * @param entries the constraint names this host understands
     * @return the vocabulary they describe
     */
    public static ConstraintVocabulary of(List<Entry> entries) {
        return new ConstraintVocabulary(entries == null
                ? new ArrayList<Entry>()
                : Collections.unmodifiableList(new ArrayList<Entry>(entries)));
    }

    /**
     * Whether what a provider advertises meets everything a consumer declared.
     *
     * @param declared what the consumer needs, keyed by constraint name
     * @param attributes what the provider offers, keyed by attribute name
     * @return true when every declared constraint is met
     */
    public boolean satisfies(Map<String, Double> declared, Map<String, Double> attributes) {
        for (Map.Entry<String, Double> constraint : declared.entrySet()) {
            Entry known = entryFor(constraint.getKey());
            if (known == null) {
                Diagnostics.report("constraint \"" + constraint.getKey()
                        + "\" is in no vocabulary this host declared, so nothing can satisfy it");
                return false;
            }
            Double advertised = attributes.get(known.getAttributeName());
            if (advertised == null
                    || !known.isSatisfiedBy(constraint.getValue().doubleValue(), advertised.doubleValue())) {
                return false;
            }
        }
        return true;
    }

    private Entry entryFor(String constraintName) {
        for (Entry entry : entries) {
            if (entry.getConstraintName().equals(constraintName)) {
                return entry;
            }
        }
        return null;
    }
}
