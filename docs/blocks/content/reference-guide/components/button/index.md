---
title: "Button"
slug: "button"
source: "https://developer.wordpress.org/block-editor/reference-guide/components/button/"
generatedAt: 2025-12-30T18:15:21.028Z
---

See the [WordPress Storybook](https://wordpress.github.io/gutenberg/?path=/docs/components-button--docs) for more detailed, interactive documentation.

Lets users take actions and make choices with a single click or tap.

```jsx
import { Button } from '@wordpress/components';
const Mybutton = () => (
  <Button
    variant="primary"
    onClick={ handleClick }
  >
    Click here
  </Button>
);
```

## [Props](#props)

### [\_\_next40pxDefaultSize](#__next40pxdefaultsize)

*   Type: `boolean`
*   Required: No
*   Default: `false`

Start opting into the larger default height that will become the  
default size in a future version.

### [accessibleWhenDisabled](#accessiblewhendisabled)

*   Type: `boolean`
*   Required: No
*   Default: `false`

Whether to keep the button focusable when disabled.

In most cases, it is recommended to set this to `true`. Disabling a control without maintaining focusability  
can cause accessibility issues, by hiding their presence from screen reader users,  
or by preventing focus from returning to a trigger element.

Learn more about the [focusability of disabled controls](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#focusabilityofdisabledcontrols)  
in the WAI-ARIA Authoring Practices Guide.

### [children](#children)

*   Type: `ReactNode`
*   Required: No

The button’s children.

### [description](#description)

*   Type: `string`
*   Required: No

A visually hidden accessible description for the button.

### [disabled](#disabled)

*   Type: `boolean`
*   Required: No

Whether the button is disabled. If `true`, this will force a `button` element  
to be rendered, even when an `href` is given.

In most cases, it is recommended to also set the `accessibleWhenDisabled` prop to `true`.

### [href](#href)

*   Type: `string`
*   Required: Yes

If provided, renders `a` instead of `button`.

### [icon](#icon)

*   Type: `IconType`
*   Required: No

If provided, renders an Icon component inside the button.

### [iconPosition](#iconposition)

*   Type: `"left" | "right"`
*   Required: No
*   Default: `'left'`

If provided with `icon`, sets the position of icon relative to the `text`.

### [iconSize](#iconsize)

*   Type: `number`
*   Required: No

If provided with `icon`, sets the icon size.  
Please refer to the Icon component for more details regarding  
the default value of its `size` prop.

### [isBusy](#isbusy)

*   Type: `boolean`
*   Required: No

Indicates activity while a action is being performed.

### [isDestructive](#isdestructive)

*   Type: `boolean`
*   Required: No

Renders a red text-based button style to indicate destructive behavior.

### [isPressed](#ispressed)

*   Type: `boolean`
*   Required: No

Renders a pressed button style.

### [label](#label)

*   Type: `string`
*   Required: No

Sets the `aria-label` of the component, if none is provided.  
Sets the Tooltip content if `showTooltip` is provided.

### [shortcut](#shortcut)

*   Type: `string | { display: string; ariaLabel: string; }`
*   Required: No

If provided with `showTooltip`, appends the Shortcut label to the tooltip content.  
If an object is provided, it should contain `display` and `ariaLabel` keys.

### [showTooltip](#showtooltip)

*   Type: `boolean`
*   Required: No

If provided, renders a Tooltip component for the button.

### [size](#size)

*   Type: `"small" | "default" | "compact"`
*   Required: No
*   Default: `'default'`

The size of the button.

*   `'default'`: For normal text-label buttons, unless it is a toggle button.
*   `'compact'`: For toggle buttons, icon buttons, and buttons when used in context of either.
*   `'small'`: For icon buttons associated with more advanced or auxiliary features.

If the deprecated `isSmall` prop is also defined, this prop will take precedence.

### [text](#text)

*   Type: `string`
*   Required: No

If provided, displays the given text inside the button. If the button contains children elements, the text is displayed before them.

### [tooltipPosition](#tooltipposition)

*   Type: `"top" | "middle" | "bottom" | "top center" | "top left" | "top right" | "middle center" | "middle left" | "middle right" | "bottom center" | ...`
*   Required: No

If provided with `showTooltip`, sets the position of the tooltip.  
Please refer to the Tooltip component for more details regarding the defaults.

### [target](#target)

*   Type: `string`
*   Required: No

If provided with `href`, sets the `target` attribute to the `a`.

### [variant](#variant)

*   Type: `"link" | "primary" | "secondary" | "tertiary"`
*   Required: No

Specifies the button’s style.

The accepted values are:

1.  `'primary'` (the primary button styles)
2.  `'secondary'` (the default button styles)
3.  `'tertiary'` (the text-based button styles)
4.  `'link'` (the link button styles)
