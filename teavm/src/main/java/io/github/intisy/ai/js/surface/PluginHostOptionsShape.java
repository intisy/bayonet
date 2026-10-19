package io.github.intisy.ai.js.surface;

import io.github.intisy.ai.tsemit.TsInterface;
import io.github.intisy.ai.tsemit.TsOptional;
import java.util.List;

/** What a host says about itself when it builds its plugin host, the {@code createPluginHost} argument. */
@TsInterface(data = true)
public interface PluginHostOptionsShape {
    /**
     * The app id plugins see on the host descriptor, for a host that hosts exactly one.
     *
     * @return the app id, or absent when {@link #applications()} names them instead
     */
    @TsOptional
    String app();

    /**
     * The apps this host hosts, for a composite hosting more than one.
     *
     * @return the app ids this host hosts, or absent to fall back to {@link #app()}
     */
    @TsOptional
    List<String> applications();

    /**
     * The API major version to claim. Defaults to this package's own.
     *
     * @return the api version to claim, or absent to use this package's own
     */
    @TsOptional
    Integer api();

    /**
     * Surface ids this host renders.
     *
     * @return the rendered surface ids, or absent when the host renders none
     */
    @TsOptional
    List<String> surfaces();

    /**
     * Capability ids this host understands. Absent means unverifiable, not empty.
     *
     * @return the known capability ids, or absent to skip capability verification
     */
    @TsOptional
    List<String> vocabulary();

    /**
     * Bare service ids any plugin may register. Absent means none exist.
     *
     * @return the bare service ids this host accepts, or absent when it accepts none
     */
    @TsOptional
    List<String> wellKnownServices();
}
