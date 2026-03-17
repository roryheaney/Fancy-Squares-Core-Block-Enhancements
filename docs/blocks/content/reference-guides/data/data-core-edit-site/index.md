---
title: "Edit Site"
slug: "data-core-edit-site"
source: "https://developer.wordpress.org/block-editor/reference-guides/data/data-core-edit-site/"
generatedAt: 2025-12-30T18:17:22.804Z
---

Namespace: `core/edit-site`.

## [Selectors](#selectors)

### [getCanUserCreateMedia](#getcanusercreatemedia)

Returns whether the current user can create media or not.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `Object`: Whether the current user can create media or not.

### [getCurrentTemplateNavigationPanelSubMenu](#getcurrenttemplatenavigationpanelsubmenu)

> **Deprecated**

### [getCurrentTemplateTemplateParts](#getcurrenttemplatetemplateparts)

> **Deprecated**

Returns the template parts and their blocks for the current edited template.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `Array`: Template parts and their blocks in an array.

### [getEditedPostContext](#geteditedpostcontext)

> **Deprecated**

Returns the edited post’s context object.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `Object`: Page.

### [getEditedPostId](#geteditedpostid)

> **Deprecated**

Returns the ID of the currently edited template or template part.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `?string`: Post ID.

### [getEditedPostType](#geteditedposttype)

> **Deprecated**

Returns the current edited post type (wp\_template or wp\_template\_part).

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `?TemplateType`: Template type.

### [getEditorMode](#geteditormode)

Returns the current editing mode.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `string`: Editing mode.

### [getHomeTemplateId](#gethometemplateid)

> **Deprecated**

### [getNavigationPanelActiveMenu](#getnavigationpanelactivemenu)

> **Deprecated**

### [getPage](#getpage)

> **Deprecated**

Returns the current page object.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `Object`: Page.

### [getReusableBlocks](#getreusableblocks)

Returns any available Reusable blocks.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `Array`: The available reusable blocks.

### [getSettings](#getsettings)

Returns the site editor settings.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `Object`: Settings.

### [hasPageContentFocus](#haspagecontentfocus)

> **Deprecated**

Whether or not the editor allows only page content to be edited.

_Returns_

*   `boolean`: Whether or not focus is on editing page content.

### [isFeatureActive](#isfeatureactive)

> **Deprecated**

Returns whether the given feature is enabled or not.

_Parameters_

*   _state_ `Object`: Global application state.
*   _featureName_ `string`: Feature slug.

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

### [isNavigationOpened](#isnavigationopened)

> **Deprecated**

### [isPage](#ispage)

> **Deprecated**

Whether or not the editor has a page loaded into it.

_Related_

*   setPage

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: Whether or not the editor has a page loaded into it.

### [isSaveViewOpened](#issaveviewopened)

Returns the current opened/closed state of the save panel.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: True if the save panel should be open; false if closed.

## [Actions](#actions)

### [addTemplate](#addtemplate)

> **Deprecated**

Action that adds a new template and sets it as the current template.

_Parameters_

*   _template_ `Object`: The template.

_Returns_

*   `Object`: Action object used to set the current template.

### [closeGeneralSidebar](#closegeneralsidebar)

Action that closes the sidebar.

### [openGeneralSidebar](#opengeneralsidebar)

Action that opens an editor sidebar.

_Parameters_

*   _name_ `?string`: Sidebar name to be opened.

### [openNavigationPanelToMenu](#opennavigationpaneltomenu)

> **Deprecated**

Opens the navigation panel and sets its active menu at the same time.

### [removeTemplate](#removetemplate)

Action that removes a template.

_Parameters_

*   _template_ `Object`: The template object.

### [revertTemplate](#reverttemplate)

Reverts a template to its original theme-provided file.

_Parameters_

*   _template_ `Object`: The template to revert.
*   _options_ `[Object]`:
*   _options.allowUndo_ `[boolean]`: Whether to allow the user to undo reverting the template. Default true.

### [setEditedEntity](#seteditedentity)

> **Deprecated**

Action that sets an edited entity.

_Parameters_

*   _postType_ `string`: The entity’s post type.
*   _postId_ `string`: The entity’s ID.
*   _context_ `Object`: The entity’s context.

_Returns_

*   `Object`: Action object.

### [setEditedPostContext](#seteditedpostcontext)

> **Deprecated**

Set’s the current block editor context.

_Parameters_

*   _context_ `Object`: The context object.

_Returns_

*   `Object`: Action object.

### [setHasPageContentFocus](#sethaspagecontentfocus)

Sets whether or not the editor allows only page content to be edited.

_Parameters_

*   _hasPageContentFocus_ `boolean`: True to allow only page content to be edited, false to allow template to be edited.

### [setHomeTemplateId](#sethometemplateid)

> **Deprecated**

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

### [setIsNavigationPanelOpened](#setisnavigationpanelopened)

> **Deprecated**

Sets whether the navigation panel should be open.

### [setIsSaveViewOpened](#setissaveviewopened)

Sets whether the save view panel should be open.

_Parameters_

*   _isOpen_ `boolean`: If true, opens the save view. If false, closes it. It does not toggle the state, but sets it directly.

### [setNavigationMenu](#setnavigationmenu)

> **Deprecated**

Action that sets a navigation menu.

_Parameters_

*   _navigationMenuId_ `string`: The Navigation Menu Post ID.

_Returns_

*   `Object`: Action object.

### [setNavigationPanelActiveMenu](#setnavigationpanelactivemenu)

> **Deprecated**

Action that sets the active navigation panel menu.

_Returns_

*   `Object`: Action object.

### [setPage](#setpage)

> **Deprecated**

Resolves the template for a page and displays both. If no path is given, attempts to use the postId to generate a path like `?p=${ postId }`.

_Returns_

*   `Object`: Action object.

### [setTemplate](#settemplate)

Action that sets a template, optionally fetching it from REST API.

_Returns_

*   `Object`: Action object.

### [setTemplatePart](#settemplatepart)

> **Deprecated**

Action that sets a template part.

_Parameters_

*   _templatePartId_ `string`: The template part ID.

_Returns_

*   `Object`: Action object.

### [switchEditorMode](#switcheditormode)

> **Deprecated**

Triggers an action used to switch editor mode.

_Parameters_

*   _mode_ `string`: The editor mode.

### [toggleDistractionFree](#toggledistractionfree)

> **Deprecated**

Action that toggles Distraction free mode. Distraction free mode expects there are no sidebars, as due to the z-index values set, you can’t close sidebars.

### [toggleFeature](#togglefeature)

Dispatches an action that toggles a feature flag.

_Parameters_

*   _featureName_ `string`: Feature name.

### [updateSettings](#updatesettings)

Returns an action object used to update the settings.

_Parameters_

*   _settings_ `Object`: New settings.

_Returns_

*   `Object`: Action object.
