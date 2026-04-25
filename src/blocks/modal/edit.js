import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useMemo, useState } from '@wordpress/element';

import ModalInspectorControls from './modal-inspector-controls';
import { generateClassName } from '../../utils/helpers';
import { useEnsureUniqueAttributeId } from '../../utils/block-id';
import { useSyncGeneratedClasses } from '../../utils/use-sync-generated-classes';
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
	useSyncGeneratedClasses( {
		additionalClasses,
		generatedClassName,
		setAttributes,
	} );

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
			<ModalInspectorControls
				modalId={ modalId }
				copySuccess={ copySuccess }
				handleCopyModalId={ handleCopyModalId }
				title={ title }
				size={ size }
				centered={ centered }
				scrollable={ scrollable }
				staticBackdrop={ staticBackdrop }
				closeOnEscape={ closeOnEscape }
				showHeader={ showHeader }
				setAttributes={ setAttributes }
			/>

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
