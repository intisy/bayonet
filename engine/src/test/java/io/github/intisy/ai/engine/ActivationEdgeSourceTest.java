package io.github.intisy.ai.engine;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.junit.jupiter.api.Test;

class ActivationEdgeSourceTest {

    private static ActivationUnit unit(String id, String provides, String requires) {
        List<ActivationUnit.Offer> offers = new ArrayList<ActivationUnit.Offer>();
        if (provides != null) {
            offers.add(new ActivationUnit.Offer(DeclarationKind.CAPABILITY, provides));
        }
        List<ActivationUnit.Need> needs = new ArrayList<ActivationUnit.Need>();
        if (requires != null) {
            needs.add(new ActivationUnit.Need(DeclarationKind.CAPABILITY, requires, true, false));
        }
        return new ActivationUnit(id, offers, needs);
    }

    private static List<ActivationUnit> twoCapabilities() {
        return Arrays.asList(unit("api.http", "api.http", "storage.object"),
                unit("storage.object", "storage.object", null));
    }

    @Test
    void ordersACapabilityProviderBeforeItsConsumer() {
        ActivationPlan plan = Activation.order(twoCapabilities(), DeclarationKind.CAPABILITY);
        assertEquals(Arrays.asList("storage.object", "api.http"), plan.getOrder());
        assertTrue(plan.getCycles().isEmpty(), plan.getCycles().toString());
    }

    /**
     * The regression test for the widening itself: asking for service edges over a graph that
     * declares only capabilities must draw nothing, so the consumer may come first.
     */
    @Test
    void drawsNoEdgeFromACapabilityUnderServiceSources() {
        ActivationPlan plan = Activation.order(twoCapabilities(), DeclarationKind.SERVICE);
        assertEquals(Arrays.asList("api.http", "storage.object"), plan.getOrder());
        assertTrue(plan.getCycles().isEmpty(), plan.getCycles().toString());
    }

    @Test
    void reportsACapabilityCycleWithItsMembers() {
        ActivationPlan plan = Activation.order(Arrays.asList(
                unit("api.http", "api.http", "storage.object"),
                unit("storage.object", "storage.object", "api.http")), DeclarationKind.CAPABILITY);
        assertTrue(plan.getOrder().isEmpty(), plan.getOrder().toString());
        assertEquals(1, plan.getCycles().size());
        assertTrue(plan.getCycles().get(0).containsAll(Arrays.asList("api.http", "storage.object")));
    }

    @Test
    void refusesAMandatoryCapabilityNobodyProvidesUnderCapabilitySources() {
        List<ActivationUnit.Need> needs = Arrays.asList(
                new ActivationUnit.Need(DeclarationKind.CAPABILITY, "storage.object", false, false));
        ActivationPlan plan = Activation.order(Arrays.asList(
                new ActivationUnit("api.http", new ArrayList<ActivationUnit.Offer>(), needs)),
                DeclarationKind.CAPABILITY);
        assertEquals(1, plan.getRefusals().size());
        assertEquals("api.http", plan.getRefusals().get(0).getPluginId());
    }

    @Test
    void ignoresAMandatoryCapabilityWhenTheSourceIsServices() {
        List<ActivationUnit.Need> needs = Arrays.asList(
                new ActivationUnit.Need(DeclarationKind.CAPABILITY, "storage.object", false, false));
        ActivationPlan plan = Activation.order(Arrays.asList(
                new ActivationUnit("api.http", new ArrayList<ActivationUnit.Offer>(), needs)),
                DeclarationKind.SERVICE);
        assertEquals(Arrays.asList("api.http"), plan.getOrder());
        assertTrue(plan.getRefusals().isEmpty(), plan.getRefusals().toString());
    }
}
