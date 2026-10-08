// Config: responsive token coverage validation.
// Pure module (zero imports) so both editor bundles and Node scripts can use it.

export const DEFAULT_RESPONSIVE_SUFFIXES = [ 'sm', 'md', 'lg', 'xl', 'xxl' ];

const uniqueKeys = ( values ) =>
	[ ...new Set( values.filter( Boolean ) ) ];

export const getTokenBreakpointSuffix = ( token, allowedKeys = [] ) => {
	if ( typeof token !== 'string' ) {
		return null;
	}

	const segments = token.split( '-' );

	if ( segments.length < 3 ) {
		return null;
	}

	const recognized = uniqueKeys( [
		...DEFAULT_RESPONSIVE_SUFFIXES,
		...allowedKeys,
	] );

	// Prefix-style variants: d-{bp}-{display}, p-{bp}-{n}, order-{bp}-{n}.
	if ( recognized.includes( segments[ 1 ] ) ) {
		return segments[ 1 ];
	}

	// Property-style variants: align-items-{bp}-{align}, justify-content-{bp}-{x}.
	const tail = segments[ segments.length - 2 ];

	return recognized.includes( tail ) ? tail : null;
};

export const filterTokenOptions = ( options, allowedKeys = [] ) =>
	( Array.isArray( options ) ? options : [] ).filter( ( option ) => {
		if ( ! option || typeof option !== 'object' ) {
			return false;
		}

		const { label, value } = option;

		if ( typeof label !== 'string' || ! label.trim() ) {
			return false;
		}

		if ( typeof value !== 'string' || ! value.trim() ) {
			return false;
		}

		const suffix = getTokenBreakpointSuffix( value, allowedKeys );

		if ( suffix && ! allowedKeys.includes( suffix ) ) {
			return false;
		}

		return true;
	} );
