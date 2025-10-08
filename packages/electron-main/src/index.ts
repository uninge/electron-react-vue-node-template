import path from 'node:path';
import url from 'node:url';
import electronLog from 'electron-log';
import { app, screen, globalShortcut, BrowserWindow } from 'electron';
import { mark, performanceStart, performanceEnd } from './utils/performance';
import {NODE_ENV, RENDER_DEV_HOST_NAME, RENDER_DEV_PORT, APP_INFO, RENDER_PROJECT} from './config';
// import { banShortcut } from './utils/functions';
import './config/menu';

performanceStart();

mark('main-start');

let mainWindow: BrowserWindow | null;
const isDevelopment = NODE_ENV === 'development';
const devPathname = `${RENDER_DEV_HOST_NAME}:${RENDER_DEV_PORT}`;

process.on('unhandledRejection', (error) => {
	electronLog.error('An Error Occurred(unhandledRejection)', error);
	if (!isDevelopment) {
		app.quit();
	}
});

app.setAsDefaultProtocolClient('myapp');
app
	.on('open-url', (event, url) => {
		event.preventDefault()
		electronLog.log('open-url', event, url);
	})
	.on('activate', () => {
		electronLog.log('activate');

		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		} else {
			mainWindow?.show();
		}
	})
	.on('browser-window-focus', () => {
		electronLog.log('browser-window-focus');
		// banShortcut();
	})
	.on('browser-window-blur', () => {
		electronLog.log('browser-window-blur');
		globalShortcut.unregisterAll();
	})
	.on('window-all-closed', () => {
		electronLog.log('window-all-closed');
		globalShortcut.unregisterAll();
		if (process.platform !== 'darwin') {
			app.quit();
		}
	})
	.on('will-quit', () => {
		globalShortcut.unregisterAll();
	});

function createWindow() {
	mark('main-window-create-start');

	const { width, height } = screen.getPrimaryDisplay().workAreaSize;

	mainWindow = new BrowserWindow({
		minWidth: 1280,
		minHeight: 720,
		width: Math.min(width, 1920),
		height: Math.min(height, 1080),
		frame: true,
		show: true,
		center: true,
		transparent: false,
		backgroundColor: '#333',
		webPreferences: {
			webviewTag: false,
			webSecurity: true,
			nodeIntegration: false,
			contextIsolation: !isDevelopment,
			preload: path.join(__dirname, './preload.js'),
		},
	});

	mainWindow.webContents.openDevTools();

	mainWindow
		.on('ready-to-show', () => {
			if (mainWindow) {
				mainWindow.show();
			}
			mark('main-window-create-end');
		})
		.on('closed', () => {
			mainWindow = null;
		})
		.webContents
		.on('did-finish-load', () => {
			mark('main-window-source-load-end');
			performanceEnd();
		})
		.setUserAgent(`${mainWindow.webContents.getUserAgent()} ${APP_INFO.name}/${APP_INFO.version}/${NODE_ENV}/${APP_INFO.hash}`);

	mark('main-window-source-load-start');

	const uri = url.format({
		protocol: isDevelopment ? 'http' : 'file',
		pathname: isDevelopment ? devPathname : path.join(__dirname, `../node_modules/${RENDER_PROJECT}/dist/index.html`),
		slashes: true,
	})

	mainWindow
		.loadURL(uri)
		.then(() => {
			electronLog.info(`Main Window Load Success: ${uri}`);
			electronLog.info(APP_INFO.name);
		})
		.catch((err) => {
			electronLog.error('Main Window Load Error', err);
		});
}

try {
	await app.whenReady();
	createWindow();
} catch (error) {
	electronLog.error('App Not Ready', error);
}

mark('main-end');
