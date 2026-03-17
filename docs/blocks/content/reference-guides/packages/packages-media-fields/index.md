---
title: "@wordpress/media-fields"
slug: "packages-media-fields"
source: "https://developer.wordpress.org/block-editor/reference-guides/packages/packages-media-fields/"
generatedAt: 2025-12-30T18:18:26.666Z
---

This package provides reusable field definitions for displaying and editing media attachment properties in WordPress DataViews. It’s primarily intended for internal use within Gutenberg and may change significantly between releases.

## [Usage](#usage)

### [Available Fields](#available-fields)

This package exports field definitions for common media attachment properties:

*   `altTextField` – Alternative text for images
*   `captionField` – Media caption text
*   `descriptionField` – Detailed description
*   `filenameField` – File name (read-only)
*   `filesizeField` – File size with human-readable formatting
*   `mediaDimensionsField` – Image dimensions (width × height)
*   `mediaThumbnailField` – Thumbnail preview
*   `mimeTypeField` – MIME type display

### [Using Media Fields in DataViews](#using-media-fields-in-dataviews)

```jsx
import {
    altTextField,
    captionField,
    filesizeField,
} from '@wordpress/media-fields';
import { DataViews } from '@wordpress/dataviews';

const fields = [
    altTextField,
    captionField,
    filesizeField,
];

export function MyMediaLibrary( { items } ) {
    return (
        <DataViews
            data={ items }
            fields={ fields }
            view={ view }
            onChangeView={ setView }
        />
    );
}
```

## [Contributing to this package](#contributing-to-this-package)

This package is part of the Gutenberg project. To find out more about contributing to this package or Gutenberg as a whole, please read the project’s main [contributor guide](https://github.com/WordPress/gutenberg/tree/HEAD/CONTRIBUTING.md).
