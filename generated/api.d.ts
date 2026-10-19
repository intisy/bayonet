// Generated from Java sources. Do not edit.

/**
 * A capability id paired, in the type system, with the implementation that id requires.
 *
 * @remarks
 * The library that defines a category owns its key. This package deliberately mints none,
 * which is what lets the api be reused by a project that has never heard of this ecosystem.
 */
export interface CapabilityType<T> {
  /** Never present at run time. It exists so two keys parameterised differently cannot be interchanged. */
  readonly __phantom?: T;
  /** The id itself, which is what crosses the boundary at run time. */
  readonly id: string;
}

/**
 * A plugin's settings as it ships them.
 *
 * @remarks
 * Values only. What a setting is CALLED and how a surface renders it is the settings
 * capability's business, which this contract may not know: a manifest that carried labels would be
 * minting vocabulary, and the api mints none.
 */
export interface ManifestConfig {
  /** Every setting this plugin has, and what it is worth until a home changes it. */
  defaults: Record<string, unknown>;
  /**
   * The file these settings live in, `config/<name>.json`, when that is not the plugin's id.
   *
   * @remarks
   * Absent means the id, which is the case for all but a plugin whose settings file
   * predates its repository name. Stated rather than assumed, because a surface that guesses
   * writes to a file the plugin never reads.
   */
  name?: string;
}

/**
 * An app's own npm-plugin mechanism.
 *
 * @remarks
 * Absent on the descriptor means the app has none, so a consumer offers no npm rows, no
 * npm section and no npm install method rather than offering ones that cannot work.
 */
export interface AppNpmPlugins {
  /** Config files to look in, in order, for the plugin list. */
  configFiles: string[];
  /** Where the app caches the packages it installed. */
  packageCache?: string;
  /** The key inside those files holding the plugin list. */
  pluginsKey: string;
  /** The app's config schema, for an editor's completion. */
  schemaUrl?: string;
}

/**
 * Everything a plugin may touch, and the only way it touches any of it.
 *
 * @remarks
 * Taking everything through the context is what makes the introspection ledger and the
 * doctor free rather than separately built, and it is the seam a host would use to run a plugin out
 * of process without changing plugin code.
 */
export interface PluginContext {
  /**
   * The typed key for a capability id, so a plugin can provide one without linking the library
   * that mints it.
   *
   * @remarks
   * The id is data the manifest already states, and the payload type comes from a
   * type-only import, which erases at build time. That pair is what makes a plugin's only runtime
   * dependency this package.
   * @param <T> - the capability's implementation type
   * @param id - the capability id, as the manifest declares it
   * @returns the typed key for that id
   */
  capability<T>(id: string): CapabilityType<T>;
  /** This plugin's resolved configuration. */
  readonly config: PluginConfig;
  /** How this plugin says something happened, and hears that something did. */
  readonly events: Events;
  /**
   * Every app home the host knows about, whether or not each exists on disk.
   *
   * @remarks
   * Asked rather than held, because a home can appear, and can be installed, while a
   * plugin is running. `paths` is this plugin's own home; this is every home there is.
   * @returns every app home the host knows about
   */
  homes(): HomeDescriptor[];
  /** What this plugin may know about the host. */
  readonly host: HostDescriptor;
  /** This plugin's logger. */
  readonly log: Logger;
  /** This plugin's own manifest, as the host validated it. */
  readonly manifest: PluginManifest;
  /** The storage directories of the home this plugin runs in. */
  readonly paths: PluginPaths;
  /**
   * Supplies the implementation behind a capability the manifest declares.
   *
   * @remarks
   * One signature, never a plain-string overload beside it: the pair would let a wrong
   * payload compile through the string side.
   * @param <T> - the capability's implementation type
   * @param type - the capability key, from `capability(String)`
   * @param implementation - this plugin's implementation of that capability
   */
  provide<T>(type: CapabilityType<T>, implementation: T): void;
  /**
   * The typed key for a service id, so a plugin can reach another's API, or offer its own, without
   * linking the library that mints the id.
   *
   * @remarks
   * The counterpart of `capability(String)` for the ids a manifest states under
   * `services`. Without it a plugin would have to write the key literal itself, which is the
   * plugin minting vocabulary rather than naming an id it already declares.
   * @param <T> - the service's API type
   * @param id - the service id, as the manifest declares it
   * @returns the typed key for that id
   */
  service<T>(id: string): ServiceType<T>;
  /** How this plugin reaches another plugin's API, and offers its own. */
  readonly services: Services;
  /**
   * The typed key for an event topic, so a plugin can publish or subscribe without linking the
   * library that names the topic.
   *
   * @remarks
   * Same reason as `service(String)`: a topic is an id, and a plugin that had to
   * build the key by hand would be minting the vocabulary instead of naming it.
   * @param <T> - the topic's payload type
   * @param id - the topic id, as the manifest declares it
   * @returns the typed key for that id
   */
  topic<T>(id: string): TopicType<T>;
}

