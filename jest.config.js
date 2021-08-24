module.exports = {
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules",
    "<rootDir>/lib",
    "<rootDir>/.docz"
  ],
  testRegex: ".*.(spec|test).js$"
};
