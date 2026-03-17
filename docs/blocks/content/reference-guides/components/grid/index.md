---
title: "Grid"
slug: "grid"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/grid/"
generatedAt: 2025-12-30T18:16:31.491Z
---

This feature is still experimental. “Experimental” means this is an early implementation subject to drastic and breaking changes.

`Grid` is a primitive layout component that can arrange content in a grid configuration.

## [Usage](#usage)

```jsx
import {
    __experimentalGrid as Grid,
    __experimentalText as Text,
} from '@wordpress/components';

function Example() {
    return (
        <Grid columns={ 3 }>
            <Text>Code</Text>
            <Text>is</Text>
            <Text>Poetry</Text>
        </Grid>
    );
}
```

## [Props](#props)

### [align: CSS\[‘alignItems’\]](#align-cssalignitems)

Adjusts the block alignment of children.

*   Required: No

### [alignment: GridAlignment](#alignment-gridalignment)

Adjusts the horizontal and vertical alignment of children.

*   Required: No

### [columnGap: CSSProperties\[‘gridColumnGap’\]](#columngap-csspropertiesgridcolumngap)

Adjusts the `grid-column-gap`.

*   Required: No

### [columns: number](#columns-number)

Adjusts the number of columns of the `Grid`.

*   Required: No
*   Default: `2`

### [gap: number](#gap-number)

Gap between each child.

*   Required: No
*   Default: `3`

### [isInline: boolean](#isinline-boolean)

Changes the CSS display from `grid` to `inline-grid`.

*   Required: No

### [justify: CSS\[‘justifyContent’\]](#justify-cssjustifycontent)

Adjusts the inline alignment of children.

*   Required: No

### [rowGap: CSSProperties\[‘gridRowGap’\]](#rowgap-csspropertiesgridrowgap)

Adjusts the `grid-row-gap`.

*   Required: No

### [rows: number](#rows-number)

Adjusts the number of rows of the `Grid`.

*   Required: No

### [templateColumns: CSS\[‘gridTemplateColumns’\]](#templatecolumns-cssgridtemplatecolumns)

Adjusts the CSS grid `template-columns`.

*   Required: No

### [templateRows: CSS\[‘gridTemplateRows’\]](#templaterows-cssgridtemplaterows)

Adjusts the CSS grid `template-rows`.

*   Required: No
