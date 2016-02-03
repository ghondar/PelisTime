var app = require('app')  // Module to control application life.
var BrowserWindow = require('browser-window')  // Module to create native browser window.
var electron = require('electron')

// Report crashes to our server.
require('crash-reporter').start()

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // if (process.platform != 'darwin')
  app.quit()
})

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  var electronScreen = electron.screen
  var size = electronScreen.getPrimaryDisplay().workAreaSize
  var minWidth = size.width / 1.5
  var minHeight = size.height / 1.2
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width    : size.width,
    height   : size.height,
    minWidth : Math.round(minWidth),
    minHeight: Math.round(minHeight),
    center   : true,
    icon     : './logo/logo.png'
  })

  if (process.env.DEBUG) {
    mainWindow.loadURL('file://' + __dirname + '/dev-index.html')
  } else {
    mainWindow.loadURL('file://' + __dirname + '/index.html')
  }

  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools()
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
})
