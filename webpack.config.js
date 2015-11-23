var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
})

var config = {
  entry  : [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './js/index.js'
  ],
  output : {
    path      : __dirname + '/static/',
    publicPath: 'http://localhost:3000/static/',
    filename  : 'bundle.js',
    hot       : true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    devFlagPlugin,
    new ExtractTextPlugin('app.css')
  ],
  module : {
    loaders: [
      {
        test   : /\.js$/,
        loaders: [ 'react-hot', 'babel' ],
        exclude: /node_modules/
      },
      {
        test  : /\.css$/,
        loader: ExtractTextPlugin.extract('css?module!cssnext-loader')
      }
    ]
  },
  resolve: {
    extensions: [ '', '.jsx', '.js', '.json' ]
  }
}

module.exports = config
