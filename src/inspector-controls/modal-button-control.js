import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

export default function ModalButtonControl( { BlockEdit, ...props } ) {
	const { attributes, setAttributes, isSelected } = props;
	const { triggerModal, modalId } = attributes;

	if ( ! isSelected ) {
		return <BlockEdit { ...props } />;
	}

	return (
		<>
			<BlockEdit { ...props } />
			<InspectorControls>
				<PanelBody
					title={
						<span className="fs-panel-title">
							Modal Settings
							{ ( triggerModal ||
								( modalId && modalId.trim() !== '' ) ) && (
								<span
									className="fs-panel-indicator"
									aria-hidden="true"
								/>
							) }
						</span>
					}
				>
					<ToggleControl
						label="Trigger a modal"
						checked={ !! triggerModal }
						onChange={ () =>
							setAttributes( { triggerModal: ! triggerModal } )
						}
					/>
					{ triggerModal && (
						<TextControl
							label="Modal ID"
							value={ modalId }
							onChange={ ( value ) =>
								setAttributes( { modalId: value } )
							}
							help="Enter the modal element ID"
						/>
					) }
				</PanelBody>
			</InspectorControls>
		</>
	);
}
