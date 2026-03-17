---
title: "BaseControl"
slug: "base-control"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/base-control/"
generatedAt: 2025-12-30T18:16:01.752Z
---

See the [WordPress Storybook](https://wordpress.github.io/gutenberg/?path=/docs/components-basecontrol--docs) for more detailed, interactive documentation.

`BaseControl` is a component used to generate labels and help text for components handling user inputs.

```jsx
import { BaseControl, useBaseControlProps } from '@wordpress/components';

// Render a `BaseControl` for a textarea input
const MyCustomTextareaControl = ({ children, ...baseProps }) => (
    // `useBaseControlProps` is a convenience hook to get the props for the `BaseControl`
    // and the inner control itself. Namely, it takes care of generating a unique `id`,
    // properly associating it with the `label` and `help` elements.
    const { baseControlProps, controlProps } = useBaseControlProps( baseProps );

    return (
        <BaseControl { ...baseControlProps }>
            <textarea { ...controlProps }>
              { children }
            </textarea>
        </BaseControl>
    );
);
```

## [Props](#props)

### [as](#as)

*   Type: `"symbol" | "object" | "label" | "a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | "b" | "base" | "bdi" | "bdo" | "big" | "blockquote" | "body" | "br" | "button" | ... 516 more ... | ("view" & FunctionComponent<...>)`
*   Required: No

The HTML element or React component to render the component as.

### [className](#classname)

*   Type: `string`
*   Required: No

### [children](#children)

*   Type: `ReactNode`
*   Required: Yes

The content to be displayed within the `BaseControl`.

### [help](#help)

*   Type: `ReactNode`
*   Required: No

Additional description for the control.

Only use for meaningful description or instructions for the control. An element containing the description will be programmatically associated to the BaseControl by the means of an `aria-describedby` attribute.

### [hideLabelFromVision](#hidelabelfromvision)

*   Type: `boolean`
*   Required: No
*   Default: `false`

If true, the label will only be visible to screen readers.

### [id](#id)

*   Type: `string`
*   Required: No

The HTML `id` of the control element (passed in as a child to `BaseControl`) to which labels and help text are being generated.  
This is necessary to accessibly associate the label with that element.

The recommended way is to use the `useBaseControlProps` hook, which takes care of generating a unique `id` for you.  
Otherwise, if you choose to pass an explicit `id` to this prop, you are responsible for ensuring the uniqueness of the `id`.

### [label](#label)

*   Type: `ReactNode`
*   Required: No

If this property is added, a label will be generated using label property as the content.

## [Subcomponents](#subcomponents)

### [BaseControl.VisualLabel](#basecontrol-visuallabel)

`BaseControl.VisualLabel` is used to render a purely visual label inside a `BaseControl` component.

It should only be used in cases where the children being rendered inside `BaseControl` are already accessibly labeled,  
e.g., a button, but we want an additional visual label for that section equivalent to the labels `BaseControl` would  
otherwise use if the `label` prop was passed.

```jsx
import { BaseControl } from '@wordpress/components';

const MyBaseControl = () => (
    <BaseControl help="This button is already accessibly labeled.">
        <BaseControl.VisualLabel>Author</BaseControl.VisualLabel>
        <Button>Select an author</Button>
    </BaseControl>
);
```

#### [Props](#props-2)

##### [as](#as-2)

*   Type: `"symbol" | "object" | "label" | "a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | ...`
*   Required: No

The HTML element or React component to render the component as.

##### [children](#children-2)

*   Type: `ReactNode`
*   Required: Yes

The content to be displayed within the `BaseControl.VisualLabel`.
