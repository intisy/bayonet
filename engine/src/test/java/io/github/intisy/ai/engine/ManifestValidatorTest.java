package io.github.intisy.ai.engine;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;

class ManifestValidatorTest {

    private static final List<String> WELL_KNOWN = Arrays.asList("accounts", "routing", "activity");

    private static Map<String, Object> valid() {
        Map<String, Object> manifest = new HashMap<String, Object>();
        manifest.put("id", "config-ledger");
        manifest.put("api", Integer.valueOf(2));
        return manifest;
    }

    @Test
    void acceptsAMinimalManifest() {
        assertTrue(ManifestValidator.validate(valid(), WELL_KNOWN).isEmpty());
    }

    @Test
    void acceptsAManifestThatTargetsAnApplication() {
        Map<String, Object> manifest = valid();
        manifest.put("targets", Arrays.asList("forebay"));
        List<SchemaIssue> issues = ManifestValidator.validate(manifest, WELL_KNOWN);
        assertTrue(issues.isEmpty(), issues.toString());
    }

    @Test
    void reportsABareStringWhereTargetsNeedsAnArray() {
        Map<String, Object> manifest = valid();
        manifest.put("targets", "forebay");
        List<SchemaIssue> issues = ManifestValidator.validate(manifest, WELL_KNOWN);
        assertEquals(1, issues.size());
        assertEquals("targets", issues.get(0).getPath());
    }

    @Test
    void requiresAnEntryOnceCapabilitiesAreDeclared() {
        Map<String, Object> manifest = valid();
        manifest.put("capabilities", Arrays.asList("screens"));
        List<SchemaIssue> issues = ManifestValidator.validate(manifest, WELL_KNOWN);
        assertEquals(1, issues.size());
        assertEquals("entry", issues.get(0).getPath());
    }

    @Test
    void refusesAnEntryThatEscapesTheRepo() {
        Map<String, Object> manifest = valid();
        manifest.put("entry", "../elsewhere/index.js");
        List<SchemaIssue> issues = ManifestValidator.validate(manifest, WELL_KNOWN);
        assertEquals(1, issues.size());
        assertEquals("entry", issues.get(0).getPath());
    }

    @Test
    void refusesAnAbsoluteEntry() {
        Map<String, Object> manifest = valid();
        manifest.put("entry", "C:/somewhere/index.js");
        assertEquals(1, ManifestValidator.validate(manifest, WELL_KNOWN).size());
    }

    @Test
    void refusesWindowsShapedEntries() {
        for (String entry : Arrays.asList("\\abs\\x.js", "dist\\..\\x.js", "C:/x.js")) {
            Map<String, Object> manifest = valid();
            manifest.put("entry", entry);
            List<SchemaIssue> issues = ManifestValidator.validate(manifest, WELL_KNOWN);
            assertEquals(1, issues.size(), entry);
            assertEquals("entry", issues.get(0).getPath());
        }
    }

    @Test
    void refusesAnEntryThatHidesAnEscapeBehindAControlCharacter() {
        for (String entry : Arrays.asList("a\n/../../x.js", "a/..\n", "a\u0085/../x.js", "dist/index\u0000.js")) {
            Map<String, Object> manifest = valid();
            manifest.put("entry", entry);
            List<SchemaIssue> issues = ManifestValidator.validate(manifest, WELL_KNOWN);
            assertEquals(1, issues.size(), entry);
            assertEquals("entry", issues.get(0).getPath());
        }
    }

    @Test
    void refusesAProvidedServiceThatSquats() {
        Map<String, Object> services = new HashMap<String, Object>();
        services.put("provides", Arrays.asList("someone-else:thing"));
        Map<String, Object> manifest = valid();
        manifest.put("services", services);
        List<SchemaIssue> issues = ManifestValidator.validate(manifest, WELL_KNOWN);
        assertEquals(1, issues.size());
        assertEquals("services.provides[0]", issues.get(0).getPath());
    }

    @Test
    void acceptsAWellKnownBareServiceId() {
        Map<String, Object> services = new HashMap<String, Object>();
        services.put("provides", Arrays.asList("accounts"));
        Map<String, Object> manifest = valid();
        manifest.put("services", services);
        assertTrue(ManifestValidator.validate(manifest, WELL_KNOWN).isEmpty());
    }

    @Test
    void refusesABareServiceIdWhenTheVocabularyDoesNotKnowIt() {
        Map<String, Object> services = new HashMap<String, Object>();
        services.put("provides", Arrays.asList("accounts"));
        Map<String, Object> manifest = valid();
        manifest.put("services", services);
        assertEquals(1, ManifestValidator.validate(manifest, Collections.<String>emptyList()).size());
    }

    @Test
    void skipsTheProvidedServiceCheckWhenTheCallerCannotVerifyIt() {
        Map<String, Object> services = new HashMap<String, Object>();
        services.put("provides", Arrays.asList("accounts"));
        Map<String, Object> manifest = valid();
        manifest.put("services", services);
        assertTrue(ManifestValidator.validate(manifest, null).isEmpty());
    }

    @Test
    void stillReportsEveryOtherRuleWhenTheVocabularyIsUnverifiable() {
        Map<String, Object> manifest = valid();
        manifest.put("capabilities", Arrays.asList("screens"));
        List<SchemaIssue> issues = ManifestValidator.validate(manifest, null);
        assertEquals(1, issues.size());
        assertEquals("entry", issues.get(0).getPath());
    }

