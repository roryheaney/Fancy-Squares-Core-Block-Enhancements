import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	SelectControl,
	ToggleControl,
	Button,
	Notice,
} from '@wordpress/components';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { copy } from '@wordpress/icons';

import { generateClassName } from '../../utils/helpers';
import { useEnsureUniqueAttributeId } from '../../utils/block-id';
import { BLOCK_CONFIG } from '../../config/blockConfig';

const ALLOWED_BLOCKS = [
	'core/paragraph',
	'core/heading',
	'core/image',
	'core/buttons',
	'core/button',
	'core/group',
	'core/columns',
	'core/separator',
];

const TEMPLATE = [
	[
		'core/paragraph',
		{
			placeholder: __(
				'Add modal content here…',
				'fancy-squares-core-enhancements'
			),
		},
	],
];

export default function Edit( props ) {
	const { attributes, setAttributes, name, clientId } = props;
	const {
		modalId,
		size,
		centered,
		scrollable,
		staticBackdrop,
		closeOnEscape,
		showHeader,
		title,
		additionalClasses,
	} = attributes;

	const [ copySuccess, setCopySuccess ] = useState( false );

	useEnsureUniqueAttributeId( {
		clientId,
		blockName: 'fs-blocks/modal',
		attributeKey: 'modalId',
		setAttributes,
	} );

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

	const blockProps = useBlockProps( {
		className: 'modal-editor-wrapper',
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'modal-content-editor',
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
		}
	);

	const handleCopyModalId = () => {
		if ( ! modalId ) {
			return;
		}

		const clipboard = window?.navigator?.clipboard;
		if ( ! clipboard?.writeText ) {
			return;
		}

		clipboard.writeText( modalId ).then( () => {
			setCopySuccess( true );
			setTimeout( () => setCopySuccess( false ), 2000 );
		} );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __(
						'Modal Settings',
						'fancy-squares-core-enhancements'
					) }
					initialOpen={ true }
				>
					<div style={ { marginBottom: '16px' } }>
						<TextControl
							__nextHasNoMarginBottom
							__next40pxDefaultSize
							label={ __(
								'Modal ID (Read Only)',
								'fancy-squares-core-enhancements'
							) }
							value={ modalId }
							readOnly={ true }
							help={ __(
								'Copy this ID and paste it in the Modal Button settings to link them together.',
								'fancy-squares-core-enhancements'
							) }
						/>
						<Button
							variant="secondary"
							icon={ copy }
							onClick={ handleCopyModalId }
							style={ { width: '100%' } }
						>
							{ __(
								'Copy Modal ID',
								'fancy-squares-core-enhancements'
							) }
						</Button>
						{ copySuccess && (
							<Notice
								status="success"
								isDismissible={ false }
								style={ { marginTop: '8px', marginBottom: 0 } }
							>
								{ __(
									'Modal ID copied!',
									'fancy-squares-core-enhancements'
								) }
							</Notice>
						) }
					</div>

					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __(
							'Modal Title',
							'fancy-squares-core-enhancements'
						) }
						value={ title }
						onChange={ ( value ) =>
							setAttributes( { title: value } )
						}
					/>

					<SelectControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __(
							'Modal Size',
							'fancy-squares-core-enhancements'
						) }
						value={ size }
						options={ [
							{
								label: __(
									'Small',
									'fancy-squares-core-enhancements'
								),
								value: 'small',
							},
							{
								label: __(
									'Default',
									'fancy-squares-core-enhancements'
								),
								value: 'default',
							},
							{
								label: __(
									'Large',
									'fancy-squares-core-enhancements'
								),
								value: 'large',
							},
							{
								label: __(
									'Extra Large',
									'fancy-squares-core-enhancements'
								),
								value: 'xl',
							},
							{
								label: __(
									'Fullscreen',
									'fancy-squares-core-enhancements'
								),
								value: 'fullscreen',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { size: value } )
						}
					/>

					<ToggleControl
						__nextHasNoMarginBottom
						label={ __(
							'Center Modal',
							'fancy-squares-core-enhancements'
						) }
						checked={ centered }
						onChange={ ( value ) =>
							setAttributes( { centered: value } )
						}
						help={ __(
							'Vertically center the modal on screen',
							'fancy-squares-core-enhancements'
						) }
					/>

					<ToggleControl
						__nextHasNoMarginBottom
						label={ __(
							'Scrollable Content',
							'fancy-squares-core-enhancements'
						) }
						checked={ scrollable }
						onChange={ ( value ) =>
							setAttributes( { scrollable: value } )
						}
						help={ __(
							'Enable scrolling within modal body',
							'fancy-squares-core-enhancements'
						) }
					/>

					<ToggleControl
						__nextHasNoMarginBottom
						label={ __(
							'Static Backdrop',
							'fancy-squares-core-enhancements'
						) }
						checked={ staticBackdrop }
						onChange={ ( value ) =>
							setAttributes( { staticBackdrop: value } )
						}
						help={ __(
							'Prevent closing modal when clicking outside',
							'fancy-squares-core-enhancements'
						) }
					/>

					<ToggleControl
						__nextHasNoMarginBottom
						label={ __(
							'Close on Escape Key',
							'fancy-squares-core-enhancements'
						) }
						checked={ closeOnEscape }
						onChange={ ( value ) =>
							setAttributes( { closeOnEscape: value } )
						}
						help={ __(
							'Allow closing modal with Escape key',
							'fancy-squares-core-enhancements'
						) }
					/>

					<ToggleControl
						__nextHasNoMarginBottom
						label={ __(
							'Show Header',
							'fancy-squares-core-enhancements'
						) }
						checked={ showHeader }
						onChange={ ( value ) =>
							setAttributes( { showHeader: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="modal-editor-preview">
					{ showHeader && (
						<div className="modal-header-preview">
							<h5>{ title || 'Modal Title' }</h5>
						</div>
					) }
					<div className="modal-body-preview">
						<div { ...innerBlocksProps } />
					</div>
				</div>
			</div>
		</>
	);
}
