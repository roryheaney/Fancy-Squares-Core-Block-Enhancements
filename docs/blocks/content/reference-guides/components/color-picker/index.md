---
title: "ColorPicker"
slug: "color-picker"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/color-picker/"
generatedAt: 2025-12-30T18:16:11.906Z
---

`ColorPicker` is a color picking component based on `react-colorful`. It lets you pick a color visually or by manipulating the individual RGB(A), HSL(A) and Hex(8) color values.

## [Usage](#usage)

```jsx
import { useState } from 'react';
import { ColorPicker } from '@wordpress/components';

function Example() {
    const [color, setColor] = useState();
    return (
        <ColorPicker
            color={color}
            onChange={setColor}
            enableAlpha
            defaultValue="#000"
        />
    );
}
```

## [Props](#props)

### [color: string](#color-string)

The current color value to display in the picker. Must be a hex or hex8 string.

*   Required: No

### [onChange: (hex8Color: string) => void](#onchange-hex8color-string-void)

Fired when the color changes. Always passes a hex or hex8 color string.

*   Required: No

### [enableAlpha: boolean](#enablealpha-boolean)

When `true` the color picker will display the alpha channel both in the bottom inputs as well as in the color picker itself.

*   Required: No
*   Default: `false`

### [defaultValue: string | undefined](#defaultvalue-string-undefined)

An optional default value to use for the color picker.

*   Required: No
*   Default: `'#fff'`

### [copyFormat: ‘hex’ | ‘hsl’ | ‘rgb’ | undefined](#copyformat-hex-hsl-rgb-undefined)

The format to copy when clicking the displayed color format.

*   Required: No
