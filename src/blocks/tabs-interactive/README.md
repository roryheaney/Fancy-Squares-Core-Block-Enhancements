# Tabs Interactive Block

Local implementation notes for `fs-blocks/tabs-interactive`.

## Event Contract

The block dispatches these CustomEvents from tab trigger elements:

- `show.fs.tabs` (cancelable) before tab switch.
- `shown.fs.tabs` after the new tab is fully shown.
- `hide.fs.tabs` (cancelable) before previous tab hides.
- `hidden.fs.tabs` after previous tab is fully hidden.

### Event detail payload

- `from`: previous tab ID (or empty on first activation).
- `to`: next tab ID.

## Watcher Examples

```js
// Guard tab navigation.
document.addEventListener( 'show.fs.tabs', ( event ) => {
	if ( event.detail.to === 'restricted-tab' ) {
		event.preventDefault();
	}
} );

// Observe completed transitions.
document.addEventListener( 'shown.fs.tabs', ( event ) => {
	console.log( 'Tabs changed:', event.detail.from, '->', event.detail.to );
} );
```

## Source

- Runtime: `src/blocks/tabs-interactive/view.js`
