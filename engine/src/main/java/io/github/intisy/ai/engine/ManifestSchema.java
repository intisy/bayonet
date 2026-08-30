package io.github.intisy.ai.engine;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * The schema of plugin.json.
 *
 * @implNote No object declares additionalProperties as absent-meaning-closed: an unknown field is
 * ignored, which is what lets a manifest written against a later version of this package load on
 * today's host. Marks beyond the repo's own live in {@code icons}, keyed by the id of whatever wears
 * them, so this package carries them without learning what any id names: a block keyed by CATEGORY
 * would name one, which is what it must not do.
 * @implNote This is the second home of every manifest field. The first is the contract interface an
 * author writes against; a field added to one and not the other passes its own repo's build and
 * fails the validator, which is what {@code manifest-contract-drift} exists to catch.
 */
public final class ManifestSchema {

    /** Canonical URL a manifest points $schema at, served by the docs site. */
    public static final String SCHEMA_ID = "https://intisy.github.io/bayonet/schema/plugin.schema.json";

    /** Draft the published schema declares, which no validator in this package reads. */
    public static final String DRAFT = "http://json-schema.org/draft-07/schema#";

    private ManifestSchema() {
    }

    /** @return the schema every parsed manifest is checked against */
    public static JsonSchema get() {
        Map<String, JsonSchema> properties = new LinkedHashMap<String, JsonSchema>();
        properties.put("$schema", described(JsonSchema.ofType("string"),
                "Pointer at the published manifest schema, for an editor's completion and validation."));

        JsonSchema id = described(JsonSchema.ofType("string"), "The plugin's permanent identity, matching its repository name.");
        id.setPattern("^[a-z0-9]+(-[a-z0-9]+)*$");
        id.setFix("use lowercase words joined by single hyphens, for example \"config-ledger\"");
        properties.put("id", id);

        JsonSchema api = described(JsonSchema.ofType("integer"), "The lowest API major version this plugin needs. A floor, not a build tag.");
        api.setMinimum(Integer.valueOf(1));
        api.setFix("set \"api\" to the lowest API major version this plugin needs, for example 1");
        properties.put("api", api);

        JsonSchema entry = described(JsonSchema.ofType("string"), "The built module a host imports. Required once capabilities are declared.");
        entry.setFix("point \"entry\" at the built module a host imports, for example \"dist/index.js\"");
        properties.put("entry", entry);

        properties.put("displayName", described(JsonSchema.ofType("string"), "The name a surface shows instead of the id."));
        properties.put("icon", described(JsonSchema.ofType("string"), "Path to a square-viewBox SVG mark, relative to the repo root."));

        JsonSchema icons = described(JsonSchema.ofType("object"),
                "Further marks this repo ships, each keyed by the id of the thing it belongs to.");
        icons.setAdditionalProperties(described(JsonSchema.ofType("string"),
                "Path to a square-viewBox SVG mark, relative to the repo root."));
        properties.put("icons", icons);

        JsonSchema capabilities = described(JsonSchema.ofType("array"), "Host-facing abilities this plugin provides at activation.");
        capabilities.setItems(JsonSchema.ofType("string"));
        capabilities.setFix("list capability ids as strings, for example [\"provider\", \"screens\"]");
        properties.put("capabilities", capabilities);

        properties.put("services", services());
        properties.put("commands", commands());
        properties.put("config", config());
        properties.put("data", data());

        JsonSchema permissions = described(JsonSchema.ofType("array"), "Declared permissions, surfaced at install and in dashboards.");
        permissions.setItems(JsonSchema.ofType("string"));
        properties.put("permissions", permissions);

        properties.put("lifecycle", lifecycle());
        properties.put("publish", publish());
        properties.put("repo", repo());
        properties.put("marketplace", marketplace());
        properties.put("app", app());

        JsonSchema root = described(JsonSchema.ofType("object"), "The single machine-readable description of a repo in the intisy-ai ecosystem.");
        root.setSchemaDraft(DRAFT);
        root.setSchemaId(SCHEMA_ID);
        root.setTitle("intisy-ai plugin manifest");
        root.setRequired(Arrays.asList("id", "api"));
        root.setProperties(properties);
        return root;
    }

