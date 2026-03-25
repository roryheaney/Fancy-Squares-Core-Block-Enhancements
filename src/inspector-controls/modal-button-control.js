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
						__nextHasNoMarginBottom
						label="Trigger a modal"
						checked={ !! triggerModal }
						onChange={ () =>
							setAttributes( { triggerModal: ! triggerModal } )
						}
					/>
					{ triggerModal && (
						<TextControl
							__nextHasNoMarginBottom
							__next40pxDefaultSize
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
