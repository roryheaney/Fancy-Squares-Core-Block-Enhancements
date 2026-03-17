---
title: "@wordpress/edit-post"
slug: "packages-edit-post-2"
source: "https://developer.wordpress.org/block-editor/reference-guides/packages/packages-edit-post/"
generatedAt: 2025-12-30T18:18:05.734Z
---

Edit Post Module for WordPress.

> This package is meant to be used only with WordPress core. Feel free to use it in your own project but please keep in mind that it might never get fully documented.

## [Installation](#installation)

Install the module

```bash
npm install @wordpress/edit-post
```

_This package assumes that your code will run in an **ES2015+** environment. If you’re using an environment that has limited or no support for such language features and APIs, you should include [the polyfill shipped in `@wordpress/babel-preset-default`](https://github.com/WordPress/gutenberg/tree/HEAD/packages/babel-preset-default#polyfill) in your code._

## [Extending the post editor UI](#extending-the-post-editor-ui)

Extending the editor UI can be accomplished with the `registerPlugin` API, allowing you to define all your plugin’s UI elements in one place.

Refer to [the plugins module documentation](https://github.com/WordPress/gutenberg/tree/HEAD/packages/plugins/README.md) for more information.

The components exported through the API can be used with the `registerPlugin` ([see documentation](https://github.com/WordPress/gutenberg/tree/HEAD/packages/plugins/README.md)) API.  
They can be found in the global variable `wp.editPost` when defining `wp-edit-post` as a script dependency.

## [API](#api)

### [initializeEditor](#initializeeditor)

Initializes and returns an instance of Editor.

_Parameters_

*   _id_ `string`: Unique identifier for editor instance.
*   _postType_ `string`: Post type of the post to edit.
*   _postId_ `Object`: ID of the post to edit.
*   _settings_ `?Object`: Editor settings object.
*   _initialEdits_ `Object`: Programmatic edits to apply initially, to be considered as non-user-initiated (bypass for unsaved changes prompt).

### [PluginBlockSettingsMenuItem](#pluginblocksettingsmenuitem)

_Related_

*   PluginBlockSettingsMenuItem in @wordpress/editor package.

### [PluginDocumentSettingPanel](#plugindocumentsettingpanel)

_Related_

*   PluginDocumentSettingPanel in @wordpress/editor package.

### [PluginMoreMenuItem](#pluginmoremenuitem)

_Related_

*   PluginMoreMenuItem in @wordpress/editor package.

### [PluginPostPublishPanel](#pluginpostpublishpanel)

_Related_

*   PluginPostPublishPanel in @wordpress/editor package.

### [PluginPostStatusInfo](#pluginpoststatusinfo)

_Related_

*   PluginPostStatusInfo in @wordpress/editor package.

### [PluginPrePublishPanel](#pluginprepublishpanel)

_Related_

*   PluginPrePublishPanel in @wordpress/editor package.

### [PluginSidebar](#pluginsidebar)

_Related_

*   PluginSidebar in @wordpress/editor package.

### [PluginSidebarMoreMenuItem](#pluginsidebarmoremenuitem)

_Related_

*   PluginSidebarMoreMenuItem in @wordpress/editor package.

### [reinitializeEditor](#reinitializeeditor)

Used to reinitialize the editor after an error. Now it’s a deprecated noop function.

### [store](#store)

Store definition for the edit post namespace.

_Related_

*   [https://github.com/WordPress/gutenberg/blob/HEAD/packages/data/README.md#createReduxStore](https://github.com/WordPress/gutenberg/blob/HEAD/packages/data/README.md#createReduxStore)

_Type_

*   `Object`

## [Contributing to this package](#contributing-to-this-package)

This is an individual package that’s part of the Gutenberg project. The project is organized as a monorepo. It’s made up of multiple self-contained software packages, each with a specific purpose. The packages in this monorepo are published to [npm](https://www.npmjs.com/) and used by [WordPress](https://make.wordpress.org/core/) as well as other software projects.

To find out more about contributing to this package or Gutenberg as a whole, please read the project’s main [contributor guide](https://github.com/WordPress/gutenberg/tree/HEAD/CONTRIBUTING.md).
