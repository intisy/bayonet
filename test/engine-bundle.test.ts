import { expect, it } from "vitest";
import {
  activationOrder,
  assertManifest,
  createPluginHost,
  isPluginError,
  manifestSchema,
  pluginError,
  setDiagnosticSink,
  validateManifest,
} from "../generated/engine.js";

it("mints an error a separately bundled consumer recognises by its name marker", () => {
  const error = pluginError("config-ledger", "went wrong", "put it right");
  expect(error.name).toBe("PluginError");
  expect(error.pluginId).toBe("config-ledger");
  expect(error.detail).toBe("went wrong");
  expect(error.fix).toBe("put it right");
  expect(error.message).toBe("[config-ledger] went wrong\n  fix: put it right");
  expect(isPluginError(error)).toBe(true);
  expect(isPluginError(new Error("plain"))).toBe(false);
});

it("orders plugins so a provider activates before its consumer", () => {
  const plan = activationOrder([
    { id: "reader", api: 1, services: { consumes: ["store:things"] } },
    { id: "store", api: 1, services: { provides: ["store:things"] } },
  ]);
  expect(plan.order).toEqual(["store", "reader"]);
  expect(plan.cycles).toEqual([]);
});

it("reports a cycle rather than an order", () => {
  const plan = activationOrder([
    { id: "one", api: 1, services: { provides: ["one:a"], consumes: ["two:b"] } },
    { id: "two", api: 1, services: { provides: ["two:b"], consumes: ["one:a"] } },
  ]);
  expect(plan.cycles.length).toBe(1);
  expect([...plan.cycles[0]].sort()).toEqual(["one", "two"]);
});

it("returns a valid manifest and throws a marked error for an invalid one", () => {
  const manifest = { id: "config-ledger", api: 1, entry: "dist/index.js" };
  expect(assertManifest(manifest)).toEqual(manifest);
  try {
    assertManifest({ api: 1 });
    throw new Error("assertManifest accepted a manifest with no id");
  } catch (error) {
    expect(isPluginError(error)).toBe(true);
    expect((error as { detail: string }).detail).toContain("id");
  }
});

it("validates a bare well-known provide only when the caller names the vocabulary", () => {
  const manifest = { id: "core-auth", api: 1, entry: "dist/index.js", services: { provides: ["accounts"] } };
  expect(assertManifest(manifest, ["accounts"])).toEqual(manifest);
  try {
    assertManifest(manifest);
    throw new Error("assertManifest accepted a bare well-known provide with no vocabulary named");
  } catch (error) {
    expect(isPluginError(error)).toBe(true);
    expect((error as { detail: string }).detail).toContain("accounts");
  }
});

function runtime() {
  const listeners = new Map<string, (payload: unknown) => void>();
  return {
    config: { all: () => ({}), get: () => undefined, set: async () => {} },
    log: { info: () => {}, warn: () => {}, error: () => {}, debug: () => {} },
    paths: { home: "/home", repos: "/home/repos", plugin: "/home/plugin", cache: "/home/cache", config: "/home/config" },
    events: {
      publish: (topic: string, payload: unknown) => listeners.get(topic)?.(payload),
      subscribe: (topic: string, listener: (payload: unknown) => void) => {
        listeners.set(topic, listener);
        return () => listeners.delete(topic);
      },
    },
  };
}

const SCREENS = { id: "config-ledger", api: 1, entry: "dist/index.js", capabilities: ["screens"], permissions: ["config:write"] };

it("hands a plugin a context carrying its own manifest object and the host descriptor", () => {
  const host = createPluginHost({ app: "claude", api: 1, surfaces: ["tui"] });
  const context = host.contextFor(SCREENS, runtime());
  expect(context.manifest).toBe(SCREENS);
  expect(context.host).toEqual({ app: "claude", api: 1, surfaces: ["tui"] });
  expect(context.paths.home).toBe("/home");
  expect(() => context.services.register("plugin-updater:catalog", {})).toThrow(/belongs to another plugin/);
});

