// components/PaddingControl.js
import { RangeControl, Icon } from '@wordpress/components';

/* eslint-disable jsx-a11y/label-has-associated-control */

const PaddingControl = ( {
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
	const getLabelClassName = ( labelText ) => {
		return labelText.toLowerCase().replace( /\s+/g, '-' );
	};

	const handleChange = ( newValue, onChange ) => {
		// If the value is -1 (reset), set it to an empty string (no class)
		onChange( newValue === -1 ? '' : newValue.toString() );
	};

	// Include -1 as a "None" option in the marks
	const marks = [
		{ value: -1, label: 'None' }, // Reset value
		...Array.from( { length: 6 }, ( _, index ) => ( {
			value: index,
			label: index.toString(),
		} ) ),
	];

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
					value={ baseValue ? parseInt( baseValue ) : -1 } // Default to -1 if no value
					onChange={ ( newValue ) =>
						handleChange( newValue, onChangeBase )
					}
					min={ -1 } // Add -1 as the minimum (reset)
					max={ 5 }
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
					value={ smValue ? parseInt( smValue ) : -1 }
					onChange={ ( newValue ) =>
						handleChange( newValue, onChangeSm )
					}
					min={ -1 }
					max={ 5 }
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
					value={ mdValue ? parseInt( mdValue ) : -1 }
					onChange={ ( newValue ) =>
						handleChange( newValue, onChangeMd )
					}
					min={ -1 }
					max={ 5 }
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
					value={ lgValue ? parseInt( lgValue ) : -1 }
					onChange={ ( newValue ) =>
						handleChange( newValue, onChangeLg )
					}
					min={ -1 }
					max={ 5 }
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
					value={ xlValue ? parseInt( xlValue ) : -1 }
					onChange={ ( newValue ) =>
						handleChange( newValue, onChangeXl )
					}
					min={ -1 }
					max={ 5 }
					step={ 1 }
					marks={ marks }
					showTooltip={ false }
					withInputField={ false }
				/>
			</label>
		</div>
	);
};

export default PaddingControl;
