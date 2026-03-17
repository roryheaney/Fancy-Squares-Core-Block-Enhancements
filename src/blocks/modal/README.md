# Modal Block

Local implementation notes for `fs-blocks/modal`.

## Event Contract

The block dispatches these modal lifecycle events:

- `show.fs.modal` (cancelable) before modal opens.
- `shown.fs.modal` after modal open transition completes.
- `hide.fs.modal` (cancelable) before modal closes.
- `hidden.fs.modal` after modal close transition completes.

### Event detail payload

- `show.fs.modal` / `shown.fs.modal`: `{ modalId, trigger }`
- `hide.fs.modal` / `hidden.fs.modal`: `{ modalId }`

## Watcher Examples

```js
// Prevent opening under a custom condition.
document.addEventListener( 'show.fs.modal', ( event ) => {
	if ( window.shouldBlockModal ) {
		event.preventDefault();
	}
} );

// Run cleanup when modal is fully closed.
document.addEventListener( 'hidden.fs.modal', ( event ) => {
	console.log( 'Modal closed:', event.detail.modalId );
} );
```

## Source

- Runtime: `src/blocks/modal/view.js`
