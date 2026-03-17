---
title: "API Versions"
slug: "block-api-versions"
source: "https://developer.wordpress.org/block-editor/reference-guides/block-api/block-api-versions/"
generatedAt: 2025-12-30T18:15:51.760Z
---

This document lists the changes made between the different API versions.

## [Version 3 (>= WordPress 6.3)](#version-3-wordpress-6-3)

*   The post editor will be iframed if all registered blocks have a Block API version 3 or higher. Adding version 3 support means that the block should work inside an iframe, though the block may still be rendered outside the iframe if not all blocks support version 3.
*   **In WordPress 7.0, the post editor is planned to always work as an iframe, regardless of the `apiVersion` of registered blocks**.  
    Please refer to [this migration guide](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-api-versions/block-migration-for-iframe-editor-compatibility/) to test your blocks in the iframe editor beforehand.

## [Version 2 (>= WordPress 5.6)](#version-2-wordpress-5-6)

*   To render the block element wrapper for the block’s `edit` implementation, the block author must use the `useBlockProps()` hook.
*   The generated class names and styles are no longer added automatically to the saved markup for static blocks when `save` is processed. To include them, the block author must explicitly use `useBlockProps.save()` and add to their block wrapper.

## [Version 1](#version-1)

Initial version.
