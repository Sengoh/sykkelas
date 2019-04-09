const {Menu} = require('electron')
const electron = require('electron')
const app = electron.app
const path = require('path');
const {BrowserWindow} = require('electron')

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

//const { session } = require('electron')
// session = remote.session;


// Reload application on changes in src folder
require('electron-reload')(path.join(__dirname, 'src'), {
  ignored: /^.*\.(json|txt)$/,
  electron: require(path.join(__dirname, 'node_modules', 'electron'))
});




let mainWindow;
app.on('ready', () => {
  // session.defaultSession.cookies.set({
  //   name:"ansatt",
  //   value: "0",
  //   url: "http://localhost/"
  // },
  // err => {
  //   if(err) console.log("Error ", err);
  // });
  // session.defaultSession.cookies.get({},(err,cookies) => {
  //   if(err) console.error(err);
  //   console.log(cookies[0].value);
  // })
  mainWindow = new BrowserWindow({ width: 800, height: 600, webPreferences: { nodeIntegration: true } });

  // Open Development Tools
  mainWindow.openDevTools();

  mainWindow.loadURL('file://' + __dirname + '/public/index.html');

});

app.on('window-all-closed', () => {
  app.quit();
});

function sendAction(action) {
	const win = BrowserWindow.getAllWindows()[0];

	if (process.platform === 'darwin') {
		win.restore();
	}

	win.webContents.send(action);
}

//Create menu template
const template = [
  {
    label:'Meny',
    submenu:[
      {
    		label: 'Tilbake',
    		accelerator: process.platform === 'darwin' ? 'Command+Left' : 'Alt+Left',
    		click(item, focusedWindow) {
    			if (focusedWindow) {
    				sendAction('back');
    			}
    		}
    	},
      {
  label:'Avslutt',
  //accelerator definerer keyboard shortcuts (https://electronjs.org/docs/api/accelerator), process.platform == 'darwin' er en sjekk for MacOS
  accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
  click(){
    app.quit();
  }
},
{
  label: 'Gå til start',
  click(){
    mainWindow.loadURL('file://' + __dirname + '/public/index.html');
  }
}
    ]
  }
];


//Add developer tools item if not in production
if(process.env.NODE_ENV !== 'production'){
  template.push({
    label: 'Developer Tools',
    submenu:[
      {
        label: 'Toggle DevTools',
        accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item,focusedWindow){
          focusedWindow.toggleDevTools();
        }
      },
      {
        role:'reload'
      }
    ]
  });
}
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
