---
title: "The NUX (New User Experience) Data"
slug: "data-core-nux"
source: "https://developer.wordpress.org/block-editor/reference-guides/data/data-core-nux/"
generatedAt: 2025-12-30T18:17:26.631Z
---

Namespace: `core/nux`.

## [Selectors](#selectors)

### [areTipsEnabled](#aretipsenabled)

Returns whether or not tips are globally enabled.

_Parameters_

*   _state_ `Object`: Global application state.

_Returns_

*   `boolean`: Whether tips are globally enabled.

### [getAssociatedGuide](#getassociatedguide)

Returns an object describing the guide, if any, that the given tip is a part of.

_Parameters_

*   _state_ `Object`: Global application state.
*   _tipId_ `string`: The tip to query.

_Returns_

*   `?NUXGuideInfo`: Information about the associated guide.

### [isTipVisible](#istipvisible)

Determines whether or not the given tip is showing. Tips are hidden if they are disabled, have been dismissed, or are not the current tip in any guide that they have been added to.

_Parameters_

*   _state_ `Object`: Global application state.
*   _tipId_ `string`: The tip to query.

_Returns_

*   `boolean`: Whether or not the given tip is showing.

## [Actions](#actions)

### [disableTips](#disabletips)

Returns an action object that, when dispatched, prevents all tips from showing again.

_Returns_

*   `Object`: Action object.

### [dismissTip](#dismisstip)

Returns an action object that, when dispatched, dismisses the given tip. A dismissed tip will not show again.

_Parameters_

*   _id_ `string`: The tip to dismiss.

_Returns_

*   `Object`: Action object.

### [enableTips](#enabletips)

Returns an action object that, when dispatched, makes all tips show again.

_Returns_

*   `Object`: Action object.

### [triggerGuide](#triggerguide)

Returns an action object that, when dispatched, presents a guide that takes the user through a series of tips step by step.

_Parameters_

*   _tipIds_ `string[]`: Which tips to show in the guide.

_Returns_

*   `Object`: Action object.
