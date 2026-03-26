import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	TextControl,
} from '@wordpress/components';
import { useEffect, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import BlockEdit from '../../components/BlockEdit';
import { generateClassName } from '../../utils/helpers';
import { useEnsureUniqueAttributeId } from '../../utils/block-id';
import { BLOCK_CONFIG } from '../../config/blockConfig';

const TEMPLATE = [
	[
		'core/columns',
		{ className: 'fs-content-showcase__columns' },
		[
			[
				'core/column',
				{
					className:
						'fs-content-showcase__column fs-content-showcase__column--content',
				},
				[ [ 'fs-blocks/accordion-interactive' ] ],
			],
			[
				'core/column',
				{
					className:
						'fs-content-showcase__column fs-content-showcase__column--media',
				},
				[ [ 'fs-blocks/showcase-gallery' ] ],
			],
		],
	],
];

const LAYOUT_OPTIONS = [
	{
		label: __( 'Two Column', 'fancy-squares-core-enhancements' ),
		value: 'two-column',
	},
	{
		label: __( 'Sidebar Left', 'fancy-squares-core-enhancements' ),
		value: 'sidebar-left',
	},
	{
		label: __( 'Sidebar Right', 'fancy-squares-core-enhancements' ),
		value: 'sidebar-right',
	},
];

export default function Edit( props ) {
	const { attributes, setAttributes, clientId, name } = props;
	const {
		layoutType,
		hideGalleryOnMobile,
		sourceEventName,
		additionalClasses,
	} = attributes;

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

	useEnsureUniqueAttributeId( {
		clientId,
		blockName: 'fs-blocks/content-showcase',
		attributeKey: 'blockId',
		setAttributes,
	} );

	const layoutClass = layoutType
		? `fs-content-showcase--layout-${ layoutType }`
		: '';
	const hideClass = hideGalleryOnMobile
		? 'fs-content-showcase--hide-gallery-mobile'
		: '';

	const blockProps = useBlockProps( {
		className: [
			'fs-content-showcase',
			'd-block',
			layoutClass,
			hideClass,
			generatedClassName,
		]
			.filter( Boolean )
			.join( ' ' ),
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		template: TEMPLATE,
		templateLock: false,
	} );

	return (
		<>
			<BlockEdit { ...props } />
			<InspectorControls>
				<PanelBody
					title={ __(
						'Showcase Layout',
						'fancy-squares-core-enhancements'
					) }
					initialOpen={ false }
				>
					<SelectControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __(
							'Layout',
							'fancy-squares-core-enhancements'
						) }
						value={ layoutType }
						options={ LAYOUT_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( { layoutType: value } )
						}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __(
							'Hide gallery on mobile',
							'fancy-squares-core-enhancements'
						) }
						checked={ hideGalleryOnMobile }
						onChange={ () =>
							setAttributes( {
								hideGalleryOnMobile: ! hideGalleryOnMobile,
							} )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __(
						'Showcase Events',
						'fancy-squares-core-enhancements'
					) }
					initialOpen={ false }
				>
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __(
							'Source event name',
							'fancy-squares-core-enhancements'
						) }
						value={ sourceEventName }
						onChange={ ( value ) =>
							setAttributes( { sourceEventName: value } )
						}
						help={ __(
							'Event emitted by the source block to change active media.',
							'fancy-squares-core-enhancements'
						) }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...innerBlocksProps } />
		</>
	);
}
