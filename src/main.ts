
import { app, BrowserWindow } from 'electron'
import * as path from 'path'

import Rect from './Rect'
import Views from './Views'
import { View, RoundView } from './View'

import { newTabPage } from './newTabPage'

declare global {
    interface Window {
        api: any
    }
}

app.addRecentDocument(path.join(__dirname, '../src/main.ts'))

const quitOnClose = true

function createWindow() {
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

    // const view = new RoundView(win, new Rect(788, 557, 6, 37), 10)

    // const view = new RoundView(win, new Rect(788, 555, 6, 39), 10)

    const view = new RoundView(win, new Rect(740, 555, 54, 39), 10)

    // const view = new RoundView(win, new Rect(740, 577, 54, 23), 10)

    // const view = new View(win, new Rect(800, 563, 0, 37))

}


app.whenReady().then(() => {

    newTabPage(createWindow)

    if (!quitOnClose) {
        app.on('activate', function () {
            if (BrowserWindow.getAllWindows().length === 0) createWindow()
        })
    }
})

if (!quitOnClose) {
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })
}

