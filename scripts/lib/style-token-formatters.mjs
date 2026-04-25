const formatKey = ( key ) => {
	if ( /^\d+$/.test( key ) ) {
		return key;
	}
	if ( /^[a-zA-Z_-][a-zA-Z0-9_-]*$/.test( key ) ) {
		return key;
	}
	return `"${ key }"`;
};

export const toSassValue = ( value ) => {
	if ( value === null || value === undefined ) {
		return 'null';
	}
	if ( typeof value === 'number' || typeof value === 'boolean' ) {
		return String( value );
	}
	if ( Array.isArray( value ) ) {
		return `( ${ value.map( toSassValue ).join( ', ' ) } )`;
	}
	if ( typeof value === 'object' ) {
		return toSassMap( value );
	}
	return String( value );
};

export const toSassMap = ( obj ) => {
	const entries = Object.entries( obj || {} ).map(
		( [ key, value ] ) => `${ formatKey( key ) }: ${ toSassValue( value ) }`
	);
	return `( ${ entries.join( ', ' ) } )`;
};

const getSpacingScaleLabel = ( slug, spacingScaleMeta ) => {
	const meta = spacingScaleMeta[ slug ];
	if ( meta && typeof meta === 'object' && meta.name ) {
		return `${ meta.name } (${ slug })`;
	}
	return String( slug );
};

const isZeroSpacingSlug = ( slug ) => String( slug ).trim() === '0';

const getBreakpointLabelSuffix = ( breakpoint ) =>
	breakpoint ? ` (${ breakpoint.toUpperCase() })` : '';

export const buildSpacingOptions = ( {
	spacingScaleKeys,
	spacingScaleMeta,
	responsiveBreakpointKeys,
} ) => {
	const spacingSides = [
		{ key: '', label: 'All' },
		{ key: 't', label: 'Top' },
		{ key: 'b', label: 'Bottom' },
		{ key: 's', label: 'Start' },
		{ key: 'e', label: 'End' },
		{ key: 'x', label: 'Horizontal' },
		{ key: 'y', label: 'Vertical' },
	];
	const allBreakpoints = [ '', ...responsiveBreakpointKeys ];
	const paddingOptions = [];
	const marginOptions = [];
	const gapOptions = [];

	for ( const breakpoint of allBreakpoints ) {
		const breakpointSuffix = breakpoint ? `-${ breakpoint }` : '';
		const breakpointLabel = getBreakpointLabelSuffix( breakpoint );

		for ( const side of spacingSides ) {
			for ( const size of spacingScaleKeys ) {
				const label = getSpacingScaleLabel( size, spacingScaleMeta );
				paddingOptions.push( {
					label: `Padding ${ side.label }${ breakpointLabel } ${ label }`,
					value: `p${ side.key }${ breakpointSuffix }-${ size }`,
				} );
				marginOptions.push( {
					label: `Margin ${ side.label }${ breakpointLabel } ${ label }`,
					value: `m${ side.key }${ breakpointSuffix }-${ size }`,
				} );

				if ( ! isZeroSpacingSlug( size ) ) {
					marginOptions.push( {
						label: `Negative Margin ${ side.label }${ breakpointLabel } ${ label }`,
						value: `m${ side.key }${ breakpointSuffix }-n${ size }`,
					} );
				}
			}

			marginOptions.push( {
				label: `Margin ${ side.label }${ breakpointLabel } Auto`,
				value: `m${ side.key }${ breakpointSuffix }-auto`,
			} );
		}

		const gapTypes = [
			{ key: 'gap', label: 'Gap' },
			{ key: 'row-gap', label: 'Row Gap' },
			{ key: 'column-gap', label: 'Column Gap' },
		];

		for ( const type of gapTypes ) {
			for ( const size of spacingScaleKeys ) {
				gapOptions.push( {
					label: `${ type.label }${ breakpointLabel } ${ getSpacingScaleLabel(
						size,
						spacingScaleMeta
					) }`,
					value: `${ type.key }${ breakpointSuffix }-${ size }`,
				} );
			}
		}
	}

	return {
		paddingOptions,
		marginOptions,
		gapOptions,
	};
};
