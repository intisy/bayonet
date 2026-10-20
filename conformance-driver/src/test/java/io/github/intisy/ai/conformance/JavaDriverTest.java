package io.github.intisy.ai.conformance;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assumptions.assumeTrue;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;
import org.junit.jupiter.api.Test;

/**
 * Asserts the CONTRACT and not the result: every vector is answered or declined, and nothing
 * crashes. What this engine can and cannot witness is the measurement, so it is frozen here as a
 * set rather than left to a run nobody reads.
 */
class JavaDriverTest {

    private static final Gson GSON = new Gson();

    /**
     * EMPTY, and that is the measurement: the twelve vectors this engine declined when the kit
     * first ran are the four gaps, and all four are in. A vector reappearing here is a regression,
     * which is why the set is asserted rather than the count.
     */
    private static final List<String> UNWITNESSED = Collections.emptyList();

    @Test
    void answersOrDeclinesEveryVectorWithoutCrashing() throws IOException {
        List<Map<String, Object>> corpus = corpus();
        assumeTrue(!corpus.isEmpty(), "the conformance corpus is not beside this checkout");
        assertEquals(35, corpus.size(), "the corpus changed size, so the measurement below is stale");
        for (Map<String, Object> vector : corpus) {
            Map<String, Object> outcome = JavaDriver.answer(vector);
            assertNotNull(outcome.get("result"), vector.get("id") + " produced no answer at all");
            assertEquals(vector.get("id"), outcome.get("id"));
        }
    }

    @Test
    void declinesNothing() throws IOException {
        List<Map<String, Object>> corpus = corpus();
        assumeTrue(!corpus.isEmpty(), "the conformance corpus is not beside this checkout");
        TreeSet<String> declined = new TreeSet<String>();
        for (Map<String, Object> vector : corpus) {
            Map<String, Object> outcome = JavaDriver.answer(vector);
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

    /**
     * @implNote A caller that NAMES the corpus is held to it: the path is checked here rather than
     * left to {@code assumeTrue}, because a CI that points at the wrong directory would otherwise
     * report the same SKIPPED as a developer who has not checked the kit out, and a gate that
     * cannot tell those two apart is the gate this task exists to fix.
     */
    private static File vectorsDirectory() {
        String override = System.getProperty("conformance.vectors");
        if (override == null) {
            return new File("../../conformance/vectors").getAbsoluteFile();
        }
        File named = new File(override);
        if (!named.isDirectory()) {
            throw new IllegalStateException("conformance.vectors names \"" + named.getAbsolutePath()
                + "\", which is not a directory: the corpus was asked for by path and is not there");
        }
        return named;
    }

    /**
     * The driver is the measuring instrument, so its defaults have to be the vocabulary's. A bare
     * requirement is OPTIONAL everywhere else: the published schema says so, `ServiceRequirement`
     * reads it so, and the `order` op in this same driver reads it so. No boot vector omits
     * `optional` today, which is exactly why a disagreement here would be attributed to the engine.
     */
    @Test
    void readsAnAbsentOptionalAsOptionalInABootVector() {
        Map<String, Object> need = new LinkedHashMap<String, Object>();
        need.put("id", "storage.object");
        Map<String, Object> unit = new LinkedHashMap<String, Object>();
        unit.put("id", "api.http");
        unit.put("provides", Collections.singletonList("api.http"));
        unit.put("requires", Collections.singletonList(need));
        Map<String, Object> given = new LinkedHashMap<String, Object>();
        given.put("units", Collections.singletonList(unit));
        Map<String, Object> vector = new LinkedHashMap<String, Object>();
        vector.put("id", "boot/a-bare-requirement");
        vector.put("op", "boot");
        vector.put("given", given);

        Map<String, Object> result = resultOf(JavaDriver.answer(vector));
        assertEquals(Collections.singletonList("api.http"), result.get("started"), String.valueOf(result));
        assertNull(result.get("refusal"), String.valueOf(result));
    }

    @SuppressWarnings("unchecked")
    private static Map<String, Object> resultOf(Map<String, Object> outcome) {
        return (Map<String, Object>) outcome.get("result");
    }
}
