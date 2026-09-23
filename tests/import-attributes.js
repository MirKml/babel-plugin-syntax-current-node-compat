const { test } = require("node:test");
const assert = require("node:assert/strict");
const babel = require("@babel/core");
const plugin = require("../src");

const sourceCode = `
    import foo from "./foo.json" with { type: "json" };
`;

test("import attributes", () => {
  // transform with our plugin
  const result = babel.transformSync(sourceCode, {
    plugins: [plugin],
    configFile: false, // ignore external babel.config.js
    babelrc: false     // ignore external .babelrc
  });

  assert.ok(result && typeof result.code === "string", "Transform doesn't return code");
});