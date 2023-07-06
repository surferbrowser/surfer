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
            titleBarStyle: 'customButtonsOnHover',
            trafficLightPosition: { x: 12, y: 12 },
            // trafficLightPosition: { x: 10, y: 11.5 },
            // backgroundColor: '#A8C9F0',
            backgroundColor: '#edf0a8',
            titleBarOverlay: {
                height: 39
            },
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
                // nodeIntegration: true
            },
            show: false
        })

        let readyToShowCount = 0

        this.win.webContents.once('did-finish-load', () => {
            readyToShowCount += 1
            if (readyToShowCount >= 6) {
                this.win.show()
            }
        })

        ipcMain.on('corner-ready', () => {
            readyToShowCount += 1
            if (readyToShowCount >= 6) {
                this.win.show()
            }
        })

        this.win.webContents.loadFile(path.join(__dirname, '../pages/main/index.html'))

        // this.win.webContents.toggleDevTools()

        this.win.on('enter-full-screen', () => {
            this.win.webContents.send('fullscreen-entered')
        })

        this.win.on('leave-full-screen', () => {
            this.win.webContents.send('fullscreen-left')
        })

        // ipcMain.on('theme-color-changed', (_e: Event, color: string) => {
        //     if (color !== null) {
        //         this.win.setBackgroundColor(color)
        //         this.win.webContents.send('set-theme-color', color)
        //     } else {
        //         this.win.setBackgroundColor('#A8C9F0')
        //         this.win.webContents.send('set-theme-color', '#A8C9F0')
        //     }
        // })
    }
}

