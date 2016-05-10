const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow, menu;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    title: 'Quark',
    width: 1240,
    height: 720,
    webPreferences: {
      defaultFontFamily: 'sansSerif',
      defaultEncoding: 'UTF-8'
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/app/index.html');

  // Set up menu
  // mainWindow.setMenu(null);
  /*menu = new electron.Menu();
  menu.append(new electron.MenuItem({
    label: 'Quark 0.1.0'
  }));
  mainWindow.setMenu(menu);*/
  mainWindow.setAutoHideMenuBar(true);
  mainWindow.setMenuBarVisibility(false);

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
