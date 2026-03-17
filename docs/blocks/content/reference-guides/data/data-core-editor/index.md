---
title: "The Post Editor’s Data"
slug: "data-core-editor"
source: "https://developer.wordpress.org/block-editor/reference-guides/data/data-core-editor/"
generatedAt: 2025-12-30T18:17:24.227Z
---

Namespace: `core/editor`.

## [Selectors](#selectors)

### [canInsertBlockType](#caninsertblocktype)

_Related_

*   canInsertBlockType in core/block-editor store.

### [canUserUseUnfilteredHTML](#canuseruseunfilteredhtml)

Returns whether or not the user has the unfiltered\_html capability.

_Parameters_

*   _state_ `Object`: Editor state.

_Returns_

*   `boolean`: Whether the user can or can’t post unfiltered HTML.

### [didPostSaveRequestFail](#didpostsaverequestfail)

Returns true if a previous post save was attempted but failed, or false otherwise.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: Whether the post save failed.

### [didPostSaveRequestSucceed](#didpostsaverequestsucceed)

Returns true if a previous post save was attempted successfully, or false otherwise.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: Whether the post was saved successfully.

### [getActivePostLock](#getactivepostlock)

Returns the active post lock.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `Object`: The lock object.

### [getAdjacentBlockClientId](#getadjacentblockclientid)

_Related_

*   getAdjacentBlockClientId in core/block-editor store.

### [getAutosaveAttribute](#getautosaveattribute)

> **Deprecated** since 5.6. Callers should use the `getAutosave( postType, postId, userId )` selector from the ‘@wordpress/core-data’ package and access properties on the returned autosave object using getPostRawValue.

Returns an attribute value of the current autosave revision for a post, or null if there is no autosave for the post.

_Parameters_

*   _state_ `Object`: Global application state.
*   _attributeName_ `string`: Autosave attribute name.

_Returns_

*   `*`: Autosave attribute value.

### [getBlock](#getblock)

_Related_

*   getBlock in core/block-editor store.

### [getBlockAttributes](#getblockattributes)

_Related_

*   getBlockAttributes in core/block-editor store.

### [getBlockCount](#getblockcount)

_Related_

*   getBlockCount in core/block-editor store.

### [getBlockHierarchyRootClientId](#getblockhierarchyrootclientid)

_Related_

*   getBlockHierarchyRootClientId in core/block-editor store.

### [getBlockIndex](#getblockindex)

_Related_

*   getBlockIndex in core/block-editor store.

### [getBlockInsertionPoint](#getblockinsertionpoint)

_Related_

*   getBlockInsertionPoint in core/block-editor store.

### [getBlockListSettings](#getblocklistsettings)

_Related_

*   getBlockListSettings in core/block-editor store.

### [getBlockMode](#getblockmode)

_Related_

*   getBlockMode in core/block-editor store.

### [getBlockName](#getblockname)

_Related_

*   getBlockName in core/block-editor store.

### [getBlockOrder](#getblockorder)

_Related_

*   getBlockOrder in core/block-editor store.

### [getBlockRootClientId](#getblockrootclientid)

_Related_

*   getBlockRootClientId in core/block-editor store.

### [getBlocks](#getblocks)

_Related_

*   getBlocks in core/block-editor store.

### [getBlocksByClientId](#getblocksbyclientid)

_Related_

*   getBlocksByClientId in core/block-editor store.

### [getBlockSelectionEnd](#getblockselectionend)

_Related_

*   getBlockSelectionEnd in core/block-editor store.

### [getBlockSelectionStart](#getblockselectionstart)

_Related_

*   getBlockSelectionStart in core/block-editor store.

### [getClientIdsOfDescendants](#getclientidsofdescendants)

_Related_

*   getClientIdsOfDescendants in core/block-editor store.

### [getClientIdsWithDescendants](#getclientidswithdescendants)

_Related_

*   getClientIdsWithDescendants in core/block-editor store.

### [getCurrentPost](#getcurrentpost)

Returns the post currently being edited in its last known saved state, not including unsaved edits. Returns an object containing relevant default post values if the post has not yet been saved.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `Object`: Post object.

### [getCurrentPostAttribute](#getcurrentpostattribute)

Returns an attribute value of the saved post.

_Parameters_

