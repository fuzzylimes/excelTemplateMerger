const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Path to your preload script
      contextIsolation: true, // Protect against prototype pollution
      enableRemoteModule: false, // Turn off remote
      nodeIntegration: false
    },
  });

  if (isDev) {
    win.loadURL('http://localhost:9000'); // Load from webpack dev server
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, 'dist/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('open-file-dialog', async (event, arg) => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'] // 'openFile' for a single file, 'openDirectory' for a directory
  });
  if (result.canceled) {
    return '';
  } else {
    return result.filePaths[0]; // return the selected file path
  }
});