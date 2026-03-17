---
title: "FocusableIframe"
slug: "focusable-iframe"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/focusable-iframe/"
generatedAt: 2025-12-30T18:16:26.856Z
---

**Deprecated**

`<FocusableIframe />` is a component rendering an `iframe` element enhanced to support focus events. By default, it is not possible to detect when an iframe is focused or clicked within. This enhanced component uses a technique which checks whether the target of a window `blur` event is the iframe, inferring that this has resulted in the focus of the iframe. It dispatches an emulated [`FocusEvent`](https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent) on the iframe element with event bubbling, so a parent component binding its own `onFocus` event will account for focus transitioning within the iframe.

## [Usage](#usage)

Use as you would a standard `iframe`. You may pass `onFocus` directly as the callback to be invoked when the iframe receives focus, or on an ancestor component since the event will bubble.

```jsx
import { FocusableIframe } from '@wordpress/components';

const MyFocusableIframe = () => (
    <FocusableIframe
        src="/my-iframe-url"
        onFocus={ () => console.log( 'iframe is focused' ) }
    />
);
```

## [Props](#props)

Any props aside from those listed below will be passed to the `FocusableIframe` will be passed through to the underlying `iframe` element.

### [onFocus](#onfocus)

*   Type: `Function`
*   Required: No

Callback to invoke when iframe receives focus. Passes an emulated `FocusEvent` object as the first argument.

### [iframeRef](#iframeref)

*   Type: `React.Ref`
*   Required: No

If a reference to the underlying DOM element is needed, pass `iframeRef` as the result of a `React.createRef` called from your component.
