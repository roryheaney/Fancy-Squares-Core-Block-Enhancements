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

				// Find previous and new tab buttons for event dispatching
				const previousButton = previousTab
					? document.querySelector(
							`[data-wp-context*='"tabId":"${ previousTab }"'][role="tab"]`
					  )
					: null;
				const newButton = ref;

				// Dispatch "hide" event on previous tab (preventable)
				if ( previousButton ) {
					const hideEvent = new CustomEvent( 'hide.fs.tabs', {
						bubbles: true,
						cancelable: true,
						detail: {
							from: previousTab,
							to: context.tabId,
						},
					} );
					if ( ! previousButton.dispatchEvent( hideEvent ) ) {
						return; // Event was prevented
					}
				}

				// Dispatch "show" event on new tab (preventable)
				if ( newButton ) {
					const showEvent = new CustomEvent( 'show.fs.tabs', {
						bubbles: true,
						cancelable: true,
						detail: {
							from: previousTab,
							to: context.tabId,
						},
					} );
					if ( ! newButton.dispatchEvent( showEvent ) ) {
						return; // Event was prevented
					}
				}

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

								// Dispatch "hidden" event after animation completes
								if ( previousButton ) {
									previousButton.dispatchEvent(
										new CustomEvent( 'hidden.fs.tabs', {
											bubbles: true,
											detail: {
												from: previousTab,
												to: context.tabId,
											},
										} )
									);
								}
							};
							previousPanel.addEventListener(
								'transitionend',
								handleTransitionEnd,
								{ once: true }
							);
						} else {
							// Desktop: Fade transition - dispatch hidden immediately
							// (CSS handles the fade, no transitionend to wait for on hide side)
							if ( previousButton ) {
								previousButton.dispatchEvent(
									new CustomEvent( 'hidden.fs.tabs', {
										bubbles: true,
										detail: {
											from: previousTab,
											to: context.tabId,
										},
									} )
								);
							}
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

									// Dispatch "shown" event after animation completes
									if ( newButton ) {
										newButton.dispatchEvent(
											new CustomEvent( 'shown.fs.tabs', {
												bubbles: true,
												detail: {
													from: previousTab,
													to: context.tabId,
												},
											} )
										);
									}
								};
								newPanel.addEventListener(
									'transitionend',
									handleTransitionEnd,
									{ once: true }
								);
							} );
						} else {
							// Desktop: Fade transition - dispatch shown immediately
							// (CSS handles the fade on show side)
							if ( newButton ) {
								newButton.dispatchEvent(
									new CustomEvent( 'shown.fs.tabs', {
										bubbles: true,
										detail: {
											from: previousTab,
											to: context.tabId,
										},
									} )
								);
							}
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

/**
 * ============================================================================
 * CustomEvents API for Tabs Block
 * ============================================================================
 *
 * The tabs block dispatches 4 CustomEvents during tab switching:
 *
 * 1. hide.fs.tabs   - Fired on previous tab button before hiding (preventable)
 * 2. show.fs.tabs   - Fired on new tab button before showing (preventable)
 * 3. hidden.fs.tabs - Fired on previous tab button after hidden/animated
 * 4. shown.fs.tabs  - Fired on new tab button after shown/animated
 *
 * Event Details:
 * - from: ID of the previous tab (or null if first load)
 * - to: ID of the new tab being shown
 * - All events bubble and fire on the tab button element ([role="tab"])
 *
 * ============================================================================
 * COPY-PASTE TEST CODE (Open browser console and paste)
 * ============================================================================
 */

/* TEST 1: Log all tab events
// Copy everything between the asterisks to browser console

['hide', 'show', 'hidden', 'shown'].forEach(eventType => {
  document.addEventListener(`${eventType}.fs.tabs`, (e) => {
    console.log(`[${eventType}.fs.tabs]`, {
      target: e.target,
      from: e.detail.from,
      to: e.detail.to,
      timestamp: new Date().toISOString()
    });
  });
});
console.log('✅ Tab event listeners added. Switch tabs to see events.');

*/

/* TEST 2: Prevent switching to specific tab
// Change 'tab-2' to match your actual tab ID

document.addEventListener('show.fs.tabs', (e) => {
  if (e.detail.to === 'tab-2') {
    e.preventDefault();
    console.warn('🚫 Prevented switch to tab-2');
    alert('This tab is restricted!');
  }
});
console.log('✅ Tab restriction added. Try clicking the second tab.');

*/

/* TEST 3: Measure animation timing

const timings = {};

document.addEventListener('show.fs.tabs', (e) => {
  timings[e.detail.to] = { start: performance.now() };
});

document.addEventListener('shown.fs.tabs', (e) => {
  const timing = timings[e.detail.to];
  if (timing) {
    timing.end = performance.now();
    timing.duration = timing.end - timing.start;
    console.log(`⏱️ Tab ${e.detail.to} transition: ${timing.duration.toFixed(2)}ms`);
  }
});
console.log('✅ Timing tracker added. Switch tabs to see animation duration.');

*/

/* TEST 4: Analytics tracking

document.addEventListener('shown.fs.tabs', (e) => {
  const analyticsData = {
    event_category: 'engagement',
    event_action: 'tab_view',
    event_label: e.detail.to,
    from_tab: e.detail.from,
    timestamp: Date.now()
  };
  console.log('📊 Analytics:', analyticsData);
  // In production: gtag('event', 'tab_view', analyticsData);
});
console.log('✅ Analytics tracking added.');

*/

/* TEST 5: Lazy load content when tab shown

document.addEventListener('shown.fs.tabs', (e) => {
  const tabButton = e.target;
  const tabPanel = document.getElementById(tabButton.getAttribute('aria-controls'));
  const contentArea = tabPanel?.querySelector('.fs-tabs__panel-content');

  if (contentArea && !contentArea.dataset.loaded) {
    console.log(`📥 Loading content for ${e.detail.to}...`);

    setTimeout(() => {
      const newContent = document.createElement('div');
      newContent.className = 'lazy-loaded-content';
      newContent.innerHTML = `
        <h3>Lazy Loaded Content</h3>
        <p>This content was loaded when the tab was first opened.</p>
        <p>Time: ${new Date().toLocaleTimeString()}</p>
      `;
      contentArea.appendChild(newContent);
      contentArea.dataset.loaded = 'true';
      console.log(`✅ Content loaded for ${e.detail.to}`);
    }, 500);
  }
});
console.log('✅ Lazy loading added. Switch to each tab to trigger loading.');

*/

/* TEST 6: Synchronize multiple tab sets

document.addEventListener('show.fs.tabs', (e) => {
  const tabId = e.detail.to;
  const matchingTabs = document.querySelectorAll(
    `[role="tab"][data-wp-context*='"tabId":"${tabId}"']`
  );
  matchingTabs.forEach(tab => {
    if (tab !== e.target && !tab.classList.contains('is-active')) {
      console.log(`🔗 Syncing tab: ${tabId}`);
      tab.click();
    }
  });
});
console.log('✅ Tab synchronization added.');

*/

/* TEST 7: Visual feedback during transitions

document.addEventListener('show.fs.tabs', (e) => {
  e.target.style.opacity = '0.5';
  e.target.style.transition = 'opacity 0.3s';
  console.log(`⏳ Transition starting: ${e.detail.to}`);
});

document.addEventListener('shown.fs.tabs', (e) => {
  e.target.style.opacity = '1';
  console.log(`✅ Transition complete: ${e.detail.to}`);
});
console.log('✅ Visual feedback added.');

*/

/* TEST 8: Mobile vs Desktop detection

let mobileMode = window.innerWidth <= 767;
window.addEventListener('resize', () => {
  mobileMode = window.innerWidth <= 767;
});

document.addEventListener('shown.fs.tabs', (e) => {
  console.log(`📱 Tab shown on ${mobileMode ? 'MOBILE' : 'DESKTOP'} (${window.innerWidth}px)`);
});
console.log('✅ Mobile detection added. Resize window and switch tabs.');

*/

/* TEST 9: Visual event indicator on page

const indicator = document.createElement('div');
indicator.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #000;
  color: #fff;
  padding: 15px 20px;
  border-radius: 8px;
  font-family: monospace;
  font-size: 12px;
  z-index: 9999;
  max-width: 300px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
`;
indicator.innerHTML = '<strong>Tab Events:</strong><div id="event-log"></div>';
document.body.appendChild(indicator);

const log = document.getElementById('event-log');

['hide', 'show', 'hidden', 'shown'].forEach(eventType => {
  document.addEventListener(`${eventType}.fs.tabs`, (e) => {
    const entry = document.createElement('div');
    entry.textContent = `${eventType}: ${e.detail.from} → ${e.detail.to}`;
    entry.style.cssText = 'padding: 4px 0; border-top: 1px solid #333; margin-top: 4px;';
    log.insertBefore(entry, log.firstChild);
    while (log.children.length > 5) {
      log.removeChild(log.lastChild);
    }
  });
});
console.log('✅ Visual event indicator added to page.');

*/
