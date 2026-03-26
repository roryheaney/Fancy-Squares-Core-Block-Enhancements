import {
	store,
	getContext,
	getElement,
	withSyncEvent,
} from '@wordpress/interactivity';

const findDropdownRoot = ( ref ) =>
	ref?.closest( '[data-fs-advanced-dropdown-root]' );

const MOBILE_MEDIA_QUERY = '(max-width: 781px)';
const DESKTOP_PANELS_SELECTOR = '.fs-advanced-dropdown__desktop-panels';
const PANEL_SELECTOR = '.fs-advanced-dropdown__panel[data-fs-item-id]';
const ITEM_SELECTOR = '.fs-advanced-dropdown__item[data-fs-item-id]';

const getToggleButtons = ( root ) =>
	Array.from(
		root?.querySelectorAll( '.fs-advanced-dropdown__toggle' ) || []
	);

const getDefaultItemId = ( context ) =>
	context.defaultFirstItemVisible && context.defaultItemId
		? context.defaultItemId
		: '';

const isMobileListOnlyMode = ( context ) =>
	context.leftMobileBehavior === 'list-only' &&
	Boolean( context.isMobileViewport );

const getResolvedItemId = ( context ) =>
	isMobileListOnlyMode( context )
		? ''
		: context.activeItem || getDefaultItemId( context );

const openCurrentItem = ( context ) => {
	if ( ! context.itemId ) {
		return;
	}

	context.activeItem = context.itemId;
};

const closeCurrentItem = ( context ) => {
	if ( ! context.itemId ) {
		return;
	}

	if ( getResolvedItemId( context ) === context.itemId ) {
		context.activeItem = '';
	}
};

const placePanelsForViewport = ( root, useMobileLayout ) => {
	if ( ! root ) {
		return;
	}

	const desktopPanelsContainer = root.querySelector(
		DESKTOP_PANELS_SELECTOR
	);
	if ( ! desktopPanelsContainer ) {
		return;
	}

	const panels = Array.from( root.querySelectorAll( PANEL_SELECTOR ) );
	if ( panels.length === 0 ) {
		return;
	}

	if ( ! useMobileLayout ) {
		for ( const panel of panels ) {
			if ( panel.parentElement !== desktopPanelsContainer ) {
				desktopPanelsContainer.appendChild( panel );
			}
		}
		return;
	}

	const itemsById = new Map(
		Array.from( root.querySelectorAll( ITEM_SELECTOR ) ).map( ( item ) => [
			item.getAttribute( 'data-fs-item-id' ),
			item,
		] )
	);

	for ( const panel of panels ) {
		const itemId = panel.getAttribute( 'data-fs-item-id' );
		if ( ! itemId || ! itemsById.has( itemId ) ) {
			continue;
		}

		const item = itemsById.get( itemId );
		if ( panel.parentElement !== item ) {
			item.appendChild( panel );
		}
	}
};

store( 'fancySquaresAdvancedDropdown', {
	state: {
		get isActive() {
			const context = getContext();
			return getResolvedItemId( context ) === context.itemId;
		},
		get isHidden() {
			const context = getContext();
			return getResolvedItemId( context ) !== context.itemId;
		},
		get ariaExpanded() {
			const context = getContext();
			return getResolvedItemId( context ) === context.itemId
				? 'true'
				: 'false';
		},
	},
	callbacks: {
		initResponsivePanelsLayout() {
			const { ref } = getElement();
			if ( ! ref ) {
				return;
			}

			const desktopPanelsContainer = ref.querySelector(
				DESKTOP_PANELS_SELECTOR
			);
			if ( ! desktopPanelsContainer ) {
				return;
			}
			const context = getContext();

			const mediaQuery = window.matchMedia( MOBILE_MEDIA_QUERY );
			const syncPlacement = () => {
				context.isMobileViewport = mediaQuery.matches;
				const useMobileLayout =
					mediaQuery.matches &&
					context.leftMobileBehavior !== 'list-only';
				placePanelsForViewport( ref, useMobileLayout );
			};

			syncPlacement();

			if ( typeof mediaQuery.addEventListener === 'function' ) {
				mediaQuery.addEventListener( 'change', syncPlacement );
			} else if ( typeof mediaQuery.addListener === 'function' ) {
				mediaQuery.addListener( syncPlacement );
			}

			return () => {
				if ( typeof mediaQuery.removeEventListener === 'function' ) {
					mediaQuery.removeEventListener( 'change', syncPlacement );
				} else if ( typeof mediaQuery.removeListener === 'function' ) {
					mediaQuery.removeListener( syncPlacement );
				}
			};
		},
	},
	actions: {
		toggleItem: () => {
			const context = getContext();
			if ( ! context.itemId ) {
				return;
			}

			context.activeItem =
				getResolvedItemId( context ) === context.itemId
					? ''
					: context.itemId;
		},
		openItemOnHover: () => {
			openCurrentItem( getContext() );
		},
		closeItemOnHover: () => {
			closeCurrentItem( getContext() );
		},
		openItemOnFocus: () => {
			openCurrentItem( getContext() );
		},
		handleItemFocusOut: ( event ) => {
			const { ref } = getElement();
			if ( ! ref ) {
				return;
			}

			const nextFocusTarget = event.relatedTarget;
			if ( nextFocusTarget && ref.contains( nextFocusTarget ) ) {
				return;
			}

			closeCurrentItem( getContext() );
		},
		handleItemKeyDown: withSyncEvent( ( event ) => {
			if ( event.key !== 'Escape' ) {
				return;
			}

			event.preventDefault();

			const { ref } = getElement();
			const context = getContext();
			closeCurrentItem( context );

			let toggleButton = ref?.querySelector(
				'.fs-advanced-dropdown__toggle'
			);
			if ( ! toggleButton && context.itemId ) {
				const root = findDropdownRoot( ref );
				toggleButton = root?.querySelector(
					`.fs-advanced-dropdown__item[data-fs-item-id="${ context.itemId }"] .fs-advanced-dropdown__toggle`
				);
			}
			if ( toggleButton ) {
				toggleButton.focus();
			}
		} ),
		handleToggleKeyDown: withSyncEvent( ( event ) => {
			const context = getContext();
			if ( event.key === 'Escape' ) {
				event.preventDefault();
				closeCurrentItem( context );
				return;
			}

			if (
				! [
					'ArrowDown',
					'ArrowUp',
					'ArrowRight',
					'ArrowLeft',
					'Home',
					'End',
				].includes( event.key )
			) {
				return;
			}

			const { ref } = getElement();
			if ( ! ref ) {
				return;
			}

			const root = findDropdownRoot( ref );
			if ( ! root ) {
				return;
			}

			const toggles = getToggleButtons( root );
			if ( toggles.length < 2 ) {
				return;
			}

			const currentIndex = toggles.indexOf( ref );
			if ( currentIndex === -1 ) {
				return;
			}

			let nextIndex = -1;
			switch ( event.key ) {
				case 'ArrowDown':
				case 'ArrowRight':
					event.preventDefault();
					nextIndex = ( currentIndex + 1 ) % toggles.length;
					break;
				case 'ArrowUp':
				case 'ArrowLeft':
					event.preventDefault();
					nextIndex =
						( currentIndex - 1 + toggles.length ) % toggles.length;
					break;
				case 'Home':
					event.preventDefault();
					nextIndex = 0;
					break;
				case 'End':
					event.preventDefault();
					nextIndex = toggles.length - 1;
					break;
			}

			if ( nextIndex >= 0 && toggles[ nextIndex ] ) {
				toggles[ nextIndex ].focus();
			}
		} ),
	},
} );
