import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // tutaj możesz dodać eventy, jeśli masz jakieś potrzeby
    },
    specPattern: "cypress/integration/**/*.js", // zmiana na folder integration
    supportFile: "cypress/support/e2e.ts",
    baseUrl: "http://localhost:3000",
  },
});
