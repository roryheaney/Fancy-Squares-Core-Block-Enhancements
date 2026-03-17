---
title: "CardHeader"
slug: "card-header-2"
source: "https://developer.wordpress.org/block-editor/reference-guide/components/card/card-header/"
generatedAt: 2025-12-30T18:19:05.624Z
---

`CardHeader` renders an optional header within a [`Card`](https://developer.wordpress.org/block-editor/reference-guide/components/card/card/).

## [Usage](#usage)

```jsx
import { Card, CardHeader } from '@wordpress/components';

const Example = () => (
    <Card>
        <CardHeader>...</CardHeader>
        <CardBody>...</CardBody>
    </Card>
);
```

## [Props](#props)

Note: This component is connected to [`Card`‘s Context](https://developer.wordpress.org/block-editor/reference-guide/components/card/card/#context). The value of the `size` and `isBorderless` props is derived from the `Card` parent component (if there is one). Setting these props directly on this component will override any derived values.

### [isBorderless: boolean](#isborderless-boolean)

Renders without a border.

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
      blockStart: 'none' |  'xSmall' | 'small' | 'medium' | 'large';
      blockEnd: 'none' | 'xSmall' | 'small' | 'medium' | 'large';
      inlineStart: 'none' | 'xSmall' | 'small' | 'medium' | 'large';
      inlineEnd: 'none' | 'xSmall' | 'small' | 'medium' | 'large';
    }
    ```
