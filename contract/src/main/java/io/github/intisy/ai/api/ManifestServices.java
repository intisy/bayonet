package io.github.intisy.ai.api;

import io.github.intisy.ai.tsemit.TsInterface;
import io.github.intisy.ai.tsemit.TsOptional;
import io.github.intisy.ai.tsemit.TsUnion;
import java.util.List;

/**
 * What a plugin offers other plugins, and what it asks of them.
 *
 * @implNote Each entry may be written either way, as the bare service id or as the object form that
 * says more about it, so the Java element type is {@code Object} and the emitted one is the union.
 * Every manifest written before the object form stays valid and keeps its meaning, which is what
 * makes the widening additive rather than a new version of the vocabulary.
 */
@TsInterface(data = true)
public interface ManifestServices {
    /**
     * Services this plugin registers, each namespaced by its own id or a well-known bare id,
     * written as bare ids or as {@link ManifestOffer} objects.
     *
     * @return the services this plugin provides, or absent when it provides none
     */
    @TsOptional
    @TsUnion(value = {"string", "ManifestOffer"}, element = true)
    List<Object> provides();

    /**
     * Services this plugin asks for, used for activation ordering and for what an absence costs,
     * written as bare ids or as {@link ManifestRequirement} objects.
     *
     * @return the services this plugin consumes, or absent when it consumes none
     */
    @TsOptional
    @TsUnion(value = {"string", "ManifestRequirement"}, element = true)
    List<Object> consumes();
}
