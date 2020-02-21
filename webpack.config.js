const path = require("path");

// plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");

// paths
const sourcePath = path.join(__dirname, "src");
const resourcesPath = path.join(__dirname, "resources");
const outputPath = path.join(__dirname, "dist");

module.exports = {
  mode: "development",
  context: sourcePath,
  entry: {
    main: "./index.tsx",
  },
  output: {
    path: outputPath,
    filename: "bundle.js",
  },
  target: "web",
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".scss"],
    mainFields: ["main"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]_[local]_[hash:base64:3]",
              },
              importLoaders: 1,
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|gif|jpg)$/,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "index.html" }),
    new CopyWebpackPlugin([{ from: resourcesPath, to: path.join(outputPath, "resources") }]),
    new CleanWebpackPlugin(),
    new ErrorOverlayPlugin(),
  ],
  devtool: "cheap-module-source-map",
  devServer: {
    contentBase: sourcePath,
    stats: {
      warnings: true,
    },
    port: 3000,
    open: true,
  },
};
