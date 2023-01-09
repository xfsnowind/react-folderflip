import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  component: {
    specPattern: ["cypress/component/*.cy.tsx"],
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
