import { bleedCoverOptions } from './framework-option-sets';

let classOptionsMapPromise = null;

const getClassOptionsMap = ( optionsModule ) => ( {
	display: {
		options: optionsModule.displayOptions || [],
	},
	margin: {
		options: optionsModule.marginOptions || [],
	},
	padding: {
		options: optionsModule.paddingOptions || [],
	},
	position: {
		options: optionsModule.positionOptions || [],
	},
	zindex: {
		options: optionsModule.zindexOptions || [],
	},
	blendMode: {
		options: optionsModule.blendModeOptions || [],
	},
	alignItems: {
		options: optionsModule.alignItemsOptions || [],
	},
	selfAlignment: {
		options: optionsModule.selfAlignmentOptions || [],
	},
	justifyContent: {
		options: optionsModule.justifyContentOptions || [],
	},
	order: {
		options: optionsModule.orderOptions || [],
	},
	gapSpacing: {
		options: optionsModule.gapOptions || [],
	},
	bleedCoverOptions: {
		options: bleedCoverOptions || [],
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
