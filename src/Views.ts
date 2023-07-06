import { BrowserView, BrowserWindow, Rectangle, ipcMain, session, webContents } from 'electron'
import * as path from 'path'

import { View } from './View'
import Rect from './Rect'
import { ElectronChromeExtensions } from 'electron-chrome-extensions'

export class Views {
    win: BrowserWindow
    rect: Rectangle
    views: Array<View>
    currentView: View
    // extensions: ElectronChromeExtensions
    // constructor(win: BrowserWindow, rect: Rect, extensions: ElectronChromeExtensions) {
    constructor(win: BrowserWindow, rect: Rect) {
        this.win = win
        this.rect = rect

        this.views = [new View(this.win, this.rect)]
        this.currentView = this.views[0]

        this.currentView.view.webContents.once('did-finish-load', () => {
            ipcMain.emit('corner-ready')
        })

        // this.extensions = extensions

        this.assignListeners(this.currentView)

        ipcMain.on('set-url', (_ev: Event, url: string) => {
            this.currentView.view.webContents.loadURL(url)
            this.currentView.view.webContents.focus()
        })

        ipcMain.on('go-back', () => {
            this.currentView.view.webContents.goBack()
        })

        ipcMain.on('go-forward', () => {
            this.currentView.view.webContents.goForward()
        })

        ipcMain.on('reload', () => {
            this.currentView.view.webContents.reload()
        })
    }

    getViewFromId(id: number): View {
        this.views.forEach((view) => {
            if (view.view.webContents.id === id) {
                return view
            }
        })
        return null
    }

    changeToView(id: number): void {
        this.win.removeBrowserView(this.currentView.view)
        this.win.addBrowserView(this.getViewFromId(id).view)
    }

    assignListeners(view: View): void {
        const sendCanGo = () => {
            this.win.webContents.send('can-go-back', view.view.webContents.canGoBack(), view.view.webContents.id)
            this.win.webContents.send('can-go-forward', view.view.webContents.canGoForward(), view.view.webContents.id)
        }

        view.view.webContents.on('page-title-updated', (_e, title) => {
            this.win.webContents.send('page-title-updated', title, view.view.webContents.id)
        })

        view.view.webContents.on('will-navigate', (_e, url) => {
            this.win.webContents.send('page-url-updated', url, view.view.webContents.id)

            sendCanGo()
        })

        view.view.webContents.on('did-navigate', (_e, url) => {
            this.win.webContents.send('page-url-updated', url, view.view.webContents.id)

            sendCanGo()

            // webContents.getAllWebContents().forEach((contents) => {
            //     if (contents.getURL().indexOf('chrome-extension://') === 0) {
            //         contents.openDevTools()
            //     }
            // })
        })

        // this.extensions.addTab(view.view.webContents, this.win)
    }
}

