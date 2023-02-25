
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
    handlePageTitleUpdated: (callback: () => void) => ipcRenderer.on('page-title-updated', callback),
    handlePageURLUpdated: (callback: () => void) => ipcRenderer.on('page-url-updated', callback),
    setUrl: (url: string) => ipcRenderer.send('set-url', url),

    focusView: () => ipcRenderer.send('focus-view')
})

