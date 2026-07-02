const SELECT_NONE_OPTION = [ { label: 'Select one', value: 'none' } ];
const ALL_SPACING_SIDES = [
	'all',
	'horizontal',
	'vertical',
	'top',
	'right',
	'bottom',
	'left',
];
const EDGE_SPACING_SIDES = [ 'top', 'right', 'bottom', 'left' ];

const SHARED_SPACING_CONFIG = {
	allowedPaddingControls: ALL_SPACING_SIDES,
	allowedPositiveMarginControls: ALL_SPACING_SIDES,
};

const FS_SHARED_CLASS_OPTIONS = [ 'display', 'position', 'zindex' ];

const createFsSharedConfig = ( overrides = {} ) => ( {
	classOptions: [ ...FS_SHARED_CLASS_OPTIONS ],
	...SHARED_SPACING_CONFIG,
	...overrides,
} );

export const ALLOWED_BLOCKS = [
	'core/heading',
	'core/paragraph',
	'core/list',
	'core/list-item',
	'core/buttons',
	'core/columns',
	'core/column',
	'core/cover',
	'core/group',
];

export const BLOCK_CONFIG = {
	'core/heading': {
		classOptions: [ 'display', 'position', 'zindex', 'blendMode' ],
		dropdown: {
			attributeKey: 'headingDropdownValue',
			label: 'Heading Option',
			default: 'none',
			options: SELECT_NONE_OPTION,
		},
	},
	'core/paragraph': {
		classOptions: [ 'display', 'position', 'zindex' ],
		allowedPaddingControls: [ 'top', 'bottom' ],
		allowedPositiveMarginControls: [ 'all', 'vertical' ],
		allowedNegativeMarginControls: EDGE_SPACING_SIDES,
		dropdown: {
			attributeKey: 'paragraphDropdownValue',
			label: 'Paragraph Option',
			default: 'none',
			options: SELECT_NONE_OPTION,
		},
	},
	'core/list': {
		classOptions: [ 'display', 'position', 'zindex' ],
		dropdown: {
			attributeKey: 'listDropdownValue',
			label: 'List Option',
			default: 'none',
			options: SELECT_NONE_OPTION,
		},
	},
	'core/list-item': {
		classOptions: [ 'display', 'position', 'zindex' ],
		dropdown: {
			attributeKey: 'listItemDropdownValue',
			label: 'List Item Option',
			default: 'none',
			options: SELECT_NONE_OPTION,
		},
	},
	'core/buttons': {
		classOptions: [ 'display', 'margin', 'position', 'zindex' ],
		dropdown: {
			attributeKey: 'buttonDropdownValue',
			label: 'Button Option',
			default: 'none',
			options: SELECT_NONE_OPTION,
		},
	},
	'core/columns': {
		classOptions: [
			'display',
			'position',
			'zindex',
			'alignItems',
			'justifyContent',
		],
		hasConstrainToggle: true,
	},
	'core/column': {
		classOptions: [
			'display',
			'position',
			'zindex',
			'selfAlignment',
			'order',
		],
		hasWidthControls: true,
		allowedPaddingControls: ALL_SPACING_SIDES,
	},
	'core/cover': {
		classOptions: [ 'display', 'position', 'zindex', 'bleedCoverOptions' ],
		dropdown: {
			attributeKey: 'bleedCover',
			label: 'Bleed Options',
			default: '',
			options: [ { label: 'None', value: '' } ],
		},
	},
	'core/group': {
		classOptions: [ 'display', 'position', 'zindex', 'gapSpacing' ],
	},
	'fs-blocks/tabs-interactive': createFsSharedConfig(),
	'fs-blocks/advanced-dropdown': createFsSharedConfig(),
	'fs-blocks/accordion-interactive': createFsSharedConfig(),
	'fs-blocks/content-showcase': createFsSharedConfig(),
	'fs-blocks/showcase-gallery': createFsSharedConfig(),
	'fs-blocks/carousel': createFsSharedConfig(),
	'fs-blocks/alert': createFsSharedConfig( {
		classOptions: [ 'display' ],
	} ),
	'fs-blocks/index-block': createFsSharedConfig( {
		classOptions: [ 'position', 'zindex' ],
		allowedNegativeMarginControls: EDGE_SPACING_SIDES,
	} ),
	'fs-blocks/content-wrapper': createFsSharedConfig( {
		classOptions: [
			'display',
			'order',
			'selfAlignment',
			'position',
			'zindex',
		],
		allowedNegativeMarginControls: ALL_SPACING_SIDES,
	} ),
};
