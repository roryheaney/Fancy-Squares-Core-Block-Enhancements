---
title: "@wordpress/browserslist-config"
slug: "packages-browserslist-config"
source: "https://developer.wordpress.org/block-editor/reference-guides/packages/packages-browserslist-config/"
generatedAt: 2025-12-30T18:17:50.871Z
---

[WordPress Browserslist](https://make.wordpress.org/core/handbook/best-practices/browser-support/) shareable config for [Browserslist](https://www.npmjs.com/package/browserslist).

## [Installation](#installation)

Install the module

```shell
$ npm install browserslist @wordpress/browserslist-config --save-dev
```

**Note**: This package requires Node.js version with long-term support status (check [Active LTS or Maintenance LTS releases](https://nodejs.org/en/about/previous-releases)). It is not compatible with older versions.

## [Usage](#usage)

Add this to your `package.json` file:

```json
"browserslist": [
    "extends @wordpress/browserslist-config"
]
```

Alternatively, add this to `.browserslistrc` file:

```
extends @wordpress/browserslist-config
```

This package when imported returns an array of supported browsers, for more configuration examples including Autoprefixer, Babel, ESLint, PostCSS, and stylelint see the [Browserslist examples](https://github.com/ai/browserslist-example#browserslist-example) repo.

## [Contributing to this package](#contributing-to-this-package)

This is an individual package that’s part of the Gutenberg project. The project is organized as a monorepo. It’s made up of multiple self-contained software packages, each with a specific purpose. The packages in this monorepo are published to [npm](https://www.npmjs.com/) and used by [WordPress](https://make.wordpress.org/core/) as well as other software projects.

To find out more about contributing to this package or Gutenberg as a whole, please read the project’s main [contributor guide](https://github.com/WordPress/gutenberg/tree/HEAD/CONTRIBUTING.md).
