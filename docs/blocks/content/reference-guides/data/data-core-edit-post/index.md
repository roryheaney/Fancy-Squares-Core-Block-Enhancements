---
title: "The Editor’s UI Data"
slug: "data-core-edit-post"
source: "https://developer.wordpress.org/block-editor/reference-guides/data/data-core-edit-post/"
generatedAt: 2025-12-30T18:17:22.041Z
---

Namespace: `core/edit-post`.

## [Selectors](#selectors)

### [areMetaBoxesInitialized](#aremetaboxesinitialized)

Returns true if meta boxes are initialized.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: Whether meta boxes are initialized.

### [getActiveGeneralSidebarName](#getactivegeneralsidebarname)

Returns the current active general sidebar name, or null if there is no general sidebar active. The active general sidebar is a unique name to identify either an editor or plugin sidebar.

Examples:

*   `edit-post/document`
*   `my-plugin/insert-image-sidebar`

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `?string`: Active general sidebar name.

### [getActiveMetaBoxLocations](#getactivemetaboxlocations)

Returns an array of active meta box locations.

_Parameters_

*   _state_ `Object`: Post editor state.

_Returns_

*   `string[]`: Active meta box locations.

### [getAllMetaBoxes](#getallmetaboxes)

Returns the list of all the available meta boxes.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `Array`: List of meta boxes.

### [getEditedPostTemplate](#geteditedposttemplate)

Retrieves the template of the currently edited post.

_Returns_

*   `?Object`: Post Template.

### [getEditorMode](#geteditormode)

Returns the current editing mode.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `string`: Editing mode.

### [getHiddenBlockTypes](#gethiddenblocktypes)

Returns an array of blocks that are hidden.

_Returns_

*   `Array`: A list of the hidden block types

### [getMetaBoxesPerLocation](#getmetaboxesperlocation)

Returns the list of all the available meta boxes for a given location.

_Parameters_

*   _state_ `Object`: Global application state.
*   _location_ `string`: Meta box location to test.

_Returns_

*   `?Array`: List of meta boxes.

### [getPreference](#getpreference)

_Parameters_

*   _state_ `Object`: Global application state.
*   _preferenceKey_ `string`: Preference Key.
*   _defaultValue_ `*`: Default Value.

_Returns_

*   `*`: Preference Value.

### [getPreferences](#getpreferences)

Returns the preferences (these preferences are persisted locally).

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `Object`: Preferences Object.

### [hasMetaBoxes](#hasmetaboxes)

Returns true if the post is using Meta Boxes

_Parameters_

*   _state_ `Object`: Global application state

_Returns_

*   `boolean`: Whether there are metaboxes or not.

### [isEditingTemplate](#iseditingtemplate)

> **Deprecated**

Returns true if the template editing mode is enabled.

### [isEditorPanelEnabled](#iseditorpanelenabled)

> **Deprecated**

Returns true if the given panel is enabled, or false otherwise. Panels are enabled by default.

_Parameters_

*   _state_ `Object`: Global application state.
*   _panelName_ `string`: A string that identifies the panel.

_Returns_

*   `boolean`: Whether or not the panel is enabled.

### [isEditorPanelOpened](#iseditorpanelopened)

> **Deprecated**

Returns true if the given panel is open, or false otherwise. Panels are closed by default.

_Parameters_

*   _state_ `Object`: Global application state.
*   _panelName_ `string`: A string that identifies the panel.

_Returns_

*   `boolean`: Whether or not the panel is open.

### [isEditorPanelRemoved](#iseditorpanelremoved)

> **Deprecated**

Returns true if the given panel was programmatically removed, or false otherwise. All panels are not removed by default.

_Parameters_

*   _state_ `Object`: Global application state.
*   _panelName_ `string`: A string that identifies the panel.

_Returns_

*   `boolean`: Whether or not the panel is removed.

### [isEditorSidebarOpened](#iseditorsidebaropened)

Returns true if the editor sidebar is opened.

_Parameters_

*   _state_ `Object`: Global application state

_Returns_

*   `boolean`: Whether the editor sidebar is opened.

### [isFeatureActive](#isfeatureactive)

Returns whether the given feature is enabled or not.

_Parameters_

*   _state_ `Object`: Global application state.
*   _feature_ `string`: Feature slug.

_Returns_

*   `boolean`: Is active.

### [isInserterOpened](#isinserteropened)

> **Deprecated**

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

### [isMetaBoxLocationActive](#ismetaboxlocationactive)

Returns true if there is an active meta box in the given location, or false otherwise.

_Parameters_

*   _state_ `Object`: Post editor state.
*   _location_ `string`: Meta box location to test.

_Returns_

*   `boolean`: Whether the meta box location is active.

### [isMetaBoxLocationVisible](#ismetaboxlocationvisible)

Returns true if a metabox location is active and visible

_Parameters_

*   _state_ `Object`: Post editor state.
*   _location_ `string`: Meta box location to test.

_Returns_

*   `boolean`: Whether the meta box location is active and visible.

### [isModalActive](#ismodalactive)

> **Deprecated** since WP 6.3 use `core/interface` store’s selector with the same name instead.

Returns true if a modal is active, or false otherwise.

_Parameters_

*   _state_ `Object`: Global application state.
*   _modalName_ `string`: A string that uniquely identifies the modal.

_Returns_

*   `boolean`: Whether the modal is active.

### [isPluginItemPinned](#ispluginitempinned)

Returns true if the plugin item is pinned to the header. When the value is not set it defaults to true.

_Parameters_

*   _state_ `Object`: Global application state.
*   _pluginName_ `string`: Plugin item name.