it("reads the id off a typed key, so the contract's provide reaches the engine", () => {
  const host = createPluginHost({ app: "claude", api: 1 });
  const screens = { screens: () => [] };
  host.contextFor(SCREENS, runtime()).provide({ id: "screens" }, screens);
  expect(host.capability("screens")).toEqual([{ pluginId: "config-ledger", implementation: screens }]);
  expect(host.verifyActivation(SCREENS)).toBeNull();
});

it("collects a provided capability and reports the ledger status in lower case", () => {
  const host = createPluginHost({ app: "claude", api: 1 });
  const screens = { screens: () => [] };
  host.contextFor(SCREENS, runtime()).provide("screens", screens);
  expect(host.capability("screens")).toEqual([{ pluginId: "config-ledger", implementation: screens }]);
  expect(host.verifyActivation(SCREENS)).toBeNull();
  expect(host.ledger.entry("config-ledger")?.status).toBe("active");
  expect(host.ledger.entry("config-ledger")?.permissions).toEqual(["config:write"]);
});

it("refuses a plugin whose api floor is above the host, as a marked error", () => {
  const host = createPluginHost({ app: "claude", api: 2 });
  expect(host.supports({ id: "old", api: 2 })).toBeNull();
  const error = host.supports({ id: "new", api: 3 });
  expect(isPluginError(error)).toBe(true);
  expect(error?.detail).toBe("needs api 3, this host has api 2");
});

it("stops a quarantined plugin's subscriptions and drops its capabilities", () => {
  const host = createPluginHost({ app: "claude", api: 1 });
  const shared = runtime();
  const seen: unknown[] = [];
  const context = host.contextFor(SCREENS, shared);
  context.provide("screens", {});
  context.events.subscribe("config.changed", (payload: unknown) => seen.push(payload));
  shared.events.publish("config.changed", { name: "before" });
  host.markBroken("config-ledger", pluginError("config-ledger", "boom", "fix it"));
  shared.events.publish("config.changed", { name: "after" });
  expect(seen).toEqual([{ name: "before" }]);
  expect(host.capability("screens")).toEqual([]);
  expect(host.ledger.entry("config-ledger")?.status).toBe("broken");
  expect(host.ledger.entry("config-ledger")?.error).toEqual({ detail: "boom", fix: "fix it" });
});

it("settles a want as a real promise, and rejects a quarantined plugin's want", async () => {
  const host = createPluginHost({ app: "claude", api: 1, wellKnownServices: ["accounts"] });
  const context = host.contextFor(SCREENS, runtime());
  const arriving = context.services.want("accounts");
  host.contextFor({ id: "core-auth", api: 1, capabilities: [] }, runtime()).services.register("accounts", { list: () => [] });
  expect(await arriving).toEqual({ list: expect.any(Function) });

  const quarantined = createPluginHost({ app: "claude", api: 1, wellKnownServices: ["accounts"] });
  const stopped = quarantined.contextFor(SCREENS, runtime());
  quarantined.markBroken("config-ledger", pluginError("config-ledger", "took too long", "return sooner"));
  await expect(stopped.services.want("accounts")).rejects.toMatchObject({
    detail: 'stopped while waiting for service "accounts"',
  });
});

it("fires a want deadline, which is what proves the scheduler is really wired", async () => {
  const host = createPluginHost({ app: "claude", api: 1, wellKnownServices: ["accounts"] });
  const context = host.contextFor(SCREENS, runtime());
  await expect(context.services.want("accounts", { timeoutMs: 20 })).rejects.toMatchObject({
    detail: 'waited 20ms for service "accounts" and nothing registered it',
  });
});

it("does not raise an unhandledRejection when a fenced plugin's dropped want rejects", async () => {
  const seen: unknown[] = [];
  const onUnhandledRejection = (reason: unknown) => seen.push(reason);
  process.on("unhandledRejection", onUnhandledRejection);
  try {
    const host = createPluginHost({ app: "claude", api: 1, wellKnownServices: ["accounts"] });
    const context = host.contextFor(SCREENS, runtime());
    host.markBroken("config-ledger", pluginError("config-ledger", "boom", "fix it"));
    context.services.want("accounts");
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(seen).toEqual([]);
  } finally {
    process.removeListener("unhandledRejection", onUnhandledRejection);
  }
});

