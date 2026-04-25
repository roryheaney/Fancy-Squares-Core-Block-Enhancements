import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	TextControl,
	FormTokenField,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';

import {
	borderOptions,
	borderRadiusOptions,
} from '../../config/framework-option-sets';
import { getDisplayValues } from '../../utils/helpers';

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

function ClassTokenSection( {
	title,
	label,
	value,
	options,
	showValues,
	onChange,
	marginBottom,
} ) {
	return (
		<div
			style={ {
				marginBottom,
				marginTop: marginBottom ? undefined : '1em',
			} }
		>
			<p style={ { fontWeight: 'bold' } }>{ title }</p>
			<FormTokenField
				__nextHasNoMarginBottom
				__next40pxDefaultSize
				value={ getDisplayValues( value, options, showValues ) }
				suggestions={ options.map( ( opt ) =>
					showValues ? opt.value : opt.label
				) }
				onChange={ onChange }
				label={ label }
			/>
			<details style={ { marginTop: '5px' } }>
				<summary>
					{ sprintf(
						/* translators: %s: Token group title */
						__( 'Available %s', 'fancy-squares-core-enhancements' ),
						title
					) }
				</summary>
				<ul
					style={ {
						fontSize: '12px',
						paddingLeft: '20px',
						margin: '5px 0',
					} }
				>
					{ options.map( ( item ) => (
						<li key={ item.value }>
							{ showValues ? item.value : item.label }
						</li>
					) ) }
				</ul>
			</details>
		</div>
	);
}

export default function PictureInspectorControls( {
	showValues,
	setShowValues,
	defaultImageId,
	defaultImageUrl,
	smallImageId,
	smallImageUrl,
	mediumImageId,
	mediumImageUrl,
	largeImageId,
	largeImageUrl,
	fillerAlt,
	setFillerAlt,
	aspectRatio,
	setAspectRatio,
	borderClass,
	borderRadiusClass,
	onChangeBorderTokens,
	onChangeRadiusTokens,
	onSelectImage,
	onRemoveImage,
} ) {
	return (
		<InspectorControls>
			<PanelBody
				title={ __(
					'Image Settings',
					'fancy-squares-core-enhancements'
				) }
				initialOpen
			>
				<ToggleControl
					__nextHasNoMarginBottom
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
					label={ __( 'Default', 'fancy-squares-core-enhancements' ) }
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
							__nextHasNoMarginBottom
							__next40pxDefaultSize
							label={ __(
								'Filler Image Alt',
								'fancy-squares-core-enhancements'
							) }
							value={ fillerAlt }
							onChange={ setFillerAlt }
							placeholder={ __(
								'e.g. "No image provided"',
								'fancy-squares-core-enhancements'
							) }
						/>
					</div>
				) }

				<ImageSelector
					label={ __( 'Small', 'fancy-squares-core-enhancements' ) }
					imageId={ smallImageId }
					imageUrl={ smallImageUrl }
					onSelect={ onSelectImage( 'small' ) }
					onRemove={ onRemoveImage( 'small' ) }
				/>
				<ImageSelector
					label={ __( 'Medium', 'fancy-squares-core-enhancements' ) }
					imageId={ mediumImageId }
					imageUrl={ mediumImageUrl }
					onSelect={ onSelectImage( 'medium' ) }
					onRemove={ onRemoveImage( 'medium' ) }
				/>
				<ImageSelector
					label={ __( 'Large', 'fancy-squares-core-enhancements' ) }
					imageId={ largeImageId }
					imageUrl={ largeImageUrl }
					onSelect={ onSelectImage( 'large' ) }
					onRemove={ onRemoveImage( 'large' ) }
				/>

				<SelectControl
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					label={ __(
						'Aspect Ratio',
						'fancy-squares-core-enhancements'
					) }
					value={ aspectRatio }
					options={ ASPECT_RATIO_OPTIONS }
					onChange={ setAspectRatio }
				/>

				<ClassTokenSection
					title={ __(
						'Border Classes',
						'fancy-squares-core-enhancements'
					) }
					label={ __(
						'Add border classes',
						'fancy-squares-core-enhancements'
					) }
					value={ borderClass }
					options={ borderOptions }
					showValues={ showValues }
					onChange={ onChangeBorderTokens }
					marginBottom="20px"
				/>

				<ClassTokenSection
					title={ __(
						'Border Radius Classes',
						'fancy-squares-core-enhancements'
					) }
					label={ __(
						'Add radius classes',
						'fancy-squares-core-enhancements'
					) }
					value={ borderRadiusClass }
					options={ borderRadiusOptions }
					showValues={ showValues }
					onChange={ onChangeRadiusTokens }
					marginBottom="20px"
				/>
			</PanelBody>
		</InspectorControls>
	);
}
