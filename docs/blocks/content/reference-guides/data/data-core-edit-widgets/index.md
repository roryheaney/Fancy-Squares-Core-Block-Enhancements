---
title: "Edit Widgets"
slug: "data-core-edit-widgets"
source: "https://developer.wordpress.org/block-editor/reference-guides/data/data-core-edit-widgets/"
generatedAt: 2025-12-30T18:17:23.501Z
---

Namespace: `core/edit-widgets`.

## [Selectors](#selectors)

### [canInsertBlockInWidgetArea](#caninsertblockinwidgetarea)

Returns true if a block can be inserted into a widget area.

_Parameters_

*   _state_ `Array`: The open state of the widget areas.
*   _blockName_ `string`: The name of the block being inserted.

_Returns_

*   `boolean`: True if the block can be inserted in a widget area.

### [getEditedWidgetAreas](#geteditedwidgetareas)

Returns all edited widget area entity records.

_Returns_

*   `Object[]`: List of edited widget area entity records.

### [getIsWidgetAreaOpen](#getiswidgetareaopen)

Gets whether the widget area is opened.

_Parameters_

*   _state_ `Array`: The open state of the widget areas.
*   _clientId_ `string`: The clientId of the widget area.

_Returns_

*   `boolean`: True if the widget area is open.

### [getParentWidgetAreaBlock](#getparentwidgetareablock)

Given a child client id, returns the parent widget area block.

_Parameters_

*   _clientId_ `string`: The client id of a block in a widget area.

_Returns_

*   `WPBlock`: The widget area block.

### [getReferenceWidgetBlocks](#getreferencewidgetblocks)

Returns all blocks representing reference widgets.

_Parameters_

*   _referenceWidgetName_ `string`: Optional. If given, only reference widgets with this name will be returned.

_Returns_

*   `Array`: List of all blocks representing reference widgets

### [getWidget](#getwidget)

Returns API widget data for a particular widget ID.

_Parameters_

*   _id_ `number`: Widget ID.

_Returns_

*   `Object`: API widget data for a particular widget ID.

### [getWidgetAreaForWidgetId](#getwidgetareaforwidgetid)

Returns widgetArea containing a block identify by given widgetId

_Parameters_

*   _widgetId_ `string`: The ID of the widget.

_Returns_

*   `Object`: Containing widget area.

### [getWidgetAreas](#getwidgetareas)

Returns all API widget areas.

_Returns_

*   `Object[]`: API List of widget areas.

### [getWidgets](#getwidgets)

Returns all API widgets.

_Returns_

*   `Object[]`: API List of widgets.

### [isInserterOpened](#isinserteropened)

Returns true if the inserter is opened.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: Whether the inserter is opened.

### [isListViewOpened](#islistviewopened)

Returns true if the list view is opened.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: Whether the list view is opened.

### [isSavingWidgetAreas](#issavingwidgetareas)

Returns true if any widget area is currently being saved.

_Returns_

*   `boolean`: True if any widget area is currently being saved. False otherwise.

### [isWidgetSavingLocked](#iswidgetsavinglocked)

Returns whether widget saving is locked.

_Usage_

```jsx
import { __ } from '@wordpress/i18n';
import { store as widgetStore } from '@wordpress/edit-widgets';
import { useSelect } from '@wordpress/data';

const ExampleComponent = () => {
    const isSavingLocked = useSelect(
        ( select ) => select( widgetStore ).isWidgetSavingLocked(),
        []
    );

    return isSavingLocked ? (
        <p>{ __( 'Widget saving is locked' ) }</p>
    ) : (
        <p>{ __( 'Widget saving is not locked' ) }</p>
    );
};
```

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: Is locked.

## [Actions](#actions)

### [closeGeneralSidebar](#closegeneralsidebar)

Returns an action object signalling that the user closed the sidebar.

_Returns_

*   `Object`: Action creator.

### [lockWidgetSaving](#lockwidgetsaving)

Returns an action object used to signal that widget saving is locked.

_Usage_

