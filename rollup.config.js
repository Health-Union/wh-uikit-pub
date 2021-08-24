import babel from "rollup-plugin-babel";
import { eslint } from "rollup-plugin-eslint";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { some, startsWith } from "lodash";

import pkg from "./package.json";

const dependencies = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

export default {
  input: `src/index.js`,
  // NOTE: module is external in either case
  // * its id equals to a dependency name
  // * its id starts with a 'dependency/' string
  external: (id) =>
    some(dependencies, (dep) => id === dep || startsWith(id, `${dep}/`)),
  output: [
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    commonjs({
      include: "node_modules/**",
      namedExports: {
        "react-is": ["ForwardRef"],
      },
    }),
    eslint({ throwOnError: false }),
    babel({
      exclude: "node_modules/**",
    }),
  ],
};
