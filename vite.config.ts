import vinext from "vinext";
import { defineConfig } from "vite";

// macOS Seatbelt blocks FSEvents, so Codex previews need polling for HMR.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === "seatbelt";
const previewHost = process.env.WORKSHOP_PREVIEW_HOST;

export default defineConfig(() => {
  const needsServerConfig = isCodexSeatbeltSandbox || Boolean(previewHost);

  return {
    server: needsServerConfig
      ? {
          ...(previewHost ? { host: previewHost } : {}),
          ...(isCodexSeatbeltSandbox
            ? { watch: { useFsEvents: false, usePolling: true } }
            : {}),
        }
      : undefined,
    plugins: [vinext({ prerender: { routes: "*" } })],
  };
});
