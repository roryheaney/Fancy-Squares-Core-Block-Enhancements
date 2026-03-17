---
title: "FormFileUpload"
slug: "form-file-upload"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/form-file-upload/"
generatedAt: 2025-12-30T18:16:28.419Z
---

See the [WordPress Storybook](https://wordpress.github.io/gutenberg/?path=/docs/components-formfileupload--docs) for more detailed, interactive documentation.

FormFileUpload allows users to select files from their local device.

```jsx
import { FormFileUpload } from '@wordpress/components';

const MyFormFileUpload = () => (
  <FormFileUpload
    __next40pxDefaultSize
    accept="image/*"
    onChange={ ( event ) => console.log( event.currentTarget.files ) }
  >
    Upload
  </FormFileUpload>
);
```

## [Props](#props)

### [\_\_next40pxDefaultSize](#__next40pxdefaultsize)

*   Type: `boolean`
*   Required: No
*   Default: `false`

Start opting into the larger default height that will become the default size in a future version.

### [accept](#accept)

*   Type: `string`
*   Required: No

A string passed to the `input` element that tells the browser which  
[file types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers)  
can be uploaded by the user. e.g: `image/*,video/*`.

### [children](#children)

*   Type: `ReactNode`
*   Required: No

Children are passed as children of `Button`.

### [icon](#icon)

*   Type: `IconType`
*   Required: No

The icon to render in the default button.

See the `Icon` component docs for more information.

### [multiple](#multiple)

*   Type: `boolean`
*   Required: No
*   Default: `false`

Whether to allow multiple selection of files or not.

### [onChange](#onchange)

*   Type: `ChangeEventHandler<HTMLInputElement>`
*   Required: Yes

Callback function passed directly to the `input` file element.

Select files will be available in `event.currentTarget.files`.

### [onClick](#onclick)

*   Type: `MouseEventHandler<HTMLInputElement>`
*   Required: No

Callback function passed directly to the `input` file element.

This can be useful when you want to force a `change` event to fire when  
the user chooses the same file again. To do this, set the target value to  
an empty string in the `onClick` function.

```jsx
<FormFileUpload
  __next40pxDefaultSize
  onClick={ ( event ) => ( event.target.value = '' ) }
  onChange={ onChange }
>
  Upload
</FormFileUpload>
```

### [render](#render)

*   Type: `(arg: { openFileDialog: () => void; }) => ReactNode`
*   Required: No

Optional callback function used to render the UI.

If passed, the component does not render the default UI (a button) and  
calls this function to render it. The function receives an object with  
property `openFileDialog`, a function that, when called, opens the browser  
native file upload modal window.
