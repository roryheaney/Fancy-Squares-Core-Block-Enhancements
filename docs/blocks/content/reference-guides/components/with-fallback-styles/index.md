---
title: "WithFallbackStyles"
slug: "with-fallback-styles"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/with-fallback-styles/"
generatedAt: 2025-12-30T18:17:11.682Z
---

## Usage

```jsx
import { withFallbackStyles, Button } from '@wordpress/components';

const { getComputedStyle } = window;

const MyComponentWithFallbackStyles = withFallbackStyles(
    ( node, ownProps ) => {
        const buttonNode = node.querySelector( 'button' );
        return {
            fallbackBackgroundColor: getComputedStyle( buttonNode )
                .backgroundColor,
            fallbackTextColor: getComputedStyle( buttonNode ).color,
        };
    }
)( ( { fallbackTextColor, fallbackBackgroundColor } ) => (
    <div>
        <Button variant="primary">My button</Button>
        <div>Text color: { fallbackTextColor }</div>
        <div>Background color: { fallbackBackgroundColor }</div>
    </div>
) );
```
