import {
	useBlockProps,
	RichText,
	InnerBlocks,
	store as blockEditorStore,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const TEXT_DOMAIN = 'fancy-squares-core-enhancements';

export default function Edit( {
	clientId,
	attributes,
	setAttributes,
	context,
} ) {
	const { title, itemId, showcaseMedia, showcaseMediaId, showcaseMediaType } =
		attributes;
	const previewMediaType = showcaseMediaType || showcaseMedia?.type || '';

	useEffect( () => {
		if ( ! itemId ) {
			setAttributes( { itemId: clientId } );
		}
	}, [ clientId, itemId, setAttributes ] );

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

	return (
		<>
			{ isInsideShowcase && (
				<InspectorControls>
					<PanelBody
						title={
							<span className="fs-panel-title">
								{ __( 'Showcase Media', TEXT_DOMAIN ) }
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
											? __( 'Change Media', TEXT_DOMAIN )
											: __(
													'Select Image or Video',
													TEXT_DOMAIN
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
									{ __( 'Remove Media', TEXT_DOMAIN ) }
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
								TEXT_DOMAIN
							) }
							allowedFormats={ [] }
							onClick={ ( e ) => e.stopPropagation() }
						/>
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
