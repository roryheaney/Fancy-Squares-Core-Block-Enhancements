import { store, getContext, getElement } from '@wordpress/interactivity';

store( 'fancySquaresAccordionInteractive', {
	state: {
		get isActive() {
			const context = getContext();
			return context.activeItem === context.itemId;
		},
		get ariaExpanded() {
			const context = getContext();
			return context.activeItem === context.itemId ? 'true' : 'false';
		},
		get ariaHidden() {
			const context = getContext();
			return context.activeItem === context.itemId ? 'false' : 'true';
		},
		get isCollapsing() {
			const context = getContext();
			return context.collapsing === context.itemId;
		},
	},
	actions: {
		handleKeydown( event ) {
			const { ref } = getElement();
			const key = event.key;

			// Only handle arrow keys, Home, and End
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
		},
		toggleItem() {
			const context = getContext();
			const { ref } = getElement();

			if ( ! context.itemId ) return;

			const isCurrentlyActive = context.activeItem === context.itemId;
			const itemWrapper = ref.closest( '.fs-accordion__item' );
			const contentElement = itemWrapper?.querySelector(
				'.fs-accordion__content'
			);

			if ( ! contentElement ) return;

			if ( isCurrentlyActive ) {
				// COLLAPSE: Active → Collapsing → Collapsed
				const height = contentElement.scrollHeight;
				contentElement.style.height = height + 'px';
				contentElement.offsetHeight; // Force reflow

				// Add .is-collapsing class for transition
				contentElement.classList.add( 'is-collapsing' );
				context.collapsing = context.itemId;
				context.activeItem = null; // Remove active state

				requestAnimationFrame( () => {
					contentElement.style.height = '0px';

					const handleTransitionEnd = () => {
						contentElement.style.height = '';
						contentElement.classList.remove( 'is-collapsing' );
						if ( context.collapsing === context.itemId ) {
							context.collapsing = null;
						}
						contentElement.removeEventListener(
							'transitionend',
							handleTransitionEnd
						);
					};
					contentElement.addEventListener(
						'transitionend',
						handleTransitionEnd,
						{ once: true }
					);
				} );
			} else {
				// EXPAND: Collapsed → Collapsing → Expanded
				const previousActive = context.activeItem;

				// Close previous item
				if ( previousActive ) {
					const previousItem = document.querySelector(
						`[data-wp-context*='"itemId":"${ previousActive }"'].fs-accordion__item`
					);
					if ( previousItem ) {
						const previousContent = previousItem.querySelector(
							'.fs-accordion__content'
						);
						if ( previousContent ) {
							// Collapse previous item
							const height = previousContent.scrollHeight;
							previousContent.style.height = height + 'px';
							previousContent.offsetHeight;

							previousContent.classList.add( 'is-collapsing' );

							requestAnimationFrame( () => {
								previousContent.style.height = '0px';

								const handleEnd = () => {
									previousContent.style.height = '';
									previousContent.classList.remove(
										'is-collapsing'
									);
									previousContent.removeEventListener(
										'transitionend',
										handleEnd
									);
								};
								previousContent.addEventListener(
									'transitionend',
									handleEnd,
									{ once: true }
								);
							} );
						}
					}
				}

				// Open current item
				context.activeItem = context.itemId;
				contentElement.style.height = '0px';
				contentElement.offsetHeight;

				// Add .is-collapsing class for transition
				contentElement.classList.add( 'is-collapsing' );
				context.collapsing = context.itemId;

				requestAnimationFrame( () => {
					const scrollHeight = contentElement.scrollHeight;
					contentElement.style.height = scrollHeight + 'px';

					const handleTransitionEnd = () => {
						contentElement.style.height = '';
						contentElement.classList.remove( 'is-collapsing' );
						if ( context.collapsing === context.itemId ) {
							context.collapsing = null;
						}
						contentElement.removeEventListener(
							'transitionend',
							handleTransitionEnd
						);
					};
					contentElement.addEventListener(
						'transitionend',
						handleTransitionEnd,
						{ once: true }
					);
				} );
			}

			if ( ref ) {
				ref.focus();
			}
		},
	},
} );