/**
 * How a plugin reaches another plugin's API, and offers its own.
 *
 * @remarks
 * A typed handle, never an import: the plugin answering is whichever one registered the
 * id, so no plugin ever names another. This is what makes a plugin terminal, and it is the reason
 * a host needs no import of anything it drives.
 */
export interface Services {
  /**
   * What is registered under this id right now, or absent when nothing is.
   *
   * @param <T> - the service's API type
   * @param type - the service key, from {@link PluginContext.service(String)}
   * @returns the current registration, or `null` when none is registered
   */
  get<T>(type: ServiceType<T>): T | undefined;
  /**
   * Every service id registered right now.
   *
   * @returns the registered service ids
   */
  ids(): string[];
  /**
   * Offers an implementation under this id, until the returned function is called.
   *
   * @param <T> - the service's API type
   * @param type - the service key, from {@link PluginContext.service(String)}
   * @param implementation - this plugin's implementation of the service
   * @returns a function that withdraws the registration when called
   */
  register<T>(type: ServiceType<T>, implementation: T): () => void;
  /**
   * Waits for the id to be registered, for a host default the implementation chooses.
   *
   * @param <T> - the service's API type
   * @param type - the service key, from {@link PluginContext.service(String)}
   * @returns a stage that completes with the registration once one appears
   */
  want<T>(type: ServiceType<T>): Promise<T>;
  /**
   * Waits for the id to be registered, giving up after the stated time.
   *
   * @param <T> - the service's API type
   * @param type - the service key, from {@link PluginContext.service(String)}
   * @param options - how long to wait before giving up
   * @returns a stage that completes with the registration, or fails once the wait times out
   */
  want<T>(type: ServiceType<T>, options: WantOptions): Promise<T>;
  /**
   * Reports every registration and removal of this id until the returned function is called. The
   * listener is handed the service and either "register" or "unregister"; on the latter the
   * service is absent.
   *
   * @remarks
   * Distinct from `want`, which answers once: a service can be replaced while a
   * consumer is still holding the old one, and only a watcher sees that.
   * @param <T> - the service's API type
   * @param type - the service key, from {@link PluginContext.service(String)}
   * @param listener - called with the current registration (or absent) and the event kind
   * @returns a function that stops the watch when called
   */
  watch<T>(type: ServiceType<T>, listener: ((a: T, b: string) => void)): () => void;
}

/**
 * How a plugin says something happened, and hears that something did.
 *
 * @remarks
 * A topic is paired with its payload in the type system, so a publisher and a subscriber
 * cannot disagree about the shape without the compiler saying so.
 */
export interface Events {
  /**
   * Says a topic carried this payload, to whoever is listening and to nobody in particular.
   *
   * @param <T> - the topic's payload type
   * @param topic - the topic to publish on
   * @param payload - the event payload
   */
  publish<T>(topic: TopicType<T>, payload: T): void;
  /**
   * Hears this topic until the returned function is called.
   *
   * @param <T> - the topic's payload type
   * @param topic - the topic to listen on
   * @param listener - called with each payload published on `topic`
   * @returns a function that stops the subscription when called
   */
  subscribe<T>(topic: TopicType<T>, listener: ((value: T) => void)): () => void;
}

/**
 * How an app runs a plugin at startup when it has no npm-plugin list of its own.
 *
 * @remarks
 * Data, not code, so an app declaring neither this nor an npm mechanism auto-loads
 * nothing rather than being special-cased by a host.
 */
