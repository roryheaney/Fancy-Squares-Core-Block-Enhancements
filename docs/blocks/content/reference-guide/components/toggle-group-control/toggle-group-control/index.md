---
title: "ToggleGroupControl"
slug: "toggle-group-control-2"
source: "https://developer.wordpress.org/block-editor/reference-guide/components/toggle-group-control/toggle-group-control/"
generatedAt: 2025-12-30T18:19:09.899Z
---

This feature is still experimental. “Experimental” means this is an early implementation subject to drastic and breaking changes.

`ToggleGroupControl` is a form component that lets users choose options represented in horizontal segments. To render options for this control use [`ToggleGroupControlOption`](https://developer.wordpress.org/block-editor/reference-guide/components/toggle-group-control/toggle-group-control-option/) component.

This component is intended for selecting a single persistent value from a set of options, similar to a how a radio button group would work. If you simply want a toggle to switch between views, use a [`TabPanel`](https://developer.wordpress.org/block-editor/reference-guide/components/tab-panel/) instead.

Only use this control when you know for sure the labels of items inside won’t wrap. For items with longer labels, you can consider a [`SelectControl`](https://developer.wordpress.org/block-editor/reference-guide/components/select-control/) or a [`CustomSelectControl`](https://developer.wordpress.org/block-editor/reference-guide/components/custom-select-control/) component instead.

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
            <ToggleGroupControlOption value="horizontal" label="Horizontal" />
            <ToggleGroupControlOption value="vertical" label="Vertical" />
        </ToggleGroupControl>
    );
}
```

## [Props](#props)

### [help: ReactNode](#help-reactnode)

If this property is added, a help text will be generated using help property as the content.

*   Required: No

### [hideLabelFromVision: boolean](#hidelabelfromvision-boolean)

If true, the label will only be visible to screen readers.

*   Required: No
*   Default: `false`

### [isAdaptiveWidth: boolean](#isadaptivewidth-boolean)

Determines if segments should be rendered with equal widths.

*   Required: No
*   Default: `false`

### [isDeselectable: boolean](#isdeselectable-boolean)

Whether an option can be deselected by clicking it again.

*   Required: No
*   Default: `false`

### [isBlock: boolean](#isblock-boolean)

Renders `ToggleGroupControl` as a (CSS) block element, spanning the entire width of the available space. This is the recommended style when the options are text-based and not icons.

*   Required: No
*   Default: `false`

### [label: string](#label-string)

Label for the form element.

*   Required: Yes

### [onChange: ( value?: string | number ) => void](#onchange-value-string-number-void)

Callback when a segment is selected.

*   Required: No
*   Default: `() => {}`

### [value: string | number](#value-string-number)

The value of the `ToggleGroupControl`.

*   Required: No

### [\_\_next40pxDefaultSize: boolean](#__next40pxdefaultsize-boolean)

Start opting into the larger default height that will become the default size in a future version.

*   Required: No
*   Default: `false`
