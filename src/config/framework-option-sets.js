import { frameworkOptionSets } from './generated/framework-tokens';
import { bleedCoverOptions as defaultBleedCoverOptions } from '../../data/bootstrap-classes/bleed-cover-options';
import {
	alertOptions as defaultAlertOptions,
	borderOptions as defaultBorderOptions,
	borderRadiusOptions as defaultBorderRadiusOptions,
} from '../../data/bootstrap-classes/classes';

const getAllowedValues = ( fallback ) =>
	new Set(
		( Array.isArray( fallback ) ? fallback : [] )
			.map( ( option ) =>
				option?.value === undefined || option?.value === null
					? ''
					: String( option.value ).trim()
			)
			.filter( ( value ) => value !== undefined )
	);

const normalizeOptionSet = ( options, fallback, allowedValues = null ) => {
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

			if ( allowedValues && ! allowedValues.has( value ) ) {
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

const resolveOptionSet = ( key, fallback ) =>
	normalizeOptionSet(
		frameworkOptionSets?.[ key ],
		fallback,
		getAllowedValues( fallback )
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
