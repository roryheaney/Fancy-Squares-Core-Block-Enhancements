---
title: "CardMedia"
slug: "card-media"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/card-media/"
generatedAt: 2025-12-30T18:16:06.903Z
---

`CardMedia` provides a container for full-bleed content within a [`Card`](https://developer.wordpress.org/block-editor/reference-guide/components/card/card/), such as images, video, or even just a background color.

## [Usage](#usage)

```jsx
import { Card, CardBody, CardMedia } from '@wordpress/components';

const Example = () => (
    <Card>
        <CardMedia>
            <img src="..." />
        </CardMedia>
        <CardBody>...</CardBody>
    </Card>
);
```

## [Placement](#placement)

`CardMedia` can be placed in any order as a direct child of a `Card` (it can also exist as the only child component). The styles will automatically round the corners of the inner media element.
