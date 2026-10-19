package io.github.intisy.ai.engine;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;

/**
 * Runs the shared fixture through the Java validator and asserts the issue paths it names.
 *
 * @implNote Not the parity test the standards forbid, which bans asserting the Java matches a
 * DELETED implementation. This is a frozen fixture, and its other reader is the TeaVM bundle's own
 * suite: the pair is what catches a compile that reads correct and behaves differently.
 * Its reader is {@link TestJson}.
 */
class ParityTest {

    private static final List<String> WELL_KNOWN = Arrays.asList("accounts", "routing", "activity");

    @TestFactory
    List<DynamicTest> agreesWithTheSharedFixture() throws IOException {
        File fixture = new File("../test/parity/manifests.json");
        String text = new String(Files.readAllBytes(fixture.toPath()), StandardCharsets.UTF_8);
        List<Object> cases = asList(new TestJson(text).read());
        List<DynamicTest> tests = new ArrayList<DynamicTest>();
        for (Object entry : cases) {
            final Map<String, Object> example = asMap(entry);
            String name = String.valueOf(example.get("name"));
            tests.add(DynamicTest.dynamicTest(name, new org.junit.jupiter.api.function.Executable() {
                @Override
                public void execute() {
                    List<Object> expected = asList(example.get("expectedPaths"));
                    List<String> expectedPaths = new ArrayList<String>();
                    for (Object path : expected) {
                        expectedPaths.add(String.valueOf(path));
                    }
                    List<SchemaIssue> issues = ManifestValidator.validate(example.get("manifest"), WELL_KNOWN);
                    List<String> actualPaths = new ArrayList<String>();
                    for (SchemaIssue issue : issues) {
                        actualPaths.add(issue.getPath());
                    }
                    assertEquals(expectedPaths, actualPaths, issues.toString());
                }
            }));
        }
        return tests;
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
