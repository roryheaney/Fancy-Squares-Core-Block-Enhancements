---
title: "CardFooter"
slug: "card-footer-2"
source: "https://developer.wordpress.org/block-editor/reference-guide/components/card/card-footer/"
generatedAt: 2025-12-30T18:19:05.179Z
---

`CardFooter` renders an optional footer within a [`Card`](https://developer.wordpress.org/block-editor/reference-guide/components/card/card/).

## [Usage](#usage)

```jsx
import { Card, CardFooter } from '@wordpress/components';

const Example = () => (
    <Card>
        <CardBody>...</CardBody>
        <CardFooter>...</CardFooter>
    </Card>
);
```

### [Flex](#flex)

Underneath, `CardFooter` uses the [`Flex` layout component](https://developer.wordpress.org/block-editor/reference-guide/components/flex/flex/). This improves the alignment of child items within the component.

```jsx
import {
    Button,
    Card,
    CardFooter,
    FlexItem,
    FlexBlock,
} from '@wordpress/components';

const Example = () => (
    <Card>
        <CardBody>...</CardBody>
        <CardFooter>
            <FlexBlock>Content</FlexBlock>
            <FlexItem>
                <Button>Action</Button>
            </FlexItem>
        </CardFooter>
    </Card>
);
```

Check out [the documentation](https://developer.wordpress.org/block-editor/reference-guide/components/flex/flex/) on `Flex` for more details on layout composition.

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

### [justify: CSSProperties\[ ‘justifyContent’ \]](#justify-cssproperties-justifycontent)

See the documentation for the `justify` prop for the [`Flex` component](https://developer.wordpress.org/block-editor/reference-guide/components/flex/flex/#justify)

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
