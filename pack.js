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

var pathModule = 'node_modules/wcjs-player/node_modules/wcjs-renderer/node_modules/'
var listSourcesWebchimera = {
  darwin: {
    path : `/PelisTime.app/Contents/Resources/app/${pathModule}`,
    ico  : 'img/osx.icns',
    arch : 'x64',
    bin64: './binVideo/osx-64bits.zip',
    url  : 'https://github.com/ghondar/PelisTime/releases/download/V1.0.3/osx-64bits.zip'
  },
  win32 : {
    path : `/resources/app/${pathModule}`,
    ico  : 'img/windows.ico',
    arch : 'all',
    bin32: {
      path: './binVideo/win-ia32.zip',
      url : 'https://github.com/ghondar/PelisTime/releases/download/V1.0.3/win-ia32.zip'
    },
    bin64: {
      path: './binVideo/win-64bits.zip',
      url : 'https://github.com/ghondar/PelisTime/releases/download/V1.0.3/win-64bits.zip'
    }
  },
  linux : {
    path : `/resources/app/${pathModule}`,
    ico  : 'img/windows.ico',
    arch : 'x64',
    bin64: './binVideo/linux-64bits.zip',
    url  : 'https://github.com/ghondar/PelisTime/releases/download/V1.0.3/linux-64bits.zip'
  }
}

var sourceWebchimera = listSourcesWebchimera[ platform ]
var progress = {}

function downloadAsync(downloadFile, path) {
  return Q.Promise(function(resolve, reject) {
    download(downloadFile, path, function(err, done) {
      err ? reject(err) : resolve(done)
    })
  })
}

function download(downloadFile, path, cb) {
  var host = url.parse(downloadFile).hostname
  var pathname = url.parse(downloadFile).path

  var dlprogress = 0
  var total = 0
  var intervalo
  var content = ''

  https.request({
    hostname: host,
    path    : pathname,
    agent   : false
  }, function(res) {
    if(res.statusCode == 302) {
      return download(res.headers.location, path, cb)
    }else if(res.statusCode != 200) {
      return cb('non-OK status: ' + res.statusCode)
    }

    res.setEncoding('binary')

    total = res.headers[ 'content-length' ]

    intervalo = setInterval(function() {
      progress[ path ] = ('Downloading ' + path + ': ' + (dlprogress * 100 / total).toFixed(0) + '%')
      var stringOutput = Object.keys(progress).map(key => progress[ key ])
      log(stringOutput.join('\n'))
      if(dlprogress == total) {
        clearInterval(intervalo)
      }
    }, 1000)

    res.on('data', function(chunk) {
      dlprogress += chunk.length
      content += chunk
    })

    res.on('end', function() {
      fs.writeFile(path, content, 'binary', function(err) {
        if(err) return cb(err)
        else {
          clearInterval(intervalo)
          cb(null, 'done')
        }
      })
    })
  }).on('error', function(err) {
    cb(err)
  }).end()
}

var paths = {
  packageJson: path.join(__dirname, 'package.json')
}

var packageJson = JSON.parse(fs.readFileSync(paths.packageJson, 'utf8'))
var arrayModules = Object.keys(packageJson.dependencies).map(function(dependencie) { return `node_modules/${dependencie}` })
var accetedModules = 'wcjs-player|peerflix|read-torrent|torrent-health|q'

var nodeModuleIgnores = [ 'js', 'binVideo', 'css', 'dist', 'docs', 'fonts', 'img', 'electron-packager' ].concat(arrayModules)

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
  ignore          : new RegExp(`^/(?!node_modules/(${accetedModules}))(${nodeModuleIgnores.join('|')})$`),
  // asar: true,
  out             : 'dist'
}, function(err, appPath) {
  if (err) return console.error(err)
  appPath.forEach(function(dir) {
    if(dir.indexOf('linux') !== -1) {
      var unzip = require('unzip')
      Q.nfcall(fs.stat, sourceWebchimera.bin64)
        .catch(() => downloadAsync(sourceWebchimera.url, sourceWebchimera.bin64))
        .finally(() => {
          var extract = fs.createReadStream(sourceWebchimera.bin64).pipe(unzip.Extract({ path: `./${dir}${sourceWebchimera.path}webchimera.js/Release/` }))
          extract.on('close', function() {
            zipFolder(`./${dir}`, './dist/Pelistime-linux-64bits.zip', function(err) {
              console.log(err ? err : 'finished')
            })
          })
        })
    }else {
      Q.nfcall(fse.remove, `${dir}${sourceWebchimera.path}webchimera.js/`)
        .then(() => {
          if(dir.indexOf('darwin') !== -1) {
            Q.nfcall(fs.stat, sourceWebchimera.bin64)
              .catch(() => downloadAsync(sourceWebchimera.url, sourceWebchimera.bin64))
              .finally(() => {
                var unzip  = spawn('unzip', [ sourceWebchimera.bin64, '-d', `${dir}${sourceWebchimera.path}` ])
                unzip.stdout.on('data', output => {
                  console.log('data: ', output.toString('utf8'))
                })
                unzip.stderr.on('data', err => {
                  console.log('Error: ', err.toString('utf8'))
                })
                unzip.on('exit', code => {
                  console.log('Package osx finished.')
                })
              })
          }else if(dir.indexOf('win32') !== -1) {
            var unzip = require('unzip')
            var platformType = dir.indexOf('ia32') !== -1 ? 'bin32' : 'bin64'
            Q.nfcall(fs.stat, sourceWebchimera[ platformType ].path)
              .catch(() => downloadAsync(sourceWebchimera[ platformType ].url, sourceWebchimera[ platformType ].path))
              .finally(() => {
                fs.createReadStream(sourceWebchimera[ platformType ].path)
                  .pipe(unzip.Extract({ path: `./${dir}${sourceWebchimera.path}` }))
              })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  })
})

