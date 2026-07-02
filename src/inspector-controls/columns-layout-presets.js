import {
	getBreakpointAttributeKey,
	WIDTH_BREAKPOINT_KEYS,
} from '../config/breakpoints';

const buildWidthClass = ( breakpoint, count ) =>
	breakpoint
		? `wp-block-column--column-${ breakpoint }-${ count }`
		: `wp-block-column--column-${ count }`;

export const COLUMN_LAYOUT_PRESETS = [
	{
		value: 'one-mobile-two-md',
		label: '1 mobile / 2 md+',
		widths: { '': 12, md: 6 },
		summary:
			'This will set Base to 12 columns and Md+ to 6 columns on each current child column.',
	},
	{
		value: 'one-mobile-three-md',
		label: '1 mobile / 3 md+',
		widths: { '': 12, md: 4 },
		summary:
			'This will set Base to 12 columns and Md+ to 4 columns on each current child column.',
	},
	{
		value: 'one-mobile-four-md',
		label: '1 mobile / 4 md+',
		widths: { '': 12, md: 3 },
		summary:
			'This will set Base to 12 columns and Md+ to 3 columns on each current child column.',
	},
	{
		value: 'one-mobile-two-md-four-lg',
		label: '1 mobile / 2 md / 4 lg+',
		widths: { '': 12, md: 6, lg: 3 },
		summary:
			'This will set Base to 12 columns, Md to 6 columns, and Lg+ to 3 columns on each current child column.',
	},
];

export const getColumnsLayoutPreset = ( presetValue ) =>
	COLUMN_LAYOUT_PRESETS.find( ( preset ) => preset.value === presetValue ) ||
	null;

export const getColumnsLayoutPresetAttributeUpdates = ( presetValue ) => {
	const preset = getColumnsLayoutPreset( presetValue );
	if ( ! preset ) {
		return null;
	}

	const updates = {};

	for ( const breakpoint of WIDTH_BREAKPOINT_KEYS ) {
		const count = preset.widths[ breakpoint ];
		updates[ getBreakpointAttributeKey( 'width', breakpoint ) ] =
			count === undefined ? '' : buildWidthClass( breakpoint, count );
	}

	return updates;
};

export const getColumnsLayoutResetAttributeUpdates = () => {
	const updates = {};

	for ( const breakpoint of WIDTH_BREAKPOINT_KEYS ) {
		updates[ getBreakpointAttributeKey( 'width', breakpoint ) ] = '';
	}

	return updates;
};
