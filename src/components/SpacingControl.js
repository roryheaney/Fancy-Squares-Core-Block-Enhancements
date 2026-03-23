// components/SpacingControl.js
import { Icon, SelectControl } from '@wordpress/components';
import { frameworkSpacingScaleOptions } from '../config/generated/framework-tokens';
import {
	getSpacingBreakpointLabel,
	SPACING_BREAKPOINT_KEYS,
} from '../config/breakpoints';

/* eslint-disable jsx-a11y/label-has-associated-control, jsdoc/check-line-alignment */

const formatScaleOptionLabel = ( option ) => {
	const label = option?.label || String( option?.slug || '' );
	if ( option?.size ) {
		return `${ label } [${ option.size }]`;
	}
	return label;
};

const baseSpacingOptions = (
	Array.isArray( frameworkSpacingScaleOptions )
		? frameworkSpacingScaleOptions
		: []
).map( ( option ) => ( {
	value: String( option.slug ),
	label: formatScaleOptionLabel( option ),
} ) );

const positiveOptions = [ { value: '', label: 'None' }, ...baseSpacingOptions ];

const negativeOptions = [
	{ value: '', label: 'None' },
	...baseSpacingOptions
		.filter( ( option ) => option.value !== '0' )
		.map( ( option ) => ( {
			value: option.value,
			label: `-${ option.label }`,
		} ) ),
];

const SPACING_CONFIGS = {
	padding: {
		options: positiveOptions,
	},
	margin: {
		options: positiveOptions,
	},
	negativeMargin: {
		options: negativeOptions,
	},
};

/**
 * Unified spacing control component.
 *
 * @param {Object} root0 - Component props.
 * @param {'padding'|'margin'|'negativeMargin'} [root0.type='padding'] - Spacing control type.
 * @param {string} root0.label - Control label.
 * @param {string} [root0.subLabel] - Optional sub-label.
 * @param {import('@wordpress/components').IconType} root0.icon - Icon for the control group.
 * @param {Object<string, string>} [root0.values] - Values by breakpoint key (`''`, `sm`, `md`, ...).
 * @param {(breakpointKey: string, value: string) => void} root0.onChange - Change handler.
 */
const SpacingControl = ( {
	type = 'padding',
	label,
	subLabel,
	icon,
	values = {},
	onChange,
} ) => {
	const config = SPACING_CONFIGS[ type ] || SPACING_CONFIGS.padding;
	const selectOptions = config.options;

	const getLabelClassName = ( labelText ) => {
		return labelText.toLowerCase().replace( /\s+/g, '-' );
	};

	return (
		<div
			className={ `custom-column-widths__group custom-column-widths__group--${ getLabelClassName(
				label
			) }` }
		>
			<div className="custom-column-widths__header">
				<Icon
					icon={ icon }
					size={ 23 }
					className="custom-column-widths__icon"
				/>
				<span className="custom-column-widths__label">
					{ label }{ ' ' }
					{ subLabel && (
						<span className="custom-column-widths__sub-label">
							- { subLabel }
						</span>
					) }
				</span>
			</div>
			{ SPACING_BREAKPOINT_KEYS.map( ( breakpointKey ) => (
				<div
					className="custom-column-widths__range-control"
					key={ breakpointKey || 'base' }
				>
					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ getSpacingBreakpointLabel( breakpointKey ) }
						value={ values[ breakpointKey ] || '' }
						options={ selectOptions }
						onChange={ ( newValue ) =>
							onChange( breakpointKey, newValue )
						}
					/>
				</div>
			) ) }
		</div>
	);
};

export default SpacingControl;
