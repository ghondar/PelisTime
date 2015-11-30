import peerflix from 'peerflix'
import address from 'network-address'
import numeral from 'numeral'
import read from 'read-torrent'
import path from 'path'
import os from 'os'
import Q from 'q'

// Minimum percentage to open video
const minPercentageLoaded = 0.5

// Minimum bytes loaded to open video
const minSizeLoaded = 10 * 1024 * 1024

// Temporal directory for videos
const tmpDir = path.join(os.tmpDir(), 'Pelis Time')

// Format bytes to readable format
const bytes = function(num) {
  return numeral(num).format('0.0b')
}

function randomPortNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function playTorrent(torrent) {
  const defer = Q.defer()
  // Create a unique file to cache the video (with a microtimestamp) to prevent read conflicts
  let tmpFilename = typeof torrent === 'string' ? torrent.match(/magnet:\?xt=urn:[a-z0-9]+:([a-z0-9]{32})/i)[ 1 ] : torrent.infoHash
  tmpFilename = tmpFilename.replace(/([^a-zA-Z0-9-_])/g, '_') + '-' + (new Date() * 1) + '.mkv'
  const tmpFile = path.join(tmpDir, tmpFilename)

  // Set random port
  const port = randomPortNumber(49152, 65534)

  const engine = peerflix(torrent, {
    // Set the custom temp file
    path       : tmpFile,
    buffer     : (1.5 * 1024 * 1024).toString(),
    port       : port,
    connections: 60,
    uploads    : 5
  })

  const started = Date.now()
  const wires = engine.swarm.wires
  const swarm = engine.swarm

  let fireStart = false,
        timeout = false,
        loadedTimeout = undefined

  const active = function(wire) {
    return !wire.peerChoking
  }

  // Listen on port
  engine.server.on('listening', function() {
    if (loadedTimeout) clearTimeout(loadedTimeout)
    const href = 'http://' + address() + ':' + engine.server.address().port + '/'

    const loadingStats = function() {
      // Downloaded (size and percentage)
      const now = swarm.downloaded,
        total = engine.torrent.length,

        targetLoadedSize = minSizeLoaded > total ? total : minSizeLoaded,
        targetLoadedPercent = minPercentageLoaded * total / 100,
        targetLoaded = Math.max(targetLoadedPercent, targetLoadedSize),
        percentUntilStart = now / targetLoaded * 100,

        runtime = Math.floor((Date.now() - started) / 1000)

      // Check if loaded enough to start
      if (now > targetLoaded && !fireStart) {
        defer.resolve(href)
        fireStart = true
      }
      // If downloading, send stats
      if (now < total && !timeout) {
        // If download choked (no peers), send timeout for restart
        if (runtime > 40 && !wires.length) {
          timeout = true
        }
        // Send streaming stats callback
        defer.notify({
          percent: percentUntilStart,
          started: fireStart,
          speed  : bytes(swarm.downloadSpeed()),
          active : swarm.wires.filter(active).length,
          peers  : wires.length,
          timeout: timeout
        })
        loadedTimeout = setTimeout(loadingStats, 500)
      } else {
        // If complete, send complete stat once
        defer.notify({
          started : fireStart,
          percent : 100,
          complete: true
        })
      }
    }

    loadingStats()
  })

  engine.server.once('error', function() {
    if (loadedTimeout) clearTimeout(loadedTimeout)
    engine.server.listen(0)
  })

  engine.server.on('connection', function(socket) {
    socket.setTimeout(36000000)
  })

  engine.on('error', function() {
    if (loadedTimeout) clearTimeout(loadedTimeout)

    defer.reject(true)
  })

  // Destroy engine and remove video
  global.destroyVideo = function() {
    const defer = Q.defer()

    if (loadedTimeout) { clearTimeout(loadedTimeout) }

    engine.remove(function() {
      engine.destroy(function() {
        defer.resolve(true)
      })
    })

    return defer.promise
  }

  return defer.promise
}

export function readTorrent(url) {
  const defer = Q.defer()

  read(url, (err, torrent) => {
    if (err) {
      defer.reject('PLAYER_ERROR', 'INVALID_FILE', 'TORRENT_NOT_LOADED')
    }else {
      // Load torrent only if still active
      defer.resolve(torrent)
    }
  })

  return defer.promise
}

readTorrent('http://torrents.bityouth.com/downloads/1/3/2/9/6/Matar_al_mensajero_HDRip.torrent')
  .then(playTorrent)
  .then(href => {console.log(href)}, err => {console.log(err)}, info => {console.log(info)})

