import fs from 'fs'
import request from 'request'

import * as path from 'path'

import Jimp from 'jimp'

import { exec } from 'child_process'

import { app } from "electron"

export function newTabPage(callback: () => void): void {

    const download = function(url: string, filename: string, callback: () => void) {
        if (fs.existsSync(path.join(__dirname, filename))) {
            callback()
            return
        }
        request.head(url, (_err: any, res: any) => {
            request(url).pipe(fs.createWriteStream(path.join(__dirname, filename))).on('close', callback)
        })
    }

    download('https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png', '../pages/new-tab/logo.png', () => {
        // colorLogo(66, 143, 239).then(() => {
        colorLogo(199, 183, 143).then(() => {
            const process = exec(`python3 -m http.server 1234 --directory "${path.join(__dirname, '../pages/new-tab')}"`)

            callback()

            app.on('before-quit', () => {
                process.kill()
            })
        })
    })
}


async function colorLogo(r: number, g: number, b: number): Promise<void> {
    if (fs.existsSync(path.join(__dirname, '../pages/new-tab/coloredLogo.png'))) {
        return
    }
    const image = await Jimp.read(path.join(__dirname, '../pages/new-tab/logo.png'))

    image.color([{ apply: 'darken', params: [100] }])

    image.color([{ apply: 'red', params: [r] }])
    image.color([{ apply: 'green', params: [g] }])
    image.color([{ apply: 'blue', params: [b] }])

    image.write(path.join(__dirname, '../pages/new-tab/coloredLogo.png'))
}