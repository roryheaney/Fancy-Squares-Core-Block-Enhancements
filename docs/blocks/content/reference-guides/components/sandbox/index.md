---
title: "Sandbox"
slug: "sandbox"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/sandbox/"
generatedAt: 2025-12-30T18:16:52.619Z
---

This component provides an isolated environment for arbitrary HTML via iframes.

## [Usage](#usage)

```jsx
import { SandBox } from '@wordpress/components';

const MySandBox = () => (
    <SandBox html="<p>Content</p>" title="SandBox" type="embed" />
);
```

## [Props](#props)

### [html: string](#html-string)

The HTML to render in the body of the iframe document.

*   Required: No
*   Default: “”

### [onFocus: React.DOMAttributes< HTMLIFrameElement >\[ ‘onFocus’ \]](#onfocus-react-domattributes-htmliframeelement-onfocus)

The `onFocus` callback for the iframe.

*   Required: No

### [scripts: string\[\]](#scripts-string)

An array of script URLs to inject as `<script>` tags into the bottom of the `<body>` of the iframe document.

*   Required: No
*   Default: \[\]

### [styles: string\[\]](#styles-string)

An array of CSS strings to inject into the `<head>` of the iframe document.

*   Required: No
*   Default: \[\]

### [title: string](#title-string)

The `<title>` of the iframe document.

*   Required: No
*   Default: “”

### [type: string](#type-string)

The CSS class name to apply to the `<html>` and `<body>` elements of the iframe.

*   Required: No
*   Default: “”

### [tabIndex: HTMLElement\[ ‘tabIndex’ \]](#tabindex-htmlelement-tabindex)

The `tabindex` the iframe should receive.

*   Required: No
