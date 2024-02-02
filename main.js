const { app, BrowserWindow } = require("electron");
app.on("will-finish-launching", () => {
  app.applicationSupportsSecureRestorableState = true;
});

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL("http://localhost:3000"); 
    win.webContents.openDevTools();

    win.on("closed", () => {
     
      win = null;
    });
  
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
