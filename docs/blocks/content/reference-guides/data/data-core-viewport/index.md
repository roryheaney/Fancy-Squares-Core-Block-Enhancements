---
title: "The Viewport Data"
slug: "data-core-viewport"
source: "https://developer.wordpress.org/block-editor/reference-guides/data/data-core-viewport/"
generatedAt: 2025-12-30T18:17:29.459Z
---

Namespace: `core/viewport`.

## [Selectors](#selectors)

### [isViewportMatch](#isviewportmatch)

Returns true if the viewport matches the given query, or false otherwise.

_Usage_

```js
import { store as viewportStore } from '@wordpress/viewport';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
const ExampleComponent = () => {
    const isMobile = useSelect(
        ( select ) => select( viewportStore ).isViewportMatch( '< small' ),
        []
    );

    return isMobile ? (
        <div>{ __( 'Mobile' ) }</div>
    ) : (
        <div>{ __( 'Not Mobile' ) }</div>
    );
};
```

_Parameters_

*   _state_ `Object`: Viewport state object.
*   _query_ `string`: Query string. Includes operator and breakpoint name, space separated. Operator defaults to >=.

_Returns_

*   `boolean`: Whether viewport matches query.

## [Actions](#actions)

The actions in this package shouldn’t be used directly.

Nothing to document.
