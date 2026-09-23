const { test } = require("node:test");
const assert = require("node:assert/strict");
const babel = require("@babel/core");
const plugin = require("../src");

test("no parser plugins for Babel 8", () => {
    assert.equal(babel.version, "8.0.6");

    const parserOpts = { plugins: [] };
    const pluginInstance = plugin({
        version: babel.version,
        assertVersion() { },
    }, null, __dirname);

    pluginInstance.manipulateOptions({}, parserOpts);

    assert.deepEqual(parserOpts.plugins, []);
});