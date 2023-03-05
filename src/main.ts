
import { app, BrowserWindow } from 'electron'
import * as path from 'path'

import Rect from './Rect'
// import { View, RoundView } from './View'
import { RoundViews } from './Views'

import { newTabPage } from './newTabPage'

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        api: any
    }
}

function createWindow() {
    const backgroundColor = 'A8C9F0'
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 518,
        minHeight: 350,
        title: 'Surfer',
        center: true,
        // titleBarStyle: 'hidden',
        titleBarStyle: 'hiddenInset',
        // vibrancy: 'selection',
        // backgroundColor: '#ffffff',
        // backgroundColor: '#312E2B',
        backgroundColor: '#A8C9F0',
        // backgroundColor: '#E8EAEE',
        titleBarOverlay: {
            height: 39
        },
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
        show: false
    })

    win.loadFile(path.join(__dirname, '../pages/main/index.html'))

    win.once('ready-to-show', win.show)

    // win.webContents.openDevTools()

    // const view = new RoundView(win, new Rect(788, 557, 6, 37))

    // const view = new RoundView(win, new Rect(788, 555, 6, 39))

    // const view = new RoundView(win, new Rect(740, 555, 54, 39))
    
    const views = new RoundViews(win, new Rect(740, 555, 54, 39))

    // const view = new RoundView(win, new Rect(740, 577, 54, 23))

    // const view = new View(win, new Rect(800, 563, 0, 37))

    views.currentView.view.webContents.addListener('did-change-theme-color', (_e: Event, color: string) => {
        if (color !== null) {
            win.setBackgroundColor(color)
            win.webContents.send('set-theme-color', color)
        } else {
            win.setBackgroundColor('#A8C9F0')
            win.webContents.send('set-theme-color', '#A8C9F0')
        }
    })
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

