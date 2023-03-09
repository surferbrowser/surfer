
import { BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'

import Rect from './Rect'
import { Views } from './Views'

export class Window {
    win: BrowserWindow
    views: Views
    constructor(rect: Rect) {
        this.win = new BrowserWindow({
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

        this.win.once('ready-to-show', this.win.show)

        this.win.setBackgroundColor('#ffffff')

        this.win.webContents.loadFile(path.join(__dirname, '../pages/main/index.html'))

        // this.win.webContents.toggleDevTools()

        this.win.on('enter-full-screen', () => {
            this.win.webContents.send('fullscreen-entered')
        })
        
        this.win.on('leave-full-screen', () => {
            this.win.webContents.send('fullscreen-left')
        })
    }
}