export interface AppStartupHook {
  /** A JSON template whose strings have the `{plugin}` placeholder replaced with the plugin's name. */
  entry: unknown;
  /** The file to write, relative to the app home. */
  file: string;
  /** The key path to the array the entry joins. */
  path: string[];
}

/**
 * Key/value store of JSON strings, keyed by file-like names. `update` must be atomic; that is
 * the implementation's concern.
 *
 * @remarks
 * The key examples this once carried named plugin categories, which the contract may not
 * know, and became visible to that gate the moment this interface started emitting TypeScript.
 */
export interface Store {
  /**
   * Removes `key`, and does nothing when it holds nothing.
   *
   * @param key - the entry's name
   */
  delete(key: string): void;
  /**
   * Whether anything is stored under `key`.
   *
   * @param key - the entry's name
   * @returns true when an entry is stored under `key`, false when there is none
   */
  exists(key: string): boolean;
  /**
   * The value stored under `key`, or `null` when nothing is stored there.
   *
   * @param key - the entry's name
   * @returns the stored value, or `null` when nothing is stored under `key`
   */
  get(key: string): string;
  /**
   * Every key beginning with `prefix`, in the order the store holds them.
   *
   * @param prefix - the key prefix to match, or an empty string to match every key
   * @returns the matching keys, or an empty list when none match
   */
  listKeys(prefix: string): string[];
  /**
   * Stores `value` under `key`, replacing whatever was there.
   *
   * @param key - the entry's name
   * @param value - the value to store
   */
  put(key: string, value: string): void;
  /**
   * Replaces `key`'s value with what `mutator` returns, reading and writing as one
   * step, and hands the mutator `null` when the key holds nothing yet.
   *
   * @param key - the entry's name
   * @param mutator - computes the new value from the current one
   */
  update(key: string, mutator: ((value: string) => string)): void;
}

/**
 * One app a host loads plugins into, as the app's own project declares it.
 *
 * @remarks
 * Everything here is data a consumer reads, never behaviour: an app is added by declaring
 * one of these and nothing else learns its name. A declaration carries only what the app's project
 * knows, so a reader fills what it omits rather than requiring the declaration to be complete.
 */
export interface AppDescriptor {
  /**
   * Accent colour for this app's surfaces, as a `#rrggbb` hex string.
   *
   * @remarks
   * Presentation data beside `icon`. Absent means a consumer uses its own neutral
   * default rather than inventing one per app.
   */
  accent?: string;
  /** The subdirectory inside the app home holding its slash commands. */
  commandsSubdir: string;
  /** How to tell whether this app is installed. */
  detect: AppDetect;
  /** Where a marketplace looks for this app's community plugins. */
  discovery?: AppDiscovery;
  /** Where this app keeps its home directory. */
  home: AppHome;
  /** Self-contained SVG mark for the app, rendered by dashboards. Data, not code. */
  icon?: string;
  /** The app's permanent id, for example `claude` or `opencode`. */
  id: string;
  /** How this app reaches the local API. */
  integration: "env-baseurl" | "native";
  /** The name a surface shows instead of the id. */
  label: string;
  /** The plugin this app is reached through. Absent means the app has no loader. */
  loader?: AppLoader;
  /** The app config file a model catalog is merged into. */
  modelCatalog?: AppModelCatalog;
  /** This app's own npm-plugin mechanism. Absent means it has none. */
  npmPlugins?: AppNpmPlugins;
  /**
   * The names of the storage subdirectories inside this app's home.
   *
   * @remarks
   * Optional because a declaration rarely states them: a reader resolves each name from
   * the declaration, then an environment override, then the ecosystem default.
   */
  paths?: AppPathNames;
  /** Where this app records the projects a user has worked in. */
  projects?: AppProjects;
  /** The port this app's proxy listens on, or 0 when it needs none. */
  proxyPort: number;
  /** How this app runs a plugin at startup when it has no npm-plugin list of its own. */
  startupHook?: AppStartupHook;
  /** Session-storage formats this app writes, for usage readers. Absent means no usage data. */
  usage?: AppUsage;
  /** The wire format this app speaks, for example `anthropic`. */
  wireFormat: string;
  /**
   * The command a user types to launch this app through its loader's wrapper.
   *
   * @remarks
   * Absent means the app is launched by its own binary, so nothing writes a wrapper.
   */
  wrapperCommand?: string;
}

