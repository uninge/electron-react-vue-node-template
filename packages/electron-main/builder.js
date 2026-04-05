import builder from 'electron-builder';
const Platform = builder.Platform;

// Configure mirror for Electron downloads
process.env.ELECTRON_MIRROR = 'https://npmmirror.com/mirrors/electron/';
process.env.ELECTRON_BUILDER_BINARIES_MIRROR = 'https://npmmirror.com/mirrors/electron-builder-binaries/';

// Let's get that intellisense working
/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration
 */
const options = {
	// Application metadata
	appId: 'com.electron.main',
	productName: 'Electron App',

	// Files configuration
	files: [
		'dist',
		'assets',
		'package.json',

		'!.gitignore',
		'!.gitattributes',
		'!.editorconfig',

		'!**/*.ts',

		'!**/node_modules/react-render/**/src/*',
		'!**/node_modules/vue-render/**/src/*',
		'!**/node_modules/node-server/**/src/*',

		'!**/node_modules/*.d.ts',
		'!**/node_modules/.bin',

		'!**/node_modules/*/{CHANGELOG.md,README.md,README,readme.md,readme}',
		'!**/node_modules/*/{test,__tests__,tests,powered-test,example,examples}',

		'!**/{._*,*.log,*.yml,tsconfig.json}',
		'!**/*.{iml,o,hprof,orig,pyc,pyo,rbc,swp,csproj,sln,xproj}',
		'!**/{.DS_Store,.idea,.vscode,.git,.vs,.github,.gitignore,.gitattributes,.editorconfig}',
	],

	// ASAR configuration (recommended for production)
	asar: true,
	compression: 'maximum',

	// Build options
	removePackageScripts: true,
	nodeGypRebuild: false,
	buildDependenciesFromSource: false,

	// Directories
	directories: {
		output: 'release',
		buildResources: 'assets',
	},

	// macOS configuration
	mac: {
		target: 'zip',
		category: 'public.app-category.developer-tools',
		icon: 'assets/icon.icns',
		hardenedRuntime: true,
		gatekeeperAssess: false,
		darkModeSupport: true,
		artifactName: '${productName}-${version}-${arch}.${ext}',
		extendInfo: {
			NSAppleEventsUsageDescription: 'Let me use Apple Events.',
			NSCameraUsageDescription: 'Let me use the camera.',
			NSScreenCaptureDescription: 'Let me take screenshots.',
		},
	},

	// DMG configuration
	dmg: {
		iconSize: 100,
		contents: [
			{
				x: 255,
				y: 85,
				type: 'file',
			},
			{
				x: 253,
				y: 325,
				type: 'link',
				path: '/Applications',
			},
		],
		window: {
			width: 500,
			height: 500,
		},
	},

	// Windows configuration
	win: {
		target: [
			{
				target: 'nsis',
				arch: ['x64', 'ia32'],
			},
			{
				target: 'portable',
				arch: ['x64'],
			},
		],
		icon: 'assets/icon.ico',
	},

	// NSIS installer configuration
	nsis: {
		oneClick: false,
		allowToChangeInstallationDirectory: true,
		createDesktopShortcut: true,
		createStartMenuShortcut: true,
		shortcutName: 'Electron App',
	},

	// Linux configuration
	linux: {
		target: ['AppImage', 'deb'],
		category: 'Utility',
		icon: 'assets/icon.png',
	},

	// Protocols
	protocols: {
		name: 'Deeplink Example',
		schemes: ['deeplink'],
	},
};

builder
	.build({
		targets: Platform.MAC.createTarget(),
		config: options,
	})
	.then((result) => {
		console.log(JSON.stringify(result));
	})
	.catch((error) => {
		console.error(error);
	});
