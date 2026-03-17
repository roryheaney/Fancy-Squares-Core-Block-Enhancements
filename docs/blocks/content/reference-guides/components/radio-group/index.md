---
title: "RadioGroup"
slug: "radio-group"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/radio-group/"
generatedAt: 2025-12-30T18:16:48.665Z
---

This component is deprecated. Consider using \`RadioControl\` or \`ToggleGroupControl\` instead.

This feature is still experimental. “Experimental” means this is an early implementation subject to drastic and breaking changes.

Use a RadioGroup component when you want users to select one option from a small set of options.

![RadioGroup component](https://i0.wp.com/wordpress.org/gutenberg/files/2018/12/s_96EC471FE9C9D91A996770229947AAB54A03351BDE98F444FD3C1BF0CED365EA_1541792995815_ButtonGroup.png?ssl=1)

## [Design guidelines](#design-guidelines)

### [Usage](#usage)

#### [Selected action](#selected-action)

Only one option in a radio group can be selected and active at a time. Selecting one option deselects any other.

### [Best practices](#best-practices)

Radio groups should:

*   **Be clearly and accurately labeled.**
*   **Clearly communicate that clicking or tapping will trigger an action.**
*   **Use established colors appropriately.** For example, only use red buttons for actions that are difficult or impossible to undo.
*   **Have consistent locations in the interface.**
*   **Have a default option already selected.**

### [States](#states)

#### [Active and available radio groups](#active-and-available-radio-groups)

A radio group’s state makes it clear which option is active. Hover and focus states express the available selection options for buttons in a button group.

#### [Disabled radio groups](#disabled-radio-groups)

Radio groups that cannot be selected can either be given a disabled state, or be hidden.

## [Development guidelines](#development-guidelines)

### [Usage](#usage-2)

#### [Controlled](#controlled)

```jsx
import { useState } from 'react';
import {
    __experimentalRadio as Radio,
    __experimentalRadioGroup as RadioGroup,
} from '@wordpress/components';

const MyControlledRadioRadioGroup = () => {
    const [ checked, setChecked ] = useState( '25' );
    return (
        <RadioGroup label="Width" onChange={ setChecked } checked={ checked }>
            <Radio __next40pxDefaultSize value="25">25%</Radio>
            <Radio __next40pxDefaultSize value="50">50%</Radio>
            <Radio __next40pxDefaultSize value="75">75%</Radio>
            <Radio __next40pxDefaultSize value="100">100%</Radio>
        </RadioGroup>
    );
};
```

#### [Uncontrolled](#uncontrolled)

When using the RadioGroup component as an uncontrolled component, the default value can be set with the `defaultChecked` prop.

```jsx
import { useState } from 'react';
import {
    __experimentalRadio as Radio,
    __experimentalRadioGroup as RadioGroup,
} from '@wordpress/components';

const MyUncontrolledRadioRadioGroup = () => {
    return (
        <RadioGroup label="Width" defaultChecked="25">
            <Radio __next40pxDefaultSize value="25">25%</Radio>
            <Radio __next40pxDefaultSize value="50">50%</Radio>
            <Radio __next40pxDefaultSize value="75">75%</Radio>
            <Radio __next40pxDefaultSize value="100">100%</Radio>
        </RadioGroup>
    );
};
```

## [Related components](#related-components)

*   For simple buttons that are related, use a `ButtonGroup` component.
*   For traditional radio options, use a `RadioControl` component.
