import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, it } from "vitest";

const repo = fileURLToPath(new URL("../..", import.meta.url));
const tsc = join(repo, "node_modules", "typescript", "bin", "tsc");

/**
 * @remarks
 * The keys file is the only generated file that is committed both as TypeScript and as its compiled
 * output, because it is the package root: `generated/api.keys.js` is what `import "@intisy/bayonet"`
 * loads and `generated/api.keys.d.ts` is what types it. Committing a stale pair would serve a root
 * that disagrees with the Java, which no other gate here can see.
 */
it("keeps the committed root identical to a fresh compile of the generated keys", () => {
  const scratch = mkdtempSync(join(tmpdir(), "api-keys-"));
  execFileSync(process.execPath, [tsc, "-p", join(repo, "tsconfig.generated.json"), "--outDir", scratch], { cwd: repo, stdio: "inherit" });

  expect(readdirSync(scratch).sort()).toEqual(["api.keys.d.ts", "api.keys.js"]);
  for (const name of ["api.keys.d.ts", "api.keys.js"]) {
    expect(readFileSync(join(scratch, name), "utf8"), name).toBe(readFileSync(join(repo, "generated", name), "utf8"));
  }
});
