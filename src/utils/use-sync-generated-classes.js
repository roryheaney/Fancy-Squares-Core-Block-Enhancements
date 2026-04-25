import { useEffect } from '@wordpress/element';

const normalizeClassTokens = ( value ) => {
	if ( ! value ) {
		return [];
	}

	if ( Array.isArray( value ) ) {
		return value.filter( Boolean );
	}

	return String( value ).split( /\s+/ ).filter( Boolean );
};

const areTokenListsEqual = ( left, right ) => {
	if ( left.length !== right.length ) {
		return false;
	}

	for ( let index = 0; index < left.length; index++ ) {
		if ( left[ index ] !== right[ index ] ) {
			return false;
		}
	}

	return true;
};

export const useSyncGeneratedClasses = ( {
	additionalClasses,
	generatedClassName,
	setAttributes,
} ) => {
	useEffect( () => {
		const currentClasses = normalizeClassTokens( additionalClasses );
		const nextClasses = normalizeClassTokens( generatedClassName );

		if ( areTokenListsEqual( currentClasses, nextClasses ) ) {
			return;
		}

		setAttributes( { additionalClasses: nextClasses } );
	}, [ additionalClasses, generatedClassName, setAttributes ] );
};
