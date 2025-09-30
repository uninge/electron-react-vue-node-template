const path = require('node:path');

module.exports = {
	main: {
		electron: require('electron'),
		inspect: 28256,
		appPath: path.join(process.cwd(), 'dist', 'index.js'),
	}
}
