const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  openFileDialog: async () => ipcRenderer.invoke('open-file-dialog')
});
