
import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'

import Rect from './Rect'
// import { View, RoundView } from './View'
import { RoundViews } from './Views'

import { Window } from './Window'

import { newTabPage } from './newTabPage'

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        api: any
    }
}

app.commandLine.appendSwitch('enable-features', 'VaapiVideoDecoder,WaylandWindowDecorations')
  
app.commandLine.appendSwitch(
    'disable-features',
    'UseChromeOSDirectVideoDecoder'
)
app.commandLine.appendSwitch('enable-accelerated-mjpeg-decode')
app.commandLine.appendSwitch('enable-accelerated-video')
app.commandLine.appendSwitch('ignore-gpu-blacklist')
app.commandLine.appendSwitch('enable-native-gpu-memory-buffers')
app.commandLine.appendSwitch('enable-gpu-rasterization')

function createWindow() {

    const win = new Window(new Rect(800, 600))
    
    // win.webContents.openDevTools()

    // const view = new RoundView(win, new Rect(788, 557, 6, 37))

    // const view = new RoundView(win, new Rect(788, 555, 6, 39))

    // const view = new RoundView(win, new Rect(740, 555, 54, 39))

    // const views = new RoundViews(win, new Rect(740, 555, 54, 39))

    const views = new RoundViews(win.win, new Rect(740, 555, 54, 39))

    // const view = new RoundView(win, new Rect(740, 577, 54, 23))

    // const view = new View(win, new Rect(800, 563, 0, 37))
}


app.whenReady().then(() => {

    newTabPage(createWindow)

    // app.on('activate', function () {
    //     if (BrowserWindow.getAllWindows().length === 0) createWindow()
    // })
})

// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         app.quit()
//     }
// })

