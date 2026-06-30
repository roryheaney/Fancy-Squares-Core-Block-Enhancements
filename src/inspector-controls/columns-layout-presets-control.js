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
	getColumnsLayoutResetAttributeUpdates,
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

	const resetColumns = () => {
		if ( childColumns.length === 0 ) {
			setNotice( {
				status: 'warning',
				message:
					'No child columns were found. Add columns before applying a layout preset.',
			} );
			return;
		}

		const updates = getColumnsLayoutResetAttributeUpdates();

		childColumns.forEach( ( childId ) => {
			updateBlockAttributes( childId, updates );
		} );

		setNotice( {
			status: 'success',
			message: `Width settings cleared on ${ getChildColumnLabel(
				childColumns.length
			) }. Columns reverted to default equal-width behavior.`,
		} );
	};

	return (
		<PanelBody title="Columns Layout Presets" initialOpen={ false }>
			<p className="greyd-inspector-help">
				Apply a responsive layout preset to the current child columns.
				This sets each child column&apos;s Width Settings once; you can
				adjust individual columns afterward. Reset removes applied
				widths so columns revert to default equal-width behavior.
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
			<Button
				variant="secondary"
				onClick={ resetColumns }
				className="fs-columns-layout-presets__reset"
			>
				Reset columns
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
