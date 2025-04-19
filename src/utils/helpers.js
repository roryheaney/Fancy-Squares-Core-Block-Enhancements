// utils/helpers.js
import {
	PADDING_SIDE_TYPES,
	MARGIN_SIDE_TYPES,
	NEGATIVE_MARGIN_SIDE_TYPES,
} from '../config/constants';

export function getDisplayValues( values, options, showValues ) {
	const result = [];
	for ( const value of values ) {
		const option = options.find( ( opt ) => opt.value === value );
		result.push(
			option ? ( showValues ? option.value : option.label ) : value
		);
	}
	return result;
}

export function getValuesFromDisplay( displayValues, options, showValues ) {
	const result = [];
	for ( const display of displayValues ) {
		const option = options.find( ( opt ) =>
			showValues ? opt.value === display : opt.label === display
		);
		result.push( option ? option.value : display );
	}
	return result;
}

export function getSuggestions( options, showValues ) {
	return options.map( ( item ) => ( showValues ? item.value : item.label ) );
}

export function generateAttributes() {
	const attributes = {};
	const breakpoints = [ 'Base', 'Sm', 'Md', 'Lg', 'Xl' ];
	const sides = [
		'All',
		'Horizontal',
		'Vertical',
		'Top',
		'Right',
		'Bottom',
		'Left',
	];

	// Generate padding attributes
	sides.forEach( ( side ) => {
		breakpoints.forEach( ( breakpoint ) => {
			const attrKey = `padding${ side }${ breakpoint }`;
			attributes[ attrKey ] = { type: 'string', default: '' };
		} );
	} );

	// Generate positive margin attributes
	sides.forEach( ( side ) => {
		breakpoints.forEach( ( breakpoint ) => {
			const attrKey = `margin${ side }${ breakpoint }`;
			attributes[ attrKey ] = { type: 'string', default: '' };
		} );
	} );

	// Generate negative margin attributes
	sides.forEach( ( side ) => {
		breakpoints.forEach( ( breakpoint ) => {
			const attrKey = `negativeMargin${ side }${ breakpoint }`;
			attributes[ attrKey ] = { type: 'string', default: '' };
		} );
	} );

	return attributes;
}

export const generateClassName = ( attributes, blockName, BLOCK_CONFIG ) => {
	const config = BLOCK_CONFIG[ blockName ] || {};
	const combinedTokens = [];

	// Add classes from FormTokenField
	for ( const classType of config.classOptions || [] ) {
		const classValue = attributes[ `${ classType }Classes` ] || [];
		combinedTokens.push( ...classValue );
	}

	// Add classes from dropdown
	const dropdownConfig = config.dropdown || {};
	const uniqueVal = attributes[ dropdownConfig.attributeKey ];
	if ( uniqueVal && uniqueVal !== 'none' && uniqueVal !== '' ) {
		combinedTokens.push( uniqueVal );
	}

	// Add width classes for core/column
	if ( config.hasWidthControls ) {
		const { widthBase, widthSm, widthMd, widthLg, widthXl, widthXXl } =
			attributes;
		if ( widthBase && widthBase !== 'auto' && widthBase !== '' ) {
			combinedTokens.push( widthBase );
		}
		if ( widthSm && widthSm !== 'auto' && widthSm !== '' ) {
			combinedTokens.push( widthSm );
		}
		if ( widthMd && widthMd !== 'auto' && widthMd !== '' ) {
			combinedTokens.push( widthMd );
		}
		if ( widthLg && widthLg !== 'auto' && widthLg !== '' ) {
			combinedTokens.push( widthLg );
		}
		if ( widthXl && widthXl !== 'auto' && widthXl !== '' ) {
			combinedTokens.push( widthXl );
		}
		if ( widthXXl && widthXXl !== 'auto' && widthXXl !== '' ) {
			combinedTokens.push( widthXXl );
		}
	}

	// Add padding classes
	const breakpoints = [ '', 'sm', 'md', 'lg', 'xl', 'xxl' ];

	PADDING_SIDE_TYPES.forEach( ( sideType ) => {
		breakpoints.forEach( ( breakpoint ) => {
			const attrKey = `${ sideType.key }${
				breakpoint
					? breakpoint.charAt( 0 ).toUpperCase() +
					  breakpoint.slice( 1 )
					: 'Base'
			}`;
			const value = attributes[ attrKey ];
			if ( value && value !== '' ) {
				const breakpointSuffix = breakpoint ? `-${ breakpoint }` : '';
				if ( Array.isArray( sideType.prefix ) ) {
					sideType.prefix.forEach( ( prefix ) => {
						combinedTokens.push(
							`${ prefix }${ breakpointSuffix }-${ value }`
						);
					} );
				} else {
					combinedTokens.push(
						`${ sideType.prefix }${ breakpointSuffix }-${ value }`
					);
				}
			}
		} );
	} );

	// Add positive margin classes
	MARGIN_SIDE_TYPES.forEach( ( sideType ) => {
		breakpoints.forEach( ( breakpoint ) => {
			const attrKey = `${ sideType.key }${
				breakpoint
					? breakpoint.charAt( 0 ).toUpperCase() +
					  breakpoint.slice( 1 )
					: 'Base'
			}`;
			const value = attributes[ attrKey ];
			if ( value && value !== '' ) {
				const breakpointSuffix = breakpoint ? `-${ breakpoint }` : '';
				if ( Array.isArray( sideType.prefix ) ) {
					sideType.prefix.forEach( ( prefix ) => {
						combinedTokens.push(
							`${ prefix }${ breakpointSuffix }-${ value }`
						);
					} );
				} else {
					combinedTokens.push(
						`${ sideType.prefix }${ breakpointSuffix }-${ value }`
					);
				}
			}
		} );
	} );

	// Add negative margin classes
	// utils/helpers.js (snippet)
	NEGATIVE_MARGIN_SIDE_TYPES.forEach( ( sideType ) => {
		breakpoints.forEach( ( breakpoint ) => {
			const attrKey = `${ sideType.key }${
				breakpoint
					? breakpoint.charAt( 0 ).toUpperCase() +
					  breakpoint.slice( 1 )
					: 'Base'
			}`;
			const value = attributes[ attrKey ];
			if ( value && value !== '' ) {
				const breakpointSuffix = breakpoint ? `-${ breakpoint }` : '';
				const negativeValue = Math.abs( parseInt( value ) );
				if ( Array.isArray( sideType.prefix ) ) {
					sideType.prefix.forEach( ( prefix ) => {
						combinedTokens.push(
							`${ prefix }${ breakpointSuffix }-n${ negativeValue }`
						);
					} );
				} else {
					combinedTokens.push(
						`${ sideType.prefix }${ breakpointSuffix }-n${ negativeValue }`
					);
				}
			}
		} );
	} );

	return combinedTokens.join( ' ' );
};