    private static JsonSchema services() {
        Map<String, JsonSchema> properties = new LinkedHashMap<String, JsonSchema>();
        JsonSchema provides = described(JsonSchema.ofType("array"),
                "Service ids this plugin registers, each namespaced by its own id or a well-known bare id.");
        provides.setItems(JsonSchema.ofType("string"));
        properties.put("provides", provides);
        JsonSchema consumes = described(JsonSchema.ofType("array"), "Service ids this plugin asks for.");
        consumes.setItems(JsonSchema.ofType("string"));
        properties.put("consumes", consumes);
        JsonSchema services = described(JsonSchema.ofType("object"),
                "The inter-plugin contract: what this plugin offers other plugins, and what it asks of them.");
        services.setProperties(properties);
        return services;
    }

    private static JsonSchema commands() {
        Map<String, JsonSchema> properties = new LinkedHashMap<String, JsonSchema>();
        properties.put("name", described(JsonSchema.ofType("string"), "The command's name, which is also the file it is written to."));
        properties.put("description", described(JsonSchema.ofType("string"), "What a command picker shows beside the name."));
        properties.put("argumentHint", described(JsonSchema.ofType("string"),
                "The argument shape a picker hints at, such as \"list | get <key>\"."));
        properties.put("body", described(JsonSchema.ofType("string"), "Markdown the model is shown, after any shell output."));
        properties.put("shell", described(JsonSchema.ofType("string"),
                "A shell line run before the body, which may use $ARGUMENTS and {{BUNDLE}}."));
        JsonSchema command = described(JsonSchema.ofType("object"), "One slash command this plugin contributes.");
        command.setRequired(Arrays.asList("name", "description"));
        command.setProperties(properties);
        JsonSchema commands = described(JsonSchema.ofType("array"),
                "Slash commands this plugin contributes, which a host deploys without importing it.");
        commands.setItems(command);
        return commands;
    }

    private static JsonSchema data() {
        JsonSchema paths = described(JsonSchema.ofType("array"),
                "Paths this plugin writes to, relative to the home it runs in.");
        paths.setItems(JsonSchema.ofType("string"));
        Map<String, JsonSchema> properties = new LinkedHashMap<String, JsonSchema>();
        properties.put("paths", paths);
        JsonSchema data = described(JsonSchema.ofType("object"),
                "Where this plugin keeps state that is not named after it.");
        data.setRequired(Arrays.asList("paths"));
        data.setProperties(properties);
        return data;
    }

    private static JsonSchema config() {
        Map<String, JsonSchema> properties = new LinkedHashMap<String, JsonSchema>();
        properties.put("name", described(JsonSchema.ofType("string"),
                "The file these settings live in, config/<name>.json, when that is not the plugin's id."));
        properties.put("defaults", described(JsonSchema.ofType("object"),
                "Every setting this plugin has, and what it is worth until a home changes it."));
        JsonSchema config = described(JsonSchema.ofType("object"), "This plugin's settings as it ships them.");
        config.setRequired(Arrays.asList("defaults"));
        config.setProperties(properties);
        return config;
    }

    private static JsonSchema lifecycle() {
        Map<String, JsonSchema> properties = new LinkedHashMap<String, JsonSchema>();
        properties.put("install", described(JsonSchema.ofType("boolean"), "The entry exports install(ctx), run once after first deploy."));
        properties.put("repair", described(JsonSchema.ofType("boolean"), "The entry exports repair(ctx), run on demand from a host."));
        JsonSchema lifecycle = described(JsonSchema.ofType("object"), "Which optional lifecycle hooks the entry module exports.");
        lifecycle.setProperties(properties);
        return lifecycle;
    }

    private static JsonSchema publish() {
        Map<String, JsonSchema> properties = new LinkedHashMap<String, JsonSchema>();
        properties.put("scopedOnly", described(JsonSchema.ofType("boolean"),
                "Publish only as @intisy-ai/<name>, because the unscoped name is unavailable."));
        JsonSchema jarModule = described(JsonSchema.ofType("array"),
                "The Gradle modules whose jars ship as release assets, each named by its own classifier.");
        jarModule.setItems(JsonSchema.ofType("string"));
        properties.put("jarModule", jarModule);
        properties.put("generatedReadme", described(JsonSchema.ofType("boolean"),
                "The README is rendered at build time, so the release promotes it rather than testing it."));
        properties.put("jarPretest", described(JsonSchema.ofType("boolean"),
                "Run the Gradle build before the tests, because a test needs its jar installed first."));
        JsonSchema publish = described(JsonSchema.ofType("object"),
                "How the repo is published, to npm and as Java release assets.");
        publish.setProperties(properties);
        return publish;
    }

