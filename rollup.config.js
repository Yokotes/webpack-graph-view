const ts = require("@rollup/plugin-typescript");

module.exports = {
  input: "./src/index.ts",
  output: {
    file: "./dist/main.js",
    format: "cjs",
  },
  plugins: [ts()],
};
