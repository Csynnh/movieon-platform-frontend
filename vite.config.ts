import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import dotenv from "dotenv";

dotenv.config();
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
    "process.env.REACT_APP_AWS_REGION": JSON.stringify(
      process.env.REACT_APP_AWS_REGION
    ),
    "process.env.REACT_APP_AWS_ACCESS_KEY_ID": JSON.stringify(
      process.env.REACT_APP_AWS_ACCESS_KEY_ID
    ),
    "process.env.REACT_APP_AWS_SECRET_ACCESS_KEY": JSON.stringify(
      process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
    ),
  },
});
