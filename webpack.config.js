var fs = require('fs')
var path = require('path')
var webpack = require('webpack')

var node_modules = fs.readdirSync('node_modules').filter(function(x) { return x !== '.bin' })

var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
})

var ignoreModules = [ 'wcjs-player', 'peerflix', 'read-torrent', 'torrent-health', 'q' ]

var config = {
  entry    : [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './js/index.jsx'
  ],
  output   : {
    path      : __dirname + '/static/',
    publicPath: 'http://localhost:3000/static/',
    filename  : 'bundle.js',
    hot       : true
  },
  plugins  : [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    devFlagPlugin
  ],
  externals: function(context, request, cb) {
    if(node_modules.indexOf(request) !== -1) {
      var modules = ignoreModules.filter(function(ignoreModule) {
        return request.indexOf(ignoreModule) !== -1
      })
      if(modules.length > 0) {
        cb(null, 'commonjs ' + request)

        return
      }
    }
    cb()
  },
  module   : {
    loaders: [
      {
        test   :  /\.jsx$/,
        loaders: [ 'react-hot', 'babel' ],
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
        loader: 'style-loader!css-loader!cssnext-loader'
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
  resolve  : {
    extensions: [ '', '.jsx', '.js', '.json' ]
  }
}

module.exports = config
