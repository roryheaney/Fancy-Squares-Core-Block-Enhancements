---
title: "ToggleGroupControlOption"
slug: "toggle-group-control-option"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/toggle-group-control-option/"
generatedAt: 2025-12-30T18:17:02.199Z
---

This feature is still experimental. “Experimental” means this is an early implementation subject to drastic and breaking changes.

`ToggleGroupControlOption` is a form component and is meant to be used as a child of [`ToggleGroupControl`](https://developer.wordpress.org/block-editor/reference-guide/components/toggle-group-control/toggle-group-control/).

## [Usage](#usage)

```js
import {
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';

function Example() {
    return (
        <ToggleGroupControl
            label="my label"
            value="vertical"
            isBlock
            __next40pxDefaultSize
        >
            <ToggleGroupControlOption
                value="horizontal"
                label="Horizontal"
                showTooltip={ true }
            />
            <ToggleGroupControlOption value="vertical" label="Vertical" />
        </ToggleGroupControl>
    );
}
```

## [Props](#props)

### [label: string](#label-string)

Label for the option. If needed, the `aria-label` prop can be used in addition to specify a different label for assistive technologies.

*   Required: Yes

### [value: string | number](#value-string-number)

The value of the `ToggleGroupControlOption`.

*   Required: Yes

### [showTooltip: boolean](#showtooltip-boolean)

Whether to show a tooltip when hovering over the option. The tooltip will attempt to use the `aria-label` prop text first, then the `label` prop text if no `aria-label` prop is found.

*   Required: No
