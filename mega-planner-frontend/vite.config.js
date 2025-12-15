import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration.  We expose environment variables prefixed with VITE_ to
// the client.  The server automatically opens the browser on port 3000 when
// running `npm run dev`.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3600,
    open: false,
  },
  // Configuration for Vitest.  Use the jsdom environment so that
  // React components can render in tests.  Globals provides convenient
  // functions such as describe/it/expect without explicit imports.
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.js',
  },
});