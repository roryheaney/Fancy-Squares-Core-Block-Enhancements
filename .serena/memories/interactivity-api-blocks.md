# Interactivity API Blocks

How FS custom blocks use the WordPress Interactivity API for client-side behavior. Covers store namespaces, server→client data flow, event contracts, transitions, keyboard navigation, and the cross-block modal trigger.

## Store namespace registry

Each interactive block registers a store with a unique camelCase namespace. The `data-wp-interactive` attribute in render.php MUST match the store namespace exactly.

| Block | Store namespace | Store file |
|---|---|---|
| Accordion | `fancySquaresAccordionInteractive` | `src/blocks/accordion-interactive/view.js` |
| Tabs | `fancySquaresTabsInteractive` | `src/blocks/tabs-interactive/view.js` |
| Modal | `fancySquaresModal` | `src/blocks/modal/view.js` |
| Advanced Dropdown | `fancySquaresAdvancedDropdown` | `src/blocks/advanced-dropdown/view.js` |
| Content Showcase | `fancySquaresContentShowcase` | `src/blocks/content-showcase/view.js` |

Accordion, Tabs, and Advanced Dropdown import `{ store, getContext, getElement, withSyncEvent }` from `@wordpress/interactivity`. Modal imports `{ store, getContext, getElement }` (no `withSyncEvent`). Content Showcase imports `{ store, getContext, getElement }` (no `withSyncEvent`, no `actions` — only `state` + `callbacks`).

## Server → client data flow

**render.php** (server-side):
1. Builds `$initial_context` array (e.g. `{ blockId, activeItem: '' }` for accordion).
2. Seeds context: `wp_interactivity_data_wp_context($initial_context)` → emitted as `data-wp-context` JSON attribute.
3. Optional derived state: `wp_interactivity_state('namespace', ['key' => computed])`.
4. Emits `data-wp-interactive="namespace"` on the wrapper element.

**view.js** (client-side, loaded via `viewScriptModule` in block.json):
1. `store('namespace', { state: { ... }, actions: { ... }, callbacks: { ... } })` — registers handlers. Advanced Dropdown uses `callbacks.initResponsivePanelsLayout()` for responsive panel placement via `matchMedia`.
2. `getContext()` returns the context object seeded by render.php.
3. Derived state (e.g. `state.isActive`) computed from context via getters.

**Critical invariant**: `activeItem` (accordion) and `activeTab` (tabs) are ALWAYS empty on initial render. The `openFirstItem` feature is handled by a render filter (`mem:render-filters-system`) that post-processes the HTML, NOT by render.php itself.

## Context propagation via providesContext

Parent blocks declare `providesContext` in block.json to pass context to child blocks. E.g. accordion parent: `"providesContext": { "fs-blocks/accordion-interactive/activeItem": "activeItem" }`. Child items receive `activeItem` and compare against `context.itemId` to determine visibility.

## Event contracts

Custom events bubble and are `cancelable: true` — `event.preventDefault()` on `show`/`hide` prevents the transition.

| Block | Events | `event.detail` shape |
|---|---|---|
| Accordion | `show/shown/hide/hidden.fs.accordion` | `{ itemId, element, trigger }` (all 4) |
| Tabs | `show/shown/hide/hidden.fs.tabs` | `{ from, to, itemId }` (all 4) |
| Modal | `show/shown.fs.modal` | `{ modalId, trigger }` |
| Modal | `hide/hidden.fs.modal` | `{ modalId }` only |
| Adv. Dropdown | — | Does NOT emit custom events; uses direct context toggling |

Pattern: `show`/`hide` fire BEFORE the CSS transition starts (cancelable). `shown`/`hidden` fire AFTER the transition completes (or the fallback timer fires).

## Transition fallback pattern

Both accordion and tabs use `runTransitionWithFallback(element, onDone)`:
- Listens for `transitionend` on the element.
- Sets a fallback `setTimeout` (450ms accordion / mobile tabs).
- Whichever fires first calls `onDone()` and cleans up.
- Guards against double-completion via a `completed` boolean.

This ensures state cleanup (class removal, context updates) happens even if `transitionend` doesn't fire.

## Keyboard navigation

**Accordion** (`handleKeydown`): `ArrowUp`/`ArrowDown` cycle focus between triggers (wrapping); `Home`/`End` jump to first/last trigger.

