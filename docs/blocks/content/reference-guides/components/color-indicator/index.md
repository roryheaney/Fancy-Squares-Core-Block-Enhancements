---
title: "ColorIndicator"
slug: "color-indicator"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/color-indicator/"
generatedAt: 2025-12-30T18:16:10.321Z
---

ColorIndicator is a React component that renders a specific color in a circle. It’s often used to summarize a collection of used colors in a child component.

### [Single component](#single-component)

![simple color indicator](https://i0.wp.com/user-images.githubusercontent.com/881729/147558034-cba09db5-2f06-458b-a7b1-fd2f2ffb982a.png?ssl=1)

### [Used in sidebar](#used-in-sidebar)

![multiple color indicator](https://i0.wp.com/user-images.githubusercontent.com/881729/147559177-69ce52e1-30dc-4f24-8483-ca2a580f434f.png?ssl=1)

## [Usage](#usage)

```jsx
import { ColorIndicator } from '@wordpress/components';

const MyColorIndicator = () => <ColorIndicator colorValue="#0073aa" />;
```

## [Props](#props)

The component accepts the following props:

### [className: string](#classname-string)

Extra classes for the used `<span>` element. By default only `component-color-indicator` is added.

*   Required: No

### [colorValue: CSSProperties\[ ‘background’ \]](#colorvalue-cssproperties-background)

The color of the indicator. Any value from the CSS [`background`](https://developer.mozilla.org/en-US/docs/Web/CSS/background) property is supported.

*   Required: Yes
