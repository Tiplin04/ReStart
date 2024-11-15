import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";

let mainWindow;
let secondWindow;

// Если нужен __dirname в ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"), // Если используется
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    process.env.NODE_ENV === "development"
      ? "http://localhost:5173" // React dev server
      : `file://${path.join(__dirname, "dist/index.html")}` // Для продакшн-сборки
  );

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("action", (event, arg) => {
  if (arg === "shutdown") {
    // Закрыть explorer.exe
    exec("taskkill /f /im explorer.exe", (err) => {
      if (err) {
        console.error("Ошибка при закрытии explorer.exe:", err);
      }
    });

    // Перезагрузить компьютер
    exec("shutdown /r /f /t 0", (err) => {
      if (err) {
        console.error("Ошибка при перезагрузке:", err);
      }
    });
  }

  if (arg === 'no') {
    createSecondWindow();
  }
});

function createSecondWindow() {
  secondWindow = new BrowserWindow({
    width: 400,
    height: 300,
    fullscreen: false,
    // parent: mainWindow, // если хотите, чтобы окно было дочерним
    modal: false, // делает окно модальным, т.е. оно будет поверх других окон
    frame: true, // убирает стандартную рамку окна (кнопки, заголовок)
    resizable: false, // отключает изменение размера
    fullscreenable: true, // отключает полноэкранный режим
    alwaysOnTop: true, // окно будет всегда поверх других окон
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"), // Если используется
      nodeIntegration: true,
    },
  });

  secondWindow.loadURL(
    process.env.NODE_ENV === "development"
      ? "http://localhost:5173" // React dev server
      : `file://${path.join(__dirname, "dist/index.html")}` // Для продакшн-сборки
  );

  secondWindow.webContents.on("did-finish-load", () => {
    // Пример данных, которые можно отправить в рендерный процесс
    const data = { route: "second" };
    secondWindow.webContents.send("initial-data", data); // Отправляем данные в рендерный процесс
  });

  // Запрещаем закрытие окна
  secondWindow.on("close", (event) => {
    event.preventDefault(); // отменяет закрытие
  });

  secondWindow.on("closed", () => {
    secondWindow = null;
  });
}
