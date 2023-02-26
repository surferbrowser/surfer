import { BrowserWindow, Rectangle } from 'electron'

import { View } from './View'
import Rect from './Rect'

export default class Views {
    win: BrowserWindow
    rect: Rectangle
    views: [View]
    constructor(win: BrowserWindow, rect: Rect) {
        this.win = win
        this.rect = rect

        this.views = [new View(this.win, this.rect)]
    }
}