    private static JsonSchema repo() {
        Map<String, JsonSchema> properties = new LinkedHashMap<String, JsonSchema>();
        properties.put("role", described(JsonSchema.ofType("string"),
                "The role phrase, capitalized, without the fixed \"for the intisy-ai AI-proxy ecosystem.\" suffix."));
        properties.put("category", described(JsonSchema.ofType("string"),
                "The single category topic, for example core-library or ai-provider."));
        JsonSchema domains = described(JsonSchema.ofType("array"), "Domain topics, for example claude or gemini.");
        domains.setItems(JsonSchema.ofType("string"));
        properties.put("domains", domains);
        JsonSchema tech = described(JsonSchema.ofType("array"),
                "The tech topics, for example typescript, java or svelte.");
        tech.setItems(JsonSchema.ofType("string"));
        properties.put("tech", tech);
        JsonSchema topics = described(JsonSchema.ofType("array"),
                "Topics this repo needs that no other rule derives, for example github-actions.");
        topics.setItems(JsonSchema.ofType("string"));
        properties.put("topics", topics);
        JsonSchema repo = described(JsonSchema.ofType("object"),
                "Repository metadata: the GitHub description and topic set are derived from it.");
        repo.setRequired(Arrays.asList("role", "category", "tech"));
        repo.setProperties(properties);
        return repo;
    }

    private static JsonSchema marketplace() {
        Map<String, JsonSchema> matchProperties = new LinkedHashMap<String, JsonSchema>();
        JsonSchema topics = described(JsonSchema.ofType("array"), "Repository topics an entry must carry.");
        topics.setItems(JsonSchema.ofType("string"));
        matchProperties.put("topics", topics);
        matchProperties.put("kind", described(JsonSchema.ofType("string"),
                "The catalog kind an entry must be, as the reading host names its kinds."));
        JsonSchema match = described(JsonSchema.ofType("object"), "Which entries this category holds.");
        match.setProperties(matchProperties);

        Map<String, JsonSchema> categoryProperties = new LinkedHashMap<String, JsonSchema>();
        categoryProperties.put("id", described(JsonSchema.ofType("string"),
                "The category's id, unique across every plugin declaring one."));
        categoryProperties.put("label", described(JsonSchema.ofType("string"),
                "The name a surface shows. Absent means the id is shown."));
        categoryProperties.put("match", match);
        JsonSchema category = described(JsonSchema.ofType("object"),
                "One category a plugin adds to a host's catalog of installable things.");
        category.setRequired(Arrays.asList("id", "match"));
        category.setProperties(categoryProperties);

        JsonSchema categories = described(JsonSchema.ofType("array"), "Categories this plugin adds.");
        categories.setItems(category);
        Map<String, JsonSchema> properties = new LinkedHashMap<String, JsonSchema>();
        properties.put("categories", categories);
        JsonSchema marketplace = described(JsonSchema.ofType("object"),
                "What this plugin contributes to a host's catalog of installable things.");
        marketplace.setRequired(Arrays.asList("categories"));
        marketplace.setProperties(properties);
        return marketplace;
    }

    /**
     * The app this repo is the loader for.
     *
     * @implNote Only id, label and home are required, although the contract's AppDescriptor marks
     * more than that non-optional: the interface describes a RESOLVED descriptor and this schema
     * validates a DECLARATION. A reader fills what a declaration omits, so requiring those fields
     * here would reject a valid app whose project left them to the defaults.
     */
    private static JsonSchema app() {
        Map<String, JsonSchema> properties = new LinkedHashMap<String, JsonSchema>();
        properties.put("id", described(JsonSchema.ofType("string"),
                "The app's permanent id, for example claude or opencode."));
        properties.put("label", described(JsonSchema.ofType("string"), "The name a surface shows instead of the id."));
        properties.put("icon", described(JsonSchema.ofType("string"),
                "Path to a square-viewBox SVG mark for the app, relative to the repo root."));
        properties.put("home", appHome());
        properties.put("detect", appDetect());
        properties.put("loader", appLoader());
        properties.put("commandsSubdir", described(JsonSchema.ofType("string"),
                "The subdirectory inside the app home holding its slash commands."));
        properties.put("paths", appPathNames());
        properties.put("proxyPort", described(JsonSchema.ofType("integer"),
                "The port this app's proxy listens on, or 0 when it needs none."));
        JsonSchema integration = described(JsonSchema.ofType("string"), "How this app reaches the local API.");
        integration.setEnumValues(Arrays.asList("env-baseurl", "native"));
        integration.setFix("set \"integration\" to \"env-baseurl\" when the app is pointed at the proxy by an environment variable, or \"native\" when it loads the plugin itself");
        properties.put("integration", integration);
        properties.put("wireFormat", described(JsonSchema.ofType("string"),
                "The wire format this app speaks, for example anthropic."));
        properties.put("usage", appUsage());
        properties.put("accent", described(JsonSchema.ofType("string"),
                "Accent colour for this app's surfaces, as a #rrggbb hex string."));
        properties.put("wrapperCommand", described(JsonSchema.ofType("string"),
                "The command a user types to launch this app through its loader's wrapper."));
        properties.put("npmPlugins", appNpmPlugins());
        properties.put("startupHook", appStartupHook());
        properties.put("discovery", appDiscovery());
        properties.put("projects", appProjects());
        properties.put("modelCatalog", appModelCatalog());

        JsonSchema app = described(JsonSchema.ofType("object"),
                "The app this repo is the loader for, declared by the app's own project.");
        app.setRequired(Arrays.asList("id", "label", "home"));
        app.setProperties(properties);
        return app;
    }

