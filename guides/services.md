---
title: The service registry
---

# Services: what plugins consume from each other

The registry is LIVE. Plugins are installed, enabled, disabled, and updated while a host runs, so
a provider can appear or vanish at any moment and no plugin should own restart logic.

```ts
const history = ctx.services.get("config-ledger:history");          // now, or undefined
const accounts = await ctx.services.want("accounts", { timeoutMs: 5000 });
const stop = ctx.services.watch("accounts", (service, event) => {   // register AND unregister
  if (event === "unregister") forgetAccounts();
});
```

Use `get` for optional use, `want` for an awaited arrival, and `watch` for churn.

## Ids and namespaces

A service id is namespaced by the plugin providing it: `config-ledger:history`. The registry
REJECTS a registration whose prefix is not the registering plugin's manifest id, which makes
squatting and collisions structurally impossible rather than socially discouraged.

Well-known ids are the exception: `accounts`, `routing` and `activity` are bare names declared by
this package and implementable by anyone. Asking for a well-known id is asking for a CONTRACT and
leaves the implementation swappable. Asking for a namespaced id is asking for one specific
implementation, which is legitimate when that is genuinely what you want.

## Types

Extend `ServiceMap` by declaration merging, and both sides get types with no import cycle:

```ts
declare module "@intisy/bayonet" {
  interface ServiceMap {
    "config-ledger:history": ConfigHistoryCapability;
  }
}
```

## Ordering

Activation order is the topological sort of `services.consumes` over `services.provides`, so a
provider activates before its consumers. A consumed service nobody provides is NOT an error: the
consumer activates anyway and its `want` resolves later or times out. A cycle IS an error, and it
is reported by name rather than hanging.

## Events

`ctx.events` is the same relationship in pub/sub form. Ecosystem topics are bare names owned by
this package (`config.changed`, `plugin.installed`); a plugin's own topics are namespaced
`<plugin-id>:<topic>`, exactly like services. Plugins never import a host's bus directly, which
is what lets the host record every subscription.
