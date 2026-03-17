---
title: "@wordpress/block-directory"
slug: "packages-block-directory"
source: "https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-directory/"
generatedAt: 2025-12-30T18:17:46.571Z
---

Package used to extend editor with block directory features to search and install blocks.

> This package is meant to be used only with WordPress core. Feel free to use it in your own project but please keep in mind that it might never get fully documented.

## [Installation](#installation)

Install the module

```bash
npm install @wordpress/block-directory --save
```

_This package assumes that your code will run in an **ES2015+** environment. If you’re using an environment that has limited or no support for such language features and APIs, you should include [the polyfill shipped in `@wordpress/babel-preset-default`](https://github.com/WordPress/gutenberg/tree/HEAD/packages/babel-preset-default#polyfill) in your code._

## [Usage](#usage)

This package builds a standalone JS file. When loaded on a page with the block editor, it extends the block inserter to search for blocks from WordPress.org.

To do this, it uses the `__unstableInserterMenuExtension`, a slot-fill area hooked into the block types list. When the user runs a search and there are no results currently installed, it fires off a request to WordPress.org for matching blocks. These are listed for the user to install with a one-click process that [installs, activates, and injects the block into the post.](./src/store/actions.js#L49) When the post is saved, if the block was not used, it will be [silently uninstalled](./src/store/actions.js#L129) to avoid clutter.

See also the API endpoints for searching WordPress.org: `/wp/v2/block-directory/search`, and installing & activating plugins: `/wp/v2/plugins/`.

## [Actions](#actions)

The following set of dispatching action creators are available on the object returned by `wp.data.dispatch( 'core/block-directory' )`:

### [addInstalledBlockType](#addinstalledblocktype)

Returns an action object used to add a block type to the “newly installed” tracking list.

_Parameters_

*   _item_ `Object`: The block item with the block id and name.

_Returns_

*   `Object`: Action object.

### [clearErrorNotice](#clearerrornotice)

Sets the error notice to empty for specific block.

_Parameters_

*   _blockId_ `string`: The ID of the block plugin. eg: my-block

_Returns_

*   `Object`: Action object.

### [fetchDownloadableBlocks](#fetchdownloadableblocks)

Returns an action object used in signalling that the downloadable blocks have been requested and are loading.

_Parameters_

*   _filterValue_ `string`: Search string.

_Returns_

*   `Object`: Action object.

### [installBlockType](#installblocktype)

Action triggered to install a block plugin.

_Parameters_

*   _block_ `Object`: The block item returned by search.

_Returns_

*   `boolean`: Whether the block was successfully installed & loaded.

### [receiveDownloadableBlocks](#receivedownloadableblocks)

Returns an action object used in signalling that the downloadable blocks have been updated.

_Parameters_

*   _downloadableBlocks_ `Array`: Downloadable blocks.
*   _filterValue_ `string`: Search string.

_Returns_

*   `Object`: Action object.

### [removeInstalledBlockType](#removeinstalledblocktype)

Returns an action object used to remove a block type from the “newly installed” tracking list.

_Parameters_

*   _item_ `string`: The block item with the block id and name.

_Returns_

*   `Object`: Action object.

### [setErrorNotice](#seterrornotice)

Sets an error notice to be displayed to the user for a given block.

_Parameters_

*   _blockId_ `string`: The ID of the block plugin. eg: my-block
*   _message_ `string`: The message shown in the notice.
*   _isFatal_ `boolean`: Whether the user can recover from the error.

_Returns_

*   `Object`: Action object.

### [setIsInstalling](#setisinstalling)

Returns an action object used to indicate install in progress.

_Parameters_

*   _blockId_ `string`:
*   _isInstalling_ `boolean`:

_Returns_

*   `Object`: Action object.

### [uninstallBlockType](#uninstallblocktype)

Action triggered to uninstall a block plugin.

_Parameters_

*   _block_ `Object`: The blockType object.

## [Selectors](#selectors)

The following selectors are available on the object returned by `wp.data.select( 'core/block-directory' )`:

### [getDownloadableBlocks](#getdownloadableblocks)

Returns the available uninstalled blocks.

_Parameters_

*   _state_ `Object`: Global application state.
*   _filterValue_ `string`: Search string.

_Returns_

*   `Array`: Downloadable blocks.

### [getErrorNoticeForBlock](#geterrornoticeforblock)

Returns the error notice for a given block.

_Parameters_

*   _state_ `Object`: Global application state.
*   _blockId_ `string`: The ID of the block plugin. eg: my-block

_Returns_

*   `string|boolean`: The error text, or false if no error.

### [getErrorNotices](#geterrornotices)

Returns all block error notices.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `Object`: Object with error notices.

### [getInstalledBlockTypes](#getinstalledblocktypes)

Returns the block types that have been installed on the server in this session.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `Array`: Block type items

### [getNewBlockTypes](#getnewblocktypes)

Returns block types that have been installed on the server and used in the current post.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `Array`: Block type items.

### [getUnusedBlockTypes](#getunusedblocktypes)

Returns the block types that have been installed on the server but are not used in the current post.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `Array`: Block type items.

### [isInstalling](#isinstalling)

Returns true if a block plugin install is in progress.

_Parameters_

*   _state_ `Object`: Global application state.
*   _blockId_ `string`: Id of the block.

_Returns_

*   `boolean`: Whether this block is currently being installed.

### [isRequestingDownloadableBlocks](#isrequestingdownloadableblocks)

Returns true if application is requesting for downloadable blocks.

_Parameters_

*   _state_ `Object`: Global application state.
*   _filterValue_ `string`: Search string.

_Returns_

*   `boolean`: Whether a request is in progress for the blocks list.

## [Contributing to this package](#contributing-to-this-package)

This is an individual package that’s part of the Gutenberg project. The project is organized as a monorepo. It’s made up of multiple self-contained software packages, each with a specific purpose. The packages in this monorepo are published to [npm](https://www.npmjs.com/) and used by [WordPress](https://make.wordpress.org/core/) as well as other software projects.

To find out more about contributing to this package or Gutenberg as a whole, please read the project’s main [contributor guide](https://github.com/WordPress/gutenberg/tree/HEAD/CONTRIBUTING.md).
