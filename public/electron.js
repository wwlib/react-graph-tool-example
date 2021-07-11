const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
// Module to create a custom Menu
const Menu = electron.Menu;
// Module to handle the dialogs of clicks on the Menu
const dialog = electron.dialog;

// const ipcMain = electron.ipcMain;

const path = require('path');

let mainWindow;

let menuTemplate = [
    {
        label: 'Electron',
        submenu: [
            {
                label: 'Quit',
                accelerator: 'Command+Q',
                click: function () {
                    app.quit();
                }
            },
        ]
    },
    {
        label: 'File',
        submenu: [
            {
                label: "New Graph...",
                accelerator: 'Command+N',
                click: onMenuNewGraph,
            },
            {
                label: "Open Graph...",
                accelerator: 'Command+O',
                click: onMenuOpenGraph
            },
            {
                label: "Save Graph...",
                accelerator: 'Command+S',
                click: onMenuSaveGraph
            },
            {
                label: "Save Graph As...",
                accelerator: 'Command+Shift+S',
                click: onMenuSaveAsGraph
            },
            {
                type: "separator"
            },
            {
                label: "Set Project Root...",
                click: onMenuSetProjectRoot
            },
            {
                type: "separator"
            }
        ]
    },
    {
        label: "Edit",
        submenu: [
            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { type: "separator" },
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'Command+R',
                click: function () {
                    BrowserWindow.getFocusedWindow().reloadIgnoringCache();
                }
            },
            {
                label: 'Toggle DevTools',
                accelerator: 'Alt+Command+I',
                click: function () {
                    BrowserWindow.getFocusedWindow().toggleDevTools();
                }
            }
        ]
    }
];

let defaultProjectPath = './test-project';

const setProjectRootOptions = {
    defaultPath: defaultProjectPath,
    properties: ['createDirectory', 'openDirectory'],
    filters: []
}

const newGraphOptions = {
    defaultPath: defaultProjectPath,
    properties: ['createDirectory', 'promptToCreate'],
    filters: [{ name: "Graphs", extensions: ["bt", "json"] }]
}

const saveAsGraphOptions = {
    defaultPath: defaultProjectPath,
    properties: ['createDirectory'],
    filters: [{ name: "Graphs", extensions: ["bt", "json"] }]
}

const openGraphOptions = {
    defaultPath: defaultProjectPath,
    properties: ['openFile'],
    filters: [{ name: "Graphs", extensions: ["bt", "json"] }]
}

updateDefaultProjectPath = (defaultProjectPath) => {
    setProjectRootOptions.defaultPath = defaultProjectPath;
    newGraphOptions.defaultPath = defaultProjectPath;
    saveAsGraphOptions.defaultPath = defaultProjectPath;
    openGraphOptions.defaultPath = defaultProjectPath;
}

// Handles the 'Set Project Root' menu option
async function onMenuSetProjectRoot() {
    let directoryData = await dialog.showOpenDialog(setProjectRootOptions);
    // Send the event to the renderer
    console.log(directoryData);
    defaultProjectPath = directoryData.filePaths[0];
    console.log(`electron.js: defaultProjectPath:`, defaultProjectPath);
    if (defaultProjectPath) {
        updateDefaultProjectPath(defaultProjectPath);
        mainWindow.webContents.send('onSetProjectRoot', { directory: defaultProjectPath });
    }
}

// Handles the 'Open Graph' menu option
async function onMenuOpenGraph() {
    let files = await dialog.showOpenDialog(openGraphOptions);
    // let data = fs.readFileSync(files.filePaths[0], 'utf-8');
    // Send the event to the renderer - let it parse the JSON
    mainWindow.webContents.send('onOpenGraph', { files: files });
}

// Handles the 'New Graph' menu option
async function onMenuNewGraph() {
    let newFile = await dialog.showSaveDialog(newGraphOptions);
    // Send the event to the renderer
    mainWindow.webContents.send('onNewGraph', { filePath: newFile });
}

// Handles the 'Save Graph' menu option
async function onMenuSaveGraph() {
    // let newFile = await dialog.showSaveDialog(saveGraphOptions);
    // Send the event to the renderer
    mainWindow.webContents.send('onSaveGraph', { filePath: '' });
}

// Handles the 'Save Graph' menu option
async function onMenuSaveAsGraph() {
    let newFile = await dialog.showSaveDialog(saveAsGraphOptions);
    // Send the event to the renderer
    mainWindow.webContents.send('onSaveAsGraph', { filePath: newFile });
}

function createWindow() {
    // Create the browser window.
    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
    mainWindow = new BrowserWindow({ width: 1432, height: 1000, webPreferences: { nodeIntegration: true, enableRemoteModule: true } });

    // and load the index.html of the app.
    // console.log(__dirname);
    // mainWindow.loadURL('http://localhost:3000');
    mainWindow.loadFile(path.join(__dirname, "./index.html"));

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});
