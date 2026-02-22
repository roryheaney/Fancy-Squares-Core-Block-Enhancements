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
import { BLOCK_CONFIG } from '../../config/blockConfig';

const TEXT_DOMAIN = 'fancy-squares-core-enhancements';

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
	{ label: __( 'Two Column', TEXT_DOMAIN ), value: 'two-column' },
	{ label: __( 'Sidebar Left', TEXT_DOMAIN ), value: 'sidebar-left' },
	{ label: __( 'Sidebar Right', TEXT_DOMAIN ), value: 'sidebar-right' },
];

export default function Edit( props ) {
	const { attributes, setAttributes, clientId, name } = props;
	const {
		blockId,
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

	useEffect( () => {
		if ( ! blockId ) {
			setAttributes( { blockId: clientId } );
		}
	}, [ blockId, clientId, setAttributes ] );

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
					title={ __( 'Showcase Layout', TEXT_DOMAIN ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Layout', TEXT_DOMAIN ) }
						value={ layoutType }
						options={ LAYOUT_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( { layoutType: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Hide gallery on mobile', TEXT_DOMAIN ) }
						checked={ hideGalleryOnMobile }
						onChange={ () =>
							setAttributes( {
								hideGalleryOnMobile: ! hideGalleryOnMobile,
							} )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Showcase Events', TEXT_DOMAIN ) }
					initialOpen={ false }
				>
					<TextControl
						label={ __( 'Source event name', TEXT_DOMAIN ) }
						value={ sourceEventName }
						onChange={ ( value ) =>
							setAttributes( { sourceEventName: value } )
						}
						help={ __(
							'Event emitted by the source block to change active media.',
							TEXT_DOMAIN
						) }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...innerBlocksProps } />
		</>
	);
}
