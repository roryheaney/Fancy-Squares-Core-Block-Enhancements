---
title: "@wordpress/global-styles-engine"
slug: "packages-global-styles-engine"
source: "https://developer.wordpress.org/block-editor/reference-guides/packages/packages-global-styles-engine/"
generatedAt: 2025-12-30T18:18:12.724Z
---

A generic library for reading and writing global styles data structures (theme.json format).

## [Overview](#overview)

This is a framework-agnostic utility library that provides functions for manipulating global styles objects. It handles the complex nested structure of theme.json format, including block-specific styles and settings.

## [API](#api)

### [Reading Data](#reading-data)

#### [getStyle(globalStyles, path, blockName?, shouldDecodeEncode?)](#getstyleglobalstyles-path-blockname-shoulddecodeencode)

Get a style value from the global styles object.

```typescript
// Get global text color
const textColor = getStyle( globalStyles, 'color.text' );

// Get button background color
const buttonBg = getStyle( globalStyles, 'color.background', 'core/button' );

// Get raw value without CSS variable resolution
const rawValue = getStyle( globalStyles, 'color.text', undefined, false );
```

#### [getSetting(globalStyles, path, blockName?)](#getsettingglobalstyles-path-blockname)

Get a setting value with fallback hierarchy (block-specific → global).

```typescript
// Get global color palette
const colors = getSetting( globalStyles, 'color.palette' );

// Get paragraph-specific font sizes
const fontSizes = getSetting(
    globalStyles,
    'typography.fontSizes',
    'core/paragraph'
);
```

### [Writing Data](#writing-data)

#### [setStyle(globalStyles, path, newValue, blockName?)](#setstyleglobalstyles-path-newvalue-blockname)

Immutably set a style value. Returns a new global styles object.

```typescript
// Set global text color
const updated = setStyle( globalStyles, 'color.text', '#333333' );

// Set button background color
const updated = setStyle(
    globalStyles,
    'color.background',
    '#0073aa',
    'core/button'
);
```

#### [setSetting(globalStyles, path, newValue, blockName?)](#setsettingglobalstyles-path-newvalue-blockname)

Immutably set a setting value. Returns a new global styles object.

```typescript
// Set global color palette
const updated = setSetting( globalStyles, 'color.palette', newPalette );

// Set block-specific settings
const updated = setSetting(
    globalStyles,
    'typography.fontSizes',
    sizes,
    'core/heading'
);
```

### [Utility Functions](#utility-functions)

#### [getPalettes(globalStyles)](#getpalettesglobalstyles)

Extract color palettes organized by origin (theme, custom, default).

#### [generateGlobalStyles(globalStyles)](#generateglobalstylesglobalstyles)

Generate CSS from global styles object.

#### [mergeGlobalStyles(base, user)](#mergeglobalstylesbase-user)

Merge multiple global styles objects with proper precedence.

## [Data Structure](#data-structure)

The global styles object follows the theme.json schema:

```typescript
{
  styles: {
    color: { text: '#000', background: '#fff' },
    typography: { fontSize: '16px' },
    elements: {
      button: { color: { background: 'blue' } }
    },
    blocks: {
      'core/paragraph': { color: { text: '#333' } }
    }
  },
  settings: {
    color: { palette: [...] },
    typography: { fontSizes: [...] },
    blocks: {
      'core/paragraph': { color: { text: true } }
    }
  }
}
```

## [Features](#features)

*   **Immutable Updates**: All setter functions return new objects
*   **Type Safety**: Full TypeScript support
*   **CSS Variable Resolution**: Automatic resolution of CSS custom properties
*   **Block-Specific Styles**: Support for block and element-specific styling
*   **Fallback Hierarchy**: Smart fallback from block → global → default settings
*   **Framework Agnostic**: No dependencies on React, WordPress, or other frameworks

## [Usage](#usage)

This library is designed to be used as the foundation for any global styles editing interface. It provides the core data manipulation functions while remaining completely generic and reusable.

It is a prerequisite for use that blocks and their styles be globally registered, because block styles are fetched from the global blocks store.
