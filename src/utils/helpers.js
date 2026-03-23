// utils/helpers.js
import {
	PADDING_SIDE_TYPES,
	MARGIN_SIDE_TYPES,
	NEGATIVE_MARGIN_SIDE_TYPES,
} from '../config/constants';
import {
	getBreakpointAttributeKey,
	getBreakpointAttributeSuffix,
	SPACING_BREAKPOINT_KEYS,
	WIDTH_BREAKPOINT_KEYS,
} from '../config/breakpoints';

const SPACING_CONTROL_SUFFIXES = {
	all: 'All',
	horizontal: 'Horizontal',
	vertical: 'Vertical',
	top: 'Top',
	right: 'Right',
	bottom: 'Bottom',
	left: 'Left',
};

const SPACING_CONTROL_KEYS = Object.keys( SPACING_CONTROL_SUFFIXES );

const getAllowedControls = ( controls ) => {
	if ( ! Array.isArray( controls ) || controls.length === 0 ) {
		return [];
	}

	return controls.filter( ( control ) =>
		Object.prototype.hasOwnProperty.call(
			SPACING_CONTROL_SUFFIXES,
			control
		)
	);
};

const addSpacingAttributes = ( attributes, prefix, controls ) => {
	for ( const control of controls ) {
		const suffix = SPACING_CONTROL_SUFFIXES[ control ];
		for ( const breakpointKey of SPACING_BREAKPOINT_KEYS ) {
			attributes[
				`${ prefix }${ suffix }${ getBreakpointAttributeSuffix(
					breakpointKey
				) }`
			] = {
				type: 'string',
				default: '',
			};
		}
	}
};

const getNegativeSpacingSlug = ( value ) => {
	if ( value === undefined || value === null ) {
		return '';
	}

	const raw = String( value ).trim();
	if ( ! raw || raw === '0' || raw === '-0' ) {
		return '';
	}

	if ( raw.startsWith( '-' ) ) {
		return raw.slice( 1 );
	}

	if ( raw.startsWith( 'n' ) ) {
		return raw.slice( 1 );
	}

	return raw;
};
export function getDisplayValues( values, options, showValues ) {
	const result = [];
	for ( const value of values ) {
		const option = options.find( ( opt ) => opt.value === value );
		if ( option ) {
			result.push( showValues ? option.value : option.label );
		} else {
			result.push( value );
		}
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

export function generateAttributes( config = null ) {
	const attributes = {};

	const isLegacyCall = ! config;
	const paddingControls = isLegacyCall
		? SPACING_CONTROL_KEYS
		: getAllowedControls( config.allowedPaddingControls );
	const positiveMarginControls = isLegacyCall
		? SPACING_CONTROL_KEYS
		: getAllowedControls( config.allowedPositiveMarginControls );
	const negativeMarginControls = isLegacyCall
		? SPACING_CONTROL_KEYS
		: getAllowedControls( config.allowedNegativeMarginControls );

	addSpacingAttributes( attributes, 'padding', paddingControls );
	addSpacingAttributes( attributes, 'margin', positiveMarginControls );
	addSpacingAttributes(
		attributes,
		'negativeMargin',
		negativeMarginControls
	);

	for ( const classType of config?.classOptions || [] ) {
		attributes[ `${ classType }Classes` ] = {
			type: 'array',
			items: { type: 'string' },
			default: [],
		};
	}

	if ( config?.dropdown?.attributeKey ) {
		attributes[ config.dropdown.attributeKey ] = {
			type: 'string',
			default: config.dropdown.default || 'none',
		};
	}

	if ( config?.hasWidthControls ) {
		for ( const breakpointKey of WIDTH_BREAKPOINT_KEYS ) {
			attributes[ getBreakpointAttributeKey( 'width', breakpointKey ) ] =
				{
					type: 'string',
					default: '',
				};
		}
	}

	if ( config?.hasConstrainToggle ) {
		attributes.isConstrained = {
			type: 'boolean',
			default: false,
		};
	}

	return attributes;
}

export const generateClassName = ( attributes, blockName, BLOCK_CONFIG ) => {
	const config = BLOCK_CONFIG[ blockName ] || {};
	const combinedTokens = [];

	if ( config.hasConstrainToggle && attributes.isConstrained ) {
		combinedTokens.push( 'wp-block-columns--constrained' );
	}

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

	// Add width classes for blocks using width controls.
	if ( config.hasWidthControls ) {
		for ( const breakpointKey of WIDTH_BREAKPOINT_KEYS ) {
			const widthAttrKey = getBreakpointAttributeKey(
				'width',
				breakpointKey
			);
			const widthValue = attributes[ widthAttrKey ];
			if ( widthValue && widthValue !== 'auto' && widthValue !== '' ) {
				combinedTokens.push( widthValue );
			}
		}
	}

	// Add spacing classes.
	const breakpoints = SPACING_BREAKPOINT_KEYS;

	PADDING_SIDE_TYPES.forEach( ( sideType ) => {
		breakpoints.forEach( ( breakpoint ) => {
			const attrKey = `${ sideType.key }${ getBreakpointAttributeSuffix(
				breakpoint
			) }`;
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

	MARGIN_SIDE_TYPES.forEach( ( sideType ) => {
		breakpoints.forEach( ( breakpoint ) => {
			const attrKey = `${ sideType.key }${ getBreakpointAttributeSuffix(
				breakpoint
			) }`;
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

	NEGATIVE_MARGIN_SIDE_TYPES.forEach( ( sideType ) => {
		breakpoints.forEach( ( breakpoint ) => {
			const attrKey = `${ sideType.key }${ getBreakpointAttributeSuffix(
				breakpoint
			) }`;
			const value = attributes[ attrKey ];
			const negativeSlug = getNegativeSpacingSlug( value );
			if ( negativeSlug ) {
				const breakpointSuffix = breakpoint ? `-${ breakpoint }` : '';
				if ( Array.isArray( sideType.prefix ) ) {
					sideType.prefix.forEach( ( prefix ) => {
						combinedTokens.push(
							`${ prefix }${ breakpointSuffix }-n${ negativeSlug }`
						);
					} );
				} else {
					combinedTokens.push(
						`${ sideType.prefix }${ breakpointSuffix }-n${ negativeSlug }`
					);
				}
			}
		} );
	} );

	return combinedTokens.join( ' ' );
};
