package io.github.intisy.ai.api;

import io.github.intisy.ai.tsemit.TsInterface;
import io.github.intisy.ai.tsemit.TsOptional;
import java.util.Map;

/** One service a plugin asks for, and what its absence or its shortfall costs. */
@TsInterface(data = true)
public interface ManifestRequirement {
    /**
     * The service id this plugin asks for.
     *
     * @return the service id
     */
    String id();

    /**
     * Whether this plugin still starts when nothing provides the service. Absent means true, which
     * is what writing the bare id means.
     *
     * @return false to refuse the plugin when nothing provides the service, or absent to start anyway
     */
    @TsOptional
    Boolean optional();

    /**
     * Whether this plugin accepts a service that never satisfies its constraints once the budget is
     * spent. Absent means false, and it never excuses an absence.
     *
     * @return true to accept an unsatisfying service with a report, or absent to be refused one
     */
    @TsOptional
    Boolean degradable();

    /**
     * What this plugin needs of the service, keyed by constraint name, compared against what the
     * service advertises.
     *
     * @return the required values by constraint name, or absent when the plugin constrains nothing
     */
    @TsOptional
    Map<String, Double> constraints();
}
