---
title: "ToggleGroupControlOptionIcon"
slug: "toggle-group-control-option-icon"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/toggle-group-control-option-icon/"
generatedAt: 2025-12-30T18:17:02.036Z
---

This feature is still experimental. “Experimental” means this is an early implementation subject to drastic and breaking changes.

`ToggleGroupControlOptionIcon` is a form component which is meant to be used as a child of [`ToggleGroupControl`](https://developer.wordpress.org/block-editor/reference-guide/components/toggle-group-control/toggle-group-control/) and displays an icon.

## [Usage](#usage)

```js
import {
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
} from '@wordpress/components';
import { formatLowercase, formatUppercase } from '@wordpress/icons';

function Example() {
    return (
        <ToggleGroupControl __next40pxDefaultSize>
            <ToggleGroupControlOptionIcon
                value="uppercase"
                icon={ formatUppercase }
                label="Uppercase"
            />
            <ToggleGroupControlOptionIcon
                value="lowercase"
                icon={ formatLowercase }
                label="Lowercase"
            />
        </ToggleGroupControl>
    );
}
```

## [Props](#props)

### [value: string | number](#value-string-number)

The value of the `ToggleGroupControlOption`.

*   Required: Yes

### [icon: Component](#icon-component)

Icon displayed as the content of the option. Usually one of the icons from the `@wordpress/icons` package, or a custom React `<svg>` icon.

*   Required: Yes

### [label: string](#label-string)

The text to accessibly label the icon option. Will also be shown in a tooltip.

*   Required: Yes
