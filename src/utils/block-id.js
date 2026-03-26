import { store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

export const sanitizeDomIdToken = ( value ) =>
	String( value || '' )
		.trim()
		.toLowerCase()
		.replace( /[^a-z0-9_-]+/g, '-' )
		.replace( /^-+|-+$/g, '' );

export const flattenBlockTree = ( blocks = [] ) => {
	const flattened = [];
	const walk = ( list ) => {
		list.forEach( ( block ) => {
			flattened.push( block );
			if (
				Array.isArray( block?.innerBlocks ) &&
				block.innerBlocks.length
			) {
				walk( block.innerBlocks );
			}
		} );
	};

	walk( blocks );
	return flattened;
};

const getUniqueIdFromBase = ( baseId, usedIds ) => {
	if ( ! usedIds.has( baseId ) ) {
		return baseId;
	}

	let suffix = 2;
	let candidate = `${ baseId }-${ suffix }`;

	while ( usedIds.has( candidate ) ) {
		suffix += 1;
		candidate = `${ baseId }-${ suffix }`;
	}

	return candidate;
};

export const useEnsureUniqueAttributeId = ( {
	clientId,
	blockName,
	attributeKey,
	setAttributes,
} ) => {
	const { shouldRegenerate, currentValue, priorValues } = useSelect(
		( select ) => {
			const { getBlocks } = select( blockEditorStore );
			const allBlocks = flattenBlockTree( getBlocks() );
			const scopedBlocks = allBlocks.filter(
				( block ) => block.name === blockName
			);

			const entries = scopedBlocks.map( ( block ) => ( {
				clientId: block.clientId,
				value: sanitizeDomIdToken(
					block?.attributes?.[ attributeKey ]
				),
			} ) );

			const currentIndex = entries.findIndex(
				( entry ) => entry.clientId === clientId
			);

			if ( currentIndex < 0 ) {
				return {
					shouldRegenerate: false,
					currentValue: '',
					priorValues: [],
				};
			}

			const currentEntry = entries[ currentIndex ];
			const priorEntries = entries.slice( 0, currentIndex );
			const hasPriorCollision =
				!! currentEntry.value &&
				priorEntries.some(
					( entry ) => entry.value === currentEntry.value
				);

			const shouldSetId = ! currentEntry.value || hasPriorCollision;

			return {
				shouldRegenerate: shouldSetId,
				currentValue: currentEntry.value,
				priorValues: priorEntries
					.filter( ( entry ) => !! entry.value )
					.map( ( entry ) => entry.value ),
			};
		},
		[ clientId, blockName, attributeKey ]
	);

	useEffect( () => {
		if ( ! shouldRegenerate ) {
			return;
		}

		const baseId = sanitizeDomIdToken( clientId );
		if ( ! baseId ) {
			return;
		}

		const usedIdSet = new Set( priorValues );
		const nextId = getUniqueIdFromBase( baseId, usedIdSet );

		if ( nextId && nextId !== currentValue ) {
			setAttributes( { [ attributeKey ]: nextId } );
		}
	}, [
		attributeKey,
		clientId,
		currentValue,
		priorValues,
		setAttributes,
		shouldRegenerate,
	] );
};
