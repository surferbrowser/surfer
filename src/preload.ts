
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
    // Handlers
    handlePageTitleUpdated: (callback: () => void) => ipcRenderer.on('page-title-updated', callback),
    handlePageURLUpdated: (callback: () => void) => ipcRenderer.on('page-url-updated', callback),

    handleFullscreenEntered: (callback: () => void) => ipcRenderer.on('fullscreen-entered', callback),
    handleFullscreenLeft: (callback: () => void) => ipcRenderer.on('fullscreen-left', callback),

    handleSetThemeColor: (callback: () => void) => ipcRenderer.on('set-theme-color', callback),

    // Setters
    setUrl: (url: string) => ipcRenderer.send('set-url', url),

    focusView: () => ipcRenderer.send('focus-view'),
});

