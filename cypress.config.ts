import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";
import { PORT } from "./env.cfg";

export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:${PORT}`,
    setupNodeEvents(on, config) {
      on("file:preprocessor", vitePreprocessor());
    },
  },
});
