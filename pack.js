var fs = require('fs')
var Q = require('q')
var url = require('url')
var path = require('path')
var https = require('https')
var log = require('single-line-log').stdout
var packager = require('electron-packager')
var fse = require('fs-extra')
var spawn = require('child_process').spawn
var platform = require('os').platform()
var zipFolder = require('zip-folder')

var pathModule = '/app/node_modules/'
var listSourcesWebchimera = {
  darwin: {
    ico  : 'img/osx.icns',
    arch : 'x64'
  },
  win32 : {
    ico  : 'img/windows.ico',
    arch : 'all'
  },
  linux : {
    ico  : 'img/windows.ico',
    arch : 'x64'
  }
}

var sourceWebchimera = listSourcesWebchimera[ platform ]

var paths = {
  packageJson: path.join(__dirname, 'package.json')
}

var packageJson = JSON.parse(fs.readFileSync(paths.packageJson, 'utf8'))
var nodeModuleIgnores = [ 'js', 'binVideo', 'css', 'dist', 'docs', 'fonts', 'img', 'electron-packager' ]

packager({
  dir             : '.',
  name            : packageJson.name,
  platform        : platform,
  icon            : sourceWebchimera.ico,
  arch            : sourceWebchimera.arch,
  version         : require('electron-prebuilt/package.json').version,
  'build-version' : packageJson.version,
  'version-string': {
    CompanyName   : 'PelisTime inc.',
    InternalName  : packageJson.name,
    ProductName   : packageJson.name,
    ProductVersion: require('electron-prebuilt/package.json').version
  },
  overwrite       : true,
  prune           : true,
  ignore          : new RegExp(`^/(${nodeModuleIgnores.join('|')})$`),
  // asar: true,
  out             : 'dist'
}, function(err, appPath) {
  if (err) return console.error(err)
})
