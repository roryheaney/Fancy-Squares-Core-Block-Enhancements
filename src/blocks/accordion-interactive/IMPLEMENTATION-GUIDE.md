# Bootstrap 5 Accordion - WordPress Interactivity API Implementation Guide

## Overview

This guide provides clear instructions for implementing a Bootstrap 5-style accordion using **only** the WordPress Interactivity API. The implementation follows a **declarative, reactive approach** with no direct DOM manipulation.

**Requirements**: WordPress 6.8+ with Interactivity API support (see [Setup Requirements](#setup-requirements-wordpress-68) section below).

## Core Principles

### 1. Declarative Programming

-   Define **what** the UI should look like based on state
-   Let the framework handle **how** the DOM updates
-   Avoid manual DOM writes (`classList.add/remove`, `style` manipulation); minimal DOM reads for focus management are OK

### 2. Reactivity

-   State changes automatically trigger UI updates
-   Use directives to bind DOM elements to state
-   Framework ensures DOM always reflects current state

### 3. State Management

-   **Global State**: Shared data across all accordion instances
-   **Local Context**: Instance-specific data per accordion/item
-   **Derived State**: Computed values based on state/context

---

## State Architecture

### Accordion Context (Parent)

Located at the accordion wrapper level via `data-wp-context`:

```javascript
{
  blockId: string,           // Unique accordion ID
  activeItem: string,        // ID of currently active item (or empty string)
  transitioningItem: null,   // Reserved for future animation tracking
  closingItem: null,         // Reserved for future animation tracking
  transitionHeight: '',      // Reserved for future CSS transitions
  closingHeight: '',         // Reserved for future CSS transitions
  transitionDirection: null  // Reserved for future animation direction
}
```

### Item-Level Derived State

Each accordion item computes its state from parent context:

```javascript
{
  // Derived from parent context
  isActive: boolean,         // Is this item the active one?
  ariaExpanded: boolean,     // true/false (framework stringifies for ARIA)
  ariaHidden: boolean,       // true/false (framework stringifies for ARIA)
  contentHeight: string,     // CSS height value for transitions
  isCollapsing: boolean      // Is item currently transitioning?
}
```

---

## State Transitions

### Opening an Item (Collapsed → Expanded)

**Trigger**: User clicks accordion button

**State Changes**:

1. `context.activeItem` = clicked item's ID
2. Item's `isActive` = true (derived)
3. Item's `ariaExpanded` = true (derived, framework stringifies)
4. Item's `ariaHidden` = false (derived, framework stringifies)

**CSS Class Changes** (via directives):

-   Add `.is-active` to wrapper
-   Add `.fs-accordion__show` to content
-   Add `.fs-accordion__collapsing` during transition (optional)

### Closing an Item (Expanded → Collapsed)

**Trigger**: User clicks currently active accordion button OR opens a different item

**State Changes**:

1. `context.activeItem` = "" (if same item clicked) OR new item ID (if different item clicked)
2. Item's `isActive` = false (derived)
3. Item's `ariaExpanded` = false (derived, framework stringifies)
4. Item's `ariaHidden` = true (derived, framework stringifies)

**CSS Class Changes** (via directives):

-   Remove `.is-active` from wrapper
-   Remove `.fs-accordion__show` from content
-   Add `.fs-accordion__collapsing` during transition (optional)

### Allow Multiple Open (Future Enhancement)

If supporting multiple open items:

-   `context.activeItems` becomes an array: `string[]`
-   Logic checks if item ID exists in array vs. equality check

---

## CSS Styles Required

### Base Structure Classes

```scss
.fs-accordion {
	// Accordion container
}

.fs-accordion__item {
	// Individual accordion item wrapper

	&.is-active {
		// Active item styles
	}
}

.fs-accordion__header {
	// Header containing trigger button
	margin: 0;
}

.fs-accordion__trigger {
	// Button element
	width: 100%;
	text-align: left;
	background: none;
	border: none;
	cursor: pointer;

	&:focus {
		outline: 2px solid blue;
		outline-offset: 2px;
	}
}
```

### Content Panel Styles

```scss
.fs-accordion__content {
	overflow: hidden;

	&:not( .fs-accordion__show ) {
		display: none;
	}

	&.fs-accordion__show {
		display: block;
	}
}

.fs-accordion__body {
	padding: 1rem;
}
```

### Transition Styles (Optional)

```scss
.fs-accordion__collapse {
	transition: height 0.35s ease;
}

.fs-accordion__collapsing {
	height: 0;
	overflow: hidden;
	transition: height 0.35s ease;
}
```

---

## Directives Implementation

### Accordion Wrapper (Parent)

```php
<div
  class="fs-accordion"
  data-wp-interactive="fancySquaresAccordionInteractive"
  <?php echo wp_interactivity_data_wp_context( [
    'blockId'             => $block_id,
    'activeItem'          => $active_item,
    'transitioningItem'   => null,
    'closingItem'         => null,
    'transitionHeight'    => '',
    'closingHeight'       => '',
    'transitionDirection' => null,
  ] ); ?>
>
  <?php echo $content; ?>
</div>
```

### Accordion Item (Child)

```php
<div
  class="fs-accordion__item"
  data-item-id="<?php echo esc_attr( $item_id ); ?>"
  data-wp-class--is-active="state.isActive"
>
  <h3 class="fs-accordion__header">
    <button
      id="<?php echo esc_attr( $trigger_id ); ?>"
      type="button"
      class="fs-accordion__trigger"
      aria-controls="<?php echo esc_attr( $content_id ); ?>"
      aria-expanded="<?php echo $is_active ? 'true' : 'false'; ?>"
      data-wp-bind--aria-expanded="state.ariaExpanded"
      data-wp-on-async--click="actions.toggleItem"
      data-wp-on--keydown="actions.handleKeydown"
      data-item-id="<?php echo esc_attr( $item_id ); ?>"
    >
      <span><?php echo wp_kses_post( $title ); ?></span>
    </button>
  </h3>

  <div
    id="<?php echo esc_attr( $content_id ); ?>"
    class="fs-accordion__content fs-accordion__collapse<?php echo $is_active ? ' fs-accordion__show' : ''; ?>"
    role="region"
    aria-labelledby="<?php echo esc_attr( $trigger_id ); ?>"
    aria-hidden="<?php echo $is_active ? 'false' : 'true'; ?>"
    data-wp-bind--aria-hidden="state.ariaHidden"
    data-wp-class--fs-accordion__show="state.isActive"
    data-wp-class--fs-accordion__collapsing="state.isCollapsing"
    data-wp-style--height="state.contentHeight"
    data-wp-on-async--transitionend="actions.handleTransitionEnd"
    data-item-id="<?php echo esc_attr( $item_id ); ?>"
  >
    <div class="fs-accordion__body">
      <?php echo $content; ?>
    </div>
  </div>
</div>
```

---

## Store Implementation (view.js)

### Store Structure

```javascript
import {
	store,
	getContext,
	getElement,
	withSyncEvent,
} from '@wordpress/interactivity';

store( 'fancySquaresAccordionInteractive', {
	state: {
		// Derived state getters (computed from context)
		get isActive() {
			// Derived: Is this item the active one?
		},

		get ariaExpanded() {
			// Derived: ARIA expanded state (boolean)
		},

		get ariaHidden() {
			// Derived: ARIA hidden state (boolean)
		},

		get contentHeight() {
			// Derived: Height for CSS transitions
		},

		get isCollapsing() {
			// Derived: Is item transitioning?
		},
	},

	actions: {
		toggleItem() {
			// Toggle accordion item open/closed
		},

		handleKeydown: withSyncEvent( ( event ) => {
			// Keyboard navigation (Arrow keys, Home, End)
			// Wrapped with withSyncEvent for event.preventDefault()
		} ),

		handleTransitionEnd( event ) {
			// Clean up after CSS transitions complete
		},
	},

	callbacks: {
		// Reserved for side effects like logging, analytics, etc.
	},
} );
```

### Action: toggleItem

```javascript
actions: {
  toggleItem() {
    const context = getContext();
    const { ref } = getElement();
    const itemId = ref.getAttribute('data-item-id');

    // If clicking active item, close it
    if (context.activeItem === itemId) {
      context.activeItem = '';
    } else {
      // Open this item (closes others automatically)
      context.activeItem = itemId;
    }
  }
}
```

### Action: handleKeydown (Accessibility)

**Note**: Uses `withSyncEvent` wrapper because it needs `event.preventDefault()` for synchronous event handling.

```javascript
import {
	store,
	getContext,
	getElement,
	withSyncEvent,
} from '@wordpress/interactivity';

actions: {
	handleKeydown: withSyncEvent( ( event ) => {
		const { ref } = getElement();
		const key = event.key;

		if ( ! [ 'ArrowUp', 'ArrowDown', 'Home', 'End' ].includes( key ) ) {
			return;
		}

		// Synchronous event access allowed within withSyncEvent
		event.preventDefault();

		const accordion = ref.closest( '.fs-accordion' );
		if ( ! accordion ) return;

		const triggers = Array.from(
			accordion.querySelectorAll( '.fs-accordion__trigger' )
		);

		const currentIndex = triggers.indexOf( ref );
		if ( currentIndex === -1 ) return;

		let targetIndex;

		switch ( key ) {
			case 'ArrowDown':
				targetIndex =
					currentIndex === triggers.length - 1 ? 0 : currentIndex + 1;
				break;
			case 'ArrowUp':
				targetIndex =
					currentIndex === 0 ? triggers.length - 1 : currentIndex - 1;
				break;
			case 'Home':
				targetIndex = 0;
				break;
			case 'End':
				targetIndex = triggers.length - 1;
				break;
		}

		if ( targetIndex !== undefined ) {
			triggers[ targetIndex ]?.focus();
		}
	} );
}
```

### State Getter: isActive

```javascript
state: {
  get isActive() {
    const context = getContext();
    const { ref } = getElement();
    const itemId = ref.getAttribute('data-item-id');

    return context.activeItem === itemId;
  }
}
```

### State Getter: ariaExpanded

```javascript
state: {
  get ariaExpanded() {
    const context = getContext();
    const { ref } = getElement();
    const itemId = ref.getAttribute('data-item-id');

    // Can return boolean - framework will stringify for ARIA
    return context.activeItem === itemId;
  }
}
```

### State Getter: ariaHidden

```javascript
state: {
  get ariaHidden() {
    const context = getContext();
    const { ref } = getElement();
    const itemId = ref.getAttribute('data-item-id');

    // Can return boolean - framework will stringify for ARIA
    return context.activeItem !== itemId;
  }
}
```

---

## Accessibility Requirements

### Keyboard Navigation

-   **Tab**: Focus moves to next accordion button
-   **Shift + Tab**: Focus moves to previous accordion button
-   **Enter/Space**: Toggle accordion item (when button focused)
-   **Arrow Down**: Move focus to next accordion button
-   **Arrow Up**: Move focus to previous accordion button
-   **Home**: Move focus to first accordion button
-   **End**: Move focus to last accordion button

### ARIA Attributes

-   `aria-expanded`: "true" when open, "false" when closed (on button)
-   `aria-hidden`: "false" when open, "true" when closed (on content)
-   `aria-controls`: References content panel ID (on button)
-   `aria-labelledby`: References button ID (on content panel)
-   `role="region"`: On content panel for screen reader navigation

### Focus Management

-   Visible focus indicator on buttons (`:focus` styles)
-   Focus remains on button after toggling
-   Arrow keys don't scroll page (prevent default behavior)

---

## Server-Side Rendering (render.php)

### Initial State Requirements

1. Determine initial `activeItem` from attributes
2. Set server-rendered ARIA attributes to match initial state
3. Add initial CSS classes (`.is-active`, `.fs-accordion__show`) if item is initially open
4. Output proper HTML structure with all directives

### Example PHP Logic

```php
$is_active = $active_item === $item_id;

$wrapper_classes = 'fs-accordion__item';
if ($is_active) {
    $wrapper_classes .= ' is-active';
}

$content_classes = 'fs-accordion__content fs-accordion__collapse';
if ($is_active) {
    $content_classes .= ' fs-accordion__show';
}

$aria_expanded = $is_active ? 'true' : 'false';
$aria_hidden = $is_active ? 'false' : 'true';
```

---

## Setup Requirements (WordPress 6.8+)

### block.json Configuration

Add the `interactivity` support and specify the view script module:

```json
{
	"$schema": "https://schemas.wp.org/trunk/block.json",
	"apiVersion": 3,
	"name": "fancy-squares/accordion-interactive",
	"title": "Accordion Interactive",
	"supports": {
		"interactivity": true
	},
	"viewScriptModule": "file:./view.js"
}
```

### Build Configuration

Ensure your build scripts support experimental modules:

**package.json**:

```json
{
	"scripts": {
		"build": "wp-scripts build --experimental-modules",
		"start": "wp-scripts start --experimental-modules"
	}
}
```

### view.js Module

Your `view.js` file should be an ES module:

```javascript
import {
	store,
	getContext,
	getElement,
	withSyncEvent,
} from '@wordpress/interactivity';

store( 'fancySquaresAccordionInteractive', {
	// ... store implementation
} );
```

---

## Implementation Checklist

### Phase 1: Basic Structure ✓

-   [ ] Create accordion wrapper with `data-wp-interactive` and `data-wp-context`
-   [ ] Create accordion item structure (item, header, button, content, body)
-   [ ] Add all required `data-item-id` attributes
-   [ ] Add all ARIA attributes with server-rendered values

### Phase 2: Directives ✓

-   [ ] Add `data-wp-class--is-active` to item wrapper (binds to `state.isActive`)
-   [ ] Add `data-wp-bind--aria-expanded` to button (binds to `state.ariaExpanded`)
-   [ ] Add `data-wp-bind--aria-hidden` to content panel (binds to `state.ariaHidden`)
-   [ ] Add `data-wp-class--fs-accordion__show` to content panel (binds to `state.isActive`)
-   [ ] Add `data-wp-on-async--click` to button (uses async for better performance)
-   [ ] Add `data-wp-on--keydown` to button (uses sync with `withSyncEvent` wrapper)

### Phase 3: Store (view.js) ✓

-   [ ] Implement `actions.toggleItem` (called via async event handler)
-   [ ] Implement `actions.handleKeydown` with `withSyncEvent` wrapper
-   [ ] Implement `state.isActive` as getter (derived state)
-   [ ] Implement `state.ariaExpanded` as getter (derived state)
-   [ ] Implement `state.ariaHidden` as getter (derived state)

### Phase 4: Styles ✓

-   [ ] Base accordion structure styles
-   [ ] Button styles with focus states
-   [ ] Content panel show/hide styles
-   [ ] Active state styles

### Phase 5: Testing

-   [ ] Click to toggle items
-   [ ] Only one item open at a time
-   [ ] Keyboard navigation (arrows, home, end)
-   [ ] Screen reader announces state correctly
-   [ ] Focus management works properly
-   [ ] No JavaScript errors in console

### Phase 6: Transitions (Optional)

-   [ ] Add `data-wp-class--fs-accordion__collapsing` directive
-   [ ] Add `data-wp-style--height` directive
-   [ ] Add `data-wp-on-async--transitionend` directive
-   [ ] Implement transition height calculations in state getters
-   [ ] Implement `actions.handleTransitionEnd`
-   [ ] Add CSS transition styles

---

## Key Differences from Traditional JavaScript

### ❌ Don't Do This (Imperative)

```javascript
// NO direct DOM manipulation
element.classList.add( 'active' );
element.setAttribute( 'aria-expanded', 'true' );
element.style.display = 'block';
```

### ✅ Do This (Declarative)

```javascript
// YES - Update state, let directives handle DOM
context.activeItem = itemId;
// Directives automatically update classes, attributes, styles

// YES - Use async events for better performance
data-wp-on-async--click="actions.toggleItem"

// YES - Use withSyncEvent wrapper when you need preventDefault
import { withSyncEvent } from '@wordpress/interactivity';

actions: {
  handleKeydown: withSyncEvent((event) => {
    event.preventDefault();
    // ...
  })
}
```

---

## Troubleshooting

### Issue: Changes not reflecting in UI

-   **Check**: Are directives spelled correctly? (`data-wp-class`, not `data-wp-classes`)
-   **Check**: Is `data-wp-interactive` on a parent element?
-   **Check**: Is state/context actually changing in actions?
-   **Check**: Are state getters returning the correct values?

### Issue: Multiple items open at once

-   **Check**: Is `context.activeItem` being set correctly?
-   **Check**: Are all items using the same context (same parent)?
-   **Check**: Is `state.isActive` getter comparing the correct item ID?

### Issue: Keyboard navigation not working

-   **Check**: Is `event.preventDefault()` called in `handleKeydown`?
-   **Check**: Are all buttons getting focus properly?
-   **Check**: Is the selector for triggers correct?

### Issue: ARIA attributes not updating

-   **Check**: Are `data-wp-bind` directives on the correct elements?
-   **Check**: Are state getters returning the correct values (booleans or strings both work - framework stringifies for ARIA)?
-   **Check**: Is the getter accessing context correctly via `getContext()`?

---

## References

-   [WordPress Interactivity API Documentation](https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/)
-   [Reactive and Declarative Mindset](https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/core-concepts/the-reactive-and-declarative-mindset/)
-   [Understanding State, Context, and Derived State](https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/core-concepts/undestanding-global-state-local-context-and-derived-state/)
-   [ARIA Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)
-   [Bootstrap 5 Accordion](https://getbootstrap.com/docs/5.3/components/accordion/)

---

## Notes

-   This implementation prioritizes **accessibility** and **progressive enhancement**
-   Server-rendered HTML should be fully functional (with proper classes/attributes) before JavaScript loads
-   The Interactivity API ensures the client-side state matches the server-rendered state on hydration
-   Transitions are optional and can be added after core functionality works
-   All state is managed declaratively through context - no global variables
-   DOM reads (for focus management, data attributes) are allowed; DOM manipulation is not
