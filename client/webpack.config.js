const HtmlWebpackPlugin = require("html-webpack-plugin");
// const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = {
     mode: "production",
     entry: path.resolve(__dirname, "src/index.js"),
     performance: {
          maxAssetSize: 100000,
     },
     module: {
          rules: [
               {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                         loader: "babel-loader",
                         options: {
                              presets: ["@babel/preset-env"],
                         },
                    },
               },
               {
                    test: /\.s[ac]ss$/i,
                    use: [
                         "style-loader", // inject into DOM
                         "css-loader", //Turns into commonjs
                         "sass-loader", // turns sass into css
                    ],
               },
               {
                    test: /\.css$/i,
                    use: [
                         "style-loader", // inject into DOM
                         "css-loader", //Turns into commonjs
                    ],
               },
               {
                    test: /\.(png|jpeg|jpg|svg|ttf|woff|woff2|eot)$/,
                    loader: "file-loader",
               },
          ],
     },
     output: {
          path: path.resolve(__dirname, "build"),
          filename: "main.[contenthash].js",
     },
     plugins: [
          new HtmlWebpackPlugin({
               template: path.resolve(__dirname, "public/index.html"),
               filename: "index.html",
          }),
          new Dotenv(),
     ],
};
