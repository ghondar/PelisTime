var fs = require('fs')
var path = require('path')
var packager = require('electron-packager')

var compiler = require('electron-compile')

var paths = {
  packageJson: path.join(__dirname, 'package.json'),
  cache      : path.join(__dirname, 'cache')
}

var packageJson = JSON.parse(fs.readFileSync(paths.packageJson, 'utf8'))
var nodeModuleIgnores = [ 'node_modules', 'js', 'css', 'dist', 'docs' ]

compiler.init(paths.cache)
compiler.compileAll('static')
fs.writeFileSync(
  path.join(paths.cache, 'settings.json'),
  JSON.stringify(compiler.collectCompilerInformation())
)

packager({
  dir      : '.',
  name     : packageJson.name,
  platform : 'all',
  arch     : 'x64',
  version  : require('electron-prebuilt/package.json').version,
  overwrite: true,
  prune    : true,
  ignore   : new RegExp(`\/(${nodeModuleIgnores.join('|')})`),
  // asar: true,
  out      : 'dist'
}, function(err, appPath) {
  if (err) return console.error(err)
  console.log(appPath)
})