/**
 * One app home the host knows about.
 *
 * @remarks
 * A plugin whose job spans more than its own home takes them from the host rather than
 * resolving a registry itself, which is what keeps it from linking the library that owns the
 * registry's shape.
 */
export interface HomeDescriptor {
  /** The app id, for example `claude` or `opencode`. */
  app: string;
  /** The name a surface shows instead of the id. */
  label: string;
  /** The id of the plugin this app is reached through, absent when it has none. */
  loader?: string;
  /** This home's storage directories. */
  paths: PluginPaths;
  /** Whether this home exists on disk. An absent home means that app is not installed. */
  present: boolean;
}

/**
 * One slash command a plugin contributes, declared rather than registered by running code.
 *
 * @remarks
 * Declared so a host can deploy a plugin's commands without importing it, which is what
 * lets the command files exist before the plugin has ever activated.
 */
export interface ManifestCommand {
  /** The argument shape a picker hints at, such as `list | get <key>`. */
  argumentHint?: string;
  /** Markdown the model is shown, after any shell output. */
  body?: string;
  /** What a command picker shows beside the name. */
  description: string;
  /** The command's name, which is also the file it is written to. */
  name: string;
  /** A shell line run before the body, which may use $ARGUMENTS and {{BUNDLE}}. */
  shell?: string;
}

/**
 * The absolute storage directories of the app home a plugin is running in.
 *
 * @remarks
 * A plugin joins paths onto these rather than assembling a home path itself, so a renamed
 * directory takes effect everywhere at once.
 */
export interface PluginPaths {
  /** Where cached downloads live. */
  cache: string;
  /** Where configuration files live. */
  config: string;
  /** The app home directory. */
  home: string;
  /** Where deployed plugin bundles and their manifest sidecars live. */
  plugin: string;
  /** Where plugin checkouts live. */
  repos: string;
}

/**
 * The app config file a model catalog is merged into.
 *
 * @remarks
 * Absent on the descriptor means nothing is merged and a consumer reads its own model
 * cache directly.
 */
export interface AppModelCatalog {
  /** Environment variable naming the config file outright. */
  envOverride?: string;
  /** Files to try in order, relative to the app home. */
  files: string[];
  /**
   * The key inside that file holding the catalog.
   *
   * @remarks
   * Named after the app's OWN config key, which is data this package quotes rather than
   * a category it serves: it never reads what the key contains.
   */
  providerKey: string;
  /** The app's config schema, for an editor's completion. */
  schemaUrl?: string;
}

/**
 * The contents of a repo's plugin.json.
 *
 * @remarks
 * No index signature and no additionalProperties: an author gets excess-property checking
 * while writing one, and the runtime validator still ignores fields it does not know, so a manifest
 * written against a later version loads on today's host.
 */
export interface PluginManifest {
  /**
   * Pointer at the published manifest schema, for an editor's completion and validation.
   *
   * @remarks
   * Declared although nothing reads it, because every manifest in the ecosystem carries
   * it and the published schema accepts it: without it an author writing a manifest literal in
   * TypeScript could not include a field their own plugin.json has.
   */
  $schema?: string;
  /** The lowest API major version this plugin needs. A floor, not a build tag. */
  api: number;
  /**
   * The app this repo is the loader for, declared by the app's own project.
   *
   * @remarks
   * Present only on a repo that IS an app's loader, which is what makes "whose loader is
   * this" answerable from the manifest alone, with no consumer naming a plugin.
   */
  app?: AppDescriptor;
  /** Host-facing abilities this plugin provides at activation, declared statically so a host can answer what it can do without executing it. */
  capabilities?: string[];
  /** Slash commands this plugin contributes, which a host deploys without importing it. */
  commands?: ManifestCommand[];
  /** This plugin's settings as it ships them. */
  config?: ManifestConfig;
  /** Where this plugin keeps state that is not named after it. */
  data?: ManifestData;
  /** The name a surface shows instead of the id. */
  displayName?: string;
  /** The built module a host imports. Required once `capabilities` is non-empty. */
  entry?: string;
  /** Path to a square-viewBox SVG mark, relative to the repo root. */
  icon?: string;
  /**
   * Further marks this repo ships, each keyed by the id of the thing it belongs to.
   *
   * @remarks
   * One repo can contribute several named things, and a single repo-level `icon`
   * cannot serve them. Keyed by id rather than by kind, so this package carries the marks without
   * learning what any of the ids name.
   */
  icons?: Record<string, string>;
  /** The plugin's permanent identity, matching its repository name. */
  id: string;
  /** Which optional lifecycle hooks the entry exports. */
  lifecycle?: ManifestLifecycle;
  /** What this plugin contributes to a host's catalog of installable things. */
  marketplace?: ManifestMarketplace;
  /** Declared permissions, surfaced at install and in dashboards. Not sandbox-enforced. */
  permissions?: string[];
  /** How the repo is published to npm. */
  publish?: ManifestPublish;
  /** Repository metadata. */
  repo?: RepoMeta;
  /** The inter-plugin contract. */
  services?: ManifestServices;
  /**
   * The applications this artifact is for. Absent means every application.
   *
   * @remarks
   * An artifact narrows itself deliberately and is never narrowed by omission, which is
   * what keeps this additive: every manifest written before the field existed stays loadable
   * everywhere. A host refuses only when both sides name applications and the two sets are
   * disjoint.
   */
  targets?: string[];
}

