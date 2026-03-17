# Accordion Interactive Block

Local implementation notes for `fs-blocks/accordion-interactive`.

## Event Contract

The block dispatches these CustomEvents from the content element:

- `show.fs.accordion` (cancelable) before an item opens.
- `shown.fs.accordion` after an item fully opens.
- `hide.fs.accordion` (cancelable) before an item closes.
- `hidden.fs.accordion` after an item fully closes.

### Event detail payload

- `itemId`: stable ID for the accordion item.
- `element`: the `.fs-accordion__content` node for that item.
- `trigger`: the trigger element that initiated the change.

## Watcher Examples

```js
// Prevent opening a specific item.
document.addEventListener( 'show.fs.accordion', ( event ) => {
	if ( event.detail.itemId === 'locked-item' ) {
		event.preventDefault();
	}
} );

// Track open state for analytics.
document.addEventListener( 'shown.fs.accordion', ( event ) => {
	console.log( 'Accordion opened:', event.detail.itemId );
} );
```

## Source

- Runtime: `src/blocks/accordion-interactive/view.js`
