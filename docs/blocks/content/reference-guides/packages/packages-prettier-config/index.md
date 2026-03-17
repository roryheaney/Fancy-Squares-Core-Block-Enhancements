---
title: "@wordpress/prettier-config"
slug: "packages-prettier-config"
source: "https://developer.wordpress.org/block-editor/reference-guides/packages/packages-prettier-config/"
generatedAt: 2025-12-30T18:18:33.664Z
---

WordPress Prettier shareable config for [Prettier](https://prettier.io).

## [Installation](#installation)

Install the module

```shell
$ npm install @wordpress/prettier-config --save-dev
```

**Note**: This package requires Node.js version with long-term support status (check [Active LTS or Maintenance LTS releases](https://nodejs.org/en/about/previous-releases)). It is not compatible with older versions.

## [Usage](#usage)

Add this to your `package.json` file:

```json
"prettier": "@wordpress/prettier-config"
```

Alternatively, add this to `.prettierrc` file:

```
"@wordpress/prettier-config"
```

Or add this to `.prettierrc.js` file:

```js
module.exports = require( '@wordpress/prettier-config' );
```

## [Contributing to this package](#contributing-to-this-package)

This is an individual package that’s part of the Gutenberg project. The project is organized as a monorepo. It’s made up of multiple self-contained software packages, each with a specific purpose. The packages in this monorepo are published to [npm](https://www.npmjs.com/) and used by [WordPress](https://make.wordpress.org/core/) as well as other software projects.

To find out more about contributing to this package or Gutenberg as a whole, please read the project’s main [contributor guide](https://github.com/WordPress/gutenberg/tree/HEAD/CONTRIBUTING.md).
