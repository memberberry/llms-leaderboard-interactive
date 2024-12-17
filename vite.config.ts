import { defineConfig } from 'vite';
import Checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    watch: {
      ignored: ['!**/src/**'], // Do not ignore any files
    },
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },
  plugins: [
    Checker({ typescript: true }),
    tsconfigPaths()
  ],
});