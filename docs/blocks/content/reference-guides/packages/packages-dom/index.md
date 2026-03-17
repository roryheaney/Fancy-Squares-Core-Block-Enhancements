---
title: "@wordpress/dom"
slug: "packages-dom"
source: "https://developer.wordpress.org/block-editor/reference-guides/packages/packages-dom/"
generatedAt: 2025-12-30T18:18:03.761Z
---

DOM utilities module for WordPress.

## [Installation](#installation)

Install the module

```bash
npm install @wordpress/dom --save
```

## [API](#api)

### [computeCaretRect](#computecaretrect)

Get the rectangle for the selection in a container.

_Parameters_

*   _win_ `Window`: The window of the selection.

_Returns_

*   `DOMRect | null`: The rectangle.

### [documentHasSelection](#documenthasselection)

Check whether the current document has a selection. This includes focus in input fields, textareas, and general rich-text selection.

_Parameters_

*   _doc_ `Document`: The document to check.

_Returns_

*   `boolean`: True if there is selection, false if not.

### [documentHasTextSelection](#documenthastextselection)

Check whether the current document has selected text. This applies to ranges of text in the document, and not selection inside `<input>` and `<textarea>` elements.

See: [https://developer.mozilla.org/en-US/docs/Web/API/Window/getSelection#Related\_objects](https://developer.mozilla.org/en-US/docs/Web/API/Window/getSelection#Related_objects).

_Parameters_

*   _doc_ `Document`: The document to check.

_Returns_

*   `boolean`: True if there is selection, false if not.

### [documentHasUncollapsedSelection](#documenthasuncollapsedselection)

Check whether the current document has any sort of (uncollapsed) selection. This includes ranges of text across elements and any selection inside textual `<input>` and `<textarea>` elements.

_Parameters_

*   _doc_ `Document`: The document to check.

_Returns_

*   `boolean`: Whether there is any recognizable text selection in the document.

### [focus](#focus)

Object grouping `focusable` and `tabbable` utils under the keys with the same name.

### [getFilesFromDataTransfer](#getfilesfromdatatransfer)

Gets all files from a DataTransfer object.

_Parameters_

*   _dataTransfer_ `DataTransfer`: DataTransfer object to inspect.

_Returns_

*   `File[]`: An array containing all files.

### [getOffsetParent](#getoffsetparent)

Returns the closest positioned element, or null under any of the conditions of the offsetParent specification. Unlike offsetParent, this function is not limited to HTMLElement and accepts any Node (e.g. Node.TEXT\_NODE).

_Related_

*   [https://drafts.csswg.org/cssom-view/#dom-htmlelement-offsetparent](https://drafts.csswg.org/cssom-view/#dom-htmlelement-offsetparent)

_Parameters_

*   _node_ `Node`: Node from which to find offset parent.

_Returns_

*   `Node | null`: Offset parent.

### [getPhrasingContentSchema](#getphrasingcontentschema)

Get schema of possible paths for phrasing content.

_Related_

*   [https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content\_categories#Phrasing\_content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content)

_Parameters_

*   _context_ `[string]`: Set to “paste” to exclude invisible elements and sensitive data.

_Returns_

*   `Partial<ContentSchema>`: Schema.

### [getRectangleFromRange](#getrectanglefromrange)

Get the rectangle of a given Range. Returns `null` if no suitable rectangle can be found. Use instead of `Range.getBoundingClientRect()`, which is often broken, especially for collapsed ranges.

_Parameters_

*   _range_ `Range`: The range.

_Returns_

*   `DOMRect?`: The rectangle.

### [getScrollContainer](#getscrollcontainer)

Given a DOM node, finds the closest scrollable container node or the node itself, if scrollable.

_Parameters_

*   _node_ `Element | null`: Node from which to start.
*   _direction_ `?string`: Direction of scrollable container to search for (‘vertical’, ‘horizontal’, ‘all’). Defaults to ‘vertical’.

_Returns_

*   `Element | undefined`: Scrollable container node, if found.

### [insertAfter](#insertafter)

Given two DOM nodes, inserts the former in the DOM as the next sibling of the latter.

_Parameters_

*   _newNode_ `Node`: Node to be inserted.
*   _referenceNode_ `Node`: Node after which to perform the insertion.

_Returns_

*   `void`:

### [isEmpty](#isempty)

Recursively checks if an element is empty. An element is not empty if it contains text or contains elements with attributes such as images.

_Parameters_

*   _element_ `Element`: The element to check.

_Returns_

*   `boolean`: Whether or not the element is empty.

### [isEntirelySelected](#isentirelyselected)

Check whether the contents of the element have been entirely selected. Returns true if there is no possibility of selection.

_Parameters_

*   _element_ `HTMLElement`: The element to check.

_Returns_

*   `boolean`: True if entirely selected, false if not.

### [isFormElement](#isformelement)

Detects if element is a form element.

_Parameters_

*   _element_ `Element`: The element to check.

_Returns_

*   `boolean`: True if form element and false otherwise.

### [isHorizontalEdge](#ishorizontaledge)

Check whether the selection is horizontally at the edge of the container.

_Parameters_

*   _container_ `HTMLElement`: Focusable element.
*   _isReverse_ `boolean`: Set to true to check left, false for right.

_Returns_

*   `boolean`: True if at the horizontal edge, false if not.

### [isNumberInput](#isnumberinput)

Check whether the given element is an input field of type number.

_Parameters_

*   _node_ `Node`: The HTML node.

_Returns_

*   `node is HTMLInputElement`: True if the node is number input.

### [isPhrasingContent](#isphrasingcontent)

Find out whether or not the given node is phrasing content.

_Related_

*   [https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content\_categories#Phrasing\_content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content)

_Parameters_

*   _node_ `Node`: The node to test.

_Returns_

*   `boolean`: True if phrasing content, false if not.

### [isRTL](#isrtl)

Whether the element’s text direction is right-to-left.

_Parameters_

*   _element_ `Element`: The element to check.

_Returns_

*   `boolean`: True if rtl, false if ltr.

### [isSelectionForward](#isselectionforward)

Returns true if the given selection object is in the forward direction, or false otherwise.

_Related_

*   [https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition](https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition)

_Parameters_

*   _selection_ `Selection`: Selection object to check.

_Returns_

*   `boolean`: Whether the selection is forward.

### [isTextContent](#istextcontent)

_Parameters_

*   _node_ `Node`:

_Returns_

*   `boolean`: Node is text content

### [isTextField](#istextfield)

Check whether the given element is a text field, where text field is defined by the ability to select within the input, or that it is contenteditable.

See: [https://html.spec.whatwg.org/#textFieldSelection](https://html.spec.whatwg.org/#textFieldSelection)

_Parameters_

*   _node_ `Node`: The HTML element.

_Returns_

*   `node is HTMLElement`: True if the element is an text field, false if not.

### [isVerticalEdge](#isverticaledge)

Check whether the selection is vertically at the edge of the container.

_Parameters_

*   _container_ `HTMLElement`: Focusable element.
*   _isReverse_ `boolean`: Set to true to check top, false for bottom.

_Returns_

*   `boolean`: True if at the vertical edge, false if not.

### [placeCaretAtHorizontalEdge](#placecaretathorizontaledge)

Places the caret at start or end of a given element.

_Parameters_

*   _container_ `HTMLElement`: Focusable element.
*   _isReverse_ `boolean`: True for end, false for start.

### [placeCaretAtVerticalEdge](#placecaretatverticaledge)

Places the caret at the top or bottom of a given element.

_Parameters_

*   _container_ `HTMLElement`: Focusable element.
*   _isReverse_ `boolean`: True for bottom, false for top.
*   _rect_ `[DOMRect]`: The rectangle to position the caret with.

### [remove](#remove)

Given a DOM node, removes it from the DOM.

_Parameters_

*   _node_ `Node`: Node to be removed.

_Returns_

*   `void`:

### [removeInvalidHTML](#removeinvalidhtml)

Given a schema, unwraps or removes nodes, attributes and classes on HTML.

_Parameters_

*   _HTML_ `string`: The HTML to clean up.
*   _schema_ `import('./clean-node-list').Schema`: Schema for the HTML.
*   _inline_ `boolean`: Whether to clean for inline mode.

_Returns_

*   `string`: The cleaned up HTML.

### [replace](#replace)

Given two DOM nodes, replaces the former with the latter in the DOM.

_Parameters_

*   _processedNode_ `Element`: Node to be removed.
*   _newNode_ `Element`: Node to be inserted in its place.

_Returns_

*   `void`:

### [replaceTag](#replacetag)

Replaces the given node with a new node with the given tag name.

_Parameters_

*   _node_ `Element`: The node to replace
*   _tagName_ `string`: The new tag name.

_Returns_

*   `Element`: The new node.

### [safeHTML](#safehtml)

Strips scripts and on\* attributes from HTML.

_Parameters_

*   _html_ `string`: HTML to sanitize.

_Returns_

*   `string`: The sanitized HTML.

### [unwrap](#unwrap)

Unwrap the given node. This means any child nodes are moved to the parent.

_Parameters_

*   _node_ `Node`: The node to unwrap.

_Returns_

*   `void`:

### [wrap](#wrap)

Wraps the given node with a new node with the given tag name.

_Parameters_

*   _newNode_ `Element`: The node to insert.
*   _referenceNode_ `Element`: The node to wrap.

## [Contributing to this package](#contributing-to-this-package)

This is an individual package that’s part of the Gutenberg project. The project is organized as a monorepo. It’s made up of multiple self-contained software packages, each with a specific purpose. The packages in this monorepo are published to [npm](https://www.npmjs.com/) and used by [WordPress](https://make.wordpress.org/core/) as well as other software projects.

To find out more about contributing to this package or Gutenberg as a whole, please read the project’s main [contributor guide](https://github.com/WordPress/gutenberg/tree/HEAD/CONTRIBUTING.md).
