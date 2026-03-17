---
title: "@wordpress/autop"
slug: "packages-autop"
source: "https://developer.wordpress.org/block-editor/reference-guides/packages/packages-autop/"
generatedAt: 2025-12-30T18:17:42.092Z
---

JavaScript port of WordPress’s automatic paragraph function `autop` and the `removep` reverse behavior.

## [Installation](#installation)

Install the module

```bash
npm install @wordpress/autop --save
```

_This package assumes that your code will run in an **ES2015+** environment. If you’re using an environment that has limited or no support for such language features and APIs, you should include [the polyfill shipped in `@wordpress/babel-preset-default`](https://github.com/WordPress/gutenberg/tree/HEAD/packages/babel-preset-default#polyfill) in your code._

### [API](#api)

#### [autop](#autop)

Replaces double line-breaks with paragraph elements.

A group of regex replaces used to identify text formatted with newlines and replace double line-breaks with HTML paragraph tags. The remaining linebreaks after conversion become `<br />` tags, unless br is set to ‘false’.

_Usage_

```js
import { autop } from '@wordpress/autop';
autop( 'my text' ); // "<p>my text</p>"
```

_Parameters_

*   _text_ `string`: The text which has to be formatted.
*   _br_ `boolean`: Optional. If set, will convert all remaining line- breaks after paragraphing. Default true.

_Returns_

*   `string`: Text which has been converted into paragraph tags.

#### [removep](#removep)

Replaces `<p>` tags with two line breaks. “Opposite” of autop().

Replaces `<p>` tags with two line breaks except where the `<p>` has attributes. Unifies whitespace. Indents `<li>`, `<dt>` and `<dd>` for better readability.

_Usage_

```js
import { removep } from '@wordpress/autop';
removep( '<p>my text</p>' ); // "my text"
```

_Parameters_

*   _html_ `string`: The content from the editor.

_Returns_

*   `string`: The content with stripped paragraph tags.

## [Contributing to this package](#contributing-to-this-package)

This is an individual package that’s part of the Gutenberg project. The project is organized as a monorepo. It’s made up of multiple self-contained software packages, each with a specific purpose. The packages in this monorepo are published to [npm](https://www.npmjs.com/) and used by [WordPress](https://make.wordpress.org/core/) as well as other software projects.

To find out more about contributing to this package or Gutenberg as a whole, please read the project’s main [contributor guide](https://github.com/WordPress/gutenberg/tree/HEAD/CONTRIBUTING.md).
