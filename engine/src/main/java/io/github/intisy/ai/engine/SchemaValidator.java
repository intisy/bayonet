package io.github.intisy.ai.engine;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

/**
 * Checks a parsed JSON tree against a {@link JsonSchema}, collecting every problem rather than
 * stopping at the first.
 *
 * @implNote The tree is Map, List, String, Number, Boolean and null, which is what a host holds
 * after parsing a sidecar. Taking a tree rather than a typed object is what keeps this module
 * dependency-free and therefore transpilable.
 */
public final class SchemaValidator {

    private SchemaValidator() {
    }

    /**
     * Checks {@code value} against {@code schema}, collecting every problem rather than stopping at
     * the first.
     *
     * @param value the parsed JSON value to check
     * @param schema the schema to check it against
     * @param path the dotted path to prefix every issue's location with; null is treated as "(root)"
     * @param source who supplied the value, for the diagnostic an ignored unknown field produces;
     * null ignores silently
     * @return every issue found, or empty when {@code value} matches {@code schema}
     */
    public static List<SchemaIssue> validate(Object value, JsonSchema schema, String path, String source) {
        List<SchemaIssue> issues = new ArrayList<SchemaIssue>();
        check(value, schema, path == null ? "(root)" : path, issues, source);
        return issues;
    }

    private static void check(Object value, JsonSchema schema, String path, List<SchemaIssue> issues, String source) {
        if (schema.getAnyOf() != null) {
            checkAlternatives(value, schema, path, issues, source);
            return;
        }
        String type = schema.getType();
        if ("object".equals(type)) {
            checkObject(value, schema, path, issues, source);
        } else if ("array".equals(type)) {
            checkArray(value, schema, path, issues, source);
        } else if ("string".equals(type)) {
            checkString(value, schema, path, issues);
        } else if ("integer".equals(type) || "number".equals(type)) {
            checkNumber(value, schema, path, issues);
        } else if ("boolean".equals(type) && !(value instanceof Boolean)) {
            issues.add(typeIssue(value, schema, path));
        }
        if (issues.isEmpty()) {
            checkConditional(value, schema, path, issues);
        }
    }

    /**
     * @implNote The `then` branch is checked with no diagnostics source, because its schema names only
     * the fields the condition is about and every other field would otherwise be reported as unknown.
     * A field `then` requires takes its fix from the enclosing schema's own property, which is where
     * the author-facing hint for that field lives.
     */
    private static void checkConditional(Object value, JsonSchema schema, String path, List<SchemaIssue> issues) {
        JsonSchema condition = schema.getIf();
        JsonSchema consequence = schema.getThen();
        if (condition == null || consequence == null || !validate(value, condition, path, null).isEmpty()) {
            return;
        }
        for (SchemaIssue issue : validate(value, consequence, path, null)) {
            issues.add(withEnclosingFix(issue, schema, path));
        }
    }

    private static SchemaIssue withEnclosingFix(SchemaIssue issue, JsonSchema enclosing, String path) {
        String prefix = "(root)".equals(path) ? "" : path + ".";
        String key = issue.getPath().startsWith(prefix) ? issue.getPath().substring(prefix.length()) : issue.getPath();
        JsonSchema own = property(enclosing.getThen(), key);
        JsonSchema property = property(enclosing, key);
        if ((own != null && own.getFix() != null) || property == null || property.getFix() == null
                || !issue.getMessage().startsWith("required field")) {
            return issue;
        }
        return new SchemaIssue(issue.getPath(), issue.getMessage(), property.getFix());
    }

