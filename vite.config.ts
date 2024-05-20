import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import dotenv from "dotenv";

dotenv.config();
const envVariables = Object.keys(process.env).reduce((env, key) => {
  env[`process.env.${key}`] = JSON.stringify(process.env[key]);
  return env;
}, {});
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      { find: "./runtimeConfig", replacement: "./runtimeConfig.browser" },
    ],
  },
  define: {
    global: {},
    ...envVariables,
  },
});
