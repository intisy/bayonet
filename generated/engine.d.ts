// Generated from Java sources. Do not edit.

/**
 * Every app home the host knows about, as reached only through {@link ContextSurface}.
 *
 * @remarks
 * An object with a method rather than a plain array, for the same reason
 * {@link EventBusShape} is one: a runtime is handed over once per plugin, and a home can appear, or
 * be installed, long after that.
 */
export interface HomeRegistryShape {
  /**
   * Every registered home, whether or not each exists on disk.
   *
   * @returns the known homes, or empty when the host registered none
   */
  all(): HomeDescriptorShape[];
}

/**
 * One plugin's view of the live service registry, as reached through {@link ContextSurface}.
 *
 * @remarks
 * `want` is two overloads rather than one method with an optional parameter,
 * mirroring how `assertManifest` already renders an optional trailing argument
 * for this same processor. `watch`'s listener is a `BiConsumer` of the service and the
 * event, so one subscription covers registration and withdrawal. `get` is `| undefined`
 * because a missing service is an absent map entry rather than an answer.
 */
export interface ServiceRegistryShape {
  /**
   * The service registered under an id right now, or undefined.
   *
   * @param id - the service id to look up
   * @returns the registered service, or undefined when none is registered
   */
  get(id: string): unknown | undefined;
  /**
   * Every id registered right now.
   *
   * @returns the registered service ids, or empty when none is registered
   */
  ids(): string[];
  /**
   * Registers a service. Call the result to withdraw it.
   *
   * @param id - the service id to register under
   * @param service - the value other plugins reach through `get`, `want` or `watch`
   * @returns a disposer that withdraws the registration when called
   */
  register(id: string, service: unknown): () => void;
  /**
   * Waits for a service to arrive, under the registry's default deadline.
   *
   * @param id - the service id to wait for
   * @returns a promise that resolves with the service once registered, or rejects on timeout
   */
  want(id: string): Promise<unknown>;
  /**
   * Waits for a service to arrive, under the deadline given.
   *
   * @param id - the service id to wait for
   * @param options - the deadline to wait under
   * @returns a promise that resolves with the service once registered, or rejects on timeout
   */
  want(id: string, options: WantOptionsShape): Promise<unknown>;
  /**
   * Watches one id for registration and unregistration. Call the result to stop.
   *
   * @param id - the service id to watch
   * @param listener - called with the service and the event on each registration or unregistration
   * @returns a disposer that cancels the watch when called
   */
  watch(id: string, listener: ((a: unknown, b: "register" | "unregister") => void)): () => void;
}

/**
 * Orders manifests so a service provider activates before its consumer, naming any cycle.
 *
 * @param manifests - the parsed plugin.json trees to order
 * @returns the resolvable order plus any dependency cycles found
 */
export declare function activationOrder(manifests: unknown[]): ActivationPlanShape;
/**
 * Validates a manifest against the schema, throwing the first problem as a plugin error.
 *
 * @remarks
 * A caller that names no vocabulary is held to an empty one, so a bare well-known id
 * counts as squatting: its caller is a host, which knows its own vocabulary.
 * @param manifest - the parsed plugin.json tree to validate
 * @returns the same manifest, unchanged, once it has been validated
 */
export declare function assertManifest(manifest: unknown): unknown;
/**
 * Validates a manifest, treating the given ids as the bare service ids any plugin may register.
 *
 * @param manifest - the parsed plugin.json tree to validate
 * @param wellKnownServices - the bare service ids this host accepts without a namespace
 * @returns the same manifest, unchanged, once it has been validated
 */
export declare function assertManifest(manifest: unknown, wellKnownServices: string[]): unknown;
/**
 * Opens a host: the capability registry, the service hub, the event bus and the ledger.
 *
 * @param options - the app id, api version, surfaces and vocabulary the host declares
 * @returns the opened host
 */
export declare function createPluginHost(options: PluginHostOptionsShape): HostSurface;
/**
 * Whether a caught value is a plugin error, recognised by its marker rather than its class.
 *
 * @param value - the caught value to inspect
 * @returns true when the value carries the plugin error marker, false otherwise
 */
export declare function isPluginError(value: unknown): boolean;
/**
 * The published JSON Schema of plugin.json, as a tree ready to stringify.
 *
 * @returns the schema tree
 */
