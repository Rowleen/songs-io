const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

require("dotenv").config();

const isDev = process.env.ENV === "development";
const entry = ["./src/frontend/index.js"];

if (isDev) {
  entry.push(
    "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true"
  );
}

module.exports = {
  devtool: !isDev ? "hidden-source-map" : "eval-cheap-source-map",
  entry,
  mode: process.env.ENV,
  output: {
    path: path.resolve(__dirname, "src/server/public"),
    filename: isDev ? "assets/main.js" : "assets/main-[hash].js",
    publicPath: "/",
  },
  resolve: {
    alias: {
      styles: path.resolve(__dirname, "./src/frontend/assets"),
      components: path.resolve(__dirname, "./src/frontend/components"),
      api: path.resolve(__dirname, "./src/api"),
    },
    extensions: [".js", ".jsx"],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: "async",
      name: true,
      cacheGroups: {
        vendors: {
          name: "vendors",
          chunks: "all",
          reuseExistingChunk: true,
          priority: 1,
          filename: isDev ? "assets/vendor.js" : "assets/vendor-[hash].js",
          enforce: true,
          test(module, chunks) {
            const name = module.nameForCondition && module.nameForCondition();
            return chunks.some(
              (chunk) =>
                chunk.name !== "vendors" && /[\\/]node_modules[\\/]/.test(name)
            );
          },
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.styl$/,
        use: ["style-loader", "css-loader", "stylus-loader"],
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [autoprefixer()],
            },
          },
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
        ],
      },
      {
        test: /\.(png|gif|jpg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/[hash].[ext]",
            },
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    isDev ? new webpack.HotModuleReplacementPlugin() : () => {},
    !isDev
      ? new CompressionWebpackPlugin({
          test: /\.js$|\.css$/,
          filename: "[file].gz",
        })
      : () => {},
    !isDev ? new ManifestPlugin() : () => {},
    new MiniCssExtractPlugin({
      filename: isDev ? "assets/main.css" : "assets/main-[hash].css",
    }),
  ],
};
