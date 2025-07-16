const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  startClicker: (settings) => ipcRenderer.send('start-clicker', settings),
  stopClicker: () => ipcRenderer.send('stop-clicker'),
  getStatus: () => ipcRenderer.send('get-status'),
  onStatus: (callback) => ipcRenderer.on('clicker-status', (event, data) => callback(data)),
  onError: (callback) => ipcRenderer.on('clicker-error', (event, error) => callback(error)),
  onToggle: (callback) => ipcRenderer.on('toggle-clicker', () => callback()),
  removeAllListeners: () => {
    ipcRenderer.removeAllListeners('clicker-status');
    ipcRenderer.removeAllListeners('clicker-error');
    ipcRenderer.removeAllListeners('toggle-clicker');
  }
});
