import { defineConfig } from "vite";
import reactPlugin from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [reactPlugin()],
  base: command === "build" ? "/hsw-generator/" : "/",
  build: {
    outDir: "build",
  },
  server: {
    port: 9999,
  },
}));
