const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const path = require('path');
const autoclicker = require('./autoclicker');

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 500,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    icon: null,
    title: 'heheautoclicker'
  });
  
  mainWindow.loadFile('index.html');

  // Register a global shortcut (F8) to toggle auto-clicker
  globalShortcut.register('F8', () => {
    if (mainWindow) {
      mainWindow.webContents.send('toggle-clicker');
    }
  });

  // Remove menu bar
  mainWindow.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

// IPC Handlers
ipcMain.on('start-clicker', (event, settings) => {
  try {
    // Validate settings (interval and clickType)
    if (typeof settings.interval !== 'number' || settings.interval < 1) {
      throw new Error('Invalid interval setting. Must be at least 1ms.');
    }
    if (!['left', 'middle', 'right'].includes(settings.clickType)) {
      throw new Error('Invalid click type. Must be left, middle, or right.');
    }
    
    autoclicker.start(settings.interval, settings.clickType);
    event.reply('clicker-status', { running: true });
  } catch (error) {
    event.reply('clicker-error', error.message);
  }
});

ipcMain.on('stop-clicker', (event) => {
  try {
    autoclicker.stop();
    event.reply('clicker-status', { running: false });
  } catch (error) {
    event.reply('clicker-error', error.message);
  }
});

ipcMain.on('get-status', (event) => {
  event.reply('clicker-status', { running: autoclicker.isRunning() });
});
