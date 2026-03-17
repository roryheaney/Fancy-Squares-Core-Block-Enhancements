---
title: "BoxControl"
slug: "box-control"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/box-control/"
generatedAt: 2025-12-30T18:16:05.100Z
---

See the [WordPress Storybook](https://wordpress.github.io/gutenberg/?path=/docs/components-boxcontrol--docs) for more detailed, interactive documentation.

A control that lets users set values for top, right, bottom, and left. Can be  
used as an input control for values like `padding` or `margin`.

```jsx
import { useState } from 'react';
import { BoxControl } from '@wordpress/components';

function Example() {
  const [ values, setValues ] = useState( {
    top: '50px',
    left: '10%',
    right: '10%',
    bottom: '50px',
  } );

  return (
    <BoxControl
      __next40pxDefaultSize
      values={ values }
      onChange={ setValues }
    />
  );
};
```

## [Props](#props)

### [\_\_next40pxDefaultSize](#__next40pxdefaultsize)

*   Type: `boolean`
*   Required: No
*   Default: `false`

Start opting into the larger default height that will become the default size in a future version.

### [allowReset](#allowreset)

*   Type: `boolean`
*   Required: No
*   Default: `true`

If this property is true, a button to reset the box control is rendered.

### [id](#id)

*   Type: `string`
*   Required: No

The id to use as a base for the unique HTML id attribute of the control.

### [inputProps](#inputprops)

*   Type: `UnitControlPassthroughProps`
*   Required: No
*   Default: `{   min: 0,   }`

Props for the internal `UnitControl` components.

### [label](#label)

*   Type: `string`
*   Required: No
*   Default: `__( 'Box Control' )`

Heading label for the control.

### [onChange](#onchange)

*   Type: `(next: BoxControlValue) => void`
*   Required: No
*   Default: `() => {}`

A callback function when an input value changes.

### [presets](#presets)

*   Type: `Preset[]`
*   Required: No

Available presets to pick from.

### [presetKey](#presetkey)

*   Type: `string`
*   Required: No

The key of the preset to apply.  
If you provide a list of presets, you must provide a preset key to use.  
The format of preset selected values is going to be `var:preset|${ presetKey }|${ presetSlug }`

### [resetValues](#resetvalues)

*   Type: `BoxControlValue`
*   Required: No
*   Default: `{   top: undefined,   right: undefined,   bottom: undefined,   left: undefined,   }`

The `top`, `right`, `bottom`, and `left` box dimension values to use when the control is reset.

### [sides](#sides)

*   Type: `readonly (keyof BoxControlValue | "horizontal" | "vertical")[]`
*   Required: No

Collection of sides to allow control of. If omitted or empty, all sides will be available.

Allowed values are “top”, “right”, “bottom”, “left”, “vertical”, and “horizontal”.

### [splitOnAxis](#splitonaxis)

*   Type: `boolean`
*   Required: No
*   Default: `false`

If this property is true, when the box control is unlinked, vertical and horizontal controls  
can be used instead of updating individual sides.

### [units](#units)

*   Type: `WPUnitControlUnit[]`
*   Required: No
*   Default: `CSS_UNITS`

Available units to select from.

### [values](#values)

*   Type: `BoxControlValue`
*   Required: No

The current values of the control, expressed as an object of `top`, `right`, `bottom`, and `left` values.
