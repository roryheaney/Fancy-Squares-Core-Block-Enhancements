import { store, getContext, getElement } from '@wordpress/interactivity';

store( 'fancySquaresTabsInteractive', {
	state: {
		get isActive() {
			const context = getContext();
			return context.activeTab === context.tabId;
		},
		get ariaSelected() {
			const context = getContext();
			return context.activeTab === context.tabId ? 'true' : 'false';
		},
		get tabIndex() {
			const context = getContext();
			return context.activeTab === context.tabId ? '0' : '-1';
		},
		get isCollapsing() {
			const context = getContext();
			return context.collapsing === context.tabId;
		},
	},
	actions: {
		setActiveTab() {
			const context = getContext();
			const { ref } = getElement();

			if ( context.tabId && context.activeTab !== context.tabId ) {
				const previousTab = context.activeTab;

				// Bootstrap-style multi-state transitions:
				// 1. Fade out previous panel (desktop) or collapse (mobile)
				// 2. Show new panel and fade in (desktop) or expand (mobile)

				if ( previousTab ) {
					// Find previous panel
					const previousPanelWrapper = document.querySelector(
						`[data-wp-context*='"tabId":"${ previousTab }"'].fs-tabs__panel`
					);
					const previousPanel = previousPanelWrapper?.querySelector(
						'.fs-tabs__panel-content'
					);

					if ( previousPanel && previousPanelWrapper ) {
						// Check if we're on mobile (responsive mode)
						const isMobile =
							window.innerWidth <= 767 &&
							previousPanelWrapper.closest(
								'.fs-tabs--responsive'
							);

						if ( isMobile ) {
							// Mobile: Height collapse transition
							const height = previousPanel.scrollHeight;
							previousPanel.style.height = height + 'px';
							previousPanel.offsetHeight; // Force reflow

							context.collapsing = previousTab;
							previousPanel.style.height = '0px';

							const handleTransitionEnd = () => {
								previousPanel.style.height = '';
								if ( context.collapsing === previousTab ) {
									context.collapsing = null;
								}
								previousPanel.removeEventListener(
									'transitionend',
									handleTransitionEnd
								);
							};
							previousPanel.addEventListener(
								'transitionend',
								handleTransitionEnd,
								{ once: true }
							);
						}
					}
				}

				// Switch active tab
				context.activeTab = context.tabId;

				// Find and show new panel
				requestAnimationFrame( () => {
					const newPanelWrapper = document.querySelector(
						`[data-wp-context*='"tabId":"${ context.tabId }"'].fs-tabs__panel`
					);
					const newPanel = newPanelWrapper?.querySelector(
						'.fs-tabs__panel-content'
					);

					if ( newPanel && newPanelWrapper ) {
						// Check if we're on mobile
						const isMobile =
							window.innerWidth <= 767 &&
							newPanelWrapper.closest( '.fs-tabs--responsive' );

						if ( isMobile ) {
							// Mobile: Height expand transition
							newPanel.style.height = '0px';
							newPanel.offsetHeight; // Force reflow

							context.collapsing = context.tabId;

							requestAnimationFrame( () => {
								const scrollHeight = newPanel.scrollHeight;
								newPanel.style.height = scrollHeight + 'px';

								const handleTransitionEnd = () => {
									newPanel.style.height = '';
									if (
										context.collapsing === context.tabId
									) {
										context.collapsing = null;
									}
									newPanel.removeEventListener(
										'transitionend',
										handleTransitionEnd
									);
								};
								newPanel.addEventListener(
									'transitionend',
									handleTransitionEnd,
									{ once: true }
								);
							} );
						}
					}

					if ( ref ) {
						ref.focus();
					}
				} );
			}
		},
		handleKeyDown( event ) {
			const { ref } = getElement();
			if ( ! ref ) return;

			const tablist = ref.closest( '[role="tablist"]' );
			if ( ! tablist ) return;

			const tabs = Array.from(
				tablist.querySelectorAll( '[role="tab"]' )
			);
			const currentIndex = tabs.indexOf( ref );

			let nextIndex = -1;

			switch ( event.key ) {
				case 'ArrowLeft':
					event.preventDefault();
					nextIndex = currentIndex - 1;
					if ( nextIndex < 0 ) nextIndex = tabs.length - 1;
					break;

				case 'ArrowRight':
					event.preventDefault();
					nextIndex = currentIndex + 1;
					if ( nextIndex >= tabs.length ) nextIndex = 0;
					break;

				case 'Home':
					event.preventDefault();
					nextIndex = 0;
					break;

				case 'End':
					event.preventDefault();
					nextIndex = tabs.length - 1;
					break;
			}

			if ( nextIndex !== -1 && tabs[ nextIndex ] ) {
				tabs[ nextIndex ].focus();
				tabs[ nextIndex ].click();
			}
		},
	},
} );
