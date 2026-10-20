package io.github.intisy.ai.engine;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * The subset of JSON Schema draft-07 this package validates against.
 *
 * @implNote additionalProperties:false is deliberately unrepresentable: an object property with no
 * declared schema is ignored rather than rejected, which is how the open-vocabulary rule reaches the
 * manifest. Declaring additionalProperties as a schema instead is how a record type is expressed,
 * and every value in it is then checked against it.
 */
public final class JsonSchema {

    private final String type;
    private List<JsonSchema> anyOf;
    private String schemaDraft;
    private String schemaId;
    private String title;
    private String description;
    private Map<String, JsonSchema> properties;
    private List<String> required;
    private JsonSchema items;
    private JsonSchema additionalProperties;
    private String pattern;
    private Integer minimum;
    private Integer minLength;
    private Integer minItems;
    private Boolean uniqueItems;
    private JsonSchema ifSchema;
    private JsonSchema thenSchema;
    private List<String> enumValues;
    private String fix;

    private JsonSchema(String type) {
        this.type = type;
    }

    /**
     * @param type the JSON Schema type keyword this schema checks against, for example "string" or "object"
     * @return a new schema of that type, with every other keyword unset
     */
    public static JsonSchema ofType(String type) {
        return new JsonSchema(type);
    }

    /**
     * A value that matches at least one of several alternatives, which is how a field accepts both
     * a bare id and the object form that says more about it.
     *
     * @implNote The keyword is {@code anyOf} rather than {@code oneOf} because that is what this
     * package implements: the first alternative that matches wins and the rest are not tried.
     * The two are identical while the alternatives are disjoint, as a string and an object are,
     * and publishing the stricter keyword would make a third-party validator enforce something no
     * implementation here checks.
     *
     * @param alternatives the schemas a value may match, in the order they are reported
     * @return a new schema carrying no type of its own, matching a value that matches any alternative
     */
    public static JsonSchema anyOf(List<JsonSchema> alternatives) {
        JsonSchema schema = new JsonSchema(null);
        schema.anyOf = alternatives;
        return schema;
    }

    /** @return the JSON Schema type keyword this schema checks against */
    public String getType() {
        return type;
    }

    /** @return the alternatives a value may match, or null when this schema is not a union */
    public List<JsonSchema> getAnyOf() {
        return anyOf;
    }

    /** @param value the alternatives a value may match */
    public void setAnyOf(List<JsonSchema> value) {
        this.anyOf = value;
    }

    /** @return this schema's title, or null when unset */
    public String getTitle() {
        return title;
    }

    /** @param value this schema's title */
    public void setTitle(String value) {
        this.title = value;
    }

    /** @return this schema's description, or null when unset */
    public String getDescription() {
        return description;
    }

    /** @param value this schema's description */
    public void setDescription(String value) {
        this.description = value;
    }

    /** @return this object schema's named properties, keyed by property name, or null when it has none */
    public Map<String, JsonSchema> getProperties() {
        return properties;
    }

    /** @param value this object schema's named properties, keyed by property name */
    public void setProperties(Map<String, JsonSchema> value) {
        this.properties = value;
    }

    /** @return the property names required on a matching object, or null when none are required */
    public List<String> getRequired() {
        return required;
    }

    /** @param value the property names required on a matching object */
    public void setRequired(List<String> value) {
        this.required = value;
    }

    /** @return the schema every element of a matching array must satisfy, or null when this is not an array schema */
    public JsonSchema getItems() {
        return items;
    }

    /** @param value the schema every element of a matching array must satisfy */
    public void setItems(JsonSchema value) {
        this.items = value;
    }

    /** @return the schema an object's undeclared properties must satisfy, or null when they are ignored instead */
    public JsonSchema getAdditionalProperties() {
        return additionalProperties;
    }

    /** @param value the schema an object's undeclared properties must satisfy */
    public void setAdditionalProperties(JsonSchema value) {
        this.additionalProperties = value;
    }

    /** @return the regular expression a matching string must contain a match for, or null when unset */
    public String getPattern() {
        return pattern;
    }

    /** @param value the regular expression a matching string must contain a match for */
    public void setPattern(String value) {
        this.pattern = value;
    }

    /** @return the lowest value a matching number may hold, or null when unset */
    public Integer getMinimum() {
        return minimum;
    }

