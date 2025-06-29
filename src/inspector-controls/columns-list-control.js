import { PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

export default function ColumnsListControl( BlockEdit, props ) {
	const { attributes, setAttributes } = props;
	const { isList, isConstrained } = attributes;

	const toggleIsList = () => {
		setAttributes( { isList: ! isList } );
	};

	const toggleIsConstrained = () => {
		setAttributes( { isConstrained: ! isConstrained } );
	};

	return (
		<>
			<BlockEdit { ...props } />
			<InspectorControls>
				<PanelBody title="List Settings">
					<ToggleControl
						label="Enable List Role"
						checked={ isList }
						onChange={ toggleIsList }
						help="Adds role='list' to columns and role='listitem' to child columns."
					/>
				</PanelBody>
				<PanelBody title="Layout Settings" initialOpen={ false }>
					<ToggleControl
						label="Constrain Width"
						checked={ isConstrained }
						onChange={ toggleIsConstrained }
						help="Adds responsive max-width class to columns."
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
