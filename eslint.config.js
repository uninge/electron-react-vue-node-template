import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default [
	js.configs.recommended,
	...tseslint.configs.recommended,
	prettier,
	{
		ignores: [
			'node_modules',
			'**/dist',
			'**/build',
			'**/release',
			'common',
			'*.config.js',
			'*.config.ts',
			'coverage',
			'.vscode',
			'.github',
		],
	},
	{
		files: ['**/src/*.ts', '**/src/*.tsx'],
		languageOptions: {
			parserOptions: {
				project: true,
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
			globals: {
				console: 'readonly',
				process: 'readonly',
				__dirname: 'readonly',
				__filename: 'readonly',
				module: 'readonly',
				require: 'readonly',
				exports: 'writable',
			},
		},
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-floating-promises': 'error',
			'@typescript-eslint/no-misused-promises': 'error',
			'no-console': [
				'warn',
				{
					allow: ['warn', 'error', 'info'],
				},
			],
			'prefer-const': 'error',
			'no-var': 'error',
		},
	},
	{
		files: ['**/*.js', '**/*.jsx'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				console: 'readonly',
				process: 'readonly',
				__dirname: 'readonly',
				__filename: 'readonly',
				module: 'readonly',
				require: 'readonly',
				exports: 'writable',
			},
		},
	},
];
