import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	InnerBlocks,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { useEffect, useMemo, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';

import BlockEdit from '../../components/BlockEdit';
import { generateClassName } from '../../utils/helpers';
import { BLOCK_CONFIG } from '../../config/blockConfig';

const TEXT_DOMAIN = 'fancy-squares-core-enhancements';

export default function Edit( props ) {
	const { clientId, attributes, setAttributes, name } = props;
	const { blockId, activeItem, openFirstItem, additionalClasses } =
		attributes;

	const { childBlocks } = useSelect(
		( select ) => ( {
			childBlocks: select( blockEditorStore ).getBlocks( clientId ),
		} ),
		[ clientId ]
	);

	const items = useMemo(
		() =>
			childBlocks.map( ( block ) => ( {
				clientId: block.clientId,
				itemId: block.attributes.itemId || block.clientId,
			} ) ),
		[ childBlocks ]
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
	}, [ clientId, blockId, setAttributes ] );

	// Reset activeItem on initial mount (page load), but allow changes during session
	const hasInitializedRef = useRef( false );
	useEffect( () => {
		if ( items.length === 0 ) {
			if ( activeItem ) {
				setAttributes( { activeItem: '' } );
			}
			return;
		}

		// Only reset on initial mount
		if ( ! hasInitializedRef.current ) {
			hasInitializedRef.current = true;
			// Reset based on openFirstItem setting
			const shouldOpenFirst = openFirstItem && items.length > 0;
			const targetActiveItem = shouldOpenFirst ? items[ 0 ].itemId : '';

			if ( activeItem !== targetActiveItem ) {
				setAttributes( { activeItem: targetActiveItem } );
			}
		} else {
			// After initialization, validate activeItem still exists
			const itemExists = items.some(
				( item ) => item.itemId === activeItem
			);
			if ( activeItem && ! itemExists ) {
				setAttributes( { activeItem: '' } );
			}
		}
	}, [ activeItem, openFirstItem, setAttributes, items ] );

	const blockProps = useBlockProps( {
		className: 'fs-accordion',
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			allowedBlocks: [ 'fs-blocks/accordion-item-interactive' ],
			template: [ [ 'fs-blocks/accordion-item-interactive', {} ] ],
			renderAppender: InnerBlocks.ButtonBlockAppender,
		}
	);

	return (
		<>
			<BlockEdit { ...props } />
			<InspectorControls>
				<PanelBody
					title={ __( 'Accordion Settings', TEXT_DOMAIN ) }
					initialOpen={ true }
				>
					<ToggleControl
						label={ __( 'Open First Item', TEXT_DOMAIN ) }
						help={ __(
							'Automatically open the first accordion item on page load.',
							TEXT_DOMAIN
						) }
						checked={ openFirstItem }
						onChange={ ( value ) =>
							setAttributes( { openFirstItem: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
