const currentNodeSyntaxPlugin = require("babel-plugin-current-node-syntax-compat");

/** @param {{ version: string }} api */
module.exports = ({ version }) => ({
  plugins: version.startsWith("7.")
    ? [currentNodeSyntaxPlugin]
    : [],
});