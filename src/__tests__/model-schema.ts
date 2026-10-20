import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPOSITORY = fileURLToPath(new URL("../../", import.meta.url));

/**
 * Where `weivel/model`'s schema is checked out: named by `MODEL_SCHEMA`, else inside this repository
 * where CI places the sibling, else beside it where a developer keeps it.
 *
 * @implNote A path that is NAMED is held to it rather than falling back, so a CI pointing at the
 * wrong place fails instead of quietly reading a stale local copy. Engine's PublishedSchemaTest
 * resolves the same three places in the same order.
 */
export function modelSchemaPath(): string {
  const named = process.env.MODEL_SCHEMA;
  const candidates = named
    ? [resolve(REPOSITORY, named)]
    : [resolve(REPOSITORY, "model/plugin.schema.json"), resolve(REPOSITORY, "../model/plugin.schema.json")];
  const found = candidates.find((candidate) => existsSync(candidate));
  if (!found) {
    throw new Error(
      `plugin.schema.json is read from weivel/model, checked out beside this repository; not found at ${candidates.join(" or ")}`,
    );
  }
  return found;
}

/** @returns the manifest vocabulary as `weivel/model` publishes it */
export function readModelSchema(): unknown {
  return JSON.parse(readFileSync(modelSchemaPath(), "utf8"));
}
