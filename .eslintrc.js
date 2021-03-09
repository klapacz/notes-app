module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
		'node': true,
	},
	'extends': [
		'eslint:recommended',
		'plugin:vue/vue3-recommended',
	],
	'parserOptions': {
		'ecmaVersion': 12,
		'sourceType': 'module',
	},
	'plugins': [
		'vue',
	],
	'rules': {
		'indent': [
			'error',
			'tab',
		],
		'linebreak-style': [
			'error',
			'unix',
		],
		'quotes': [
			'error',
			'single',
		],
		'semi': ['error', 'always'],
		// vue plugin can not properly handle <script setup> yet
		// https://github.com/vuejs/eslint-plugin-vue/issues/1248
		'no-unused-vars': 'off',
		// use tabs in html template
		'vue/html-indent': ['error', 'tab'],
		// less lines to commit
		'comma-dangle': ['error', 'always-multiline'],
		// DOMPurify used
		'vue/no-v-html': 'off',
		'eol-last': ['error', 'always'],
		'max-len': ['error', {
			'code': 100,
		}],
		'object-curly-spacing': ['error', 'always'],
	},
};
