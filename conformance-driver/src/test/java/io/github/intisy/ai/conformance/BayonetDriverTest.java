package io.github.intisy.ai.conformance;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assumptions.assumeTrue;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;
import org.junit.jupiter.api.Test;

/**
 * Asserts the CONTRACT and not the result: every vector is answered or declined, and nothing
 * crashes. What this engine can and cannot witness is the measurement, so it is frozen here as a
 * set rather than left to a run nobody reads.
 */
class BayonetDriverTest {

    private static final Gson GSON = new Gson();

    /**
     * Twelve of twenty-two, which is four gaps rather than the three the design names: constraints
     * (resolve), per-requirement activation policy (boot), the edge source (order under
     * capabilities), and REVOCATION, which no gap in section 5 covers.
     */
    private static final List<String> UNWITNESSED = Arrays.asList(
        "boot/refuses-a-degradable-requirement-that-is-not-optional",
        "boot/refuses-a-missing-mandatory-requirement",
        "boot/starts-without-a-missing-optional-requirement",
        "order/orders-a-capability-provider-before-its-consumer",
        "order/orders-an-optional-requirement-that-is-present",
        "order/reports-a-cycle-with-its-members",
        "resolve/an-empty-live-attribute-map-keeps-the-advertised-claim",
        "resolve/asks-with-the-consumers-constraints-before-falling-back",
        "resolve/degrades-when-never-satisfied-and-degradable",
        "resolve/refuses-when-never-satisfied-and-not-degradable",
        "resolve/serves-when-attributes-satisfy-before-the-deadline",
        "revoke/a-revoked-handle-says-so");

    @Test
    void answersOrDeclinesEveryVectorWithoutCrashing() throws IOException {
        List<Map<String, Object>> corpus = corpus();
        assumeTrue(!corpus.isEmpty(), "the conformance corpus is not beside this checkout");
        assertEquals(22, corpus.size(), "the corpus changed size, so the measurement below is stale");
        for (Map<String, Object> vector : corpus) {
            Map<String, Object> outcome = BayonetDriver.answer(vector);
            assertNotNull(outcome.get("result"), vector.get("id") + " produced no answer at all");
            assertEquals(vector.get("id"), outcome.get("id"));
        }
    }

    @Test
    void declinesExactlyWhatThisEngineCannotBeAsked() throws IOException {
        List<Map<String, Object>> corpus = corpus();
        assumeTrue(!corpus.isEmpty(), "the conformance corpus is not beside this checkout");
        TreeSet<String> declined = new TreeSet<String>();
        for (Map<String, Object> vector : corpus) {
            Map<String, Object> outcome = BayonetDriver.answer(vector);
            if (Boolean.FALSE.equals(outcome.get("witnessed"))) {
                declined.add(String.valueOf(vector.get("id")));
                assertTrue(reasonOf(outcome).length() > 20,
                    vector.get("id") + " is declined without saying why");
            }
        }
        assertEquals(new TreeSet<String>(UNWITNESSED), declined);
    }

    @SuppressWarnings("unchecked")
    private static String reasonOf(Map<String, Object> outcome) {
        Object reason = ((Map<String, Object>) outcome.get("result")).get("reason");
        return reason == null ? "" : String.valueOf(reason);
    }

    private static List<Map<String, Object>> corpus() throws IOException {
        File directory = vectorsDirectory();
        if (!directory.isDirectory()) {
            return Collections.emptyList();
        }
        List<File> files = new ArrayList<File>();
        collectJson(directory, files);
        Collections.sort(files);
        List<Map<String, Object>> corpus = new ArrayList<Map<String, Object>>();
        for (File file : files) {
            String text = new String(Files.readAllBytes(file.toPath()), StandardCharsets.UTF_8);
            corpus.add(GSON.<Map<String, Object>>fromJson(text, new TypeToken<Map<String, Object>>() {
            }.getType()));
        }
        return corpus;
    }

    private static void collectJson(File directory, List<File> found) {
        File[] entries = directory.listFiles();
        if (entries == null) {
            return;
        }
        for (File entry : entries) {
            if (entry.isDirectory()) {
                collectJson(entry, found);
            } else if (entry.getName().endsWith(".json")) {
                found.add(entry);
            }
        }
    }

    private static File vectorsDirectory() {
        String override = System.getProperty("conformance.vectors");
        return override != null
            ? new File(override)
            : new File("../../../../weivel/engine-conformance/vectors").getAbsoluteFile();
    }
}
