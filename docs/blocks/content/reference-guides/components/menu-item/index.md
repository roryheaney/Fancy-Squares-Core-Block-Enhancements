---
title: "MenuItem"
slug: "menu-item"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/menu-item/"
generatedAt: 2025-12-30T18:16:39.695Z
---

MenuItem is a component which renders a button intended to be used in combination with the [DropdownMenu component](https://developer.wordpress.org/block-editor/reference-guide/components/dropdown-menu/).

## [Usage](#usage)

```jsx
import { useState } from 'react';
import { MenuItem } from '@wordpress/components';

const MyMenuItem = () => {
    const [ isActive, setIsActive ] = useState( true );

    return (
        <MenuItem
            icon={ isActive ? 'yes' : 'no' }
            isSelected={ isActive }
            onClick={ () => setIsActive( ( state ) => ! state ) }
        >
            Toggle
        </MenuItem>
    );
};
```

## [Props](#props)

MenuItem supports the following props. Any additional props are passed through to the underlying [Button](https://developer.wordpress.org/block-editor/reference-guide/components/button/).

### [children](#children)

*   Type: `Element`
*   Required: No

Element to render as child of button.

### [disabled](#disabled)

*   Type: `boolean`
*   Required: No

Refer to documentation for [Button’s `disabled` prop](https://developer.wordpress.org/block-editor/reference-guide/components/button/#disabled-boolean).

### [info](#info)

*   Type: `string`
*   Required: No

Text to use as description for button text.

Refer to documentation for [`label`](#label).

### [icon](#icon)

*   Type: `string`
*   Required: No

Refer to documentation for [Button’s `icon` prop](https://developer.wordpress.org/block-editor/reference-guide/components/icon-button/#icon).

### [iconPosition](#iconposition)

*   Type: `string`
*   Required: No
*   Default: `'right'`

Determines where to display the provided `icon`.

### [isSelected](#isselected)

*   Type: `boolean`
*   Required: No

Whether or not the menu item is currently selected. `isSelected` is only taken into account when the `role` prop is either `"menuitemcheckbox"` or `"menuitemradio"`.

### [shortcut](#shortcut)

*   Type: `string` or `object`
*   Required: No

If shortcut is a string, it is expecting the display text. If shortcut is an object, it will accept the properties of `display` (string) and `ariaLabel` (string).

### [role](#role)

*   Type: `string`
*   Require: No
*   Default: `'menuitem'`

[Aria Spec](https://www.w3.org/TR/wai-aria-1.1/#aria-checked). If you need to have selectable menu items use menuitemradio for single select, and menuitemcheckbox for multiselect.

### [suffix](#suffix)

*   Type: `Element`
*   Required: No

Allows for markup other than icons or shortcuts to be added to the menu item.
