---
title: "ToggleGroupControlOptionBase"
slug: "toggle-group-control-option-base"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/toggle-group-control-option-base/"
generatedAt: 2025-12-30T18:17:01.245Z
---

This feature is still experimental. “Experimental” means this is an early implementation subject to drastic and breaking changes.

`ToggleGroupControlOptionBase` is a form component and is meant to be used as an internal, generic component for any children of [`ToggleGroupControl`](https://developer.wordpress.org/block-editor/reference-guide/components/toggle-group-control/toggle-group-control/).

## [Props](#props)

### [children: ReactNode](#children-reactnode)

The children elements.

*   Required: Yes

### [value: string | number](#value-string-number)

The value of the `ToggleGroupControlOptionBase`.

*   Required: Yes

### [showTooltip: boolean](#showtooltip-boolean)

Whether to show a tooltip when hovering over the option. The tooltip will only show if a label for it is provided using the `aria-label` prop.

*   Required: No
