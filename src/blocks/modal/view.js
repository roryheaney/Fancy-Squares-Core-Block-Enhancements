/**
 * Modal Block - Interactivity API Store
 *
 * Implements modal open/close with Bootstrap 5-style animations (150ms fade),
 * focus management, keyboard navigation, and CustomEvents API.
 */

import { store, getContext, getElement } from '@wordpress/interactivity';

const { state, actions } = store( 'fancySquaresModal', {
	state: {
		// Global state - only one modal open at a time
		currentModalId: null,
		previousFocus: null,
	},
	actions: {
		openModal() {
			const context = getContext();
			const { ref } = getElement();

			// Store the element that triggered the modal (button)
			state.previousFocus = ref;

			// Find modal element by ID from context
			const modal = document.getElementById( context.modalId );
			if ( ! modal ) return;

			// Dispatch preventable "show" event
			const showEvent = new CustomEvent( 'show.fs.modal', {
				bubbles: true,
				cancelable: true,
				detail: {
					modalId: context.modalId,
					trigger: ref,
				},
			} );

			if ( ! modal.dispatchEvent( showEvent ) ) {
				// Event was prevented
				return;
			}

			// Set current modal ID (triggers state.isOpen computed property)
			state.currentModalId = context.modalId;

			// Add body class to prevent scrolling
			document.body.classList.add( 'fs-modal-open' );

			// Bootstrap 5 animation sequence - manual DOM manipulation for precise timing
			requestAnimationFrame( () => {
				// Display modal
				modal.style.display = 'block';
				modal.offsetHeight; // Force reflow

				// Add .show class for fade-in transition
				requestAnimationFrame( () => {
					modal.classList.add( 'show' );
					const backdrop =
						modal.querySelector( '.fs-modal-backdrop' );
					if ( backdrop ) {
						backdrop.classList.add( 'show' );
					}

					// Focus management and "shown" event after animation completes
					setTimeout( () => {
						// Focus first focusable element in modal
						const firstFocusable = modal.querySelector(
							'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
						);
						if ( firstFocusable ) {
							firstFocusable.focus();
						}

						// Dispatch "shown" event (informational, not cancelable)
						modal.dispatchEvent(
							new CustomEvent( 'shown.fs.modal', {
								bubbles: true,
								detail: {
									modalId: context.modalId,
									trigger: ref,
								},
							} )
						);
					}, 150 ); // Bootstrap 5 transition duration
				} );
			} );
		},

		closeModal() {
			const context = getContext();
			const modal = document.getElementById( context.modalId );

			// Only close if this modal is actually open
			if ( ! modal || state.currentModalId !== context.modalId ) {
				return;
			}

			// Dispatch preventable "hide" event
			const hideEvent = new CustomEvent( 'hide.fs.modal', {
				bubbles: true,
				cancelable: true,
				detail: {
					modalId: context.modalId,
				},
			} );

			if ( ! modal.dispatchEvent( hideEvent ) ) {
				// Event was prevented
				return;
			}

			// Remove .show class for fade-out transition
			modal.classList.remove( 'show' );
			const backdrop = modal.querySelector( '.fs-modal-backdrop' );
			if ( backdrop ) {
				backdrop.classList.remove( 'show' );
			}

			// Wait for transition to complete, then hide modal
			setTimeout( () => {
				modal.style.display = 'none';
				state.currentModalId = null;
				document.body.classList.remove( 'fs-modal-open' );

				// Restore focus to the button that opened the modal
				if ( state.previousFocus ) {
					state.previousFocus.focus();
					state.previousFocus = null;
				}

				// Dispatch "hidden" event (informational, not cancelable)
				modal.dispatchEvent(
					new CustomEvent( 'hidden.fs.modal', {
						bubbles: true,
						detail: {
							modalId: context.modalId,
						},
					} )
				);
			}, 150 ); // Bootstrap 5 transition duration
		},

		handleBackdropClick() {
			const context = getContext();

			if ( ! context.staticBackdrop ) {
				// Normal backdrop - close modal
				actions.closeModal();
			} else {
				// Static backdrop - shake animation instead of closing
				const modal = document.getElementById( context.modalId );
				const dialog = modal?.querySelector( '.fs-modal-dialog' );
				if ( dialog ) {
					dialog.classList.add( 'fs-modal-static' );
					setTimeout( () => {
						dialog.classList.remove( 'fs-modal-static' );
					}, 300 );
				}
			}
		},

		handleKeydown( event ) {
			const context = getContext();

			// Close on Escape key (if enabled)
			if ( event.key === 'Escape' && context.closeOnEscape ) {
				event.preventDefault();
				actions.closeModal();
				return;
			}

			// Focus trap - Tab key handling
			if ( event.key === 'Tab' ) {
				const modal = document.getElementById( context.modalId );
				if ( ! modal ) return;

				const focusableElements = modal.querySelectorAll(
					'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
				);

				if ( focusableElements.length === 0 ) return;

				const firstFocusable = focusableElements[ 0 ];
				const lastFocusable =
					focusableElements[ focusableElements.length - 1 ];

				// Shift+Tab on first element - go to last
				if (
					event.shiftKey &&
					document.activeElement === firstFocusable
				) {
					event.preventDefault();
					lastFocusable.focus();
				}
				// Tab on last element - go to first
				else if (
					! event.shiftKey &&
					document.activeElement === lastFocusable
				) {
					event.preventDefault();
					firstFocusable.focus();
				}
			}
		},
	},
} );

/*
 * CustomEvents API Reference
 *
 * The modal dispatches four lifecycle events for extensibility:
 *
 * 1. show.fs.modal (cancelable)
 *    - Fired before modal opens
 *    - Can be prevented with event.preventDefault()
 *    - Detail: { modalId, trigger }
 *
 * 2. shown.fs.modal (informational)
 *    - Fired after modal fully opens (after 150ms transition)
 *    - Cannot be prevented
 *    - Detail: { modalId, trigger }
 *
 * 3. hide.fs.modal (cancelable)
 *    - Fired before modal closes
 *    - Can be prevented with event.preventDefault()
 *    - Detail: { modalId }
 *
 * 4. hidden.fs.modal (informational)
 *    - Fired after modal fully closes (after 150ms transition)
 *    - Cannot be prevented
 *    - Detail: { modalId }
 *
 * Example usage:
 *
 * // Prevent modal from opening
 * document.addEventListener('show.fs.modal', (event) => {
 *   if (someCondition) {
 *     event.preventDefault();
 *     console.log('Modal open prevented');
 *   }
 * });
 *
 * // Track when modal is fully open
 * document.addEventListener('shown.fs.modal', (event) => {
 *   console.log('Modal opened:', event.detail.modalId);
 *   // Analytics, lazy loading, etc.
 * });
 *
 * // Confirm before closing
 * document.addEventListener('hide.fs.modal', (event) => {
 *   if (hasUnsavedChanges && !confirm('Close without saving?')) {
 *     event.preventDefault();
 *   }
 * });
 *
 * // Clean up after modal closes
 * document.addEventListener('hidden.fs.modal', (event) => {
 *   console.log('Modal closed:', event.detail.modalId);
 *   // Reset form, clear data, etc.
 * });
 */
