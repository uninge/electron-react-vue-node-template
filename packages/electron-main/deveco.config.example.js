import { defineConfig } from 'deveco';

export default defineConfig({
	async setEnv() {
		process.env.CUSTOM_RENDER_DEV_HOST = 'http://localhost';
		process.env.CUSTOM_RENDER_DEV_PORT = '3000';
		process.env.CUSTOM_APP_NAME = 'MyElectronApp';
		process.env.CUSTOM_APP_VERSION = '1.0.0';
	},

	async getMainConfig() {
		return {
			electron: require.resolve('electron/cli.js'),
			inspect: 9222,
			appPath: './dist/index.js',
		};
	},
});
