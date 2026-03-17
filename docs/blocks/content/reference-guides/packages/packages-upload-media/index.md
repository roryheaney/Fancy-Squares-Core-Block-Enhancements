---
title: "@wordpress/upload-media"
slug: "packages-upload-media"
source: "https://developer.wordpress.org/block-editor/reference-guides/packages/packages-upload-media/"
generatedAt: 2025-12-30T18:18:46.192Z
---

This package is still experimental. “Experimental” means this is an early implementation subject to drastic and breaking changes.

This module is a media upload handler with a queue-like system that is implemented using a custom `@wordpress/data` store.

Such a system is useful for additional client-side processing of media files (e.g. image compression) before uploading them to a server.

It is typically used by `@wordpress/block-editor` but can also be leveraged outside of it.

## [Installation](#installation)

Install the module

```bash
npm install @wordpress/upload-media --save
```

## [Usage](#usage)

This is a basic example of how one can interact with the upload data store:

```js
import { store as uploadStore } from '@wordpress/upload-media';
import { dispatch } from '@wordpress/data';

dispatch( uploadStore ).updateSettings( /* ... */ );
dispatch( uploadStore ).addItems( [
    /* ... */
] );
```

Refer to the API reference below or the TypeScript types for further help.

## [API Reference](#api-reference)

### [Actions](#actions)

The following set of dispatching action creators are available on the object returned by `wp.data.dispatch( 'core/upload-media' )`:

#### [addItems](#additems)

Adds a new item to the upload queue.

_Parameters_

*   _$0_ `AddItemsArgs`:
*   _$0.files_ `AddItemsArgs[ 'files' ]`: Files
*   _$0.onChange_ `[AddItemsArgs[ 'onChange' ]]`: Function called each time a file or a temporary representation of the file is available.
*   _$0.onSuccess_ `[AddItemsArgs[ 'onSuccess' ]]`: Function called after the file is uploaded.
*   _$0.onBatchSuccess_ `[AddItemsArgs[ 'onBatchSuccess' ]]`: Function called after a batch of files is uploaded.
*   _$0.onError_ `[AddItemsArgs[ 'onError' ]]`: Function called when an error happens.
*   _$0.additionalData_ `[AddItemsArgs[ 'additionalData' ]]`: Additional data to include in the request.
*   _$0.allowedTypes_ `[AddItemsArgs[ 'allowedTypes' ]]`: Array with the types of media that can be uploaded, if unset all types are allowed.

#### [cancelItem](#cancelitem)

Cancels an item in the queue based on an error.

_Parameters_

*   _id_ `QueueItemId`: Item ID.
*   _error_ `Error`: Error instance.
*   _silent_ Whether to cancel the item silently, without invoking its `onError` callback.

### [Selectors](#selectors)

The following selectors are available on the object returned by `wp.data.select( 'core/upload-media' )`:

#### [getItems](#getitems)

Returns all items currently being uploaded.

_Parameters_

*   _state_ `State`: Upload state.

_Returns_

*   `QueueItem[]`: Queue items.

#### [getSettings](#getsettings)

Returns the media upload settings.

_Parameters_

*   _state_ `State`: Upload state.

_Returns_

*   `Settings`: Settings

#### [isUploading](#isuploading)

Determines whether any upload is currently in progress.

_Parameters_

*   _state_ `State`: Upload state.

_Returns_

*   `boolean`: Whether any upload is currently in progress.

#### [isUploadingById](#isuploadingbyid)

Determines whether an upload is currently in progress given an attachment ID.

_Parameters_

*   _state_ `State`: Upload state.
*   _attachmentId_ `number`: Attachment ID.

_Returns_

*   `boolean`: Whether upload is currently in progress for the given attachment.

#### [isUploadingByUrl](#isuploadingbyurl)

Determines whether an upload is currently in progress given an attachment URL.

_Parameters_

*   _state_ `State`: Upload state.
*   _url_ `string`: Attachment URL.

_Returns_

*   `boolean`: Whether upload is currently in progress for the given attachment.
