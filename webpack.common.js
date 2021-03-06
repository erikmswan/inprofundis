const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const autoprefixer = require("autoprefixer");
const path = require("path");
const constants = require("./app").constants;
const env = require("./env.js");

const babelOptions = {
  presets: ["@babel/react"],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-transform-async-to-generator",
    "react-hot-loader/babel"
  ]
};

let config = {
  entry: {
    app: ["./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader?cacheDirectory=true",
        options: babelOptions
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: function() {
                return [autoprefixer({ browsers: ["last 2 versions"] })];
              }
            }
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: ["src/styles"]
              }
            }
          }
        ]
      },
      {
        test: /\.gif$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "image/gif"
        }
      },
      {
        test: /\.jpg$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "image/jpg"
        }
      },
      {
        test: /\.png$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "image/png"
        }
      },
      {
        test: /\.svg$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "image/svg+xml"
        }
      },
      {
        test: /\.ttf$/,
        loader: "url-loader",
        options: {
          limit: 100000,
          mimetype: "application/octet-stream"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: constants.appTitle,
      filename: "index.html",
      template: path.resolve(__dirname, "src") + "/index.ejs",
      inject: "body"
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "src/assets"),
        to: "assets"
      }
    ]),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(env)
    })
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
      client: path.resolve(__dirname, "src/client"),
      app: path.resolve(__dirname, "app.js"),
      assets: path.resolve(__dirname, "src/assets"),
      components: path.resolve(__dirname, "src/components"),
      dao: path.resolve(__dirname, "src/dao"),
      lib: path.resolve(__dirname, "src/lib"),
      routes: path.resolve(__dirname, "src/routes"),
      state: path.resolve(__dirname, "src/state"),
      styles: path.resolve(__dirname, "src/styles"),
      stubs: path.resolve(__dirname, "src/stubs")
    },
    extensions: [".js", ".css", ".jsx", ".less", ".scss"]
  }
};

module.exports = config;
