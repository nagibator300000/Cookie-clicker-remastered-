import { defineConfig, loadEnv } from "vite";
import { fileURLToPath, URL } from "url";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    server: {
      port: Number(env.VITE_FRONT_PORT),
      strictPort: true,
    },
    plugins: [
      react(),
      checker({
        typescript: true,
        eslint: {
          lintCommand:
            "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
        },
      }),
    ],
    resolve: {
      alias: [
        {
          find: "@",
          replacement: fileURLToPath(new URL("./src", import.meta.url)),
        },
      ],
    },
  };
});
