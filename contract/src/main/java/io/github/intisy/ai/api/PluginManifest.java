package io.github.intisy.ai.api;

import io.github.intisy.ai.tsemit.TsInterface;
import io.github.intisy.ai.tsemit.TsOptional;
import java.util.List;
import java.util.Map;

/**
 * The contents of a repo's plugin.json.
 *
 * @implNote No index signature and no additionalProperties: an author gets excess-property checking
 * while writing one, and the runtime validator still ignores fields it does not know, so a manifest
 * written against a later version loads on today's host.
 */
@TsInterface(data = true)
public interface PluginManifest {
    /**
     * Pointer at the published manifest schema, for an editor's completion and validation.
     *
     * @implNote Declared although nothing reads it, because every manifest in the ecosystem carries
     * it and the published schema accepts it: without it an author writing a manifest literal in
     * TypeScript could not include a field their own plugin.json has.
     * @return the schema URL, or absent when this manifest declares none
     */
    @TsOptional
    String $schema();

    /**
     * The plugin's permanent identity, matching its repository name.
     *
     * @return the plugin id
     */
    String id();

    /**
     * The lowest API major version this plugin needs. A floor, not a build tag.
     *
     * @return the minimum API major version this plugin needs
     */
    int api();

    /**
     * The built module a host imports. Required once `capabilities` is non-empty.
     *
     * @return the entry module path, or absent when this plugin declares no capabilities
     */
    @TsOptional
    String entry();

    /**
     * The name a surface shows instead of the id.
     *
     * @return the display name, or absent when the id is shown instead
     */
    @TsOptional
    String displayName();

    /**
     * Path to a square-viewBox SVG mark, relative to the repo root.
     *
     * @return the icon path, or absent when this plugin has no mark
     */
    @TsOptional
    String icon();

    /**
     * Further marks this repo ships, each keyed by the id of the thing it belongs to.
     *
     * @implNote One repo can contribute several named things, and a single repo-level {@code icon}
     * cannot serve them. Keyed by id rather than by kind, so this package carries the marks without
     * learning what any of the ids name.
     * @return the ids mapped to their mark paths, or absent when this plugin ships only its own icon
     */
    @TsOptional
    Map<String, String> icons();

    /**
     * Host-facing abilities this plugin provides at activation, declared statically so a host can answer what it can do without executing it.
     *
     * @return the capability ids this plugin provides, or absent when it provides none
     */
    @TsOptional
    List<String> capabilities();

    /**
     * The applications this artifact is for. Absent means every application.
     *
     * @return the application ids this artifact targets, or absent when it is for every application
     * @implNote An artifact narrows itself deliberately and is never narrowed by omission, which is
     * what keeps this additive: every manifest written before the field existed stays loadable
     * everywhere. A host refuses only when both sides name applications and the two sets are
     * disjoint.
     */
    @TsOptional
    List<String> targets();

    /**
     * The inter-plugin contract.
     *
     * @return the services this plugin provides and consumes, or absent when it declares none
     */
    @TsOptional
    ManifestServices services();

    /**
     * Slash commands this plugin contributes, which a host deploys without importing it.
     *
     * @return the commands this plugin contributes, or absent when it contributes none
     */
    @TsOptional
    List<ManifestCommand> commands();

    /**
     * This plugin's settings as it ships them.
     *
     * @return the plugin's config declaration, or absent when it has no settings
     */
    @TsOptional
    ManifestConfig config();

    /**
     * Where this plugin keeps state that is not named after it.
     *
     * @return the plugin's data paths, or absent when it declares none
     */
    @TsOptional
    ManifestData data();

    /**
     * Declared permissions, surfaced at install and in dashboards. Not sandbox-enforced.
     *
     * @return the declared permission ids, or absent when this plugin declares none
     */
    @TsOptional
    List<String> permissions();

    /**
     * Which optional lifecycle hooks the entry exports.
     *
     * @return the lifecycle declaration, or absent when this plugin exports no optional hook
     */
    @TsOptional
    ManifestLifecycle lifecycle();

    /**
     * How the repo is published to npm.
     *
     * @return the publish declaration, or absent when this plugin uses the ecosystem default
     */
    @TsOptional
    ManifestPublish publish();

    /**
     * Repository metadata.
     *
     * @return the repo metadata, or absent when this manifest declares none
     */
    @TsOptional
    RepoMeta repo();

    /**
     * What this plugin contributes to a host's catalog of installable things.
     *
     * @return the marketplace declaration, or absent when this plugin contributes none
     */
    @TsOptional
    ManifestMarketplace marketplace();

    /**
     * The app this repo is the loader for, declared by the app's own project.
     *
     * @implNote Present only on a repo that IS an app's loader, which is what makes "whose loader is
     * this" answerable from the manifest alone, with no consumer naming a plugin.
     * @return the app this repo is the loader for, or absent when it is not an app's loader
     */
    @TsOptional
    AppDescriptor app();
}
