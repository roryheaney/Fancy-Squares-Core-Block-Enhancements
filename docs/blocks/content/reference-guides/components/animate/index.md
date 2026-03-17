---
title: "Animate"
slug: "animate-2"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/animate/"
generatedAt: 2025-12-30T18:16:00.183Z
---

Simple interface to introduce animations to components.

## [Usage](#usage)

```jsx
import { Animate, Notice } from '@wordpress/components';

const MyAnimatedNotice = () => (
    <Animate type="slide-in" options={ { origin: 'top' } }>
        { ( { className } ) => (
            <Notice className={ className } status="success">
                <p>Animation finished.</p>
            </Notice>
        ) }
    </Animate>
);
```

## [Props](#props)

Name

Type

Default

Description

`type`

`string`

`undefined`

Type of the animation to use.

`options`

`object`

`{}`

Options of the chosen animation.

`children`

`function`

`undefined`

A callback receiving a list of props ( `className` ) to apply to the DOM element to animate.

## [Available Animation Types](#available-animation-types)

### [appear](#appear)

This animation is meant for popover/modal content, such as menus appearing. It shows the height and width of the animated element scaling from 0 to full size, from its point of origin.

#### [Options](#options)

Name

Type

Default

Description

`origin`

`string`

`top center`

Point of origin (`top`, `bottom`,`middle right`, `left`, `center`).

### [loading](#loading)

This animation is meant to be used to indicate that activity is happening in the background. It is an infinitely-looping fade from 50% to full opacity. This animation has no options, and should be removed as soon as its relevant operation is completed.

### [slide-in](#slide-in)

This animation is meant for sidebars and sliding menus. It shows the height and width of the animated element moving from a hidden position to its normal one.

#### [Options](#options-2)

Name

Type

Default

Description

`origin`

`string`

`left`

Point of origin (`left`).
