---
title: "AlignmentMatrixControl"
slug: "alignment-matrix-control"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/alignment-matrix-control/"
generatedAt: 2025-12-30T18:15:59.245Z
---

See the [WordPress Storybook](https://wordpress.github.io/gutenberg/?path=/docs/components-alignmentmatrixcontrol--docs) for more detailed, interactive documentation.

AlignmentMatrixControl components enable adjustments to horizontal and vertical alignments for UI.

```jsx
import { AlignmentMatrixControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

const Example = () => {
    const [ alignment, setAlignment ] = useState( 'center center' );

    return (
        <AlignmentMatrixControl
            value={ alignment }
            onChange={ setAlignment }
        />
    );
};
```

## [Props](#props)

### [defaultValue](#defaultvalue)

*   Type: `"center" | "top left" | "top center" | "top right" | "center left" | "center center" | "center right" | "bottom left" | "bottom center" | "bottom right"`
*   Required: No
*   Default: `'center center'`

If provided, sets the default alignment value.

### [label](#label)

*   Type: `string`
*   Required: No
*   Default: `'Alignment Matrix Control'`

Accessible label. If provided, sets the `aria-label` attribute of the  
underlying `grid` widget.

### [onChange](#onchange)

*   Type: `(newValue: AlignmentMatrixControlValue) => void`
*   Required: No

A function that receives the updated alignment value.

### [value](#value)

*   Type: `"center" | "top left" | "top center" | "top right" | "center left" | "center center" | "center right" | "bottom left" | "bottom center" | "bottom right"`
*   Required: No

The current alignment value.

### [width](#width)

*   Type: `number`
*   Required: No
*   Default: `92`

If provided, sets the width of the control.

## [Subcomponents](#subcomponents)

### [AlignmentMatrixControl.Icon](#alignmentmatrixcontrol-icon)

#### [Props](#props-2)

##### [disablePointerEvents](#disablepointerevents)

*   Type: `boolean`
*   Required: No
*   Default: `true`

If `true`, disables pointer events on the icon.

##### [value](#value-2)

*   Type: `"center" | "top left" | "top center" | "top right" | "center left" | "center center" | "center right" | "bottom left" | "bottom center" | "bottom right"`
*   Required: No
*   Default: `center`

The current alignment value.
