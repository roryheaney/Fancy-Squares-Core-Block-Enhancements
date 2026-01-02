import {
	store,
	getContext,
	getElement,
	withScope,
	withSyncEvent,
} from '@wordpress/interactivity';

store( 'fancySquaresAccordionInteractive', {
	state: {
		get isActive() {
			const context = getContext();
			return context.activeItem === context.itemId;
		},
		get isCollapsing() {
			const context = getContext();
			return context.transitioningItem === context.itemId;
		},
	},
	actions: {
		toggleItem() {
			const context = getContext();
			const { ref } = getElement();

			// Get content element
			const item = ref.closest(
				'[data-wp-interactive="fancySquaresAccordionInteractive"]'
			);
			if ( ! item ) return;

			const content = item.querySelector( '.fs-accordion__content' );
			if ( ! content ) return;

			// If clicking active item, close it
			if ( context.activeItem === context.itemId ) {
				// Bootstrap 5 hide() sequence
				const height = content.getBoundingClientRect().height;
				content.style.height = height + 'px';
				content.offsetHeight; // Force reflow

				// Add collapsing class manually, remove collapse and show
				content.classList.add( 'collapsing' );
				content.classList.remove( 'collapse', 'show' );

				// Set height to empty (NOT 0px) - this is the Bootstrap way
				content.style.height = '';

				// Wait for transition to complete
				const handleTransitionEnd = () => {
					content.classList.remove( 'collapsing' );
					content.classList.add( 'collapse' );
					context.activeItem = ''; // Remove active item AFTER transition
					content.removeEventListener(
						'transitionend',
						handleTransitionEnd
					);
				};
				content.addEventListener(
					'transitionend',
					handleTransitionEnd,
					{
						once: true,
					}
				);
			} else {
				// Open this item
				const previousItemId = context.activeItem;

				// Close previous item with transition if it exists
				if ( previousItemId ) {
					const accordion = ref.closest( '.fs-accordion' );
					if ( accordion ) {
						const previousItem = accordion.querySelector(
							`[data-item-id="${ previousItemId }"]`
						);
						if ( previousItem ) {
							// Bootstrap 5 hide() sequence
							const prevHeight =
								previousItem.getBoundingClientRect().height;
							previousItem.style.height = prevHeight + 'px';
							previousItem.offsetHeight; // Force reflow

							// Manually add/remove classes
							previousItem.classList.add( 'collapsing' );
							previousItem.classList.remove( 'collapse', 'show' );

							// Set to empty string (NOT 0px)
							previousItem.style.height = '';

							const handlePrevTransitionEnd = () => {
								previousItem.classList.remove( 'collapsing' );
								previousItem.classList.add( 'collapse' );
								previousItem.removeEventListener(
									'transitionend',
									handlePrevTransitionEnd
								);
							};
							previousItem.addEventListener(
								'transitionend',
								handlePrevTransitionEnd,
								{
									once: true,
								}
							);
						}
					}
				}

				// Open new item with transition
				context.activeItem = context.itemId;

				// Bootstrap 5 show() sequence
				// Remove collapse, add collapsing
				content.classList.remove( 'collapse' );
				content.classList.add( 'collapsing' );

				// Set to 0 initially
				content.style.height = '0px';
				content.offsetHeight; // Force reflow

				// Transition to full height
				const scrollHeight = content.scrollHeight;
				content.style.height = scrollHeight + 'px';

				const handleTransitionEnd = () => {
					content.classList.remove( 'collapsing' );
					content.classList.add( 'collapse', 'show' );
					content.style.height = '';
					content.removeEventListener(
						'transitionend',
						handleTransitionEnd
					);
				};
				content.addEventListener(
					'transitionend',
					handleTransitionEnd,
					{ once: true }
				);
			}
		},

		handleKeydown: withSyncEvent( ( event ) => {
			const { ref } = getElement();
			const key = event.key;
			if ( ! [ 'ArrowUp', 'ArrowDown', 'Home', 'End' ].includes( key ) ) {
				return;
			}
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
