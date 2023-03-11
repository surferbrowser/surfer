
export default class Rect {
    x: number
    y: number
    width: number
    height: number
    constructor(width: number, height: number, x?: number, y?: number) {
        this.x = typeof x !== 'undefined' ? x : 0
        this.y = typeof y !== 'undefined' ? y : 0
        this.width = width
        this.height = height
    }
}