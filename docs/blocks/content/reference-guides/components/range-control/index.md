---
title: "RangeControl"
slug: "range-control"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/range-control/"
generatedAt: 2025-12-30T18:16:49.332Z
---

RangeControls are used to make selections from a range of incremental values.

![A RangeControl for volume](https://i0.wp.com/make.wordpress.org/design/files/2018/12/rangecontrol.png?ssl=1)

## [Design guidelines](#design-guidelines)

### [Anatomy](#anatomy)

A RangeControl can contain the following elements:

1.  **Rail**: The rail represents the entire surface area of the slider, from the minimum value selectable by the user to the maximum value selectable by the user. For left-to-right (LTR) languages, the minimum value appears on the far left, and the maximum value on the far right. For right-to-left (RTL) languages this orientation is reversed, with the minimum value on the far right and the maximum value on the far left.
2.  **Track**: The track represents the portion of the rail from the minimum value to the currently selected value.
3.  **Thumb**: The thumb slides along the track, displaying the selected value through its position.
4.  **Value entry field**: The value entry field displays the currently selected, specific numerical value.
5.  **Icon** (optional): An icon can be displayed before or after the slider.
6.  **Tick mark** (optional): Tick marks represent predetermined values to which the user can move the slider.

### [Types](#types)

#### [Continuous sliders](#continuous-sliders)

Continuous sliders allow users to select a value along a subjective range. They do not display the selected numeric value. Use them when displaying/editing the numeric value is not important, like volume.

#### [Discrete sliders](#discrete-sliders)

Discrete sliders can be adjusted to a specific value by referencing its value entry field. Use them when it’s important to display/edit the numeric value, like text size.

Possible selections may be organized through the use of tick marks, which a thumb will snap to (or to which an input will round up or down).

### [Behavior](#behavior)

*   **Click and drag**: The slider is controlled by clicking the thumb and dragging it.
*   **Click jump**: The slider is controlled by clicking the track.
*   **Click and arrow**: The slider is controlled by clicking the thumb, then using arrow keys to move it.
*   **Tab and arrow**: The slider is controlled by using the tab key to select the thumb of the desired slider, then using arrow keys to move it.
*   **Value entry field**: Discrete sliders have value entry fields. After a text entry is made, the slider position automatically updates to reflect the new value.
*   **Tick marks** (Optional) Discrete sliders can use evenly spaced tick marks along the slider track, and the thumb will snap to them. Each tick mark should change the setting in increments that are discernible to the user.

### [Usage](#usage)

RangeControls reflect a range of values along a track, from which users may select a single value. They are ideal for adjusting settings such as volume, opacity, or text size.

RangeControls can have icons on both ends of the track that reflect a range of values.

#### [Immediate effects](#immediate-effects)

Changes made with RangeControls are immediate, allowing a user to make adjustments until finding their preference. They shouldn’t be paired with settings that have delays in providing feedback.

![A RangeControl that requires a save action](https://i0.wp.com/make.wordpress.org/design/files/2018/12/rangecontrol-save-action.png?ssl=1)

**Don’t**  
Don’t use RangeControls if the effect isn’t immediate.

#### [Current state](#current-state)

RangeControls reflect the current state of the settings they control.

#### [Values](#values)

![](https://i0.wp.com/make.wordpress.org/design/files/2018/12/rangecontrol-field.png?ssl=1)

A RangeControl with an editable numeric value

**Editable numeric values**: Editable numeric values allow users to set the exact value of a RangeControl. After setting a value, the thumb position is immediately updated to match the new value.

![A RangeControl with only two values](https://i0.wp.com/make.wordpress.org/design/files/2018/12/rangecontrol-2-values.png?ssl=1)

**Don’t**  
RangeControls should only be used for choosing selections from a range of values (e.g., don’t use a RangeControl if there are only 2 values).

![](https://i0.wp.com/make.wordpress.org/design/files/2018/12/rangecontrol-disabled.png?ssl=1)

**Don’t**  
RangeControls should provide the full range of choices available for the user to select from (e.g., don’t disable only part of a RangeControl).

## [Development guidelines](#development-guidelines)

### [Usage](#usage-2)

Render a RangeControl to make a selection from a range of incremental values.

```jsx
import { useState } from 'react';
import { RangeControl } from '@wordpress/components';

const MyRangeControl = () => {
    const [ columns, setColumns ] = useState( 2 );

    return (
        <RangeControl
            __next40pxDefaultSize
            label="Columns"
            value={ columns }
            onChange={ ( value ) => setColumns( value ) }
            min={ 2 }
            max={ 10 }
        />
    );
};
```

## [Props](#props)

The set of props accepted by the component will be specified below.  
Props not included in this set will be applied to the input elements.

### [afterIcon: string|Function|Component|null](#aftericon-stringfunctioncomponentnull)

If this property is added, an [Icon component](https://developer.wordpress.org/block-editor/reference-guide/components/icon/) will be rendered after the slider with the icon equal to `afterIcon`.

For more information on `IconType` see the [Icon component](https://developer.wordpress.org/block-editor/reference-guide/components/icon/index.tsx/#L23).

*   Required: No
*   Platform: Web

### [allowReset: boolean](#allowreset-boolean)

If this property is true, a button to reset the slider is rendered.

*   Required: No
*   Default: `false`
*   Platform: Web | Mobile

### [beforeIcon: string|Function|Component|null](#beforeicon-stringfunctioncomponentnull)

If this property is added, an [Icon component](https://developer.wordpress.org/block-editor/reference-guide/components/icon/) will be rendered before the slider with the icon equal to `beforeIcon`.

For more information on `IconType` see the [Icon component](https://developer.wordpress.org/block-editor/reference-guide/components/icon/index.tsx/#L23).

*   Required: No
*   Platform: Web

### [color: CSSProperties\[‘color’\]](#color-csspropertiescolor)

CSS color string for the `RangeControl` wrapper.

*   Required: No
*   Platform: Web

### [currentInput: number](#currentinput-number)

The current input to use as a fallback if `value` is currently `undefined`.

*   Required: No
*   Platform: Web

### [disabled: boolean](#disabled-boolean)

Disables the `input`, preventing new values from being applied.

*   Required: No
*   Platform: Web

### [help: string|Element](#help-stringelement)

If this property is added, a help text will be generated using help property as the content.

*   Required: No
*   Platform: Web

### [hideLabelFromVision: boolean](#hidelabelfromvision-boolean)

Provides control over whether the label will only be visible to screen readers.

*   Required: No

### [icon: string](#icon-string)

An icon to be shown above the slider next to its container title.

*   Required: No
*   Platform: Mobile

### [initialPosition: number](#initialposition-number)

The slider starting position, used when no `value` is passed. The `initialPosition` will be clamped between the provided `min` and `max` prop values.

*   Required: No
*   Platform: Web | Mobile

### [isShiftStepEnabled: boolean](#isshiftstepenabled-boolean)

Passed as a prop to the `NumberControl` component and is only applicable if `withInputField` is true. If true, while the number input has focus, pressing `UP` or `DOWN` along with the `SHIFT` key will change the value by the `shiftStep` value.

*   Required: No

### [label: string](#label-string)

If this property is added, a label will be generated using label property as the content.

*   Required: No
*   Platform: Web | Mobile

### [marks: Array|boolean](#marks-arrayboolean)

Renders a visual representation of `step` ticks. Custom mark indicators can be provided by an `Array`.

Example:

```jsx
const marks = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 1,
        label: '1',
    },
    {
        value: 8,
        label: '8',
    },
    {
        value: 10,
        label: '10',
    },
];

const MyRangeControl() {
    return ( <RangeControl marks={ marks } min={ 0 } max={ 10 } step={ 1 } /> )
}
```

*   Required: No
*   Platform: Web

### [onBlur: FocusEventHandler< HTMLInputElement >](#onblur-focuseventhandler-htmlinputelement)

Callback for when `RangeControl` input loses focus.

*   Required: No
*   Platform: Web

### [onChange: ( value?: number ) => void](#onchange-value-number-void)

A function that receives the new value. The value will be less than `max` and more than `min` unless a reset (enabled by `allowReset`) has occurred. In which case the value will be either that of `resetFallbackValue` if it has been specified or otherwise `undefined`.

*   Required: No
*   Platform: Web | Mobile

### [onFocus: FocusEventHandler< HTMLInputElement >](#onfocus-focuseventhandler-htmlinputelement)

Callback for when `RangeControl` input gains focus.

*   Required: No
*   Platform: Web

### [onMouseLeave: MouseEventHandler< HTMLInputElement >](#onmouseleave-mouseeventhandler-htmlinputelement)

Callback for when mouse exits the `RangeControl`.

*   Required: No
*   Platform: Web

### [onMouseMove: MouseEventHandler< HTMLInputElement >](#onmousemove-mouseeventhandler-htmlinputelement)

Callback for when mouse moves within the `RangeControl`.

*   Required: No
*   Platform: Web

### [min: number](#min-number)

The minimum `value` allowed.

*   Required: No
*   Default: 0
*   Platform: Web | Mobile

### [max: number](#max-number)

The maximum `value` allowed.

*   Required: No
*   Default: 100
*   Platform: Web | Mobile

### [railColor: CSSProperties\[ ‘color’ \]](#railcolor-cssproperties-color)

CSS color string to customize the rail element’s background.

*   Required: No
*   Platform: Web

### [renderTooltipContent: ( value ) => value](#rendertooltipcontent-value-value)

A way to customize the rendered UI of the value. Example:

```jsx
const customTooltipContent = value => `${value}%`

const MyRangeControl() {
    return (<RangeControl renderTooltipContent={ customTooltipContent } />)
}
```

*   Required: No
*   Platform: Web

### [resetFallbackValue: number](#resetfallbackvalue-number)

The value to revert to if the Reset button is clicked (enabled by `allowReset`)

*   Required: No
*   Platform: Web

### [separatorType: ‘none’ | ‘fullWidth’ | ‘topFullWidth’](#separatortype-none-fullwidth-topfullwidth)

Define if separator line under/above control row should be disabled or full width. By default it is placed below excluding underline the control icon.

*   Required: No
*   Platform: Mobile

### [shiftStep: number](#shiftstep-number)

Passed as a prop to the `NumberControl` component and is only applicable if `withInputField` and `isShiftStepEnabled` are both true and while the number input has focus. Acts as a multiplier of `step`.

*   Required: No

### [showTooltip: boolean](#showtooltip-boolean)

Forcing the Tooltip UI to show or hide. This is overridden to `false` when `step` is set to the special string value `any`.

*   Required: No
*   Platform: Web

### [step: number | ‘any’](#step-number-any)

The minimum amount by which `value` changes. It is also a factor in validation as `value` must be a multiple of `step` (offset by `min`) to be valid. Accepts the special string value `any` that voids the validation constraint and overrides both `withInputField` and `showTooltip` props to `false`.

*   Required: No
*   Platform: Web

### [trackColor: CSSProperties\[ ‘color’ \]](#trackcolor-cssproperties-color)

CSS color string to customize the track element’s background.

*   Required: No
*   Platform: Web

### [type: string](#type-string)

Define if the value selection should present a stepper control or a slider control in the bottom sheet on mobile. To use the stepper set the type value as `stepper`. Defaults to slider if no option is provided.

*   Required: No
*   Platform: Mobile

### [value: number](#value-number)

The current value of the range slider.

*   Required: No
*   Platform: Web | Mobile

### [withInputField: boolean](#withinputfield-boolean)

Determines if the `input` number field will render next to the RangeControl. This is overridden to `false` when `step` is set to the special string value `any`.

*   Required: No
*   Platform: Web

### [\_\_next40pxDefaultSize: boolean](#__next40pxdefaultsize-boolean)

Start opting into the larger default height that will become the default size in a future version.

*   Required: No
*   Default: `false`

## [Related components](#related-components)

*   To collect a numerical input in a text field, use the `TextControl` component.
