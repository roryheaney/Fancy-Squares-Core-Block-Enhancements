---
title: "BorderBoxControl"
slug: "border-box-control"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/border-box-control/"
generatedAt: 2025-12-30T18:16:03.420Z
---

An input control for the color, style, and width of the border of a box. The  
border can be customized as a whole, or individually for each side of the box.

## [Development guidelines](#development-guidelines)

The `BorderBoxControl` effectively has two view states. The first, a “linked”  
view, allows configuration of a flat border via a single `BorderControl`.  
The second, a “split” view, contains a `BorderControl` for each side  
as well as a visualizer for the currently selected borders. Each view also  
contains a button to toggle between the two.

When switching from the “split” view to “linked”, if the individual side  
borders are not consistent, the “linked” view will display any border properties  
selections that are consistent while showing a mixed state for those that  
aren’t. For example, if all borders had the same color and style but different  
widths, then the border dropdown in the “linked” view’s `BorderControl` would  
show that consistent color and style but the “linked” view’s width input would  
show “Mixed” placeholder text.

## [Usage](#usage)

```jsx
import { useState } from 'react';
import { BorderBoxControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const colors = [
    { name: 'Blue 20', color: '#72aee6' },
    // ...
];

const MyBorderBoxControl = () => {
    const defaultBorder = {
        color: '#72aee6',
        style: 'dashed',
        width: '1px',
    };
    const [ borders, setBorders ] = useState( {
        top: defaultBorder,
        right: defaultBorder,
        bottom: defaultBorder,
        left: defaultBorder,
    } );
    const onChange = ( newBorders ) => setBorders( newBorders );

    return (
        <BorderBoxControl
            __next40pxDefaultSize
            colors={ colors }
            label={ __( 'Borders' ) }
            onChange={ onChange }
            value={ borders }
        />
    );
};
```

If you’re using this component outside the editor, you can  
[ensure `Tooltip` positioning](https://developer.wordpress.org/block-editor/reference-guide/components/#popovers-and-tooltips)  
for the `BorderBoxControl`‘s color and style options, by rendering your  
`BorderBoxControl` with a `Popover.Slot` further up the element tree and within  
a `SlotFillProvider` overall.

## [Props](#props)

### [colors: ( PaletteObject | ColorObject )\[\]](#colors-paletteobject-colorobject)

An array of color definitions. This may also be a multi-dimensional array where  
colors are organized by multiple origins.

Each color may be an object containing a `name` and `color` value.

*   Required: No
*   Default: `[]`

### [disableCustomColors: boolean](#disablecustomcolors-boolean)

This toggles the ability to choose custom colors.

*   Required: No

### [enableAlpha: boolean](#enablealpha-boolean)

This controls whether the alpha channel will be offered when selecting  
custom colors.

*   Required: No
*   Default: `false`

### [enableStyle: boolean](#enablestyle-boolean)

This controls whether to support border style selections.

*   Required: No
*   Default: `true`

### [hideLabelFromVision: boolean](#hidelabelfromvision-boolean)

Provides control over whether the label will only be visible to screen readers.

*   Required: No

### [label: string](#label-string)

If provided, a label will be generated using this as the content.

_Whether it is visible only to screen readers is controlled via  
`hideLabelFromVision`._

*   Required: No

### [onChange: ( value?: Object ) => void](#onchange-value-object-void)

A callback function invoked when any border value is changed. The value received  
may be a “flat” border object, one that has properties defining individual side  
borders, or `undefined`.

_Note: The will be `undefined` if a user clears all borders._

*   Required: Yes

### [popoverPlacement: string](#popoverplacement-string)

The position of the color popovers relative to the control wrapper.

By default, popovers are displayed relative to the button that initiated the popover. By supplying a popover placement, you force the popover to display in a specific location.

The available base placements are ‘top’, ‘right’, ‘bottom’, ‘left’. Each of these base placements has an alignment in the form -start and -end. For example, ‘right-start’, or ‘bottom-end’. These allow you to align the tooltip to the edges of the button, rather than centering it.

*   Required: No

### [popoverOffset: number](#popoveroffset-number)

The space between the popover and the control wrapper.

*   Required: No

### [size: string](#size-string)

Size of the control.

*   Required: No
*   Default: `default`
*   Allowed values: `default`, `__unstable-large`

### [value: Object](#value-object)

An object representing the current border configuration.

This may be a “flat” border where the object has `color`, `style`, and `width`  
properties or a “split” border which defines the previous properties but for  
each side; `top`, `right`, `bottom`, and `left`.

Examples:

```js
const flatBorder = { color: '#72aee6', style: 'solid', width: '1px' };
const splitBorders = {
    top: { color: '#72aee6', style: 'solid', width: '1px' },
    right: { color: '#e65054', style: 'dashed', width: '2px' },
    bottom: { color: '#68de7c', style: 'solid', width: '1px' },
    left: { color: '#f2d675', style: 'dotted', width: '1em' },
};
```

*   Required: No

### [\_\_next40pxDefaultSize: boolean](#__next40pxdefaultsize-boolean)

Start opting into the larger default height that will become the default size in a future version.

*   Required: No
*   Default: `false`
