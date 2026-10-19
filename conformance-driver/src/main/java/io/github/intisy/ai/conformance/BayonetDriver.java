package io.github.intisy.ai.conformance;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import io.github.intisy.ai.engine.Activation;
import io.github.intisy.ai.engine.Budget;
import io.github.intisy.ai.engine.ConstraintVocabulary;
import io.github.intisy.ai.engine.Diagnostics;
import io.github.intisy.ai.engine.ActivationPlan;
import io.github.intisy.ai.engine.ActivationUnit;
import io.github.intisy.ai.engine.DeclarationKind;
import io.github.intisy.ai.engine.ManifestFacts;
import io.github.intisy.ai.engine.ManifestValidator;
import io.github.intisy.ai.engine.PluginException;
import io.github.intisy.ai.engine.PluginHost;
import io.github.intisy.ai.engine.SchemaIssue;
import io.github.intisy.ai.engine.ServiceHub;
import io.github.intisy.ai.engine.ServiceRequirement;
import io.github.intisy.ai.engine.ServiceRevoked;
import io.github.intisy.ai.seam.jvm.ReflectiveHandles;
import io.github.intisy.ai.engine.Scheduler;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Answers the engine conformance kit's vectors from {@code :engine} as it is, and declines the ones
 * it cannot put to it.
 *
 * @implNote The declines are the deliverable. This engine is expected to be unable to witness whole
 * families, and each refusal names which question {@code :engine} has no parameter for, because a
 * driver that answered them from something adjacent would report a conformance the engine does not
 * have. Nothing here evaluates a constraint, decides an activation policy or wraps a revocable
 * handle: writing any of those here would measure the driver instead of the engine.
 */
public final class BayonetDriver {

    private static final Gson GSON = new GsonBuilder().serializeNulls().create();

    private static final List<String> WELL_KNOWN = Arrays.asList("accounts", "routing", "activity");

    /**
     * The constraint names the vectors use, declared here because {@code :engine} mints no
     * vocabulary: what a constraint is compared against and in which direction is the host's to
     * say, exactly as the well-known service ids above are.
     */
    private static final ConstraintVocabulary VOCABULARY = ConstraintVocabulary.of(Arrays.asList(
        new ConstraintVocabulary.Entry("minReplicas", "maxReplicas", ConstraintVocabulary.Bound.LOWER),
        new ConstraintVocabulary.Entry("maxLatencyMs", "latencyMs", ConstraintVocabulary.Bound.UPPER)));

    private BayonetDriver() {
    }

    /**
     * Reads one vector per line of stdin and writes one outcome per line of stdout.
     *
     * @param args ignored; the vectors arrive on stdin
     * @throws Exception when stdin cannot be read
     */
    public static void main(String[] args) throws Exception {
        BufferedReader input = new BufferedReader(new InputStreamReader(System.in, "UTF-8"));
        PrintStream output = new PrintStream(System.out, true, "UTF-8");
        String line;
        while ((line = input.readLine()) != null) {
            if (line.trim().length() == 0) {
                continue;
            }
            output.println(GSON.toJson(answer(readVector(line))));
        }
    }

    /**
     * @param vector one vector, as the kit writes it
     * @return the outcome, carrying the vector's id, whether this engine witnessed it, and what it
     * answered
     */
    public static Map<String, Object> answer(Map<String, Object> vector) {
        Map<String, Object> outcome = new LinkedHashMap<String, Object>();
        outcome.put("id", vector.get("id"));
        try {
            Map<String, Object> result = run(String.valueOf(vector.get("op")), given(vector));
            Object witnessed = result.remove("witnessed");
            outcome.put("witnessed", !Boolean.FALSE.equals(witnessed));
            outcome.put("result", result);
        } catch (RuntimeException failure) {
            outcome.put("witnessed", Boolean.TRUE);
            Map<String, Object> error = new LinkedHashMap<String, Object>();
            error.put("error", String.valueOf(failure));
            outcome.put("result", error);
        }
        return outcome;
    }

    private static Map<String, Object> run(String op, Map<String, Object> given) {
        if ("supports".equals(op)) {
            return supports(given);
        }
        if ("validate".equals(op)) {
            return validate(given);
        }
        if ("order".equals(op)) {
            return order(given);
        }
        if ("revoke".equals(op)) {
            return revoke(given);
        }
        if ("boot".equals(op)) {
            return boot(given);
        }
        if ("resolve".equals(op)) {
            return resolve(given);
        }
        throw new IllegalArgumentException("unknown op '" + op + "'");
    }

