import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	TextControl,
	FormTokenField,
	CheckboxControl,
	SelectControl,
} from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import { useMemo, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

import {
	borderOptions,
	borderRadiusOptions,
} from '../../../data/bootstrap-classes/classes.js';
import { getDisplayValues, getValuesFromDisplay } from '../../utils/helpers.js';
const FILLER_IMAGE_DATA =
	'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

const ASPECT_RATIO_OPTIONS = [
	{ label: __( 'None', 'fancy-squares-core-enhancements' ), value: 'none' },
	{
		label: __( 'Square - 1:1', 'fancy-squares-core-enhancements' ),
		value: '1-1',
	},
	{
		label: __( 'Standard - 4:3', 'fancy-squares-core-enhancements' ),
		value: '4-3',
	},
	{
		label: __( 'Portrait - 3:4', 'fancy-squares-core-enhancements' ),
		value: '3-4',
	},
	{
		label: __( 'Classic - 3:2', 'fancy-squares-core-enhancements' ),
		value: '3-2',
	},
	{
		label: __(
			'Classic Portrait - 2:3',
			'fancy-squares-core-enhancements'
		),
		value: '2-3',
	},
	{
		label: __( 'Wide - 16:9', 'fancy-squares-core-enhancements' ),
		value: '16-9',
	},
	{
		label: __( 'Tall - 9:16', 'fancy-squares-core-enhancements' ),
		value: '9-16',
	},
];

function ImageSelector( { label, imageId, imageUrl, onSelect, onRemove } ) {
	const selectLabel = sprintf(
		/* translators: %s: Image label. */
		__( 'Select %s Image', 'fancy-squares-core-enhancements' ),
		label
	);
	const editLabel = sprintf(
		/* translators: %s: Image label. */
		__( 'Edit or Replace %s Image', 'fancy-squares-core-enhancements' ),
		label
	);
	const removeLabel = sprintf(
		/* translators: %s: Image label. */
		__( 'Remove %s Image', 'fancy-squares-core-enhancements' ),
		label
	);

	return (
		<MediaUploadCheck>
			<MediaUpload
				onSelect={ onSelect }
				allowedTypes={ [ 'image' ] }
				value={ imageId }
				render={ ( { open } ) => {
					const handleKeyDown = ( event ) => {
						if ( event.key === 'Enter' || event.key === ' ' ) {
							open();
						}
					};

					return (
						<div style={ { marginBottom: '1em' } }>
							<Button variant="secondary" onClick={ open }>
								{ imageId ? editLabel : selectLabel }
							</Button>

							{ imageUrl && (
								<>
									<button
										type="button"
										style={ {
											display: 'block',
											background: 'none',
											border: 'none',
											padding: 0,
											marginTop: '0.5em',
											cursor: 'pointer',
										} }
										onClick={ open }
										onKeyDown={ handleKeyDown }
										aria-label={ editLabel }
									>
										<img
											src={ imageUrl }
											alt=""
											style={ {
												maxWidth: '100%',
												display: 'block',
											} }
										/>
									</button>

									<div style={ { marginTop: '0.5em' } }>
										<Button
											variant="tertiary"
											onClick={ onRemove }
										>
											{ removeLabel }
										</Button>
									</div>
								</>
							) }
						</div>
					);
				} }
			/>
		</MediaUploadCheck>
	);
}

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const {
		defaultImageId = 0,
		defaultImageUrl = '',
		smallImageId = 0,
		smallImageUrl = '',
		mediumImageId = 0,
		mediumImageUrl = '',
		largeImageId = 0,
		largeImageUrl = '',
		aspectRatio = 'none',
		fillerAlt = '',
		borderClass = [],
		borderRadiusClass = [],
	} = attributes;

	const [ showValues, setShowValues ] = useState( false );

	const defaultMedia = useSelect(
		( select ) =>
			defaultImageId ? select( 'core' ).getMedia( defaultImageId ) : null,
		[ defaultImageId ]
	);

	const defaultAlt = defaultMedia?.alt_text || '';
	const defaultCaption = defaultMedia?.caption?.rendered || '';

	const onSelectImage = ( breakpoint ) => ( media ) => {
		if ( ! media?.id || ! media?.url ) {
			return;
		}
		setAttributes( {
			[ `${ breakpoint }ImageId` ]: media.id,
			[ `${ breakpoint }ImageUrl` ]: media.url,
		} );
	};

	const onRemoveImage = ( breakpoint ) => () => {
		setAttributes( {
			[ `${ breakpoint }ImageId` ]: 0,
			[ `${ breakpoint }ImageUrl` ]: '',
		} );
	};

	const hasSmall = !! smallImageUrl;
	const hasMedium = !! mediumImageUrl;
	const hasLarge = !! largeImageUrl;

	const figureClass = useMemo( () => {
		const figureClassNames = [ 'wp-block-image', 'fs-block-image' ];
		if ( aspectRatio && aspectRatio !== 'none' ) {
			figureClassNames.push(
				'fs-block-image--has-aspect-ratio',
				`is-aspect-ratio-${ aspectRatio }`
			);
		} else {
			figureClassNames.push( 'fs-block-image--no-aspect-ratio' );
		}
		return figureClassNames.join( ' ' );
	}, [ aspectRatio ] );

	const blockProps = useBlockProps( { className: figureClass } );

	const onChangeBorderTokens = ( tokens ) => {
		const newValues = getValuesFromDisplay(
			tokens,
			borderOptions,
			showValues
		);
		setAttributes( { borderClass: newValues } );
	};

	const onChangeRadiusTokens = ( tokens ) => {
		const newValues = getValuesFromDisplay(
			tokens,
			borderRadiusOptions,
			showValues
		);
		setAttributes( { borderRadiusClass: newValues } );
	};

	const imageProps = useMemo( () => {
		const classes = [];
		const styleObj = {};
		const borderTokens = Array.isArray( borderClass ) ? borderClass : [];
		const radiusTokens = Array.isArray( borderRadiusClass )
			? borderRadiusClass
			: [];

		if ( borderTokens.length ) {
			classes.push( ...borderTokens );
			styleObj.borderStyle = 'solid';
		}
		if ( radiusTokens.length ) {
			classes.push( ...radiusTokens );
		}

		return {
			className: classes.length ? classes.join( ' ' ) : undefined,
			style: Object.keys( styleObj ).length ? styleObj : undefined,
		};
	}, [ borderClass, borderRadiusClass ] );

	const renderPreviewContent = () => {
		const noBreakpoints = ! hasSmall && ! hasMedium && ! hasLarge;

		if ( noBreakpoints ) {
			if ( ! defaultImageUrl ) {
				return (
					<p>
						{ __(
							'No default image selected.',
							'fancy-squares-core-enhancements'
						) }
					</p>
				);
			}
			return (
				<>
					<img
						src={ defaultImageUrl }
						alt={ defaultAlt }
						style={ { maxWidth: '100%' } }
						{ ...imageProps }
					/>
					{ defaultCaption && (
						<figcaption
							dangerouslySetInnerHTML={ {
								__html: defaultCaption,
							} }
						/>
					) }
				</>
			);
		}

		let sourceSmall = null;
		let sourceMedium = null;
		let sourceLarge = null;

		if ( hasSmall ) {
			sourceSmall = (
				<source media="(max-width: 600px)" srcSet={ smallImageUrl } />
			);
		} else if ( hasMedium ) {
			sourceSmall = (
				<source media="(max-width: 600px)" srcSet={ mediumImageUrl } />
			);
		}

		if ( hasMedium && hasSmall ) {
			sourceMedium = (
				<source
					media="(min-width: 601px) and (max-width: 1023px)"
					srcSet={ mediumImageUrl }
				/>
			);
		} else if ( hasMedium && ! hasSmall ) {
			sourceMedium = (
				<source media="(max-width: 1023px)" srcSet={ mediumImageUrl } />
			);
		}

		if ( hasLarge ) {
			sourceLarge = (
				<source media="(min-width: 1024px)" srcSet={ largeImageUrl } />
			);
		} else if ( hasMedium ) {
			sourceLarge = (
				<source media="(min-width: 1024px)" srcSet={ mediumImageUrl } />
			);
		}

		const fallbackUrl = defaultImageUrl || FILLER_IMAGE_DATA;
		const fallbackAlt = defaultImageUrl ? defaultAlt : fillerAlt;

		return (
			<>
				<picture>
					{ sourceSmall }
					{ sourceMedium }
					{ sourceLarge }
					<img
						src={ fallbackUrl }
						alt={ fallbackAlt }
						style={ { maxWidth: '100%' } }
						{ ...imageProps }
					/>
				</picture>
				{ defaultCaption && (
					<figcaption
						dangerouslySetInnerHTML={ { __html: defaultCaption } }
					/>
				) }
			</>
		);
	};

	return (
		<figure { ...blockProps }>
			<InspectorControls>
				<PanelBody
					title={ __(
						'Image Settings',
						'fancy-squares-core-enhancements'
					) }
					initialOpen
				>
					<CheckboxControl
						label={ __(
							'Show Values',
							'fancy-squares-core-enhancements'
						) }
						checked={ showValues }
						onChange={ setShowValues }
						help={ __(
							'Display Bootstrap class names instead of labels.',
							'fancy-squares-core-enhancements'
						) }
						style={ { marginBottom: '20px' } }
					/>

					<ImageSelector
						label={ __(
							'Default',
							'fancy-squares-core-enhancements'
						) }
						imageId={ defaultImageId }
						imageUrl={ defaultImageUrl }
						onSelect={ onSelectImage( 'default' ) }
						onRemove={ onRemoveImage( 'default' ) }
					/>

					{ ! defaultImageId && (
						<div
							style={ {
								marginBottom: '1em',
								padding: '0.5em',
								background: '#f3f3f3',
							} }
						>
							<p style={ { fontWeight: 'bold' } }>
								{ __(
									'No default image selected',
									'fancy-squares-core-enhancements'
								) }
							</p>
							<p>
								{ __(
									'A 1x1 transparent filler image will be used. For accessibility, provide alt text below.',
									'fancy-squares-core-enhancements'
								) }
							</p>
							<TextControl
								label={ __(
									'Filler Image Alt',
									'fancy-squares-core-enhancements'
								) }
								value={ fillerAlt }
								onChange={ ( val ) =>
									setAttributes( { fillerAlt: val } )
								}
								placeholder={ __(
									'e.g. "No image provided"',
									'fancy-squares-core-enhancements'
								) }
							/>
						</div>
					) }

					<ImageSelector
						label={ __(
							'Small',
							'fancy-squares-core-enhancements'
						) }
						imageId={ smallImageId }
						imageUrl={ smallImageUrl }
						onSelect={ onSelectImage( 'small' ) }
						onRemove={ onRemoveImage( 'small' ) }
					/>

					<ImageSelector
						label={ __(
							'Medium',
							'fancy-squares-core-enhancements'
						) }
						imageId={ mediumImageId }
						imageUrl={ mediumImageUrl }
						onSelect={ onSelectImage( 'medium' ) }
						onRemove={ onRemoveImage( 'medium' ) }
					/>

					<ImageSelector
						label={ __(
							'Large',
							'fancy-squares-core-enhancements'
						) }
						imageId={ largeImageId }
						imageUrl={ largeImageUrl }
						onSelect={ onSelectImage( 'large' ) }
						onRemove={ onRemoveImage( 'large' ) }
					/>

					<SelectControl
						label={ __(
							'Aspect Ratio',
							'fancy-squares-core-enhancements'
						) }
						value={ aspectRatio }
						options={ ASPECT_RATIO_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( { aspectRatio: value } )
						}
					/>

					<div style={ { marginTop: '1em', marginBottom: '20px' } }>
						<p style={ { fontWeight: 'bold' } }>
							{ __(
								'Border Classes',
								'fancy-squares-core-enhancements'
							) }
						</p>
						<FormTokenField
							value={ getDisplayValues(
								borderClass,
								borderOptions,
								showValues
							) }
							suggestions={ borderOptions.map( ( opt ) =>
								showValues ? opt.value : opt.label
							) }
							onChange={ onChangeBorderTokens }
							label={ __(
								'Add border classes',
								'fancy-squares-core-enhancements'
							) }
						/>
						<details style={ { marginTop: '5px' } }>
							<summary>
								{ __(
									'Available Border Classes',
									'fancy-squares-core-enhancements'
								) }
							</summary>
							<ul
								style={ {
									fontSize: '12px',
									paddingLeft: '20px',
									margin: '5px 0',
								} }
							>
								{ borderOptions.map( ( item ) => (
									<li key={ item.value }>
										{ showValues ? item.value : item.label }
									</li>
								) ) }
							</ul>
						</details>
					</div>

					<div style={ { marginBottom: '20px' } }>
						<p style={ { fontWeight: 'bold' } }>
							{ __(
								'Border Radius Classes',
								'fancy-squares-core-enhancements'
							) }
						</p>
						<FormTokenField
							value={ getDisplayValues(
								borderRadiusClass,
								borderRadiusOptions,
								showValues
							) }
							suggestions={ borderRadiusOptions.map( ( opt ) =>
								showValues ? opt.value : opt.label
							) }
							onChange={ onChangeRadiusTokens }
							label={ __(
								'Add radius classes',
								'fancy-squares-core-enhancements'
							) }
						/>
						<details style={ { marginTop: '5px' } }>
							<summary>
								{ __(
									'Available Border Radius Classes',
									'fancy-squares-core-enhancements'
								) }
							</summary>
							<ul
								style={ {
									fontSize: '12px',
									paddingLeft: '20px',
									margin: '5px 0',
								} }
							>
								{ borderRadiusOptions.map( ( item ) => (
									<li key={ item.value }>
										{ showValues ? item.value : item.label }
									</li>
								) ) }
							</ul>
						</details>
					</div>
				</PanelBody>
			</InspectorControls>
			{ renderPreviewContent() }
		</figure>
	);
}
