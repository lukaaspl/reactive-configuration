const path = require("path");

// plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// paths
const sourcePath = path.join(__dirname, "src");
const resourcesPath = path.join(__dirname, "resources");
const outputPath = path.join(__dirname, "dist");

module.exports = {
  mode: "production",
  context: sourcePath,
  entry: {
    main: "./index.tsx",
  },
  output: {
    path: outputPath,
    filename: "[name]-[contenthash].js",
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
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(sass|scss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
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
    new MiniCssExtractPlugin({ filename: "[name]-[contenthash].css" }),
  ],
  devServer: {
    contentBase: sourcePath,
    stats: {
      warnings: true,
    },
    port: 3000,
    open: true,
  },
};