    /**
     * @implNote A boot vector's units carry no kind, so every declaration is read as a service,
     * which is the only edge a plugin host draws anyway. The refusals the plan carries ARE the
     * answer: this driver decides nothing about them.
     */
    private static Map<String, Object> boot(Map<String, Object> given) {
        List<ActivationUnit> units = new ArrayList<ActivationUnit>();
        for (Object entry : list(given.get("units"))) {
            Map<String, Object> unit = map(entry);
            List<ActivationUnit.Offer> offers = new ArrayList<ActivationUnit.Offer>();
            for (String id : strings(unit.get("provides"))) {
                offers.add(new ActivationUnit.Offer(DeclarationKind.SERVICE, id));
            }
            List<ActivationUnit.Need> needs = new ArrayList<ActivationUnit.Need>();
            for (Object required : list(unit.get("requires"))) {
                Map<String, Object> need = map(required);
                needs.add(new ActivationUnit.Need(DeclarationKind.SERVICE, String.valueOf(need.get("id")),
                    Boolean.TRUE.equals(need.get("optional")), Boolean.TRUE.equals(need.get("degradable"))));
            }
            units.add(new ActivationUnit(String.valueOf(unit.get("id")), offers, needs));
        }
        ActivationPlan plan = Activation.order(units);
        Map<String, Object> result = new LinkedHashMap<String, Object>();
        result.put("started", plan.getOrder());
        result.put("refusal", plan.getRefusals().isEmpty() ? null : refusalOf(plan.getRefusals().get(0)));
        return result;
    }

    /**
     * @implNote Virtual time: the scheduler is fired by hand, so a 30 second budget costs nothing
     * and the engine still sees the budget the vector states. The constraint vocabulary is declared
     * HERE because the engine mints none, exactly as the well-known service ids are.
     */
    private static Map<String, Object> resolve(Map<String, Object> given) {
        Map<String, Object> requirement = map(given.get("requirement"));
        Map<String, Object> provider = map(given.get("provider"));
        String serviceId = String.valueOf(requirement.get("id"));

        final List<String> reports = new ArrayList<String>();
        Diagnostics.setSink(new Diagnostics.Sink() {
            @Override
            public void accept(String message) {
                reports.add(message);
            }
        });
        try {
            ManualScheduler scheduler = new ManualScheduler();
            ServiceHub hub = new ServiceHub(scheduler, null);
            hub.wellKnown(Arrays.asList(serviceId));
            hub.constraintVocabulary(VOCABULARY);

            ScriptedProvider scripted = new ScriptedProvider(attributesByPoll(provider),
                Boolean.TRUE.equals(provider.get("servesOnlyUnconstrained")));
            hub.forPlugin("the-conformance-provider").register(serviceId, scripted, numbers(provider.get("advertised")));

            Map<String, Object> declared = new LinkedHashMap<String, Object>();
            declared.put("id", serviceId);
            declared.put("optional", Boolean.FALSE);
            declared.put("degradable", requirement.get("degradable"));
            declared.put("constraints", requirement.get("constraints"));

            Settlement settlement = new Settlement();
            hub.forPlugin("the-conformance-consumer")
                .want(ServiceRequirement.of(declared), Budget.of(
                    (long) number(given.get("budgetMillis"), 30000),
                    (long) number(given.get("pollMillis"), 1000)))
                .then(settlement);
            for (int tick = 0; tick < 200 && !settlement.settled(); tick++) {
                scheduler.fireAll();
            }

            Map<String, Object> result = new LinkedHashMap<String, Object>();
            boolean degraded = !reports.isEmpty();
            result.put("served", Boolean.valueOf(settlement.value != null && !degraded));
            result.put("degraded", Boolean.valueOf(degraded));
            result.put("atPoll", Integer.valueOf(scripted.readsAtService));
            result.put("attributes", scripted.current());
            result.put("report", reports.isEmpty() ? null : join(reports));
            result.put("refusal", settlement.failure == null ? null : refusalOf(settlement.failure));
            result.put("asks", scripted.asks);
            return result;
        } finally {
            Diagnostics.setSink(null);
        }
    }