/**
 * The names of the four storage subdirectories inside an app home.
 *
 * @remarks
 * Names rather than paths: an app whose layout differs, or a user who wants its storage
 * elsewhere, changes these rather than any consumer. A consumer resolves them into absolute paths
 * rather than joining the literal names.
 */
export interface AppPathNames {
  /** Where cached downloads live. */
  cache: string;
  /** Where configuration files live. */
  config: string;
  /** Where deployed plugin bundles and their manifest sidecars live. */
  plugin: string;
  /** Where plugin checkouts live. */
  repos: string;
}

/**
 * The plugin that connects an app to the local API.
 *
 * @remarks
 * Data, not code: a host reads this to install and track the app's loader, so an app whose
 * loader is renamed or rehosted needs no consumer change.
 */
export interface AppLoader {
  /** The loader plugin's id. */
  id: string;
  /** Where the loader is cloned from, as `owner/repo` or a full URL. */
  url: string;
}

/**
 * What a plugin may know about its host.
 *
 * @remarks
 * Deliberately not a plugin registry: a plugin adapts to which surfaces exist, never to
 * which app it happens to be in.
 */
export interface HostDescriptor {
  /** The API major version this host implements. */
  api: number;
  /** The app id, for example `claude` or `opencode`. */
  app: string;
  /** Surface ids this host renders, for example `tui` or `gui`. An unknown id is ignored. */
  surfaces: string[];
}

/**
 * What a plugin offers other plugins, and what it asks of them.
 *
 * @remarks
 * Each entry may be written either way, as the bare service id or as the object form that
 * says more about it, so the Java element type is `Object` and the emitted one is the union.
 * Every manifest written before the object form stays valid and keeps its meaning, which is what
 * makes the widening additive rather than a new version of the vocabulary.
 */
export interface ManifestServices {
  /**
   * Services this plugin asks for, used for activation ordering and for what an absence costs,
   * written as bare ids or as {@link ManifestRequirement} objects.
   */
  consumes?: (string | ManifestRequirement)[];
  /**
   * Services this plugin registers, each namespaced by its own id or a well-known bare id,
   * written as bare ids or as {@link ManifestOffer} objects.
   */
  provides?: (string | ManifestOffer)[];
}

/**
 * What a plugin's entry module exports.
 *
 * @remarks
 * Each hook is awaited individually by the host under its own timeout, so a plugin that
 * throws or hangs is quarantined on its own rather than taking a host or a sibling with it.
 */
export interface Plugin {
  /**
   * Supplies the implementation behind every capability the manifest declares.
   *
   * @param context - this activation's host-supplied services and metadata
   */
  activate(context: PluginContext): void | Promise<void>;
  /** Releases whatever `activate` took: timers, watchers, child processes. */
  deactivate(): void | Promise<void>;
  /**
   * Runs once after the first deploy.
   *
   * @param context - this activation's host-supplied services and metadata
   */
  install?(context: PluginContext): void | Promise<void>;
  /**
   * Runs on demand from a host, to put a broken installation right.
   *
   * @param context - this activation's host-supplied services and metadata
   */
  repair?(context: PluginContext): void | Promise<void>;
}

