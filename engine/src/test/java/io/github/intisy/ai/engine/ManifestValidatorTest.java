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
        manifest.put("capabilities", Arrays.asList("screens", "screens"));
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
}
