---
title: "@wordpress/deprecated"
slug: "packages-deprecated"
source: "https://developer.wordpress.org/block-editor/reference-guides/packages/packages-deprecated/"
generatedAt: 2025-12-30T18:18:01.798Z
---

Deprecation utility for WordPress. Logs a message to notify developers about a deprecated feature.

## [Installation](#installation)

Install the module

```bash
npm install @wordpress/deprecated --save
```

_This package assumes that your code will run in an **ES2015+** environment. If you’re using an environment that has limited or no support for such language features and APIs, you should include [the polyfill shipped in `@wordpress/babel-preset-default`](https://github.com/WordPress/gutenberg/tree/HEAD/packages/babel-preset-default#polyfill) in your code._

## [Hook](#hook)

The `deprecated` action is fired with three parameters: the name of the deprecated feature, the options object passed to deprecated, and the message sent to the console.

_Example:_

```js
import { addAction } from '@wordpress/hooks';

function addDeprecationAlert( message, { version } ) {
    alert( `Deprecation: ${ message }. Version: ${ version }` );
}

addAction(
    'deprecated',
    'my-plugin/add-deprecation-alert',
    addDeprecationAlert
);
```

## [API](#api)

### [default](#default)

Logs a message to notify developers about a deprecated feature.

_Usage_

```js
import deprecated from '@wordpress/deprecated';

deprecated( 'Eating meat', {
    since: '2019.01.01',
    version: '2020.01.01',
    alternative: 'vegetables',
    plugin: 'the earth',
    hint: 'You may find it beneficial to transition gradually.',
} );

// Logs: 'Eating meat is deprecated since version 2019.01.01 and will be removed from the earth in version 2020.01.01. Please use vegetables instead. Note: You may find it beneficial to transition gradually.'
```

_Parameters_

*   _feature_ `string`: Name of the deprecated feature.
*   _options_ `[DeprecatedOptions]`: Personalisation options

### [logged](#logged)

Object map tracking messages which have been logged, for use in ensuring a message is only logged once.

_Type_

*   `Record< string, true >`

## [Contributing to this package](#contributing-to-this-package)

This is an individual package that’s part of the Gutenberg project. The project is organized as a monorepo. It’s made up of multiple self-contained software packages, each with a specific purpose. The packages in this monorepo are published to [npm](https://www.npmjs.com/) and used by [WordPress](https://make.wordpress.org/core/) as well as other software projects.

To find out more about contributing to this package or Gutenberg as a whole, please read the project’s main [contributor guide](https://github.com/WordPress/gutenberg/tree/HEAD/CONTRIBUTING.md).
