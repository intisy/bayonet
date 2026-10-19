package io.github.intisy.ai.engine;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.junit.jupiter.api.Test;

class ManifestFactsTest {

    @Test
    void carriesTheTargetingItWasGiven() {
        ManifestFacts facts = new ManifestFacts("wakatime-sync", 1, null, null,
                Arrays.asList("forebay"), "payload");
        assertEquals(Arrays.asList("forebay"), facts.getTargets());
    }

    @Test
    void theShortConstructorTargetsNothingAndSoLoadsEverywhere() {
        ManifestFacts facts = new ManifestFacts("wakatime-sync", 1, null, null, "payload");
        assertTrue(facts.getTargets().isEmpty());
    }

    @Test
    void copiesTheTargetsSoLaterMutationOfTheArgumentDoesNothing() {
        List<String> given = new ArrayList<String>();
        given.add("forebay");
        ManifestFacts facts = new ManifestFacts("wakatime-sync", 1, null, null, given, "payload");
        given.add("studio");
        assertEquals(Arrays.asList("forebay"), facts.getTargets());
    }
}
