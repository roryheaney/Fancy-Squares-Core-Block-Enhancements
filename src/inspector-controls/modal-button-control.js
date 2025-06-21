import { PanelBody, ToggleControl, TextControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

export default function ModalButtonControl( BlockEdit, props ) {
	const { attributes, setAttributes } = props;
	const { triggerModal, modalId } = attributes;

	const toggleTriggerModal = () => {
		setAttributes( { triggerModal: ! triggerModal } );
	};
	const updateModalId = ( value ) => {
		setAttributes( { modalId: value } );
	};

	return (
		<>
			<BlockEdit { ...props } />
			<InspectorControls>
				<PanelBody title="Modal Settings">
					<ToggleControl
						label="Trigger a modal"
						checked={ triggerModal }
						onChange={ toggleTriggerModal }
					/>
					{ triggerModal && (
						<TextControl
							label="Modal ID"
							value={ modalId }
							onChange={ updateModalId }
							help="Enter the modal element ID"
						/>
					) }
				</PanelBody>
			</InspectorControls>
		</>
	);
}
