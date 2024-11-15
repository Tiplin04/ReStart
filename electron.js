import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

let mainWindow;

// Если нужен __dirname в ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'), // Если используется
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    process.env.NODE_ENV === 'development'
      ? `file://${path.join(__dirname, 'dist/index.html')}` // React dev server
      : `file://${path.join(__dirname, 'dist/index.html')}` // Для продакшн-сборки
  );

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('action', (event, arg) => {
    if (arg === 'no') {
        // Закрыть explorer.exe
        exec('taskkill /f /im explorer.exe', (err) => {
            if (err) {
                console.error('Ошибка при закрытии explorer.exe:', err);
            }
        });

        // Перезагрузить компьютер
        exec('shutdown /r /f /t 0', (err) => {
            if (err) {
                console.error('Ошибка при перезагрузке:', err);
            }
        });
    }
});
