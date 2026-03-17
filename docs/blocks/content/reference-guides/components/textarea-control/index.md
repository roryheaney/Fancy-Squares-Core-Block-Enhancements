---
title: "TextareaControl"
slug: "textarea-control"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/textarea-control/"
generatedAt: 2025-12-30T18:16:59.914Z
---

TextareaControls are TextControls that allow for multiple lines of text, and wrap overflow text onto a new line. They are a fixed height and scroll vertically when the cursor reaches the bottom of the field.

![An empty TextareaControl, and a focused TextareaControl with some content entered.](https://i0.wp.com/wordpress.org/gutenberg/files/2019/01/TextareaControl.png?ssl=1)

## [Design guidelines](#design-guidelines)

### [Usage](#usage)

#### [When to use TextareaControl](#when-to-use-textareacontrol)

Use TextareaControl when you need to encourage users enter an amount of text that’s longer than a single line. (A bigger box can encourage people to be more verbose, where a smaller one encourages them to be succinct.)

TextareaControl should:

*   Stand out from the background of the page and indicate that users can input information.
*   Have clearly differentiated active/inactive states, including focus styling.
*   Make it easy to understand and address any errors via clear and direct error notices.
*   Make it easy to understand the requested information by using a clear and descriptive label.

#### [When not to use TextareaControl](#when-not-to-use-textareacontrol)

Do not use TextareaControl if you need to let users enter shorter answers (no longer than a single line), such as a phone number or name. In this case, you should use `Text Control`.

![](https://i0.wp.com/wordpress.org/gutenberg/files/2019/01/TextareaControl-Answers-Do.png?ssl=1)

**Do**

Use TextareaControl to let users to enter text longer than a single line.

![](https://i0.wp.com/wordpress.org/gutenberg/files/2019/01/TextareaControl-Answers-Dont.png?ssl=1)

**Don’t**

Use TextareaControl for shorter answers.

## [Anatomy](#anatomy)

![](https://i0.wp.com/wordpress.org/gutenberg/files/2019/01/TextareaControl-Anatomy.png?ssl=1)

1.  Container
2.  Label

### [Containers](#containers)

Containers improve the discoverability of text fields by creating contrast between the text field and surrounding content.

![](https://i0.wp.com/wordpress.org/gutenberg/files/2019/01/TextareaControl-Stroke-Do.png?ssl=1)

**Do**  
Use a stroke around the container, which clearly indicates that users can input information.

![](https://i0.wp.com/wordpress.org/gutenberg/files/2019/01/TextareaControl-Stroke-Dont.png?ssl=1)

**Don’t**  
Use unclear visual markers to indicate a text field.

### [Label text](#label-text)

Label text is used to inform users as to what information is requested for a text field. Every text field should have a label. Label text should be above the input field, and always visible. Write labels in sentence capitalization.

### [Error text](#error-text)

When text input isn’t accepted, an error message can display instructions on how to fix it. Error messages are displayed below the input line, replacing helper text until fixed.

![](https://i0.wp.com/wordpress.org/gutenberg/files/2019/01/TextareaControl-Error.png?ssl=1)

## [Development guidelines](#development-guidelines)

### [Usage](#usage-2)

```jsx
import { useState } from 'react';
import { TextareaControl } from '@wordpress/components';

const MyTextareaControl = () => {
    const [ text, setText ] = useState( '' );

    return (
        <TextareaControl
            label="Text"
            help="Enter some text"
            value={ text }
            onChange={ ( value ) => setText( value ) }
        />
    );
};
```

### [Props](#props)

The set of props accepted by the component will be specified below.

Props not included in this set will be applied to the textarea element.

#### [help: string | Element](#help-string-element)

If this property is added, a help text will be generated using help property as the content.

*   Required: No

#### [hideLabelFromVision: boolean](#hidelabelfromvision-boolean)

If true, the label will only be visible to screen readers.

*   Required: No

#### [label: string](#label-string)

If this property is added, a label will be generated using label property as the content.

*   Required: No

#### [onChange: ( value: string ) => void](#onchange-value-string-void)

A function that receives the new value of the textarea each time it changes.

*   Required: Yes

#### [rows: number](#rows-number)

The number of rows the textarea should contain.

*   Required: No
*   Default: 4

#### [value: string](#value-string)

The current value of the textarea.

*   Required: Yes

## [Related components](#related-components)

*   For a field where users only enter one line of text, use the `TextControl` component.
