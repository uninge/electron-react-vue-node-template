import path from "path";
import fs from "fs";
import {OUTPUT_DIR_NAME} from "./constant";

export function getCustomConfig() {
	const defaultMainConfig = {
		electron: require('electron'),
		inspect: 28256,
		appPath: path.resolve(process.cwd(), OUTPUT_DIR_NAME, 'main.js'),
		canClose: false,
	}

	const configPath = path.resolve(process.cwd(), './deveco.config.js');
	if (fs.existsSync(configPath)) {
		const config = require(path.resolve(process.cwd(), './deveco.config.js'));
		return {
			main:  Object.assign({}, defaultMainConfig, config.main)
		};
	}

	return {
		main: defaultMainConfig
	}
}