_Returns_

*   `boolean`: Whether the plugin item is pinned.

### [isPluginSidebarOpened](#ispluginsidebaropened)

Returns true if the plugin sidebar is opened.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: Whether the plugin sidebar is opened.

### [isPublishSidebarOpened](#ispublishsidebaropened)

> **Deprecated**

Returns true if the publish sidebar is opened.

_Parameters_

*   _state_ `Object`: Global application state

_Returns_

*   `boolean`: Whether the publish sidebar is open.

### [isSavingMetaBoxes](#issavingmetaboxes)

Returns true if the Meta Boxes are being saved.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: Whether the metaboxes are being saved.

## [Actions](#actions)

### [closeGeneralSidebar](#closegeneralsidebar)

Returns an action object signalling that the user closed the sidebar.

### [closeModal](#closemodal)

> **Deprecated** since WP 6.3 use `core/interface` store’s action with the same name instead.

Returns an action object signalling that the user closed a modal.

_Returns_

*   `Object`: Action object.

### [closePublishSidebar](#closepublishsidebar)

> **Deprecated**

Returns an action object used in signalling that the user closed the publish sidebar.

_Returns_

*   `Object`: Action object.

### [hideBlockTypes](#hideblocktypes)

Update the provided block types to be hidden.

_Parameters_

*   _blockNames_ `string[]`: Names of block types to hide.

### [initializeMetaBoxes](#initializemetaboxes)

Initializes WordPress `postboxes` script and the logic for saving meta boxes.

### [metaBoxUpdatesFailure](#metaboxupdatesfailure)

Returns an action object used to signal a failed meta box update.

_Returns_

*   `Object`: Action object.

### [metaBoxUpdatesSuccess](#metaboxupdatessuccess)

Returns an action object used to signal a successful meta box update.

_Returns_

*   `Object`: Action object.

### [openGeneralSidebar](#opengeneralsidebar)

Returns an action object used in signalling that the user opened an editor sidebar.

_Parameters_

*   _name_ `?string`: Sidebar name to be opened.

### [openModal](#openmodal)

> **Deprecated** since WP 6.3 use `core/interface` store’s action with the same name instead.

Returns an action object used in signalling that the user opened a modal.

_Parameters_

*   _name_ `string`: A string that uniquely identifies the modal.

_Returns_

*   `Object`: Action object.

### [openPublishSidebar](#openpublishsidebar)

> **Deprecated**

Returns an action object used in signalling that the user opened the publish sidebar.

_Returns_

*   `Object`: Action object

### [removeEditorPanel](#removeeditorpanel)

> **Deprecated**

Returns an action object used to remove a panel from the editor.

_Parameters_

*   _panelName_ `string`: A string that identifies the panel to remove.

_Returns_

*   `Object`: Action object.

### [requestMetaBoxUpdates](#requestmetaboxupdates)

Update a metabox.

### [setAvailableMetaBoxesPerLocation](#setavailablemetaboxesperlocation)

Stores info about which Meta boxes are available in which location.

_Parameters_

*   _metaBoxesPerLocation_ `Object`: Meta boxes per location.

### [setIsEditingTemplate](#setiseditingtemplate)

> **Deprecated**

Returns an action object used to switch to template editing.

### [setIsInserterOpened](#setisinserteropened)

> **Deprecated**

Returns an action object used to open/close the inserter.

_Parameters_

*   _value_ `boolean|Object`: Whether the inserter should be opened (true) or closed (false).

### [setIsListViewOpened](#setislistviewopened)

> **Deprecated**

Returns an action object used to open/close the list view.

_Parameters_

*   _isOpen_ `boolean`: A boolean representing whether the list view should be opened or closed.

### [showBlockTypes](#showblocktypes)

Update the provided block types to be visible.

_Parameters_

*   _blockNames_ `string[]`: Names of block types to show.

### [switchEditorMode](#switcheditormode)

> **Deprecated**

Triggers an action used to switch editor mode.

_Parameters_

*   _mode_ `string`: The editor mode.

### [toggleDistractionFree](#toggledistractionfree)

> **Deprecated**

Action that toggles Distraction free mode. Distraction free mode expects there are no sidebars, as due to the z-index values set, you can’t close sidebars.

### [toggleEditorPanelEnabled](#toggleeditorpanelenabled)

> **Deprecated**

Returns an action object used to enable or disable a panel in the editor.

_Parameters_

*   _panelName_ `string`: A string that identifies the panel to enable or disable.

_Returns_

*   `Object`: Action object.

### [toggleEditorPanelOpened](#toggleeditorpanelopened)

> **Deprecated**

Opens a closed panel and closes an open panel.

_Parameters_

*   _panelName_ `string`: A string that identifies the panel to open or close.

### [toggleFeature](#togglefeature)

Triggers an action used to toggle a feature flag.

_Parameters_

*   _feature_ `string`: Feature name.

### [toggleFullscreenMode](#togglefullscreenmode)

Action that toggles the Fullscreen Mode view option.

### [togglePinnedPluginItem](#togglepinnedpluginitem)

Triggers an action object used to toggle a plugin name flag.

_Parameters_

*   _pluginName_ `string`: Plugin name.

### [togglePublishSidebar](#togglepublishsidebar)

> **Deprecated**

Returns an action object used in signalling that the user toggles the publish sidebar.

_Returns_

*   `Object`: Action object

### [updatePreferredStyleVariations](#updatepreferredstylevariations)

> **Deprecated**

Returns an action object used in signaling that a style should be auto-applied when a block is created.
