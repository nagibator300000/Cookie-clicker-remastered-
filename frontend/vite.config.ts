import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import path from 'path';

const ENV_LOCATION = path.resolve(process.cwd(), '../');

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ENV_LOCATION);
  return {
    envDir: ENV_LOCATION,
    build: {
      outDir: '../dist/frontend',
    },
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
            'eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0',
        },
      }),
    ],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: fileURLToPath(new URL('./src', import.meta.url)),
        },
        {
          find: '@schemas',
          replacement: fileURLToPath(new URL('../schemas', import.meta.url)),
        },
        {
          find: '@data',
          replacement: fileURLToPath(new URL('../data', import.meta.url)),
        },
      ],
    },
  };
});
