---
title: "Preferences"
slug: "data-core-preferences"
source: "https://developer.wordpress.org/block-editor/reference-guides/data/data-core-preferences/"
generatedAt: 2025-12-30T18:17:27.184Z
---

Namespace: `core/preferences`.

## [Selectors](#selectors)

### [get](#get)

Returns a boolean indicating whether a prefer is active for a particular scope.

_Parameters_

*   _state_ `StoreState`: The store state.
*   _scope_ `string`: The scope of the feature (e.g. core/edit-post).
*   _name_ `string`: The name of the feature.

_Returns_

*   `*`: Is the feature enabled?

## [Actions](#actions)

### [set](#set)

Returns an action object used in signalling that a preference should be set to a value

_Parameters_

*   _scope_ `string`: The preference scope (e.g. core/edit-post).
*   _name_ `string`: The preference name.
*   _value_ `*`: The value to set.

_Returns_

*   `SetAction`: Action object.

### [setDefaults](#setdefaults)

Returns an action object used in signalling that preference defaults should be set.

_Parameters_

*   _scope_ `string`: The preference scope (e.g. core/edit-post).
*   _defaults_ `ScopedDefaults`: A key/value map of preference names to values.

_Returns_

*   `SetDefaultsAction`: Action object.

### [setPersistenceLayer](#setpersistencelayer)

Sets the persistence layer.

When a persistence layer is set, the preferences store will:

*   call `get` immediately and update the store state to the value returned.
*   call `set` with all preferences whenever a preference changes value.

`setPersistenceLayer` should ideally be dispatched at the start of an application’s lifecycle, before any other actions have been dispatched to the preferences store.

_Parameters_

*   _persistenceLayer_ `WPPreferencesPersistenceLayer< D >`: The persistence layer.

_Returns_

*   `Promise< SetPersistenceLayerAction< D > >`: Action object.

### [toggle](#toggle)

Returns an action object used in signalling that a preference should be toggled.

_Parameters_

*   _scope_ `string`: The preference scope (e.g. core/edit-post).
*   _name_ `string`: The preference name.