it("reports an unknown capability id only when the host declared a vocabulary", () => {
  const seen: string[] = [];
  setDiagnosticSink((message) => seen.push(message));
  const silent = createPluginHost({ app: "claude", api: 1 });
  silent.contextFor({ id: "a", api: 1, capabilities: ["screns"] }, runtime()).provide("screns", {});
  expect(seen).toEqual([]);
  const declaring = createPluginHost({ app: "claude", api: 1, vocabulary: ["screens"] });
  declaring.contextFor({ id: "b", api: 1, capabilities: ["screns"] }, runtime()).provide("screns", {});
  expect(seen).toEqual(['ignored unknown capability "screns" from b']);
  setDiagnosticSink(null);
});

it("returns callable disposers from subscribe, watch and register, which is what unsubscribing actually needs", () => {
  const host = createPluginHost({ app: "claude", api: 1, wellKnownServices: ["accounts"] });
  const shared = runtime();
  const context = host.contextFor(SCREENS, shared);

  const published: unknown[] = [];
  const stopSubscribe = context.events.subscribe("config.changed", (payload) => published.push(payload));
  expect(typeof stopSubscribe).toBe("function");
  shared.events.publish("config.changed", { name: "first" });
  stopSubscribe();
  shared.events.publish("config.changed", { name: "second" });
  expect(published).toHaveLength(1);

  const watched: unknown[] = [];
  const stopWatch = context.services.watch("accounts", (service, event) => watched.push({ service, event }));
  expect(typeof stopWatch).toBe("function");
  const provider = host.contextFor({ id: "core-auth", api: 1, capabilities: [] }, runtime());
  const stopProvide = provider.services.register("accounts", { list: () => [] });
  stopWatch();
  stopProvide();
  expect(watched).toHaveLength(1);

  const stopRegister = context.services.register("config-ledger:custom", {});
  expect(typeof stopRegister).toBe("function");
  stopRegister();
  expect(host.service("config-ledger:custom")).toBeUndefined();
});

it("reports service watch events as register then unregister, with the service itself undefined on unregister", () => {
  const host = createPluginHost({ app: "claude", api: 1, wellKnownServices: ["accounts"] });
  const watcher = host.contextFor(SCREENS, runtime());
  const seen: Array<{ service: unknown; event: string }> = [];
  watcher.services.watch("accounts", (service, event) => seen.push({ service, event }));

  const provider = host.contextFor({ id: "core-auth", api: 1, capabilities: [] }, runtime());
  const stop = provider.services.register("accounts", { list: () => [] });
  stop();

  expect(seen).toEqual([
    { service: { list: expect.any(Function) }, event: "register" },
    { service: undefined, event: "unregister" },
  ]);
});

it("answers host.service with undefined precisely, never null, and the service by identity once one arrives", () => {
  const host = createPluginHost({ app: "claude", api: 1, wellKnownServices: ["accounts"] });
  expect(host.service("accounts")).toBeUndefined();
  const accounts = { list: () => [] };
  host.contextFor({ id: "core-auth", api: 1, capabilities: [] }, runtime()).services.register("accounts", accounts);
  expect(host.service("accounts")).toBe(accounts);
});

it("answers context.services.get with undefined precisely, and the service by identity once one arrives", () => {
  const host = createPluginHost({ app: "claude", api: 1, wellKnownServices: ["accounts"] });
  const context = host.contextFor(SCREENS, runtime());
  expect(context.services.get("accounts")).toBeUndefined();
  const accounts = { list: () => [] };
  host.contextFor({ id: "core-auth", api: 1, capabilities: [] }, runtime()).services.register("accounts", accounts);
  expect(context.services.get("accounts")).toBe(accounts);
});

it("lists every service id currently registered", () => {
  const host = createPluginHost({ app: "claude", api: 1, wellKnownServices: ["accounts"] });
  const context = host.contextFor(SCREENS, runtime());
  expect(context.services.ids()).toEqual([]);
  host.contextFor({ id: "core-auth", api: 1, capabilities: [] }, runtime()).services.register("accounts", { list: () => [] });
  expect(context.services.ids()).toEqual(["accounts"]);
});

