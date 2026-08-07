import { access, cp, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const outputRoot = path.join(projectRoot, "dist", "client");
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const basePath = rawBasePath.replace(/\/+$/, "");

if (
  basePath &&
  (!basePath.startsWith("/") ||
    basePath.includes("..") ||
    !/^\/[A-Za-z0-9._/-]+$/.test(basePath))
) {
  throw new Error(`Unsafe NEXT_PUBLIC_BASE_PATH: ${rawBasePath}`);
}

if (basePath) {
  const nestedAssetRoot = path.join(outputRoot, ...basePath.slice(1).split("/"));
  await access(nestedAssetRoot);

  for (const entry of await readdir(nestedAssetRoot, { withFileTypes: true })) {
    await cp(path.join(nestedAssetRoot, entry.name), path.join(outputRoot, entry.name), {
      force: true,
      recursive: entry.isDirectory(),
    });
  }
}

async function listHtmlFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listHtmlFiles(entryPath)));
    } else if (entry.name.endsWith(".html")) {
      files.push(entryPath);
    }
  }
  return files;
}

const referencedAssets = new Set();
for (const htmlFile of await listHtmlFiles(outputRoot)) {
  const html = await readFile(htmlFile, "utf8");
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const assetUrl = match[1].split(/[?#]/, 1)[0];
    if (assetUrl.startsWith(`${basePath}/_next/`)) {
      referencedAssets.add(assetUrl);
    }
  }
}

if (![...referencedAssets].some((asset) => asset.endsWith(".css"))) {
  throw new Error("No emitted CSS reference was found in the exported HTML.");
}
if (![...referencedAssets].some((asset) => asset.endsWith(".js"))) {
  throw new Error("No emitted JavaScript reference was found in the exported HTML.");
}

for (const assetUrl of referencedAssets) {
  const relativeAsset = assetUrl.slice(basePath.length).replace(/^\//, "");
  const assetPath = path.resolve(outputRoot, ...relativeAsset.split("/"));
  const relativeToOutput = path.relative(outputRoot, assetPath);
  if (relativeToOutput.startsWith("..") || path.isAbsolute(relativeToOutput)) {
    throw new Error(`Asset escaped the output directory: ${assetUrl}`);
  }
  await access(assetPath);
}

await Promise.all([
  access(path.join(outputRoot, ".nojekyll")),
  access(path.join(outputRoot, "404.html")),
  access(path.join(outputRoot, "og.png")),
]);

console.log(
  `Verified ${referencedAssets.size} GitHub Pages asset references for base path ${basePath || "/"}.`,
);
