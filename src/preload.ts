
import { contextBridge, ipcRenderer } from 'electron'

// import { injectBrowserAction } from '../node_modules/electron-chrome-extensions/dist/browser-action.js'
// import { injectBrowserAction } from 'electron-chrome-extensions/dist/browser-action.js'

// Inject <browser-action-list> element into our page

// injectBrowserAction()

contextBridge.exposeInMainWorld('api', {
    // Handlers
    handlePageTitleUpdated: (callback: (title: string, tabid: number) => void) => ipcRenderer.on('page-title-updated', (_e, title: string, tabid: number) => callback(title, tabid)),
    handlePageURLUpdated: (callback: (url: string, tabid: number) => void) => ipcRenderer.on('page-url-updated', (_e, url: string, tabid: number) => callback(url, tabid)),

    handleFullscreenEntered: (callback: () => void) => ipcRenderer.on('fullscreen-entered', callback),
    handleFullscreenLeft: (callback: () => void) => ipcRenderer.on('fullscreen-left', callback),

    handleSetThemeColor: (callback: () => void) => ipcRenderer.on('set-theme-color', callback),

    handleCanGoBack: (callback: (can: boolean, tabid: number) => void) => ipcRenderer.on('can-go-back', (_e, can: boolean, tabid: number) => callback(can, tabid)),

    handleCanGoForward: (callback: (can: boolean, tabid: number) => void) => ipcRenderer.on('can-go-forward', (_e, can: boolean, tabid: number) => callback(can, tabid)),

    // Setters
    setUrl: (url: string) => ipcRenderer.send('set-url', url),

    showTraffic: () => ipcRenderer.send('show-traffic'),
    hideTraffic: () => ipcRenderer.send('hide-traffic'),

    goBack: () => ipcRenderer.send('go-back'),
    goForward: () => ipcRenderer.send('go-forward'),
    reload: () => ipcRenderer.send('reload'),
});

