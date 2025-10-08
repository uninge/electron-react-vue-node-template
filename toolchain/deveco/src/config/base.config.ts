import path from 'node:path';
import {execSync} from "node:child_process";
import type { RsbuildConfig } from '@rsbuild/core';
import {pascalCase} from "change-case";
import {OUTPUT_DIR_NAME} from "../common/constant";
const pkg = require(path.resolve(process.cwd(), 'package.json'));

export const baseConfig: RsbuildConfig = {
	root: process.cwd(),
	mode: 'production',
	source: {
		define: {
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'process.env.APP_INFO': JSON.stringify({
				name: process.env.CUSTOM_APP_NAME || pascalCase(pkg.name),
				version: process.env.CUSTOM_APP_VERSION|| pkg.version,
				branch: execSync('git rev-parse --abbrev-ref HEAD').toString().trim(),
				message: execSync('git log -1 --pretty=%s%b').toString().trim(),
				hash: execSync('git show -s --format=%h').toString().trim(),
			}),
		}
	},
	output: {
		cleanDistPath: true,
		distPath: {
			root: path.resolve(process.cwd(), OUTPUT_DIR_NAME),
		}
	}
}
