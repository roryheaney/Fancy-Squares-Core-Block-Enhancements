import { PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

export default function ColumnsListControl( BlockEdit, props ) {
	const { attributes, setAttributes } = props;
	const { isList } = attributes;

	const toggleIsList = () => {
		setAttributes( { isList: ! isList } );
	};

	return (
		<>
			<BlockEdit { ...props } />
			<InspectorControls>
				<PanelBody
					title={
						<span className="fs-panel-title">
							List Settings
							{ isList && (
								<span
									className="fs-panel-indicator"
									aria-hidden="true"
								/>
							) }
						</span>
					}
				>
					<ToggleControl
						label="Enable List Role"
						checked={ isList }
						onChange={ toggleIsList }
						help="Adds role='list' to columns and role='listitem' to child columns."
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
