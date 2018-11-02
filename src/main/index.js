'use strict'

import { app, BrowserWindow } from 'electron'

const ipc = require('electron').ipcMain

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
// let newMin
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1180,
    height: 720,
    minWidth: 1180,
    minHeight: 720,
    useContentSize: true,
    webPreferences: {
      webSecurity: false,
      nativeWindowOpen: true
    },
    frame: false
  })
  // mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
  //   if (frameName === 'video') {
  //     event.preventDefault()
  //     Object.assign(options, {
  //       parent: mainWindow,
  //       width: 600,
  //       height: 600
  //     })
  //     event.newGuest = new BrowserWindow(options)
  //     newMin = event.newGuest
  //   }
  // })

  mainWindow.on('maximize', (e) => {
    mainWindow.webContents.send('resizeWin', 'max')
  })
  mainWindow.on('unmaximize', (e) => {
    mainWindow.webContents.send('resizeWin', 'unmax')
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}
app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
ipc.on('newClose', function (event, arg) {
  if (arg === 'close') {
    mainWindow.close()
  }
  if (arg === 'big') {
    mainWindow.maximize()
  }
  if (arg === 'nobig') {
    mainWindow.unmaximize()
  }
  if (arg === 'small') {
    mainWindow.minimize()
  }
})

ipc.on('openMain', function (event, arg) {
  if (arg === 'show') {
    if (mainWindow === null) {
      createWindow()
    } else {
      mainWindow.show()
    }
  }
})
// xinjian
let newWly
let num = 1
ipc.on('newRouter', function (event, arg) {
  if (num === 1) {
    newWly = new BrowserWindow({
      width: 1000,
      height: 610,
      minWidth: 650,
      minHeight: 370,
      frame: false
    })
    newWly.loadURL('http://localhost:9080' + arg)

    newWly.on('maximize', (e) => {
      newWly.webContents.send('resizeWin1', 'max')
    })
    newWly.on('unmaximize', (e) => {
      newWly.webContents.send('resizeWin1', 'unmax')
    })
    newWly.on('closed', () => {
      newWly = null
      num = 1
    })
    num++
  } else {
    newWly.loadURL('http://localhost:9080' + arg)
    newWly.show()
  }
})

ipc.on('newClose1', function (event, arg) {
  if (arg === 'close') {
    newWly.close()
  }
  if (arg === 'big') {
    newWly.maximize()
  }
  if (arg === 'nobig') {
    newWly.unmaximize()
  }
  if (arg === 'small') {
    newWly.minimize()
  }
})

let newPay
let numPay = 1
ipc.on('newPayPro', function (event, arg) {
  if (numPay === 1) {
    newPay = new BrowserWindow({
      width: 456,
      height: 697,
      resizable: false,
      frame: false
    })
    newPay.loadURL('http://localhost:9080' + arg)

    newPay.on('closed', () => {
      newPay = null
      numPay = 1
    })
    numPay++
  } else {
    newPay.loadURL('http://localhost:9080' + arg)
    newPay.show()
  }
})
ipc.on('newClose2', function (event, arg) {
  if (arg === 'close') {
    newPay.close()
  }
})
