const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    bundle: "./src/App/index.js"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js",
    chunkFilename: '[name].js',
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(png|jpe?g|gif|jpg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              strictMath: true,
              noIeCompat: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new HtmlWebPackPlugin({
      // where to find the html template
      template: path.resolve(__dirname, 'index.html'),
      // where to put the generated file
      path: path.resolve(__dirname, 'dist'),
      favicon: './src/App/favicon.ico',
      // the output file name
      filename: 'index.html',
      files: {
        css: ['styles.css'],
        js: ['bundle.js']
      }
    }),
    require('autoprefixer'),
  ],
  devServer: {
    open: true,
    historyApiFallback: true
  }
}