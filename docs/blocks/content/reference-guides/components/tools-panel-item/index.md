---
title: "ToolsPanelItem"
slug: "tools-panel-item"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/tools-panel-item/"
generatedAt: 2025-12-30T18:17:05.199Z
---

This feature is still experimental. “Experimental” means this is an early  
implementation subject to drastic and breaking changes.

This component acts as a wrapper and controls the display of items to be contained  
within a ToolsPanel. An item is displayed if it is flagged as a default control  
or the corresponding panel menu item, provided via context, is toggled on for  
this item.

## [Usage](#usage)

See [`tools-panel/README.md#usage`](https://developer.wordpress.org/block-editor/reference-guide/components/tools-panel/tools-panel/)  
for how to use `ToolsPanelItem`.

## [Props](#props)

### [hasValue: () => boolean](#hasvalue-boolean)

This is called when building the `ToolsPanel` menu to determine the item’s  
initial checked state.

*   Required: Yes

### [isShownByDefault: boolean](#isshownbydefault-boolean)

This prop identifies the current item as being displayed by default. This means  
it will show regardless of whether it has a value set or is toggled on in the  
panel’s menu.

*   Required: No
*   Default: `false`

### [label: string](#label-string)

The supplied label is dual purpose.  
It is used as:  
1\. the human-readable label for the panel’s dropdown menu  
2\. a key to locate the corresponding item in the panel’s menu context to  
determine if the panel item should be displayed.

A panel item’s `label` should be unique among all items within a single panel.

*   Required: Yes

### [onDeselect: () => void](#ondeselect-void)

Called when this item is deselected in the `ToolsPanel` menu. This is normally  
used to reset the panel item control’s value.

*   Required: No

### [onSelect: () => void](#onselect-void)

A callback to take action when this item is selected in the `ToolsPanel` menu.

*   Required: No

### [panelId: string | null](#panelid-string-null)

Panel items will ensure they are only registering with their intended panel by  
comparing the `panelId` props set on both the item and the panel itself, or if the `panelId` is explicitly `null`. This  
allows items to be injected from a shared source.

*   Required: No

### [resetAllFilter: ( attributes?: any ) => any](#resetallfilter-attributes-any-any)

A `ToolsPanel` will collect each item’s `resetAllFilter` and pass an array of  
these functions through to the panel’s `resetAll` callback. They can then be  
iterated over to perform additional tasks.

*   Required: No
*   Default: `() => {}`
