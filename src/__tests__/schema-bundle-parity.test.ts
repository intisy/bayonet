import { expect, it } from "vitest";
import { manifestSchema } from "../../generated/engine.js";
import { readModelSchema } from "./model-schema.js";

// `weivel/model`'s `plugin.schema.json` is the SOURCE of the manifest vocabulary, and the bundle is one
// implementation of it: the file used to be emitted from this function, which made the artefact
// every language validates against an output of one of them. The Java side of the same check is
// `engine`'s PublishedSchemaTest; this one catches a TeaVM compile that reads correctly and emits a
// different schema.
const PUBLISHED = readModelSchema();

it("keeps the bundle's schema identical to the published source file", () => {
  expect(manifestSchema()).toEqual(PUBLISHED);
});
