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
            case "object-rest-spread":
                plugins.push("objectRestSpread");
                break;

            case "async-generators":
                plugins.push("asyncGenerators");
                break;

            case "optional-catch-binding":
                plugins.push("optionalCatchBinding");
                break;

            case "json-strings":
                plugins.push("jsonStrings");
                break;

            case "bigint":
                plugins.push("bigInt");
                break;

            case "optional-chaining":
                plugins.push("optionalChaining");
                break;

            case "nullish-coalescing-operator":
                plugins.push("nullishCoalescingOperator");
                break;

            case "numeric-separator":
                plugins.push("numericSeparator");
                break;

            case "logical-assignment-operators":
                plugins.push("logicalAssignment");
                break;

            case "class-properties":
                plugins.push("classProperties", "classPrivateProperties", "classPrivateMethods");
                break;

            case "private-property-in-object":
                plugins.push("privateIn");
                break;

            case "class-static-block":
                plugins.push("classStaticBlock");
                break;

            case "syntax-import-meta":
                plugins.push("importMeta");
                break;

            case "syntax-top-level-await":
                plugins.push("topLevelAwait");
                break;

            default:
        }
    }
    return plugins;
}

module.exports = {
    getParserOptsPlugins,
};