```js
import { store as widgetStore } from '@wordpress/edit-widgets';
import { useDispatch } from '@wordpress/data';

const ExampleComponent = () => {
    const { lockWidgetSaving } = useDispatch( widgetStore );
    return (
        <Button onClick={ () => lockWidgetSaving( 'lockName' ) }>
            { __( 'Lock Widget Saving' ) }
        </Button>
    );
};
```

_Parameters_

*   _lockName_ `string`: The lock name.

_Returns_

*   `Object`: Action object

### [moveBlockToWidgetArea](#moveblocktowidgetarea)

Action that handles moving a block between widget areas

_Parameters_

*   _clientId_ `string`: The clientId of the block to move.
*   _widgetAreaId_ `string`: The id of the widget area to move the block to.

### [persistStubPost](#persiststubpost)

Persists a stub post with given ID to core data store. The post is meant to be in-memory only and shouldn’t be saved via the API.

_Parameters_

*   _id_ `string`: Post ID.
*   _blocks_ `Array`: Blocks the post should consist of.

_Returns_

*   `Object`: The post object.

### [saveEditedWidgetAreas](#saveeditedwidgetareas)

Converts all the blocks from edited widget areas into widgets, and submits a batch request to save everything at once.

Creates a snackbar notice on either success or error.

_Returns_

*   `Function`: An action creator.

### [saveWidgetArea](#savewidgetarea)

Converts all the blocks from a widget area specified by ID into widgets, and submits a batch request to save everything at once.

_Parameters_

*   _widgetAreaId_ `string`: ID of the widget area to process.

_Returns_

*   `Function`: An action creator.

### [saveWidgetAreas](#savewidgetareas)

Converts all the blocks from specified widget areas into widgets, and submits a batch request to save everything at once.

_Parameters_

*   _widgetAreas_ `Object[]`: Widget areas to save.

_Returns_

*   `Function`: An action creator.

### [setIsInserterOpened](#setisinserteropened)

Returns an action object used to open/close the inserter.

_Parameters_

*   _value_ `boolean|Object`: Whether the inserter should be opened (true) or closed (false). To specify an insertion point, use an object.
*   _value.rootClientId_ `string`: The root client ID to insert at.
*   _value.insertionIndex_ `number`: The index to insert at.

_Returns_

*   `Object`: Action object.

### [setIsListViewOpened](#setislistviewopened)

Returns an action object used to open/close the list view.

_Parameters_

*   _isOpen_ `boolean`: A boolean representing whether the list view should be opened or closed.

_Returns_

*   `Object`: Action object.

### [setIsWidgetAreaOpen](#setiswidgetareaopen)

Sets the open state of the widget area.

_Parameters_

*   _clientId_ `string`: The clientId of the widget area.
*   _isOpen_ `boolean`: Whether the widget area should be opened.

_Returns_

*   `Object`: Action.

### [setWidgetAreasOpenState](#setwidgetareasopenstate)

Sets the open state of all the widget areas.

_Parameters_

*   _widgetAreasOpenState_ `Object`: The open states of all the widget areas.

_Returns_

*   `Object`: Action.

### [setWidgetIdForClientId](#setwidgetidforclientid)

Sets the clientId stored for a particular widgetId.

_Parameters_

*   _clientId_ `number`: Client id.
*   _widgetId_ `number`: Widget id.

_Returns_

*   `Object`: Action.

### [unlockWidgetSaving](#unlockwidgetsaving)

Returns an action object used to signal that widget saving is unlocked.

_Usage_

```js
import { store as widgetStore } from '@wordpress/edit-widgets';
import { useDispatch } from '@wordpress/data';

const ExampleComponent = () => {
    const { unlockWidgetSaving } = useDispatch( widgetStore );
    return (
        <Button onClick={ () => unlockWidgetSaving( 'lockName' ) }>
            { __( 'Unlock Widget Saving' ) }
        </Button>
    );
};
```

_Parameters_

*   _lockName_ `string`: The lock name.

_Returns_

*   `Object`: Action object
