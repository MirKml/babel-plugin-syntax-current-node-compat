const { test } = require("node:test");
const assert = require("node:assert/strict");
const babel = require("@babel/core");
const plugin = require("../src");

test("all parser opts plugins for Babel 7", () => {
  assert.equal(babel.version, "7.29.7");

  const parserOpts = { plugins: [] };
  const pluginInstance = plugin({
    version: babel.version,
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
    "importAttributes",
  ]);
});
