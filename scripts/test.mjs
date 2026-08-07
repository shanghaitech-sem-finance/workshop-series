import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const vinextCli = fileURLToPath(
  new URL("../node_modules/vinext/dist/cli.js", import.meta.url),
);
const renderedHtmlTest = fileURLToPath(
  new URL("../tests/rendered-html.test.mjs", import.meta.url),
);
const preparePagesAssets = fileURLToPath(
  new URL("./prepare-pages-assets.mjs", import.meta.url),
);

function run(command, args, env = process.env) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd: projectRoot,
      env,
      stdio: "inherit",
    });
    child.on("error", (error) => {
      console.error(error);
      resolve(1);
    });
    child.on("exit", (code) => resolve(code ?? 1));
  });
}

async function runRequired(label, command, args, { env, retries = 0 } = {}) {
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const code = await run(command, args, env);
    if (code === 0) return;
    if (attempt < retries) {
      console.warn(`${label} failed; retrying once after Windows process cleanup.`);
      await new Promise((resolve) => setTimeout(resolve, 750));
    } else {
      throw new Error(`${label} failed with exit code ${code}.`);
    }
  }
}

const buildRetries = process.platform === "win32" ? 1 : 0;

await runRequired("Default static build", process.execPath, [vinextCli, "build"], {
  retries: buildRetries,
});
await runRequired("Rendered HTML regression tests", process.execPath, [
  "--test",
  renderedHtmlTest,
]);

const pagesEnvironment = {
  ...process.env,
  NEXT_PUBLIC_BASE_PATH: "/workshop-series",
  NEXT_PUBLIC_SITE_URL:
    "https://shanghaitech-sem-finance.github.io/workshop-series",
};

await runRequired("GitHub Pages static build", process.execPath, [vinextCli, "build"], {
  env: pagesEnvironment,
  retries: buildRetries,
});
await runRequired(
  "GitHub Pages rendered HTML regression tests",
  process.execPath,
  ["--test", renderedHtmlTest],
  { env: pagesEnvironment },
);
await runRequired(
  "GitHub Pages asset verification",
  process.execPath,
  [preparePagesAssets],
  { env: pagesEnvironment },
);