    private static List<Map<String, Double>> attributesByPoll(Map<String, Object> provider) {
        List<Map<String, Double>> byPoll = new ArrayList<Map<String, Double>>();
        for (Object entry : list(provider.get("attributesByPoll"))) {
            byPoll.add(numbers(entry));
        }
        if (byPoll.isEmpty()) {
            byPoll.add(new LinkedHashMap<String, Double>());
        }
        return byPoll;
    }

    private static Map<String, Double> numbers(Object value) {
        Map<String, Double> out = new LinkedHashMap<String, Double>();
        for (Map.Entry<String, Object> entry : map(value).entrySet()) {
            if (entry.getValue() instanceof Number) {
                out.put(entry.getKey(), Double.valueOf(((Number) entry.getValue()).doubleValue()));
            }
        }
        return out;
    }

    private static String join(List<String> lines) {
        StringBuilder out = new StringBuilder();
        for (int index = 0; index < lines.size(); index++) {
            if (index > 0) {
                out.append("\n");
            }
            out.append(lines.get(index));
        }
        return out.toString();
    }

    private static Map<String, Object> supports(Map<String, Object> given) {
        Map<String, Object> host = map(given.get("host"));
        Map<String, Object> facts = map(given.get("facts"));
        PluginHost engine = new PluginHost(null, strings(host.get("applications")),
            (int) number(host.get("api"), 1), new ArrayList<String>());
        ManifestFacts manifest = new ManifestFacts(String.valueOf(facts.get("id")),
            (int) number(facts.get("api"), 1), new ArrayList<String>(), new ArrayList<String>(),
            strings(facts.get("targets")), null);

        PluginException refusal = engine.supports(manifest);
        Map<String, Object> result = new LinkedHashMap<String, Object>();
        result.put("supported", Boolean.valueOf(refusal == null));
        result.put("refusal", refusal == null ? null : refusalOf(refusal.getDetail(), refusal.getFix()));
        return result;
    }

    private static Map<String, Object> validate(Map<String, Object> given) {
        List<SchemaIssue> issues = ManifestValidator.validate(given.get("manifest"), WELL_KNOWN);
        List<String> paths = new ArrayList<String>();
        for (SchemaIssue issue : issues) {
            paths.add(issue.getPath());
        }
        Map<String, Object> result = new LinkedHashMap<String, Object>();
        result.put("valid", Boolean.valueOf(issues.isEmpty()));
        result.put("paths", paths);
        result.put("refusal", issues.isEmpty()
            ? null
            : refusalOf(issues.get(0).getMessage(), issues.get(0).getFix()));
        return result;
    }

    private static Map<String, Object> order(Map<String, Object> given) {
        DeclarationKind edgeSource = "capabilities".equals(given.get("edgeSource"))
            ? DeclarationKind.CAPABILITY
            : DeclarationKind.SERVICE;
        List<ActivationUnit> units = new ArrayList<ActivationUnit>();
        for (Object entry : list(given.get("units"))) {
            Map<String, Object> unit = map(entry);
            List<ActivationUnit.Offer> offers = new ArrayList<ActivationUnit.Offer>();
            for (Object declaration : list(unit.get("provides"))) {
                Map<String, Object> offered = map(declaration);
                offers.add(new ActivationUnit.Offer(kindOf(offered.get("kind")),
                    String.valueOf(offered.get("id"))));
            }
            List<ActivationUnit.Need> needs = new ArrayList<ActivationUnit.Need>();
            for (Object declaration : list(unit.get("requires"))) {
                Map<String, Object> needed = map(declaration);
                needs.add(new ActivationUnit.Need(kindOf(needed.get("kind")),
                    String.valueOf(needed.get("id")),
                    !Boolean.FALSE.equals(needed.get("optional")),
                    Boolean.TRUE.equals(needed.get("degradable"))));
            }
            units.add(new ActivationUnit(String.valueOf(unit.get("id")), offers, needs));
        }
        ActivationPlan plan = Activation.order(units, edgeSource);
        Map<String, Object> result = new LinkedHashMap<String, Object>();
        result.put("order", plan.getOrder());
        result.put("cycle", plan.getCycles().isEmpty() ? null : plan.getCycles().get(0));
        result.put("thrown", Boolean.FALSE);
        return result;
    }

