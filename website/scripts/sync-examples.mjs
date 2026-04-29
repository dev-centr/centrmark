import { cpSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const websiteDir = resolve(scriptDir, "..");
const repoRoot = resolve(websiteDir, "..");
const sourceDir = join(repoRoot, "examples");
const targetDir = join(websiteDir, "public", "examples");

if (!existsSync(sourceDir)) {
  throw new Error(`Examples source directory not found: ${sourceDir}`);
}

mkdirSync(targetDir, { recursive: true });

const cmkFiles = readdirSync(sourceDir, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith(".cmk"))
  .map((entry) => entry.name);

for (const fileName of cmkFiles) {
  const sourcePath = join(sourceDir, fileName);
  // Website routes use kebab-case slugs, while examples may include underscores.
  const targetFileName = basename(fileName).replace(/_/g, "-");
  const targetPath = join(targetDir, targetFileName);
  cpSync(sourcePath, targetPath);
  console.log(`synced ${sourcePath} -> ${targetPath}`);
}
