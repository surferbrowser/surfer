import fs from 'fs'
import request from 'request'

import * as path from 'path'

import Jimp from 'jimp'

import { app, session } from 'electron'
import 'path'

function download(url: string, filename: string, callback: () => void) {
    if (fs.existsSync(path.join(__dirname, filename))) {
        callback()
        return
    }
    request.head(url, () => {
        request(url).pipe(fs.createWriteStream(path.join(__dirname, filename))).on('close', callback)
    })
}

export function newTabPage(done: () => void): void {

    // session.fromPartition('persist:userSession').setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.101 Safari/537.36','en-US,en')
    
    const ses = session.fromPartition('persist:userSession')

    download('https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png', '../pages/new-tab/logo.png', () => {
        colorLogo(66, 143, 239).then(() => {
        // colorLogo(199, 183, 143).then(() => {
            const ses = session.fromPartition('persist:userSession')

            ses.protocol.registerFileProtocol('newtab', (request, protocolCallback) => {
                const url = request.url.endsWith('/') ? request.url.slice(0, request.url.length - 1) : request.url

                if (url === 'newtab://logo') {
                    protocolCallback(`${path.join(__dirname, '../pages/new-tab/coloredLogo.png')}`)
                    return
                } else if (url.replace('newtab://', '').indexOf('fonts/') === 0 && url.length > 'newtab://fonts/'.length) {
                    protocolCallback(`${path.join(__dirname, '../pages/fonts/', url.replace('newtab://fonts/', ''))}`)
                    return
                }

                protocolCallback('')
            })

            // ses.protocol.registerHttpProtocol('surfer', (request, protocolCallback) => {
            //     console.log(request.url)
            //     const url = request.url.endsWith('/') ? request.url.slice(0, request.url.length - 1) : request.url
            //     if (url.replace('surfer://', '').indexOf('new-tab-page') === 0) {
            //         const responseURL = url.replace('surfer://new-tab-page', 'https://www.google.com')
            //         protocolCallback({ url: responseURL, method: 'GET', referrer: responseURL })
            //         // protocolCallback(`${path.join(__dirname, '../pages/main/index.html')}`)
            //     }
            // })

            done()
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