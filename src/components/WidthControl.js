// components/WidthControl.js
import { RangeControl, Button } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

const WidthControl = ( {
	label,
	subLabel,
	image,
	breakpoint,
	value,
	isActive = false,
	onChange,
	options,
} ) => {
	const getNumericValue = ( val ) => {
		if ( val === '' || val === 'auto' ) {
			return 0;
		}

		const match = /^wp-block-column--column(?:-[a-z0-9-]+)?-(\d+)$/i.exec(
			val
		);
		if ( ! match ) {
			return 0;
		}

		return parseInt( match[ 1 ], 10 ) || 0;
	};

	const getLabelClassName = ( labelText ) => {
		return labelText.toLowerCase().replace( /\s+/g, '-' );
	};

	const numericValue = getNumericValue( value );
	const [ sliderValue, setSliderValue ] = useState( numericValue );

	useEffect( () => {
		setSliderValue( numericValue );
	}, [ numericValue ] );

	const getDisplayValue = () => {
		const selectedOption = options.find(
			( option ) => option.value === value
		);
		if ( selectedOption ) {
			return selectedOption.label;
		}

		if ( value === 'auto' ) {
			return 'Auto';
		}
		if ( value === '' ) {
			return 'Inherit';
		}
		return `${ getNumericValue( value ) } columns`;
	};

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

	const zeroMarkLabel =
		options.find( ( opt ) => opt.value === 'auto' )?.label ||
		options.find( ( opt ) => opt.value === '' )?.label ||
		'Auto';

	const marks = [
		{
			value: 0,
			label: zeroMarkLabel,
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
					{ isActive && (
						<span
							className="custom-column-widths__badge"
							aria-hidden="true"
						/>
					) }
				</span>
				<span className="custom-column-widths__value">
					{ getDisplayValue() }
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
