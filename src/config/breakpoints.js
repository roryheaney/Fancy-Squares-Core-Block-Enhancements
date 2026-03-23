import {
	frameworkBreakpointKeys,
	frameworkTokens,
} from './generated/framework-tokens';

const DEFAULT_BREAKPOINT_KEYS = [ 'xs', 'sm', 'md', 'lg', 'xl', 'xxl' ];
const LEGACY_ATTRIBUTE_SUFFIX_MAP = {
	'': 'Base',
	sm: 'Sm',
	md: 'Md',
	lg: 'Lg',
	xl: 'Xl',
	xxl: 'XXl',
};
const DEVICE_LABELS = {
	sm: 'Mobile',
	md: 'Tablet',
	lg: 'Laptop',
	xl: 'Larger Screen',
	xxl: 'XXL Screen',
};
const TAB_SHORT_LABELS = {
	sm: 'Sm',
	md: 'Md',
	lg: 'Lg',
	xl: 'Xl',
	xxl: 'Xxl',
};
const WIDTH_ICON_KEYS = {
	sm: 'mobile',
	md: 'tablet',
	lg: 'laptop',
	xl: 'desktop',
	xxl: 'desktop',
};

const toPascalCase = ( value ) =>
	value
		.split( /[^a-zA-Z0-9]+/ )
		.filter( Boolean )
		.map(
			( segment ) =>
				segment.charAt( 0 ).toUpperCase() + segment.slice( 1 )
		)
		.join( '' );

const uniqueKeys = ( values ) => [ ...new Set( values.filter( Boolean ) ) ];

const tokenBreakpointKeys = uniqueKeys( [
	...( Array.isArray( frameworkBreakpointKeys )
		? frameworkBreakpointKeys
		: [] ),
	...Object.keys( frameworkTokens?.gridBreakpoints || {} ),
] );

const orderedTokenKeys = [
	...DEFAULT_BREAKPOINT_KEYS.filter( ( key ) =>
		tokenBreakpointKeys.includes( key )
	),
	...tokenBreakpointKeys.filter(
		( key ) => ! DEFAULT_BREAKPOINT_KEYS.includes( key )
	),
];

export const BREAKPOINT_KEYS =
	orderedTokenKeys.length > 0 ? orderedTokenKeys : DEFAULT_BREAKPOINT_KEYS;

export const RESPONSIVE_BREAKPOINT_KEYS = BREAKPOINT_KEYS.filter(
	( key ) => key !== 'xs'
);

export const SPACING_BREAKPOINT_KEYS = [ '', ...RESPONSIVE_BREAKPOINT_KEYS ];
export const WIDTH_BREAKPOINT_KEYS = [ '', ...RESPONSIVE_BREAKPOINT_KEYS ];

export const getBreakpointAttributeSuffix = ( key ) => {
	if (
		Object.prototype.hasOwnProperty.call( LEGACY_ATTRIBUTE_SUFFIX_MAP, key )
	) {
		return LEGACY_ATTRIBUTE_SUFFIX_MAP[ key ];
	}
	return key ? toPascalCase( key ) : 'Base';
};

export const getBreakpointAttributeKey = ( prefix, key ) =>
	`${ prefix }${ getBreakpointAttributeSuffix( key ) }`;

export const getBreakpointDimension = ( key ) => {
	if ( ! key ) {
		return 'All';
	}
	const value = frameworkTokens?.gridBreakpoints?.[ key ];
	return value ? `>=${ value }` : key.toUpperCase();
};

export const getSpacingBreakpointLabel = ( key ) => {
	if ( ! key ) {
		return 'Base';
	}
	const humanLabel = DEVICE_LABELS[ key ] || key.toUpperCase();
	return `${ humanLabel } (${ key })`;
};

export const getWidthBreakpointLabel = ( key ) => {
	if ( ! key ) {
		return 'Base';
	}
	return DEVICE_LABELS[ key ] || key.toUpperCase();
};

export const getWidthBreakpointShortLabel = ( key ) => {
	if ( ! key ) {
		return 'Base';
	}
	return TAB_SHORT_LABELS[ key ] || key.toUpperCase();
};

export const getWidthIconKey = ( key ) => {
	if ( ! key || key === 'xs' ) {
		return 'mobile';
	}
	return WIDTH_ICON_KEYS[ key ] || 'desktop';
};
