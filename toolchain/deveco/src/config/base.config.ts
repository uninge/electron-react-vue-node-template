import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import type { RsbuildConfig } from '@rsbuild/core';
import { OUTPUT_DIR_NAME, PROJECT_REPO } from '../common/constant';

interface PackageJson {
	name: string;
	version: string;
	dependencies?: Record<string, string>;
	devDependencies?: Record<string, string>;
}

interface AppInfo {
	name: string;
	version: string;
	branch: string;
	message: string;
	hash: string;
}

function getPackageJson(): PackageJson {
	try {
		const packageJsonPath = path.resolve(process.cwd(), 'package.json');
		const content = fs.readFileSync(packageJsonPath, 'utf-8');
		return JSON.parse(content);
	} catch (error) {
		console.error('Failed to read package.json:', error);
		return { name: 'unknown', version: '0.0.0' };
	}
}

function getGitInfo(): { branch: string; message: string; hash: string } {
	const defaultGitInfo = { branch: 'unknown', message: 'unknown', hash: 'unknown' };

	try {
		const branch = execSync('git rev-parse --abbrev-ref HEAD', {
			encoding: 'utf-8',
			stdio: ['pipe', 'pipe', 'pipe'],
		}).trim();

		const message = execSync('git log -1 --pretty=%s%b', {
			encoding: 'utf-8',
			stdio: ['pipe', 'pipe', 'pipe'],
		}).trim();

		const hash = execSync('git show -s --format=%h', {
			encoding: 'utf-8',
			stdio: ['pipe', 'pipe', 'pipe'],
		}).trim();

		return { branch, message, hash };
	} catch (error) {
		console.warn('Failed to get git info:', error);
		return defaultGitInfo;
	}
}

const packageJson = getPackageJson();
const projectRepo = process.env.CUSTOM_PROJECT;

function getAppInfo(packageJson: PackageJson): AppInfo {
	const gitInfo = getGitInfo();

	return {
		name: process.env.CUSTOM_APP_NAME || packageJson.name,
		version: process.env.CUSTOM_APP_VERSION || packageJson.version,
		...gitInfo,
	};
}

export const baseConfig: RsbuildConfig = {
	root: process.cwd(),
	mode: 'production',
	source: {
		define: {
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'process.env.APP_INFO': JSON.stringify(getAppInfo(packageJson)),
			'process.env.CUSTOM_RENDER_DEV_HOST': JSON.stringify(process.env.CUSTOM_RENDER_DEV_HOST),
			'process.env.CUSTOM_RENDER_DEV_PORT': JSON.stringify(process.env.CUSTOM_RENDER_DEV_PORT),
			'process.env.CUSTOM_RENDER_PROJECT': JSON.stringify(process.env.CUSTOM_RENDER_PROJECT),
		},
	},
	output: {
		cleanDistPath: true,
		distPath: {
			root: path.resolve(process.cwd(), OUTPUT_DIR_NAME),
		},
		externals:
			projectRepo === PROJECT_REPO.ELECTRON_MAIN
				? Object.keys({ ...packageJson.dependencies, ...packageJson.devDependencies })
				: [],
		sourceMap: {
			js: process.env.NODE_ENV === 'development' ? 'cheap-module-source-map' : 'source-map',
			css: true,
		},
	},
	performance: {
		chunkSplit: {
			strategy: 'split-by-experience',
		},
	},
};
