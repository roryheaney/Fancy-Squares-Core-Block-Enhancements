// components/NegativeMarginControl.js
import { RangeControl, Icon } from '@wordpress/components';

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
	sideType,
} ) => {
	const getLabelClassName = ( labelText ) => {
		return labelText.toLowerCase().replace( /\s+/g, '-' );
	};

	const handleChange = ( newValue, onChange, breakpoint ) => {
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
			<div className="custom-column-widths__range-control">
				<label className="custom-column-widths__range-label">
					Base
				</label>
				<RangeControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					value={ baseValue ? parseInt( baseValue ) : 0 } // Default to 0
					onChange={ ( newValue ) =>
						handleChange( newValue, onChangeBase, '' )
					}
					min={ -5 }
					max={ 0 }
					step={ 1 }
					marks={ marks }
					showTooltip={ false }
					withInputField={ false }
				/>
			</div>
			<div className="custom-column-widths__range-control">
				<label className="custom-column-widths__range-label">
					Mobile (sm)
				</label>
				<RangeControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					value={ smValue ? parseInt( smValue ) : 0 }
					onChange={ ( newValue ) =>
						handleChange( newValue, onChangeSm, 'sm' )
					}
					min={ -5 }
					max={ 0 }
					step={ 1 }
					marks={ marks }
					showTooltip={ false }
					withInputField={ false }
				/>
			</div>
			<div className="custom-column-widths__range-control">
				<label className="custom-column-widths__range-label">
					Tablet (md)
				</label>
				<RangeControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					value={ mdValue ? parseInt( mdValue ) : 0 }
					onChange={ ( newValue ) =>
						handleChange( newValue, onChangeMd, 'md' )
					}
					min={ -5 }
					max={ 0 }
					step={ 1 }
					marks={ marks }
					showTooltip={ false }
					withInputField={ false }
				/>
			</div>
			<div className="custom-column-widths__range-control">
				<label className="custom-column-widths__range-label">
					Laptop (lg)
				</label>
				<RangeControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					value={ lgValue ? parseInt( lgValue ) : 0 }
					onChange={ ( newValue ) =>
						handleChange( newValue, onChangeLg, 'lg' )
					}
					min={ -5 }
					max={ 0 }
					step={ 1 }
					marks={ marks }
					showTooltip={ false }
					withInputField={ false }
				/>
			</div>
			<div className="custom-column-widths__range-control">
				<label className="custom-column-widths__range-label">
					Larger Screen (xl)
				</label>
				<RangeControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					value={ xlValue ? parseInt( xlValue ) : 0 }
					onChange={ ( newValue ) =>
						handleChange( newValue, onChangeXl, 'xl' )
					}
					min={ -5 }
					max={ 0 }
					step={ 1 }
					marks={ marks }
					showTooltip={ false }
					withInputField={ false }
				/>
			</div>
		</div>
	);
};

export default NegativeMarginControl;
