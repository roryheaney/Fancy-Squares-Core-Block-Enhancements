---
title: "Guide"
slug: "guide"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/guide/"
generatedAt: 2025-12-30T18:16:32.244Z
---

`Guide` is a React component that renders a _user guide_ in a modal. The guide consists of several pages which the user can step through one by one. The guide is finished when the modal is closed or when the user clicks _Finish_ on the last page of the guide.

## [Usage](#usage)

```jsx
function MyTutorial() {
    const [ isOpen, setIsOpen ] = useState( true );

    if ( ! isOpen ) {
        return null;
    }

    return (
        <Guide
            onFinish={ () => setIsOpen( false ) }
            pages={ [
                {
                    content: <p>Welcome to the ACME Store!</p>,
                },
                {
                    image: <img src="https://acmestore.com/add-to-cart.png" />,
                    content: (
                        <p>
                            Click <i>Add to Cart</i> to buy a product.
                        </p>
                    ),
                },
            ] }
        />
    );
}
```

## [Props](#props)

The component accepts the following props:

### [className](#classname)

A custom class to add to the modal.

*   Type: `string`
*   Required: No

### [contentLabel](#contentlabel)

This property is used as the modal’s accessibility label. It is required for accessibility reasons.

*   Type: `string`
*   Required: Yes

### [finishButtonText](#finishbuttontext)

Use this to customize the label of the _Finish_ button shown at the end of the guide.

*   Type: `string`
*   Required: No
*   Default: `'Finish'`

### [nextButtonText](#nextbuttontext)

Use this to customize the label of the _Next_ button shown on each page of the guide.

*   Type: `string`
*   Required: No
*   Default: `'Next'`

### [previousButtonText](#previousbuttontext)

Use this to customize the label of the _Previous_ button shown on each page of the guide except the first.

*   Type: `string`
*   Required: No
*   Default: `'Previous'`

### [onFinish](#onfinish)

A function which is called when the guide is finished. The guide is finished when the modal is closed or when the user clicks _Finish_ on the last page of the guide.

*   Type: `( event?: KeyboardEvent< HTMLDivElement > | SyntheticEvent ) => void`
*   Required: Yes

### [pages](#pages)

A list of objects describing each page in the guide. Each object **must** contain a `'content'` property and may optionally contain a `'image'` property.

*   Type: `{ content: ReactNode; image?: ReactNode; }[]`
*   Required: No
*   Default: `[]`
