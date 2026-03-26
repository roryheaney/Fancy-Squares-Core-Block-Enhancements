import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	store as blockEditorStore,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect, useMemo, useRef } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

import BlockEdit from '../../components/BlockEdit';
import { generateClassName } from '../../utils/helpers';
import { useEnsureUniqueAttributeId } from '../../utils/block-id';
import { BLOCK_CONFIG } from '../../config/blockConfig';

const TEMPLATE = [ [ 'fs-blocks/advanced-dropdown-item' ] ];
const ALLOWED_BLOCKS = [ 'fs-blocks/advanced-dropdown-item' ];

const getFallbackActiveItem = ( items ) => {
	if ( ! Array.isArray( items ) || items.length === 0 ) {
		return '';
	}

	const firstDropdownItem = items.find( ( item ) => item.hasDropdown );
	if ( firstDropdownItem ) {
		return firstDropdownItem.itemId;
	}

	return items[ 0 ].itemId;
};

export default function Edit( props ) {
	const { clientId, attributes, setAttributes, name } = props;
	const {
		activeItem,
		defaultFirstItemVisible,
		topLevelLayout = 'horizontal',
		leftMobileBehavior = 'inline',
		additionalClasses,
	} = attributes;
	const { selectBlock } = useDispatch( blockEditorStore );

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
				title:
					block.attributes.title ||
					__( 'New Item', 'fancy-squares-core-enhancements' ),
				hasDropdown: block.attributes.hasDropdown !== false,
			} ) ),
		[ childBlocks ]
	);

	useEnsureUniqueAttributeId( {
		clientId,
		blockName: 'fs-blocks/advanced-dropdown',
		attributeKey: 'blockId',
		setAttributes,
	} );

	const hasInitializedRef = useRef( false );
	useEffect( () => {
		if ( items.length === 0 ) {
			if ( activeItem ) {
				setAttributes( { activeItem: '' } );
			}
			return;
		}

		const fallbackItemId = getFallbackActiveItem( items );

		if ( ! hasInitializedRef.current ) {
			hasInitializedRef.current = true;
			if ( activeItem !== fallbackItemId ) {
				setAttributes( { activeItem: fallbackItemId } );
			}
			return;
		}

		const itemIds = items.map( ( item ) => item.itemId );
		if ( ! activeItem || ! itemIds.includes( activeItem ) ) {
			setAttributes( { activeItem: fallbackItemId } );
		}
	}, [ activeItem, items, setAttributes ] );

	const previousCountRef = useRef( items.length );
	useEffect( () => {
		if ( items.length > previousCountRef.current ) {
			const newItem = items[ items.length - 1 ];
			setAttributes( { activeItem: newItem.itemId } );
			selectBlock( newItem.clientId );
		}
		previousCountRef.current = items.length;
	}, [ items, selectBlock, setAttributes ] );

	const handleItemClick = ( item ) => {
		setAttributes( { activeItem: item.itemId } );
		selectBlock( item.clientId );
	};

	// Sync generated classes to additionalClasses for frontend rendering.
	const generatedClassName = useMemo(
		() => generateClassName( attributes, name, BLOCK_CONFIG ),
		[ attributes, name ]
	);

	useEffect( () => {
		const currentClasses = Array.isArray( additionalClasses )
			? additionalClasses
			: [];
		const nextClasses = generatedClassName.split( ' ' ).filter( Boolean );
		if (
			JSON.stringify( currentClasses ) !== JSON.stringify( nextClasses )
		) {
			setAttributes( { additionalClasses: nextClasses } );
		}
	}, [ additionalClasses, generatedClassName, setAttributes ] );

	const blockProps = useBlockProps( {
		className: [
			'fs-advanced-dropdown',
			'wp-block-fs-blocks-advanced-dropdown',
			topLevelLayout === 'left'
				? 'fs-advanced-dropdown--layout-left'
				: '',
			topLevelLayout === 'left' && leftMobileBehavior === 'list-only'
				? 'fs-advanced-dropdown--left-mobile-list-only'
				: '',
			generatedClassName,
		]
			.filter( Boolean )
			.join( ' ' ),
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'fs-advanced-dropdown__panels' },
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
			renderAppender: false,
		}
	);

	return (
		<>
			<BlockEdit { ...props } />
			<InspectorControls>
				<PanelBody
					title={ __(
						'Dropdown Settings',
						'fancy-squares-core-enhancements'
					) }
					initialOpen={ true }
				>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __(
							'Default first item visible',
							'fancy-squares-core-enhancements'
						) }
						help={ __(
							'When no item is active, show the first dropdown-enabled item.',
							'fancy-squares-core-enhancements'
						) }
						checked={ defaultFirstItemVisible }
						onChange={ ( value ) =>
							setAttributes( { defaultFirstItemVisible: value } )
						}
					/>
					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __(
							'Top-level layout',
							'fancy-squares-core-enhancements'
						) }
						value={ topLevelLayout }
						options={ [
							{
								label: __(
									'Horizontal',
									'fancy-squares-core-enhancements'
								),
								value: 'horizontal',
							},
							{
								label: __(
									'Left',
									'fancy-squares-core-enhancements'
								),
								value: 'left',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( {
								topLevelLayout:
									value === 'left' ? 'left' : 'horizontal',
							} )
						}
					/>
					{ topLevelLayout === 'left' && (
						<SelectControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label={ __(
								'Left layout mobile behavior',
								'fancy-squares-core-enhancements'
							) }
							value={ leftMobileBehavior }
							options={ [
								{
									label: __(
										'Inline panels',
										'fancy-squares-core-enhancements'
									),
									value: 'inline',
								},
								{
									label: __(
										'List only (no panels)',
										'fancy-squares-core-enhancements'
									),
									value: 'list-only',
								},
							] }
							onChange={ ( value ) =>
								setAttributes( {
									leftMobileBehavior:
										value === 'list-only'
											? 'list-only'
											: 'inline',
								} )
							}
						/>
					) }
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<div className="wp-block-fs-blocks-advanced-dropdown-editor">
					<div
						className="fs-advanced-dropdown__item-list"
						role="tablist"
						aria-label={ __(
							'Dropdown items',
							'fancy-squares-core-enhancements'
						) }
					>
						{ items.map( ( item ) => (
							<button
								key={ item.clientId }
								type="button"
								className={ `fs-advanced-dropdown__item-button ${
									activeItem === item.itemId
										? 'is-active'
										: ''
								}` }
								onClick={ () => handleItemClick( item ) }
								role="tab"
								aria-selected={
									activeItem === item.itemId
										? 'true'
										: 'false'
								}
							>
								{ item.title }
							</button>
						) ) }
						<div className="fs-advanced-dropdown__item-appender">
							<InnerBlocks.ButtonBlockAppender />
						</div>
					</div>
					<div { ...innerBlocksProps } />
				</div>
			</div>
		</>
	);
}