    @Test
    void reportsDuplicatesByIndex() {
        Map<String, Object> manifest = valid();
        manifest.put("entry", "dist/index.js");
        manifest.put("capabilities", Arrays.asList("screens", "screens"));
        List<SchemaIssue> issues = ManifestValidator.validate(manifest, WELL_KNOWN);
        assertEquals(1, issues.size());
        assertEquals("capabilities[1]", issues.get(0).getPath());
    }

    @Test
    void reportsAStructuralIssueAloneWithoutCrossFieldNoise() {
        Map<String, Object> manifest = new HashMap<String, Object>();
        manifest.put("id", Integer.valueOf(7));
        manifest.put("api", Integer.valueOf(2));
        Map<String, Object> services = new HashMap<String, Object>();
        services.put("provides", Arrays.asList("someone-else:thing"));
        manifest.put("services", services);
        List<SchemaIssue> issues = ManifestValidator.validate(manifest, WELL_KNOWN);
        assertEquals(1, issues.size());
        assertEquals("id", issues.get(0).getPath());
    }

    @Test
    void requireThrowsAttributedToThePlugin() {
        final Map<String, Object> manifest = valid();
        manifest.put("capabilities", Arrays.asList("screens"));
        PluginException failure = assertThrows(PluginException.class, new Executable() {
            @Override
            public void execute() {
                ManifestValidator.require(manifest, WELL_KNOWN);
            }
        });
        assertEquals("config-ledger", failure.getPluginId());
        assertTrue(failure.getDetail().startsWith("plugin.json entry:"));
    }

    @Test
    void requireAttributesAnUnnamedManifestToTheUnknownPlugin() {
        final Map<String, Object> manifest = new HashMap<String, Object>();
        manifest.put("api", Integer.valueOf(2));
        PluginException failure = assertThrows(PluginException.class, new Executable() {
            @Override
            public void execute() {
                ManifestValidator.require(manifest, new ArrayList<String>());
            }
        });
        assertEquals("(unknown plugin)", failure.getPluginId());
    }

    @Test
    void requireReturnsTheManifestWhenItIsValid() {
        Map<String, Object> manifest = valid();
        assertEquals(manifest, ManifestValidator.require(manifest, WELL_KNOWN));
    }

    private static Map<String, Object> servicesOf(Object provides, Object consumes) {
        Map<String, Object> services = new HashMap<String, Object>();
        if (provides != null) {
            services.put("provides", provides);
        }
        if (consumes != null) {
            services.put("consumes", consumes);
        }
        Map<String, Object> manifest = valid();
        manifest.put("services", services);
        return manifest;
    }

    private static Map<String, Object> requirement(String id, Object optional) {
        Map<String, Object> required = new HashMap<String, Object>();
        required.put("id", id);
        if (optional != null) {
            required.put("optional", optional);
        }
        return required;
    }

    @Test
    void acceptsBareStringsWhereServicesTakeThem() {
        Map<String, Object> manifest = servicesOf(Arrays.asList("config-ledger:entries"), Arrays.asList("accounts"));
        List<SchemaIssue> issues = ManifestValidator.validate(manifest, WELL_KNOWN);
        assertTrue(issues.isEmpty(), issues.toString());
    }

    @Test
    void acceptsTheObjectFormOnBothSides() {
        Map<String, Object> offered = new HashMap<String, Object>();
        offered.put("id", "config-ledger:entries");
        Map<String, Double> attributes = new HashMap<String, Double>();
        attributes.put("maxReplicas", Double.valueOf(3));
        offered.put("attributes", attributes);
        Map<String, Object> manifest = servicesOf(Arrays.asList(offered),
                Arrays.asList(requirement("accounts", Boolean.FALSE)));
        List<SchemaIssue> issues = ManifestValidator.validate(manifest, WELL_KNOWN);
        assertTrue(issues.isEmpty(), issues.toString());
    }

    @Test
    void reportsAWrongTypeInsideTheObjectForm() {
        Map<String, Object> manifest = servicesOf(null, Arrays.asList(requirement("accounts", "yes")));
        List<SchemaIssue> issues = ManifestValidator.validate(manifest, WELL_KNOWN);
        assertEquals(1, issues.size(), issues.toString());
        assertEquals("services.consumes[0].optional", issues.get(0).getPath());
    }

    @Test
    void reportsAnEntryThatIsNeitherAnIdNorAnObject() {
        Map<String, Object> manifest = servicesOf(null, Arrays.asList(Integer.valueOf(7)));
        List<SchemaIssue> issues = ManifestValidator.validate(manifest, WELL_KNOWN);
        assertEquals(1, issues.size(), issues.toString());
        assertEquals("services.consumes[0]", issues.get(0).getPath());
        assertTrue(issues.get(0).getFix().startsWith("write the service id"), issues.get(0).getFix());
    }

    @Test
    void holdsTheObjectFormOfProvidesToTheSameNamespacing() {
        Map<String, Object> manifest = servicesOf(Arrays.asList(requirement("squatted", null)), null);
        List<SchemaIssue> issues = ManifestValidator.validate(manifest, WELL_KNOWN);
        assertEquals(1, issues.size(), issues.toString());
        assertEquals("services.provides[0]", issues.get(0).getPath());
        assertTrue(issues.get(0).getMessage().contains("\"squatted\""), issues.get(0).getMessage());
    }

    @Test
    void seesADuplicateAcrossTheTwoForms() {
        Map<String, Object> manifest = servicesOf(null,
                Arrays.asList("accounts", requirement("accounts", null)));
        List<SchemaIssue> issues = ManifestValidator.validate(manifest, WELL_KNOWN);
        assertEquals(1, issues.size(), issues.toString());
        assertEquals("services.consumes[1]", issues.get(0).getPath());
    }
}
