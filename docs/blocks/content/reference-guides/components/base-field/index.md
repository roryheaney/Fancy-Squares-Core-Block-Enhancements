---
title: "BaseField"
slug: "base-field"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/base-field/"
generatedAt: 2025-12-30T18:16:02.603Z
---

This feature is still experimental. “Experimental” means this is an early implementation subject to drastic and breaking changes.

`BaseField` is an internal (i.e., not exported in the `index.js`) primitive component used for building more complex fields like `TextField`. It provides error handling and focus styles for field components. It does _not_ handle layout of the component aside from wrapping the field in a `Flex` wrapper.

## [Usage](#usage)

`BaseField` is primarily used as a hook rather than a component:

```js
function useExampleField( props ) {
    const { as = 'input', ...baseProps } = useBaseField( props );

    const inputProps = {
        as,
        // more cool stuff here
    };

    return { inputProps, ...baseProps };
}

function ExampleField( props, forwardRef ) {
    const { preFix, affix, disabled, inputProps, ...baseProps } =
        useExampleField( props );

    return (
        <View { ...baseProps } disabled={ disabled }>
            { preFix }
            <View autocomplete="off" { ...inputProps } disabled={ disabled } />
            { affix }
        </View>
    );
}
```

## [Props](#props)

### [disabled: boolean](#disabled-boolean)

Whether the field is disabled.

*   Required: No

### [hasError: boolean](#haserror-boolean)

Renders an error style around the component.

*   Required: No
*   Default: `false`

### [isInline: boolean](#isinline-boolean)

Renders a component that can be inlined in some text.

*   Required: No
*   Default: `false`

### [isSubtle: boolean](#issubtle-boolean)

Renders a subtle variant of the component.

*   Required: No
*   Default: `false`