*   _state_ `Object`: Global application state.
*   _attributeName_ `string`: Post attribute name.

_Returns_

*   `*`: Post attribute value.

### [getCurrentPostId](#getcurrentpostid)

Returns the ID of the post currently being edited, or null if the post has not yet been saved.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `?(number|string)`: The current post ID (number) or template slug (string).

### [getCurrentPostLastRevisionId](#getcurrentpostlastrevisionid)

Returns the last revision ID of the post currently being edited, or null if the post has no revisions.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `?number`: ID of the last revision.

### [getCurrentPostRevisionsCount](#getcurrentpostrevisionscount)

Returns the number of revisions of the post currently being edited.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `number`: Number of revisions.

### [getCurrentPostType](#getcurrentposttype)

Returns the post type of the post currently being edited.

_Usage_

```js
const currentPostType = wp.data.select( 'core/editor' ).getCurrentPostType();
```

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `string`: Post type.

### [getCurrentTemplateId](#getcurrenttemplateid)

Returns the template ID currently being rendered/edited

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `?string`: Template ID.

### [getDeviceType](#getdevicetype)

Returns the current editing canvas device type.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `string`: Device type.

### [getEditedPostAttribute](#geteditedpostattribute)

Returns a single attribute of the post being edited, preferring the unsaved edit if one exists, but falling back to the attribute for the last known saved state of the post.

_Usage_

```js
// Get specific media size based on the featured media ID
// Note: change sizes?.large for any registered size
const getFeaturedMediaUrl = useSelect( ( select ) => {
    const getFeaturedMediaId =
        select( 'core/editor' ).getEditedPostAttribute( 'featured_media' );
    const media = select( 'core' ).getEntityRecord(
        'postType',
        'attachment',
        getFeaturedMediaId
    );

    return (
        media?.media_details?.sizes?.large?.source_url ||
        media?.source_url ||
        ''
    );
}, [] );
```

_Parameters_

*   _state_ `Object`: Global application state.
*   _attributeName_ `string`: Post attribute name.

_Returns_

*   `*`: Post attribute value.

### [getEditedPostContent](#geteditedpostcontent)

Returns the content of the post being edited.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `string`: Post content.

### [getEditedPostPreviewLink](#geteditedpostpreviewlink)

Returns the post preview link

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `string | undefined`: Preview Link.

### [getEditedPostSlug](#geteditedpostslug)

Returns the slug for the post being edited, preferring a manually edited value if one exists, then a sanitized version of the current post title, and finally the post ID.

_Parameters_

*   _state_ `Object`: Editor state.

_Returns_

*   `string`: The current slug to be displayed in the editor

### [getEditedPostVisibility](#geteditedpostvisibility)

Returns the current visibility of the post being edited, preferring the unsaved value if different than the saved post. The return value is one of “private”, “password”, or “public”.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `string`: Post visibility.

### [getEditorBlocks](#geteditorblocks)

Return the current block list.

_Parameters_

*   _state_ `Object`:

_Returns_

*   `Array`: Block list.

### [getEditorMode](#geteditormode)

Returns the current editing mode.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `string`: Editing mode.

### [getEditorSelection](#geteditorselection)

Returns the current selection.

_Parameters_

*   _state_ `Object`:

_Returns_

*   `WPBlockSelection`: The selection end.

### [getEditorSelectionEnd](#geteditorselectionend)

> **Deprecated** since Gutenberg 10.0.0.

Returns the current selection end.

_Parameters_

*   _state_ `Object`:

_Returns_

*   `WPBlockSelection`: The selection end.

### [getEditorSelectionStart](#geteditorselectionstart)

> **Deprecated** since Gutenberg 10.0.0.

Returns the current selection start.

_Parameters_

*   _state_ `Object`:

_Returns_

*   `WPBlockSelection`: The selection start.

### [getEditorSettings](#geteditorsettings)

Returns the post editor settings.

_Parameters_

*   _state_ `Object`: Editor state.

_Returns_

*   `Object`: The editor settings object.

### [getFirstMultiSelectedBlockClientId](#getfirstmultiselectedblockclientid)

_Related_

*   getFirstMultiSelectedBlockClientId in core/block-editor store.

### [getGlobalBlockCount](#getglobalblockcount)

_Related_

*   getGlobalBlockCount in core/block-editor store.

