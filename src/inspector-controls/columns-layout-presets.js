import { getBreakpointAttributeKey } from '../config/breakpoints';

const BASE_COLUMN_WIDTH = 'wp-block-column--column-12';
const WIDTH_BREAKPOINTS_TO_CLEAR = [ 'sm', 'lg', 'xl', 'xxl' ];

export const COLUMN_LAYOUT_PRESETS = [
	{
		value: 'one-mobile-two-md',
		label: '1 mobile / 2 md+',
		mdColumns: 6,
		summary:
			'This will set Base to 12 columns and Md+ to 6 columns on each current child column.',
	},
	{
		value: 'one-mobile-three-md',
		label: '1 mobile / 3 md+',
		mdColumns: 4,
		summary:
			'This will set Base to 12 columns and Md+ to 4 columns on each current child column.',
	},
	{
		value: 'one-mobile-four-md',
		label: '1 mobile / 4 md+',
		mdColumns: 3,
		summary:
			'This will set Base to 12 columns and Md+ to 3 columns on each current child column.',
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

	const mdColumnWidth = `wp-block-column--column-md-${ preset.mdColumns }`;
	const updates = {
		[ getBreakpointAttributeKey( 'width', '' ) ]: BASE_COLUMN_WIDTH,
		[ getBreakpointAttributeKey( 'width', 'md' ) ]: mdColumnWidth,
	};

	for ( const breakpoint of WIDTH_BREAKPOINTS_TO_CLEAR ) {
		updates[ getBreakpointAttributeKey( 'width', breakpoint ) ] = '';
	}

	return updates;
};