    /**
     * @implNote An author who wrote the right KIND of value and got one field wrong is told which
     * field: when exactly one alternative takes values of this kind, its own issues are the issues,
     * so "optional expected boolean" survives instead of being flattened into "expected a string or
     * an object". Only a value no alternative could have meant is reported against the union.
     */
    private static void checkAlternatives(Object value, JsonSchema schema, String path, List<SchemaIssue> issues, String source) {
        List<JsonSchema> alternatives = schema.getAnyOf();
        JsonSchema sameKind = null;
        int sameKindCount = 0;
        for (JsonSchema alternative : alternatives) {
            if (validate(value, alternative, path, null).isEmpty()) {
                check(value, alternative, path, issues, source);
                return;
            }
            if (describe(value).equals(alternative.getType())) {
                sameKind = alternative;
                sameKindCount++;
            }
        }
        if (sameKindCount == 1) {
            check(value, sameKind, path, issues, source);
            return;
        }
        issues.add(new SchemaIssue(path, "expected " + alternativesOf(alternatives) + ", got " + describe(value),
                schema.getFix() != null ? schema.getFix() : "set " + path + " to " + alternativesOf(alternatives)));
    }

    private static String alternativesOf(List<JsonSchema> alternatives) {
        StringBuilder out = new StringBuilder();
        for (int index = 0; index < alternatives.size(); index++) {
            if (index > 0) {
                out.append(index == alternatives.size() - 1 ? " or " : ", ");
            }
            out.append(article(alternatives.get(index).getType()));
        }
        return out.toString();
    }

    private static String article(String type) {
        if (type == null) {
            return "another shape";
        }
        return ("object".equals(type) || "array".equals(type) || "integer".equals(type) ? "an " : "a ") + type;
    }

    private static void checkObject(Object value, JsonSchema schema, String path, List<SchemaIssue> issues, String source) {
        if (!(value instanceof Map)) {
            issues.add(typeIssue(value, schema, path));
            return;
        }
        Map<?, ?> record = (Map<?, ?>) value;
        List<String> required = schema.getRequired();
        if (required != null) {
            for (String key : required) {
                if (record.get(key) != null) {
                    continue;
                }
                JsonSchema child = property(schema, key);
                issues.add(new SchemaIssue(
                        childPath(path, key),
                        "required field \"" + key + "\" is missing",
                        child != null && child.getFix() != null ? child.getFix() : "add \"" + key + "\" to " + path));
            }
        }
        for (Map.Entry<?, ?> entry : record.entrySet()) {
            if (entry.getValue() == null) {
                continue;
            }
            String key = String.valueOf(entry.getKey());
            JsonSchema childSchema = property(schema, key);
            if (childSchema == null) {
                childSchema = schema.getAdditionalProperties();
            }
            if (childSchema == null) {
                if (source != null) {
                    Diagnostics.ignoreUnknown("field", childPath(path, key), source);
                }
                continue;
            }
            check(entry.getValue(), childSchema, childPath(path, key), issues, source);
        }
    }

    private static JsonSchema property(JsonSchema schema, String key) {
        Map<String, JsonSchema> properties = schema.getProperties();
        return properties == null ? null : properties.get(key);
    }

    private static void checkArray(Object value, JsonSchema schema, String path, List<SchemaIssue> issues, String source) {
        if (!(value instanceof List)) {
            issues.add(typeIssue(value, schema, path));
            return;
        }
        List<?> values = (List<?>) value;
        Integer minItems = schema.getMinItems();
        if (minItems != null && values.size() < minItems.intValue()) {
            issues.add(new SchemaIssue(path, "expected at least " + minItems + " items, got " + values.size(),
                    schema.getFix() != null ? schema.getFix() : "give " + path + " at least " + minItems + " items"));
        }
        JsonSchema items = schema.getItems();
        if (items != null) {
            for (int index = 0; index < values.size(); index++) {
                check(values.get(index), items, path + "[" + index + "]", issues, source);
            }
        }
        if (Boolean.TRUE.equals(schema.getUniqueItems())) {
            checkUnique(values, path, issues);
        }
    }

