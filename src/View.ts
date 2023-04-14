
import { BrowserView, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'

import Rect from './Rect'

import { ElectronBlocker } from '@cliqz/adblocker-electron';
import fetch from 'cross-fetch'; // required 'fetch'

export class View {
    view: BrowserView
    id: number
    isHTMLFullScreen = false
    constructor(win: BrowserWindow, rect: Rect) {
        this.view = new BrowserView({
            webPreferences: {
                nodeIntegration: false,
                sandbox: true,
                partition: 'persist:userSession',
                javascript: true,
                webSecurity: true,
                allowRunningInsecureContent: false,
                contextIsolation: true,
                safeDialogs: true,
                autoplayPolicy: 'user-gesture-required',
                minimumFontSize: 6,
                webviewTag: false,
                zoomFactor: 1.0,
                navigateOnDragDrop: true,
                scrollBounce: true,
                preload: path.join(__dirname, "viewPreload.js")
            }
        })
        win.addBrowserView(this.view)
        this.view.setBounds(rect)
        // this.view.setAutoResize({ width: true, height: true })
        this.view.webContents.setVisualZoomLevelLimits(1, 3)
        this.view.setBackgroundColor('#ffffff')

        this.view.webContents.loadURL('https://google.com/')

        // this.view.webContents.openDevTools()


        this.view.webContents.on('did-finish-load', () => {
            this.view.webContents.setVisualZoomLevelLimits(1, 3)
        })

        this.view.webContents.on('page-title-updated', (_ev, title) => {
            win.webContents.send('page-title-updated', title)
        })

        this.view.webContents.on('will-navigate', (_ev, url) => {
            win.webContents.send('page-url-updated', url)
        })

        this.view.webContents.on('did-navigate', (_ev, url) => {
            win.webContents.send('page-url-updated', url)
        })

        this.view.webContents.setWindowOpenHandler((details) => {
            this.view.webContents.loadURL(details.url)
            return { action: 'deny' }
        })

        ipcMain.on('set-url', (_ev: Event, url: string) => {
            this.view.webContents.loadURL(url)
        })

        ipcMain.on('focus-view', () => {
            this.view.webContents.focus()
        })

        const widthOff = win.getBounds().width - rect.width - rect.x
        const heightOff = win.getBounds().height - rect.height  - rect.y

        win.on('resize', () => {
            if (this.isHTMLFullScreen) return
            const bnds = win.getBounds()
            this.view.setBounds({ x: rect.x, y: rect.y, width: bnds.width - widthOff - rect.x, height: bnds.height - heightOff  - rect.y })
        })

        win.on('leave-full-screen', () => {
            if (this.isHTMLFullScreen) {
                const bnds = win.getBounds()
                this.view.setBounds({ x: rect.x, y: rect.y, width: bnds.width - widthOff - rect.x, height: bnds.height - heightOff  - rect.y })
            }
        })

        this.view.webContents.on('enter-html-full-screen', () => {
            this.isHTMLFullScreen = true
            setTimeout(() => {
                const bnds = win.getBounds()
                this.view.setBounds({ x: 0, y: 0, width: bnds.width, height: bnds.height })
            }, 0)
        })

        this.view.webContents.on('leave-html-full-screen', () => {
            this.isHTMLFullScreen = false
            const bnds = win.getBounds()
            this.view.setBounds({ x: rect.x, y: rect.y, width: bnds.width - widthOff - rect.x, height: bnds.height - heightOff  - rect.y })
        })

        ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
            blocker.enableBlockingInSession(this.view.webContents.session);
        });
    }
}

// DEPRECATED
export class RoundView extends View {
    constructor(win: BrowserWindow, rect: Rect) {
        super(win, rect)

        const { x, y, width, height } = this.view.getBounds()

        const widthOff = win.getBounds().width - rect.width - rect.x
        const heightOff = win.getBounds().height - rect.height  - rect.y

        const lt = new BrowserView({ webPreferences: {
            javascript: false,
            contextIsolation: true,
            webviewTag: false,
            zoomFactor: 1.0,
            scrollBounce: false
        }})

        lt.webContents.loadFile(path.join(__dirname, '../pages/round/lt.html'))
        win.addBrowserView(lt)

        lt.setBounds({ x: x, y: y, width: 10, height: 10 })

        lt.webContents.on('focus', () => {
            win.webContents.focus()
        })


        const lb = new BrowserView({ webPreferences: {
            javascript: false,
            contextIsolation: true,
            webviewTag: false,
            zoomFactor: 1.0,
            scrollBounce: false
        }})

        lb.webContents.loadFile(path.join(__dirname, '../pages/round/lb.html'))
        win.addBrowserView(lb)

        lb.setBounds({ x: x, y: y + height - 10, width: 10, height: 10 })

        win.on('resize', () => {
            const bnds = win.getBounds()
            lb.setBounds({ x: rect.x, y: rect.y + bnds.height - heightOff  - rect.y - 10, width: 10, height: 10 })
        })

        lb.webContents.on('focus', () => {
            win.webContents.focus()
        })


        const rt = new BrowserView({ webPreferences: {
            javascript: false,
            contextIsolation: true,
            webviewTag: false,
            zoomFactor: 1.0,
            scrollBounce: false
        }})

        rt.webContents.loadFile(path.join(__dirname, '../pages/round/rt.html'))
        win.addBrowserView(rt)

        rt.setBounds({ x: x + width - 10, y: y, width: 10, height: 10 })

        win.on('resize', () => {
            const bnds = win.getBounds()
            rt.setBounds({ x: rect.x + bnds.width - widthOff - rect.x - 10, y: rect.y, width: 10, height: 10 })
        })

        rt.webContents.on('focus', () => {
            win.webContents.focus()
        })


        const rb = new BrowserView({ webPreferences: {
            javascript: false,
            contextIsolation: true,
            webviewTag: false,
            zoomFactor: 1.0,
            scrollBounce: false
        }})

        rb.webContents.loadFile(path.join(__dirname, '../pages/round/rb.html'))
        win.addBrowserView(rb)

        rb.setBounds({ x: x + width - 10, y: y + height - 10, width: 10, height: 10 })

        win.on('resize', () => {
            const bnds = win.getBounds()
            rb.setBounds({ x: rect.x + bnds.width - widthOff - rect.x - 10, y: rect.y + bnds.height - heightOff  - rect.y - 10, width: 10, height: 10 })
        })

        rb.webContents.on('focus', () => {
            win.webContents.focus()
        })

        ipcMain.on('set-theme-color', (_e: Event, color: string) => {
            [lt, lb, rt, rb].forEach((v) => {
                v.webContents.insertCSS(
                `div:before {
                    color: ${color} !important;
                }`)
            })
        })


        this.view.webContents.on('enter-html-full-screen', () => {
            win.removeBrowserView(lt)
            win.removeBrowserView(lb)
            win.removeBrowserView(rt)
            win.removeBrowserView(rb)
        })

        this.view.webContents.on('leave-html-full-screen', () => {
            win.addBrowserView(lt)
            lt.setBounds({ x: x, y: y, width: 10, height: 10 })
            win.addBrowserView(lb)
            win.addBrowserView(rt)
            win.addBrowserView(rb)
        })

        win.on('leave-full-screen', () => {
            // if (this.isHTMLFullScreen) {
                win.addBrowserView(lt)
                lt.setBounds({ x: x, y: y, width: 10, height: 10 })
                win.addBrowserView(lb)
                win.addBrowserView(rt)
                win.addBrowserView(rb)
            // }
        })
    }
}