### [getInserterItems](#getinserteritems)

_Related_

*   getInserterItems in core/block-editor store.

### [getLastMultiSelectedBlockClientId](#getlastmultiselectedblockclientid)

_Related_

*   getLastMultiSelectedBlockClientId in core/block-editor store.

### [getMultiSelectedBlockClientIds](#getmultiselectedblockclientids)

_Related_

*   getMultiSelectedBlockClientIds in core/block-editor store.

### [getMultiSelectedBlocks](#getmultiselectedblocks)

_Related_

*   getMultiSelectedBlocks in core/block-editor store.

### [getMultiSelectedBlocksEndClientId](#getmultiselectedblocksendclientid)

_Related_

*   getMultiSelectedBlocksEndClientId in core/block-editor store.

### [getMultiSelectedBlocksStartClientId](#getmultiselectedblocksstartclientid)

_Related_

*   getMultiSelectedBlocksStartClientId in core/block-editor store.

### [getNextBlockClientId](#getnextblockclientid)

_Related_

*   getNextBlockClientId in core/block-editor store.

### [getPermalink](#getpermalink)

Returns the permalink for the post.

_Parameters_

*   _state_ `Object`: Editor state.

_Returns_

*   `?string`: The permalink, or null if the post is not viewable.

### [getPermalinkParts](#getpermalinkparts)

Returns the permalink for a post, split into its three parts: the prefix, the postName, and the suffix.

_Parameters_

*   _state_ `Object`: Editor state.

_Returns_

*   `Object`: An object containing the prefix, postName, and suffix for the permalink, or null if the post is not viewable.

### [getPostEdits](#getpostedits)

Returns any post values which have been changed in the editor but not yet been saved.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `Object`: Object of key value pairs comprising unsaved edits.

### [getPostLockUser](#getpostlockuser)

Returns details about the post lock user.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `Object`: A user object.

### [getPostTypeLabel](#getposttypelabel)

Returns a post type label depending on the current post.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `string|undefined`: The post type label if available, otherwise undefined.

### [getPreviousBlockClientId](#getpreviousblockclientid)

_Related_

*   getPreviousBlockClientId in core/block-editor store.

### [getRenderingMode](#getrenderingmode)

Returns the post editor’s rendering mode.

_Parameters_

*   _state_ `Object`: Editor state.

_Returns_

*   `string`: Rendering mode.

### [getSelectedBlock](#getselectedblock)

_Related_

*   getSelectedBlock in core/block-editor store.

### [getSelectedBlockClientId](#getselectedblockclientid)

_Related_

*   getSelectedBlockClientId in core/block-editor store.

### [getSelectedBlockCount](#getselectedblockcount)

_Related_

*   getSelectedBlockCount in core/block-editor store.

### [getSelectedBlocksInitialCaretPosition](#getselectedblocksinitialcaretposition)

_Related_

*   getSelectedBlocksInitialCaretPosition in core/block-editor store.

### [getStateBeforeOptimisticTransaction](#getstatebeforeoptimistictransaction)

> **Deprecated** since Gutenberg 9.7.0.

Returns state object prior to a specified optimist transaction ID, or `null` if the transaction corresponding to the given ID cannot be found.

### [getSuggestedPostFormat](#getsuggestedpostformat)

Returns a suggested post format for the current post, inferred only if there is a single block within the post and it is of a type known to match a default post format. Returns null if the format cannot be determined.

_Returns_

*   `?string`: Suggested post format.

### [getTemplate](#gettemplate)

_Related_

*   getTemplate in core/block-editor store.

### [getTemplateLock](#gettemplatelock)

_Related_

*   getTemplateLock in core/block-editor store.

### [hasChangedContent](#haschangedcontent)

Returns true if content includes unsaved changes, or false otherwise.

_Parameters_

*   _state_ `Object`: Editor state.

_Returns_

*   `boolean`: Whether content includes unsaved changes.

### [hasEditorRedo](#haseditorredo)

Returns true if any future editor history snapshots exist, or false otherwise.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: Whether redo history exists.

### [hasEditorUndo](#haseditorundo)

Returns true if any past editor history snapshots exist, or false otherwise.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: Whether undo history exists.

### [hasInserterItems](#hasinserteritems)

_Related_

*   hasInserterItems in core/block-editor store.

