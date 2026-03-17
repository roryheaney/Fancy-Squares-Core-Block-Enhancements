---
title: "InputControl"
slug: "input-control"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/input-control/"
generatedAt: 2025-12-30T18:16:36.256Z
---

This feature is still experimental. “Experimental” means this is an early implementation subject to drastic and breaking changes.

InputControl components let users enter and edit text. This is an experimental component intended to (in time) merge with or replace [TextControl](../text-control).

## [Usage](#usage)

```js
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import { useState } from 'react';

const Example = () => {
    const [ value, setValue ] = useState( '' );

    return (
        <InputControl
            __next40pxDefaultSize
            value={ value }
            onChange={ ( nextValue ) => setValue( nextValue ?? '' ) }
        />
    );
};
```

## [Props](#props)

### [disabled](#disabled)

If true, the `input` will be disabled.

*   Type: `Boolean`
*   Required: No
*   Default: `false`

### [isPressEnterToChange](#ispressentertochange)

If true, the `ENTER` key press is required in order to trigger an `onChange`. If enabled, a change is also triggered when tabbing away (`onBlur`).

*   Type: `Boolean`
*   Required: No
*   Default: `false`

### [hideLabelFromVision](#hidelabelfromvision)

If true, the label will only be visible to screen readers.

*   Type: `Boolean`
*   Required: No

### [label](#label)

If this property is added, a label will be generated using label property as the content.

*   Type: `String`
*   Required: No

### [labelPosition](#labelposition)

The position of the label (`top`, `side`, `bottom`, or `edge`).

*   Type: `String`
*   Required: No

### [onChange](#onchange)

A function that receives the value of the input.

*   Type: `Function`
*   Required: Yes

### [prefix](#prefix)

Renders an element on the left side of the input.

*   Type: `React.ReactNode`
*   Required: No

### [size](#size)

Adjusts the size of the input.  
Sizes include: `default`, `small`

*   Type: `String`
*   Required: No
*   Default: `default`

### [suffix](#suffix)

Renders an element on the right side of the input.

*   Type: `React.ReactNode`
*   Required: No

### [type](#type)

Type of the input element to render. Defaults to “text”.

*   Type: `String`
*   Required: No
*   Default: “text”

### [value](#value)

The current value of the input.

*   Type: `String`
*   Required: No

### [\_\_next40pxDefaultSize](#__next40pxdefaultsize)

Start opting into the larger default height that will become the default size in a future version.

*   Type: `Boolean`
*   Required: No
*   Default: `false`
