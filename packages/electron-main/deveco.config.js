import path from 'path';
// const { name, version } = require('./package.json');

export default {
	setEnv: async () => {
		process.env.CUSTOM_APP_NAME = 'name';
		process.env.CUSTOM_APP_VERSION = 'version';

		if (process.env.NODE_ENV === 'development') {
			process.env.CUSTOM_RENDER_DEV_HOST = '127.0.0.1';
			process.env.CUSTOM_RENDER_DEV_PORT = '3000';
		}
	},
	getMainConfig: async () => {
		return {
			electron: (await import('electron')).default,
			inspect: 28256,
			appPath: path.join(process.cwd(), 'dist', 'index.js'),
		};
	},
};
