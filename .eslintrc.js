module.exports = {
	env: {
		browser: true
		, es2021: true
	}
	, extends: [
		'eslint:recommended'
		, 'plugin:vue/essential'
		, 'plugin:@typescript-eslint/recommended'
		, 'ayotte'
	]
	, parserOptions: {
		ecmaVersion: 'latest'
		, parser: '@typescript-eslint/parser'
		, sourceType: 'module'
	}
	, plugins: [
		'vue'
		, '@typescript-eslint'
	]
}
