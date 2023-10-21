const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
module.exports = {

  entry: './client/src/index.js',

  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js'
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: './client/src/index.html'
    })
  ],

  mode: 'development',

  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  devServer: {

    static: {

      directory: path.resolve(__dirname, 'build'),
      publicPath: '/'

    },

    proxy: {
      '/server': 'http://localhost:3000/'
    }

  },

  devtool: "eval-source-map"

  }