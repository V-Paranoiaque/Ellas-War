/** @type {import('jest').Config} */
module.exports = {
  rootDir: ".",
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  testEnvironment: "jsdom",
  roots: [
    "<rootDir>/src/app",
    "<rootDir>/src/environments",
    "<rootDir>/src/services",
  ],
  moduleFileExtensions: ["ts", "html", "js", "json"],
  transform: {
    "^.+\\.(ts|mjs|js|html)$": [
      "jest-preset-angular",
      {
        tsconfig: "<rootDir>/tsconfig.spec.json",
        stringifyContentPathRegex: "\\.(html|svg)$",
      },
    ],
  },
  transformIgnorePatterns: [
    "node_modules/(?!.*\\.mjs$|.*\\.esm\\.js$|@iconify-icons/|@angular/common/locales/)",
  ],
  reporters: [
    "default",
    ["jest-junit", { outputDirectory: "./reports", outputName: "junit.xml" }],
  ],
};