export class RoundViews extends Views {
    lt: BrowserView
    lb: BrowserView
    rt: BrowserView
    rb: BrowserView
    cornerCSSKeys: Array<string>
    // constructor(win: BrowserWindow, rect: Rect, extensions: ElectronChromeExtensions) {
    //     super(win, rect, extensions)
        constructor(win: BrowserWindow, rect: Rect) {
            super(win, rect)

        const { x, y, width, height } = this.views[0].view.getBounds()

        const widthOff = this.win.getBounds().width - rect.width - rect.x
        const heightOff = this.win.getBounds().height - rect.height  - rect.y

        this.cornerCSSKeys = Array(4)

        this.lt = new BrowserView({ webPreferences: {
            javascript: false,
            contextIsolation: true,
            webviewTag: false,
            zoomFactor: 1.0,
            scrollBounce: false
        }})

        this.lt.webContents.loadFile(path.join(__dirname, '../pages/round/lt.html'))
        this.win.addBrowserView(this.lt)

        this.lt.setBounds({ x: x, y: y, width: 10, height: 10 })

        this.lt.webContents.on('focus', () => {
            this.win.webContents.focus()
        })

        this.lt.webContents.once('did-finish-load', () => {
            ipcMain.emit('corner-ready')
        })


        this.lb = new BrowserView({ webPreferences: {
            javascript: false,
            contextIsolation: true,
            webviewTag: false,
            zoomFactor: 1.0,
            scrollBounce: false
        }})

        this.lb.webContents.loadFile(path.join(__dirname, '../pages/round/lb.html'))
        this.win.addBrowserView(this.lb)

        this.lb.setBounds({ x: x, y: y + height - 10, width: 10, height: 10 })

        this.win.on('resize', () => {
            const bnds = this.win.getBounds()
            this.lb.setBounds({ x: rect.x, y: rect.y + bnds.height - heightOff  - rect.y - 10, width: 10, height: 10 })
        })

        this.lb.webContents.on('focus', () => {
            this.win.webContents.focus()
        })

        this.lb.webContents.once('did-finish-load', () => {
            ipcMain.emit('corner-ready')
        })


        this.rt = new BrowserView({ webPreferences: {
            javascript: false,
            contextIsolation: true,
            webviewTag: false,
            zoomFactor: 1.0,
            scrollBounce: false
        }})

        this.rt.webContents.loadFile(path.join(__dirname, '../pages/round/rt.html'))
        this.win.addBrowserView(this.rt)

        this.rt.setBounds({ x: x + width - 10, y: y, width: 10, height: 10 })

        this.win.on('resize', () => {
            const bnds = this.win.getBounds()
            this.rt.setBounds({ x: rect.x + bnds.width - widthOff - rect.x - 10, y: rect.y, width: 10, height: 10 })
        })

        this.rt.webContents.on('focus', () => {
            this.win.webContents.focus()
        })

        this.rt.webContents.once('did-finish-load', () => {
            ipcMain.emit('corner-ready')
        })


        this.rb = new BrowserView({ webPreferences: {
            javascript: false,
            contextIsolation: true,
            webviewTag: false,
            zoomFactor: 1.0,
            scrollBounce: false
        }})

        this.rb.webContents.loadFile(path.join(__dirname, '../pages/round/rb.html'))
        this.win.addBrowserView(this.rb)

        this.rb.setBounds({ x: x + width - 10, y: y + height - 10, width: 10, height: 10 })

        this.win.on('resize', () => {
            const bnds = this.win.getBounds()
            this.rb.setBounds({ x: rect.x + bnds.width - widthOff - rect.x - 10, y: rect.y + bnds.height - heightOff  - rect.y - 10, width: 10, height: 10 })
        })

        this.rb.webContents.on('focus', () => {
            this.win.webContents.focus()
        })

        this.rb.webContents.once('did-finish-load', () => {
            ipcMain.emit('corner-ready')
        })

        // ipcMain.on('set-theme-color', (_e: Event, color: string) => {
        //     [this.lt, this.lb, this.rt, this.rb].forEach((v) => {
        //         v.webContents.insertCSS(
        //         `div:before {
        //             color: ${color} !important;
        //         }`)
        //     })
        // })


        this.currentView.view.webContents.on('enter-html-full-screen', () => {
            this.win.removeBrowserView(this.lt)
            this.win.removeBrowserView(this.lb)
            this.win.removeBrowserView(this.rt)
            this.win.removeBrowserView(this.rb)
        })

        this.currentView.view.webContents.on('leave-html-full-screen', () => {
            this.win.addBrowserView(this.lt)
            this.lt.setBounds({ x: x, y: y, width: 10, height: 10 })
            this.win.addBrowserView(this.lb)
            this.win.addBrowserView(this.rt)
            this.win.addBrowserView(this.rb)
        })

        this.win.on('leave-full-screen', () => {
            this.win.addBrowserView(this.lt)
            this.lt.setBounds({ x: x, y: y, width: 10, height: 10 })
            this.win.addBrowserView(this.lb)
            this.win.addBrowserView(this.rt)
            this.win.addBrowserView(this.rb)
        })
    }

    assignListeners(view: View): void {
        super.assignListeners(view)

        view.view.webContents.on('did-change-theme-color', (_e: Event, color: string) => {
            // view.view.webContents.id;

            // [this.lt, this.lb, this.rt, this.rb].forEach((v, i) => {
            //     if (this.cornerCSSKeys[i] !== null) {
            //         v.webContents.removeInsertedCSS(this.cornerCSSKeys[i])
            //     }
            //     if (color !== null) {
            //         v.webContents.insertCSS(
            //         `div:before {
            //             color: ${color} !important;
            //         }`).then((value) => {
            //             this.cornerCSSKeys[i] = value
            //         })
            //     } else {
            //         v.webContents.insertCSS(
            //         `div:before {
            //             color: #ffffff !important;
            //         }`).then((value) => {
            //             this.cornerCSSKeys[i] = value
            //         })
            //     }
            // })
            // if (color !== null && color !== undefined) {
            //     ipcMain.emit('theme-color-changed', color)
            // }
        })
    }

    raiseCorners(): void {
        this.win.setTopBrowserView(this.lt)
        this.win.setTopBrowserView(this.lb)
        this.win.setTopBrowserView(this.rt)
        this.win.setTopBrowserView(this.rb)
    }

    changeToView(index: number): void {
        super.changeToView(index)

        this.raiseCorners()
    }
}