### [hasMultiSelection](#hasmultiselection)

_Related_

*   hasMultiSelection in core/block-editor store.

### [hasNonPostEntityChanges](#hasnonpostentitychanges)

Returns true if there are unsaved edits for entities other than the editor’s post, and false otherwise.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: Whether there are edits or not.

### [hasSelectedBlock](#hasselectedblock)

_Related_

*   hasSelectedBlock in core/block-editor store.

### [hasSelectedInnerBlock](#hasselectedinnerblock)

_Related_

*   hasSelectedInnerBlock in core/block-editor store.

### [inSomeHistory](#insomehistory)

> **Deprecated** since Gutenberg 9.7.0.

Returns true if an optimistic transaction is pending commit, for which the before state satisfies the given predicate function.

### [isAncestorMultiSelected](#isancestormultiselected)

_Related_

*   isAncestorMultiSelected in core/block-editor store.

### [isAutosavingPost](#isautosavingpost)

Returns true if the post is autosaving, or false otherwise.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: Whether the post is autosaving.

### [isBlockInsertionPointVisible](#isblockinsertionpointvisible)

_Related_

*   isBlockInsertionPointVisible in core/block-editor store.

### [isBlockMultiSelected](#isblockmultiselected)

_Related_

*   isBlockMultiSelected in core/block-editor store.

### [isBlockSelected](#isblockselected)

_Related_

*   isBlockSelected in core/block-editor store.

### [isBlockValid](#isblockvalid)

_Related_

*   isBlockValid in core/block-editor store.

### [isBlockWithinSelection](#isblockwithinselection)

_Related_

*   isBlockWithinSelection in core/block-editor store.

### [isCaretWithinFormattedText](#iscaretwithinformattedtext)

_Related_

*   isCaretWithinFormattedText in core/block-editor store.

### [isCleanNewPost](#iscleannewpost)

Returns true if there are no unsaved values for the current edit session and if the currently edited post is new (has never been saved before).

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: Whether new post and unsaved values exist.

### [isCurrentPostPending](#iscurrentpostpending)

Returns true if post is pending review.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: Whether current post is pending review.

### [isCurrentPostPublished](#iscurrentpostpublished)

Return true if the current post has already been published.

_Parameters_

*   _state_ `Object`: Global application state.
*   _currentPost_ `[Object]`: Explicit current post for bypassing registry selector.

_Returns_

*   `boolean`: Whether the post has been published.

### [isCurrentPostScheduled](#iscurrentpostscheduled)

Returns true if post is already scheduled.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: Whether current post is scheduled to be posted.

### [isDeletingPost](#isdeletingpost)

Returns true if the post is currently being deleted, or false otherwise.

_Parameters_

*   _state_ `Object`: Editor state.

_Returns_

*   `boolean`: Whether post is being deleted.

### [isEditedPostAutosaveable](#iseditedpostautosaveable)

Returns true if the post can be autosaved, or false otherwise.

_Parameters_

*   _state_ `Object`: Global application state.
*   _autosave_ `Object`: A raw autosave object from the REST API.

_Returns_

*   `boolean`: Whether the post can be autosaved.

### [isEditedPostBeingScheduled](#iseditedpostbeingscheduled)

Return true if the post being edited is being scheduled. Preferring the unsaved status values.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: Whether the post has been published.

### [isEditedPostDateFloating](#iseditedpostdatefloating)

Returns whether the current post should be considered to have a “floating” date (i.e. that it would publish “Immediately” rather than at a set time).

Unlike in the PHP backend, the REST API returns a full date string for posts where the 0000-00-00T00:00:00 placeholder is present in the database. To infer that a post is set to publish “Immediately” we check whether the date and modified date are the same.

_Parameters_

*   _state_ `Object`: Editor state.

_Returns_

*   `boolean`: Whether the edited post has a floating date value.

### [isEditedPostDirty](#iseditedpostdirty)

Returns true if there are unsaved values for the current edit session, or false if the editing state matches the saved or new post.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: Whether unsaved values exist.

### [isEditedPostEmpty](#iseditedpostempty)

Returns true if the edited post has content. A post has content if it has at least one saveable block or otherwise has a non-empty content property assigned.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: Whether post has content.

### [isEditedPostNew](#iseditedpostnew)

