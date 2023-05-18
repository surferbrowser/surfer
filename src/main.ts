
import { app, BrowserWindow, session } from 'electron'
import * as path from 'path'

// import { ElectronChromeExtensions } from 'electron-chrome-extensions'

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


    /*
    const browserSession = session.fromPartition('persist:userSession')
    
    const extensions = new ElectronChromeExtensions({
        session: browserSession
        // createTab(details) {
        //   // Optionally implemented for chrome.tabs.create support
        // },
        // selectTab(tab, browserWindow) {
        //   // Optionally implemented for chrome.tabs.update support
        // },
        // removeTab(tab, browserWindow) {
        //   // Optionally implemented for chrome.tabs.remove support
        // }
    })
    */

    // browserSession.loadExtension(
    //     path.join(__dirname, '../extensions/cjpalhdlnbpafiamejdnhcphjbkeiagm/1.49.0_2'),
    //     { allowFileAccess: false }
    // )

    // browserSession.loadExtension(
    //     path.join(__dirname, '../extensions/edeocnllmaooibmigmielinnjiihifkn/1.9.4_0'),
    //     { allowFileAccess: false }
    // )

    // browserSession.loadExtension(
    //     path.join(__dirname, '../extensions/aapbdbdomjkkjkaonfhkkikfgjllcleb/2.0.13_0'),
    //     { allowFileAccess: false }
    // )

    // const views = new RoundViews(win.win, new Rect(740, 555, 54, 39), extensions)
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

