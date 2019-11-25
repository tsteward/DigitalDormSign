/**
 * Modifies the create-react-app configuration in order to remove the restriction on importing outside of the module
 */

module.exports = config => {
	const scopePluginIndex = config.resolve.plugins.findIndex(
		({ constructor }) => constructor && constructor.name === "ModuleScopePlugin"
	);

	config.resolve.plugins.splice(scopePluginIndex, 1);

	return config;
};
