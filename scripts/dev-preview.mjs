import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const vinextCli = fileURLToPath(
  new URL("../node_modules/vinext/dist/cli.js", import.meta.url),
);

const child = spawn(process.execPath, [vinextCli, "dev"], {
  cwd: projectRoot,
  env: {
    ...process.env,
    WORKSHOP_PREVIEW_HOST: process.env.WORKSHOP_PREVIEW_HOST ?? "0.0.0.0",
  },
  stdio: "inherit",
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}

child.on("error", (error) => {
  console.error(error);
  process.exitCode = 1;
});

child.on("exit", (code) => {
  process.exitCode = code ?? 1;
});
