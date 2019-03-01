const { app, BrowserWindow } = require("electron");

var win;

function createWindow() {
	win = new BrowserWindow({width: 1200, height: 800});

	win.loadFile('./www/index.html');

	win.webContents.openDevTools()


}

app.on('ready', createWindow);