Returns true if the currently edited post is yet to be saved, or false if the post has been saved.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: Whether the post is new.

### [isEditedPostPublishable](#iseditedpostpublishable)

Return true if the post being edited can be published.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: Whether the post can been published.

### [isEditedPostSaveable](#iseditedpostsaveable)

Returns true if the post can be saved, or false otherwise. A post must contain a title, an excerpt, or non-empty content to be valid for save.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: Whether the post can be saved.

### [isEditorPanelEnabled](#iseditorpanelenabled)

Returns true if the given panel is enabled, or false otherwise. Panels are enabled by default.

_Parameters_

*   _state_ `Object`: Global application state.
*   _panelName_ `string`: A string that identifies the panel.

_Returns_

*   `boolean`: Whether or not the panel is enabled.

### [isEditorPanelOpened](#iseditorpanelopened)

Returns true if the given panel is open, or false otherwise. Panels are closed by default.

_Parameters_

*   _state_ `Object`: Global application state.
*   _panelName_ `string`: A string that identifies the panel.

_Returns_

*   `boolean`: Whether or not the panel is open.

### [isEditorPanelRemoved](#iseditorpanelremoved)

Returns true if the given panel was programmatically removed, or false otherwise. All panels are not removed by default.

_Parameters_

*   _state_ `Object`: Global application state.
*   _panelName_ `string`: A string that identifies the panel.

_Returns_

*   `boolean`: Whether or not the panel is removed.

### [isFirstMultiSelectedBlock](#isfirstmultiselectedblock)

_Related_

*   isFirstMultiSelectedBlock in core/block-editor store.

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

### [isMultiSelecting](#ismultiselecting)

_Related_

*   isMultiSelecting in core/block-editor store.

### [isPermalinkEditable](#ispermalinkeditable)

Returns whether the permalink is editable or not.

_Parameters_

*   _state_ `Object`: Editor state.

_Returns_

*   `boolean`: Whether or not the permalink is editable.

### [isPostAutosavingLocked](#ispostautosavinglocked)

Returns whether post autosaving is locked.

_Usage_

```jsx
import { __ } from '@wordpress/i18n';
import { store as editorStore } from '@wordpress/editor';
import { useSelect } from '@wordpress/data';

const ExampleComponent = () => {
    const isAutoSavingLocked = useSelect(
        ( select ) => select( editorStore ).isPostAutosavingLocked(),
        []
    );

    return isAutoSavingLocked ? (
        <p>{ __( 'Post auto saving is locked' ) }</p>
    ) : (
        <p>{ __( 'Post auto saving is not locked' ) }</p>
    );
};
```

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: Is locked.

### [isPostLocked](#ispostlocked)

Returns whether the post is locked.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: Is locked.

### [isPostLockTakeover](#ispostlocktakeover)

Returns whether the edition of the post has been taken over.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: Is post lock takeover.

### [isPostSavingLocked](#ispostsavinglocked)

Returns whether post saving is locked.

_Usage_

```jsx
import { __ } from '@wordpress/i18n';
import { store as editorStore } from '@wordpress/editor';
import { useSelect } from '@wordpress/data';

const ExampleComponent = () => {
    const isSavingLocked = useSelect(
        ( select ) => select( editorStore ).isPostSavingLocked(),
        []
    );

    return isSavingLocked ? (
        <p>{ __( 'Post saving is locked' ) }</p>
    ) : (
        <p>{ __( 'Post saving is not locked' ) }</p>
    );
};
```

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: Is locked.

### [isPreviewingPost](#ispreviewingpost)

Returns true if the post is being previewed, or false otherwise.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: Whether the post is being previewed.

### [isPublishingPost](#ispublishingpost)

Returns true if the post is being published, or false otherwise.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: Whether post is being published.

### [isPublishSidebarEnabled](#ispublishsidebarenabled)

Returns whether the pre-publish panel should be shown or skipped when the user clicks the “publish” button.

_Returns_

*   `boolean`: Whether the pre-publish panel should be shown or not.

### [isPublishSidebarOpened](#ispublishsidebaropened)

Returns true if the publish sidebar is opened.

_Parameters_

*   _state_ `Object`: Global application state

_Returns_

*   `boolean`: Whether the publish sidebar is open.

### [isSavingNonPostEntityChanges](#issavingnonpostentitychanges)

