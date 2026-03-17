---
title: "@wordpress/warning"
slug: "packages-warning"
source: "https://developer.wordpress.org/block-editor/reference-guides/packages/packages-warning/"
generatedAt: 2025-12-30T18:18:48.735Z
---

Utility for warning messages to the console based on a passed condition.

## [Installation](#installation)

Install the module

```bash
npm install @wordpress/warning --save
```

_This package assumes that your code will run in an **ES2015+** environment. If you’re using an environment that has limited or no support for such language features and APIs, you should include [the polyfill shipped in `@wordpress/babel-preset-default`](https://github.com/WordPress/gutenberg/tree/HEAD/packages/babel-preset-default#polyfill) in your code._

## [Reducing bundle size](#reducing-bundle-size)

Literal strings aren’t minified. Keeping them in your production bundle may increase the bundle size significantly.

To prevent that, you should:

1.  Put `@wordpress/warning/babel-plugin` into your [babel config](https://babeljs.io/docs/plugins#plugin-options) or use [`@wordpress/babel-preset-default`](https://www.npmjs.com/package/@wordpress/babel-preset-default), which already includes the babel plugin.
    
    This will make sure your `warning` calls are wrapped within a condition that checks if `SCRIPT_DEBUG === true`.
    
2.  Use [UglifyJS](https://github.com/mishoo/UglifyJS2), [Terser](https://github.com/terser/terser) or any other JavaScript parser that performs [dead code elimination](https://en.wikipedia.org/wiki/Dead_code_elimination). This is usually used in conjunction with JavaScript bundlers, such as [webpack](https://github.com/webpack/webpack).
    
    When parsing the code in `production` mode, the `warning` call will be removed altogether.
    

## [API](#api)

### [default](#default)

Shows a warning with `message` if environment is not `production`.

_Usage_

```js
import warning from '@wordpress/warning';

function MyComponent( props ) {
  if ( ! props.title ) {
    warning( '`props.title` was not passed' );
  }
  ...
}
```

_Parameters_

*   _message_ `string`: Message to show in the warning.

## [Contributing to this package](#contributing-to-this-package)

This is an individual package that’s part of the Gutenberg project. The project is organized as a monorepo. It’s made up of multiple self-contained software packages, each with a specific purpose. The packages in this monorepo are published to [npm](https://www.npmjs.com/) and used by [WordPress](https://make.wordpress.org/core/) as well as other software projects.

To find out more about contributing to this package or Gutenberg as a whole, please read the project’s main [contributor guide](https://github.com/WordPress/gutenberg/tree/HEAD/CONTRIBUTING.md).
