// components/NegativeMarginControl.js
import { RangeControl, Icon } from '@wordpress/components';

/* eslint-disable jsx-a11y/label-has-associated-control */

const NegativeMarginControl = ( {
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
		onChange( newValue.toString() );
	};

	// Marks for negative margins: -5 to 0
	const marks = Array.from( { length: 6 }, ( _, index ) => ( {
		value: -index,
		label: ( -index ).toString(),
	} ) );

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
					value={ baseValue ? parseInt( baseValue ) : 0 } // Default to 0
					onChange={ ( newValue ) =>
						handleChange( newValue, onChangeBase )
					}
					min={ -5 }
					max={ 0 }
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
					value={ smValue ? parseInt( smValue ) : 0 }
					onChange={ ( newValue ) =>
						handleChange( newValue, onChangeSm )
					}
					min={ -5 }
					max={ 0 }
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
					value={ mdValue ? parseInt( mdValue ) : 0 }
					onChange={ ( newValue ) =>
						handleChange( newValue, onChangeMd )
					}
					min={ -5 }
					max={ 0 }
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
					value={ lgValue ? parseInt( lgValue ) : 0 }
					onChange={ ( newValue ) =>
						handleChange( newValue, onChangeLg )
					}
					min={ -5 }
					max={ 0 }
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
					value={ xlValue ? parseInt( xlValue ) : 0 }
					onChange={ ( newValue ) =>
						handleChange( newValue, onChangeXl )
					}
					min={ -5 }
					max={ 0 }
					step={ 1 }
					marks={ marks }
					showTooltip={ false }
					withInputField={ false }
				/>
			</label>
		</div>
	);
};

export default NegativeMarginControl;
