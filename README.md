# babel current-node-syntax compatibility plugin, preset

Designed as a clean Babel 8 compatibility replacement for [babel-preset-current-node-syntax](https://github.com/nicolo-ribaudo/babel-preset-current-node-syntax)
with compatibility for both **Babel 7** and **Babel 8**, avoiding dozens of separate legacy syntax plugin dependencies.
It solves peer dependency problems described in [this issue](https://github.com/nicolo-ribaudo/babel-preset-current-node-syntax/issues/10), which lead to a problematic or even impossible installation of Babel 8
as a peer dependency with other packages (e.g., Jest — see [this issue](https://github.com/jestjs/jest/issues/15152#issuecomment-5470861058)).

**Important**: This package is intended only for progressive migration scenarios, where both Babel 7 and Babel 8 need to work simultaneously.
If you are only using Babel 8, you don't not need these (and original preset) syntax packages.
When you switch to using only Babel 8, you can safely remove this package, as Babel 8 natively supports the latest Node.js syntax.

When you use [deprecatedAssertSyntax](https://babeljs.io/docs/babel-plugin-syntax-import-attributes#deprecatedassertsyntax), this isn't supported by this plugin.

---

## Packages

This repository contains two packages:

* [babel-plugin-current-node-syntax-compat](packages/plugin/README.md) - Babel plugin that enables parser plugins supported by the running Node.js version.
* [babel-preset-current-node-syntax-compat](packages/preset/README.md) - Drop-in preset wrapper around the plugin for configurations expecting a preset.

---

## Installation

Install either the preset (recommended if migrating from `babel-preset-current-node-syntax`) or the plugin:

### Preset

```sh
npm install --save-dev babel-preset-current-node-syntax-compat
```

### Plugin

```sh
npm install --save-dev babel-plugin-current-node-syntax-compat
```

---

## Usage

### As a Preset

In your `babel.config.json` (or `.babelrc`):

```json
{
  "presets": ["babel-preset-current-node-syntax-compat"]
}

```

### As a Plugin

In your `babel.config.json` (or `.babelrc`):

```json
{
  "plugins": ["babel-plugin-current-node-syntax-compat"]
}
```

## License

[MIT](packages/plugin/package.json)
