package io.github.intisy.ai.engine;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Checks a parsed plugin.json against the schema and against the rules the schema cannot express,
 * which are the ones that need one field to know about another.
 *
 * @implNote The well-known service ids arrive as a parameter rather than a constant, because this
 * package mints no vocabulary of its own. There is deliberately no overload defaulting them to
 * empty: a caller that does not know the vocabulary would silently report every bare service id as
 * an error, which is worse than being made to say what it knows. The parameter therefore carries
 * three states rather than two. A populated list is the vocabulary. An EMPTY list is an empty
 * vocabulary, so every bare id is squatting. NULL means the caller cannot verify the question at
 * all, and the provided-service check is skipped rather than answered wrongly, which is how a
 * caller says it does not know instead of lying with an empty list.
 */
public final class ManifestValidator {

    private ManifestValidator() {
    }

    /**
     * @param value the parsed plugin.json to check
     * @param wellKnownServices the bare service ids any plugin may register, empty for none, or null to skip
     *                          the provided-service check entirely
     * @return every issue found, or empty when the manifest is valid
     * @implNote Structural issues are reported alone. Once a field has the wrong type there is
     * nothing trustworthy left to cross-check, and a cascade of derived complaints buries the real
     * one.
     */
    public static List<SchemaIssue> validate(Object value, List<String> wellKnownServices) {
        String declaredId = stringAt(value, "id");
        String source = declaredId != null && !declaredId.isEmpty() ? declaredId : "the manifest";
        List<SchemaIssue> structural = SchemaValidator.validate(value, ManifestSchema.get(), "(root)", source);
        if (!structural.isEmpty()) {
            return structural;
        }

        List<SchemaIssue> issues = new ArrayList<SchemaIssue>();
        issues.addAll(providedServiceIssues(value, wellKnownServices));
        issues.addAll(duplicateIssues("services.provides", serviceIds(listAt(mapAt(value, "services"), "provides"))));
        issues.addAll(duplicateIssues("services.consumes", serviceIds(listAt(mapAt(value, "services"), "consumes"))));
        return issues;
    }

    /**
     * @param value the parsed plugin.json to check
     * @param wellKnownServices the bare service ids any plugin may register, empty for none, or null to skip
     *                          the provided-service check entirely
     * @return the manifest when it is valid
     * @throws PluginException naming the plugin, the first problem, and its fix when it is not
     */
    public static Object require(Object value, List<String> wellKnownServices) {
        List<SchemaIssue> issues = validate(value, wellKnownServices);
        if (issues.isEmpty()) {
            return value;
        }
        String declaredId = stringAt(value, "id");
        String pluginId = declaredId != null && !declaredId.isEmpty() ? declaredId : "(unknown plugin)";
        SchemaIssue first = issues.get(0);
        throw new PluginException(pluginId, "plugin.json " + first.getPath() + ": " + first.getMessage(), first.getFix());
    }

    private static List<SchemaIssue> providedServiceIssues(Object value, List<String> wellKnownServices) {
        List<SchemaIssue> issues = new ArrayList<SchemaIssue>();
        String pluginId = stringAt(value, "id");
        List<Object> provides = listAt(mapAt(value, "services"), "provides");
        if (provides == null || wellKnownServices == null) {
            return issues;
        }
        for (int index = 0; index < provides.size(); index++) {
            String serviceId = ServiceRequirement.idOf(provides.get(index));
            if (mayRegister(pluginId, serviceId, wellKnownServices)) {
                continue;
            }
            String tail = serviceId.contains(":") ? serviceId.substring(serviceId.lastIndexOf(':') + 1) : serviceId;
            issues.add(new SchemaIssue("services.provides[" + index + "]",
                    "\"" + serviceId + "\" is neither namespaced by this plugin nor a well-known service id",
                    "rename it to \"" + pluginId + ":" + tail + "\", or use one of: " + join(wellKnownServices)));
        }
        return issues;
    }

    /**
     * @implNote A bare id is legal only when some loaded vocabulary declares it as a contract any
     * plugin may implement. A namespaced id must carry the registering plugin's own id, which is what
     * makes squatting structurally impossible rather than socially discouraged.
     */
    private static boolean mayRegister(String pluginId, String serviceId, List<String> wellKnownServices) {
        if (wellKnownServices.contains(serviceId)) {
            return true;
        }
        int separator = serviceId.indexOf(':');
        if (separator <= 0 || separator == serviceId.length() - 1) {
            return false;
        }
        return serviceId.substring(0, separator).equals(pluginId);
    }

    /** @implNote The two forms name the same service, so a list mixing them is deduplicated by id. */
    private static List<Object> serviceIds(List<Object> declarations) {
        if (declarations == null) {
            return null;
        }
        List<Object> ids = new ArrayList<Object>();
        for (Object declaration : declarations) {
            ids.add(ServiceRequirement.idOf(declaration));
        }
        return ids;
    }

    private static List<SchemaIssue> duplicateIssues(String path, List<Object> values) {
        List<SchemaIssue> issues = new ArrayList<SchemaIssue>();
        if (values == null) {
            return issues;
        }
        Set<String> seen = new HashSet<String>();
        for (int index = 0; index < values.size(); index++) {
            String value = String.valueOf(values.get(index));
            if (!seen.add(value)) {
                issues.add(new SchemaIssue(path + "[" + index + "]", "\"" + value + "\" is listed twice", "remove the duplicate entry"));
            }
        }
        return issues;
    }

    private static String stringAt(Object value, String key) {
        Object found = at(value, key);
        return found instanceof String ? (String) found : null;
    }

    @SuppressWarnings("unchecked")
    private static List<Object> listAt(Object value, String key) {
        Object found = at(value, key);
        return found instanceof List ? (List<Object>) found : null;
    }

    private static Object mapAt(Object value, String key) {
        Object found = at(value, key);
        return found instanceof Map ? found : null;
    }

    private static Object at(Object value, String key) {
        if (!(value instanceof Map)) {
            return null;
        }
        return ((Map<?, ?>) value).get(key);
    }

    private static String join(List<String> values) {
        if (values == null) {
            return "";
        }
        StringBuilder out = new StringBuilder();
        for (int index = 0; index < values.size(); index++) {
            if (index > 0) {
                out.append(", ");
            }
            out.append(values.get(index));
        }
        return out.toString();
    }
}
