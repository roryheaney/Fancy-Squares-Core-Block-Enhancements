---
title: "Theme.json Version 2 Reference"
slug: "theme-json-v2"
source: "https://developer.wordpress.org/block-editor/reference-guides/theme-json-reference/theme-json-v2/"
generatedAt: 2025-12-30T18:19:02.458Z
---

> This is the specification for **version 2** of `theme.json`. This version works with WordPress 5.9 or later.

Theme.json version 3 has been released with WordPress 6.6. WordPress will continue to support theme.json version 2. However new features will only be added to \[new versions\](https://developer.wordpress.org/block-editor/reference-guides/theme-json-reference/theme-json-living/).

When you are ready to upgrade, see the \[theme.json migration guide\](https://developer.wordpress.org/block-editor/reference-guides/theme-json-reference/theme-json-migrations/#migrating-from-v2-to-v3) for details on updating to the latest version.

This reference guide lists the settings and style properties defined in the `theme.json` schema. See the [theme.json how to guide](https://developer.wordpress.org/block-editor/how-to-guides/themes/global-settings-and-styles/) for examples and guidance on how to use the `theme.json` file in your theme.

## [JSON Schema](#json-schema)

This documentation was generated from the JSON schema for theme.json.

The last schema for version 2 is available at \`https://schemas.wp.org/wp/6.5/theme.json\`.

Theme.json schemas for each WordPress version are available at ``https://schemas.wp.org/wp/{{version}}/theme.json`. For example a schema for WordPress 5.9 is available at``https://schemas.wp.org/wp/5.9/theme.json\`.

See [Developing with theme.json](https://developer.wordpress.org/block-editor/how-to-guides/themes/global-settings-and-styles/#developing-with-themejson) for how to use the JSON schema in your editor.

## [Settings](#settings)

### [appearanceTools](#appearancetools)

Setting that enables the following UI tools:

*   background: backgroundImage, backgroundSize
*   border: color, radius, style, width
*   color: link
*   dimensions: aspectRatio, minHeight
*   position: sticky
*   spacing: blockGap, margin, padding
*   typography: lineHeight

* * *

### [useRootPaddingAwareAlignments](#userootpaddingawarealignments)

Enables root padding (the values from `styles.spacing.padding`) to be applied to the contents of full-width blocks instead of the root block.

Please note that when using this setting, `styles.spacing.padding` should always be set as an object with `top`, `right`, `bottom`, `left` values declared separately.

* * *

### [border](#border)

Settings related to borders.

Property

Type

Default

Props

color

boolean

false

radius

boolean

false

style

boolean

false

width

boolean

false

* * *

### [shadow](#shadow)

Settings related to shadows.

Property

Type

Default

Props

defaultPresets

boolean

true

presets

array

name, shadow, slug

* * *

### [color](#color)

Settings related to colors.

Property

Type

Default

Props

background

boolean

true

custom

boolean

true

customDuotone

boolean

true

customGradient

boolean

true

defaultDuotone

boolean

true

defaultGradients

boolean

true

defaultPalette

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

text

boolean

true

heading

boolean

true

button

boolean

true

* * *

### [background](#background)

Settings related to background.

Property

Type

Default

Props

backgroundImage

boolean

false

* * *

### [dimensions](#dimensions)

Settings related to dimensions.

Property

Type

Default

Props

aspectRatio

boolean

false

minHeight

boolean

false

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

allowEditing

boolean

true

allowCustomContentAndWideSize

boolean

true

* * *

### [lightbox](#lightbox)

Settings related to the lightbox.

Property

Type

Default

Props

enabled

boolean

allowEditing

boolean

* * *

### [position](#position)

Settings related to position.

Property

Type

Default

Props

sticky

boolean

false

* * *

### [spacing](#spacing)

Settings related to spacing.

Property

Type

Default

Props

blockGap

boolean, null

null

margin

boolean

false

padding

boolean

false

units

array

px,em,rem,vh,vw,%

customSpacingSize

boolean

true

spacingSizes

array

name, size, slug

spacingScale

object

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

fontStyle

boolean

true

fontWeight

boolean

true

fluid

object, boolean

false

_{maxViewportWidth, minFontSize, minViewportWidth}_

letterSpacing

boolean

true

lineHeight

boolean

false

textColumns

boolean

false

textDecoration

boolean

true

writingMode

boolean

false

textTransform

boolean

true

dropCap

boolean

true

fontSizes

array

fluid, name, size, slug

fontFamilies

array

fontFace, fontFamily, name, slug

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

color

string, object

radius

string, object

style

string, object

width

string, object

top

object

color, style, width

right

object

color, style, width

bottom

object

color, style, width

left

object

color, style, width

* * *

### [color](#color-2)

Color styles.

Property

Type

Props

background

string, object

gradient

string, object

text

string, object

* * *

### [dimensions](#dimensions-2)

Dimensions styles

Property

Type

Props

aspectRatio

string, object

minHeight

string, object

* * *

### [spacing](#spacing-2)

Spacing styles.

Property

Type

Props

blockGap

string, object

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

fontFamily

string, object

fontSize

string, object

fontStyle

string, object

fontWeight

string, object

letterSpacing

string, object

lineHeight

string, object

textColumns

string

textDecoration

string, object

writingMode

string, object

textTransform

string, object

* * *

### [filter](#filter)

CSS and SVG filter styles.

Property

Type

Props

duotone

string, object

* * *

### [shadow](#shadow-2)

Box shadow styles.

* * *

### [outline](#outline)

Outline styles.

Property

Type

Props

color

string, object

offset

string, object

style

string, object

width

string, object

* * *

### [css](#css)

Sets custom CSS to apply styling not covered by other theme.json properties.

* * *

## [customTemplates](#customtemplates)

Additional metadata for custom templates defined in the templates folder.

Type: `object`.

Property

Description

Type

name

Filename, without extension, of the template in the templates folder.

string

title

Title of the template, translatable.

string

postTypes

List of post types that can use this custom template.

array

## [templateParts](#templateparts)

Additional metadata for template parts defined in the parts folder.

Type: `object`.

Property

Description

Type

name

Filename, without extension, of the template in the parts folder.

string

title

Title of the template, translatable.

string

area

The area the template part is used for. Block variations for `header` and `footer` values exist and will be used when the area is set to one of those.

string

## [Patterns](#patterns)

An array of pattern slugs to be registered from the Pattern Directory.  
Type: `array`.
