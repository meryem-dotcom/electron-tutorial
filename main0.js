const electron = require('electron');

const url = require('url');
const path = require('path');


// const app = electron.app;
// const BrowserWindow = electron.BrowserWindow;



const {
    app,
    BrowserWindow

} = electron;

let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // and load the index.html of the app.
    win.loadFile('index.html');



    // Open the DevTools.
    win.webContents.openDevTools()

    // Pencere kapatıldığında ortaya çıkar.
    win.on('closed', () => {
        console.log('pencere kapanıyor');
        //Pencere nesnesini referans dışı bırakın,
        // uygulamanız çoklu pencereleri destekliyorsa genellikle pencereleri
        // bir dizide saklarsınız, bu, ilgili öğeyi silmeniz gereken zamandır.
        win = null
    })
}







app.on('ready', createWindow);
// app.on('window-all-closed', () => {
//     console.log('kapanıyor');
// });