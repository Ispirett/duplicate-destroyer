const electron = require("electron");
const url = require("url");
const path = require("path");
//Setup
// main apis from electron

const { app, BrowserWindow, Menu, shell } = electron;
// shell allows us to open external windows

let mainWindow;

const settings = {
    width: 1000,
    height: 800,
    webPreferences: {
        nodeIntegration: true,
        preload: "fileManager.js"
    },
    webSecurity: false
};

//listen for app to br ready
app.on("ready", () => {
    //create a window and Setup settings
    mainWindow = new BrowserWindow(settings);
    // load html into window
    mainWindow.loadFile("client/windows/index.html");

    /*mainWindow.loadURL(
                        url.format({
                          pathname: path.join(__dirname, "index.html"),
                          protocol: "file:",
                          slashes: true
                        })
                      ); */

    mainWindow.on("ready-to-show", () => {
        mainWindow.show();
    });
    // Build menu from Template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // Set menu menu
    Menu.setApplicationMenu(mainMenu);
    mainWindow.webContents.openDevTools();
});
const mainMenuTemplate = [{
    label: "File",
    submenu: [{
            label: "Search Directory"
        },
        {
            label: "History",
            click() {
                shell.openExternal("http://facebook.com");
            }
        },
        {
            label: "Exit",
            accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
            click() {
                app.quit();
            }
        }
    ]
}];

console.log(process.env.HOME);