import { bleedCoverOptions } from './framework-option-sets';
import { RESPONSIVE_BREAKPOINT_KEYS } from './breakpoints';
import { filterTokenOptions } from './option-coverage.mjs';

let classOptionsMapPromise = null;

const getClassOptionsMap = ( optionsModule ) => ( {
	display: {
		options: filterTokenOptions(
			optionsModule.displayOptions,
			RESPONSIVE_BREAKPOINT_KEYS
		),
	},
	margin: {
		options: filterTokenOptions(
			optionsModule.marginOptions,
			RESPONSIVE_BREAKPOINT_KEYS
		),
	},
	padding: {
		options: filterTokenOptions(
			optionsModule.paddingOptions,
			RESPONSIVE_BREAKPOINT_KEYS
		),
	},
	position: {
		options: filterTokenOptions(
			optionsModule.positionOptions,
			RESPONSIVE_BREAKPOINT_KEYS
		),
	},
	zindex: {
		options: filterTokenOptions(
			optionsModule.zindexOptions,
			RESPONSIVE_BREAKPOINT_KEYS
		),
	},
	blendMode: {
		options: filterTokenOptions(
			optionsModule.blendModeOptions,
			RESPONSIVE_BREAKPOINT_KEYS
		),
	},
	alignItems: {
		options: filterTokenOptions(
			optionsModule.alignItemsOptions,
			RESPONSIVE_BREAKPOINT_KEYS
		),
	},
	selfAlignment: {
		options: filterTokenOptions(
			optionsModule.selfAlignmentOptions,
			RESPONSIVE_BREAKPOINT_KEYS
		),
	},
	justifyContent: {
		options: filterTokenOptions(
			optionsModule.justifyContentOptions,
			RESPONSIVE_BREAKPOINT_KEYS
		),
	},
	order: {
		options: filterTokenOptions(
			optionsModule.orderOptions,
			RESPONSIVE_BREAKPOINT_KEYS
		),
	},
	gapSpacing: {
		options: filterTokenOptions(
			optionsModule.gapOptions,
			RESPONSIVE_BREAKPOINT_KEYS
		),
	},
	bleedCoverOptions: {
		options: filterTokenOptions(
			bleedCoverOptions,
			RESPONSIVE_BREAKPOINT_KEYS
		),
	},
} );

export const loadClassOptionsMap = async () => {
	if ( ! classOptionsMapPromise ) {
		classOptionsMapPromise = import(
			'../../data/bootstrap-classes/index.js'
		).then( ( module ) => getClassOptionsMap( module ) );
	}

	return classOptionsMapPromise;
};
