import { contextBridge, ipcRenderer } from 'electron';
console.log(`preload`)
contextBridge.exposeInMainWorld('electron', {
    sendAction: (action) => ipcRenderer.send('action', action),
});
