---
title: "ResponsiveWrapper"
slug: "responsive-wrapper"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/responsive-wrapper/"
generatedAt: 2025-12-30T18:16:51.703Z
---

A wrapper component that maintains its aspect ratio when resized.

## [Usage](#usage)

```jsx
import { ResponsiveWrapper } from '@wordpress/components';

const MyResponsiveWrapper = () => (
    <ResponsiveWrapper naturalWidth={ 2000 } naturalHeight={ 680 }>
        <img
            src="https://s.w.org/style/images/about/WordPress-logotype-standard.png"
            alt="WordPress"
        />
    </ResponsiveWrapper>
);
```

### [Usage with SVG elements](#usage-with-svg-elements)

When passing an `SVG` element as the `<ResponsiveWrapper />`‘s child, make sure that it has the `viewbox` and the `preserveAspectRatio` set.

When dealing with SVGs, it may not be possible to derive its `naturalWidth` and `naturalHeight` and therefore passing them as propertied to `<ResponsiveWrapper />`. In this case, the SVG simply keeps scaling up to fill its container, unless the `height` and `width` attributes are specified.

## [Props](#props)

### [children: React.ReactElement](#children-react-reactelement)

The element to wrap.

*   Required: Yes

### [isInline: boolean](#isinline-boolean)

If true, the wrapper will be `span` instead of `div`.

*   Required: No
*   Default: `false`

### [naturalHeight: number](#naturalheight-number)

The intrinsic height of the element to wrap. Will be used to determine the aspect ratio.

*   Required: No

### [naturalWidth: number](#naturalwidth-number)

The intrinsic width of the element to wrap. Will be used to determine the aspect ratio.

*   Required: No
