
import { ipcRenderer } from "electron"

window.addEventListener("DOMContentLoaded", () => {
    if (window.location.href !== 'https://www.google.com/') return

    const fontLinkOne = document.createElement('link')
    fontLinkOne.setAttribute('rel', 'preconnect')
    fontLinkOne.setAttribute('href', 'https://fonts.googleapis.com')

    const fontLinkTwo = document.createElement('link')
    fontLinkTwo.setAttribute('rel', 'preconnect')
    fontLinkTwo.setAttribute('href', 'https://fonts.gstatic.com')
    fontLinkTwo.setAttribute('crossorigin', '')

    const fontLinkThree = document.createElement('link')
    fontLinkThree.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Roboto&display=swap')
    fontLinkThree.setAttribute('rel', 'stylesheet')

    document.head.appendChild(fontLinkOne)
    document.head.appendChild(fontLinkTwo)
    document.head.appendChild(fontLinkThree)

    const logo = <HTMLImageElement>(document.querySelector('.lnXdpd'))

    logo.srcset = `http://localhost:8888/coloredLogo.png`

    logo.ondragstart = () => false

    logo.style.userSelect = 'none'
    
    document.body.style.backgroundColor = '#CCE3FF'

    document.querySelector('.o3j99.c93Gbe').remove()
    
    document.querySelector('.FPdoLc.lJ9FBc').remove()
    
    document.getElementById('SIvCob').remove()

    document.querySelector('.nDcEnd').remove()

    const middlePart = document.querySelector('.o3j99.LLD4me.yr19Zb.LS8OJ')

    const spacerEl = document.createElement('div')

    spacerEl.style.height = '104px'

    middlePart.parentNode.insertBefore(spacerEl, middlePart)
    
    document.querySelector('.lJ9FBc').remove();

    (document.querySelector('.aajZCb') as HTMLElement).style.marginBottom = '10px';

    (document.querySelector('.QCzoEc.z1asCe.MZy1Rb').children[0].firstChild as SVGElement).style.color = '#5e6369';

    (document.querySelector('input.gLFyf') as HTMLInputElement).setAttribute('placeholder', 'Search Google or type a URL');
    
    const cssText = `
    input.gLFyf::placeholder {
        color: #5e6369; font-family: Roboto
    }

    input.gLFyf {
        margin-top: -36px;
        margin-left: 1px;
    }

    .WggQGd {
        color: #000 !important;
    }

    .sbic.sb27 {
        filter: hue-rotate(5deg) brightness(0.62) saturate(1.05)
    }

    li.sbct {
        min-height: 44px;
    }

    .RNNXgb {
        box-shadow: 0 1px 6px rgb(32 33 36 / 28%) !important;
        border-color: rgba(223,225,229,0) !important;

        height: 42px !important;
    }

    .A8SBwf {
        width: 561px !important;
        padding-top: 18px !important;
    }

    .iblpc {
        margin-left: 3px !important;
    }

    .XDyW0e {
        padding: 0 6.5px !important;
    }
    `

    const style = document.createElement('style')

    style.appendChild(document.createTextNode(cssText))

    document.head.appendChild(style)

    const logoCont = document.querySelector('.o3j99.LLD4me.yr19Zb.LS8OJ')
    const searchCont = document.querySelector('.o3j99.ikrT4e.om7nvf')

    const container = document.createElement('div')
    container.style.display = 'flex'
    container.style.flexDirection = 'column'
    container.style.alignItems = 'center'
    container.style.width = '100vw'
    
    document.querySelector('.L3eUgb').insertBefore(container, logoCont)
    container.appendChild(logoCont)
    container.appendChild(searchCont)

    const voiceSearchIcon = document.querySelector('.goxjub') as SVGElement
    voiceSearchIcon.setAttribute('viewBox', '0 0 28 28')
    voiceSearchIcon.style.marginTop = '4px'

    const reportButton = document.getElementById('sbfblt')

    reportButton.remove()
})

