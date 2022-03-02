module.exports = {
	env: {
		browser: true
		, es2021: true
	}
	, extends: [
		'eslint:recommended'
		, 'plugin:vue/vue3-strongly-recommended'
		, 'plugin:@typescript-eslint/recommended'
		, 'ayotte'
	]
	, parser: 'vue-eslint-parser'
	, parserOptions: {
		ecmaVersion: 'latest'
		, parser: {
			js: 'espree'
			, ts: '@typescript-eslint/parser'
		}
		, sourceType: 'module'
	}
	, plugins: [
		'vue'
		, '@typescript-eslint'
	]
}