it("lists every ledger row, and a non-broken row carries no error property at all", () => {
  const host = createPluginHost({ app: "claude", api: 1 });
  host.contextFor(SCREENS, runtime());
  expect(host.ledger.entries()).toEqual([expect.objectContaining({ pluginId: "config-ledger", status: "activating" })]);
  expect(host.ledger.entry("config-ledger")).not.toHaveProperty("error");
});

it("opens a fresh ledger entry directly through ledger.recordDeclared, without going through contextFor", () => {
  const host = createPluginHost({ app: "claude", api: 1 });
  host.ledger.recordDeclared({ id: "config-ledger", api: 1, capabilities: ["screens"], permissions: ["config:write"] });
  expect(host.ledger.entry("config-ledger")).toEqual({
    pluginId: "config-ledger",
    status: "activating",
    capabilitiesDeclared: ["screens"],
    capabilitiesProvided: [],
    servicesProvided: [],
    servicesConsumed: [],
    topics: [],
    permissions: ["config:write"],
  });
});

it("releases a plugin's capabilities and marks it stopped", () => {
  const host = createPluginHost({ app: "claude", api: 1 });
  const screens = { screens: () => [] };
  host.contextFor(SCREENS, runtime()).provide("screens", screens);
  host.release("config-ledger");
  expect(host.capability("screens")).toEqual([]);
  expect(host.ledger.entry("config-ledger")?.status).toBe("stopped");
});

it("assembles the host object with exactly these keys, pinning it against HostSurface drift", () => {
  const host = createPluginHost({ app: "claude", api: 1 });
  expect(Object.keys(host).sort()).toEqual([
    "capability",
    "contextFor",
    "descriptor",
    "ledger",
    "markBroken",
    "provideService",
    "release",
    "service",
    "supports",
    "verifyActivation",
  ]);
  expect(Object.keys(host.ledger).sort()).toEqual(["entries", "entry", "recordDeclared"]);
});

it("assembles the context object with exactly these keys, pinning it against ContextSurface drift", () => {
  const host = createPluginHost({ app: "claude", api: 1 });
  const context = host.contextFor(SCREENS, runtime());
  expect(Object.keys(context).sort()).toEqual([
    "capability",
    "config",
    "events",
    "homes",
    "host",
    "log",
    "manifest",
    "paths",
    "provide",
    "service",
    "services",
    "topic",
  ]);
  expect(Object.keys(context.services).sort()).toEqual(["get", "ids", "register", "want", "watch"]);
  expect(Object.keys(context.events).sort()).toEqual(["publish", "subscribe"]);
});

// How a plugin reaches behaviour belonging to a library it may not link: the host links it once and
// offers a handle. Owned by no plugin, so a quarantine must not take it away.
it("offers a host's own service to a plugin, and keeps it through a quarantine", () => {
  const host = createPluginHost({ app: "claude", api: 1 });
  const support = { build: () => "built" };
  host.provideService("provider-support", support);

  const context = host.contextFor(SCREENS, runtime());
  expect(context.services.get("provider-support")).toBe(support);

  host.markBroken("screens", pluginError("screens", "boom", "fix it"));
  expect(host.service("provider-support")).toBe(support);
});

it("lets a host replace its own service, since wiring up twice is a restart rather than a conflict", () => {
  const host = createPluginHost({ app: "claude", api: 1 });
  host.provideService("provider-support", { generation: 1 });
  host.provideService("provider-support", { generation: 2 });
  expect(host.service("provider-support")).toEqual({ generation: 2 });
});

it("mints a service and a topic key from an id alone, the same shape as a capability key", () => {
  const host = createPluginHost({ app: "claude", api: 1 });
  const context = host.contextFor(SCREENS, runtime());
  expect(context.service("plugin-management")).toEqual({ id: "plugin-management" });
  expect(context.topic("config.changed")).toEqual({ id: "config.changed" });
});

it("mints a capability key from an id alone, and provide accepts the key it minted", () => {
  const host = createPluginHost({ app: "claude", api: 1 });
  const context = host.contextFor(SCREENS, runtime());
  expect(context.capability("screens")).toEqual({ id: "screens" });

  const screens = { screens: () => [] };
  context.provide(context.capability("screens"), screens);
  expect(host.capability("screens")).toEqual([{ pluginId: "config-ledger", implementation: screens }]);
});

