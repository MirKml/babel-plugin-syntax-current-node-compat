# babel-plugin-current-node-syntax-compat

Designed as a clean Babel 8 compatibility replacement for [babel-preset-current-node-syntax](https://github.com/nicolo-ribaudo/babel-preset-current-node-syntax)
with compatibility for both **Babel 7** and **Babel 8**, avoiding dozens of separate legacy syntax plugin dependencies.
It solves peer dependency problems described in [this issue](https://github.com/nicolo-ribaudo/babel-preset-current-node-syntax/issues/10), which lead to a problematic or even impossible installation of Babel 8
as a peer dependency with other packages (e.g., Jest — see [this issue](https://github.com/jestjs/jest/issues/15152#issuecomment-5470861058)).

---

## Installation

```sh
npm install --save-dev babel-plugin-current-node-syntax-compat
```

---

## Usage

In your `babel.config.json` (or `.babelrc`):

```json
{
  "plugins": ["babel-plugin-current-node-syntax-compat"]
}
```

## License

[MIT](packages/plugin/package.json)
