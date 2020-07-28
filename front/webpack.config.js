const path = require("path");
const WatchExternalFilesPlugin = require("webpack-watch-files-plugin").default;
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/app.ts",
  devtool: "cheap-eval-source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.png$|\.jpg$|\.gif$/,
        loader: "file-loader",
      },
      {
        test: /\.css$|\.scss$|\.sass$/,
        loader: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new WatchExternalFilesPlugin({
      files: ["./src/**/*.js", "./src/**/*.ts"],
    }),
    new HtmlWebpackPlugin({
      // index.html 템플릿을 기반으로 빌드 결과물을 추가해줌
      template: "src/index.html",
    }),
  ],
};
