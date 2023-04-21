
// (function mockChromeUserAgent() {
//     const oiginalVoices = window.speechSynthesis.getVoices();
//     window.speechSynthesis.getVoices = function () {
//         return [
//         {
//             voiceURI: "Google US English",
//             name: "Google US English",
//             lang: "en-US",
//             localService: false,
//             default: false,
//         },
//         ];
//     };

//     //wait some arbitraty time before cleaning up the mess we did previously
//     setTimeout(() => {
//         window.speechSynthesis.getVoices = function () {
//             return oiginalVoices;
//         };
//     }, 10_000);
// })();

window.addEventListener("DOMContentLoaded", () => {

    // Outline color correction to resemble other browsers

    const outlineColorStyle = document.createElement('style')

    outlineColorStyle.innerHTML = `* {
        outline-color: #1A5FCC;
    }`

    console.log(outlineColorStyle)

    console.log(document.head.appendChild(outlineColorStyle))

    if (window.location.href !== 'https://www.google.com/') return
    // if (window.location.href !== 'surfer://new-tab-page/') return

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

    logo.srcset = `newtab://logo/`

    logo.ondragstart = () => false

    logo.style.userSelect = 'none'

    document.body.style.backgroundColor = '#CCE3FF'
    // document.body.style.backgroundColor = '#F8F6F1'

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

    (document.querySelector('textarea.gLFyf') as HTMLInputElement).setAttribute('placeholder', 'Search Google or type a URL');

    (document.querySelector('div.xtSCL') as HTMLDivElement).remove();

    const cssText = `
    @font-face {
        font-family: 'Inter Tight';
        src: url('newtab://fonts/InterTight-VariableFont_wght.ttf');
    }

    textarea.gLFyf::placeholder {
        color: #172739;
        a-font-family: Roboto;
        font-family: 'Inter Tight';
        font-weight: 550;

        user-select: none;
    }

    textarea.gLFyf {
        line-height: 26px !important;
        font-family: 'Inter Tight' !important;
        font-weight: 550;
    }

    .ACRAdd.M2vV3 {
        border-color: #17273933 !important;
    }

    .a4bIc {
        margin-top: 4px !important;
    }

    .WggQGd {
        color: #000 !important;
    }

    .sbic.sb27 {
        /*filter: hue-rotate(5deg) brightness(0.62) saturate(1.05);*/
        filter: hue-rotate(2deg) brightness(0.22) saturate(13.05);
        /*hue-rotate(2deg) brightness(0.22) saturate(13)*/
        /*hue-rotate(2deg) brightness(0.22) saturate(13.05)*/
    }

    .sbic.sb43 {
        filter: hue-rotate(2deg) brightness(0.22) saturate(13.05);
    }

    .ExCKkf.z1asCe.rzyADb {
        color: #172739;
    }

    li.sbct {
        min-height: 44px;
    }

    /*.A8SBwf.sbfc > .RNNXgb, */

    .A8SBwf.emcav > .RNNXgb {
        border-radius: 15px 15px 0 0 !important;
    }

    .RNNXgb {
        /*box-shadow: 0 1px 6px rgb(32 33 36 / 28%) !important;*/
        /*box-shadow: 0 1px 6px rgb(45 71 103 / 28%) !important;*/
        box-shadow: none !important;

        border-color: rgba(223,225,229,0) !important;
        border-radius: 15px !important;
        background: #e7f2ff !important;

        min-height: 42px !important;
    }

    .RNNXgb:hover {
        box-shadow: none !important;
    }

    .aajZCb {
        box-shadow: none !important;
        background: #E7F2FF !important;

        font-family: 'Inter Tight' !important;
        font-weight: 550;
        color: #172739 !important;
    }

    .A8SBwf {
        width: 561px !important;
        padding-top: 18px !important;
    }

    .iblpc {
        margin-left: 0px !important;
        /*padding-right: 10px !important;*/
    }

    .XDyW0e {
        padding: 0 6.5px !important;
    }

    a.gb_e {
        background: #E7F2FF;
    }

    .sbhl.sbct {
        background: #f5f9ff;
    }

    .wM6W7d {
        font-family: 'Inter Tight' !important;
        font-weight: 550;
        color: #172739 !important;
    }
    `

    const style = document.createElement('style')

    style.appendChild(document.createTextNode(cssText))

    document.head.appendChild(style)

    const searchSVG = `
    <svg width="16" height="16" viewBox="-2 -1 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="6" fill="#172739"/>
      <circle cx="6" cy="6" r="4" fill="#E7F2FF"/>
      <rect x="10.0562" y="8.64209" width="7.49885" height="2" rx="1" transform="rotate(45 10.0562 8.64209)" fill="#172739"/>
    </svg>
    `

    document.querySelector('.QCzoEc.z1asCe.MZy1Rb').innerHTML = searchSVG

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

