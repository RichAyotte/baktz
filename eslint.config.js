import { FlatCompat } from '@eslint/eslintrc'
import path from 'path'
import { fileURLToPath } from 'url'
import js from '@eslint/js'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const compat = new FlatCompat({
	allConfig: js.configs.all,
	baseDirectory: dirname,
	recommendedConfig: js.configs.recommended,
	resolvePluginsRelativeTo: dirname,
})

const config = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:nuxt/recommended',
		'plugin:vue/vue3-strongly-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier-vue/recommended',
	],
	ignorePatterns: ['.nuxt'],
	parser: 'vue-eslint-parser',
	parserOptions: {
		ecmaVersion: 'latest',
		parser: {
			js: 'espree',
			ts: '@typescript-eslint/parser',
		},
		sourceType: 'module',
	},
	plugins: ['vue', '@typescript-eslint'],
	rules: {
		'vue/multi-word-component-names': [
			'error',
			{
				ignores: ['index'],
			},
		],
		'prettier-vue/prettier': [
			'error',
			{
				// Override all options of `prettier` here
				// @see https://prettier.io/docs/en/options.html
				printWidth: 80,
				tabWidth: 1,
				useTabs: true,
				semi: false,
				singleQuote: true,
				quoteProps: 'as-needed',
				jsxSingleQuote: true,
				bracketSpacing: true,
				bracketSameLine: false,
				arrowParens: 'avoid',
				vueIndentScriptAndStyle: false,
				endOfLine: 'lf',
				embeddedLanguageFormatting: 'auto',
				singleAttributePerLine: true,
			},
		],
	},
}

export default compat.config(config)
