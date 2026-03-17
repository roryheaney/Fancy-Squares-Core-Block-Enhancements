---
title: "CardDivider"
slug: "card-divider-2"
source: "https://developer.wordpress.org/block-editor/reference-guide/components/card/card-divider/"
generatedAt: 2025-12-30T18:19:04.789Z
---

`CardDivider` renders an optional divider within a [`Card`](https://developer.wordpress.org/block-editor/reference-guide/components/card/card/). It is typically used to divide multiple `CardBody` components from each other.

## [Usage](#usage)

```jsx
import { Card, CardBody, CardDivider } from '@wordpress/components';

const Example = () => (
    <Card>
        <CardBody>...</CardBody>
        <CardDivider />
        <CardBody>...</CardBody>
    </Card>
);
```

## [Props](#props)

### [Inherited props](#inherited-props)

`CardDivider` inherits all of the [`Divider` props](https://developer.wordpress.org/block-editor/reference-guide/components/divider/#props).
