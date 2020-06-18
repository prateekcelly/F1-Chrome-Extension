const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackExtensionManifestPlugin = require("webpack-extension-manifest-plugin");
const baseManifest = require("./manifest.json");

const config = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.bundle.js",
    chunkFilename: "[name].bundle.js",
  },
  devServer: {
    contentBase: __dirname + "/dist",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },

      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: "file-loader?name=/assets/fonts/[name].[ext]",
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: "file-loader?name=[name].[ext]",
      },
    ],
  },

  plugins: [
    // new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new htmlWebpackPlugin({
      title: "dailyF1",
      manifest: "manifest.json",
      filename: "index.html",
      template: __dirname + "/src/main.html",
      hash: true,
    }),
    new WebpackExtensionManifestPlugin({
      config: {
        base: baseManifest,
      },
    }),
  ],
  watch: true,
  devtool: "inline-source-map",
};

module.exports = config;
