const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const StringReplacePlugin = require("string-replace-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const current_mode = process.env.NODE_ENV == 'production' ? 'production' : 'development';

module.exports = () => {
  return {
    devtool: "source-map",
    mode: current_mode,
    devServer: {
      host: "0.0.0.0",
    },
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "bundle.js",
    },
    stats: "errors-only",
    plugins: [
      new MiniCssExtractPlugin({
        filename: "styles.css",
      }),
      new HtmlWebpackPlugin({ template: "./src/index.html" }),
      new StringReplacePlugin(),

      new FaviconsWebpackPlugin({
        logo: "./src/images/logo.png",
        title: "nesrinesghaier.me",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
          ],
        },

        {
          test: /\.html$/,
          use: ["html-loader"],
        },
        {
          test: /\.(gif|png|jpe?g)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "images/[name].[ext]",
              },
            },
            "image-webpack-loader",
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ["file-loader"],
        },
        {
          test: /\.svg$/,
          use: [
            "svg-inline-loader",
            {
              loader: StringReplacePlugin.replace({
                replacements: [
                  {
                    pattern: /font-family="'Roboto-Thin'"/gi,
                    replacement: () => 'font-weight="100"',
                  },
                  {
                    pattern: /font-family="'Roboto-Light'"/gi,
                    replacement: () => 'font-weight="300"',
                  },
                  {
                    pattern: /font-family="'Roboto-Regular'"/gi,
                    replacement: () => 'font-weight="400"',
                  },
                  {
                    pattern: /font-family="'Roboto-Black'"/gi,
                    replacement: () => 'font-weight="900"',
                  },
                ],
              }),
            },
          ],
        },
      ],
    },
  };
};
