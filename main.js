const { app, BrowserWindow } = require("electron");

var win;

function createWindow() {
	win = new BrowserWindow({width: 800, height: 600});

	win.loadFile('./www/index.html');

}

app.on('ready', createWindow);
