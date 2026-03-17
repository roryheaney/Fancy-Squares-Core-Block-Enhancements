import {
	store,
	getContext,
	getElement,
	withSyncEvent,
} from '@wordpress/interactivity';

const COLLAPSE_TRANSITION_FALLBACK_MS = 450;

const runTransitionWithFallback = ( element, onDone ) => {
	if ( ! element ) {
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
		onDone();
	};

	element.addEventListener( 'transitionend', complete, { once: true } );
	fallbackId = window.setTimeout( complete, COLLAPSE_TRANSITION_FALLBACK_MS );
};

store( 'fancySquaresAccordionInteractive', {
	state: {
		get isActive() {
			const context = getContext();
			return context.activeItem === context.itemId;
		},
	},
	actions: {
		toggleItem() {
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

			const accordion = ref.closest( '.fs-accordion' );
			if ( accordion ) {
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

			const context = getContext();

			if ( context.activeItem === context.itemId ) {
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
					context.activeItem = '';

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

			const previousItemId = context.activeItem;
			if ( previousItemId ) {
				const accordionRoot = ref.closest( '.fs-accordion' );
				const previousItem = accordionRoot?.querySelector(
					`[data-item-id="${ previousItemId }"]`
				);

				if ( previousItem ) {
					const prevHideEvent = new CustomEvent( 'hide.fs.accordion', {
						bubbles: true,
						cancelable: true,
						detail: {
							itemId: previousItemId,
							element: previousItem,
							trigger: ref,
						},
					} );

					if ( ! previousItem.dispatchEvent( prevHideEvent ) ) {
						return;
					}

					const prevHeight = previousItem.getBoundingClientRect().height;
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

			context.activeItem = context.itemId;
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
		},

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