export declare function manifestSchema(): unknown;
/**
 * Mints a plugin error a caller can throw, marked so any bundle recognises it.
 *
 * @param pluginId - the id of the plugin the error belongs to
 * @param detail - what went wrong
 * @param fix - what the plugin author should do about it
 * @returns the error, ready to throw
 */
export declare function pluginError(pluginId: string, detail: string, fix: string): PluginErrorShape;
/**
 * Installs where diagnostics are written, or null to stop writing them.
 *
 * @param sink - the destination for each diagnostic message, or null to stop writing them
 */
export declare function setDiagnosticSink(sink: ((value: string) => void) | null): void;
/**
 * Turns quiet failures loud. Null means off, since a compiled bundle has no environment to read.
 *
 * @param enabled - true to raise strict diagnostics, false or null to leave them quiet
 */
export declare function setStrict(enabled: boolean | null): void;
/**
 * Every problem with a manifest, rather than the first.
 *
 * @remarks
 * An absent vocabulary means unverifiable here, not empty, so the bare-service check
 * is skipped rather than answered wrongly. Its callers include a plugin author's own suite.
 * @param manifest - the parsed plugin.json tree to validate
 * @returns every issue found, or empty when the manifest is valid
 */
export declare function validateManifest(manifest: unknown): ValidationIssueShape[];
/**
 * Every problem with a manifest, checked against the given well-known service ids.
 *
 * @param manifest - the parsed plugin.json tree to validate
 * @param wellKnownServices - the bare service ids this host accepts without a namespace
 * @returns every issue found, or empty when the manifest is valid
 */
export declare function validateManifest(manifest: unknown, wellKnownServices: string[]): ValidationIssueShape[];

/**
 * The object `createPluginHost` returns.
 *
 * @remarks
 * `supports` and `verifyActivation` are `| null` rather than
 * `| undefined`, because a check that ran and found nothing wrong is a stated answer and the
 * adapter genuinely returns null. `service` is `| undefined`, because a missing service
 * is an absent map entry rather than an answer. `markBroken` takes the same
 * {@link PluginErrorShape} for its error argument, since a caller passes back exactly what
 * `pluginError` produced.
 */
export interface HostSurface {
  /**
   * Every implementation of one capability, in activation order.
   *
   * @param id - the capability id to look up
   * @returns the providing plugins' records, or empty when no plugin provides it
   */
  capability(id: string): CapabilityRecordShape[];
  /**
   * Opens one plugin's context, fenced to its own namespace.
   *
   * @param manifest - the parsed plugin.json object of the plugin being activated
   * @param runtime - the host-supplied runtime object for this plugin
   * @returns the context the plugin's activate receives
   */
  contextFor(manifest: unknown, runtime: PluginRuntimeShape): ContextSurface;
  /** What every plugin is told about this host. */
  readonly descriptor: HostDescriptorShape;
  /** The record of what each plugin declared and provided. */
  readonly ledger: LedgerFacadeShape;
  /**
   * Quarantines a plugin, dropping its registrations and recording why.
   *
   * @param pluginId - the id of the plugin to quarantine
   * @param error - the problem that caused the quarantine
   */
  markBroken(pluginId: string, error: PluginErrorShape): void;
  /**
   * Offers a service the host itself implements, for every plugin to reach.
   *
   * @remarks
   * How a plugin gets behaviour belonging to a library it may not link: the host links
   * it once and hands over a typed handle, rather than every plugin carrying a private copy. Call
   * it before starting plugins, so a plugin asking during activate finds it.
   * @param id - the service id to register under
   * @param service - the value every plugin's `context.services.get(id)` then receives
   */
  provideService(id: string, service: unknown): void;
  /**
   * Drops a stopped plugin's registrations without marking it broken.
   *
   * @param pluginId - the id of the plugin to release
   */
  release(pluginId: string): void;
  /**
   * The service registered under an id, or undefined when nothing is.
   *
   * @param id - the service id to look up
   * @returns the registered service, or undefined when none is registered
   */
  service(id: string): unknown | undefined;
  /**
   * Why this host cannot load the manifest, or null when it can.
   *
   * @param manifest - the parsed plugin.json object to check
   * @returns the problem found, or null when the host can load this manifest
   */
  supports(manifest: unknown): PluginErrorShape | null;
  /**
   * Why what the plugin provided disagrees with what it declared, or null when they agree.
   *
   * @param manifest - the parsed plugin.json object of the plugin being verified
   * @returns the disagreement found, or null when the plugin honored its declaration
   */
  verifyActivation(manifest: unknown): PluginErrorShape | null;
}

