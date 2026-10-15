import { defineConfig } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:4173";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  retries: 1,
  use: {
    baseURL,
    headless: true,
  },
  webServer: {
    command: "npm run preview -- --port 4173",
    env: { VITE_BASE_PATH: new URL(baseURL).pathname },
    port: 4173,
    reuseExistingServer: !process.env.CI,
    timeout: 15_000,
  },
});
