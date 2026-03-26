import {
	store,
	getContext,
	getElement,
	withSyncEvent,
} from '@wordpress/interactivity';

const MOBILE_MAX_WIDTH = 767;
const MOBILE_TRANSITION_FALLBACK_MS = 450;

const findTabsRoot = ( ref ) => ref?.closest( '[data-fs-tabs-root]' );

const findTabButton = ( tabsRoot, tabId ) =>
	tabsRoot?.querySelector( `[data-fs-tab-id="${ tabId }"][role="tab"]` );

const findTabPanel = ( tabsRoot, tabId ) =>
	tabsRoot?.querySelector( `.fs-tabs__panel[data-fs-tab-id="${ tabId }"]` );

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
	fallbackId = window.setTimeout( complete, MOBILE_TRANSITION_FALLBACK_MS );
};

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
		setActiveTab: withSyncEvent( () => {
			const context = getContext();
			const { ref } = getElement();
			const tabsRoot = findTabsRoot( ref );

			if (
				! tabsRoot ||
				! context.tabId ||
				context.activeTab === context.tabId
			) {
				return;
			}

			const previousTab = context.activeTab;
			const previousButton = previousTab
				? findTabButton( tabsRoot, previousTab )
				: null;
			const newButton = ref;

			if ( previousButton ) {
				const hideEvent = new CustomEvent( 'hide.fs.tabs', {
					bubbles: true,
					cancelable: true,
					detail: {
						from: previousTab,
						to: context.tabId,
						itemId: previousTab,
					},
				} );
				if ( ! previousButton.dispatchEvent( hideEvent ) ) {
					return;
				}
			}

			if ( newButton ) {
				const showEvent = new CustomEvent( 'show.fs.tabs', {
					bubbles: true,
					cancelable: true,
					detail: {
						from: previousTab,
						to: context.tabId,
						itemId: context.tabId,
					},
				} );
				if ( ! newButton.dispatchEvent( showEvent ) ) {
					return;
				}
			}

			if ( previousTab ) {
				const previousPanelWrapper = findTabPanel(
					tabsRoot,
					previousTab
				);
				const previousPanel = previousPanelWrapper?.querySelector(
					'.fs-tabs__panel-content'
				);

				if ( previousPanel && previousPanelWrapper ) {
					const isMobile =
						window.innerWidth <= MOBILE_MAX_WIDTH &&
						previousPanelWrapper.closest( '.fs-tabs--responsive' );

					if ( isMobile ) {
						const height = previousPanel.scrollHeight;
						previousPanel.style.height = height + 'px';
						void previousPanel.offsetHeight;

						context.collapsing = previousTab;
						previousPanel.style.height = '0px';

						runTransitionWithFallback( previousPanel, () => {
							previousPanel.style.height = '';
							if ( context.collapsing === previousTab ) {
								context.collapsing = null;
							}

							if ( previousButton ) {
								previousButton.dispatchEvent(
									new CustomEvent( 'hidden.fs.tabs', {
										bubbles: true,
										detail: {
											from: previousTab,
											to: context.tabId,
											itemId: previousTab,
										},
									} )
								);
							}
						} );
					} else if ( previousButton ) {
						previousButton.dispatchEvent(
							new CustomEvent( 'hidden.fs.tabs', {
								bubbles: true,
								detail: {
									from: previousTab,
									to: context.tabId,
									itemId: previousTab,
								},
							} )
						);
					}
				}
			}

			context.activeTab = context.tabId;

			window.requestAnimationFrame( () => {
				const newPanelWrapper = findTabPanel( tabsRoot, context.tabId );
				const newPanel = newPanelWrapper?.querySelector(
					'.fs-tabs__panel-content'
				);

				if ( newPanel && newPanelWrapper ) {
					const isMobile =
						window.innerWidth <= MOBILE_MAX_WIDTH &&
						newPanelWrapper.closest( '.fs-tabs--responsive' );

					if ( isMobile ) {
						newPanel.style.height = '0px';
						void newPanel.offsetHeight;
						context.collapsing = context.tabId;

						window.requestAnimationFrame( () => {
							newPanel.style.height =
								newPanel.scrollHeight + 'px';

							runTransitionWithFallback( newPanel, () => {
								newPanel.style.height = '';
								if ( context.collapsing === context.tabId ) {
									context.collapsing = null;
								}

								if ( newButton ) {
									newButton.dispatchEvent(
										new CustomEvent( 'shown.fs.tabs', {
											bubbles: true,
											detail: {
												from: previousTab,
												to: context.tabId,
												itemId: context.tabId,
											},
										} )
									);
								}
							} );
						} );
					} else if ( newButton ) {
						newButton.dispatchEvent(
							new CustomEvent( 'shown.fs.tabs', {
								bubbles: true,
								detail: {
									from: previousTab,
									to: context.tabId,
									itemId: context.tabId,
								},
							} )
						);
					}
				}

				if ( ref ) {
					ref.focus();
				}
			} );
		} ),
		handleKeyDown: withSyncEvent( ( event ) => {
			const { ref } = getElement();
			if ( ! ref ) {
				return;
			}

			const tablist = ref.closest( '[role="tablist"]' );
			if ( ! tablist ) {
				return;
			}

			const tabs = Array.from(
				tablist.querySelectorAll( '[role="tab"]' )
			);
			const currentIndex = tabs.indexOf( ref );
			if ( currentIndex === -1 ) {
				return;
			}

			const orientation =
				tablist.getAttribute( 'aria-orientation' ) === 'vertical'
					? 'vertical'
					: 'horizontal';

			let nextIndex = -1;

			switch ( event.key ) {
				case 'ArrowLeft':
					if ( orientation !== 'horizontal' ) {
						break;
					}
					event.preventDefault();
					nextIndex = currentIndex - 1;
					if ( nextIndex < 0 ) {
						nextIndex = tabs.length - 1;
					}
					break;
				case 'ArrowRight':
					if ( orientation !== 'horizontal' ) {
						break;
					}
					event.preventDefault();
					nextIndex = currentIndex + 1;
					if ( nextIndex >= tabs.length ) {
						nextIndex = 0;
					}
					break;
				case 'ArrowUp':
					if ( orientation !== 'vertical' ) {
						break;
					}
					event.preventDefault();
					nextIndex = currentIndex - 1;
					if ( nextIndex < 0 ) {
						nextIndex = tabs.length - 1;
					}
					break;
				case 'ArrowDown':
					if ( orientation !== 'vertical' ) {
						break;
					}
					event.preventDefault();
					nextIndex = currentIndex + 1;
					if ( nextIndex >= tabs.length ) {
						nextIndex = 0;
					}
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
		} ),
	},
} );
