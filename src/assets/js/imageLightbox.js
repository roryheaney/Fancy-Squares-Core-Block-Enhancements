import { store } from '@wordpress/interactivity';

/**
 * Helper to set current gallery images and index.
 *
 * @param {string[]} images Array of image sources.
 * @param {number}   index  Active image index.
 */
function setGallery( images = [], index = 0 ) {
	state.images = images;
	state.index = index;
	state.src = images[ index ] || null;
}

/**
 * Reset gallery related state values.
 */
function resetGallery() {
	state.src = null;
	state.images = [];
	state.index = 0;
}

/**
 * Update the current index and image source.
 *
 * @param {number} index Image index to activate.
 */
function updateIndex( index ) {
	state.index = index;
	state.src = state.images[ index ];
}

const { state, actions } = store( 'fs/lightbox', {
	state: {
		src: null,
		phase: 'closed',
		opener: null,
		images: [],
		index: 0,
	},
	actions: {
		open( { images, index = 0, opener } ) {
			state.opener = opener;
			setGallery( images, index );
			state.phase = 'open';
			window.requestAnimationFrame( () => {
				state.phase = 'opened';
				document.querySelector( '.fs-lightbox-close' )?.focus();
			} );
		},
		close() {
			state.phase = 'close';
			window.setTimeout( () => {
				state.phase = 'closed';
				resetGallery();
				if ( state.opener ) {
					state.opener.focus();
					state.opener = null;
				}
			}, 300 );
		},
		next() {
			if ( state.images.length === 0 ) {
				return;
			}
			updateIndex( ( state.index + 1 ) % state.images.length );
		},
		prev() {
			if ( state.images.length === 0 ) {
				return;
			}
			updateIndex(
				( state.index - 1 + state.images.length ) % state.images.length
			);
		},
	},
	callbacks: {
		open( event ) {
			const img = event?.currentTarget;
			const gallery = img.closest( '.wp-block-gallery' );
			let images = [];
			let index = 0;
			if ( gallery ) {
				const galleryImgs = gallery.querySelectorAll(
					'img.fs-lightbox-img'
				);
				images = Array.from( galleryImgs ).map(
					( i ) => i.currentSrc || i.src
				);
				index = Array.from( galleryImgs ).indexOf( img );
			} else {
				images = [ img?.currentSrc || img?.src ];
			}
			actions.open( { images, index, opener: img } );
		},
	},
	effects: {
		handleEscape() {
			if ( state.phase === 'closed' ) {
				return;
			}
			const onKeyDown = ( e ) => {
				if ( e.key === 'Escape' ) {
					actions.close();
				} else if ( e.key === 'ArrowRight' ) {
					actions.next();
				} else if ( e.key === 'ArrowLeft' ) {
					actions.prev();
				}
			};
			document.addEventListener( 'keydown', onKeyDown );
			return () => document.removeEventListener( 'keydown', onKeyDown );
		},

		manageBodyScroll() {
			if ( state.phase === 'open' || state.phase === 'opened' ) {
				document.body.classList.add( 'fs-lightbox-open' );
			} else {
				document.body.classList.remove( 'fs-lightbox-open' );
			}
		},

		trapFocus() {
			if ( state.phase === 'closed' ) {
				return;
			}
			const dialog = document.querySelector( '.fs-lightbox-dialog' );
			const focusable = dialog.querySelectorAll(
				'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
			);
			const first = focusable[ 0 ];
			const last = focusable[ focusable.length - 1 ];
			const handleKeyDown = ( e ) => {
				if ( e.key !== 'Tab' ) {
					return;
				}
				if ( focusable.length === 0 ) {
					e.preventDefault();
					return;
				}
				const active = dialog.ownerDocument.activeElement;
				if ( e.shiftKey ) {
					if ( active === first ) {
						e.preventDefault();
						last.focus();
					}
				} else if ( active === last ) {
					e.preventDefault();
					first.focus();
				}
			};
			dialog.addEventListener( 'keydown', handleKeyDown );
			return () => dialog.removeEventListener( 'keydown', handleKeyDown );
		},
	},
} );

export { state, actions };
