
const tabTitle = document.querySelector('.tabTitle') as HTMLDivElement

window.api.handlePageTitleUpdated((_ev: Event, title: string) => {
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

window.api.handlePageURLUpdated((_ev: Event, newUrl: string) => {
    url = newUrl

    tabInput.value = url

    if (url === 'about:blank') {
        tabTitle.innerText = 'about:blank'
    }
})

document.addEventListener('keydown', (ev: KeyboardEvent) => {
    if (ev.key === 'Enter') {
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

