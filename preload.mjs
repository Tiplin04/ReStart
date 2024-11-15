import { contextBridge, ipcRenderer } from 'electron';
console.log(`preload`)
contextBridge.exposeInMainWorld('electron', {
    on: (channel, callback) => ipcRenderer.on(channel, callback),
    sendAction: (action) => ipcRenderer.send('action', action),
});
