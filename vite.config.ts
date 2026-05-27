import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths() // Automatically hooks into your tsconfig paths/aliases
  ],
  server: {
    port: 3000,   // Retain the default CRA port
    open: true,   // Automatically open the app on launch
  }
});
