---
title: "Spacer"
slug: "spacer"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/spacer/"
generatedAt: 2025-12-30T18:16:57.375Z
---

This feature is still experimental. “Experimental” means this is an early implementation subject to drastic and breaking changes.

`Spacer` is a primitive layout component that providers inner (`padding`) or outer (`margin`) space in-between components. It can also be used to adaptively provide space within an `HStack` or `VStack`.

## [Usage](#usage)

`Spacer` comes with a bunch of shorthand props to adjust `margin` and `padding`. The values of these props work as a multiplier to the library’s grid system (base of `4px`).

```jsx
import {
    __experimentalSpacer as Spacer,
    __experimentalHeading as Heading,
    __experimentalView as View,
} from '@wordpress/components';

function Example() {
    return (
        <View>
            <Spacer>
                <Heading>WordPress.org</Heading>
            </Spacer>
            <Text>Code is Poetry</Text>
        </View>
    );
}
```

## [Props](#props)

### [children: ReactNode](#children-reactnode)

The children elements.

*   Required: No

### [margin: number](#margin-number)

Adjusts all margins.

*   Required: No

### [marginBottom: number](#marginbottom-number)

Adjusts bottom margin, potentially overriding the value from the more generic `margin` and `marginY` props.

*   Required: No
*   Default: `2`

### [marginLeft: number](#marginleft-number)

Adjusts left margin, potentially overriding the value from the more generic `margin` and `marginX` props.

*   Required: No

### [marginRight: number](#marginright-number)

Adjusts right margin, potentially overriding the value from the more generic `margin` and `marginX` props.

*   Required: No

### [marginTop: number](#margintop-number)

Adjusts top margin, potentially overriding the value from the more generic `margin` and `marginY` props.

*   Required: No

### [marginX: number](#marginx-number)

Adjusts left and right margins, potentially overriding the value from the more generic `margin` prop.

*   Required: No

### [marginY: number](#marginy-number)

Adjusts top and bottom margins, potentially overriding the value from the more generic `margin` prop.

*   Required: No

### [padding: number](#padding-number)

Adjusts all padding.

*   Required: No

### [paddingBottom: number](#paddingbottom-number)

Adjusts bottom padding, potentially overriding the value from the more generic `padding` and `paddingY` props.

*   Required: No

### [paddingLeft: number](#paddingleft-number)

Adjusts left padding, potentially overriding the value from the more generic `padding` and `paddingX` props.

*   Required: No

### [paddingRight: number](#paddingright-number)

Adjusts right padding, potentially overriding the value from the more generic `padding` and `paddingX` props.

*   Required: No

### [paddingTop: number](#paddingtop-number)

Adjusts top padding, potentially overriding the value from the more generic `padding` and `paddingY` props.

*   Required: No

### [paddingX: number](#paddingx-number)

Adjusts left and right padding, potentially overriding the value from the more generic `padding` prop.

*   Required: No

### [paddingY: number](#paddingy-number)

Adjusts top and bottom padding, potentially overriding the value from the more generic `padding` prop.

*   Required: No
