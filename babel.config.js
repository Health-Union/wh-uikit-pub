module.exports = {
  plugins: ["lodash"],
  presets: ["@babel/preset-env", "@babel/preset-react"],
  env: {
    esm: {
      presets: [["@babel/env", { modules: false }]],
      plugins: [
        [
          "@babel/plugin-transform-runtime",
          {
            corejs: false,
            regeneratores: true,
            helpers: true,
            useESModules: true
          }
        ]
      ]
    },
    test: {
      presets: [
        [
          "@babel/env",
          {
            modules: "commonjs",
            targets: {
              node: "current"
            }
          }
        ]
      ]
    }
  }
};
