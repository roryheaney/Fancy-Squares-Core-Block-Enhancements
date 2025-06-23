import { PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

export default function LightboxControl( BlockEdit, props ) {
	const { attributes, setAttributes } = props;
	const { enableLightbox } = attributes;

	const toggleEnableLightbox = () => {
		setAttributes( { enableLightbox: ! enableLightbox } );
	};

	return (
		<>
			<BlockEdit { ...props } />
			<InspectorControls>
				<PanelBody title="Lightbox Settings" initialOpen={ false }>
					<ToggleControl
						label="Enable Lightbox"
						checked={ enableLightbox }
						onChange={ toggleEnableLightbox }
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