    private static JsonSchema appHome() {
        Map<String, JsonSchema> properties = new LinkedHashMap<String, JsonSchema>();
        properties.put("envOverride", described(JsonSchema.ofType("string"),
                "Environment variable that overrides every candidate, set by a host driving this app."));
        properties.put("nativeEnv", described(JsonSchema.ofType("string"),
                "The app's OWN environment variable for its config directory, which it reads itself."));
        properties.put("xdgSubdir", described(JsonSchema.ofType("string"),
                "Subdirectory under the XDG config directory, when the app follows that layout."));
        JsonSchema candidates = described(JsonSchema.ofType("array"),
                "Paths to try in order, each with a leading ~ for the user home.");
        candidates.setItems(JsonSchema.ofType("string"));
        properties.put("candidates", candidates);
        JsonSchema home = described(JsonSchema.ofType("object"),
                "Where this app keeps its home directory, in the order a resolver tries.");
        home.setRequired(Arrays.asList("candidates"));
        home.setProperties(properties);
        return home;
    }

    private static JsonSchema appDetect() {
        Map<String, JsonSchema> properties = new LinkedHashMap<String, JsonSchema>();
        properties.put("binary", described(JsonSchema.ofType("string"),
                "The executable a user launches, looked up on the path."));
        properties.put("pkg", described(JsonSchema.ofType("string"),
                "The npm package the app ships as, for a global-install check."));
        JsonSchema detect = described(JsonSchema.ofType("object"), "How to tell whether this app is installed.");
        detect.setProperties(properties);
        return detect;
    }

    private static JsonSchema appLoader() {
        Map<String, JsonSchema> properties = new LinkedHashMap<String, JsonSchema>();
        properties.put("id", described(JsonSchema.ofType("string"), "The loader plugin's id."));
        properties.put("url", described(JsonSchema.ofType("string"),
                "Where the loader is cloned from, as owner/repo or a full URL."));
        JsonSchema loader = described(JsonSchema.ofType("object"),
                "The plugin this app is reached through. Absent means the app has no loader.");
        loader.setRequired(Arrays.asList("id", "url"));
        loader.setProperties(properties);
        return loader;
    }

    private static JsonSchema appPathNames() {
        Map<String, JsonSchema> properties = new LinkedHashMap<String, JsonSchema>();
        properties.put("repos", described(JsonSchema.ofType("string"), "Where plugin checkouts live."));
        properties.put("plugin", described(JsonSchema.ofType("string"),
                "Where deployed plugin bundles and their manifest sidecars live."));
        properties.put("cache", described(JsonSchema.ofType("string"), "Where cached downloads live."));
        properties.put("config", described(JsonSchema.ofType("string"), "Where configuration files live."));
        JsonSchema paths = described(JsonSchema.ofType("object"),
                "The names of the storage subdirectories inside this app's home.");
        paths.setProperties(properties);
        return paths;
    }

    private static JsonSchema appUsage() {
        Map<String, JsonSchema> properties = new LinkedHashMap<String, JsonSchema>();
        JsonSchema formats = described(JsonSchema.ofType("array"),
                "Format ids, each of which a consumer maps to a parser of its own.");
        formats.setItems(JsonSchema.ofType("string"));
        properties.put("formats", formats);
        JsonSchema usage = described(JsonSchema.ofType("object"),
                "Session-storage formats this app writes, for usage readers.");
        usage.setRequired(Arrays.asList("formats"));
        usage.setProperties(properties);
        return usage;
    }

