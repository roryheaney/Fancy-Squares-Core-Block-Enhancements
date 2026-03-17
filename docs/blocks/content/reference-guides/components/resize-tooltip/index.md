---
title: "ResizeTooltip"
slug: "resize-tooltip"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/resize-tooltip/"
generatedAt: 2025-12-30T18:16:50.894Z
---

ResizeTooltip displays the dimensions of an element whenever the width or height of the element changes.

## [Usage](#usage)

```jsx
const Example = () => {
    return (
        <div style={ { position: 'relative' } }>
            <ResizeTooltip />
            ...
        </div>
    );
};
```

Be sure that the parent element containing `<ResizeTooltip />` has the `position` style property defined. This is important as `<ResizeTooltip />` uses `position` based techniques to determine size changes.

### [Positions](#positions)

`<ResizeTooltip />` has three positions;

*   `bottom` (Default)
*   `corner`

#### [bottom](#bottom)

The `bottom` position (default) renders the dimensions label at the bottom-center of the (parent) element.

#### [corner](#corner)

The `corner` position renders the dimensions label in the top-right corner of the (parent) element.

## [Props](#props)

### [axis](#axis)

Limits the label to render corresponding to the axis. By default, the label will automatically render based on both `x` and `y` changes.

*   Type: `String`
*   Required: No
*   Values: `x` | `y`

### [fadeTimeout](#fadetimeout)

Duration (in `ms`) before the label disappears after resize event.

*   Type: `Number`
*   Required: No
*   Default: `180`

### [isVisible](#isvisible)

Determines if the label can render.

*   Type: `Boolean`
*   Required: No
*   Default: `true`

### [labelRef](#labelref)

Callback [Ref](https://react.dev/learn/manipulating-the-dom-with-refs) for the label element.

*   Type: `Function`
*   Required: No

### [onMove](#onmove)

Callback function when the (observed) element resizes, specifically with a `mousemove` based event.

*   Type: `Function`
*   Required: No

### [onResize](#onresize)

Callback function when the (observed) element resizes.

*   Type: `Function`
*   Required: No

### [position](#position)

The positions for the label.

*   Type: `String`
*   Required: No
*   Default: `corner`
*   Values: `bottom` | `corner`

### [showPx](#showpx)

Renders a `PX` unit suffix after the width or height value in the label.

*   Type: `Boolean`
*   Required: No
*   Default: `true`

### [zIndex](#zindex)

The `z-index` style property for the label.

*   Type: `Number`
*   Required: No
*   Default: `1000`
