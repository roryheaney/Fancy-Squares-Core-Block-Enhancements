import * as interactivity from '@wordpress/interactivity';

const { store, getContext, getElement } = interactivity;
// Before WordPress 6.8, event actions are synchronous without this wrapper.
const withSyncEvent =
	Reflect.get( interactivity, 'withSyncEvent' ) ||
	( ( callback ) => callback );

const COLLAPSE_TRANSITION_FALLBACK_MS = 450;

const runTransitionWithFallback = ( element, onDone ) => {
	// No transitionend fires without animation; finalize state/events immediately.
	// Read the preference per interaction so future toggles follow live changes.
	if (
		! element ||
		document.documentElement.classList.contains( 'fs-motion-paused' ) ||
		window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches
	) {
		onDone();
		return;
	}

	let completed = false;
	let fallbackId = null;

	const complete = () => {
		if ( completed ) {
			return;
		}
		completed = true;

		if ( fallbackId ) {
			window.clearTimeout( fallbackId );
		}

		element.removeEventListener( 'transitionend', complete );
		document.removeEventListener( 'fs:motionchange', handleMotionChange );
		onDone();
	};
	const handleMotionChange = () => {
		if (
			document.documentElement.classList.contains( 'fs-motion-paused' )
		) {
			complete();
		}
	};

	element.addEventListener( 'transitionend', complete, { once: true } );
	document.addEventListener( 'fs:motionchange', handleMotionChange );
	fallbackId = window.setTimeout( complete, COLLAPSE_TRANSITION_FALLBACK_MS );
};

store( 'fancySquaresAccordionInteractive', {
	state: {
		get isActive() {
			const context = getContext();
			if ( context.allowMultipleOpen ) {
				return context.activeItems.includes( context.itemId );
			}
			return context.activeItem === context.itemId;
		},
	},
	actions: {
		toggleItem: withSyncEvent( () => {
			const { ref } = getElement();
			const item = ref?.closest(
				'[data-wp-interactive="fancySquaresAccordionInteractive"]'
			);
			if ( ! item ) {
				return;
			}

			const content = item.querySelector( '.fs-accordion__content' );
			if ( ! content ) {
				return;
			}

			if ( content.classList.contains( 'collapsing' ) ) {
				return;
			}

			const context = getContext();
			const accordion = ref.closest( '.fs-accordion' );
			if ( accordion && ! context.allowMultipleOpen ) {
				const allItems = accordion.querySelectorAll(
					'.fs-accordion__content'
				);
				for ( const otherContent of allItems ) {
					if (
						otherContent !== content &&
						otherContent.classList.contains( 'collapsing' )
					) {
						return;
					}
				}
			}

			const isActive = context.allowMultipleOpen
				? context.activeItems.includes( context.itemId )
				: context.activeItem === context.itemId;

			if ( isActive ) {
				const hideEvent = new CustomEvent( 'hide.fs.accordion', {
					bubbles: true,
					cancelable: true,
					detail: {
						itemId: context.itemId,
						element: content,
						trigger: ref,
					},
				} );

				if ( ! content.dispatchEvent( hideEvent ) ) {
					return;
				}

				const height = content.getBoundingClientRect().height;
				content.style.height = height + 'px';
				void content.offsetHeight;
				content.classList.add( 'collapsing' );
				content.classList.remove( 'collapse', 'show' );
				content.style.height = '';

				runTransitionWithFallback( content, () => {
					content.classList.remove( 'collapsing' );
					content.classList.add( 'collapse' );
					if ( context.allowMultipleOpen ) {
						context.activeItems = context.activeItems.filter(
							( id ) => id !== context.itemId
						);
					} else {
						context.activeItem = '';
					}

					content.dispatchEvent(
						new CustomEvent( 'hidden.fs.accordion', {
							bubbles: true,
							detail: {
								itemId: context.itemId,
								element: content,
								trigger: ref,
							},
						} )
					);
				} );

				return;
			}

			// Check cancellation before closing another item in single-open mode.
			const showEvent = new CustomEvent( 'show.fs.accordion', {
				bubbles: true,
				cancelable: true,
				detail: {
					itemId: context.itemId,
					element: content,
					trigger: ref,
				},
			} );

			if ( ! content.dispatchEvent( showEvent ) ) {
				return;
			}

			const previousItemId = context.activeItem;
			if ( ! context.allowMultipleOpen && previousItemId ) {
				const accordionRoot = ref.closest( '.fs-accordion' );
				const previousItem = accordionRoot?.querySelector(
					`[data-item-id="${ previousItemId }"]`
				);

				if ( previousItem ) {
					const prevHideEvent = new CustomEvent(
						'hide.fs.accordion',
						{
							bubbles: true,
							cancelable: true,
							detail: {
								itemId: previousItemId,
								element: previousItem,
								trigger: ref,
							},
						}
					);

					if ( ! previousItem.dispatchEvent( prevHideEvent ) ) {
						return;
					}

					const prevHeight =
						previousItem.getBoundingClientRect().height;
					previousItem.style.height = prevHeight + 'px';
					void previousItem.offsetHeight;
					previousItem.classList.add( 'collapsing' );
					previousItem.classList.remove( 'collapse', 'show' );
					previousItem.style.height = '';

					runTransitionWithFallback( previousItem, () => {
						previousItem.classList.remove( 'collapsing' );
						previousItem.classList.add( 'collapse' );

						previousItem.dispatchEvent(
							new CustomEvent( 'hidden.fs.accordion', {
								bubbles: true,
								detail: {
									itemId: previousItemId,
									element: previousItem,
									trigger: ref,
								},
							} )
						);
					} );
				}
			}

			if ( context.allowMultipleOpen ) {
				context.activeItems = [
					...context.activeItems,
					context.itemId,
				];
			} else {
				context.activeItem = context.itemId;
			}
			content.classList.remove( 'collapse' );
			content.classList.add( 'collapsing' );
			content.style.height = '0px';
			void content.offsetHeight;
			content.style.height = content.scrollHeight + 'px';

			runTransitionWithFallback( content, () => {
				content.classList.remove( 'collapsing' );
				content.classList.add( 'collapse', 'show' );
				content.style.height = '';

				content.dispatchEvent(
					new CustomEvent( 'shown.fs.accordion', {
						bubbles: true,
						detail: {
							itemId: context.itemId,
							element: content,
							trigger: ref,
						},
					} )
				);
			} );
		} ),

		handleKeydown: withSyncEvent( ( event ) => {
			const key = event.key;
			if ( ! [ 'ArrowUp', 'ArrowDown', 'Home', 'End' ].includes( key ) ) {
				return;
			}
			event.preventDefault();

			const { ref } = getElement();
			const accordion = ref.closest( '.fs-accordion' );
			if ( ! accordion ) {
				return;
			}

			const triggers = Array.from(
				accordion.querySelectorAll( '.fs-accordion__trigger' )
			);
			const currentIndex = triggers.indexOf( ref );
			if ( currentIndex === -1 ) {
				return;
			}

			let targetIndex;
			switch ( key ) {
				case 'ArrowDown':
					targetIndex =
						currentIndex === triggers.length - 1
							? 0
							: currentIndex + 1;
					break;
				case 'ArrowUp':
					targetIndex =
						currentIndex === 0
							? triggers.length - 1
							: currentIndex - 1;
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
		} ),
	},
} );
