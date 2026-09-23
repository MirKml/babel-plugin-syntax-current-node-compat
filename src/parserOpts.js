/**
 * @param {string[]} syntaxPluginNames
 * @returns {string[]} The corresponding parser plugin names.
 */
function getParserOptsPlugins(syntaxPluginNames) {
    /**
     * @type {string[]}
     */
    const parserPlugins = [];

    for (const syntaxPluginName of syntaxPluginNames) {
        switch (syntaxPluginName) {
            case "object-rest-spread":
                parserPlugins.push("objectRestSpread");
                break;

            case "async-generators":
                parserPlugins.push("asyncGenerators");
                break;

            case "optional-catch-binding":
                parserPlugins.push("optionalCatchBinding");
                break;

            case "json-strings":
                parserPlugins.push("jsonStrings");
                break;

            case "bigint":
                parserPlugins.push("bigInt");
                break;

            case "optional-chaining":
                parserPlugins.push("optionalChaining");
                break;

            case "nullish-coalescing-operator":
                parserPlugins.push("nullishCoalescingOperator");
                break;

            case "numeric-separator":
                parserPlugins.push("numericSeparator");
                break;

            case "logical-assignment-operators":
                parserPlugins.push("logicalAssignment");
                break;

            case "class-properties":
                parserPlugins.push("classProperties", "classPrivateProperties", "classPrivateMethods");
                break;

            case "private-property-in-object":
                parserPlugins.push("privateIn");
                break;

            case "class-static-block":
                parserPlugins.push("classStaticBlock");
                break;

            case "syntax-import-meta":
                parserPlugins.push("importMeta");
                break;

            case "syntax-top-level-await":
                parserPlugins.push("topLevelAwait");
                break;

            default:
                throw new Error(`Unknown syntax plugin: ${syntaxPluginName}`);
        }
    }
    return parserPlugins;
}

module.exports = {
    getParserOptsPlugins,
};