    private static JsonSchema appNpmPlugins() {
        Map<String, JsonSchema> properties = new LinkedHashMap<String, JsonSchema>();
        JsonSchema configFiles = described(JsonSchema.ofType("array"),
                "Config files to look in, in order, for the plugin list.");
        configFiles.setItems(JsonSchema.ofType("string"));
        properties.put("configFiles", configFiles);
        properties.put("pluginsKey", described(JsonSchema.ofType("string"),
                "The key inside those files holding the plugin list."));
        properties.put("packageCache", described(JsonSchema.ofType("string"),
                "Where the app caches the packages it installed."));
        properties.put("schemaUrl", described(JsonSchema.ofType("string"),
                "The app's config schema, for an editor's completion."));
        JsonSchema npmPlugins = described(JsonSchema.ofType("object"),
                "This app's own npm-plugin mechanism. Absent means it has none.");
        npmPlugins.setRequired(Arrays.asList("configFiles", "pluginsKey"));
        npmPlugins.setProperties(properties);
        return npmPlugins;
    }

    private static JsonSchema appStartupHook() {
        Map<String, JsonSchema> properties = new LinkedHashMap<String, JsonSchema>();
        properties.put("file", described(JsonSchema.ofType("string"), "The file to write, relative to the app home."));
        JsonSchema path = described(JsonSchema.ofType("array"), "The key path to the array the entry joins.");
        path.setItems(JsonSchema.ofType("string"));
        properties.put("path", path);
        properties.put("entry", described(JsonSchema.ofType("object"),
                "A JSON template whose strings have the {plugin} placeholder replaced with the plugin's name."));
        JsonSchema startupHook = described(JsonSchema.ofType("object"),
                "How this app runs a plugin at startup when it has no npm-plugin list of its own.");
        startupHook.setRequired(Arrays.asList("file", "path", "entry"));
        startupHook.setProperties(properties);
        return startupHook;
    }

    private static JsonSchema appDiscovery() {
        Map<String, JsonSchema> properties = new LinkedHashMap<String, JsonSchema>();
        properties.put("topic", described(JsonSchema.ofType("string"),
                "The repository topic a community plugin carries."));
        properties.put("searchQuery", described(JsonSchema.ofType("string"),
                "A free-text search to run where the topic alone under-reports."));
        properties.put("awesomeList", described(JsonSchema.ofType("string"),
                "A curated list to read, as a raw URL."));
        JsonSchema discovery = described(JsonSchema.ofType("object"),
                "Where a marketplace looks for this app's community plugins.");
        discovery.setProperties(properties);
        return discovery;
    }

    private static JsonSchema appProjects() {
        Map<String, JsonSchema> properties = new LinkedHashMap<String, JsonSchema>();
        properties.put("historyFile", described(JsonSchema.ofType("string"), "A history file inside the app home."));
        JsonSchema sessionDb = described(JsonSchema.ofType("array"),
                "Session databases to try in order, absolute or relative to the app home.");
        sessionDb.setItems(JsonSchema.ofType("string"));
        properties.put("sessionDb", sessionDb);
        properties.put("markerFile", described(JsonSchema.ofType("string"),
                "The file the app writes inside a project's git directory to record the project id."));
        JsonSchema projects = described(JsonSchema.ofType("object"),
                "Where this app records the projects a user has worked in.");
        projects.setProperties(properties);
        return projects;
    }

    private static JsonSchema appModelCatalog() {
        Map<String, JsonSchema> properties = new LinkedHashMap<String, JsonSchema>();
        JsonSchema files = described(JsonSchema.ofType("array"), "Files to try in order, relative to the app home.");
        files.setItems(JsonSchema.ofType("string"));
        properties.put("files", files);
        properties.put("envOverride", described(JsonSchema.ofType("string"),
                "Environment variable naming the config file outright."));
        properties.put("schemaUrl", described(JsonSchema.ofType("string"),
                "The app's config schema, for an editor's completion."));
        properties.put("providerKey", described(JsonSchema.ofType("string"),
                "The key inside that file holding the catalog, named after the app's own config key."));
        JsonSchema modelCatalog = described(JsonSchema.ofType("object"),
                "The app config file a model catalog is merged into.");
        modelCatalog.setRequired(Arrays.asList("files", "providerKey"));
        modelCatalog.setProperties(properties);
        return modelCatalog;
    }

    private static JsonSchema described(JsonSchema schema, String description) {
        schema.setDescription(description);
        return schema;
    }
}
