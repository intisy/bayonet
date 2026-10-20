import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, it } from "vitest";
import { run } from "./main.js";
import { readCheckout } from "./read.js";

function tempDir(): string {
  return mkdtempSync(join(tmpdir(), "intisy-api-cli-"));
}

function write(dir: string, name: string, value: unknown): void {
  writeFileSync(join(dir, name), JSON.stringify(value), "utf8");
}

function collect(): { io: { out(line: string): void; err(line: string): void }; out: string[]; err: string[] } {
  const out: string[] = [];
  const err: string[] = [];
  return { io: { out: (line) => out.push(line), err: (line) => err.push(line) }, out, err };
}

it("reads a checkout's manifest", () => {
  const dir = tempDir();
  write(dir, "plugin.json", { id: "wakatime-sync", api: 1 });
  expect(readCheckout(dir).value).toEqual({ id: "wakatime-sync", api: 1 });
});

it("explains a missing manifest instead of throwing a stack trace at the user", () => {
  const dir = tempDir();
  expect(() => readCheckout(dir)).toThrow(/no manifest at/);
  try {
    readCheckout(dir);
  } catch (error) {
    expect((error as { fix: string }).fix).toBe("add a plugin.json at the repo root, or point --dir at the repo that has one");
  }
});

it("explains unparsable JSON", () => {
  const dir = tempDir();
  writeFileSync(join(dir, "plugin.json"), "{ id: 'nope' }", "utf8");
  expect(() => readCheckout(dir)).toThrow(/is not valid JSON/);
});

it("validates a good manifest and exits 0", () => {
  const dir = tempDir();
  write(dir, "plugin.json", { id: "wakatime-sync", api: 1 });
  const { io, out } = collect();
  expect(run(["validate", "--dir", dir], io)).toBe(0);
  expect(out[0]).toBe("ok  wakatime-sync (api 1)");
});

it("reports each problem with its fix and exits 1", () => {
  const dir = tempDir();
  write(dir, "plugin.json", { id: "wakatime-sync", api: 1, capabilities: ["settings"] });
  const { io, err } = collect();
  expect(run(["validate", "--dir", dir], io)).toBe(1);
  expect(err).toEqual([
    "wakatime-sync: 1 problem",
    '  error  entry: required field "entry" is missing',
    '    fix: capabilities are declared, so add "entry" naming the module that provides them, for example "dist/index.js"',
  ]);
});

it("reports an unreadable manifest as a problem rather than a stack trace", () => {
  const dir = tempDir();
  writeFileSync(join(dir, "plugin.json"), "{ nope", "utf8");
  const { io, err } = collect();
  expect(run(["validate", "--dir", dir], io)).toBe(1);
  expect(err[0]).toContain("is not valid JSON");
});

it("prints usage and exits 2 for an unknown command", () => {
  const { io, err } = collect();
  expect(run(["frobnicate"], io)).toBe(2);
  expect(err[0]).toBe("unknown command: frobnicate");
});

it("prints usage and exits 0 when asked for help", () => {
  const { io, out } = collect();
  expect(run(["--help"], io)).toBe(0);
  expect(out[0]).toBe("usage:");
});

it("writes an ignored-field diagnostic to the problem channel and still exits 0", () => {
  const dir = tempDir();
  write(dir, "plugin.json", { id: "wakatime-sync", api: 1, futureField: 1 });
  const { io, out, err } = collect();
  expect(run(["validate", "--dir", dir], io)).toBe(0);
  expect(err).toEqual(['ignored unknown field "futureField" from wakatime-sync']);
  expect(out[0]).toBe("ok  wakatime-sync (api 1)");
});

it("refuses a flag given no value rather than checking somewhere the user never named", () => {
  const { io, err } = collect();
  expect(run(["validate", "--dir"], io)).toBe(2);
  expect(err[0]).toBe("--dir needs a value");
});
