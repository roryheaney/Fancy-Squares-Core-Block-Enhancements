---
title: "@wordpress/icons"
slug: "packages-icons"
source: "https://developer.wordpress.org/block-editor/reference-guides/packages/packages-icons/"
generatedAt: 2025-12-30T18:18:15.458Z
---

WordPress Icons Library.

## [Installation](#installation)

Install the module:

```bash
npm install @wordpress/icons --save
```

_This package assumes that your code will run in an **ES2015+** environment. If you’re using an environment that has limited or no support for such language features and APIs, you should include [the polyfill shipped in `@wordpress/babel-preset-default`](https://github.com/WordPress/gutenberg/tree/HEAD/packages/babel-preset-default#polyfill) in your code._

## [Usage](#usage)

```js
import { Icon, check } from '@wordpress/icons';

<Icon icon={ check } />;
```

## [Props](#props)

Name

Type

Default

Description

`size`

`integer`

`24`

Size of icon in pixels.

## [Docs & Examples](#docs-examples)

You can browse the icons docs and examples at [https://wordpress.github.io/gutenberg/?path=/docs/icons-icon–default](https://wordpress.github.io/gutenberg/?path=/docs/icons-icon--default)

## [Contributing to this package](#contributing-to-this-package)

This is an individual package that’s part of the Gutenberg project. The project is organized as a monorepo. It’s made up of multiple self-contained software packages, each with a specific purpose. The packages in this monorepo are published to [npm](https://www.npmjs.com/) and used by [WordPress](https://make.wordpress.org/core/) as well as other software projects.

To find out more about contributing to this package or Gutenberg as a whole, please read the project’s main [contributor guide](https://github.com/WordPress/gutenberg/tree/HEAD/CONTRIBUTING.md).
