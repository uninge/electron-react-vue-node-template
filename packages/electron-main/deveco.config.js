const path = require('node:path');
const { name, version } = require('./package.json');

module.exports = {
	setEnv: async () => {
		process.env.CUSTOM_APP_NAME = name;
		process.env.CUSTOM_APP_VERSION = version;

		if (process.env.NODE_ENV === 'development') {
			process.env.CUSTOM_RENDER_DEV_HOST = '127.0.0.1'
			process.env.CUSTOM_RENDER_DEV_PORT = '3000';
		}
	},
	getMainConfig: async () => {
		return {
			electron: require('electron'),
			inspect: 28256,
			appPath: path.join(process.cwd(), 'dist', 'index.js'),
		}
	}
}
