import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, it } from "vitest";

const repo = fileURLToPath(new URL("../..", import.meta.url));
const tsc = join(repo, "node_modules", "typescript", "bin", "tsc");
const flags = ["--strict", "--noEmit", "--module", "esnext", "--moduleResolution", "bundler", "--target", "es2022", "--lib", "es2022"];

function check(fixture: string): { ok: boolean; output: string } {
  try {
    execFileSync(process.execPath, [tsc, ...flags, join(repo, "test", "dts-conformance", fixture)], { encoding: "utf8" });
    return { ok: true, output: "" };
  } catch (failure) {
    return { ok: false, output: String((failure as { stdout?: string }).stdout ?? failure) };
  }
}

it("accepts a plugin written against the generated contract", () => {
  const result = check("positive.ts");
  expect(result.output).toBe("");
  expect(result.ok).toBe(true);
});

it("rejects an implementation that does not match its capability key", () => {
  const result = check("negative-wrong-impl.ts");
  expect(result.ok).toBe(false);
  expect(result.output).toContain("TS2353");
});

it("rejects assigning one capability key to a differently parameterised one", () => {
  const result = check("negative-phantom.ts");
  expect(result.ok).toBe(false);
  expect(result.output).toContain("TS2322");
});

it("rejects publishing a payload the topic does not carry", () => {
  const result = check("negative-wrong-payload.ts");
  expect(result.ok).toBe(false);
  expect(result.output).toContain("TS2353");
});

it("rejects a host that names no application, whose descriptor app would be null", () => {
  const result = check("negative-host-without-app.ts");
  expect(result.ok).toBe(false);
  expect(result.output).toContain("TS2345");
});

it("rejects registering a service that does not match its id", () => {
  const result = check("negative-wrong-service.ts");
  expect(result.ok).toBe(false);
  expect(result.output).toContain("TS2353");
});
