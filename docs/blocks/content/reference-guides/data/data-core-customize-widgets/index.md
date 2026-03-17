---
title: "Customize Widgets"
slug: "data-core-customize-widgets"
source: "https://developer.wordpress.org/block-editor/reference-guides/data/data-core-customize-widgets/"
generatedAt: 2025-12-30T18:17:21.402Z
---

Namespace: `core/customize-widgets`.

## [Selectors](#selectors)

### [isInserterOpened](#isinserteropened)

Returns true if the inserter is opened.

_Usage_

```js
import { store as customizeWidgetsStore } from '@wordpress/customize-widgets';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';

const ExampleComponent = () => {
    const { isInserterOpened } = useSelect(
        ( select ) => select( customizeWidgetsStore ),
        []
    );

    return isInserterOpened()
        ? __( 'Inserter is open' )
        : __( 'Inserter is closed.' );
};
```

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: Whether the inserter is opened.

## [Actions](#actions)

### [setIsInserterOpened](#setisinserteropened)

Returns an action object used to open/close the inserter.

_Usage_

```js
import { useState } from 'react';
import { store as customizeWidgetsStore } from '@wordpress/customize-widgets';
import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
import { Button } from '@wordpress/components';

const ExampleComponent = () => {
    const { setIsInserterOpened } = useDispatch( customizeWidgetsStore );
    const [ isOpen, setIsOpen ] = useState( false );

    return (
        <Button
            onClick={ () => {
                setIsInserterOpened( ! isOpen );
                setIsOpen( ! isOpen );
            } }
        >
            { __( 'Open/close inserter' ) }
        </Button>
    );
};
```

_Parameters_

*   _value_ `boolean|Object`: Whether the inserter should be opened (true) or closed (false). To specify an insertion point, use an object.
*   _value.rootClientId_ `string`: The root client ID to insert at.
*   _value.insertionIndex_ `number`: The index to insert at.

_Returns_

*   `Object`: Action object.
