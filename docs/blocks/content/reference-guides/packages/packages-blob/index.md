---
title: "@wordpress/blob"
slug: "packages-blob"
source: "https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blob/"
generatedAt: 2025-12-30T18:17:45.574Z
---

Blob utilities for WordPress.

## [Installation](#installation)

Install the module

```bash
npm install @wordpress/blob --save
```

## [API](#api)

### [createBlobURL](#createbloburl)

Create a blob URL from a file.

_Parameters_

*   _file_ `File`: The file to create a blob URL for.

_Returns_

*   `string`: The blob URL.

### [downloadBlob](#downloadblob)

Downloads a file, e.g., a text or readable stream, in the browser. Appropriate for downloading smaller file sizes, e.g., \\< 5 MB.

Example usage:

```js
const fileContent = JSON.stringify(
    {
        title: 'My Post',
    },
    null,
    2
);
const filename = 'file.json';

downloadBlob( filename, fileContent, 'application/json' );
```

_Parameters_

*   _filename_ `string`: File name.
*   _content_ `BlobPart`: File content (BufferSource | Blob | string).
*   _contentType_ `string`: (Optional) File mime type. Default is `''`.

### [getBlobByURL](#getblobbyurl)

Retrieve a file based on a blob URL. The file must have been created by `createBlobURL` and not removed by `revokeBlobURL`, otherwise it will return `undefined`.

_Parameters_

*   _url_ `string`: The blob URL.

_Returns_

*   `File | undefined`: The file for the blob URL.

### [getBlobTypeByURL](#getblobtypebyurl)

Retrieve a blob type based on URL. The file must have been created by `createBlobURL` and not removed by `revokeBlobURL`, otherwise it will return `undefined`.

_Parameters_

*   _url_ `string`: The blob URL.

_Returns_

*   `string | undefined`: The blob type.

### [isBlobURL](#isbloburl)

Check whether a url is a blob url.

_Parameters_

*   _url_ `string | undefined`: The URL.

_Returns_

*   `boolean`: Is the url a blob url?

### [revokeBlobURL](#revokebloburl)

Remove the resource and file cache from memory.

_Parameters_

*   _url_ `string`: The blob URL.

## [Contributing to this package](#contributing-to-this-package)

This is an individual package that’s part of the Gutenberg project. The project is organized as a monorepo. It’s made up of multiple self-contained software packages, each with a specific purpose. The packages in this monorepo are published to [npm](https://www.npmjs.com/) and used by [WordPress](https://make.wordpress.org/core/) as well as other software projects.

To find out more about contributing to this package or Gutenberg as a whole, please read the project’s main [contributor guide](https://github.com/WordPress/gutenberg/tree/HEAD/CONTRIBUTING.md).
