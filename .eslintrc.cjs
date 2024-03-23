module.exports = {
	root: true,
	extends: ["eslint:recommended", "prettier"],
	parser: "@babel/eslint-parser",
	parserOptions: {
		sourceType: "module",
		ecmaVersion: 2020,
		requireConfigFile: false
	},
	plugins: ["svelte3"],
	overrides: [
		{
			files: ["*.svelte"],
			processor: "svelte3/svelte3"
		}
	],
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	rules: {
		"no-empty": [2, { allowEmptyCatch: true }],
		"no-irregular-whitespace": "off"
	}
};
