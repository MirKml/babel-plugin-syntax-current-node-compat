# babel-preset-current-node-syntax-compat

Designed as a clean Babel 8 compatibility replacement for [babel-preset-current-node-syntax](https://github.com/nicolo-ribaudo/babel-preset-current-node-syntax)
with compatibility for both **Babel 7** and **Babel 8**, avoiding dozens of separate legacy syntax plugin dependencies.
It solves peer dependency problems described in [this issue](https://github.com/nicolo-ribaudo/babel-preset-current-node-syntax/issues/10), which lead to a problematic or even impossible installation of Babel 8
as a peer dependency with other packages (e.g., Jest — see [this issue](https://github.com/jestjs/jest/issues/15152#issuecomment-5470861058)).

---

## Installation

```sh
npm install --save-dev babel-preset-current-node-syntax-compat
```

## Usage

In your `babel.config.json` (or `.babelrc`):

```json
{
  "presets": ["babel-preset-current-node-syntax-compat"]
}
```

## Upgrading to Babel 8 with Jest using this preset

This section describes a migration using npm >= 11.19.0 (bundled with Node.js 24 LTS) and Jest 30.5.2.
It describes only package upgrading. Own Babel 8 migration is out of scope this guide, see the [original Babel 8 migration guide](https://babeljs.io/docs/v8-migration).

Migrating Babel packages to Babel 8 generally isn't straightforward, even for a simple project that only uses Babel.
Just changing the Babel devDependencies isn't enough; `npm install` throws `ERESOLVE` errors due to peer dependency conflicts on `@babel/core` itself, like this:

```
npm error code ERESOLVE
npm error ERESOLVE could not resolve
npm error
npm error While resolving: my-app@1.0.0
npm error Found: @babel/cli@7.29.7
npm error node_modules/@babel/cli
npm error   dev @babel/cli@"^8.0.6" from the root project
npm error
npm error Could not resolve dependency:
npm error dev @babel/cli@"^8.0.6" from the root project
npm error
npm error Conflicting peer dependency: @babel/core@8.0.6
npm error node_modules/@babel/core
npm error   peer @babel/core@"^8.0.0" from @babel/cli@8.0.6
npm error   node_modules/@babel/cli
npm error     dev @babel/cli@"^8.0.6" from the root project
```

Therefore, it is necessary to manually adjust `package-lock.json` to help npm resolve the dependencies properly.

1. Update your Babel devDependencies to version 8 and add an override replacing the problematic preset `babel-preset-current-node-syntax` with this preset:
```json
{
 "devDependencies": {
    "@babel/cli": "^8.0.6",
    "@babel/core": "^8.0.6",
    "@babel/preset-env": "^8.0.6",
    "@babel/preset-react": "^8.0.1",
    "@babel/preset-typescript": "^8.0.1"
 },
 "overrides": {
    "babel-preset-current-node-syntax": "npm:babel-preset-current-node-syntax-compat"
  }
}
```

2. Remove the `@babel/core` block from `package-lock.json`:

```
diff --git a/package-lock.json b/package-lock.json
index c07507f2eb..7c019cac2b 100644
--- a/package-lock.json
+++ b/package-lock.json
@@ -657,36 +657,6 @@
         "node": ">=6.9.0"
       }
     },
-    "node_modules/@babel/core": {
-      "version": "7.29.7",
-      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.29.7.tgz",
-      "integrity": "sha512-RgHBCvtjbOK2gXSNBNIkNoEc9qoVEtau3hj8gEqKQuL3HZAibKarWFEI3Lfm6EYKkLalOh8eSrj9b+ch9H/VBA==",
-      "license": "MIT",
-      "dependencies": {
-        "@babel/code-frame": "^7.29.7",
-        "@babel/generator": "^7.29.7",
-        "@babel/helper-compilation-targets": "^7.29.7",
-        "@babel/helper-module-transforms": "^7.29.7",
-        "@babel/helpers": "^7.29.7",
-        "@babel/parser": "^7.29.7",
-        "@babel/template": "^7.29.7",
-        "@babel/traverse": "^7.29.7",
-        "@babel/types": "^7.29.7",
-        "@jridgewell/remapping": "^2.3.5",
-        "convert-source-map": "^2.0.0",
-        "debug": "^4.1.0",
-        "gensync": "^1.0.0-beta.2",
-        "json5": "^2.2.3",
-        "semver": "^6.3.1"
-      },
-      "engines": {
-        "node": ">=6.9.0"
-      },
-      "funding": {
-        "type": "opencollective",
-        "url": "https://opencollective.com/babel"
-      }
-    },
     "node_modules/@babel/generator": {
```

3. Run `npm install`:
npm will print multiple warnings, but it should complete with output similar to: `added 259 packages, removed 17 packages, changed 99 packages`.

4. Often `@babel/core` may still report conflicts. Run `npm ls -a` to check for errors. If you see `npm error invalid: @babel/core@8.0.6`, inspect it by running `npm ls @babel/core`.
You may encounter conflicts involving `babel-preset-jest`, `@babel/plugin-syntax-jsx`, and `@babel/plugin-syntax-typescript` under the `jest-snapshot` dependency tree:

```
    @babel/core@8.0.6 deduped invalid: "^7.0.0-0" from node_modules/@babel/plugin-syntax-jsx, "^7.0.0-0" from node_modules/@babel/plugin-syntax-typescript
    ...
```

These packages are from Babel 7, which Jest still depends on internally. They need to be installed in `jest-snapshot`'s own `node_modules` subtree rather than hoisted to the root level.
When checking `package-lock.json`, you will likely notice that these older packages are hoisted at the root level:

package-lock.json
```json
    "node_modules/@babel/plugin-syntax-jsx": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-jsx/-/plugin-syntax-jsx-7.29.7.tgz",
      "integrity": "sha512-TSu8+mHCoEaaCDEZ0I3+6mvTBYR4PCxQwf2z9/r5Tbztv6NaLR3B9thGTTxX2WGuGHJqRiAbKPeGTJ5XWXVg6A==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    }
```

Because npm does not resolve these properly under `jest-snapshot`'s nested tree automatically, remove these older Babel 7 package blocks (e.g., `"node_modules/@babel/plugin-syntax-jsx"` and `"node_modules/@babel/plugin-syntax-typescript"`) from `package-lock.json`.

5. Run `npm install` again. Everything should now succeed cleanly without any errors from `npm ls @babel/core` or `npm ls -a`. Certain plugins will be correctly installed in two versions-one for Babel 7 and one for Babel 8-in their respective subtrees.
For example, running `npm ls @babel/plugin-syntax-typescript`:

```
 npm ls @babel/plugin-syntax-typescript

├─┬ @babel/preset-typescript@8.0.1
│ └─┬ @babel/plugin-transform-typescript@8.0.6
│   └── @babel/plugin-syntax-typescript@8.0.3
└─┬ jest@30.5.2
  └─┬ @jest/core@30.5.2
    └─┬ jest-snapshot@30.5.2
      └── @babel/plugin-syntax-typescript@7.29.7
```

The migration is now complete. Jest continues to use Babel 7 packages internally where required, while your application code transformation runs through Babel 8.

Finally you need to upgrade necessary Babel configuration, which is used for your Jest tests, transformation etc.
It's beyond the scope of this guide, see original [migration to Babel 8](https://babeljs.io/docs/v8-migration) guide.

## License

[MIT](../plugin/package.json)