**Tabs** (`handleKeydown`): `ArrowLeft`/`ArrowRight` (horizontal) or `ArrowUp`/`ArrowDown` (vertical) cycle tabs (wrapping); `Home`/`End` first/last; tab focus also triggers `click()`. Orientation read from `aria-orientation` on the tablist.

**Advanced Dropdown** (`handleToggleKeyDown` / `handleItemKeyDown`): `ArrowDown`/`ArrowRight` next toggle (roving tabindex), `ArrowUp`/`ArrowLeft` previous (wrapping), `Home`/`End` first/last; `Escape` closes current item and refocuses its toggle button.

## Advanced Dropdown unique features

The advanced-dropdown store has interaction patterns absent from accordion/tabs:
- **Hover open/close**: `openItemOnHover` / `closeItemOnHover` actions (desktop).
- **Focus open/close**: `openItemOnFocus` / `handleItemFocusOut` actions (focus-based activation, closes on blur outside).
- **Responsive panel placement**: `initResponsivePanelsLayout` callback uses `matchMedia('(max-width: 781px)')` to physically move panels between a desktop container (`fs-advanced-dropdown__desktop-panels`) and inline within items. Re-runs on viewport change.
- **Mobile list-only mode**: When `context.leftMobileBehavior === 'list-only'` and mobile viewport, active item resolves to empty (list-only display).

## Content Showcase cross-block event integration

The content-showcase block (`fancySquaresContentShowcase`) is architecturally unique — it has NO actions, only `state` + `callbacks`. It receives accordion media data from the PHP render context stack (see `mem:render-filters-system` content-showcase section) and listens for external block events:

- **`callbacks.initShowcase()`** (triggered via `data-wp-init--showcase` directive on the wrapper): Adds a DOM event listener for accordion events (default `shown.fs.accordion`, configurable via `context.sourceEventName`).
- When an accordion item is shown, it checks `context.itemsData[itemId].hasMedia` — if true, sets `context.activeItemId` to sync the media gallery.
- **Derived state**: `state.isActiveMedia` compares `context.activeItemId === context.itemId`; `state.hasActiveMedia` checks if the active item has media in `itemsData`.
- This is the ONLY block that bridges two separate Interactivity API stores via DOM events (accordion → content-showcase).

## Modal-specific features

The modal store (`fancySquaresModal`) has capabilities beyond open/close toggling:
- **Global state**: `state.currentModalId` (null or string) and `state.modalStack` (array of `{ modalId, trigger }`).
- **Nested modal stacking**: Opening a modal while another is open pushes the previous onto `modalStack`. Closing restores the previous modal (show + refocus). Closing the last modal clears `currentModalId` and removes `fs-modal-open` body class.
- **Focus management**: `focusFirstInModal()` moves focus to first `FOCUSABLE_SELECTOR` match on open. `restoreFocus()` returns focus to the opening trigger on close. Focus trap on Tab key wraps between first/last focusable elements.
- **Transition**: Uses `setTimeout` + `MODAL_TRANSITION_MS` (150ms), NOT `runTransitionWithFallback`. `showModalElement()` uses double-RAF for CSS paint timing.
- **Static backdrop**: If `context.staticBackdrop` is true, backdrop click shows a shake animation (`fs-modal-static` class, 300ms) instead of closing.
- **Escape key**: Closes modal if `context.closeOnEscape` is true (default).
- **Body class**: Toggles `fs-modal-open` on `document.body` to prevent background scroll.

## Cross-block modal trigger

A `core/button` can trigger a `fs-blocks/modal` via the Interactivity API. The connection is made at render time (NOT in the editor): user enables `triggerModal` + sets `modalId` on a core/button, then PHP render filter (`inc/render-filters/modal-button.php` — see `mem:render-filters-system`) transforms it — sets `data-wp-interactive="fancySquaresModal"`, `data-wp-context`, `data-wp-on--click="actions.openModal"`, aria attrs, removes `href`/`target`/`rel`, converts `<a>` to `<button>`. Modal render.php emits `data-wp-class--show="state.currentModalId === context.modalId"`.

## Block.json conventions for interactive blocks
`apiVersion: 3`, `supports.interactivity: true` (required), `viewScriptModule: "file:./view.js"` (ES module), `render: "file:./render.php"`, optional `providesContext` for parent→child context propagation.

## Cross-references
- `mem:render-filters-system` — modal-button filter, accordion openFirstItem filter.
- `mem:asset-enqueue-system` — when view.js modules are conditionally enqueued (carousel triggers frontend runtime + Swiper).
