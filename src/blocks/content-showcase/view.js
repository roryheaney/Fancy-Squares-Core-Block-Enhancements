import { store, getContext, getElement } from '@wordpress/interactivity';

store( 'fancySquaresContentShowcase', {
	state: {
		get isActiveMedia() {
			const context = getContext();
			return context.activeItemId === context.itemId;
		},
		get hasActiveMedia() {
			const context = getContext();
			return (
				context.itemsData?.[ context.activeItemId ]?.hasMedia ?? false
			);
		},
	},
	callbacks: {
		initShowcase() {
			const { ref } = getElement();

			if ( ! ref ) {
				return;
			}

			const context = getContext();

			const eventName =
				context.sourceEventName && context.sourceEventName.trim()
					? context.sourceEventName
					: 'shown.fs.accordion';

			const handleAccordionShown = ( event ) => {
				const newItemId = event.detail?.itemId;
				if ( ! newItemId ) {
					return;
				}

				const hasMedia =
					context.itemsData?.[ newItemId ]?.hasMedia ?? false;

				if ( hasMedia ) {
					context.activeItemId = newItemId;
				}
			};

			ref.addEventListener( eventName, handleAccordionShown );

			return () => {
				ref.removeEventListener( eventName, handleAccordionShown );
			};
		},
	},
} );
