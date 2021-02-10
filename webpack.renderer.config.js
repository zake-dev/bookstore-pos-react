const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

module.exports = {
  // Put your normal webpack config below here
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    alias: { "react-dom": "@hot-loader/react-dom" },
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: require("./webpack.rules"),
  },
  plugins: [new Dotenv(), new webpack.IgnorePlugin(/^pg-native$/)],
};
