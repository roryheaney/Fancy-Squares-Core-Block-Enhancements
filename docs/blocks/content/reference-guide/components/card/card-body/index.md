---
title: "CardBody"
slug: "card-body-2"
source: "https://developer.wordpress.org/block-editor/reference-guide/components/card/card-body/"
generatedAt: 2025-12-30T18:19:04.386Z
---

`CardBody` renders an optional content area for a [`Card`](https://developer.wordpress.org/block-editor/reference-guide/components/card/card/). Multiple `CardBody` components can be used within `Card` if needed.

## [Usage](#usage)

```jsx
import { Card, CardBody } from '@wordpress/components';

const Example = () => (
    <Card>
        <CardBody>...</CardBody>
    </Card>
);
```

## [Props](#props)

Note: This component is connected to [`Card`‘s Context](https://developer.wordpress.org/block-editor/reference-guide/components/card/card/#context). The value of the `size` prop is derived from the `Card` parent component (if there is one). Setting this prop directly on this component will override any derived values.

### [isScrollable: boolean](#isscrollable-boolean)

Determines if the component is scrollable.

*   Required: No
*   Default: `false`

### [isShady: boolean](#isshady-boolean)

Renders with a light gray background color.

*   Required: No
*   Default: `false`

### [size: string | object](#size-string-object)

Determines the amount of padding within the component. Can be specified either as a single size token or as an object.

*   Required: No
*   Default: `medium`
*   Allowed values:
*   Single size token: `none`, `xSmall`, `small`, `medium`, `large`
*   Object:
    
    ```ts
    {
      blockStart: 'none' | 'xSmall' | 'small' | 'medium' | 'large';
      blockEnd: 'none' | 'xSmall' | 'small' | 'medium' | 'large';
      inlineStart: 'none' | 'xSmall' | 'small' | 'medium' | 'large';
      inlineEnd: 'none' | 'xSmall' | 'small' | 'medium' | 'large';
    }
    ```
