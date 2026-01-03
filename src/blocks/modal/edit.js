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
import { BLOCK_CONFIG } from '../../config/blockConfig';

const TEXT_DOMAIN = 'fancy-squares-core-enhancements';

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
		{ placeholder: __( 'Add modal content here...', TEXT_DOMAIN ) },
	],
];

export default function Edit( props ) {
	const { attributes, setAttributes, name } = props;
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

	// Auto-generate modalId on block insert if empty
	useEffect( () => {
		if ( ! modalId ) {
			// Generate unique ID similar to wp_unique_id() format
			const timestamp = Date.now().toString( 36 );
			const random = Math.random().toString( 36 ).substring( 2, 7 );
			const generatedId = `modal-${ timestamp }${ random }`;
			setAttributes( { modalId: generatedId } );
		}
	}, [] );

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
		navigator.clipboard.writeText( modalId ).then( () => {
			setCopySuccess( true );
			setTimeout( () => setCopySuccess( false ), 2000 );
		} );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Modal Settings', TEXT_DOMAIN ) }
					initialOpen={ true }
				>
					<div style={ { marginBottom: '16px' } }>
						<TextControl
							label={ __( 'Modal ID (Read Only)', TEXT_DOMAIN ) }
							value={ modalId }
							readOnly={ true }
							help={ __(
								'Copy this ID and paste it in the Modal Button settings to link them together.',
								TEXT_DOMAIN
							) }
						/>
						<Button
							variant="secondary"
							icon={ copy }
							onClick={ handleCopyModalId }
							style={ { width: '100%' } }
						>
							{ __( 'Copy Modal ID', TEXT_DOMAIN ) }
						</Button>
						{ copySuccess && (
							<Notice
								status="success"
								isDismissible={ false }
								style={ { marginTop: '8px', marginBottom: 0 } }
							>
								{ __( 'Modal ID copied!', TEXT_DOMAIN ) }
							</Notice>
						) }
					</div>

					<TextControl
						label={ __( 'Modal Title', TEXT_DOMAIN ) }
						value={ title }
						onChange={ ( value ) =>
							setAttributes( { title: value } )
						}
					/>

					<SelectControl
						label={ __( 'Modal Size', TEXT_DOMAIN ) }
						value={ size }
						options={ [
							{
								label: __( 'Small', TEXT_DOMAIN ),
								value: 'small',
							},
							{
								label: __( 'Default', TEXT_DOMAIN ),
								value: 'default',
							},
							{
								label: __( 'Large', TEXT_DOMAIN ),
								value: 'large',
							},
							{
								label: __( 'Extra Large', TEXT_DOMAIN ),
								value: 'xl',
							},
							{
								label: __( 'Fullscreen', TEXT_DOMAIN ),
								value: 'fullscreen',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { size: value } )
						}
					/>

					<ToggleControl
						label={ __( 'Center Modal', TEXT_DOMAIN ) }
						checked={ centered }
						onChange={ ( value ) =>
							setAttributes( { centered: value } )
						}
						help={ __(
							'Vertically center the modal on screen',
							TEXT_DOMAIN
						) }
					/>

					<ToggleControl
						label={ __( 'Scrollable Content', TEXT_DOMAIN ) }
						checked={ scrollable }
						onChange={ ( value ) =>
							setAttributes( { scrollable: value } )
						}
						help={ __(
							'Enable scrolling within modal body',
							TEXT_DOMAIN
						) }
					/>

					<ToggleControl
						label={ __( 'Static Backdrop', TEXT_DOMAIN ) }
						checked={ staticBackdrop }
						onChange={ ( value ) =>
							setAttributes( { staticBackdrop: value } )
						}
						help={ __(
							'Prevent closing modal when clicking outside',
							TEXT_DOMAIN
						) }
					/>

					<ToggleControl
						label={ __( 'Close on Escape Key', TEXT_DOMAIN ) }
						checked={ closeOnEscape }
						onChange={ ( value ) =>
							setAttributes( { closeOnEscape: value } )
						}
						help={ __(
							'Allow closing modal with Escape key',
							TEXT_DOMAIN
						) }
					/>

					<ToggleControl
						label={ __( 'Show Header', TEXT_DOMAIN ) }
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
