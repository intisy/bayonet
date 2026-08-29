---
title: The service registry
---

# Services: what plugins consume from each other

The registry is LIVE. Plugins are installed, enabled, disabled, and updated while a host runs, so
a provider can appear or vanish at any moment and no plugin should own restart logic.

```ts
const HISTORY = ctx.service<ConfigHistory>("config-ledger:history");
const ACCOUNTS = ctx.service<Accounts>("accounts");

const history = ctx.services.get(HISTORY);                        // now, or undefined
const accounts = await ctx.services.want(ACCOUNTS, { timeoutMs: 5000 });
const stop = ctx.services.watch(ACCOUNTS, (service, event) => {   // register AND unregister
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

`ctx.service<T>(id)` mints the typed key, taking the id the manifest already declares and the API
type the consumer expects. Every `Services` method takes that key rather than a string, so `get`,
`want` and `register` are all checked against `T`:

```ts
const HISTORY = ctx.service<ConfigHistoryCapability>("config-ledger:history");
ctx.services.register(HISTORY, myHistory);          // checked against ConfigHistoryCapability
const found = ctx.services.get(HISTORY);            // ConfigHistoryCapability | undefined
```

**Never by declaration merging.** Ambient augmentation of this package's types is forbidden, for
three reasons: Java has no equivalent, so a merged type could not be part of a contract both
languages implement; augmentation is global and unscoped, so two libraries augmenting one key is a
compile error in every consumer that loads both; and ownership should be visible in an import rather
than invisible. The single-surface property comes from the single ENTRY POINT, `ctx`, not from
merged types.

Where the type itself is shared, it belongs in the layer that owns the vocabulary, and the consumer
imports the TYPE from there while still reaching the implementation through the key. Where it is not
shared, the consumer declares the narrow interface it actually uses. What it never does is import
the plugin behind the service.

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
