// components/BlockEdit.js
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	CheckboxControl,
	ToggleControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

import TokenFields from './TokenFields';
import WidthControls from './WidthControls';
import PaddingControls from './PaddingControls';
import PositiveMarginControls from './PositiveMarginControls';
import NegativeMarginControls from './NegativeMarginControls';
import { BLOCK_CONFIG } from '../config/blockConfig';

const BlockEdit = ( props ) => {
	const { attributes, setAttributes, name, clientId } = props;
	const config = BLOCK_CONFIG[ name ] || {};
	const dropdownConfig = config.dropdown || {};
	const hasClassOptions =
		Array.isArray( config.classOptions ) && config.classOptions.length > 0;
	const showPaddingControls = Array.isArray( config.allowedPaddingControls );
	const showPositiveMarginControls = Array.isArray(
		config.allowedPositiveMarginControls
	);
	const showNegativeMarginControls = Array.isArray(
		config.allowedNegativeMarginControls
	);
	const uniqueDropdownValue = attributes[ dropdownConfig.attributeKey ];
	const [ showValues, setShowValues ] = useState( false );

	const { parent, parentAtts } = useSelect(
		( select ) => ( {
			parent: select( 'core/block-editor' ).getBlockParents( clientId ),
			parentAtts: select( 'core/block-editor' ).getBlockAttributes(
				select( 'core/block-editor' ).getBlockParents( clientId )[ 0 ]
			),
		} ),
		[ clientId ]
	);

	const isBootstrap =
		parentAtts?.className &&
		parentAtts.className.includes( 'is-style-bootstrap' );

	return (
		<InspectorControls>
			{ hasClassOptions && (
				<PanelBody
					title="Visibility / Position Classes"
					initialOpen={ false }
				>
					<CheckboxControl
						label="Show Values"
						checked={ showValues }
						onChange={ setShowValues }
						help="Display class names instead of labels."
						style={ { marginBottom: '20px' } }
					/>
					<TokenFields
						config={ config }
						attributes={ attributes }
						setAttributes={ setAttributes }
						showValues={ showValues }
					/>
				</PanelBody>
			) }
			{ dropdownConfig.attributeKey && (
				<PanelBody title="Block Specific Classes" initialOpen={ false }>
					<SelectControl
						label={ dropdownConfig.label || 'Unique Option' }
						value={ uniqueDropdownValue }
						options={ dropdownConfig.options || [] }
						onChange={ ( newVal ) =>
							setAttributes( {
								[ dropdownConfig.attributeKey ]: newVal,
							} )
						}
					/>
				</PanelBody>
			) }
			{ config.hasConstrainToggle && (
				<PanelBody title="Layout" initialOpen={ false }>
					<ToggleControl
						label="Constrain width"
						checked={ attributes.isConstrained }
						onChange={ () =>
							setAttributes( {
								isConstrained: ! attributes.isConstrained,
							} )
						}
						help="Limit columns max width in a full width container."
					/>
				</PanelBody>
			) }
			<WidthControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				isBootstrap={ isBootstrap }
				parent={ parent }
				parentAtts={ parentAtts }
				config={ config }
			/>
			{ showPaddingControls && (
				<PaddingControls
					attributes={ attributes }
					setAttributes={ setAttributes }
					allowedControls={ config.allowedPaddingControls }
				/>
			) }
			{ showPositiveMarginControls && (
				<PositiveMarginControls
					attributes={ attributes }
					setAttributes={ setAttributes }
					allowedControls={ config.allowedPositiveMarginControls }
				/>
			) }
			{ showNegativeMarginControls && (
				<NegativeMarginControls
					attributes={ attributes }
					setAttributes={ setAttributes }
					allowedControls={ config.allowedNegativeMarginControls }
				/>
			) }
		</InspectorControls>
	);
};

export default BlockEdit;
