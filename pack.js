var fs = require('fs')
var path = require('path')
var packager = require('electron-packager')
var fse = require('fs-extra')
var spawn = require('child_process').spawn
var arch = require('os').platform()

var compiler = require('electron-compile')

var paths = {
  packageJson: path.join(__dirname, 'package.json'),
  cache      : path.join(__dirname, 'cache')
}

var pathModule = 'node_modules/wcjs-player/node_modules/wcjs-renderer/node_modules/'
var webchimera = {
  darwin: {
    path: `/PelisTime.app/Contents/Resources/app/${pathModule}`,
    ico : 'img/osx.icns'
  },
  win32 : {
    path: `/resources/app/${pathModule}`,
    ico : 'img/windows.ico'
  }
}

var packageJson = JSON.parse(fs.readFileSync(paths.packageJson, 'utf8'))
var arrayModules = Object.keys(packageJson.dependencies).map(function(dependencie) { return `node_modules/${dependencie}` })
var accetedModules = 'wcjs-player|peerflix|read-torrent|torrent-health'

var nodeModuleIgnores = [ 'js', 'binVideo', 'css', 'dist', 'docs', 'fonts', 'img' ].concat(arrayModules)

compiler.init(paths.cache)
compiler.compileAll('static')
fs.writeFileSync(
  path.join(paths.cache, 'settings.json'),
  JSON.stringify(compiler.collectCompilerInformation())
)

packager({
  dir             : '.',
  name            : packageJson.name,
  platform        : arch,
  icon            : webchimera[ arch ].ico,
  arch            : 'x64',
  version         : require('electron-prebuilt/package.json').version,
  'build-version' : packageJson.version,
  'version-string': {
    CompanyName   : 'PelisTime inc.',
    InternalName  : packageJson.name,
    ProductName   : 'Pelis Time ',
    ProductVersion: require('electron-prebuilt/package.json').version
  },
  overwrite       : true,
  prune           : true,
  ignore          : new RegExp(`^/(?!node_modules/(${accetedModules}))(${nodeModuleIgnores.join('|')})$`),
  // asar: true,
  out             : 'dist'
}, function(err, appPath) {
  if (err) return console.error(err)
  appPath.forEach(function(dir) {
    fse.remove(`${dir}${webchimera[ arch ].path}webchimera.js/`, function(err) {
      if(dir.indexOf('darwin') !== -1) {
        var unzip  = spawn('unzip', [ './binVideo/osx-64bits.zip', '-d', `${dir}${webchimera[ arch ].path}` ])
        unzip.stdout.on('data', function(output) {
          console.log('data: ', output.toString('utf8'))
        })
        unzip.stderr.on('data', function(err) {
          console.log('Error: ', err.toString('utf8'))
        })
        unzip.on('exit', function(code) {
          console.log('Package osx finished.')
        })
      }else if(dir.indexOf('win32') !== -1) {
        var unzip = require('unzip')
        fs.createReadStream('./binVideo/win-64bits.zip').pipe(unzip.Extract({ path: `./${dir}${webchimera[ arch ].path}` }))
      }
    })
  })
})

