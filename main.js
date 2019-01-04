const {app, BrowserWindow} = require('electron');
const log = require("electron-log");

// global reference to window so we can keep in memory until we want to close it
let win

/** 
 * Encloses the application life cycle in a class 
 */
class App {
    /**
     * @constructor
     */
    constructor() {
        // initialize all required class/function dependencies here

    }

    // functions go below
    /**
     * main event listeners for each stage of app lifecycle
     */
    eventListeners() {
        app.on('ready', this.readyEventHandler.bind(this));
        app.on('window-all-closed', this.allclosedEventHandler.bind(this));
        app.on('activate', this.activateEventHandler.bind(this));
    }

    /**
     * prepares and displays main window
     */
    readyEventHandler() {
        // temp function
        createWindow();
    }

    /**
     * quits application when all windows are closed
     */
    allclosedEventHandler() {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    }

    /**
     * for loading from dock or tray
     */
    activateEventHandler() {
        if (win !== null) {
            createWindow();
        }
    }
}

/* App starts go below */
// start app
const appInst = new App();
appInst.eventListeners();

    /**
     * temp create main window function, to be replaced by window preparer
     */
    function createWindow() {
        // create browser window
        win = new BrowserWindow({ width: 800, height: 600 });
    
        // load index html as main page
        win.loadFile('index.html');
        
        // dev tools
        win.webContents.openDevTools();

        // window closed event
        win.on('closed', () => {
            // window is removed from memory, if app has multiple windows,
            // use window array and remove that particular element.
            win = null;
        })
    }

// testing suites go below