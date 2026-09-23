const { test } = require("node:test");
const assert = require("node:assert/strict");
const plugin = require("../src");

test("missing version", () => {
  const parserOpts = { plugins: [] };
  const pluginInstance = plugin({
    version: "7.0.0",
    assertVersion() { },
  }, null, __dirname);

  pluginInstance.manipulateOptions({}, parserOpts);

  assert.deepEqual(parserOpts.plugins, [
    "objectRestSpread",
    "asyncGenerators",
    "optionalCatchBinding",
    "jsonStrings",
    "bigInt",
    "optionalChaining",
    "nullishCoalescingOperator",
    "numericSeparator",
    "logicalAssignment",
    "classProperties",
    "classPrivateProperties",
    "classPrivateMethods",
    "privateIn",
    "classStaticBlock",
    "importMeta",
    "topLevelAwait",
  ]);
});