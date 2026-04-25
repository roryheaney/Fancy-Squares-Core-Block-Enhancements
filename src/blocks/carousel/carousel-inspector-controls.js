import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
	TextControl,
	Button,
} from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';

const CarouselInspectorControls = function ( {
	slidesToShow,
	columnGap,
	pagination,
	navigation,
	autoplay,
	delay,
	loop,
	breakpoints,
	speed,
	elementTag,
	enableFade,
	fractionalSlidesEnabled,
	fractionalSlidesValue,
	showPlayPauseButton,
	autoHeight,
	enforceHeight,
	setAttributes,
	updateBreakpoint,
	removeBreakpoint,
	addBreakpoint,
} ) {
	return (
		<InspectorControls>
			<PanelBody
				title={ __(
					'Carousel Settings',
					'fancy-squares-core-enhancements'
				) }
				initialOpen
			>
				<RangeControl
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					label={ __(
						'Slides to show',
						'fancy-squares-core-enhancements'
					) }
					value={ slidesToShow }
					onChange={ ( value ) =>
						setAttributes( { slidesToShow: value } )
					}
					min={ 1 }
					max={ 5 }
				/>
				<RangeControl
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					label={ __(
						'Column gap',
						'fancy-squares-core-enhancements'
					) }
					value={ columnGap }
					onChange={ ( value ) =>
						setAttributes( { columnGap: value } )
					}
					min={ 0 }
					max={ 100 }
					step={ 10 }
				/>
				<SelectControl
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					label={ __(
						'HTML Element',
						'fancy-squares-core-enhancements'
					) }
					value={ elementTag }
					options={ [
						{ label: 'div', value: 'div' },
						{ label: 'section', value: 'section' },
					] }
					onChange={ ( value ) =>
						setAttributes( { elementTag: value } )
					}
				/>
				<ToggleControl
					__nextHasNoMarginBottom
					label={ __(
						'Dots navigation',
						'fancy-squares-core-enhancements'
					) }
					onChange={ () =>
						setAttributes( { pagination: ! pagination } )
					}
					checked={ pagination }
				/>
				<ToggleControl
					__nextHasNoMarginBottom
					label={ __(
						'Arrows navigation',
						'fancy-squares-core-enhancements'
					) }
					onChange={ () =>
						setAttributes( { navigation: ! navigation } )
					}
					checked={ navigation }
				/>
				<ToggleControl
					__nextHasNoMarginBottom
					label={ __(
						'Autoplay',
						'fancy-squares-core-enhancements'
					) }
					onChange={ () => setAttributes( { autoplay: ! autoplay } ) }
					checked={ autoplay }
				/>
				<ToggleControl
					__nextHasNoMarginBottom
					label={ __(
						'Infinite loop',
						'fancy-squares-core-enhancements'
					) }
					onChange={ () => setAttributes( { loop: ! loop } ) }
					checked={ loop }
					help={ __(
						'Requires enough slides to loop.',
						'fancy-squares-core-enhancements'
					) }
				/>
				{ autoplay && (
					<RangeControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __(
							'Delay (ms)',
							'fancy-squares-core-enhancements'
						) }
						value={ delay }
						onChange={ ( value ) =>
							setAttributes( { delay: value } )
						}
						min={ 500 }
						max={ 9999 }
						step={ 500 }
					/>
				) }

				{ slidesToShow === 1 && (
					<>
						<ToggleControl
							__nextHasNoMarginBottom
							label={ __(
								'Enable Fade',
								'fancy-squares-core-enhancements'
							) }
							help={ __(
								'Use a fade transition instead of sliding.',
								'fancy-squares-core-enhancements'
							) }
							checked={ enableFade }
							onChange={ () =>
								setAttributes( {
									enableFade: ! enableFade,
								} )
							}
						/>
						<ToggleControl
							__nextHasNoMarginBottom
							label={ __(
								'Use fractional slides',
								'fancy-squares-core-enhancements'
							) }
							help={ __(
								'Overrides slides to show with a fractional value (0.05â€“0.50).',
								'fancy-squares-core-enhancements'
							) }
							checked={ fractionalSlidesEnabled }
							onChange={ () =>
								setAttributes( {
									fractionalSlidesEnabled:
										! fractionalSlidesEnabled,
								} )
							}
						/>
						{ fractionalSlidesEnabled && (
							<RangeControl
								__nextHasNoMarginBottom
								__next40pxDefaultSize
								label={ __(
									'Fractional slides per view',
									'fancy-squares-core-enhancements'
								) }
								value={ fractionalSlidesValue }
								onChange={ ( value ) =>
									setAttributes( {
										fractionalSlidesValue: value,
									} )
								}
								min={ 0.05 }
								max={ 0.5 }
								step={ 0.05 }
							/>
						) }
					</>
				) }

				{ autoplay && (
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __(
							'Enable Play/Pause Button',
							'fancy-squares-core-enhancements'
						) }
						checked={ showPlayPauseButton }
						onChange={ () =>
							setAttributes( {
								showPlayPauseButton: ! showPlayPauseButton,
							} )
						}
					/>
				) }
				<ToggleControl
					__nextHasNoMarginBottom
					label={ __(
						'Enable auto height',
						'fancy-squares-core-enhancements'
					) }
					checked={ autoHeight }
					onChange={ () =>
						setAttributes( { autoHeight: ! autoHeight } )
					}
				/>
				<ToggleControl
					__nextHasNoMarginBottom
					label={ __(
						'Enforce equal slide height',
						'fancy-squares-core-enhancements'
					) }
					checked={ enforceHeight }
					onChange={ () =>
						setAttributes( { enforceHeight: ! enforceHeight } )
					}
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Responsive', 'fancy-squares-core-enhancements' ) }
				initialOpen={ false }
			>
				{ breakpoints.map( ( bp, index ) => {
					const breakpointLabel = sprintf(
						/* translators: %d is the breakpoint number. */
						__(
							'Breakpoint %d',
							'fancy-squares-core-enhancements'
						),
						index + 1
					);
					const removeLabel = sprintf(
						/* translators: %d is the breakpoint number. */
						__(
							'Remove breakpoint %d',
							'fancy-squares-core-enhancements'
						),
						index + 1
					);

					return (
						<div
							key={ `${ bp.breakpoint }-${ index }` }
							style={ { marginBottom: '30px' } }
						>
							<strong>{ breakpointLabel }</strong>
							<TextControl
								__nextHasNoMarginBottom
								__next40pxDefaultSize
								label={ __(
									'Min screen width (px)',
									'fancy-squares-core-enhancements'
								) }
								type="number"
								min={ 100 }
								max={ 2000 }
								step={ 10 }
								value={ bp.breakpoint ?? '' }
								onChange={ ( value ) =>
									updateBreakpoint( index, {
										breakpoint: parseInt( value, 10 ) || 0,
									} )
								}
							/>
							<RangeControl
								__nextHasNoMarginBottom
								__next40pxDefaultSize
								label={ __(
									'Slides to show',
									'fancy-squares-core-enhancements'
								) }
								value={ bp.slidesToShow }
								onChange={ ( value ) =>
									updateBreakpoint( index, {
										slidesToShow: value,
									} )
								}
								min={ 1 }
								max={ 5 }
							/>
							<Button
								isDestructive
								isLink
								onClick={ () => removeBreakpoint( index ) }
							>
								{ removeLabel }
							</Button>
						</div>
					);
				} ) }

				{ breakpoints.length < 3 && (
					<Button variant="secondary" onClick={ addBreakpoint }>
						{ __(
							'Add breakpoint',
							'fancy-squares-core-enhancements'
						) }
					</Button>
				) }
			</PanelBody>

			<PanelBody
				title={ __( 'Animation', 'fancy-squares-core-enhancements' ) }
				initialOpen={ false }
			>
				<RangeControl
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					label={ __(
						'Speed (ms)',
						'fancy-squares-core-enhancements'
					) }
					value={ speed }
					onChange={ ( value ) => setAttributes( { speed: value } ) }
					min={ 100 }
					max={ 900 }
					step={ 50 }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default CarouselInspectorControls;
