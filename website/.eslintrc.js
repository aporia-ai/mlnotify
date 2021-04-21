module.exports = {
	root: true,
	env: {
		node: true,
		es6: true,
	},
	plugins: ['gridsome'],
	extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		'gridsome/format-query-block': 'error',
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
	parser: 'vue-eslint-parser',
}
