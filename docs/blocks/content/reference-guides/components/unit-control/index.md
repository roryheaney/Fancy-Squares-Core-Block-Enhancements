---
title: "UnitControl"
slug: "unit-control"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/unit-control/"
generatedAt: 2025-12-30T18:17:08.960Z
---

This feature is still experimental. “Experimental” means this is an early implementation subject to drastic and breaking changes.

`UnitControl` allows the user to set a numeric quantity as well as a unit (e.g. `px`).

## [Usage](#usage)

```jsx
import { useState } from 'react';
import { __experimentalUnitControl as UnitControl } from '@wordpress/components';

const Example = () => {
    const [ value, setValue ] = useState( '10px' );

    return <UnitControl __next40pxDefaultSize onChange={ setValue } value={ value } />;
};
```

## [Props](#props)

### [disableUnits: boolean](#disableunits-boolean)

If true, the unit `<select>` is hidden.

*   Required: No
*   Default: `false`

### [isPressEnterToChange: boolean](#ispressentertochange-boolean)

If `true`, the `ENTER` key press is required in order to trigger an `onChange`. If enabled, a change is also triggered when tabbing away (`onBlur`).

*   Required: No
*   Default: `false`

### [isResetValueOnUnitChange: boolean](#isresetvalueonunitchange-boolean)

If `true`, and the selected unit provides a `default` value, this value is set when changing units.

*   Required: No
*   Default: `false`

### [isUnitSelectTabbable: boolean](#isunitselecttabbable-boolean)

Determines if the unit `<select>` is tabbable.

*   Required: No
*   Default: `true`

### [label: string](#label-string)

If this property is added, a label will be generated using label property as the content.

*   Required: No

### [labelPosition: string](#labelposition-string)

The position of the label (`top`, `side`, `bottom`, or `edge`).

*   Required: No

### [onBlur: FocusEventHandler< HTMLInputElement | HTMLSelectElement >](#onblur-focuseventhandler-htmlinputelement-htmlselectelement)

Callback invoked when either the quantity or unit inputs fire the `blur` event.

*   Required: No

### [onFocus: FocusEventHandler< HTMLInputElement | HTMLSelectElement >](#onfocus-focuseventhandler-htmlinputelement-htmlselectelement)

Callback invoked when either the quantity or unit inputs fire the `focus` event.

*   Required: No

### [onChange: UnitControlOnChangeCallback](#onchange-unitcontrolonchangecallback)

Callback when the `value` changes.

*   Required: No

### [onUnitChange: UnitControlOnChangeCallback](#onunitchange-unitcontrolonchangecallback)

Callback when the `unit` changes.

*   Required: No

### [size: string](#size-string)

Adjusts the size of the input.  
Sizes include: `default`, `small`

*   Required: No
*   Default: `default`

### [unit: string](#unit-string)

Deprecated: Current unit value.  
Instead, provide a unit with a value through the `value` prop.

Example:

```jsx
<UnitControl value="50%" />
```

*   Required: No

### [units: WPUnitControlUnit\[\]](#units-wpunitcontrolunit)

Collection of available units.

*   Required: No

Example:

```jsx
import { useState } from 'react';
import { __experimentalUnitControl as UnitControl } from '@wordpress/components';

const Example = () => {
    const [ value, setValue ] = useState( '10px' );

    const units = [
        { value: 'px', label: 'px', default: 0 },
        { value: '%', label: '%', default: 10 },
        { value: 'em', label: 'em', default: 0 },
    ];

    return (
        <UnitControl __next40pxDefaultSize onChange={ setValue } value={ value } units={ units } />
    );
};
```

A `default` value (in the example above, `10` for `%`), if defined, is set as the new `value` when a unit changes. This is helpful in scenarios where changing a unit may cause drastic results, such as changing from `px` to `vh`.

### [value: number | string](#value-number-string)

Current value. If passed as a string, the current unit will be inferred from this value.  
For example, a `value` of `50%` will set the current unit to `%`.

Example:

```jsx
<UnitControl __next40pxDefaultSize value="50%" />
```

*   Required: No

### [\_\_next40pxDefaultSize: boolean](#__next40pxdefaultsize-boolean)

Start opting into the larger default height that will become the default size in a future version.

*   Required: No
*   Default: `false`
