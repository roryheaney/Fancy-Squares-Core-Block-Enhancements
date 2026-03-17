---
title: "@wordpress/e2e-test-utils"
slug: "packages-e2e-test-utils"
source: "https://developer.wordpress.org/block-editor/reference-guides/packages/packages-e2e-test-utils/"
generatedAt: 2025-12-30T18:18:04.984Z
---

End-To-End (E2E) test utils for WordPress.

_It works properly with the minimum version of Gutenberg `13.8.0` or the minimum version of WordPress `6.0.0`._

**Note that there’s currently an ongoing [project](https://github.com/WordPress/gutenberg/issues/38851) to migrate E2E tests to Playwright instead. This package is deprecated and will only accept bug fixes until fully migrated.**

## [Installation](#installation)

Install the module

```bash
npm install @wordpress/e2e-test-utils --save-dev
```

**Note**: This package requires Node.js version with long-term support status (check [Active LTS or Maintenance LTS releases](https://nodejs.org/en/about/previous-releases)). It is not compatible with older versions.

## [API](#api)

### [activatePlugin](#activateplugin)

Activates an installed plugin.

_Parameters_

*   _slug_ `string`: Plugin slug.

### [activateTheme](#activatetheme)

Activates an installed theme.

_Parameters_

*   _slug_ `string`: Theme slug.

### [arePrePublishChecksEnabled](#areprepublishchecksenabled)

Verifies if publish checks are enabled.

_Returns_

*   `Promise<boolean>`: Boolean which represents the state of prepublish checks.

### [canvas](#canvas)

Gets the editor canvas frame.

### [changeSiteTimezone](#changesitetimezone)

Visits general settings page and changes the timezone to the given value.

_Parameters_

*   _timezone_ `string`: Value of the timezone to set.

_Returns_

*   `string`: Value of the previous timezone.

### [clearLocalStorage](#clearlocalstorage)

Clears the local storage.

### [clickBlockAppender](#clickblockappender)

Clicks the default block appender.

### [clickBlockToolbarButton](#clickblocktoolbarbutton)

Clicks a block toolbar button.

_Parameters_

*   _label_ `string`: The text string of the button label.
*   _type_ `[string]`: The type of button label: ‘ariaLabel’ or ‘content’.

### [clickButton](#clickbutton)

Clicks a button based on the text on the button.

_Parameters_

*   _buttonText_ `string`: The text that appears on the button to click.

### [clickMenuItem](#clickmenuitem)

Searches for an item in the menu with the text provided and clicks it.

_Parameters_

*   _label_ `string`: The label to search the menu item for.

### [clickOnCloseModalButton](#clickonclosemodalbutton)

Click on the close button of an open modal.

_Parameters_

*   _modalClassName_ `?string`: Class name for the modal to close

### [clickOnMoreMenuItem](#clickonmoremenuitem)

Clicks on More Menu item, searches for the button with the text provided and clicks it.

_Parameters_

*   _buttonLabel_ `string`: The label to search the button for.

### [closeGlobalBlockInserter](#closeglobalblockinserter)

Closes the global inserter.

### [closeListView](#closelistview)

Closes list view

### [createEmbeddingMatcher](#createembeddingmatcher)

Creates a function to determine if a request is embedding a certain URL.

_Parameters_

*   _url_ `string`: The URL to check against a request.

_Returns_

*   `Function`: Function that determines if a request is for the embed API, embedding a specific URL.

### [createJSONResponse](#createjsonresponse)

Respond to a request with a JSON response.

_Parameters_

*   _mockResponse_ `string`: The mock object to wrap in a JSON response.

_Returns_

*   `Promise`: Promise that responds to a request with the mock JSON response.

### [createMenu](#createmenu)

Create menus and all linked resources for the menu using the REST API.

_Parameters_

*   _menu_ `Object`: Rest payload for the menu
*   _menuItems_ `?Array`: Data for any menu items to be created.

### [createNewPost](#createnewpost)

Creates new post.

_Parameters_

*   _object_ `Object`: Object to create new post, along with tips enabling option.
*   _object.postType_ `[string]`: Post type of the new post.
*   _object.title_ `[string]`: Title of the new post.
*   _object.content_ `[string]`: Content of the new post.
*   _object.excerpt_ `[string]`: Excerpt of the new post.
*   _object.showWelcomeGuide_ `[boolean]`: Whether to show the welcome guide.

### [createNewTemplate](#createnewtemplate)

Opens the template editor with a newly created template.

_Parameters_

*   _name_ `string`: Name of the template.

### [createReusableBlock](#createreusableblock)

Creates a simple reusable block with a paragraph block.

_Parameters_

*   _content_ `string`: Paragraph block’s content
*   _title_ `title`: Reusable block’s name.

### [createURL](#createurl)

Creates new URL by parsing base URL, WPPath and query string.

_Parameters_

*   _WPPath_ `string`: String to be serialized as pathname.
*   _query_ `?string`: String to be serialized as query portion of URL.

_Returns_

*   `string`: String which represents full URL.

### [createURLMatcher](#createurlmatcher)

Creates a function to determine if a request is calling a URL with the substring present.

_Parameters_

*   _substring_ `string`: The substring to check for.

_Returns_

*   `Function`: Function that determines if a request’s URL contains substring.

### [createUser](#createuser)

Create a new user account.

_Parameters_

*   _username_ `string`: User name.
*   _object_ `?Object`: Optional Settings for the new user account.
*   _object.firstName_ `[string]`: First name.
*   _object.lastName_ `[string]`: Last name.
*   _object.role_ `[string]`: Role. Defaults to Administrator.

_Returns_

*   `string`: Password for the newly created user account.

### [deactivatePlugin](#deactivateplugin)

Deactivates an active plugin.

_Parameters_

*   _slug_ `string`: Plugin slug.

### [deleteAllMenus](#deleteallmenus)

Delete all menus using the REST API

### [deleteAllTemplates](#deletealltemplates)

Delete all the templates of given type.

_Parameters_

*   _type_ `('wp_template'|'wp_template_part')`: – Template type to delete.

### [deleteAllWidgets](#deleteallwidgets)

Delete all the widgets in the widgets screen.

### [deleteTheme](#deletetheme)

Deletes a theme from the site, activating another theme if necessary.

_Parameters_

*   _slug_ `string`: Theme slug.
*   _settings_ `?Object`: Optional settings object.
*   _settings.newThemeSlug_ `?string`: A theme to switch to if the theme to delete is active. Required if the theme to delete is active.
*   _settings.newThemeSearchTerm_ `?string`: A search term to use if the new theme is not findable by its slug.

### [deleteUser](#deleteuser)

Delete a user account.

_Parameters_

*   _username_ `string`: User name.

### [disableFocusLossObservation](#disablefocuslossobservation)

Removes the focus loss listener that `enableFocusLossObservation()` adds.

### [disablePageDialogAccept](#disablepagedialogaccept)

Disable auto-accepting any dialogs.

### [disablePrePublishChecks](#disableprepublishchecks)

Disables Pre-publish checks.

### [disableSiteEditorWelcomeGuide](#disablesiteeditorwelcomeguide)

Skips the welcome guide popping up to first time users of the site editor

### [dragAndResize](#dragandresize)

Clicks an element, drags a particular distance and releases the mouse button.

_Parameters_

*   _element_ `Object`: The puppeteer element handle.
*   _delta_ `Object`: Object containing movement distances.
*   _delta.x_ `number`: Horizontal distance to drag.
*   _delta.y_ `number`: Vertical distance to drag.

_Returns_

*   `Promise`: Promise resolving when drag completes.

### [enableFocusLossObservation](#enablefocuslossobservation)

Adds an event listener to the document which throws an error if there is a loss of focus.

### [enablePageDialogAccept](#enablepagedialogaccept)

Enables event listener which auto-accepts all dialogs on the page.

### [enablePrePublishChecks](#enableprepublishchecks)

Enables Pre-publish checks.

### [ensureSidebarOpened](#ensuresidebaropened)

Verifies that the edit post/site/widgets sidebar is opened, and if it is not, opens it.

_Returns_

*   `Promise`: Promise resolving once the sidebar is opened.

### [enterEditMode](#entereditmode)

Enters edit mode.

### [findSidebarPanelToggleButtonWithTitle](#findsidebarpaneltogglebuttonwithtitle)

Finds a sidebar panel with the provided title.

_Parameters_

*   _panelTitle_ `string`: The name of sidebar panel.

_Returns_

*   `?ElementHandle`: Object that represents an in-page DOM element.

### [findSidebarPanelWithTitle](#findsidebarpanelwithtitle)

Finds the button responsible for toggling the sidebar panel with the provided title.

_Parameters_

*   _panelTitle_ `string`: The name of sidebar panel.

_Returns_

*   `Promise<ElementHandle|undefined>`: Object that represents an in-page DOM element.

### [getAllBlockInserterItemTitles](#getallblockinserteritemtitles)

Returns an array of strings with all inserter item titles.

_Returns_

*   `Promise`: Promise resolving with an array containing all inserter item titles.

### [getAllBlocks](#getallblocks)

Returns an array with all blocks; Equivalent to calling wp.data.select( ‘core/block-editor’ ).getBlocks();

_Returns_

*   `Promise`: Promise resolving with an array containing all blocks in the document.

### [getAvailableBlockTransforms](#getavailableblocktransforms)

Returns an array of strings with all block titles, that the current selected block can be transformed into.

_Returns_

*   `Promise`: Promise resolving with an array containing all possible block transforms

### [getBlockSetting](#getblocksetting)

Returns a string containing the block title associated with the provided block name.

_Parameters_

*   _blockName_ `string`: Block name.
*   _setting_ `string`: Block setting e.g: title, attributes….

_Returns_

*   `Promise`: Promise resolving with a string containing the block title.

### [getCurrentPostContent](#getcurrentpostcontent)

Returns a promise which resolves with the current post content (HTML string).

_Returns_

*   `Promise`: Promise resolving with current post content markup.

### [getCurrentSiteEditorContent](#getcurrentsiteeditorcontent)

Returns a promise which resolves with the edited post content (HTML string).

_Returns_

*   `Promise<string>`: Promise resolving with post content markup.

### [getEditedPostContent](#geteditedpostcontent)

Returns a promise which resolves with the edited post content (HTML string).

_Returns_

*   `Promise`: Promise resolving with post content markup.

### [getListViewBlocks](#getlistviewblocks)

Gets all block anchor nodes in the list view that match a given block name label.

_Parameters_

*   _blockLabel_ `string`: the label of the block as displayed in the ListView.

_Returns_

*   `Promise`: all the blocks anchor nodes matching the label in the ListView.

### [getOption](#getoption)

Returns a site option, from the options admin page.

_Parameters_

*   _setting_ `string`: The option, used to get the option by id.

_Returns_

*   `string`: The value of the option.

### [getPageError](#getpageerror)

Returns a promise resolving to one of either a string or null. A string will be resolved if an error message is present in the contents of the page. If no error is present, a null value will be resolved instead. This requires the environment be configured to display errors.

_Related_

*   [http://php.net/manual/en/function.error-reporting.php](http://php.net/manual/en/function.error-reporting.php)

_Returns_

*   `Promise<?string>`: Promise resolving to a string or null, depending whether a page error is present.

### [hasBlockSwitcher](#hasblockswitcher)

Returns a boolean indicating if the current selected block has a block switcher or not.

_Returns_

*   `Promise`: Promise resolving with a boolean.

### [insertBlock](#insertblock)

Inserts a block matching a given search term via the global inserter.

_Parameters_

*   _searchTerm_ `string`: The term by which to find the block to insert.

### [insertBlockDirectoryBlock](#insertblockdirectoryblock)

Inserts a Block Directory block matching a given search term via the global inserter.

_Parameters_

*   _searchTerm_ `string`: The term by which to find the Block Directory block to insert.

### [insertPattern](#insertpattern)

Inserts a pattern matching a given search term via the global inserter.

_Parameters_

*   _searchTerm_ `string`: The term by which to find the pattern to insert.

### [installPlugin](#installplugin)

Installs a plugin from the WP.org repository.

_Parameters_

*   _slug_ `string`: Plugin slug.
*   _searchTerm_ `?string`: If the plugin is not findable by its slug use an alternative term to search.

### [installTheme](#installtheme)

Installs a theme from the WP.org repository.

_Parameters_

*   _slug_ `string`: Theme slug.
*   _settings_ `?Object`: Optional settings object.
*   _settings.searchTerm_ `?string`: Search term to use if the theme is not findable by its slug.

### [isCurrentURL](#iscurrenturl)

Checks if current URL is a WordPress path.

_Parameters_

*   _WPPath_ `string`: String to be serialized as pathname.
*   _query_ `?string`: String to be serialized as query portion of URL.

_Returns_

*   `boolean`: Boolean represents whether current URL is or not a WordPress path.

### [isInDefaultBlock](#isindefaultblock)

Checks if the block that is focused is the default block.

_Returns_

*   `Promise`: Promise resolving with a boolean indicating if the focused block is the default block.

### [isListViewOpen](#islistviewopen)

Undocumented declaration.

### [isOfflineMode](#isofflinemode)

Undocumented declaration.

### [isThemeInstalled](#isthemeinstalled)

Checks whether a theme exists on the site.

_Parameters_

*   _slug_ `string`: Theme slug to check.

_Returns_

*   `boolean`: Whether the theme exists.

### [loginUser](#loginuser)

Performs log in with specified username and password.

_Parameters_

*   _username_ `?string`: String to be used as user credential.
*   _password_ `?string`: String to be used as user credential.

### [logout](#logout)

Performs log out.

### [mockOrTransform](#mockortransform)

Mocks a request with the supplied mock object, or allows it to run with an optional transform, based on the deserialised JSON response for the request.

_Parameters_

*   _mockCheck_ `Function`: function that returns true if the request should be mocked.
*   _mock_ `Object`: A mock object to wrap in a JSON response, if the request should be mocked.
*   _responseObjectTransform_ `Function|undefined`: An optional function that transforms the response’s object before the response is used.

_Returns_

*   `Promise`: Promise that uses `mockCheck` to see if a request should be mocked with `mock`, and optionally transforms the response with `responseObjectTransform`.

### [openDocumentSettingsSidebar](#opendocumentsettingssidebar)

Clicks on the button in the header which opens Document Settings sidebar when it is closed.

### [openGlobalBlockInserter](#openglobalblockinserter)

Opens the global inserter.

### [openGlobalStylesPanel](#openglobalstylespanel)

Opens a global styles panel.

_Parameters_

*   _panelName_ `string`: Name of the panel that is going to be opened.

### [openListView](#openlistview)

Opens list view

### [openPreviewPage](#openpreviewpage)

Opens the preview page of an edited post.

_Parameters_

*   _editorPage_ `Page`: puppeteer editor page.

_Returns_

*   `Page`: preview page.

### [openPreviousGlobalStylesPanel](#openpreviousglobalstylespanel)

Opens the previous global styles panel.

### [openPublishPanel](#openpublishpanel)

Opens the publish panel.

### [openTypographyToolsPanelMenu](#opentypographytoolspanelmenu)

Opens the Typography tools panel menu provided via block supports.

### [pressKeyTimes](#presskeytimes)

Presses the given keyboard key a number of times in sequence.

_Parameters_

*   _key_ `string`: Key to press.
*   _count_ `number`: Number of times to press.

### [pressKeyWithModifier](#presskeywithmodifier)

Performs a key press with modifier (Shift, Control, Meta, Alt), where each modifier is normalized to platform-specific modifier.

_Parameters_

*   _modifier_ `string`: Modifier key.
*   _key_ `string`: Key to press while modifier held.

### [publishPost](#publishpost)

Publishes the post, resolving once the request is complete (once a notice is displayed).

_Returns_

*   `Promise`: Promise resolving when publish is complete.

### [publishPostWithPrePublishChecksDisabled](#publishpostwithprepublishchecksdisabled)

Publishes the post without the pre-publish checks, resolving once the request is complete (once a notice is displayed).

_Returns_

*   `Promise`: Promise resolving when publish is complete.

### [resetPreferences](#resetpreferences)

Clears all user meta preferences.

### [saveDraft](#savedraft)

Saves the post as a draft, resolving once the request is complete (once the “Saved” indicator is displayed).

_Returns_

*   `Promise`: Promise resolving when draft save is complete.

### [searchForBlock](#searchforblock)

Searches for a block via the global inserter.

_Parameters_

*   _searchTerm_ `string`: The term to search the inserter for.

_Returns_

*   `Promise<ElementHandle|null>`: The handle of block to be inserted or null if nothing was found.

### [searchForBlockDirectoryBlock](#searchforblockdirectoryblock)

Searches for a Block Directory block via the global inserter.

_Parameters_

*   _searchTerm_ `string`: The term to search the inserter for.

_Returns_

*   `Promise<ElementHandle|null>`: The handle of the Block Directory block to be inserted or null if nothing was found.

### [searchForPattern](#searchforpattern)

Searches for a pattern via the global inserter.

_Parameters_

*   _searchTerm_ `string`: The term to search the inserter for.

_Returns_

*   `Promise<ElementHandle|null>`: The handle of the pattern to be inserted or null if nothing was found.

### [searchForReusableBlock](#searchforreusableblock)

Searches for a reusable block via the global inserter.

_Parameters_

*   _searchTerm_ `string`: The term to search the inserter for.

_Returns_

*   `Promise<ElementHandle|null>`: The handle of the reusable block to be inserted or null if nothing was found.

### [selectBlockByClientId](#selectblockbyclientid)

Given the clientId of a block, selects the block on the editor.

_Parameters_

*   _clientId_ `string`: Identified of the block.

### [setBrowserViewport](#setbrowserviewport)

Sets browser viewport to specified type.

_Parameters_

*   _viewport_ `WPViewport`: Viewport name or dimensions object to assign.

### [setClipboardData](#setclipboarddata)

Sets the clipboard data that can be pasted with `pressKeyWithModifier( 'primary', 'v' )`.

_Parameters_

*   _$1_ `Object`: Options.
*   _$1.plainText_ `string`: Plain text to set.
*   _$1.html_ `string`: HTML to set.

### [setOption](#setoption)

Sets a site option, from the options-general admin page.

_Parameters_

*   _setting_ `string`: The option, used to get the option by id.
*   _value_ `string`: The value to set the option to.

_Returns_

*   `string`: The previous value of the option.

### [setPostContent](#setpostcontent)

Sets code editor content

_Parameters_

*   _content_ `string`: New code editor content.

_Returns_

*   `Promise`: Promise resolving with an array containing all blocks in the document.

### [setUpResponseMocking](#setupresponsemocking)

Sets up mock checks and responses. Accepts a list of mock settings with the following properties:

*   `match`: function to check if a request should be mocked.
*   `onRequestMatch`: async function to respond to the request.

_Usage_

```js
const MOCK_RESPONSES = [
    {
        match: isEmbedding( 'https://wordpress.org/gutenberg/handbook/' ),
        onRequestMatch: JSONResponse( MOCK_BAD_WORDPRESS_RESPONSE ),
    },
    {
        match: isEmbedding(
            'https://wordpress.org/gutenberg/handbook/block-api/attributes/'
        ),
        onRequestMatch: JSONResponse( MOCK_EMBED_WORDPRESS_SUCCESS_RESPONSE ),
    },
];
setUpResponseMocking( MOCK_RESPONSES );
```

If none of the mock settings match the request, the request is allowed to continue.

_Parameters_

*   _mocks_ `Array`: Array of mock settings.

### [showBlockToolbar](#showblocktoolbar)

The block toolbar is not always visible while typing. Call this function to reveal it.

### [switchBlockInspectorTab](#switchblockinspectortab)

Clicks on the block inspector tab button with the supplied label and waits for the tab switch.

_Parameters_

*   _label_ `string`: Aria label to find tab button by.

### [switchEditorModeTo](#switcheditormodeto)

Switches editor mode.

_Parameters_

*   _mode_ `string`: String editor mode.

### [switchUserToAdmin](#switchusertoadmin)

Switches the current user to the admin user (if the user running the test is not already the admin user).

### [switchUserToTest](#switchusertotest)

Switches the current user to whichever user we should be running the tests as (if we’re not already that user).

### [toggleGlobalBlockInserter](#toggleglobalblockinserter)

Toggles the global inserter.

### [toggleGlobalStyles](#toggleglobalstyles)

Toggles the global styles sidebar (opens it if closed and closes it if open).

### [toggleMoreMenu](#togglemoremenu)

Toggles the More Menu.

_Parameters_

*   _waitFor_ `['open' | 'close']`: Whether it should wait for the menu to open or close. If `undefined` it won’t wait for anything.

### [toggleOfflineMode](#toggleofflinemode)

Undocumented declaration.

### [togglePreferencesOption](#togglepreferencesoption)

Toggles a preference option with the given tab label and the option label.

_Parameters_

*   _tabLabel_ `string`: The preferences tab label to click.
*   _optionLabel_ `string`: The option label to search the button for.
*   _shouldBeChecked_ `[boolean]`: If true, turns the option on. If false, off. If not provided, the option will be toggled.

### [transformBlockTo](#transformblockto)

Converts editor’s block type.

_Parameters_

*   _name_ `string`: Block name.

### [trashAllComments](#trashallcomments)

Navigates to the comments listing screen and bulk-trashes any comments which exist.

_Returns_

*   `Promise`: Promise resolving once comments have been trashed.

### [trashAllPosts](#trashallposts)

Navigates to the post listing screen and bulk-trashes any posts which exist.

_Parameters_

*   _postType_ `string`: – String slug for type of post to trash.
*   _postStatus_ `string`: – String status of posts to trash.

_Returns_

*   `Promise`: Promise resolving once posts have been trashed.

### [uninstallPlugin](#uninstallplugin)

Uninstalls a plugin.

_Parameters_

*   _slug_ `string`: Plugin slug.

### [visitAdminPage](#visitadminpage)

Visits admin page; if user is not logged in then it logging in it first, then visits admin page.

_Parameters_

*   _adminPath_ `string`: String to be serialized as pathname.
*   _query_ `string`: String to be serialized as query portion of URL.

### [visitSiteEditor](#visitsiteeditor)

Visits the Site Editor main page

By default, it also skips the welcome guide. The option can be disabled if need be.

_Related_

*   disableSiteEditorWelcomeGuide

_Parameters_

*   _query_ `string`: String to be serialized as query portion of URL.
*   _skipWelcomeGuide_ `[boolean]`: Whether to skip the welcome guide as part of the navigation.

### [waitForWindowDimensions](#waitforwindowdimensions)

Function that waits until the page viewport has the required dimensions. It is being used to address a problem where after using setViewport the execution may continue, without the new dimensions being applied. [https://github.com/GoogleChrome/puppeteer/issues/1751](https://github.com/GoogleChrome/puppeteer/issues/1751)

_Parameters_

*   _width_ `number`: Width of the window.
*   _height_ `number`: Height of the window.

### [wpDataSelect](#wpdataselect)

Queries the WordPress data module.

`page.evaluate` – used in the function – returns `undefined` when it encounters a non-serializable value. Since we store many different values in the data module, you can end up with an `undefined` result. Before using this function, make sure the data you are querying doesn’t contain non-serializable values, for example, functions, DOM element handles, etc.

_Related_

*   [https://pptr.dev/#?product=Puppeteer&version=v9.0.0&show=api-pageevaluatepagefunction-args](https://pptr.dev/#?product=Puppeteer&version=v9.0.0&show=api-pageevaluatepagefunction-args)
*   [https://github.com/WordPress/gutenberg/pull/31199](https://github.com/WordPress/gutenberg/pull/31199)

_Parameters_

*   _store_ `string`: Store to query e.g: core/editor, core/blocks…
*   _selector_ `string`: Selector to execute e.g: getBlocks.
*   _parameters_ `...Object`: Parameters to pass to the selector.

_Returns_

*   `Promise<?Object>`: Result of querying.

## [Contributing to this package](#contributing-to-this-package)

This is an individual package that’s part of the Gutenberg project. The project is organized as a monorepo. It’s made up of multiple self-contained software packages, each with a specific purpose. The packages in this monorepo are published to [npm](https://www.npmjs.com/) and used by [WordPress](https://make.wordpress.org/core/) as well as other software projects.

To find out more about contributing to this package or Gutenberg as a whole, please read the project’s main [contributor guide](https://github.com/WordPress/gutenberg/tree/HEAD/CONTRIBUTING.md).
