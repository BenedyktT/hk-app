const path = require('path');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const imageminMozjpeg = require('imagemin-mozjpeg');
module.exports = {
  module: {
    rules: [
       {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }, 
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: false }
          }
        ]
      },
             {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           {
             loader: 'file-loader',
             options: {
                 name:'[name].[ext]',
                 outputPath: 'assets/img',
             }
           }
         ]
       },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new CopyWebpackPlugin([{
        from: 'src/images/',
        to: path.resolve(__dirname, 'dist')
      }]),
    new ImageminPlugin({
        pngquant: ({quality: [0.5, 0.5]}),
        plugins: [imageminMozjpeg({quality: 50})]
      })
  ]
};