Returns true if non-post entities are currently being saved, or false otherwise.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: Whether non-post entities are being saved.

### [isSavingPost](#issavingpost)

Returns true if the post is currently being saved, or false otherwise.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: Whether post is being saved.

### [isSelectionEnabled](#isselectionenabled)

_Related_

*   isSelectionEnabled in core/block-editor store.

### [isTyping](#istyping)

_Related_

*   isTyping in core/block-editor store.

### [isValidTemplate](#isvalidtemplate)

_Related_

*   isValidTemplate in core/block-editor store.

## [Actions](#actions)

### [autosave](#autosave)

Action that autosaves the current post. This includes server-side autosaving (default) and client-side (a.k.a. local) autosaving (e.g. on the Web, the post might be committed to Session Storage).

_Parameters_

*   _options_ `[Object]`: Extra flags to identify the autosave.
*   _options.local_ `[boolean]`: Whether to perform a local autosave.

### [clearSelectedBlock](#clearselectedblock)

_Related_

*   clearSelectedBlock in core/block-editor store.

### [closePublishSidebar](#closepublishsidebar)

Returns an action object used in signalling that the user closed the publish sidebar.

_Returns_

*   `Object`: Action object.

### [createUndoLevel](#createundolevel)

> **Deprecated** Since WordPress 6.0

Action that creates an undo history record.

### [disablePublishSidebar](#disablepublishsidebar)

Disables the publish sidebar.

### [editPost](#editpost)

Returns an action object used in signalling that attributes of the post have been edited.

_Usage_

```js
// Update the post title
wp.data.dispatch( 'core/editor' ).editPost( { title: `${ newTitle }` } );
```

_Parameters_

*   _edits_ `Object`: Post attributes to edit.
*   _options_ `[Object]`: Options for the edit.

_Returns_

*   `Object`: Action object

### [enablePublishSidebar](#enablepublishsidebar)

Enable the publish sidebar.

### [enterFormattedText](#enterformattedtext)

_Related_

*   enterFormattedText in core/block-editor store.

### [exitFormattedText](#exitformattedtext)

_Related_

*   exitFormattedText in core/block-editor store.

### [hideInsertionPoint](#hideinsertionpoint)

_Related_

*   hideInsertionPoint in core/block-editor store.

### [insertBlock](#insertblock)

_Related_

*   insertBlock in core/block-editor store.

### [insertBlocks](#insertblocks)

_Related_

*   insertBlocks in core/block-editor store.

### [insertDefaultBlock](#insertdefaultblock)

_Related_

*   insertDefaultBlock in core/block-editor store.

### [lockPostAutosaving](#lockpostautosaving)

Action that locks post autosaving.

_Usage_

```
// Lock post autosaving with the lock key `mylock`:
wp.data.dispatch( 'core/editor' ).lockPostAutosaving( 'mylock' );
```

_Parameters_

*   _lockName_ `string`: The lock name.

_Returns_

*   `Object`: Action object

### [lockPostSaving](#lockpostsaving)

Action that locks post saving.

_Usage_

```
const { subscribe } = wp.data;

const initialPostStatus = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'status' );

// Only allow publishing posts that are set to a future date.
if ( 'publish' !== initialPostStatus ) {

    // Track locking.
    let locked = false;

    // Watch for the publish event.
    let unssubscribe = subscribe( () => {
        const currentPostStatus = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'status' );
        if ( 'publish' !== currentPostStatus ) {

            // Compare the post date to the current date, lock the post if the date isn't in the future.
            const postDate = new Date( wp.data.select( 'core/editor' ).getEditedPostAttribute( 'date' ) );
            const currentDate = new Date();
            if ( postDate.getTime() <= currentDate.getTime() ) {
                if ( ! locked ) {
                    locked = true;
                    wp.data.dispatch( 'core/editor' ).lockPostSaving( 'futurelock' );
                }
            } else {
                if ( locked ) {
                    locked = false;
                    wp.data.dispatch( 'core/editor' ).unlockPostSaving( 'futurelock' );
                }
            }
        }
    } );
}
```

_Parameters_

*   _lockName_ `string`: The lock name.

_Returns_

*   `Object`: Action object

### [mergeBlocks](#mergeblocks)

_Related_

*   mergeBlocks in core/block-editor store.

