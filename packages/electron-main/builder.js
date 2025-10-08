const builder = require("electron-builder")
const Platform = builder.Platform

// Let's get that intellisense working
/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration
 */
const options = {
	files: [
		'dist',
		'assets',
		'package.json',

		'!.gitignore',
		'!.gitattributes',
		'!.editorconfig',

		'!**/*.ts',
		'!**/react-render/**/src/*',
		'!**/vue-render/**/src/*',
		'!**/node-server/**/src/*',
		'!**/node_modules/*/{CHANGELOG.md,README.md,README,readme.md,readme}',
		'!**/node_modules/*/{test,__tests__,tests,powered-test,example,examples}',
		'!**/node_modules/*.d.ts',
		'!**/node_modules/.bin',
		'!**/*.{iml,o,hprof,orig,pyc,pyo,rbc,swp,csproj,sln,xproj}',
		'!**/._*',
		'!**/{.DS_Store,.git,.hg,.svn,CVS,RCS,SCCS,.gitignore,.gitattributes}',
		'!**/{__pycache__,thumbs.db,.flowconfig,.idea,.vs,.nyc_output}',
		'!**/{appveyor.yml,.travis.yml,circle.yml}',
		'!**/{npm-debug.log,yarn.lock,.yarn-integrity,.yarn-metadata.json,tsconfig.json,.ferryrc.js,windi.config.js}',
	],
	protocols: {
		name: "Deeplink Example",
		schemes: [
			"deeplink"
		]
	},
	asar: false,
	compression: "normal",
	removePackageScripts: true,

	nodeGypRebuild: false,
	buildDependenciesFromSource: false,

	directories: {
		output: "release",
		buildResources: "dist"
	},
	mac: {
		target: 'dmg',
		hardenedRuntime: true,
		gatekeeperAssess: true,
		extendInfo: {
			NSAppleEventsUsageDescription: 'Let me use Apple Events.',
			NSCameraUsageDescription: 'Let me use the camera.',
			NSScreenCaptureDescription: 'Let me take screenshots.',
		}
	},
	dmg: {
		iconSize: 100,
		contents: [
			{
				x: 255,
				y: 85,
				type: "file"
			},
			{
				x: 253,
				y: 325,
				type: "link",
				path: "/Applications"
			}
		],
		window: {
			width: 500,
			height: 500
		}
	},
};

builder
	.build({
		targets: Platform.MAC.createTarget(),
		config: options
	})
	.then((result) => {
		console.log(JSON.stringify(result))
	})
	.catch((error) => {
		console.error(error)
	})
