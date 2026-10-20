package io.github.intisy.ai.engine;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;

class ActivationPolicyTest {

    private static ActivationUnit unit(String id, List<ActivationUnit.Offer> provides, List<ActivationUnit.Need> requires) {
        return new ActivationUnit(id, provides, requires);
    }

    private static List<ActivationUnit.Offer> offers(String... ids) {
        List<ActivationUnit.Offer> offers = new ArrayList<ActivationUnit.Offer>();
        for (String id : ids) {
            offers.add(new ActivationUnit.Offer(DeclarationKind.SERVICE, id));
        }
        return offers;
    }

    private static List<ActivationUnit.Need> needs(ActivationUnit.Need... entries) {
        return Arrays.asList(entries);
    }

    private static ActivationUnit.Need need(String id, boolean optional, boolean degradable) {
        return new ActivationUnit.Need(DeclarationKind.SERVICE, id, optional, degradable);
    }

    @Test
    void refusesAMandatoryRequirementNobodyProvides() {
        ActivationPlan plan = Activation.order(Arrays.asList(
                unit("api.http", offers("api.http"), needs(need("storage.object", false, false)))));
        assertEquals(new ArrayList<String>(), plan.getOrder());
        assertEquals(1, plan.getRefusals().size());
        PluginException refusal = plan.getRefusals().get(0);
        assertEquals("api.http", refusal.getPluginId());
        assertTrue(refusal.getDetail().contains("storage.object"), refusal.getDetail());
        assertTrue(refusal.getFix() != null && refusal.getFix().length() > 0, "a refusal carries a fix");
    }

    @Test
    void startsWithoutAMissingOptionalRequirement() {
        ActivationPlan plan = Activation.order(Arrays.asList(
                unit("api.http", offers("api.http"), needs(need("storage.object", true, false)))));
        assertEquals(Arrays.asList("api.http"), plan.getOrder());
        assertTrue(plan.getRefusals().isEmpty(), plan.getRefusals().toString());
    }

    @Test
    void refusesADegradableRequirementThatIsNotOptional() {
        ActivationPlan plan = Activation.order(Arrays.asList(
                unit("api.http", offers("api.http"), needs(need("storage.object", false, true)))));
        assertEquals(new ArrayList<String>(), plan.getOrder());
        assertEquals(1, plan.getRefusals().size());
        assertTrue(plan.getRefusals().get(0).getDetail().contains("storage.object"));
    }

    @Test
    void refusesAUnitWhoseOnlyProviderWasItselfRefused() {
        ActivationPlan plan = Activation.order(Arrays.asList(
                unit("storage.object", offers("storage.object"), needs(need("disk", false, false))),
                unit("api.http", offers("api.http"), needs(need("storage.object", false, false)))));
        assertEquals(new ArrayList<String>(), plan.getOrder());
        assertEquals(2, plan.getRefusals().size(), plan.getRefusals().toString());
    }

    @Test
    void theThreeMapFormStillMeansEveryRequirementOptional() {
        Map<String, List<String>> consumes = new HashMap<String, List<String>>();
        consumes.put("lonely", Arrays.asList("nobody:here"));
        ActivationPlan plan = Activation.order(Arrays.asList("lonely"),
                new HashMap<String, List<String>>(), consumes);
        assertEquals(Arrays.asList("lonely"), plan.getOrder());
        assertTrue(plan.getRefusals().isEmpty(), plan.getRefusals().toString());
    }

    @Test
    void aBareStringConsumesReadsAsOptional() {
        ServiceRequirement bare = ServiceRequirement.of("accounts");
        assertEquals("accounts", bare.getId());
        assertTrue(bare.isOptional());
        assertTrue(!bare.isDegradable());
    }

    /**
     * A cycle member cannot provide anything: it never activates. Reporting a consumer of one as
     * started is the same lie the refusal fixed point exists to prevent, one level up.
     */
    @Test
    void refusesAUnitWhoseOnlyProviderWasDroppedByACycle() {
        ActivationUnit consumer = unit("api.http", offers(), needs(need("x", false, false)));
        ActivationUnit left = unit("left", offers("x"), needs(need("z", true, false)));
        ActivationUnit right = unit("right", offers("z"), needs(need("x", true, false)));
        ActivationPlan plan = Activation.order(Arrays.asList(consumer, left, right));

        assertEquals(1, plan.getCycles().size(), plan.getCycles().toString());
        assertEquals(new ArrayList<String>(), plan.getOrder(), "api.http cannot start: nothing will ever provide x");
        assertEquals(1, plan.getRefusals().size(), plan.getRefusals().toString());
        assertEquals("api.http", plan.getRefusals().get(0).getPluginId());
    }

    @Test
    void refusesTwoUnitsThatShareAnId() {
        final List<ActivationUnit> twins = Arrays.asList(
                unit("api.http", offers("api.http"), needs()),
                unit("api.http", offers(), needs(need("storage.object", false, false))));
        IllegalArgumentException refused = assertThrows(IllegalArgumentException.class, new Executable() {
            @Override
            public void execute() {
                Activation.order(twins);
            }
        });
        assertTrue(refused.getMessage().contains("api.http"), refused.getMessage());
    }
}