### [moveBlocksDown](#moveblocksdown)

_Related_

*   moveBlocksDown in core/block-editor store.

### [moveBlocksUp](#moveblocksup)

_Related_

*   moveBlocksUp in core/block-editor store.

### [moveBlockToPosition](#moveblocktoposition)

_Related_

*   moveBlockToPosition in core/block-editor store.

### [multiSelect](#multiselect)

_Related_

*   multiSelect in core/block-editor store.

### [openPublishSidebar](#openpublishsidebar)

Returns an action object used in signalling that the user opened the publish sidebar.

_Returns_

*   `Object`: Action object

### [receiveBlocks](#receiveblocks)

_Related_

*   receiveBlocks in core/block-editor store.

### [redo](#redo)

Action that restores last popped state in undo history.

### [refreshPost](#refreshpost)

> **Deprecated** Since WordPress 6.0.

Action for refreshing the current post.

### [removeBlock](#removeblock)

_Related_

*   removeBlock in core/block-editor store.

### [removeBlocks](#removeblocks)

_Related_

*   removeBlocks in core/block-editor store.

### [removeEditorPanel](#removeeditorpanel)

Returns an action object used to remove a panel from the editor.

_Parameters_

*   _panelName_ `string`: A string that identifies the panel to remove.

_Returns_

*   `Object`: Action object.

### [replaceBlock](#replaceblock)

_Related_

*   replaceBlock in core/block-editor store.

### [replaceBlocks](#replaceblocks)

_Related_

*   replaceBlocks in core/block-editor store.

### [resetBlocks](#resetblocks)

_Related_

*   resetBlocks in core/block-editor store.

### [resetEditorBlocks](#reseteditorblocks)

Returns an action object used to signal that the blocks have been updated.

_Parameters_

*   _blocks_ `Array`: Block Array.
*   _options_ `[Object]`: Optional options.

### [resetPost](#resetpost)

> **Deprecated** Since WordPress 6.0.

Returns an action object used in signalling that the latest version of the post has been received, either by initialization or save.

### [savePost](#savepost)

Action for saving the current post in the editor.

_Parameters_

*   _options_ `[Object]`:

### [selectBlock](#selectblock)

_Related_

*   selectBlock in core/block-editor store.

### [setDeviceType](#setdevicetype)

Action that changes the width of the editing canvas.

_Parameters_

*   _deviceType_ `string`:

_Returns_

*   `Object`: Action object.

### [setEditedPost](#seteditedpost)

Returns an action that sets the current post Type and post ID.

_Parameters_

*   _postType_ `string`: Post Type.
*   _postId_ `string`: Post ID.

_Returns_

*   `Object`: Action object.

### [setIsInserterOpened](#setisinserteropened)

Returns an action object used to open/close the inserter.

_Parameters_

*   _value_ `boolean|Object`: Whether the inserter should be opened (true) or closed (false). To specify an insertion point, use an object.
*   _value.rootClientId_ `string`: The root client ID to insert at.
*   _value.insertionIndex_ `number`: The index to insert at.
*   _value.filterValue_ `string`: A query to filter the inserter results.
*   _value.onSelect_ `Function`: A callback when an item is selected.
*   _value.tab_ `string`: The tab to open in the inserter.
*   _value.category_ `string`: The category to initialize in the inserter.

_Returns_

*   `Object`: Action object.

### [setIsListViewOpened](#setislistviewopened)

Returns an action object used to open/close the list view.

_Parameters_

*   _isOpen_ `boolean`: A boolean representing whether the list view should be opened or closed.

_Returns_

*   `Object`: Action object.

### [setRenderingMode](#setrenderingmode)

Returns an action used to set the rendering mode of the post editor. We support multiple rendering modes:

*   `post-only`: This mode extracts the post blocks from the template and renders only those. The idea is to allow the user to edit the post/page in isolation without the wrapping template.
*   `template-locked`: This mode renders both the template and the post blocks but the template blocks are locked and can’t be edited. The post blocks are editable.

_Parameters_

*   _mode_ `string`: Mode (one of ‘post-only’ or ‘template-locked’).

### [setTemplateValidity](#settemplatevalidity)

_Related_

*   setTemplateValidity in core/block-editor store.

### [setupEditor](#setupeditor)

