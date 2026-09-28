# babel-preset-current-node-syntax-compat

Designed as a clean Babel 8 compatibility replacement for [babel-preset-current-node-syntax](https://github.com/nicolo-ribaudo/babel-preset-current-node-syntax)`
with compatibility for both **Babel 7** and **Babel 8**, avoiding dozens of separate legacy syntax plugin dependencies.
It solves peer dependency problems described in [this issue](https://github.com/nicolo-ribaudo/babel-preset-current-node-syntax/issues/10), which lead to a problematic or even impossible installation of Babel 8
as peer dependency with other packages e.g. Jest — [this issue](https://github.com/jestjs/jest/issues/15152#issuecomment-5470861058).

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

## Upgrade to Babel 8 with Jest with this preset
I will describe my migration with the npm => 11.19.0 bundled with node.js 24 LTS. Jest 30.5.2.
Migration to Babel 8 generally isn't straight forward, event with the simple project with just babel itself.
Just changing the babel dev dependencies ins't enough, npm install throws EROSLVE errors for peer dependency conflict on @babel/core itself, like this

```
npm error code ERESOLVE
npm error ERESOLVE could not resolve
npm error
npm error While resolving: raltra-frontend@1.0.0
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

So it's necessary to manually adjust lock file, to push npm itself to solve dependencies itself.

1. Change your babel dev dependencies to version 8, add override for problematic preset `"babel-preset-current-node-syntax` with our new preset
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
    "babel-preset-current-node-syntax": "npm:babel-preset-current-node-syntax-compat",
  }
}
```

2. Remove the @babel/core part from the lock-file - package-lock.json

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

3. Run npm install
Npm prints lots of warnings, but finishes with many changes like `added 259 packages, removed 17 packages, changed 99 packages`.

4. Mostly babel/core has still the problems, try to use `npm ls -a` if there are some errors. I get the `npm error invalid: @babel/core@8.0.6`. Check the errors with the `npm ls @babel/core`.
I get the problem with babel-preset-jest, @babel/plugin-syntax-jsx, @babel/plugin-syntax-typescript under jest-snapshot tree. Errors like

```
    @babel/core@8.0.6 deduped invalid: "^7.0.0-0" from node_modules/@babel/plugin-syntax-jsx, "^7.0.0-0" from node_modules/@babel/plugin-syntax-typescript
    ...
```
These packages are still from babel 7, jest depends on these internally. These needs to be installed on own jest-snapshot node_modules subtree.
Now I checked the package-lock.json, how are the problematic packages presented, I saw that these old packages are on main level.

package-lock.json
```
    "node_modules/@babel/plugin-syntax-jsx": {
      "version": "7.29.7",
      "resolved": "...https://registry.npmjs.org/@babel/plugin-syntax-jsx/-/plugin-syntax-jsx-7.29.7.tgz",
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

So npm doesn't solve these correctly under . I remove these problematic old babel 7 package references from package-lock file - @babel/plugin-syntax-jsx@7.29.7, @babel/plugin-syntax-typescript@7.29.7 - parts from lock file.

5. Run npm install again, and ten all it's fine, no npm errors in `npm ls @babel/core`, `npm ls -a`. Some plugins are correctly installed in two versions - one for babel 7, one for babel 8 in own subtrees.
E.g. @babel/plugin-syntax-typescript

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

It's finished. Jest still uses babel 7 packages for some internal processing, but user code transformation goes through babel 8.
## License

[MIT](packages/plugin/package.json)
