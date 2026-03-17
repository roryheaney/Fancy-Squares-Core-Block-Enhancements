---
title: "Theme.json Version 1 Reference"
slug: "theme-json-v1"
source: "https://developer.wordpress.org/block-editor/reference-guides/theme-json-reference/theme-json-v1/"
generatedAt: 2025-12-30T18:19:01.706Z
---

> This is the specification for **version 1** of `theme.json`. This version works with WordPress 5.8 or later.

Theme.json version 2 has been released with WordPress 5.9. WordPress will continue to support theme.json version 1. However new features will only be added to \[new versions\](https://developer.wordpress.org/block-editor/reference-guides/theme-json-reference/theme-json-living/).

When you are ready to upgrade, see the \[theme.json migration guide\](https://developer.wordpress.org/block-editor/reference-guides/theme-json-reference/theme-json-migrations/#migrating-from-v1-to-v2) for details on updating to the latest version.

This reference guide lists the settings and style properties defined in the `theme.json` schema. See the [theme.json how to guide](https://developer.wordpress.org/block-editor/how-to-guides/themes/global-settings-and-styles/) for examples and guidance on how to use the `theme.json` file in your theme.

## [JSON Schema](#json-schema)

The last schema for version 1 is available at \`https://schemas.wp.org/wp/5.8/theme.json\`.

Theme.json schemas for each WordPress version are available at ``https://schemas.wp.org/wp/{{version}}/theme.json`. For example a schema for WordPress 5.8 is available at``https://schemas.wp.org/wp/5.8/theme.json\`.

See [Developing with theme.json](https://developer.wordpress.org/block-editor/how-to-guides/themes/global-settings-and-styles/#developing-with-themejson) for how to use the JSON schema in your editor.

## [Settings](#settings)

### [border](#border)

Settings related to borders.

Property

Type

Default

Props

customRadius

boolean

false

* * *

### [color](#color)

Settings related to colors.

Property

Type

Default

Props

custom

boolean

true

customDuotone

boolean

true

customGradient

boolean

true

duotone

array

colors, name, slug

gradients

array

gradient, name, slug

link

boolean

false

palette

array

color, name, slug

* * *

### [layout](#layout)

Settings related to layout.

Property

Type

Default

Props

contentSize

string

wideSize

string

* * *

### [spacing](#spacing)

Settings related to spacing.

Property

Type

Default

Props

customMargin

boolean

false

customPadding

boolean

false

units

array

px,em,rem,vh,vw,%

* * *

### [typography](#typography)

Settings related to typography.

Property

Type

Default

Props

customFontSize

boolean

true

customLineHeight

boolean

false

dropCap

boolean

true

fontSizes

array

name, size, slug

* * *

### [custom](#custom)

Generate custom CSS custom properties of the form `--wp--custom--{key}--{nested-key}: {value};`. `camelCased` keys are transformed to `kebab-case` as to follow the CSS property naming schema. Keys at different depth levels are separated by `--`, so keys should not include `--` in the name.

* * *

## [Styles](#styles)

### [border](#border-2)

Border styles.

Property

Type

Props

radius

string

* * *

### [color](#color-2)

Color styles.

Property

Type

Props

background

string

gradient

string

text

string

* * *

### [spacing](#spacing-2)

Spacing styles.

Property

Type

Props

margin

object

bottom, left, right, top

padding

object

bottom, left, right, top

* * *

### [typography](#typography-2)

Typography styles.

Property

Type

Props

fontSize

string

lineHeight

string
