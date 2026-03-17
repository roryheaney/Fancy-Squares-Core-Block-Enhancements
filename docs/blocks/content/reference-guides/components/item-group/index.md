---
title: "ItemGroup"
slug: "item-group"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/item-group/"
generatedAt: 2025-12-30T18:16:37.256Z
---

This feature is still experimental. “Experimental” means this is an early implementation subject to drastic and breaking changes.

`ItemGroup` displays a list of `Item`s grouped and styled together.

## [Usage](#usage)

`ItemGroup` should be used in combination with the [`Item` sub-component](https://developer.wordpress.org/block-editor/reference-guide/components/item-group/item/).

```jsx
import {
    __experimentalItemGroup as ItemGroup,
    __experimentalItem as Item,
} from '@wordpress/components';

function Example() {
    return (
        <ItemGroup>
            <Item>Code</Item>
            <Item>is</Item>
            <Item>Poetry</Item>
        </ItemGroup>
    );
}
```

## [Props](#props)

### [isBordered: boolean](#isbordered-boolean)

Renders borders around each items.

*   Required: No
*   Default: `false`

### [isRounded: boolean](#isrounded-boolean)

Renders with rounded corners.

*   Required: No
*   Default: `true`

### [isSeparated: boolean](#isseparated-boolean)

Renders items individually. Even if `isBordered` is `false`, a border in between each item will be still be displayed.

*   Required: No
*   Default: `false`

### [size: ‘small’ | ‘medium’ | ‘large’](#size-small-medium-large)

Determines the amount of padding within the component.  
When not defined, it defaults to the value from the context (which is `medium` by default).

*   Required: No
*   Default: `medium`

### [Context](#context)

The [`Item` sub-component](https://developer.wordpress.org/block-editor/reference-guide/components/item-group/item/) is connected to `<ItemGroup />` using [Context](https://reactjs.org/docs/context.html). Therefore, `Item` receives the `size` prop from the `ItemGroup` parent component.

In the following example, the `<Item />` will render with a size of `small`:

```jsx
import {
    __experimentalItemGroup as ItemGroup,
    __experimentalItem as Item,
} from '@wordpress/components';

const Example = () => (
    <ItemGroup size="small">
        <Item>Item text</Item>
    </ItemGroup>
);
```
