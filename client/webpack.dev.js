const config = require("./webpack.config");
const { merge } = require("webpack-merge");
const path = require("path");

module.exports = merge(config, {
     mode: "development",
     output: {
          path: path.resolve(__dirname, "build"),
          filename: "main.js",
     },
});
