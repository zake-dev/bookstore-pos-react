const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

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
};
