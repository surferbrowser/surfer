import { BrowserView, BrowserWindow, Rectangle, ipcMain } from 'electron'
import * as path from 'path'

import { View } from './View'
import Rect from './Rect'

export class Views {
    win: BrowserWindow
    rect: Rectangle
    views: Array<View>
    currentView: View
    constructor(win: BrowserWindow, rect: Rect) {
        this.win = win
        this.rect = rect

        this.views = [new View(this.win, this.rect)]
    }

    changeToView(index: number): void {
        if (index < 0 || index >= this.views.length) {
            throw Error('Couldn\'t change to an out of bounds view')
        }
        this.win.removeBrowserView(this.currentView.view)
        this.win.addBrowserView(this.views[index].view)
    }
}

export class RoundViews extends Views {
    lt: BrowserView
    lb: BrowserView
    rt: BrowserView
    rb: BrowserView
    constructor(win: BrowserWindow, rect: Rect) {
        super(win, rect)

        this.currentView = this.views[0]

        this.views[1] = new View(this.win, this.rect)
        this.views[1].view.webContents.loadURL('https://example.com')
        this.win.removeBrowserView(this.views[1].view)
        setTimeout(() => {
            this.changeToView(1)
            setTimeout(() => {
                this.changeToView(0)
            }, 6000)
        }, 6000)

        const { x, y, width, height } = this.views[0].view.getBounds()

        const widthOff = this.win.getBounds().width - rect.width - rect.x
        const heightOff = this.win.getBounds().height - rect.height  - rect.y

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

        ipcMain.on('set-theme-color', (_e: Event, color: string) => {
            [this.lt, this.lb, this.rt, this.rb].forEach((v) => {
                v.webContents.insertCSS(
                `div:before {
                    color: ${color} !important;
                }`)
            })
        })


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
            // if (this.isHTMLFullScreen) {
                this.win.addBrowserView(this.lt)
                this.lt.setBounds({ x: x, y: y, width: 10, height: 10 })
                this.win.addBrowserView(this.lb)
                this.win.addBrowserView(this.rt)
                this.win.addBrowserView(this.rb)
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

