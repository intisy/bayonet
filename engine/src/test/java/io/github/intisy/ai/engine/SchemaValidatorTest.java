package io.github.intisy.ai.engine;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;

class SchemaValidatorTest {

    private static JsonSchema idAndApi() {
        JsonSchema id = JsonSchema.ofType("string");
        id.setPattern("^[a-z0-9]+(-[a-z0-9]+)*$");
        id.setFix("use lowercase words joined by single hyphens");
        JsonSchema api = JsonSchema.ofType("integer");
        api.setMinimum(Integer.valueOf(1));
        JsonSchema root = JsonSchema.ofType("object");
        root.setRequired(Arrays.asList("id", "api"));
        Map<String, JsonSchema> properties = new HashMap<String, JsonSchema>();
        properties.put("id", id);
        properties.put("api", api);
        root.setProperties(properties);
        return root;
    }

    private static Map<String, Object> manifest(Object id, Object api) {
        Map<String, Object> value = new HashMap<String, Object>();
        if (id != null) value.put("id", id);
        if (api != null) value.put("api", api);
        return value;
    }

    @Test
    void acceptsAValidObject() {
        List<SchemaIssue> issues = SchemaValidator.validate(manifest("config-ledger", Integer.valueOf(2)), idAndApi(), "(root)", "config-ledger");
        assertTrue(issues.isEmpty(), issues.toString());
    }

    @Test
    void reportsAMissingRequiredField() {
        List<SchemaIssue> issues = SchemaValidator.validate(manifest(null, Integer.valueOf(2)), idAndApi(), "(root)", "the manifest");
        assertEquals(1, issues.size());
        assertEquals("id", issues.get(0).getPath());
        assertTrue(issues.get(0).getMessage().contains("required"));
    }

    @Test
    void reportsAWrongType() {
        List<SchemaIssue> issues = SchemaValidator.validate(manifest(Integer.valueOf(7), Integer.valueOf(2)), idAndApi(), "(root)", "the manifest");
        assertEquals(1, issues.size());
        assertEquals("id", issues.get(0).getPath());
    }

    @Test
    void reportsAPatternMissAndPrefersTheSchemasOwnFix() {
        List<SchemaIssue> issues = SchemaValidator.validate(manifest("Config Ledger", Integer.valueOf(2)), idAndApi(), "(root)", "the manifest");
        assertEquals(1, issues.size());
        assertEquals("use lowercase words joined by single hyphens", issues.get(0).getFix());
    }

    @Test
    void ignoresAnUnknownFieldBecauseVocabulariesAreOpen() {
        Map<String, Object> value = manifest("config-ledger", Integer.valueOf(2));
        value.put("somethingFromNextYear", "whatever");
        assertTrue(SchemaValidator.validate(value, idAndApi(), "(root)", "config-ledger").isEmpty());
    }

    @Test
    void walksArrayItemsAndNumbersTheirPaths() {
        JsonSchema strings = JsonSchema.ofType("array");
        strings.setItems(JsonSchema.ofType("string"));
        List<Object> values = new ArrayList<Object>();
        values.add("fine");
        values.add(Integer.valueOf(3));
        List<SchemaIssue> issues = SchemaValidator.validate(values, strings, "capabilities", "config-ledger");
        assertEquals(1, issues.size());
        assertEquals("capabilities[1]", issues.get(0).getPath());
    }

    @Test
    void enforcesAMinimum() {
        List<SchemaIssue> issues = SchemaValidator.validate(manifest("config-ledger", Integer.valueOf(0)), idAndApi(), "(root)", "the manifest");
        assertEquals(1, issues.size());
        assertEquals("api", issues.get(0).getPath());
        assertTrue(issues.get(0).getMessage().contains(">= 1"));
    }

    @Test
    void checksEveryValueOfARecordAgainstItsAdditionalPropertiesSchema() {
        JsonSchema record = JsonSchema.ofType("object");
        record.setAdditionalProperties(JsonSchema.ofType("string"));
        Map<String, Object> icons = new HashMap<String, Object>();
        icons.put("good", "icon.svg");
        icons.put("bad", Integer.valueOf(1));
        List<SchemaIssue> issues = SchemaValidator.validate(icons, record, "presentation", "a-plugin");
        assertEquals(1, issues.size());
        assertEquals("presentation.bad", issues.get(0).getPath());
    }

    private static JsonSchema entryOnceCapabilities() {
        JsonSchema whenCapabilities = JsonSchema.ofType("object");
        whenCapabilities.setRequired(Arrays.asList("capabilities"));
        JsonSchema someCapabilities = JsonSchema.ofType("array");
        someCapabilities.setMinItems(Integer.valueOf(1));
        whenCapabilities.setProperties(single("capabilities", someCapabilities));
        JsonSchema thenEntry = JsonSchema.ofType("object");
        thenEntry.setRequired(Arrays.asList("entry"));
        JsonSchema entry = JsonSchema.ofType("string");
        entry.setMinLength(Integer.valueOf(1));
        thenEntry.setProperties(single("entry", entry));
        JsonSchema root = JsonSchema.ofType("object");
        root.setIf(whenCapabilities);
        root.setThen(thenEntry);
        return root;
    }

    private static Map<String, JsonSchema> single(String key, JsonSchema schema) {
        Map<String, JsonSchema> properties = new HashMap<String, JsonSchema>();
        properties.put(key, schema);
        return properties;
    }

    private static Map<String, Object> record(String key, Object value) {
        Map<String, Object> record = new HashMap<String, Object>();
        record.put(key, value);
        return record;
    }

    @Test
    void appliesThenWhenIfHolds() {
        List<SchemaIssue> issues = SchemaValidator.validate(record("capabilities", Arrays.asList("p")), entryOnceCapabilities(), "(root)", null);
        assertEquals(1, issues.size(), issues.toString());
        assertEquals("entry", issues.get(0).getPath());
    }

    @Test
    void skipsThenWhenIfFails() {
        List<SchemaIssue> issues = SchemaValidator.validate(record("capabilities", new ArrayList<Object>()), entryOnceCapabilities(), "(root)", null);
        assertTrue(issues.isEmpty(), issues.toString());
    }

    @Test
    void refusesRepeatedItemsWhenUniqueItems() {
        JsonSchema list = JsonSchema.ofType("array");
        list.setItems(JsonSchema.ofType("string"));
        list.setUniqueItems(Boolean.TRUE);
        List<SchemaIssue> issues = SchemaValidator.validate(Arrays.asList("a", "b", "a"), list, "capabilities", null);
        assertEquals(1, issues.size(), issues.toString());
        assertEquals("capabilities[2]", issues.get(0).getPath());
        assertEquals("remove the duplicate entry", issues.get(0).getFix());
    }

    @Test
    void refusesShortStringAndArray() {
        JsonSchema text = JsonSchema.ofType("string");
        text.setMinLength(Integer.valueOf(1));
        assertEquals(1, SchemaValidator.validate("", text, "entry", null).size());
        JsonSchema list = JsonSchema.ofType("array");
        list.setMinItems(Integer.valueOf(1));
        assertEquals(1, SchemaValidator.validate(new ArrayList<Object>(), list, "capabilities", null).size());
    }
}
