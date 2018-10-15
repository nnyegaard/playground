const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve("../bla"), path.resolve(__dirname, "src")],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
