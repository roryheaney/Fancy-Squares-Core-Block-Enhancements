// components/WidthControl.js
import { RangeControl, Button } from '@wordpress/components';
import { useState } from '@wordpress/element';

const WidthControl = ( {
	label,
	subLabel,
	image,
	breakpoint,
	value,
	onChange,
	options,
} ) => {
	const getNumericValue = ( val ) => {
		if ( val === '' || val === 'auto' ) return 0;
		return (
			parseInt(
				val.replace( /wp-block-column--column-(?:[a-z]{0,3}-)?/, '' )
			) || 0
		);
	};

	const getLabelClassName = ( labelText ) => {
		return labelText.toLowerCase().replace( /\s+/g, '-' );
	};

	const numericValue = getNumericValue( value );
	const [ sliderValue, setSliderValue ] = useState( numericValue );

	const handleChange = ( newValue ) => {
		setSliderValue( newValue );
		if ( newValue === 0 ) {
			const autoOption = options.find( ( opt ) => opt.value === 'auto' );
			onChange( autoOption ? 'auto' : '' );
		} else {
			const classPrefix = breakpoint
				? `wp-block-column--column-${ breakpoint }`
				: 'wp-block-column--column';
			onChange( `${ classPrefix }-${ newValue }` );
		}
	};

	const marks = [
		{
			value: 0,
			label:
				options.find( ( opt ) => opt.value === '' )?.label || 'Inherit',
		},
		...Array.from( { length: 12 }, ( _, index ) => ( {
			value: index + 1,
			label: ( index + 1 ).toString(),
		} ) ),
	];

	return (
		<div
			className={ `custom-column-widths__group custom-column-widths__group--${ getLabelClassName(
				label
			) }` }
		>
			<div className="custom-column-widths__header">
				<div
					className="custom-column-widths__icon"
					style={ { backgroundImage: `url(${ image })` } }
				/>
				<span className="custom-column-widths__label">
					{ label }{ ' ' }
					{ subLabel && (
						<span className="custom-column-widths__sub-label">
							- { subLabel }
						</span>
					) }
				</span>
				<span className="custom-column-widths__value">
					{ value === 'auto'
						? 'Auto'
						: value === ''
						? 'Inherit'
						: `${ getNumericValue( value ) } columns` }
				</span>
				<div className="custom-column-widths__buttons">
					{ options.map( ( option ) => (
						<Button
							key={ option.value }
							onClick={ () => {
								setSliderValue(
									getNumericValue( option.value )
								);
								onChange( option.value );
							} }
							className={ `custom-column-widths__option ${
								value === option.value ? 'is-active' : ''
							}` }
							variant="secondary"
						>
							{ option.label }
						</Button>
					) ) }
				</div>
			</div>
			<RangeControl
				__next40pxDefaultSize
				__nextHasNoMarginBottom
				label={ label }
				value={ sliderValue }
				onChange={ handleChange }
				min={ 0 }
				max={ 12 }
				step={ 1 }
				marks={ marks }
				showTooltip={ false }
				withInputField={ false }
			/>
		</div>
	);
};

export default WidthControl;