/**
 * Where a component writes what happened.
 *
 * @remarks
 * The host decides where the lines go, whether they mirror to a console, and how they are
 * attributed, so a component never opens a log file itself.
 */
export interface Logger {
  /**
   * Detail only useful while debugging.
   *
   * @param message - the line to log
   */
  debug(message: string): void;
  /**
   * Something that failed.
   *
   * @param message - the line to log
   */
  error(message: string): void;
  /**
   * Something that failed, with the cause.
   *
   * @param message - the line to log
   * @param cause - the failure, logged alongside the message
   */
  error(message: string, cause: unknown): void;
  /**
   * Normal operation.
   *
   * @param message - the line to log
   */
  info(message: string): void;
  /**
   * Something unexpected that did not stop the operation.
   *
   * @param message - the line to log
   */
  warn(message: string): void;
}

/**
 * Where a marketplace looks for an app's community plugins.
 *
 * @remarks
 * Absent on the descriptor means a consumer offers only its own verified list.
 */
export interface AppDiscovery {
  /** A curated list to read, as a raw URL. */
  awesomeList?: string;
  /** A free-text search to run where the topic alone under-reports. */
  searchQuery?: string;
  /** The repository topic a community plugin carries. */
  topic?: string;
}

/**
 * Where a plugin keeps state that is not named after it.
 *
 * @remarks
 * A surface finds most of what a plugin leaves behind by its id; this is the escape hatch
 * for a plugin that writes elsewhere. Declared rather than asked for, because the surface that needs
 * it most is an uninstall, where the plugin is on its way out and may not be running at all.
 */
export interface ManifestData {
  /** Paths this plugin writes to, relative to the home it runs in. */
  paths: string[];
}

/**
 * Where an app records the projects a user has worked in.
 *
 * @remarks
 * Absent on the descriptor means no project history, rather than a consumer guessing at a
 * location.
 */
export interface AppProjects {
  /** A history file inside the app home. */
  historyFile?: string;
  /** The file the app writes inside a project's git directory to record the project id. */
  markerFile?: string;
  /** Session databases to try in order, absolute or relative to the app home. */
  sessionDb?: string[];
}

/**
 * Which catalog entries a contributed category holds.
 *
 * @remarks
 * A match, never a list of entries, which is what keeps a category dynamic: something
 * published tomorrow carrying the topic appears with no change to the plugin that declared the
 * category, and no plugin code runs when the catalog is read.
 */
export interface MarketplaceMatch {
  /** The catalog kind an entry must be, as the reading host names its kinds. */
  kind?: string;
  /** Repository topics an entry must carry. */
  topics?: string[];
}

/** A service id paired, in the type system, with the contract that id promises. */
export interface ServiceType<T> {
  /** Never present at run time. It exists so two keys parameterised differently cannot be interchanged. */
  readonly __phantom?: T;
  /** The id itself, which is what crosses the boundary at run time. */
  readonly id: string;
}

/** An event topic paired, in the type system, with the payload it carries. */
export interface TopicType<T> {
  /** Never present at run time. It exists so two keys parameterised differently cannot be interchanged. */
  readonly __phantom?: T;
  /** The id itself, which is what crosses the boundary at run time. */
  readonly id: string;
}

/** How long a plugin is willing to wait for a service that is not registered yet. */
export interface WantOptions {
  /** Milliseconds to wait before giving up. Absent takes the host's own default. */
  timeoutMs?: number;
}

/** How the repo is published, to npm and as Java release assets. */
export interface ManifestPublish {
  /** The README is rendered at build time, so the release promotes it rather than testing it. */
  generatedReadme?: boolean;
  /**
   * The Gradle modules whose jars ship as release assets, each named by its own classifier.
   *
   * @remarks
   * A list rather than one name because a consumer resolves each module separately: they
   * serve different Gradle configurations, and one shaded jar would put every module on every
   * consumer's runtime classpath.
   */
  jarModule?: string[];
  /** Run the Gradle build before the tests, because a test needs its jar installed first. */
  jarPretest?: boolean;
  /** Publish only as `@intisy-ai/<name>`, because the unscoped name is unavailable. */
  scopedOnly?: boolean;
}

