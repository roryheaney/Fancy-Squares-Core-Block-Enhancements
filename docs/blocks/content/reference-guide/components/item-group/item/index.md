---
title: "Item"
slug: "item-2"
source: "https://developer.wordpress.org/block-editor/reference-guide/components/item-group/item/"
generatedAt: 2025-12-30T18:19:09.094Z
---

This feature is still experimental. “Experimental” means this is an early implementation subject to drastic and breaking changes.

`Item` is used in combination with `ItemGroup` to display a list of items grouped and styled together.

## [Usage](#usage)

`Item` should be used in combination with the [`ItemGroup` component](https://developer.wordpress.org/block-editor/reference-guide/components/item-group/item-group/).

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

### [onClick: React.MouseEventHandler<HTMLDivElement>](#onclick-react-mouseeventhandlerhtmldivelement)

Even handler for processing `click` events. When defined, the `Item` component will render as a `button` (unless differently specified via the `as` prop).

*   Required: No

### [size: ‘small’ | ‘medium’ | ‘large’](#size-small-medium-large)

Determines the amount of padding within the component.

*   Required: No
*   Default: `medium`

### [Context](#context)

`Item` is connected to [the `<ItemGroup />` parent component](https://developer.wordpress.org/block-editor/reference-guide/components/item-group/item-group/) using [Context](https://reactjs.org/docs/context.html). Therefore, `Item` receives the `size` prop from the `ItemGroup` parent component.

In the following example, the `<Item />` will render with a size of `small`:

```jsx
import {
    __experimentalItemGroup as ItemGroup,
    __experimentalItem as Item,
} from '@wordpress/components';

const Example = () => (
    <ItemGroup size="small">
        <Item>...</Item>
    </ItemGroup>
);
```
