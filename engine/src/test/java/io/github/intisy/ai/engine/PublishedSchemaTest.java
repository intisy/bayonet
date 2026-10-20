package io.github.intisy.ai.engine;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.junit.jupiter.api.Test;

/**
 * Holds this package's in-memory schema to the published one.
 *
 * @implNote The published file is the SOURCE of the manifest vocabulary and this package is one of
 * its implementations, so the file is the expected side of every comparison below and the Java is
 * what moves. It used to be the other way round: the file was emitted from {@link ManifestSchema}
 * through the TeaVM bundle, which made the artefact every language validates against an output of
 * one of them, and left nothing to regenerate it once that bundle goes.
 * @implNote Trees are compared rather than text. A hand-maintained source file may be reformatted or
 * its keys reordered without changing what it says, and key order is not semantic in JSON; a byte
 * comparison would fail on a rewrap and teach the next reader to regenerate the file instead of
 * editing it.
 */
class PublishedSchemaTest {

    private static final File PUBLISHED = new File(System.getProperty("model.schema", "plugin.schema.json"));

    private static final String RULE = PUBLISHED.getName() + " is the source every implementation "
            + "validates against, and this package's ManifestSchema no longer implements it.\n"
            + "Edit the file only to change the vocabulary itself; otherwise make the Java match it.";

    @Test
    void implementsThePublishedSchemaExactly() throws IOException {
        assertTrue(PUBLISHED.isFile(), "plugin.schema.json is read from weivel/model, checked out beside this "
                + "repository; not found at " + System.getProperty("model.schema.searched", PUBLISHED.getAbsolutePath()));
        Object published = new TestJson(read(PUBLISHED)).read();
        Map<String, Object> java = ManifestSchema.get().toTree();
        List<String> differences = new ArrayList<String>();
        compare("", published, java, differences);
        assertTrue(differences.isEmpty(), report(differences));
    }

    private static String read(File file) throws IOException {
        return new String(Files.readAllBytes(file.toPath()), StandardCharsets.UTF_8);
    }

    private static String report(List<String> differences) {
        StringBuilder out = new StringBuilder(RULE);
        for (String difference : differences) {
            out.append("\n  ").append(difference);
        }
        return out.toString();
    }

    private static void compare(String path, Object published, Object java, List<String> out) {
        if (published instanceof Map && java instanceof Map) {
            compareObjects(path, asMap(published), asMap(java), out);
        } else if (published instanceof List && java instanceof List) {
            compareArrays(path, asList(published), asList(java), out);
        } else if (!equal(published, java)) {
            out.add(label(path) + ": the file has " + describe(published) + ", the Java has " + describe(java));
        }
    }

    private static void compareObjects(String path, Map<String, Object> published, Map<String, Object> java, List<String> out) {
        Set<String> keys = new LinkedHashSet<String>(published.keySet());
        keys.addAll(java.keySet());
        for (String key : keys) {
            String nested = path.isEmpty() ? key : path + "." + key;
            if (!published.containsKey(key)) {
                out.add(nested + ": absent from the file, the Java has " + describe(java.get(key)));
            } else if (!java.containsKey(key)) {
                out.add(nested + ": the file has " + describe(published.get(key)) + ", absent from the Java");
            } else {
                compare(nested, published.get(key), java.get(key), out);
            }
        }
    }

    private static void compareArrays(String path, List<Object> published, List<Object> java, List<String> out) {
        if (published.size() != java.size()) {
            out.add(label(path) + ": the file has " + published + ", the Java has " + java);
            return;
        }
        for (int index = 0; index < published.size(); index++) {
            compare(path + "[" + index + "]", published.get(index), java.get(index), out);
        }
    }

    private static String label(String path) {
        return path.isEmpty() ? "(the whole schema)" : path;
    }

    private static boolean equal(Object published, Object java) {
        return published == null ? java == null : published.equals(java);
    }

    private static String describe(Object value) {
        if (value instanceof Map) {
            return "an object of " + asMap(value).keySet();
        }
        if (value instanceof List) {
            return "an array " + value;
        }
        if (value instanceof String) {
            return "\"" + value + "\"";
        }
        return String.valueOf(value);
    }

    @SuppressWarnings("unchecked")
    private static List<Object> asList(Object value) {
        return (List<Object>) value;
    }

    @SuppressWarnings("unchecked")
    private static Map<String, Object> asMap(Object value) {
        return (Map<String, Object>) value;
    }
}
