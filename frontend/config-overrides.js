const { removeModuleScopePlugin, babelInclude, addWebpackModuleRule, override } = require("customize-cra");
const path = require('path');

/**
 * Override the creat-react-app configuration
 */
module.exports = override(
	// Allow modules to be imported from outside of the src directory
	removeModuleScopePlugin(),
	// Unfortunately, those modules don't seem to play well with the typescript compiler. So add the ts-loader to handle
	// these. This shouldn't effect the majority of files that are in the src directory.
	addWebpackModuleRule({test: /\.ts$/, use: 'ts-loader'})
);
