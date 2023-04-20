
const buttons = document.querySelectorAll('.button') as NodeListOf<HTMLDivElement>

buttons.forEach((button) => {
    let timeout: NodeJS.Timeout = null
    let timeoutReached = false
    let isMouseDown = false

    button.addEventListener('mousedown', () => {
        // button.className = 'button active'
        button.classList.add('active')
        isMouseDown = true
        timeoutReached = false

        clearTimeout(timeout)
        timeout = setTimeout(() => {
            timeoutReached = true
            if (!isMouseDown) {
                // button.className = 'button'
                button.classList.remove('active')
            }
        }, 200)
    })

    document.addEventListener('mouseup', () => {
        isMouseDown = false
        if (timeoutReached) {
            // button.className = 'button'
            button.classList.remove('active')
        }
    })
})

const backButton = document.querySelector('#back')
const forwardButton = document.querySelector('#forward')
const reloadButton = document.querySelector('#reload')

backButton.addEventListener('click', () => {
    if (!backButton.classList.contains('disabled')) {
        window.api.goBack()
    }
})

forwardButton.addEventListener('click', () => {
    if (!forwardButton.classList.contains('disabled')) {
        window.api.goForward()
    }
})

reloadButton.addEventListener('click', () => {
    if (!reloadButton.classList.contains('disabled')) {
        window.api.reload()
    }
})

//TODO

window.api.handleCanGoBack((canGoBack: boolean) => {
    console.log('can go back: ' + canGoBack)
    if (canGoBack) {
        console.log('removing')
        backButton.classList.remove('disabled')
    } else {
        console.log('adding')
        backButton.classList.add('disabled')
    }
})

window.api.handleCanGoForward((canGoForward: boolean) => {
    console.log('can go forward: ' + canGoForward)
    if (canGoForward) {
        forwardButton.classList.remove('disabled')
    } else {
        forwardButton.classList.add('disabled')
    }
})


// const trafficMargin = document.getElementById('trafficMargin')

// let timeout: NodeJS.Timeout = null

// trafficMargin.addEventListener('mouseenter', () => {
//     timeout = setTimeout(() => {
//         trafficMargin.style.minWidth = '74px'
//         window.api.showTraffic()
//         setTimeout(() => {
//             window.api.hideTraffic()
//             trafficMargin.style.minWidth = '6px'
//         }, 2000)
//     }, 1000)
// })

// trafficMargin.addEventListener('mouseleave', () => {
//     clearTimeout(timeout)
//     // trafficMargin.style.minWidth = '6px'
//     // window.api.hideTraffic()
// })


const tabTitle = document.querySelector('.tabTitle') as HTMLDivElement

window.api.handlePageTitleUpdated((title: string) => {
    tabTitle.innerText = title
})

const tabInput = document.querySelector('.tabInput') as HTMLInputElement

const tab = document.querySelector('.tab') as HTMLDivElement

let tabInputFocused = false

tab.addEventListener('click', () => {
    if (!tabInputFocused) {
        tabTitle.style.display = 'none'
        tabInput.style.display = 'block'
        tabInput.focus()
    }
})

let url = ''

tabInput.addEventListener('focus', () => {
    tabInputFocused = true

    tabInput.select()

    tab.style.userSelect = 'text'
    tab.style.cursor = 'text'
})

tabInput.addEventListener('blur', () => {
    tabInputFocused = false
    tabTitle.style.display = 'block'
    tabInput.style.display = 'none'
    tabInput.value = ''
    tabInput.value = url

    tab.style.cursor = 'default'
})

window.api.handlePageURLUpdated((newUrl: string) => {
    url = newUrl

    tabInput.value = url

    if (url === 'about:blank') {
        tabTitle.innerText = 'about:blank'
    }
})

document.addEventListener('keydown', (ev: KeyboardEvent) => {
    if (ev.key === 'Enter' && tabInputFocused) {
        if (tabInput.value.includes('://') || tabInput.value === 'about:blank') {
            window.api.setUrl(tabInput.value)
        } else {
            window.api.setUrl('http://' + tabInput.value)
        }

        tabInput.blur()
        window.api.focusView()
    }
})

window.api.handleSetThemeColor((_e: Event, color: string) => {
    document.body.style.setProperty('--dark-blue', color)
    // document.body.style.setProperty('--light-blue', color)
})

