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
	gapOptions,
} from '../../data/bootstrap-classes/index.js';
import { getSuggestions } from '../utils/helpers';
import {
	columnsLayoutOptions,
	bleedCoverOptions,
} from './framework-option-sets';

const SELECT_NONE_OPTION = [ { label: 'Select one', value: 'none' } ];
const INHERIT_COLUMNS_OPTION = columnsLayoutOptions.find(
	( option ) => option.value === ''
) || { label: 'Inherit from Columns', value: '' };
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
		dropdown: {
			attributeKey: 'columnsLayout',
			label: 'Columns Layout',
			default: '',
			options: columnsLayoutOptions,
		},
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
		dropdown: {
			attributeKey: 'columnsLayout',
			label: 'Column Layout Override',
			default: '',
			options: [ INHERIT_COLUMNS_OPTION ],
		},
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
	'fs-blocks/tabs-interactive': {
		classOptions: [ 'display', 'position', 'zindex' ],
		...SHARED_SPACING_CONFIG,
	},
	'fs-blocks/accordion-interactive': {
		classOptions: [ 'display', 'position', 'zindex' ],
		...SHARED_SPACING_CONFIG,
	},
	'fs-blocks/content-showcase': {
		classOptions: [ 'display', 'position', 'zindex' ],
		...SHARED_SPACING_CONFIG,
	},
	'fs-blocks/showcase-gallery': {
		classOptions: [ 'display', 'position', 'zindex' ],
		...SHARED_SPACING_CONFIG,
	},
	'fs-blocks/carousel': {
		classOptions: [ 'display', 'position', 'zindex' ],
		...SHARED_SPACING_CONFIG,
	},
	'fs-blocks/alert': {
		classOptions: [ 'display' ],
		...SHARED_SPACING_CONFIG,
	},
	'fs-blocks/index-block': {
		classOptions: [ 'position', 'zindex' ],
		...SHARED_SPACING_CONFIG,
		allowedNegativeMarginControls: EDGE_SPACING_SIDES,
	},
	'fs-blocks/content-wrapper': {
		classOptions: [
			'display',
			'order',
			'selfAlignment',
			'position',
			'zindex',
		],
		...SHARED_SPACING_CONFIG,
		allowedNegativeMarginControls: ALL_SPACING_SIDES,
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
		options: alignItemsOptions,
		suggestions: getSuggestions( alignItemsOptions, false ),
	},
	selfAlignment: {
		options: selfAlignmentOptions,
		suggestions: getSuggestions( selfAlignmentOptions, false ),
	},
	justifyContent: {
		options: justifyContentOptions,
		suggestions: getSuggestions( justifyContentOptions, false ),
	},
	order: {
		options: orderOptions,
		suggestions: getSuggestions( orderOptions, false ),
	},
	gapSpacing: {
		options: gapOptions,
		suggestions: getSuggestions( gapOptions, false ),
	},
	bleedCoverOptions: {
		options: bleedCoverOptions,
		suggestions: getSuggestions( bleedCoverOptions, false ),
	},
};
