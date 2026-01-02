import {
	useBlockProps,
	RichText,
	InnerBlocks,
	store as blockEditorStore,
} from '@wordpress/block-editor';
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
	const { title, itemId } = attributes;

	useEffect( () => {
		if ( ! itemId ) {
			setAttributes( { itemId: clientId } );
		}
	}, [ clientId, itemId, setAttributes ] );

	const activeItem = context[ 'fs-blocks/accordion-interactive/activeItem' ];
	const isActiveItem = activeItem === ( itemId || clientId );

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
	);
}
