import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { expect, it } from "vitest";

// The manifest is described TWICE: once as the generated `PluginManifest` an author writes against,
// and once as the published schema every implementation validates against. Adding a field to one and
// not the other type-checks and validates green while a manifest using it is rejected at run time,
// which is exactly what happened when `commands` and `config` were added to the contract alone.
const DTS = readFileSync(fileURLToPath(new URL("../../generated/api.d.ts", import.meta.url)), "utf8");

function declaredFields(iface: string): string[] {
  const body = new RegExp(`export interface ${iface} \\{([\\s\\S]*?)\\n\\}`).exec(DTS)?.[1];
  if (!body) throw new Error(`${iface} is not in the generated contract`);
  return [...body.matchAll(/^\s{2}(\$?\w+)\??:/gm)].map((match) => match[1]).sort();
}

interface SchemaNode {
  type?: string;
  properties?: Record<string, SchemaNode>;
  items?: SchemaNode;
  additionalProperties?: SchemaNode;
}

function shapeOf(node: SchemaNode | undefined): SchemaNode | undefined {
  return node?.type === "array" ? node.items : node;
}

function schemaFields(node: SchemaNode | undefined): string[] {
  return Object.keys(shapeOf(node)?.properties ?? {}).sort();
}

// Read from the published source file rather than from the bundle, so this gate outlives the TeaVM
// path and holds the contract against the vocabulary itself rather than against one implementation's
// copy of it.
const ROOT = JSON.parse(
  readFileSync(fileURLToPath(new URL("../../schema/plugin.schema.json", import.meta.url)), "utf8"),
) as SchemaNode;

function nodeAt(path: string): SchemaNode | undefined {
  let node: SchemaNode | undefined = ROOT;
  for (const segment of path.split(".")) node = shapeOf(node)?.properties?.[segment];
  return node;
}

// Every nested object in the manifest, by its path, and the interface that describes it. The pairing
// is spelled out rather than derived: the schema names a field, the contract names a type, and
// nothing in either connects the two, which is the whole reason this test exists.
const NESTED: Array<{ field: string; iface: string }> = [
  { field: "services", iface: "ManifestServices" },
  { field: "commands", iface: "ManifestCommand" },
  { field: "config", iface: "ManifestConfig" },
  { field: "data", iface: "ManifestData" },
  { field: "lifecycle", iface: "ManifestLifecycle" },
  { field: "publish", iface: "ManifestPublish" },
  { field: "repo", iface: "RepoMeta" },
  { field: "marketplace", iface: "ManifestMarketplace" },
  { field: "marketplace.categories", iface: "MarketplaceCategory" },
  { field: "marketplace.categories.match", iface: "MarketplaceMatch" },
  { field: "app", iface: "AppDescriptor" },
  { field: "app.home", iface: "AppHome" },
  { field: "app.detect", iface: "AppDetect" },
  { field: "app.loader", iface: "AppLoader" },
  { field: "app.paths", iface: "AppPathNames" },
  { field: "app.usage", iface: "AppUsage" },
  { field: "app.npmPlugins", iface: "AppNpmPlugins" },
  { field: "app.startupHook", iface: "AppStartupHook" },
  { field: "app.discovery", iface: "AppDiscovery" },
  { field: "app.projects", iface: "AppProjects" },
  { field: "app.modelCatalog", iface: "AppModelCatalog" },
];

it("describes the same manifest in the contract and in the validator", () => {
  expect(declaredFields("PluginManifest")).toEqual(schemaFields(ROOT));
});

// Top-level parity alone let `publish` gain three fields and `repo` two in the contract while the
// published schema still described one and four, which type-checked, validated and shipped.
it.each(NESTED)("describes the same $field block in the contract and in the validator", ({ field, iface }) => {
  expect(declaredFields(iface)).toEqual(schemaFields(nodeAt(field)));
});

// A nested object added to the schema with no entry above would otherwise be checked by nobody, so
// the list itself is held to the schema rather than trusted. Walked to any depth: `app` nests nine
// objects of its own, so a one-level scan would have covered the block and none of its insides.
function objectPaths(node: SchemaNode | undefined, prefix = ""): string[] {
  const shape = shapeOf(node);
  const out: string[] = [];
  for (const [field, child] of Object.entries(shape?.properties ?? {})) {
    if (schemaFields(child).length === 0) continue;
    const path = prefix ? `${prefix}.${field}` : field;
    out.push(path, ...objectPaths(child, path));
  }
  return out;
}

it("covers every nested object the schema declares, at every depth", () => {
  expect(NESTED.map((entry) => entry.field).sort()).toEqual(objectPaths(ROOT).sort());
});

// An `icons`-shaped map is described by additionalProperties rather than by properties, so the walk
// above cannot see it and no interface pairs with it. Held here so it cannot silently become an
// object with fields, which would then be a block nothing checks.
it("keeps the keyed-map fields free-form on both sides", () => {
  expect(declaredFields("PluginManifest")).toContain("icons");
  expect(ROOT.properties?.icons?.additionalProperties?.type).toBe("string");
  expect(ROOT.properties?.icons?.properties).toBeUndefined();
});
