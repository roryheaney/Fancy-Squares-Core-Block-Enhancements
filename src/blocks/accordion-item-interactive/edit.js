import {
	useBlockProps,
	RichText,
	InnerBlocks,
	store as blockEditorStore,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	useSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	TextControl,
	ColorPalette,
} from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { useEnsureUniqueAttributeId } from '../../utils/block-id';

const isRichTextTitleSpaceKeyDown = ( event ) =>
	event.key === ' ' &&
	event.target.closest( '.block-editor-rich-text__editable' );

const getPillForegroundColor = ( color ) => {
	const hex = color?.replace( '#', '' );

	if ( ! hex || ! [ 3, 6 ].includes( hex.length ) ) {
		return '#000000';
	}

	const full =
		hex.length === 3
			? hex
					.split( '' )
					.map( ( char ) => char + char )
					.join( '' )
			: hex;

	const r = parseInt( full.slice( 0, 2 ), 16 );
	const g = parseInt( full.slice( 2, 4 ), 16 );
	const b = parseInt( full.slice( 4, 6 ), 16 );
	const yiq = ( r * 299 + g * 587 + b * 114 ) / 1000;

	return yiq >= 128 ? '#000000' : '#ffffff';
};

export default function Edit( {
	clientId,
	attributes,
	setAttributes,
	context,
} ) {
	const {
		title,
		itemId,
		showcaseMedia,
		showcaseMediaId,
		showcaseMediaType,
		pills = [],
	} = attributes;
	const previewMediaType = showcaseMediaType || showcaseMedia?.type || '';
	const [ themePalette = [] ] = useSettings( 'color.palette' );

	const setPills = ( nextPills ) => setAttributes( { pills: nextPills } );

	const addPill = () =>
		setPills( [ ...pills, { text: '', bg: '', fg: '' } ] );

	const removePill = ( index ) =>
		setPills( pills.filter( ( pill, i ) => i !== index ) );

	const updatePill = ( index, changes ) =>
		setPills(
			pills.map( ( pill, i ) =>
				i === index ? { ...pill, ...changes } : pill
			)
		);

	const handlePillColorChange = ( index, color ) => {
		if ( ! color ) {
			updatePill( index, { bg: '', fg: '' } );
			return;
		}

		updatePill( index, { bg: color, fg: getPillForegroundColor( color ) } );
	};

	useEnsureUniqueAttributeId( {
		clientId,
		blockName: 'fs-blocks/accordion-item-interactive',
		attributeKey: 'itemId',
		setAttributes,
	} );

	const activeItem = context[ 'fs-blocks/accordion-interactive/activeItem' ];
	const isActiveItem = activeItem === ( itemId || clientId );
	const isInsideShowcase =
		context?.[ 'fs-blocks/content-showcase/isShowcase' ] || false;

	// Get parent block ID
	const parentClientId = useSelect(
		( select ) => {
			const { getBlockParents } = select( blockEditorStore );
			const parents = getBlockParents( clientId );
			return parents.length > 0 ? parents[ parents.length - 1 ] : null;
		},
		[ clientId ]
	);

	const { updateBlockAttributes } = useDispatch( blockEditorStore );

	const blockProps = useBlockProps( {
		className: `fs-accordion__item ${ isActiveItem ? 'is-active' : '' }`,
	} );

	const onSelectShowcaseMedia = ( media ) => {
		if ( ! media?.id || ! media?.url ) {
			return;
		}

		const mediaType = media?.type || media?.media_type || '';
		const mimeType = media?.mime || media?.mime_type || '';

		setAttributes( {
			showcaseMedia: {
				id: media.id,
				url: media.url,
				alt: media.alt || '',
				type: mediaType,
				mime: mimeType,
			},
			showcaseMediaId: media.id,
			showcaseMediaType: mediaType,
		} );
	};

	const onRemoveShowcaseMedia = () => {
		setAttributes( {
			showcaseMedia: {},
			showcaseMediaId: 0,
			showcaseMediaType: '',
		} );
	};

	// Handle clicks on the trigger for editor UI only (not persisted to post_content)
	const handleTriggerClick = ( e ) => {
		// Don't toggle if clicking on the title (RichText)
		if ( e.target.closest( '.block-editor-rich-text__editable' ) ) {
			return;
		}

		if ( ! parentClientId ) {
			return;
		}

		const currentItemId = itemId || clientId;
		const newActiveItem = isActiveItem ? '' : currentItemId;

		// This updates editor UI state only - not saved to database
		updateBlockAttributes( parentClientId, {
			activeItem: newActiveItem,
		} );
	};

	const handleTriggerKeyDown = ( event ) => {
		if ( isRichTextTitleSpaceKeyDown( event ) ) {
			return;
		}

		if ( event.key === 'Enter' || event.key === ' ' ) {
			event.preventDefault();
			handleTriggerClick( event );
		}
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Pills', 'fancy-squares-core-enhancements' ) }
					initialOpen={ true }
				>
					{ pills.map( ( pill, index ) => (
						<div key={ index } style={ { marginBottom: '1rem' } }>
							<TextControl
								__nextHasNoMarginBottom
								label={ __(
									'Pill Text',
									'fancy-squares-core-enhancements'
								) }
								value={ pill.text }
								onChange={ ( text ) =>
									updatePill( index, { text } )
								}
							/>
							<ColorPalette
								colors={ themePalette }
								value={ pill.bg }
								onChange={ ( color ) =>
									handlePillColorChange( index, color )
								}
								label={ __(
									'Pill Background Color',
									'fancy-squares-core-enhancements'
								) }
							/>
							<Button
								variant="tertiary"
								isDestructive
								onClick={ () => removePill( index ) }
								style={ { marginTop: '0.5rem' } }
							>
								{ __(
									'Remove Pill',
									'fancy-squares-core-enhancements'
								) }
							</Button>
						</div>
					) ) }
					<Button variant="secondary" onClick={ addPill }>
						{ __( 'Add Pill', 'fancy-squares-core-enhancements' ) }
					</Button>
				</PanelBody>
			</InspectorControls>
			{ isInsideShowcase && (
				<InspectorControls>
					<PanelBody
						title={
							<span className="fs-panel-title">
								{ __(
									'Showcase Media',
									'fancy-squares-core-enhancements'
								) }
								{ showcaseMediaId ? (
									<span
										className="fs-panel-indicator"
										aria-hidden="true"
									/>
								) : null }
							</span>
						}
						initialOpen={ false }
					>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ onSelectShowcaseMedia }
								allowedTypes={ [ 'image', 'video' ] }
								value={ showcaseMediaId }
								render={ ( { open } ) => (
									<Button
										variant="secondary"
										onClick={ open }
									>
										{ showcaseMediaId
											? __(
													'Change Media',
													'fancy-squares-core-enhancements'
											  )
											: __(
													'Select Image or Video',
													'fancy-squares-core-enhancements'
											  ) }
									</Button>
								) }
							/>
						</MediaUploadCheck>
						{ showcaseMedia?.url && (
							<div style={ { marginTop: '1rem' } }>
								{ previewMediaType === 'video' ? (
									<video
										src={ showcaseMedia.url }
										controls
										style={ {
											width: '100%',
											display: 'block',
										} }
									/>
								) : (
									<img
										src={ showcaseMedia.url }
										alt={ showcaseMedia.alt || '' }
										style={ {
											width: '100%',
											display: 'block',
										} }
									/>
								) }
								<Button
									variant="tertiary"
									onClick={ onRemoveShowcaseMedia }
									style={ { marginTop: '0.5rem' } }
								>
									{ __(
										'Remove Media',
										'fancy-squares-core-enhancements'
									) }
								</Button>
							</div>
						) }
					</PanelBody>
				</InspectorControls>
			) }
			<div { ...blockProps }>
				<h3 className="fs-accordion__header">
					<div
						className="fs-accordion__trigger"
						onClick={ handleTriggerClick }
						onKeyDown={ handleTriggerKeyDown }
						style={ { cursor: 'pointer' } }
						role="button"
						tabIndex={ 0 }
					>
						<RichText
							tagName="span"
							value={ title }
							onChange={ ( newTitle ) =>
								setAttributes( { title: newTitle } )
							}
							placeholder={ __(
								'Accordion Item Title',
								'fancy-squares-core-enhancements'
							) }
							allowedFormats={ [] }
							onClick={ ( e ) => e.stopPropagation() }
						/>
						{ pills.some( ( pill ) => pill.text?.trim() ) && (
							// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
							<span
								className="fs-accordion__pills"
								onClick={ ( e ) => e.stopPropagation() }
							>
								{ pills
									.filter(
										( pill ) => pill.text?.trim() && pill.bg
									)
									.map( ( pill, index ) => (
										<span
											key={ index }
											className="fs-accordion__pill"
											style={ {
												backgroundColor: pill.bg,
												color: pill.fg || '#000000',
											} }
										>
											{ pill.text }
										</span>
									) ) }
							</span>
						) }
					</div>
				</h3>
				<div
					className={ `fs-accordion__content${
						isActiveItem ? ' is-open' : ''
					}` }
					style={ {
						display: isActiveItem ? 'block' : 'none',
					} }
				>
					<div className="fs-accordion__body">
						<InnerBlocks />
					</div>
				</div>
			</div>
		</>
	);
}
