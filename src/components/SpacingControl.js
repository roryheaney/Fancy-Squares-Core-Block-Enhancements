// components/SpacingControl.js
import { RangeControl, Icon } from '@wordpress/components';

/* eslint-disable jsx-a11y/label-has-associated-control */

/**
 * Configuration for different spacing types
 *
 * Note: padding and margin configs are intentionally separate (not DRY)
 * for explicit clarity, even though they're currently identical.
 */
const SPACING_CONFIGS = {
	padding: {
		min: -1,
		max: 5,
		defaultValue: -1,
		marks: [
			{ value: -1, label: 'None' },
			...Array.from( { length: 6 }, ( _, index ) => ( {
				value: index,
				label: index.toString(),
			} ) ),
		],
		handleChange: ( newValue ) =>
			newValue === -1 ? '' : newValue.toString(),
	},
	margin: {
		min: -1,
		max: 5,
		defaultValue: -1,
		marks: [
			{ value: -1, label: 'None' },
			...Array.from( { length: 6 }, ( _, index ) => ( {
				value: index,
				label: index.toString(),
			} ) ),
		],
		handleChange: ( newValue ) =>
			newValue === -1 ? '' : newValue.toString(),
	},
	negativeMargin: {
		min: -5,
		max: 0,
		defaultValue: 0,
		marks: Array.from( { length: 6 }, ( _, index ) => ( {
			value: -index,
			label: ( -index ).toString(),
		} ) ),
		handleChange: ( newValue ) => newValue.toString(),
	},
};

/**
 * Unified spacing control component
 *
 * @param {Object} props - Component props
 * @param {string} props.type - Type of spacing: 'padding', 'margin', or 'negativeMargin'
 * @param {string} props.label - Display label (e.g., 'All Sides', 'Top')
 * @param {string} props.subLabel - Sub-label (e.g., 'Padding', 'Margin')
 * @param {Object} props.icon - WordPress icon
 * @param {string} props.baseValue - Base breakpoint value
 * @param {string} props.smValue - Small breakpoint value
 * @param {string} props.mdValue - Medium breakpoint value
 * @param {string} props.lgValue - Large breakpoint value
 * @param {string} props.xlValue - Extra large breakpoint value
 * @param {Function} props.onChangeBase - Base value change handler
 * @param {Function} props.onChangeSm - Small value change handler
 * @param {Function} props.onChangeMd - Medium value change handler
 * @param {Function} props.onChangeLg - Large value change handler
 * @param {Function} props.onChangeXl - Extra large value change handler
 */
const SpacingControl = ( {
	type = 'padding',
	label,
	subLabel,
	icon,
	baseValue,
	smValue,
	mdValue,
	lgValue,
	xlValue,
	onChangeBase,
	onChangeSm,
	onChangeMd,
	onChangeLg,
	onChangeXl,
} ) => {
	const config = SPACING_CONFIGS[ type ];
	const { min, max, defaultValue, marks, handleChange } = config;

	const getLabelClassName = ( labelText ) => {
		return labelText.toLowerCase().replace( /\s+/g, '-' );
	};

	const parseValue = ( value ) => {
		return value ? parseInt( value ) : defaultValue;
	};

	const createChangeHandler = ( onChange ) => ( newValue ) => {
		onChange( handleChange( newValue ) );
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
			<label className="custom-column-widths__range-control">
				<span className="custom-column-widths__range-label">Base</span>
				<RangeControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					value={ parseValue( baseValue ) }
					onChange={ createChangeHandler( onChangeBase ) }
					min={ min }
					max={ max }
					step={ 1 }
					marks={ marks }
					showTooltip={ false }
					withInputField={ false }
				/>
			</label>
			<label className="custom-column-widths__range-control">
				<span className="custom-column-widths__range-label">
					Mobile (sm)
				</span>
				<RangeControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					value={ parseValue( smValue ) }
					onChange={ createChangeHandler( onChangeSm ) }
					min={ min }
					max={ max }
					step={ 1 }
					marks={ marks }
					showTooltip={ false }
					withInputField={ false }
				/>
			</label>
			<label className="custom-column-widths__range-control">
				<span className="custom-column-widths__range-label">
					Tablet (md)
				</span>
				<RangeControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					value={ parseValue( mdValue ) }
					onChange={ createChangeHandler( onChangeMd ) }
					min={ min }
					max={ max }
					step={ 1 }
					marks={ marks }
					showTooltip={ false }
					withInputField={ false }
				/>
			</label>
			<label className="custom-column-widths__range-control">
				<span className="custom-column-widths__range-label">
					Laptop (lg)
				</span>
				<RangeControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					value={ parseValue( lgValue ) }
					onChange={ createChangeHandler( onChangeLg ) }
					min={ min }
					max={ max }
					step={ 1 }
					marks={ marks }
					showTooltip={ false }
					withInputField={ false }
				/>
			</label>
			<label className="custom-column-widths__range-control">
				<span className="custom-column-widths__range-label">
					Larger Screen (xl)
				</span>
				<RangeControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					value={ parseValue( xlValue ) }
					onChange={ createChangeHandler( onChangeXl ) }
					min={ min }
					max={ max }
					step={ 1 }
					marks={ marks }
					showTooltip={ false }
					withInputField={ false }
				/>
			</label>
		</div>
	);
};

export default SpacingControl;
