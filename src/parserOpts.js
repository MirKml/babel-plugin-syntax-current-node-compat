/**
 * @param {string[]} syntaxPluginNames
 * @returns {string[]} The corresponding parser plugin names.
 */
function getParserOptsPlugins(syntaxPluginNames) {
    /**
     * @type {string[]}
     */
    const plugins = [];

    for (const syntaxPluginName of syntaxPluginNames) {
        switch (syntaxPluginName) {
            case "class-properties":
                plugins.push("classProperties");
                plugins.push("classPrivateProperties");
                plugins.push("classPrivateMethods");
                break;

            case "private-property-in-object":
                plugins.push("privateIn");
                break;

            default:
        }
    }
    return plugins;
}

module.exports = {
    getParserOptsPlugins,
};
