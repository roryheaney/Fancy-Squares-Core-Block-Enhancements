import {
	displayOptions,
	marginOptions,
	paddingOptions,
	positionOptions,
	zindexOptions,
	blendModeOptions,
	alignItemsOptions,
	selfAlignmentOptions,
	justifyContentOptions,
	orderOptions,
	gapOptions
} from '../../data/bootstrap-classes/classes.js';

export const ALLOWED_BLOCKS = [
	'core/heading',
	'core/paragraph',
	'core/list',
	'core/list-item',
	'core/buttons',
	'core/columns',
	'core/column',
	'core/group',
];

export const BREAKPOINT_DIMENSIONS = {
	'': 'All',
	sm: '≥576px',
	md: '≥768px',
	lg: '≥992px',
	xl: '≥1200px',
	xxl: '≥1400px',
};

export const BLOCK_CONFIG = {
	'core/heading': {
		classOptions: [ 'display', 'position', 'zindex', 'blendMode' ],
		dropdown: {
			attributeKey: 'headingDropdownValue',
			label: 'Heading Option',
			default: 'none',
			options: [ { label: 'Select one', value: 'none' } ],
		},
	},
	'core/paragraph': {
		classOptions: [ 'display', 'position', 'zindex' ],
		dropdown: {
			attributeKey: 'paragraphDropdownValue',
			label: 'Paragraph Option',
			default: 'none',
			options: [ { label: 'Select one', value: 'none' } ],
		},
	},
	'core/list': {
		classOptions: [ 'display', 'position', 'zindex' ],
		dropdown: {
			attributeKey: 'listDropdownValue',
			label: 'List Option',
			default: 'none',
			options: [ { label: 'Select one', value: 'none' } ],
		},
	},
	'core/list-item': {
		classOptions: [ 'display', 'position', 'zindex' ],
		dropdown: {
			attributeKey: 'listItemDropdownValue',
			label: 'List Item Option',
			default: 'none',
			options: [ { label: 'Select one', value: 'none' } ],
		},
	},
	'core/buttons': {
		classOptions: [ 'display', 'margin', 'position', 'zindex' ],
		dropdown: {
			attributeKey: 'buttonDropdownValue',
			label: 'Button Option',
			default: 'none',
			options: [ { label: 'Select one', value: 'none' } ],
		},
	},
	'core/columns': {
		classOptions: [
			'display',
			'position',
			'zindex',
			'alignItems',
			'justifyContent',
		], // Added alignItems for controlling child column alignment
		dropdown: {
			attributeKey: 'columnsLayout',
			label: 'Columns Layout',
			default: '',
			options: [
				{ label: 'Inherit from Columns', value: '' },
				{
					label: '1 across all',
					value: 'cols-mobile-1 cols-tablet-1 cols-desktop-1',
				},
				{
					label: '2 across all',
					value: 'cols-mobile-2 cols-tablet-2 cols-desktop-2',
				},
				{
					label: '3 across all',
					value: 'cols-mobile-3 cols-tablet-3 cols-desktop-3',
				},
				{
					label: '4 across all',
					value: 'cols-mobile-4 cols-tablet-4 cols-desktop-4',
				},
				{
					label: '5 across all',
					value: 'cols-mobile-5 cols-tablet-5 cols-desktop-5',
				},
				{
					label: '6 across all',
					value: 'cols-mobile-6 cols-tablet-6 cols-desktop-6',
				},
				{
					label: '1 mobile, 2 tablet, 3 desktop',
					value: 'cols-mobile-1 cols-tablet-2 cols-desktop-3',
				},
				{
					label: '2 mobile, 3 tablet, 4 desktop',
					value: 'cols-mobile-2 cols-tablet-3 cols-desktop-4',
				},
				{
					label: '3 mobile, 4 tablet, 6 desktop',
					value: 'cols-mobile-3 cols-tablet-4 cols-desktop-6',
				},
			],
		},
	},
	'core/column': {
		classOptions: [
			'display',
			'position',
			'zindex',
			'selfAlignment',
			'order',
		], // Added selfAlignment for controlling column alignment within parent
		dropdown: {
			attributeKey: 'columnsLayout',
			label: 'Column Layout Override',
			default: '',
			options: [ { label: 'Inherit from Columns', value: '' } ],
		},
		hasWidthControls: true,
	},
	'core/group': {
		classOptions: [ 'display', 'position', 'zindex', 'gapSpacing' ],
		// dropdown: {
		// 	attributeKey: 'stackDropdownValue',
		// 	label: 'Group Option',
		// 	default: 'none',
		// 	options: [ { label: 'Select one', value: 'none' } ],
		// },
	},
};

export const CLASS_OPTIONS_MAP = {
	display: {
		options: displayOptions,
		suggestions: getSuggestions( displayOptions, false ),
	},
	margin: {
		options: marginOptions,
		suggestions: getSuggestions( marginOptions, false ),
	},
	padding: {
		options: paddingOptions,
		suggestions: getSuggestions( paddingOptions, false ),
	},
	position: {
		options: positionOptions,
		suggestions: getSuggestions( positionOptions, false ),
	},
	zindex: {
		options: zindexOptions,
		suggestions: getSuggestions( zindexOptions, false ),
	},
	blendMode: {
		options: blendModeOptions,
		suggestions: getSuggestions( blendModeOptions, false ),
	},
	alignItems: {
		// Added alignItems for core/columns
		options: alignItemsOptions,
		suggestions: getSuggestions( alignItemsOptions, false ),
	},
	selfAlignment: {
		// Added selfAlignment for core/column
		options: selfAlignmentOptions,
		suggestions: getSuggestions( selfAlignmentOptions, false ),
	},
	justifyContent: {
		// Added justifyContent for core/columns
		options: justifyContentOptions,
		suggestions: getSuggestions( justifyContentOptions, false ),
	},
	order: {
		// Added order for core/column
		options: orderOptions,
		suggestions: getSuggestions( orderOptions, false ),
	},
	gapSpacing: {
		// Added gapSpacing for core/group
		options: gapOptions,
		suggestions: getSuggestions( gapOptions, false ),
	},
};

// Note: getSuggestions is used in CLASS_OPTIONS_MAP, so we need to define it here temporarily
function getSuggestions( options, showValues ) {
	return options.map( ( item ) => ( showValues ? item.value : item.label ) );
}
