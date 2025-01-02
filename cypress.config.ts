import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: "tests/e2e/**/*.cy.ts",
    supportFile:  "tests/support/e2e.ts",
    fixturesFolder: "tests/fixtures"
  },
});
