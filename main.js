const electron = require('electron');

const url = require('url');
const path = require('path');


// const app = electron.app;
// const BrowserWindow = electron.BrowserWindow;

const {
    app,
    BrowserWindow,
    Menu,
    ipcMain,
    ipcRenderer
} = electron;

let mainWindow;


app.on('ready', () => {
    console.log(process.platform);
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);

    ipcMain.on("key", (err, data) => {
        console.log(data);
    });
    ipcMain.on('key2', (err, data) => {
        console.log(data);
    });
});
const mainMenuTemplate = [{
    label: "Dosya",
    submenu: [{
            label: "Yeni Submenuuu",
            accelerator: process.platform == "darwin" ? "Command+P" : "Ctrl+P",
            role: "print"

        },
        {
            label: "Çıkış",
            accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+M",
            role: "quit"
        }
    ]
}]

if (process.platform == "darwin") {
    mainMenuTemplate.unshift({
        label: app.getName(),
        role: "TODO"
    })


}

if (process.env.NODE_ENV !== "production") {
    mainMenuTemplate.push({
        label: "Dev Tools",
        submenu: [{
                label: "Geliştirici Araçları",
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                label: "Yenile",
                role: "reload"
            }
        ]
    })
}