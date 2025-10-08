import path from 'node:path';
import url from 'node:url';
import electronLog from 'electron-log';
import { app, screen, globalShortcut, BrowserWindow } from 'electron';
import { mark, performanceStart, performanceEnd } from './utils/performance';
import { NODE_ENV, RENDER_DEV_HOST_NAME, RENDER_DEV_PORT, APP_INFO} from './config';
import { banShortcut } from './utils/functions';
import './config/menu';

performanceStart();

(async function setup() {
	mark('main-start');

	const isDevelopment = NODE_ENV === 'development';
	const devPathname = `${RENDER_DEV_HOST_NAME}:${RENDER_DEV_PORT}`;

	process.on('unhandledRejection', (error) => {
		electronLog.error('An error occurred(unhandledRejection)', error);
		if (!isDevelopment) {
			app.quit();
		}
	});

	let mainWindow: BrowserWindow | null;

	function createWindow() {
		mark('main-window-create-start');

		const { width, height } = screen.getPrimaryDisplay().workAreaSize;

		mainWindow = new BrowserWindow({
			minWidth: 1280,
			minHeight: 720,
			width: width * 0.8,
			height: height * 0.8,
			frame: true,
			show: true,
			transparent: false,
			backgroundColor: '#333',
			webPreferences: {
				webviewTag: false,
				webSecurity: true,
				nodeIntegration: false,
				contextIsolation: !isDevelopment,
				preload: path.resolve(__dirname, isDevelopment ? '../dist/preload.js' : 'dist/preload.js'),
			},
		});

		mainWindow
			.on('ready-to-show', () => {
				if (mainWindow) {
					mainWindow.show();
					mainWindow.center();
				}
				mark('main-window-create-end');
			})
			.on('closed', () => {
				mainWindow = null;
			})
			.webContents
			.on('did-finish-load', () => {
				mark('main-window-source-load-end');

				// const list = getMarks();
				// electronLog.log('performance:', JSON.stringify(list, null, 2));

				performanceEnd();
			})
			.setUserAgent(`${mainWindow.webContents.getUserAgent()} ${APP_INFO.name}/${APP_INFO.version}/${NODE_ENV}/${APP_INFO.hash}`);

		mark('main-window-source-load-start');

		mainWindow
			.loadURL(url.format({
				protocol: isDevelopment ? 'http' : 'file',
				pathname: isDevelopment ? devPathname : path.join(__dirname, '../render/index.html'),
				slashes: true,
			}))
			.then(() => {
				electronLog.info(`Main Window Load Success: http://${devPathname}`);
				electronLog.info(APP_INFO.name);
			})
			.catch((err) => {
				electronLog.error('Main Window Load Error', err);
			});

		// setTimeout(() => {
		//   mainWindow?.webContents?.reloadIgnoringCache();
		// }, 5000);
	}

	app.on('browser-window-focus', () => {
		electronLog.log('browser-window-focus');
		banShortcut();
	});

	app.on('browser-window-blur', () => {
		electronLog.log('browser-window-blur');
		globalShortcut.unregisterAll();
	});

	app.on('window-all-closed', () => {
		electronLog.log('window-all-closed');
		globalShortcut.unregisterAll();

		if (process.platform !== 'darwin') {
			app.quit();
		}
	});

	app.on('will-quit', () => {
		globalShortcut.unregisterAll();
	});

	try {
		await app.whenReady();

		createWindow();

		app.on('activate', () => {
			electronLog.log('activate');
			if (BrowserWindow.getAllWindows().length === 0) {
				createWindow();
			}
		});
	} catch (error) {
		electronLog.error(error);
	}

	mark('main-end');
})();
