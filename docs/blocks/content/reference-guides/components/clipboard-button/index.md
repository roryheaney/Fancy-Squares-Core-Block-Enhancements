---
title: "ClipboardButton"
slug: "clipboard-button"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/clipboard-button/"
generatedAt: 2025-12-30T18:16:09.432Z
---

This component is deprecated. Please use the \`useCopyToClipboard\` hook from the \`@wordpress/compose\` package instead.

With a clipboard button, users copy text (or other elements) with a single click or tap.

![Clipboard button component](https://i0.wp.com/wordpress.org/gutenberg/files/2019/07/clipboard-button-2-1.png?ssl=1)

## [Usage](#usage)

```jsx
import { useState } from 'react';
import { ClipboardButton } from '@wordpress/components';

const MyClipboardButton = () => {
    const [ hasCopied, setHasCopied ] = useState( false );
    return (
        <ClipboardButton
            variant="primary"
            text="Text to be copied."
            onCopy={ () => setHasCopied( true ) }
            onFinishCopy={ () => setHasCopied( false ) }
        >
            { hasCopied ? 'Copied!' : 'Copy Text' }
        </ClipboardButton>
    );
};
```

## [Props](#props)

The component accepts the following props:

### [className](#classname)

The class that will be added to the classes of the underlying `<Button>` component.

*   Type: `string`
*   Required: no

### [text](#text)

The text that will be copied to the clipboard.

*   Type: `string`
*   Required: yes

### [onCopy](#oncopy)

The function that will be called when the text is copied.

— Type: `() => void`  
— Required: yes

### [onFinishCopy](#onfinishcopy)

The function that will be called when the text is copied and the copy animation is finished.

— Type: `() => void`  
— Required: no

### [Inherited props](#inherited-props)

Any additional props will be passed the underlying `<Button/>` component. See the [Button](https://developer.wordpress.org/block-editor/reference-guide/components/button/#props) component for more details on the available props.
