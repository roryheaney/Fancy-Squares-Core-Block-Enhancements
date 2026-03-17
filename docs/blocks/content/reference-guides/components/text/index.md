---
title: "Text"
slug: "text-2"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/text/"
generatedAt: 2025-12-30T18:16:59.152Z
---

This feature is still experimental. “Experimental” means this is an early implementation subject to drastic and breaking changes.

`Text` is a core component that renders text in the library, using the library’s typography system.

## [Usage](#usage)

`Text` can be used to render any text-content, like an HTML `p` or `span`.

```jsx
import { __experimentalText as Text } from '@wordpress/components';

function Example() {
    return <Text>Code is Poetry</Text>;
}
```

## [Props](#props)

### [adjustLineHeightForInnerControls](#adjustlineheightforinnercontrols)

**Type**: `"large"`,`"medium"`,`"small"`,`"xSmall"`

Automatically calculate the appropriate line-height value for contents that render text and Control elements (e.g. `TextInput`).

```jsx
import { __experimentalText as Text, TextInput } from '@wordpress/components';

function Example() {
    return (
        <Text adjustLineHeightForInnerControls={"small"}>
            Lorem ipsum dolor sit amet, consectetur
            <TextInput value="adipiscing elit..." />
        </Text>
    );
}
```

### [align](#align)

**Type**: `CSSProperties['textAlign']`

Adjusts the text alignment.

```jsx
import { __experimentalText as Text } from '@wordpress/components';

function Example() {
    return (
        <Text align="center" isBlock>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </Text>
    );
}
```

### [color](#color)

**Type**: `CSSProperties['color']`

Adjusts the text color.

### [display](#display)

**Type**: `CSSProperties['display']`

Adjusts the CSS display.

### [ellipsis](#ellipsis)

**Type**: `string`

The ellipsis string when `truncate` is set.

### [ellipsizeMode](#ellipsizemode)

**Type**: `"auto"`,`"head"`,`"tail"`,`"middle"`

Determines where to truncate. For example, we can truncate text right in the middle. To do this, we need to set `ellipsizeMode` to `middle` and a text `limit`.

*   `auto`: Trims content at the end automatically without a `limit`.
*   `head`: Trims content at the beginning. Requires a `limit`.
*   `middle`: Trims content in the middle. Requires a `limit`.
*   `tail`: Trims content at the end. Requires a `limit`.

### [highlightCaseSensitive](#highlightcasesensitive)

**Type**: `boolean`

Escape characters in `highlightWords` which are meaningful in regular expressions.

### [highlightEscape](#highlightescape)

**Type**: `boolean`

Determines if `highlightWords` should be case sensitive.

### [highlightSanitize](#highlightsanitize)

**Type**: `boolean`

Array of search words. String search terms are automatically cast to RegExps unless `highlightEscape` is true.

### [highlightWords](#highlightwords)

**Type**: `any[]`

Letters or words within `Text` can be highlighted using `highlightWords`.

```jsx
import { __experimentalText as Text } from '@wordpress/components';

function Example() {
    return (
        <Text highlightWords={ [ 'pi' ] }>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ex
            neque, vulputate a diam et, luctus convallis lacus. Vestibulum ac
            mollis mi. Morbi id elementum massa. Suspendisse interdum auctor
            ligula eget cursus. In fermentum ultricies mauris, pharetra
            fermentum erat pellentesque id.
        </Text>
    );
}
```

### [isBlock](#isblock)

**Type**: `boolean`

Sets `Text` to have `display: block`.

Note: text truncation only works when `isBlock` is `false`.

### [isDestructive](#isdestructive)

**Type**: `boolean`

Renders a destructive color.

### [limit](#limit)

**Type**: `number`

Determines the max characters when `truncate` is set.

### [lineHeight](#lineheight)

**Type**: `CSSProperties['lineHeight']`

Adjusts all text line-height based on the typography system.

### [numberOfLines](#numberoflines)

**Type**: `number`

Clamps the text content to the specific `numberOfLines`, adding the `ellipsis` at the end.

### [optimizeReadabilityFor](#optimizereadabilityfor)

**Type**: `CSSProperties['color']`

The `Text` color can be adapted to a background color for optimal readability. `optimizeReadabilityFor` can accept CSS variables, in addition to standard CSS color values (e.g. Hex, RGB, HSL, etc…).

```jsx
import { __experimentalText as Text, View } from '@wordpress/components';

function Example() {
    const backgroundColor = 'blue';

    return (
        <View css={ { backgroundColor } }>
            <Text optimizeReadabilityFor={ backgroundColor }>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
        </View>
    );
}
```

### [size](#size)

**Type**: `CSSProperties['fontSize']`,`TextSize`

Adjusts text size based on the typography system. `Text` can render a wide range of font sizes, which are automatically calculated and adapted to the typography system. The `size` value can be a system preset, a `number`, or a custom unit value (`string`) such as `30em`.

```jsx
import { __experimentalText as Text } from '@wordpress/components';

function Example() {
    return <Text size="largeTitle">Code is Poetry</Text>;
}
```

### [truncate](#truncate)

**Type**: `boolean`

Enables text truncation. When `truncate` is set, we are able to truncate the long text in a variety of ways.

Note: text truncation won’t work if the `isBlock` property is set to `true`

```jsx
import { __experimentalText as Text } from '@wordpress/components';

function Example() {
    return (
        <Text truncate>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ex
            neque, vulputate a diam et, luctus convallis lacus. Vestibulum ac
            mollis mi. Morbi id elementum massa. Suspendisse interdum auctor
            ligula eget cursus. In fermentum ultricies mauris, pharetra
            fermentum erat pellentesque id.
        </Text>
    );
}
```

### [upperCase](#uppercase)

**Type**: `boolean`

Uppercases the text content.

### [variant](#variant)

**Type**: `"muted"`

Adjusts style variation of the text.

```jsx
import { __experimentalText as Text } from '@wordpress/components';

function Example() {
    return <Text variant="muted">Code is Poetry</Text>;
}
```

### [weight](#weight)

**Type**: `CSSProperties['fontWeight']`,`TextWeight`

Adjusts font-weight of the text.
