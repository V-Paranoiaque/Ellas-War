import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import angular from "angular-eslint";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Shared JS/TS globals
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // JavaScript
  {
    files: ["**/*.{js,mjs,cjs}"],
    extends: [js.configs.recommended],
  },

  // TypeScript + Angular
  {
    files: ["**/*.{ts,mts,cts}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
    },
  },

  // Unit tests
  {
    files: ["**/*.spec.ts"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },

  // Angular templates
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      "@angular-eslint/template/elements-content": "off",
    },
  },

  // CSS
  {
    files: ["**/*.css"],
    plugins: {
      css,
    },
    language: "css/css",
    extends: ["css/recommended"],
  },
]);
