const path = require('path')
const webpack = require('webpack')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/'
}


const PAGES_DIR = PATHS.src
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter(fileName => fileName.endsWith('.html'))


module.exports = {
  externals: {
    paths: PATHS
  },

  entry: {
    app: PATHS.src

  },
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
    publicPath: '/'
  },
  performance: {
    maxAssetSize: 512000,
    maxEntrypointSize: 512000,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        // images / icons
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        // scss
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      },


    ]


  },
  devServer: {
    overlay: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`,
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
      ]
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    ...PAGES.map(
      page =>
        new HtmlWebpackPlugin({
          template: `${PAGES_DIR}/${page}`,
          filename: `./${page}`
        })
    )

  ]
}