/** How long a plugin is willing to wait for a service that has not arrived yet. */
export interface WantOptionsShape {
  /** How long to wait before giving up. */
  timeoutMs?: number;
}

/** One app home the host knows about, as the host supplies it. */
export interface HomeDescriptorShape {
  /** The app id, for example `claude` or `opencode`. */
  app: string;
  /** The name a surface shows instead of the id. */
  label: string;
  /** The id of the plugin this app is reached through, absent when it has none. */
  loader?: string;
  /** This home's storage directories. */
  paths: PluginPathsShape;
  /** Whether this home exists on disk. */
  present: boolean;
}

/** One plugin's implementation of a capability, with the plugin it came from. */
export interface CapabilityRecordShape {
  /** What the plugin passed to `provide`. */
  implementation: unknown;
  /** The plugin that provided this implementation. */
  pluginId: string;
}

/** One plugin's row in the ledger a host keeps. */
export interface LedgerRowShape {
  /** Capability ids its manifest declared. */
  capabilitiesDeclared: string[];
  /** Capability ids it actually provided. */
  capabilitiesProvided: string[];
  /** Why it is broken, when it is. */
  error?: LedgerErrorShape;
  /** Permissions its manifest declares. */
  permissions: string[];
  /** The plugin this row describes. */
  pluginId: string;
  /** Service ids it asked for, answered or not. */
  servicesConsumed: string[];
  /** Service ids it registered. */
  servicesProvided: string[];
  /** Where the plugin stands: activating, active, broken or stopped. */
  status: string;
  /** Event topics it subscribed to. */
  topics: string[];
}

/** One thing wrong with a manifest, located, explained, and paired with its remedy. */
export interface ValidationIssueShape {
  /** How to put it right. */
  fix: string;
  /** What is wrong with it. */
  message: string;
  /** The manifest field the issue is about. */
  path: string;
}

/** Publish and subscribe, as reached only through {@link ContextSurface}. */
export interface EventBusShape {
  /**
   * Publishes a payload on a topic.
   *
   * @param topic - the topic to publish on
   * @param payload - the value every current subscriber of the topic receives
   */
  publish(topic: string, payload: unknown): void;
  /**
   * Subscribes to a topic. Call the result to stop listening.
   *
   * @param topic - the topic to listen on
   * @param listener - called with each payload published on the topic
   * @returns a disposer that cancels the subscription when called
   */
  subscribe(topic: string, listener: ((value: unknown) => void)): () => void;
}

/** The context a plugin's activate receives. */
export interface ContextSurface {
  /**
   * The typed key for a capability id.
   *
   * @remarks
   * Untyped return rather than a key shape, mirroring `provide`: the engine works
   * in ids, and the contract is where the phantom type is attached.
   * @param id - the capability id to mint a key for
   * @returns the typed key
   */
  capability(id: string): unknown;
  /** The plugin's resolved configuration, as the runtime supplied it. */
  readonly config: unknown;
  /** Publish and subscribe, attributed to this plugin. */
  readonly events: EventBusShape;
  /**
   * Every app home the host knows about, asked fresh on each call.
   *
   * @returns the known homes, or empty when the host declared none
   */
  homes(): HomeDescriptorShape[];
  /** What the plugin may know about the host. */
  readonly host: HostDescriptorShape;
  /** The plugin's logger, as the runtime supplied it. */
  readonly log: unknown;
  /** The plugin's own manifest, by identity, as it was parsed. */
  readonly manifest: unknown;
  /** The storage directories of the home the plugin runs in. */
  readonly paths: PluginPathsShape;
  /**
   * Registers the plugin's implementation of a capability.
   *
   * @remarks
   * The key is untyped rather than a String because the contract's `provide` hands
   * over a typed key object and a host hands over a bare id, and this one function serves both. The
   * engine still works in ids: the id is read off the key here, at the boundary, which is where
   * every other shape difference is resolved.
   * @param key - the typed capability key, or a bare id, to register against
   * @param implementation - the value the plugin provides for that capability
   */
  provide(key: unknown, implementation: unknown): void;
  /**
   * The typed key for a service id.
   *
   * @remarks
   * Same shape and same reason as `capability(String)`: a key is an id at run
   * time, so the three key kinds differ only in the phantom type the contract attaches.
   * @param id - the service id to mint a key for
   * @returns the typed key
   */
  service(id: string): unknown;
  /** The service registry, fenced to this plugin's namespace. */
  readonly services: ServiceRegistryShape;
  /**
   * The typed key for an event topic id.
   *
   * @param id - the topic id to mint a key for
   * @returns the typed key
   */
  topic(id: string): unknown;
}

