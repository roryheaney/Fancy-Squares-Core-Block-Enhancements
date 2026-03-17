---
title: "Rich Text"
slug: "data-core-rich-text"
source: "https://developer.wordpress.org/block-editor/reference-guides/data/data-core-rich-text/"
generatedAt: 2025-12-30T18:17:28.851Z
---

Namespace: `core/rich-text`.

## [Selectors](#selectors)

### [getFormatType](#getformattype)

Returns a format type by name.

_Usage_

```js
import { __, sprintf } from '@wordpress/i18n';
import { store as richTextStore } from '@wordpress/rich-text';
import { useSelect } from '@wordpress/data';

const ExampleComponent = () => {
   const { getFormatType } = useSelect(
       ( select ) => select( richTextStore ),
       []
   );

   const boldFormat = getFormatType( 'core/bold' );

   return boldFormat ? (
       <ul>
           { Object.entries( boldFormat )?.map( ( [ key, value ] ) => (
               <li>
                   { key } : { value }
               </li>
          ) ) }
      </ul>
   ) : (
       __( 'Not Found' )
   ;
};
```

_Parameters_

*   _state_ `Object`: Data state.
*   _name_ `string`: Format type name.

_Returns_

*   `?Object`: Format type.

### [getFormatTypeForBareElement](#getformattypeforbareelement)

Gets the format type, if any, that can handle a bare element (without a data-format-type attribute), given the tag name of this element.

_Usage_

```js
import { __, sprintf } from '@wordpress/i18n';
import { store as richTextStore } from '@wordpress/rich-text';
import { useSelect } from '@wordpress/data';

const ExampleComponent = () => {
    const { getFormatTypeForBareElement } = useSelect(
        ( select ) => select( richTextStore ),
        []
    );

    const format = getFormatTypeForBareElement( 'strong' );

    return format && <p>{ sprintf( __( 'Format name: %s' ), format.name ) }</p>;
};
```

_Parameters_

*   _state_ `Object`: Data state.
*   _bareElementTagName_ `string`: The tag name of the element to find a format type for.

_Returns_

*   `?Object`: Format type.

### [getFormatTypeForClassName](#getformattypeforclassname)

Gets the format type, if any, that can handle an element, given its classes.

_Usage_

```js
import { __, sprintf } from '@wordpress/i18n';
import { store as richTextStore } from '@wordpress/rich-text';
import { useSelect } from '@wordpress/data';

const ExampleComponent = () => {
    const { getFormatTypeForClassName } = useSelect(
        ( select ) => select( richTextStore ),
        []
    );

    const format = getFormatTypeForClassName( 'has-inline-color' );

    return format && <p>{ sprintf( __( 'Format name: %s' ), format.name ) }</p>;
};
```

_Parameters_

*   _state_ `Object`: Data state.
*   _elementClassName_ `string`: The classes of the element to find a format type for.

_Returns_

*   `?Object`: Format type.

### [getFormatTypes](#getformattypes)

Returns all the available format types.

_Usage_

```js
import { __, sprintf } from '@wordpress/i18n';
import { store as richTextStore } from '@wordpress/rich-text';
import { useSelect } from '@wordpress/data';

const ExampleComponent = () => {
    const { getFormatTypes } = useSelect(
        ( select ) => select( richTextStore ),
        []
    );

    const availableFormats = getFormatTypes();

    return availableFormats ? (
        <ul>
            { availableFormats?.map( ( format ) => (
                <li>{ format.name }</li>
            ) ) }
        </ul>
    ) : (
        __( 'No Formats available' )
    );
};
```

_Parameters_

*   _state_ `Object`: Data state.

_Returns_

*   `Array`: Format types.

## [Actions](#actions)

Nothing to document.
