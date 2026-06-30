import {
	Button,
	Notice,
	PanelBody,
	SelectControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';

import {
	COLUMN_LAYOUT_PRESETS,
	getColumnsLayoutPreset,
	getColumnsLayoutPresetAttributeUpdates,
} from './columns-layout-presets';

const DEFAULT_PRESET_VALUE = COLUMN_LAYOUT_PRESETS[ 0 ]?.value || '';

const getChildColumnLabel = ( count ) =>
	`${ count } child column${ count === 1 ? '' : 's' }`;

export default function ColumnsLayoutPresetsControl( { clientId } ) {
	const [ selectedPreset, setSelectedPreset ] =
		useState( DEFAULT_PRESET_VALUE );
	const [ notice, setNotice ] = useState( null );
	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );

	const childColumns = useSelect(
		( select ) => {
			const blockEditor = select( 'core/block-editor' );
			const childIds = blockEditor.getBlockOrder( clientId ) || [];

			return childIds.filter(
				( childId ) =>
					blockEditor.getBlockName( childId ) === 'core/column'
			);
		},
		[ clientId ]
	);

	const selectedPresetConfig = getColumnsLayoutPreset( selectedPreset );

	const applyPreset = () => {
		const updates =
			getColumnsLayoutPresetAttributeUpdates( selectedPreset );
		if ( ! updates || childColumns.length === 0 ) {
			setNotice( {
				status: 'warning',
				message:
					'No child columns were found. Add columns before applying a layout preset.',
			} );
			return;
		}

		childColumns.forEach( ( childId ) => {
			updateBlockAttributes( childId, updates );
		} );

		setNotice( {
			status: 'success',
			message: `Layout preset applied to ${ getChildColumnLabel(
				childColumns.length
			) }. Individual Width Settings remain editable.`,
		} );
	};

	return (
		<PanelBody title="Columns Layout Presets" initialOpen={ false }>
			<p className="greyd-inspector-help">
				Apply a responsive layout preset to the current child columns.
				This sets each child column&apos;s Width Settings once; you can
				adjust individual columns afterward.
			</p>
			<SelectControl
				__nextHasNoMarginBottom
				label="Layout preset"
				value={ selectedPreset }
				options={ COLUMN_LAYOUT_PRESETS.map( ( preset ) => ( {
					label: preset.label,
					value: preset.value,
				} ) ) }
				onChange={ ( value ) => {
					setSelectedPreset( value );
					setNotice( null );
				} }
			/>
			{ selectedPresetConfig?.summary && (
				<p className="greyd-inspector-help">
					{ selectedPresetConfig.summary }
				</p>
			) }
			<Button variant="secondary" onClick={ applyPreset }>
				Apply layout preset
			</Button>
			{ notice && (
				<Notice
					status={ notice.status }
					isDismissible={ true }
					onRemove={ () => setNotice( null ) }
				>
					{ notice.message }
				</Notice>
			) }
		</PanelBody>
	);
}
