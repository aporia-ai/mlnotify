module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		es6: true,
	},
	plugins: ['gridsome'],
	extends: [
		'plugin:vue/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'eslint:recommended',
		'@vue/typescript/recommended',
		'@vue/prettier',
		'@vue/prettier/@typescript-eslint',
	],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		'gridsome/format-query-block': 'error',
		'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
		'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
		'@typescript-eslint/explicit-module-boundary-types': [
			'error',
			{
				allowedNames: ['data'],
			},
		],
		'prettier/prettier': [
			'warn',
			{
				singleQuote: true,
				semi: false,
				trailingComma: 'all',
				useTabs: true,
				tabWidth: 4,
				printWidth: 120,
				endOfLine: 'auto',
			},
		],
	},
}
