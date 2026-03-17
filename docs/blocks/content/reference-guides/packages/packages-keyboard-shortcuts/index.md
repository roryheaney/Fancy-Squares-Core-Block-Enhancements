---
title: "@wordpress/keyboard-shortcuts"
slug: "packages-keyboard-shortcuts"
source: "https://developer.wordpress.org/block-editor/reference-guides/packages/packages-keyboard-shortcuts/"
generatedAt: 2025-12-30T18:18:21.419Z
---

Keyboard shortcuts is a generic package that allows registering and modifying shortcuts.

## [Installation](#installation)

Install the module

```bash
npm install @wordpress/keyboard-shortcuts --save
```

_This package assumes that your code will run in an **ES2015+** environment. If you’re using an environment that has limited or no support for such language features and APIs, you should include [the polyfill shipped in `@wordpress/babel-preset-default`](https://github.com/WordPress/gutenberg/tree/HEAD/packages/babel-preset-default#polyfill) in your code._

## [API](#api)

### [ShortcutProvider](#shortcutprovider)

Handles callbacks added to context by `useShortcut`. Adding a provider allows to register contextual shortcuts that are only active when a certain part of the UI is focused.

_Parameters_

*   _props_ `Object`: Props to pass to `div`.

_Returns_

*   `Element`: Component.

### [store](#store)

Store definition for the keyboard shortcuts namespace.

_Related_

*   [https://github.com/WordPress/gutenberg/blob/HEAD/packages/data/README.md#createReduxStore](https://github.com/WordPress/gutenberg/blob/HEAD/packages/data/README.md#createReduxStore)

_Type_

*   `Object`

### [useShortcut](#useshortcut)

Attach a keyboard shortcut handler.

_Parameters_

*   _name_ `string`: Shortcut name.
*   _callback_ `Function`: Shortcut callback.
*   _options_ `Object`: Shortcut options.
*   _options.isDisabled_ `boolean`: Whether to disable to shortut.

## [Contributing to this package](#contributing-to-this-package)

This is an individual package that’s part of the Gutenberg project. The project is organized as a monorepo. It’s made up of multiple self-contained software packages, each with a specific purpose. The packages in this monorepo are published to [npm](https://www.npmjs.com/) and used by [WordPress](https://make.wordpress.org/core/) as well as other software projects.

To find out more about contributing to this package or Gutenberg as a whole, please read the project’s main [contributor guide](https://github.com/WordPress/gutenberg/tree/HEAD/CONTRIBUTING.md).
