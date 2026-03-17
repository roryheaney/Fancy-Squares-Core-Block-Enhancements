---
title: "FormToggle"
slug: "form-toggle"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/form-toggle/"
generatedAt: 2025-12-30T18:16:29.283Z
---

FormToggle switches a single setting on or off.

![On and off FormToggles. The top toggle is on, while the bottom toggle is off.](https://i0.wp.com/wordpress.org/gutenberg/files/2019/01/Toggle.jpg?ssl=1)

## [Design guidelines](#design-guidelines)

### [Usage](#usage)

#### [When to use toggles](#when-to-use-toggles)

Use toggles when you want users to:

*   Switch a single option on or off.
*   Immediately activate or deactivate something.

![FormToggle used for a “fixed background” setting](https://i0.wp.com/wordpress.org/gutenberg/files/2019/01/Toggle-Do.jpg?ssl=1)

**Do**  
Use toggles to switch an option on or off.

![Radio used for a “fixed background” setting](https://i0.wp.com/wordpress.org/gutenberg/files/2019/01/Toggle-Dont.jpg?ssl=1)

**Don’t**  
Don’t use radio buttons for settings that toggle on and off.

Toggles are preferred when the user is not expecting to submit data, as is the case with checkboxes and radio buttons.

#### [State](#state)

When the user slides a toggle thumb (1) to the other side of the track (2) and the state of the toggle changes, it’s been successfully toggled.

![Diagram showing FormToggle states](https://i0.wp.com/wordpress.org/gutenberg/files/2019/01/Toggle-Diagram.jpg?ssl=1)

#### [Text label](#text-label)

Toggles should have clear inline labels so users know exactly what option the toggle controls, and whether the option is enabled or disabled.

Do not include any text (e.g. “on” or “off”) within the toggle element itself. The toggle alone should be sufficient to communicate the state.

### [Behavior](#behavior)

When a user switches a toggle, its corresponding action takes effect immediately.

## [Development guidelines](#development-guidelines)

### [Usage](#usage-2)

```jsx
import { useState } from 'react';
import { FormToggle } from '@wordpress/components';

const MyFormToggle = () => {
    const [ isChecked, setChecked ] = useState( true );

    return (
        <FormToggle
            checked={ isChecked }
            onChange={ () => setChecked( ( state ) => ! state ) }
        />
    );
};
```

### [Props](#props)

The component accepts the following props:

#### [checked: boolean](#checked-boolean)

If checked is true the toggle will be checked. If checked is false the toggle will be unchecked.  
If no value is passed the toggle will be unchecked.

*   Required: No

#### [disabled: boolean](#disabled-boolean)

If disabled is true the toggle will be disabled and apply the appropriate styles.

*   Required: No

#### [onChange: ( event: ChangeEvent<HTMLInputElement> ) => void](#onchange-event-changeeventhtmlinputelement-void)

A callback function invoked when the toggle is clicked.

*   Required: Yes

## [Related components](#related-components)

*   To select one option from a set, and you want to show them all the available options at once, use the `Radio` component.
*   To select one or more items from a set, use the `CheckboxControl` component.
*   To display a toggle with label and help text, use the `ToggleControl` component.
