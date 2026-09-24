const { test } = require("node:test");
const assert = require("node:assert/strict");
const babel = require("@babel/core");
const preset = require("../index.js");

test("preset uses syntax-current-node-compat for Babel 7", () => {
    assert.equal(babel.version, "7.29.7");

    const options = babel.loadOptions({
        presets: [preset],
        configFile: false,
        babelrc: false,
    });

    assert.deepEqual(options.plugins.map(plugin => plugin.key), [
        "syntax-current-node-compat",
    ]);
});