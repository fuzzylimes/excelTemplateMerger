const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  openFileDialog: async () => ipcRenderer.invoke('open-file-dialog'),
  performMerge: async (sourceFilePath, inputFilePath) => ipcRenderer.invoke('perform-merge', sourceFilePath, inputFilePath)
});
