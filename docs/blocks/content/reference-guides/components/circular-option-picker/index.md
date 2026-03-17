---
title: "CircularOptionPicker"
slug: "circular-option-picker"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/circular-option-picker/"
generatedAt: 2025-12-30T18:16:08.717Z
---

This component is not exported, and therefore can only be used internally to the \`@wordpress/components\` package.

`CircularOptionPicker` is a component that displays a set of options as circular buttons.

## [Usage](#usage)

```jsx
import { useState } from 'react';
import { CircularOptionPicker } from '../circular-option-picker';

const Example = () => {
    const [ currentColor, setCurrentColor ] = useState();
    const colors = [
        { color: '#f00', name: 'Red' },
        { color: '#0f0', name: 'Green' },
        { color: '#00f', name: 'Blue' },
    ];
    const colorOptions = (
        <>
            { colors.map( ( { color, name }, index ) => {
                return (
                    <CircularOptionPicker.Option
                        key={ `${ color }-${ index }` }
                        tooltipText={ name }
                        style={ { backgroundColor: color, color } }
                        isSelected={ index === currentColor }
                        onClick={ () => setCurrentColor( index ) }
                    />
                );
            } ) }
        </>
    );
    return (
        <CircularOptionPicker
                options={ colorOptions }
                actions={
                    <CircularOptionPicker.ButtonAction
                        onClick={ () => setCurrentColor( undefined ) }
                    >
                        { 'Clear' }
                    </CircularOptionPicker.ButtonAction>
                }
            />
    );
};
```

## [Props](#props)

### [className: string](#classname-string)

A CSS class to apply to the wrapper element.

*   Required: No

### [actions: ReactNode](#actions-reactnode)

The action(s) to be rendered after the options, such as a ‘clear’ button as seen in `ColorPalette`.

Usually a `CircularOptionPicker.ButtonAction` or `CircularOptionPicker.DropdownLinkAction` component.

*   Required: No

### [options: ReactNode](#options-reactnode)

The options to be rendered, such as color swatches.

Usually a `CircularOptionPicker.Option` component.

*   Required: No

### [children: ReactNode](#children-reactnode)

The child elements.

*   Required: No

### [asButtons: boolean](#asbuttons-boolean)

Whether the control should present as a set of buttons, each with its own tab stop.

*   Required: No
*   Default: `false`

### [loop: boolean](#loop-boolean)

Prevents keyboard interaction from wrapping around. Only used when `asButtons` is not true.

*   Required: No
*   Default: `true`

### [aria-labelledby: string](#aria-labelledby-string)

The ID reference list of one or more elements that label the wrapper element.

*   Required: No

### [aria-label: string](#aria-label-string)

The label for the wrapper element. Not used if an ‘aria-labelledby’ is provided.

*   Required: No
*   Default: `Custom color picker`

## [Subcomponents](#subcomponents)

### [CircularOptionPicker.ButtonAction](#circularoptionpicker-buttonaction)

A `ButtonAction` is an action that is rendered as a button alongside the options themselves.

A common use case is a ‘clear’ button to deselect the currently selected option.

#### [Props](#props-2)

##### [className: string](#classname-string-2)

A CSS class to apply to the underlying `Button` component.

*   Required: No

##### [children: ReactNode](#children-reactnode-2)

The button’s children.

*   Required: No

##### [Inherited props](#inherited-props)

`CircularOptionPicker.ButtonAction` also inherits all of the [`Button` props](https://developer.wordpress.org/block-editor/reference-guide/components/button/#props), except for `href` and `target`.

### [CircularOptionPicker.DropdownLinkAction](#circularoptionpicker-dropdownlinkaction)

`CircularOptionPicker.DropdownLinkAction` is an action that’s hidden behind a dropdown toggle. The button is formatted as a link and rendered as an `anchor` element.

#### [Props](#props-3)

##### [className: string](#classname-string-3)

A CSS class to apply to the underlying `Dropdown` component.

*   Required: No

##### [linkText: string](#linktext-string)

The text to be displayed on the button.

*   Required: Yes

##### [dropdownProps: object](#dropdownprops-object)

The props for the underlying `Dropdown` component.

Inherits all of the [`Dropdown` props](https://developer.wordpress.org/block-editor/reference-guide/components/dropdown/#props), except for `className` and `renderToggle`.

*   Required: Yes

##### [buttonProps: object](#buttonprops-object)

Props for the underlying `Button` component.

Inherits all of the [`Button` props](https://developer.wordpress.org/block-editor/reference-guide/components/button/#props), except for `href`, `target`, and `children`.

*   Required: No
