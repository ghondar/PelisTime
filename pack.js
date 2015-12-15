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
var pathWebchimera = {
  darwin: `/PelisTime.app/Contents/Resources/app/${pathModule}`,
  win32 : `/resources/app/${pathModule}`
}

var packageJson = JSON.parse(fs.readFileSync(paths.packageJson, 'utf8'))
var arrayModules = Object.keys(packageJson.dependencies).map(function(dependencie) { return `node_modules/${dependencie}` })

var nodeModuleIgnores = [ 'js', 'binVideo', 'css', 'dist', 'docs', 'fonts', 'img' ]

compiler.init(paths.cache)
compiler.compileAll('static')
fs.writeFileSync(
  path.join(paths.cache, 'settings.json'),
  JSON.stringify(compiler.collectCompilerInformation())
)

packager({
  dir      : '.',
  name     : packageJson.name,
  platform : 'win32',
  arch     : 'x64',
  version  : require('electron-prebuilt/package.json').version,
  overwrite: true,
  prune    : true,
  ignore   : new RegExp(`^/(${nodeModuleIgnores.join('|')})$`),
  // asar: true,
  out      : 'dist'
}, function(err, appPath) {
  if (err) return console.error(err)
  appPath.forEach(function(dir) {
    if(dir.indexOf('darwin') !== -1) {
      fse.remove(`${dir}${pathWebchimera[ 'darwin' ]}webchimera.js/`, function(err) {
        var unzipDarwin  = spawn('unzip', [ './binVideo/osx-64bits.zip', '-d', `${dir}${pathWebchimera[ 'darwin' ]}` ])
        unzipDarwin.stderr.on('data', function(err) {
          console.log('Error: ', err.toString('utf8'))
        })
        unzipDarwin.on('exit', function(code) {
          console.log('Package osx finished.')
        })
      })
    }else if(dir.indexOf('win32') !== -1) {
      fse.remove(`${dir}${pathWebchimera[ 'win32' ]}webchimera.js/`, function(err) {
        var unzipWin  = spawn('unzip', [ './binVideo/win-64bits.zip', '-d', `./${dir}${pathWebchimera[ 'win32' ]}` ])
        unzipWin.stdout.on('data', function(output) {
          console.log('data: ', output.toString('utf8'))
        })
        unzipWin.stderr.on('data', function(err) {
          console.log('Error: ', err.toString('utf8'))
        })
        unzipWin.on('exit', function(code) {
          console.log('Package win finished.')
        })
      })
    }
  })
})