it("answers homes from the host's registry on every call, so a home appearing later is seen", () => {
  const registered = [{ app: "claude", label: "Claude Code", present: true, paths: { home: "/claude", repos: "/claude/repos", plugin: "/claude/plugin", cache: "/claude/cache", config: "/claude/config" } }];
  const host = createPluginHost({ app: "claude", api: 1 });
  const context = host.contextFor(SCREENS, { ...runtime(), homes: { all: () => registered } });

  expect(context.homes().map((home) => home.app)).toEqual(["claude"]);
  registered.push({ app: "opencode", label: "OpenCode", present: false, paths: { home: "/oc", repos: "/oc/repos", plugin: "/oc/plugin", cache: "/oc/cache", config: "/oc/config" } });
  expect(context.homes().map((home) => home.app)).toEqual(["claude", "opencode"]);
});

it("answers homes with an empty list for a host that supplies no registry", () => {
  const host = createPluginHost({ app: "claude", api: 1 });
  expect(host.contextFor(SCREENS, runtime()).homes()).toEqual([]);
});

it("reports every issue in a manifest rather than throwing on the first", () => {
  expect(validateManifest({ id: "demo", api: 2 })).toEqual([]);
  const issues = validateManifest({ api: 2 });
  expect(issues.length).toBeGreaterThan(0);
  expect(issues.map((issue) => issue.path)).toContain("id");
  expect(issues[0].fix.length).toBeGreaterThan(0);
});

it("leaves a bare service id alone when no vocabulary is named and refuses it when one is", () => {
  const manifest = { id: "demo", api: 2, services: { provides: ["accounts"] } };
  expect(validateManifest(manifest)).toEqual([]);
  const issues = validateManifest(manifest, ["routing"]);
  expect(issues.length).toBe(1);
  expect(issues[0].path).toBe("services.provides[0]");
});

it("serves the published manifest schema the generator writes", () => {
  const schema = manifestSchema() as {
    $schema: string;
    $id: string;
    required: string[];
    properties: Record<string, unknown>;
  };
  expect(schema.$id).toBe("https://intisy.github.io/bayonet/schema/plugin.schema.json");
  expect(schema.$schema).toBe("http://json-schema.org/draft-07/schema#");
  expect(schema.required).toEqual(["id", "api"]);
  expect(Object.keys(schema.properties)).toContain("capabilities");
});

// The contract DECLARES services and events on the context; these assert the engine actually
// builds them in that shape. A type-level check cannot see this drift, and the first attempt at
// the declaration got both listener shapes wrong (an object where the engine hands a function).
it("builds a services handle with everything the contract declares on it", async () => {
  const host = createPluginHost({ app: "claude", api: 1 });
  const context = host.contextFor(SCREENS, runtime());
  const store = { open: () => {} };

  expect(context.services.get("config-ledger:store")).toBeUndefined();
  const stop = context.services.register("config-ledger:store", store);
  expect(context.services.get("config-ledger:store")).toBe(store);
  expect(context.services.ids()).toContain("config-ledger:store");
  await expect(context.services.want("config-ledger:store")).resolves.toBe(store);

  const seen: string[] = [];
  context.services.watch("config-ledger:store", (_service: unknown, event: string) => seen.push(event));
  stop();
  expect(seen).toEqual(["unregister"]);
  expect(context.services.get("config-ledger:store")).toBeUndefined();
});

it("builds an events handle whose subscribe hands back a plain unsubscribe function", () => {
  const host = createPluginHost({ app: "claude", api: 1 });
  const context = host.contextFor(SCREENS, runtime());

  const heard: unknown[] = [];
  const stop = context.events.subscribe("plugin.installed", (payload: unknown) => heard.push(payload));
  expect(typeof stop).toBe("function");
  context.events.publish("plugin.installed", { id: "widget" });
  expect(heard).toEqual([{ id: "widget" }]);

  stop();
  context.events.publish("plugin.installed", { id: "second" });
  expect(heard).toHaveLength(1);
});
