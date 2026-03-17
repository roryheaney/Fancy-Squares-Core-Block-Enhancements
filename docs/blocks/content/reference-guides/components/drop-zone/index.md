---
title: "DropZone"
slug: "drop-zone"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/drop-zone/"
generatedAt: 2025-12-30T18:16:20.885Z
---

`DropZone` is a component creating a drop zone area taking the full size of its parent element. It supports dropping files, HTML content or any other HTML drop event.

## [Usage](#usage)

```jsx
import { useState } from 'react';
import { DropZone } from '@wordpress/components';

const MyDropZone = () => {
    const [ hasDropped, setHasDropped ] = useState( false );

    return (
        <div>
            { hasDropped ? 'Dropped!' : 'Drop something here' }
            <DropZone
                onFilesDrop={ () => setHasDropped( true ) }
                onHTMLDrop={ () => setHasDropped( true ) }
                onDrop={ () => setHasDropped( true ) }
            />
        </div>
    );
}
```

## [Props](#props)

The component accepts the following props:

### [className](#classname)

A CSS `class` to give to the wrapper element.

*   Type: `String`
*   Default: `undefined`

### [label](#label)

A string to be shown within the drop zone area.

*   Type: `String`
*   Default: `Drop files to upload`

### [onFilesDrop](#onfilesdrop)

The function is called when dropping a file into the `DropZone`. It receives an array of dropped files as an argument.

*   Type: `Function`
*   Required: No
*   Default: `noop`

### [onHTMLDrop](#onhtmldrop)

The function is called when dropping HTML into the `DropZone`. It receives the HTML being dropped as an argument.

*   Type: `Function`
*   Required: No
*   Default: `noop`

### [onDrop](#ondrop)

The function is generic drop handler called if the `onFilesDrop` or `onHTMLDrop` are not called. It receives the drop `event` object as an argument.

*   Type: `Function`
*   Required: No
*   Default: `noop`
