# FS Content Showcase Block

## Purpose

Wrapper block that syncs an interactive source (default: accordion) with a
showcase gallery. It provides local Interactivity API context so the gallery
and any other children can react to the active item.

## Structure

- Wrapper: `fs-blocks/content-showcase`
- Source (left column): `fs-blocks/accordion-interactive`
- Gallery (right column): `fs-blocks/showcase-gallery`

The gallery is restricted via `ancestor` so it must live inside the wrapper.
WordPress 6.9+ is required for `ancestor` support.

## Data Flow (Runtime)

1. Wrapper computes `itemsData` + `activeItemId` on the server.
2. Wrapper outputs `data-wp-context` with those values.
3. Wrapper listens for the source event and updates `activeItemId`.
4. Gallery uses derived state to show the active media.

## Interactivity API

- Context is local and inherited by descendants.
- Derived state in `view.js` reads `context.activeItemId`.
- Updates happen through `getContext()` inside callbacks.
- The wrapper updates `activeItemId`, so all children stay in sync.

Why local context (not global state):

- The gallery is a descendant of the wrapper, so local context naturally scopes
  state per showcase instance.
- Global state is best for sibling/remote blocks (e.g., filter + results),
  which is not the case here.

## Event Contract (Extensible)

- Source must emit a bubbling CustomEvent with `detail.itemId`.
- Wrapper listens on its root element for `sourceEventName`.
- Each source item must have a stable `itemId`.
- The item block must expose `showcaseMediaId`.

## Example Extension (Tabs)

Goal: use `fs-blocks/tabs-interactive` as the source instead of the accordion.

1. Add showcase media attributes to the tab item block (same as accordion item).
2. When a tab is activated, dispatch a bubbling event with `detail.itemId`.
3. Set the wrapper `sourceEventName` to the tabs event.

Sample event dispatch (tabs item view.js):

```js
const event = new CustomEvent( 'shown.fs.tabs', {
	bubbles: true,
	detail: { itemId: context.itemId },
} );
ref.dispatchEvent( event );
```

Then set `sourceEventName` on the wrapper to `shown.fs.tabs`.

## SSR Context Stack

WordPress renders inner blocks before the parent render callback. The gallery
needs access to `itemsData` during server render, so a render filter maintains a
per-render context stack:

- `inc/render-filters/content-showcase-context.php` pushes data on pre-render.
- The wrapper reads the stack when emitting `data-wp-context`.
- The gallery reads the same stack for SSR output.

## Media Notes

- Videos use `data-fs-lazy-video` and are loaded by `src/frontend.js`.

## Key Files

- `block.json` - attributes, supports, providesContext
- `edit.js` - editor UI, layout settings, source event name
- `render.php` - computes context, emits `data-wp-context`
- `view.js` - event listener + derived state
- `style.scss` / `editor.scss` - layout and editor hints
