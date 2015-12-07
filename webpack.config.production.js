var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var strip = require('strip-loader')
var CleanPlugin = require('clean-webpack-plugin')
var relativeAssetsPath = './static'
var assetsPath = path.join(__dirname, relativeAssetsPath)

module.exports = {
  devtool : 'source-map',
  entry   : [ './js/index.jsx' ],
  output  : {
    path      : assetsPath,
    filename  : 'bundle.js',
    publicPath: 'static/'
  },
  module  : {
    loaders: [
      {
        test   :  /\.jsx$/,
        loaders: [ strip.loader('debug'), 'babel' ],
        exclude: /node_modules/
      },
      {
        test   : /\.js$/,
        loaders: [ 'babel' ],
        include: path.join(__dirname, 'js'),
        exclude: /node_modules/
      },
      {
        test  : /\.css$/,
        loader: ExtractTextPlugin.extract('css?module!cssnext-loader')
      },
      {
        test  : /\.png$/,
        loader: 'file-loader?limit=10000&minetype=image/png'
      },
      {
        test  : /\.jpg$/,
        loader: 'file-loader?limit=10000&minetype=image/jpg'
      },
      {
        test  : /\.gif$/,
        loader: 'file-loader'
      },
      {
        test  : /\.woff($|\?)/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test  : /\.ttf($|\?)/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test  : /\.eot($|\?)/,
        loader: 'file-loader'
      },
      {
        test  : /\.svg($|\?)/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  progress: true,
  resolve : {
    modulesDirectories: [
      'js',
      'node_modules'
    ],
    extensions        : [ '', '.json', '.js', 'jsx' ]
  },
  plugins : [
    new CleanPlugin([ relativeAssetsPath ]),
    new ExtractTextPlugin('app.css', { allChunks: true }),
    new webpack.DefinePlugin({
      __CLIENT__     : true,
      __SERVER__     : false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__   : false,
      __DEV__        : false
    }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // set global vars
    new webpack.DefinePlugin({
      'process.env': {
        // Useful to reduce the size of client-side libraries, e.g. react
        NODE_ENV: JSON.stringify('production')
      }
    }),

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
        }
    })
  ]
}
