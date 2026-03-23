import { frameworkOptionSets } from './generated/framework-tokens';
import { bleedCoverOptions as defaultBleedCoverOptions } from '../../data/bootstrap-classes/bleed-cover-options';
import {
	alertOptions as defaultAlertOptions,
	borderOptions as defaultBorderOptions,
	borderRadiusOptions as defaultBorderRadiusOptions,
} from '../../data/bootstrap-classes/classes';

const DEFAULT_COLUMNS_LAYOUT_OPTIONS = [
	{
		label: 'Inherit from Columns',
		value: '',
	},
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
];

const normalizeOptionSet = ( options, fallback ) => {
	if ( ! Array.isArray( options ) || options.length === 0 ) {
		return [ ...fallback ];
	}

	const normalized = options
		.map( ( option ) => {
			if ( ! option || typeof option !== 'object' ) {
				return null;
			}

			const label =
				typeof option.label === 'string' ? option.label.trim() : '';
			const value =
				option.value === undefined || option.value === null
					? ''
					: String( option.value ).trim();

			if ( ! label ) {
				return null;
			}

			return {
				label,
				value,
			};
		} )
		.filter( Boolean );

	return normalized.length > 0 ? normalized : [ ...fallback ];
};

const ensureInheritOption = ( options ) => {
	if ( options.some( ( option ) => option.value === '' ) ) {
		return options;
	}

	return [ DEFAULT_COLUMNS_LAYOUT_OPTIONS[ 0 ], ...options ];
};

const resolveOptionSet = ( key, fallback ) =>
	normalizeOptionSet( frameworkOptionSets?.[ key ], fallback );

export const columnsLayoutOptions = ensureInheritOption(
	resolveOptionSet( 'columnsLayouts', DEFAULT_COLUMNS_LAYOUT_OPTIONS )
);

export const bleedCoverOptions = resolveOptionSet(
	'bleedCoverOptions',
	defaultBleedCoverOptions
);

export const alertOptions = resolveOptionSet(
	'alertOptions',
	defaultAlertOptions
);

export const borderOptions = resolveOptionSet(
	'borderOptions',
	defaultBorderOptions
);

export const borderRadiusOptions = resolveOptionSet(
	'borderRadiusOptions',
	defaultBorderRadiusOptions
);
