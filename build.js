var electronInstaller = require('electron-winstaller');

var settings = {
  appDirectory: '../old-desktop/docent2_redux/docent',
  outputDirectory: './installers',
  authors: 'Ekta Flow',
  exe: 'docent.exe'
};

resultPromise = electronInstaller.createWindowsInstaller(settings);
resultPromise.then(() => {
  console.log("the installers were successful");
}, (e) => {
  console.log('did not work... ${e.message}')
})