/** The ledger a host exposes on {@link HostSurface}. */
export interface LedgerFacadeShape {
  /**
   * One row per plugin the host has seen.
   *
   * @returns the ledger rows, or empty when the host has seen no plugin
   */
  entries(): LedgerRowShape[];
  /**
   * One plugin's row, or undefined when the host has not seen it.
   *
   * @param pluginId - the id of the plugin to look up
   * @returns the plugin's row, or undefined when the host has not seen it
   */
  entry(pluginId: string): LedgerRowShape | undefined;
  /**
   * Records what a manifest declares, before its activation runs.
   *
   * @param manifest - the parsed plugin.json object being recorded
   */
  recordDeclared(manifest: unknown): void;
}

/** The shape `JsErrors.mint` actually attaches to a marked JavaScript `Error`. */
export interface PluginErrorShape {
  /** What went wrong. */
  readonly detail: string;
  /** How to put it right. */
  readonly fix: string;
  /** The detail and the fix, composed for a reader. */
  readonly message: string;
  /** Always `PluginError`, which is how the boundary recognises one. */
  readonly name: string;
  /** The plugin the failure is attributed to. */
  readonly pluginId: string;
}

/** The shape `activationOrder` returns: providers before consumers, and the cycles that could not be ordered. */
export interface ActivationPlanShape {
  /** One entry per dependency cycle, naming its members. */
  cycles: string[][];
  /** Plugin ids in the order they may be activated. */
  order: string[];
}

/** The storage directories of the home a plugin runs in. */
export interface PluginPathsShape {
  /** Where cached downloads live. */
  cache: string;
  /** Where configuration files live. */
  config: string;
  /** The app home directory. */
  home: string;
  /** Where deployed bundles and their manifest sidecars live. */
  plugin: string;
  /** Where plugin checkouts live. */
  repos: string;
}

/** What a host says about itself when it builds its plugin host, the `createPluginHost` argument. */
export interface PluginHostOptionsShape {
  /** The API major version to claim. Defaults to this package's own. */
  api?: number;
  /** The app id plugins see on the host descriptor, for a host that hosts exactly one. */
  app?: string;
  /** The apps this host hosts, for a composite hosting more than one. */
  applications?: string[];
  /** Surface ids this host renders. */
  surfaces?: string[];
  /** Capability ids this host understands. Absent means unverifiable, not empty. */
  vocabulary?: string[];
  /** Bare service ids any plugin may register. Absent means none exist. */
  wellKnownServices?: string[];
}

/** What a host supplies per plugin, the second argument to `contextFor`. */
export interface PluginRuntimeShape {
  /** The plugin's resolved configuration. */
  config: unknown;
  /** The event bus, scoped to this plugin as its source. */
  events: EventBusShape;
  /** Every app home the host knows about. Absent means this host knows of none but its own. */
  homes?: HomeRegistryShape;
  /** The plugin's logger. */
  log: unknown;
  /** The storage directories of the home the plugin runs in. */
  paths: PluginPathsShape;
}

/** What a host tells a plugin about itself. */
export interface HostDescriptorShape {
  /** The API major version this host implements. */
  api: number;
  /** The app id, for example `claude` or `opencode`. */
  app: string;
  /** Surface ids this host renders. */
  surfaces: string[];
}

/** Why a broken plugin's ledger row says it is broken. */
export interface LedgerErrorShape {
  /** What went wrong. */
  detail: string;
  /** How to put it right. */
  fix: string;
}

