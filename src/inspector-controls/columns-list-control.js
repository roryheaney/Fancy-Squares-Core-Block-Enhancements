import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

import ColumnsLayoutPresetsControl from './columns-layout-presets-control';

export default function ColumnsListControl( { BlockEdit, ...props } ) {
	const { attributes, setAttributes, isSelected, clientId } = props;
	const { isList } = attributes;

	if ( ! isSelected ) {
		return <BlockEdit { ...props } />;
	}

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
						__nextHasNoMarginBottom
						label="Enable List Role"
						checked={ isList }
						onChange={ toggleIsList }
						help="Adds role='list' to columns and role='listitem' to child columns."
					/>
				</PanelBody>
				<ColumnsLayoutPresetsControl clientId={ clientId } />
			</InspectorControls>
		</>
	);
}
