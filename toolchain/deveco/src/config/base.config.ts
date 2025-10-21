import fs from 'node:fs';
import path from 'node:path';
import {execSync} from "node:child_process";
import type { RsbuildConfig } from '@rsbuild/core';
import {OUTPUT_DIR_NAME, PROJECT_REPO} from "../common/constant";
const {
	name,
	version,
	dependencies,
	devDependencies,
} = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8'));

const projectRepo = process.env.CUSTOM_PROJECT;

export const baseConfig: RsbuildConfig = {
	root: process.cwd(),
	mode: 'production',
	source: {
		define: {
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'process.env.APP_INFO': JSON.stringify({
				name: process.env.CUSTOM_APP_NAME || name,
				version: process.env.CUSTOM_APP_VERSION|| version,
				branch: execSync('git rev-parse --abbrev-ref HEAD').toString().trim(),
				message: execSync('git log -1 --pretty=%s%b').toString().trim(),
				hash: execSync('git show -s --format=%h').toString().trim(),
			}),
			'process.env.CUSTOM_RENDER_DEV_HOST': JSON.stringify(process.env.CUSTOM_RENDER_DEV_HOST),
			'process.env.CUSTOM_RENDER_DEV_PORT': JSON.stringify(process.env.CUSTOM_RENDER_DEV_PORT),
			'process.env.CUSTOM_RENDER_PROJECT': JSON.stringify(process.env.CUSTOM_RENDER_PROJECT),
		}
	},
	output: {
		cleanDistPath: true,
		distPath: {
			root: path.resolve(process.cwd(), OUTPUT_DIR_NAME),
		},
		externals: projectRepo === PROJECT_REPO.ELECTRON_MAIN ? Object.keys({ ...dependencies, ...devDependencies }) : [],
	}
}
