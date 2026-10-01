import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // Automatically open the app in the browser
    port: 3000, // Specify the port for the development server
  },
  build: {
    outDir: 'dist', // Output directory for the build
    sourcemap: true, // Generate source maps for easier debugging
  },
  resolve: {
    alias: {
      '@': '/src', // Create an alias for the src directory
    },
  },
});