/** How to tell whether an app is installed. */
export interface AppDetect {
  /** The executable a user launches, looked up on the path. */
  binary: string;
  /** The npm package the app ships as, for a global-install check. */
  pkg: string;
}

/** One category a plugin adds to a host's catalog of installable things. */
export interface MarketplaceCategory {
  /** The category's id, unique across every plugin declaring one. */
  id: string;
  /** The name a surface shows. Absent means the id is shown. */
  label?: string;
  /** Which entries this category holds. */
  match: MarketplaceMatch;
}

/** One plugin's configuration, already resolved by the host. */
export interface PluginConfig {
  /**
   * Every setting, defaults merged with what is on disk.
   *
   * @returns the setting keys mapped to their effective values
   */
  all(): Record<string, unknown>;
  /**
   * One setting, absent when it is neither set nor defaulted.
   *
   * @param <T> - the setting's expected value type
   * @param key - the setting's name
   * @returns the setting's effective value, or `null` when it is neither set nor defaulted
   */
  get<T>(key: string): T | undefined;
  /**
   * Writes one setting.
   *
   * @remarks
   * Asynchronous even where a host implements it synchronously, because the seam has to
   * survive a host that runs the plugin out of process.
   * @param key - the setting's name
   * @param value - the value to write
   * @returns a stage that completes once the setting is written
   */
  set(key: string, value: unknown): Promise<void>;
}

/** One service a plugin asks for, and what its absence or its shortfall costs. */
export interface ManifestRequirement {
  /**
   * What this plugin needs of the service, keyed by constraint name, compared against what the
   * service advertises.
   */
  constraints?: Record<string, number>;
  /**
   * Whether this plugin accepts a service that never satisfies its constraints once the budget is
   * spent. Absent means false, and it never excuses an absence.
   */
  degradable?: boolean;
  /** The service id this plugin asks for. */
  id: string;
  /**
   * Whether this plugin still starts when nothing provides the service. Absent means true, which
   * is what writing the bare id means.
   */
  optional?: boolean;
}

/** One service a plugin registers, with what it claims before it is running to answer for itself. */
export interface ManifestOffer {
  /** What this service claims, keyed by attribute name, until the live service reports its own. */
  attributes?: Record<string, number>;
  /** The service id this plugin registers. */
  id: string;
}

/** Repository metadata, from which the GitHub description and topic set are derived. */
export interface RepoMeta {
  /** The single category topic, for example `core-library` or `dashboard`. */
  category: string;
  /** Domain topics, for example `claude` or `gemini`. */
  domains?: string[];
  /** The role phrase, capitalized, without the fixed ecosystem suffix. */
  role: string;
  /**
   * The tech topics, for example `typescript`, `java` or `svelte`.
   *
   * @remarks
   * A list rather than one primary topic, because a repo carrying a Java engine behind a
   * TypeScript package is both and describing it as either is wrong.
   */
  tech: string[];
  /** Topics this repo needs that no other rule derives, for example `github-actions`. */
  topics?: string[];
}

/** The session-storage formats an app writes, for a usage reader. */
export interface AppUsage {
  /** Format ids, each of which a consumer maps to a parser of its own. */
  formats: string[];
}

/** What this plugin contributes to a host's catalog of installable things. */
export interface ManifestMarketplace {
  /** Categories this plugin adds. */
  categories: MarketplaceCategory[];
}

/** Where an app keeps its home directory, in the order a resolver tries. */
export interface AppHome {
  /** Paths to try in order, each with a leading `~` for the user home. */
  candidates: string[];
  /** Environment variable that overrides every candidate, set by a host driving this app. */
  envOverride?: string;
  /** The app's OWN environment variable for its config directory, which it reads itself. */
  nativeEnv?: string;
  /** Subdirectory under the XDG config directory, when the app follows that layout. */
  xdgSubdir?: string;
}

/** Which optional lifecycle hooks the entry module exports. */
export interface ManifestLifecycle {
  /** The entry exports `install(ctx)`, run once after the first deploy. */
  install?: boolean;
  /** The entry exports `repair(ctx)`, run on demand from a host. */
  repair?: boolean;
}