    /** @param value the lowest value a matching number may hold */
    public void setMinimum(Integer value) {
        this.minimum = value;
    }

    /**
     * Named enumValues because enum is a Java keyword.
     *
     * @return the exact values a matching string must be one of, or null when unset
     */
    public Integer getMinLength() {
        return minLength;
    }

    public void setMinLength(Integer value) {
        this.minLength = value;
    }

    public Integer getMinItems() {
        return minItems;
    }

    public void setMinItems(Integer value) {
        this.minItems = value;
    }

    public Boolean getUniqueItems() {
        return uniqueItems;
    }

    public void setUniqueItems(Boolean value) {
        this.uniqueItems = value;
    }

    /** @return the condition whose success applies {@link #getThen}, or null for none */
    public JsonSchema getIf() {
        return ifSchema;
    }

    public void setIf(JsonSchema value) {
        this.ifSchema = value;
    }

    /** @return the schema a value must also match when {@link #getIf} matches, or null for none */
    public JsonSchema getThen() {
        return thenSchema;
    }

    public void setThen(JsonSchema value) {
        this.thenSchema = value;
    }

    public List<String> getEnumValues() {
        return enumValues;
    }

    /** @param value the exact values a matching string must be one of */
    public void setEnumValues(List<String> value) {
        this.enumValues = value;
    }

    /**
     * @return the fix instruction to report when a value fails this schema, or null when unset
     * @implNote Not a JSON Schema keyword. Validators ignore unknown keywords, so carrying the fix
     * beside the rule keeps errors-that-teach a property of the data rather than of the reporter.
     */
    public String getFix() {
        return fix;
    }

    /** @param value the fix instruction to report when a value fails this schema */
    public void setFix(String value) {
        this.fix = value;
    }

    /**
     * Draft this schema is written against, emitted as $schema and otherwise unused.
     *
     * @return the draft URI, or null when unset
     */
    public String getSchemaDraft() {
        return schemaDraft;
    }

    /** @param value the draft URI to emit as $schema */
    public void setSchemaDraft(String value) {
        this.schemaDraft = value;
    }

    /**
     * Canonical URL this schema is published at, emitted as $id and otherwise unused.
     *
     * @return the canonical URL, or null when unset
     */
    public String getSchemaId() {
        return schemaId;
    }

    /** @param value the canonical URL to emit as $id */
    public void setSchemaId(String value) {
        this.schemaId = value;
    }

    /**
     * This schema as the plain tree a JSON writer or a JavaScript caller consumes.
     *
     * @return a map of JSON Schema keyword names to their values, omitting every keyword left unset
     * @implNote Absent values are omitted rather than written as null: a null keyword is not the
     * same as an unstated one to a JSON Schema validator.
     */
    public Map<String, Object> toTree() {
        Map<String, Object> out = new LinkedHashMap<String, Object>();
        put(out, "$schema", schemaDraft);
        put(out, "$id", schemaId);
        put(out, "title", title);
        put(out, "description", description);
        put(out, "type", type);
        if (anyOf != null) {
            List<Object> alternatives = new ArrayList<Object>();
            for (JsonSchema alternative : anyOf) {
                alternatives.add(alternative.toTree());
            }
            out.put("anyOf", alternatives);
        }
        if (properties != null) {
            Map<String, Object> nested = new LinkedHashMap<String, Object>();
            for (Map.Entry<String, JsonSchema> property : properties.entrySet()) {
                nested.put(property.getKey(), property.getValue().toTree());
            }
            out.put("properties", nested);
        }
        put(out, "required", required);
        if (items != null) {
            out.put("items", items.toTree());
        }
        if (additionalProperties != null) {
            out.put("additionalProperties", additionalProperties.toTree());
        }
        put(out, "pattern", pattern);
        put(out, "minimum", minimum);
        put(out, "minLength", minLength);
        put(out, "minItems", minItems);
        put(out, "uniqueItems", uniqueItems);
        put(out, "enum", enumValues);
        put(out, "fix", fix);
        if (ifSchema != null) {
            out.put("if", ifSchema.toTree());
        }
        if (thenSchema != null) {
            out.put("then", thenSchema.toTree());
        }
        return out;
    }

    private static void put(Map<String, Object> out, String key, Object value) {
        if (value != null) {
            out.put(key, value);
        }
    }
}
