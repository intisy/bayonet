---
title: Quickstart
---

# Writing a plugin

A plugin is a `plugin.json` and an entry module. Nothing else is required, and
`@intisy/bayonet` is the only import a minimal plugin needs.

## 1. Declare it

```json
{
  "$schema": "./node_modules/@intisy/bayonet/schema/plugin.schema.json",
  "id": "wakatime-sync",
  "api": 1,
  "entry": "dist/index.js",
  "displayName": "WakaTime",
  "capabilities": ["settings"],
  "publish": { "scopedOnly": false },
  "repo": {
    "role": "Coding-activity reporter",
    "category": "plugin",
    "tech": "typescript"
  }
}
```

`id` is the plugin's permanent identity. `api` is the LOWEST API version the plugin needs, not
the one it was built against: a host loads anything whose floor it meets.

## 2. Write the entry

```ts
import type { Plugin, PluginContext } from "@intisy/bayonet";
import { SETTINGS } from "@intisy-ai/basekit";

const plugin: Plugin = {
  async activate(ctx: PluginContext) {
    ctx.provide(SETTINGS, {
      schema: () => ({ fields: [{ key: "apiKey", type: "secret", label: "API key" }] }),
      run: async (actionId) => ({ ok: actionId === "sync", message: "synced" }),
    });
  },
  async deactivate() {},
};

export default plugin;
```

Everything a plugin may touch arrives on `ctx`: its manifest, its config, its logger, its home
paths and the host descriptor. `provide` takes a typed key rather than a string, so the
implementation is checked against the capability it claims to be. The keys are minted by the
library that owns each category, never by this package, which is why `SETTINGS` is imported from
`basekit` rather than from here.

## 3. Check it before a host does

```bash
npx intisy-plugin validate
```

`validate` checks one checkout's manifest, naming the field and the fix for every problem.

The declared-versus-provided check is not here: comparing what a manifest declares against what
`activate` supplied needs a running host, so it lives in `verifyActivation`, and a host reports it
when it loads the plugin.

## 4. Turn the quiet failures loud while developing

```bash
INTISY_PLUGIN_STRICT=1 node your-host.js
```

Unknown ids are ignored in production so a plugin from a later API still loads. Strict mode keeps
the ignoring and prints each one, which is how a typo like `"screns"` finds you in seconds.
