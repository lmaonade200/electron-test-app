const {app, BrowserWindow} = require('electron')

// global reference to window so we can keep in memory until we want to close it
let win

function initialize() {
    // window constants

    // Create Initial window
    function createWindow() {
        // create browser window
        win = new BrowserWindow({ width: 800, height: 600 })
    
        // load index html as main page
        win.loadFile('index.html')
        
        // dev tools
        win.webContents.openDevTools()

        // window closed event
        win.on('closed', () => {
            // window is removed from memory, if app has multiple windows,
            // use window array and remove that particular element.
            win = null
        })
    }

    // ran after all electron initialization has finished
    app.on('ready', createWindow)
    
    // all windows closed event
    app.on('window-all-closed', () => {
        // conditional for macOS
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })

    // re-activating window from either tray or macOS dock
    app.on('activate', () => {
        if (win === null) {
            createWindow()
        }
    })
}

initialize()