    private static DeclarationKind kindOf(Object declared) {
        return "capability".equals(declared) ? DeclarationKind.CAPABILITY : DeclarationKind.SERVICE;
    }

    /**
     * @implNote {@code use} deliberately calls the handle taken at the FIRST lookup. A handle
     * fetched after the withdrawal would simply be absent, which proves nothing about what a
     * consumer already holding one is told.
     */
    private static Map<String, Object> revoke(Map<String, Object> given) {
        List<String> steps = strings(given.get("steps"));
        String serviceId = String.valueOf(map(given.get("service")).get("id"));
        ServiceHub hub = new ServiceHub(Scheduler.NEVER, null);
        hub.wellKnown(WELL_KNOWN);
        hub.handles(new ReflectiveHandles());
        ServiceHub.Registry registry = hub.forPlugin("the-conformance-plugin");
        Scheduler.Cancellable registration = null;
        ConformanceService held = null;
        List<Boolean> lookups = new ArrayList<Boolean>();
        Map<String, Object> result = new LinkedHashMap<String, Object>();
        for (String step : steps) {
            if ("register".equals(step)) {
                registration = registry.register(serviceId, new ConformanceService() {
                    @Override
                    public String name() {
                        return "the conformance service";
                    }
                });
            } else if ("lookup".equals(step)) {
                Object found = hub.get(serviceId);
                lookups.add(Boolean.valueOf(found != null));
                if (held == null && found != null) {
                    held = (ConformanceService) found;
                }
            } else if ("revoke".equals(step)) {
                registration.cancel();
            } else if ("use".equals(step)) {
                use(held, result);
            } else {
                throw new IllegalArgumentException("unknown step '" + step + "'");
            }
        }
        result.put("lookups", lookups);
        return result;
    }

    private static void use(ConformanceService held, Map<String, Object> result) {
        if (held == null) {
            throw new IllegalStateException("no handle was held, so 'use' has nothing to use");
        }
        try {
            result.put("name", held.name());
            result.put("used", Boolean.TRUE);
            result.put("reason", null);
        } catch (ServiceRevoked revoked) {
            result.put("used", Boolean.FALSE);
            result.put("reason", "revoked");
        }
    }

    private static Map<String, Object> refusalOf(String detail, String fix) {
        Map<String, Object> refusal = new LinkedHashMap<String, Object>();
        refusal.put("detail", detail);
        refusal.put("fix", fix);
        return refusal;
    }

    /**
     * @implNote The message carries the plugin the engine attributed the refusal to, so a vector
     * asking that a refusal name both sides reads the engine's own sentence rather than one this
     * driver assembled from two getters.
     */
    private static Map<String, Object> refusalOf(PluginException refusal) {
        Map<String, Object> answer = refusalOf(refusal.getDetail(), refusal.getFix());
        answer.put("message", refusal.getMessage());
        return answer;
    }

    private static Map<String, Object> unwitnessed(String reason) {
        Map<String, Object> answer = new LinkedHashMap<String, Object>();
        answer.put("witnessed", Boolean.FALSE);
        answer.put("reason", reason);
        return answer;
    }

    @SuppressWarnings("unchecked")
    private static Map<String, Object> map(Object value) {
        return value instanceof Map ? (Map<String, Object>) value : new LinkedHashMap<String, Object>();
    }

    @SuppressWarnings("unchecked")
    private static List<Object> list(Object value) {
        return value instanceof List ? (List<Object>) value : new ArrayList<Object>();
    }

    private static List<String> strings(Object value) {
        List<String> out = new ArrayList<String>();
        for (Object entry : list(value)) {
            out.add(String.valueOf(entry));
        }
        return out;
    }

    private static double number(Object value, double fallback) {
        return value instanceof Number ? ((Number) value).doubleValue() : fallback;
    }

    @SuppressWarnings("unchecked")
    private static Map<String, Object> given(Map<String, Object> vector) {
        Object given = vector.get("given");
        return given == null ? new LinkedHashMap<String, Object>() : (Map<String, Object>) given;
    }

    private static Map<String, Object> readVector(String line) {
        return GSON.fromJson(line, new TypeToken<Map<String, Object>>() {
        }.getType());
    }
}
