import { mergeConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

const ASSET_URL = process.env.ASSET_URL || "";

export default {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: ["@storybook/addon-essentials", "storybook-addon-designs"],
  framework: "@storybook/react-vite",
  server: {
    type: "vite-dev-server",
    host: "localhost",
    port: 3000,
  },
  plugins: [svgr(), tsconfigPaths()],
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      // Add storybook-specific dependencies to pre-optimization
      optimizeDeps: {
        include: ["storybook-addon-designs"],
      },
    });
  },
};
