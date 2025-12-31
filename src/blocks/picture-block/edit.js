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

const TEXT_DOMAIN = 'fancy-squares-core-enhancements';
const FILLER_IMAGE_DATA =
	'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

const ASPECT_RATIO_OPTIONS = [
	{ label: __( 'None', TEXT_DOMAIN ), value: 'none' },
	{ label: __( 'Square - 1:1', TEXT_DOMAIN ), value: '1-1' },
	{ label: __( 'Standard - 4:3', TEXT_DOMAIN ), value: '4-3' },
	{ label: __( 'Portrait - 3:4', TEXT_DOMAIN ), value: '3-4' },
	{ label: __( 'Classic - 3:2', TEXT_DOMAIN ), value: '3-2' },
	{ label: __( 'Classic Portrait - 2:3', TEXT_DOMAIN ), value: '2-3' },
	{ label: __( 'Wide - 16:9', TEXT_DOMAIN ), value: '16-9' },
	{ label: __( 'Tall - 9:16', TEXT_DOMAIN ), value: '9-16' },
];

function ImageSelector( { label, imageId, imageUrl, onSelect, onRemove } ) {
	const selectLabel = sprintf( __( 'Select %s Image', TEXT_DOMAIN ), label );
	const editLabel = sprintf(
		__( 'Edit or Replace %s Image', TEXT_DOMAIN ),
		label
	);
	const removeLabel = sprintf( __( 'Remove %s Image', TEXT_DOMAIN ), label );

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
					<p>{ __( 'No default image selected.', TEXT_DOMAIN ) }</p>
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
					title={ __( 'Image Settings', TEXT_DOMAIN ) }
					initialOpen
				>
					<CheckboxControl
						label={ __( 'Show Values', TEXT_DOMAIN ) }
						checked={ showValues }
						onChange={ setShowValues }
						help={ __(
							'Display Bootstrap class names instead of labels.',
							TEXT_DOMAIN
						) }
						style={ { marginBottom: '20px' } }
					/>

					<ImageSelector
						label={ __( 'Default', TEXT_DOMAIN ) }
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
									TEXT_DOMAIN
								) }
							</p>
							<p>
								{ __(
									'A 1x1 transparent filler image will be used. For accessibility, provide alt text below.',
									TEXT_DOMAIN
								) }
							</p>
							<TextControl
								label={ __( 'Filler Image Alt', TEXT_DOMAIN ) }
								value={ fillerAlt }
								onChange={ ( val ) =>
									setAttributes( { fillerAlt: val } )
								}
								placeholder={ __(
									'e.g. "No image provided"',
									TEXT_DOMAIN
								) }
							/>
						</div>
					) }

					<ImageSelector
						label={ __( 'Small', TEXT_DOMAIN ) }
						imageId={ smallImageId }
						imageUrl={ smallImageUrl }
						onSelect={ onSelectImage( 'small' ) }
						onRemove={ onRemoveImage( 'small' ) }
					/>

					<ImageSelector
						label={ __( 'Medium', TEXT_DOMAIN ) }
						imageId={ mediumImageId }
						imageUrl={ mediumImageUrl }
						onSelect={ onSelectImage( 'medium' ) }
						onRemove={ onRemoveImage( 'medium' ) }
					/>

					<ImageSelector
						label={ __( 'Large', TEXT_DOMAIN ) }
						imageId={ largeImageId }
						imageUrl={ largeImageUrl }
						onSelect={ onSelectImage( 'large' ) }
						onRemove={ onRemoveImage( 'large' ) }
					/>

					<SelectControl
						label={ __( 'Aspect Ratio', TEXT_DOMAIN ) }
						value={ aspectRatio }
						options={ ASPECT_RATIO_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( { aspectRatio: value } )
						}
					/>

					<div style={ { marginTop: '1em', marginBottom: '20px' } }>
						<p style={ { fontWeight: 'bold' } }>
							{ __( 'Border Classes', TEXT_DOMAIN ) }
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
							label={ __( 'Add border classes', TEXT_DOMAIN ) }
						/>
						<details style={ { marginTop: '5px' } }>
							<summary>
								{ __(
									'Available Border Classes',
									TEXT_DOMAIN
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
							{ __( 'Border Radius Classes', TEXT_DOMAIN ) }
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
							label={ __( 'Add radius classes', TEXT_DOMAIN ) }
						/>
						<details style={ { marginTop: '5px' } }>
							<summary>
								{ __(
									'Available Border Radius Classes',
									TEXT_DOMAIN
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
