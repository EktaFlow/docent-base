const { app, BrowserWindow } = require('electron')
const path = require('path');
const url = require('url');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })
  win.webContents.openDevTools()
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
  // console.log(_dirname)
  // win.loadURL(`file://${__dirname}/src/index.html`);
  // win.loadFile('./src/index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
