import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
	TextControl,
	Button,
} from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import { useEffect, useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

import BlockEdit from '../../components/BlockEdit';
import { generateClassName } from '../../utils/helpers';
import { BLOCK_CONFIG } from '../../config/blockConfig';

const TEXT_DOMAIN = 'fancy-squares-core-enhancements';
const TEMPLATE = [ [ 'fs-blocks/carousel-slide' ] ];
const ALLOWED_BLOCKS = [ 'fs-blocks/carousel-slide' ];

const getPreviewSlidesToShow = ( slidesToShow, breakpoints ) => {
	let slides = slidesToShow;
	let largest = 0;

	if ( Array.isArray( breakpoints ) ) {
		breakpoints.forEach( ( bp ) => {
			if ( bp?.breakpoint > largest ) {
				largest = bp.breakpoint;
				slides = bp.slidesToShow;
			}
		} );
	}

	return slides || 1;
};

export default function Edit( props ) {
	const { attributes, setAttributes, clientId, name } = props;
	const {
		slidesToShow,
		columnGap,
		pagination,
		navigation,
		autoplay,
		delay,
		loop,
		breakpoints,
		speed,
		templateLock,
		enableFade,
		fractionalSlidesEnabled,
		fractionalSlidesValue,
		showPlayPauseButton,
		autoHeight,
		enforceHeight,
		elementTag,
		blockId,
		additionalClasses,
	} = attributes;

	const normalizedBreakpoints = Array.isArray( breakpoints )
		? breakpoints
		: [];

	const { hasChildBlocks } = useSelect(
		( select ) => ( {
			hasChildBlocks:
				select( 'core/block-editor' ).getBlockCount( clientId ) > 0,
		} ),
		[ clientId ]
	);

	const previewSlides = useMemo(
		() => getPreviewSlidesToShow( slidesToShow, normalizedBreakpoints ),
		[ slidesToShow, normalizedBreakpoints ]
	);

	const generatedClassName = useMemo(
		() => generateClassName( attributes, name, BLOCK_CONFIG ),
		[ attributes, name ]
	);

	useEffect( () => {
		const nextClasses = generatedClassName.split( /\s+/ ).filter( Boolean );
		const currentClasses = Array.isArray( additionalClasses )
			? additionalClasses
			: [];
		if ( currentClasses.join( ' ' ) !== nextClasses.join( ' ' ) ) {
			setAttributes( { additionalClasses: nextClasses } );
		}
	}, [ additionalClasses, generatedClassName, setAttributes ] );

	useEffect( () => {
		if ( ! blockId ) {
			setAttributes( { blockId: clientId } );
		}
	}, [ blockId, clientId, setAttributes ] );

	useEffect( () => {
		if ( slidesToShow !== 1 ) {
			if ( enableFade || fractionalSlidesEnabled ) {
				setAttributes( {
					enableFade: false,
					fractionalSlidesEnabled: false,
				} );
			}
		}
	}, [ enableFade, fractionalSlidesEnabled, slidesToShow, setAttributes ] );

	useEffect( () => {
		if ( enableFade && fractionalSlidesEnabled ) {
			setAttributes( { fractionalSlidesEnabled: false } );
		}
	}, [ enableFade, fractionalSlidesEnabled, setAttributes ] );

	useEffect( () => {
		if ( ! autoplay && showPlayPauseButton ) {
			setAttributes( { showPlayPauseButton: false } );
		}
	}, [ autoplay, setAttributes, showPlayPauseButton ] );

	const blockProps = useBlockProps( {
		className: [
			`fs-carousel-shows-${ previewSlides }-slides`,
			hasChildBlocks
				? 'fs-carousel-show-scrollbar'
				: 'fs-carousel-hide-scrollbar',
		]
			.filter( Boolean )
			.join( ' ' ),
	} );

	const updateBreakpoint = ( index, updates ) => {
		const next = [ ...normalizedBreakpoints ];
		next[ index ] = { ...next[ index ], ...updates };
		setAttributes( { breakpoints: next } );
	};

	const removeBreakpoint = ( index ) => {
		const next = normalizedBreakpoints.filter( ( _, i ) => i !== index );
		setAttributes( { breakpoints: next } );
	};

	const addBreakpoint = () => {
		const next = [
			...normalizedBreakpoints,
			{ breakpoint: 768, slidesToShow: 2 },
		];
		setAttributes( { breakpoints: next } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Carousel Settings', TEXT_DOMAIN ) }
					initialOpen
				>
					<RangeControl
						label={ __( 'Slides to show', TEXT_DOMAIN ) }
						value={ slidesToShow }
						onChange={ ( value ) =>
							setAttributes( { slidesToShow: value } )
						}
						min={ 1 }
						max={ 5 }
					/>
					<RangeControl
						label={ __( 'Column gap', TEXT_DOMAIN ) }
						value={ columnGap }
						onChange={ ( value ) =>
							setAttributes( { columnGap: value } )
						}
						min={ 0 }
						max={ 100 }
						step={ 10 }
					/>
					<SelectControl
						label={ __( 'HTML Element', TEXT_DOMAIN ) }
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
						label={ __( 'Dots navigation', TEXT_DOMAIN ) }
						onChange={ () =>
							setAttributes( { pagination: ! pagination } )
						}
						checked={ pagination }
					/>
					<ToggleControl
						label={ __( 'Arrows navigation', TEXT_DOMAIN ) }
						onChange={ () =>
							setAttributes( { navigation: ! navigation } )
						}
						checked={ navigation }
					/>
					<ToggleControl
						label={ __( 'Autoplay', TEXT_DOMAIN ) }
						onChange={ () =>
							setAttributes( { autoplay: ! autoplay } )
						}
						checked={ autoplay }
					/>
					<ToggleControl
						label={ __( 'Infinite loop', TEXT_DOMAIN ) }
						onChange={ () => setAttributes( { loop: ! loop } ) }
						checked={ loop }
						help={ __(
							'Requires enough slides to loop.',
							TEXT_DOMAIN
						) }
					/>
					{ autoplay && (
						<RangeControl
							label={ __( 'Delay (ms)', TEXT_DOMAIN ) }
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
								label={ __( 'Enable Fade', TEXT_DOMAIN ) }
								help={ __(
									'Use a fade transition instead of sliding.',
									TEXT_DOMAIN
								) }
								checked={ enableFade }
								onChange={ () =>
									setAttributes( {
										enableFade: ! enableFade,
									} )
								}
							/>
							<ToggleControl
								label={ __(
									'Use fractional slides',
									TEXT_DOMAIN
								) }
								help={ __(
									'Overrides slides to show with a fractional value (0.05-0.50).',
									TEXT_DOMAIN
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
									label={ __(
										'Fractional slides per view',
										TEXT_DOMAIN
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
							label={ __(
								'Enable Play/Pause Button',
								TEXT_DOMAIN
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
						label={ __( 'Enable auto height', TEXT_DOMAIN ) }
						checked={ autoHeight }
						onChange={ () =>
							setAttributes( { autoHeight: ! autoHeight } )
						}
					/>
					<ToggleControl
						label={ __(
							'Enforce equal slide height',
							TEXT_DOMAIN
						) }
						checked={ enforceHeight }
						onChange={ () =>
							setAttributes( { enforceHeight: ! enforceHeight } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Responsive', TEXT_DOMAIN ) }
					initialOpen={ false }
				>
					{ normalizedBreakpoints.map( ( bp, index ) => (
						<div
							key={ `${ bp.breakpoint }-${ index }` }
							style={ { marginBottom: '30px' } }
						>
							<strong>
								{ sprintf(
									__( 'Breakpoint %d', TEXT_DOMAIN ),
									index + 1
								) }
							</strong>
							<TextControl
								label={ __(
									'Min screen width (px)',
									TEXT_DOMAIN
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
								label={ __( 'Slides to show', TEXT_DOMAIN ) }
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
								{ sprintf(
									__( 'Remove breakpoint %d', TEXT_DOMAIN ),
									index + 1
								) }
							</Button>
						</div>
					) ) }

					{ normalizedBreakpoints.length < 3 && (
						<Button variant="secondary" onClick={ addBreakpoint }>
							{ __( 'Add breakpoint', TEXT_DOMAIN ) }
						</Button>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Animation', TEXT_DOMAIN ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Speed (ms)', TEXT_DOMAIN ) }
						value={ speed }
						onChange={ ( value ) =>
							setAttributes( { speed: value } )
						}
						min={ 100 }
						max={ 900 }
						step={ 50 }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<InnerBlocks
					orientation="horizontal"
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ TEMPLATE }
					templateLock={ templateLock || false }
					renderAppender={ InnerBlocks.ButtonBlockAppender }
				/>
			</div>
		</>
	);
}
