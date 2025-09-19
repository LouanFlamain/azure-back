// backend/vitest.config.mjs
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // <- describe/it/expect en global
    environment: "node",
    include: ["__tests__/**/*.test.js"],
  },
});
