
import { BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'

import Rect from './Rect'
import { Views } from './Views'

export class Window {
    win: BrowserWindow
    views: Views
    constructor(rect: Rect) {
        this.win = new BrowserWindow({
            width: rect.width,
            height: rect.height,
            minWidth: 518,
            minHeight: 350,
            title: 'Surfer',
            center: true,
            titleBarStyle: 'hiddenInset',
            // vibrancy: 'selection',
            // backgroundColor: '#ffffff',
            // backgroundColor: '#312E2B',
            // backgroundColor: '#E8EAEE',
            // backgroundColor: '#A8C9F0',
            backgroundColor: '#eee8d5',
            titleBarOverlay: {
                height: 39
            },
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
            },
            show: false
        })

        // this.win.once('ready-to-show', () => {
        //     this.win.show()
        // })

        // this.win.webContents.once('did-finish-load', () => {
        //     this.win.show()
        // })

        ipcMain.on('window-ready', () => {
            this.win.show()
        })

        this.win.setBackgroundColor('#ffffff')

        this.win.webContents.loadFile(path.join(__dirname, '../pages/main/index.html'))

        // this.win.webContents.toggleDevTools()

        this.win.on('enter-full-screen', () => {
            this.win.webContents.send('fullscreen-entered')
        })

        this.win.on('leave-full-screen', () => {
            this.win.webContents.send('fullscreen-left')
        })

        ipcMain.on('theme-color-changed', (_e: Event, color: string) => {
            if (color !== null) {
                this.win.setBackgroundColor(color)
                this.win.webContents.send('set-theme-color', color)
            } else {
                this.win.setBackgroundColor('#A8C9F0')
                this.win.webContents.send('set-theme-color', '#A8C9F0')
            }
        })
    }
}

