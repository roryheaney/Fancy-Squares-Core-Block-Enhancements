import {
	store,
	getContext,
	getElement,
	withSyncEvent,
} from '@wordpress/interactivity';

store( 'fancySquaresAccordionInteractive', {
	state: {
		get isActive() {
			const context = getContext();
			return context.activeItem === context.itemId;
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

			// Bootstrap 5 approach: Check if ANY sibling is transitioning
			// If so, abort to prevent race conditions
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
						// Another item is transitioning, abort
						return;
					}
				}
			}

			// If clicking active item, close it
			if ( context.activeItem === context.itemId ) {
				// Dispatch hide event (cancelable)
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
					// Event was prevented
					return;
				}

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

					// Dispatch hidden event
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
							// Dispatch hide event for previous item (cancelable)
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

							if (
								! previousItem.dispatchEvent( prevHideEvent )
							) {
								// Previous item hide was prevented, abort opening new item
								return;
							}

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

								// Dispatch hidden event for previous item
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

								previousItem.removeEventListener(
									'transitionend',
									handlePrevTransitionEnd
								);

								// NOTE: Do NOT clear transitioning flag here
								// The opening item's transition will clear it when complete
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

				// Dispatch show event (cancelable)
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
					// Event was prevented
					return;
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

					// Dispatch shown event
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

// console.log( '✅ Accordion store registered successfully' );

// ============================================================================
// EVENT TESTING & EXAMPLES
// ============================================================================
// The accordion dispatches Bootstrap 5-compatible CustomEvents that you can
// listen to for custom functionality. Uncomment any of the examples below
// to test or use as a starting point for your own implementations.
//
// Available Events:
// - show.fs.accordion    (before opening, cancelable)
// - shown.fs.accordion   (after opening animation completes)
// - hide.fs.accordion    (before closing, cancelable)
// - hidden.fs.accordion  (after closing animation completes)
//
// Each event includes a detail object with:
// - itemId: string (unique ID of the accordion item)
// - element: HTMLElement (the .fs-accordion__content element)
// - trigger: HTMLElement (the button that was clicked)
// ============================================================================

// Example 1: Log all events to console
// ----------------------------------------------------------------------------
// document.addEventListener('show.fs.accordion', (e) => {
//     console.log('🟦 Opening:', e.detail.itemId);
// });
// document.addEventListener('shown.fs.accordion', (e) => {
//     console.log('✅ Opened:', e.detail.itemId);
// });
// document.addEventListener('hide.fs.accordion', (e) => {
//     console.log('🟧 Closing:', e.detail.itemId);
// });
// document.addEventListener('hidden.fs.accordion', (e) => {
//     console.log('❌ Closed:', e.detail.itemId);
// });

// Example 2: Prevent specific items from opening/closing
// ----------------------------------------------------------------------------
// document.addEventListener('show.fs.accordion', (e) => {
//     // Prevent item 2 from opening
//     if (e.detail.itemId.includes('2')) {
//         e.preventDefault();
//         alert('This item is locked!');
//     }
// });
//
// document.addEventListener('hide.fs.accordion', (e) => {
//     // Require confirmation before closing
//     if (!confirm('Are you sure you want to close this section?')) {
//         e.preventDefault();
//     }
// });

// Example 3: Track analytics
// ----------------------------------------------------------------------------
// document.addEventListener('shown.fs.accordion', (e) => {
//     // Send to Google Analytics
//     if (typeof gtag !== 'undefined') {
//         gtag('event', 'accordion_opened', {
//             event_category: 'engagement',
//             event_label: e.detail.itemId
//         });
//     }
// });

// Example 4: Lazy load content
// ----------------------------------------------------------------------------
// document.addEventListener('show.fs.accordion', async (e) => {
//     const content = e.detail.element.querySelector('.lazy-content');
//     if (content && !content.dataset.loaded) {
//         const response = await fetch(`/api/content/${e.detail.itemId}`);
//         content.innerHTML = await response.text();
//         content.dataset.loaded = 'true';
//     }
// });

// Example 5: Auto-scroll to accordion when opening
// ----------------------------------------------------------------------------
// document.addEventListener('show.fs.accordion', (e) => {
//     setTimeout(() => {
//         const accordion = e.detail.element.closest('.fs-accordion');
//         accordion.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
//     }, 50);
// });

// Example 6: Save state to localStorage
// ----------------------------------------------------------------------------
// document.addEventListener('shown.fs.accordion', (e) => {
//     localStorage.setItem('lastOpenedAccordion', e.detail.itemId);
// });
//
// // Restore on page load
// window.addEventListener('DOMContentLoaded', () => {
//     const lastOpened = localStorage.getItem('lastOpenedAccordion');
//     if (lastOpened) {
//         const trigger = document.querySelector(`[data-item-id="${lastOpened}"]`)
//             ?.closest('.wp-block-accordion-item-interactive')
//             ?.querySelector('.fs-accordion__trigger');
//         trigger?.click();
//     }
// });

// Example 7: Visual debug indicator (remove in production)
// ----------------------------------------------------------------------------
// const indicator = document.createElement('div');
// indicator.style.cssText = 'position:fixed;top:10px;right:10px;background:#000;color:#fff;padding:10px;border-radius:5px;z-index:9999;font-family:monospace;';
// document.body.appendChild(indicator);
//
// ['show', 'shown', 'hide', 'hidden'].forEach(type => {
//     document.addEventListener(`${type}.fs.accordion`, (e) => {
//         indicator.style.background = type.includes('show') ? '#0d6efd' : '#dc3545';
//         indicator.textContent = `${type.toUpperCase()}: ${e.detail.itemId}`;
//     });
// });