Returns an action generator used in signalling that editor has initialized with the specified post object and editor settings.

_Parameters_

*   _post_ `Object`: Post object.
*   _edits_ `Object`: Initial edited attributes object.
*   _template_ `[Array]`: Block Template.

### [setupEditorState](#setupeditorstate)

> **Deprecated**

Setup the editor state.

_Parameters_

*   _post_ `Object`: Post object.

### [showInsertionPoint](#showinsertionpoint)

_Related_

*   showInsertionPoint in core/block-editor store.

### [startMultiSelect](#startmultiselect)

_Related_

*   startMultiSelect in core/block-editor store.

### [startTyping](#starttyping)

_Related_

*   startTyping in core/block-editor store.

### [stopMultiSelect](#stopmultiselect)

_Related_

*   stopMultiSelect in core/block-editor store.

### [stopTyping](#stoptyping)

_Related_

*   stopTyping in core/block-editor store.

### [switchEditorMode](#switcheditormode)

Triggers an action used to switch editor mode.

_Parameters_

*   _mode_ `string`: The editor mode.

### [synchronizeTemplate](#synchronizetemplate)

_Related_

*   synchronizeTemplate in core/block-editor store.

### [toggleBlockMode](#toggleblockmode)

_Related_

*   toggleBlockMode in core/block-editor store.

### [toggleDistractionFree](#toggledistractionfree)

Action that toggles Distraction free mode. Distraction free mode expects there are no sidebars, as due to the z-index values set, you can’t close sidebars.

_Parameters_

*   _options_ `[Object]`: Optional configuration object
*   _options.createNotice_ `[boolean]`: Whether to create a notice

### [toggleEditorPanelEnabled](#toggleeditorpanelenabled)

Returns an action object used to enable or disable a panel in the editor.

_Parameters_

*   _panelName_ `string`: A string that identifies the panel to enable or disable.

_Returns_

*   `Object`: Action object.

### [toggleEditorPanelOpened](#toggleeditorpanelopened)

Opens a closed panel and closes an open panel.

_Parameters_

*   _panelName_ `string`: A string that identifies the panel to open or close.

### [togglePublishSidebar](#togglepublishsidebar)

Returns an action object used in signalling that the user toggles the publish sidebar.

_Returns_

*   `Object`: Action object

### [toggleSelection](#toggleselection)

_Related_

*   toggleSelection in core/block-editor store.

### [toggleSpotlightMode](#togglespotlightmode)

Action that toggles the Spotlight Mode view option.

### [toggleTopToolbar](#toggletoptoolbar)

Action that toggles the Top Toolbar view option.

### [trashPost](#trashpost)

Action for trashing the current post in the editor.

### [undo](#undo)

Action that pops a record from undo history and undoes the edit.

### [unlockPostAutosaving](#unlockpostautosaving)

Action that unlocks post autosaving.

_Usage_

```
// Unlock post saving with the lock key `mylock`:
wp.data.dispatch( 'core/editor' ).unlockPostAutosaving( 'mylock' );
```

_Parameters_

*   _lockName_ `string`: The lock name.

_Returns_

*   `Object`: Action object

### [unlockPostSaving](#unlockpostsaving)

Action that unlocks post saving.

_Usage_

```
// Unlock post saving with the lock key `mylock`:
wp.data.dispatch( 'core/editor' ).unlockPostSaving( 'mylock' );
```

_Parameters_

*   _lockName_ `string`: The lock name.

_Returns_

*   `Object`: Action object

### [updateBlock](#updateblock)

_Related_

*   updateBlock in core/block-editor store.

### [updateBlockAttributes](#updateblockattributes)

_Related_

*   updateBlockAttributes in core/block-editor store.

### [updateBlockListSettings](#updateblocklistsettings)

_Related_

*   updateBlockListSettings in core/block-editor store.

### [updateEditorSettings](#updateeditorsettings)

Undocumented declaration.

### [updatePost](#updatepost)

> **Deprecated** since Gutenberg 9.7.0.

Returns an action object used in signalling that a patch of updates for the latest version of the post have been received.

_Returns_

*   `Object`: Action object.

### [updatePostLock](#updatepostlock)

Action that locks the editor.

_Parameters_

*   _lock_ `Object`: Details about the post lock status, user, and nonce.

_Returns_

*   `Object`: Action object.