    private static void checkUnique(List<?> values, String path, List<SchemaIssue> issues) {
        for (int index = 1; index < values.size(); index++) {
            if (values.subList(0, index).contains(values.get(index))) {
                issues.add(new SchemaIssue(path + "[" + index + "]",
                        "\"" + values.get(index) + "\" is listed twice", "remove the duplicate entry"));
            }
        }
    }

    private static void checkString(Object value, JsonSchema schema, String path, List<SchemaIssue> issues) {
        if (!(value instanceof String)) {
            issues.add(typeIssue(value, schema, path));
            return;
        }
        String text = (String) value;
        Integer minLength = schema.getMinLength();
        if (minLength != null && text.length() < minLength.intValue()) {
            issues.add(new SchemaIssue(path, "expected at least " + minLength + " characters, got " + text.length(),
                    schema.getFix() != null ? schema.getFix() : "give " + path + " at least " + minLength + " characters"));
        }
        String pattern = schema.getPattern();
        // find() rather than matches(): the TypeScript uses RegExp.test, which is unanchored, and the
        // manifest patterns supply their own anchors.
        if (pattern != null && !Pattern.compile(pattern).matcher(text).find()) {
            issues.add(new SchemaIssue(path, "\"" + text + "\" does not match " + pattern,
                    schema.getFix() != null ? schema.getFix() : "make " + path + " match " + pattern));
        }
        List<String> allowed = schema.getEnumValues();
        if (allowed != null && !allowed.contains(text)) {
            String joined = join(allowed);
            issues.add(new SchemaIssue(path, "\"" + text + "\" is not one of " + joined,
                    schema.getFix() != null ? schema.getFix() : "set " + path + " to one of " + joined));
        }
    }

    private static void checkNumber(Object value, JsonSchema schema, String path, List<SchemaIssue> issues) {
        if (!(value instanceof Number) || isNotANumber((Number) value)
                || ("integer".equals(schema.getType()) && !isIntegral((Number) value))) {
            issues.add(typeIssue(value, schema, path));
            return;
        }
        Integer minimum = schema.getMinimum();
        if (minimum != null && ((Number) value).doubleValue() < minimum.doubleValue()) {
            issues.add(new SchemaIssue(path,
                    "expected a value >= " + minimum + ", got " + describeNumber((Number) value),
                    schema.getFix() != null ? schema.getFix() : "set " + path + " to a value >= " + minimum));
        }
    }

    private static boolean isNotANumber(Number value) {
        double asDouble = value.doubleValue();
        return Double.isNaN(asDouble) || Double.isInfinite(asDouble);
    }

    private static boolean isIntegral(Number value) {
        double asDouble = value.doubleValue();
        return asDouble == Math.floor(asDouble);
    }

    private static String describeNumber(Number value) {
        double asDouble = value.doubleValue();
        return asDouble == Math.floor(asDouble) ? String.valueOf((long) asDouble) : String.valueOf(asDouble);
    }

    private static SchemaIssue typeIssue(Object value, JsonSchema schema, String path) {
        return new SchemaIssue(path, "expected " + schema.getType() + ", got " + describe(value),
                schema.getFix() != null ? schema.getFix() : "set " + path + " to a " + schema.getType());
    }

    /** The names the TypeScript reports, so a message reads identically whichever side produced it. */
    private static String describe(Object value) {
        if (value == null) {
            return "null";
        }
        if (value instanceof List) {
            return "array";
        }
        if (value instanceof String) {
            return "string";
        }
        if (value instanceof Boolean) {
            return "boolean";
        }
        if (value instanceof Number) {
            return "number";
        }
        return "object";
    }

    private static String join(List<String> values) {
        StringBuilder out = new StringBuilder();
        for (int index = 0; index < values.size(); index++) {
            if (index > 0) {
                out.append(", ");
            }
            out.append(values.get(index));
        }
        return out.toString();
    }

    private static String childPath(String path, String key) {
        return "(root)".equals(path) ? key : path + "." + key;
    }
}
