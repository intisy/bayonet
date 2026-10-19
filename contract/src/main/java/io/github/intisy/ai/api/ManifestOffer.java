package io.github.intisy.ai.api;

import io.github.intisy.ai.tsemit.TsInterface;
import io.github.intisy.ai.tsemit.TsOptional;
import java.util.Map;

/** One service a plugin registers, with what it claims before it is running to answer for itself. */
@TsInterface(data = true)
public interface ManifestOffer {
    /**
     * The service id this plugin registers.
     *
     * @return the service id
     */
    String id();

    /**
     * What this service claims, keyed by attribute name, until the live service reports its own.
     *
     * @return the advertised values by attribute name, or absent when it claims nothing
     */
    @TsOptional
    Map<String, Double> attributes();
}
