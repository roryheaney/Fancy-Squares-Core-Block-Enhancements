// components/BlockEdit.js
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	FormTokenField,
	CheckboxControl,
	Button,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import {
	sidesAll,
	sidesHorizontal,
	sidesVertical,
	sidesTop,
	sidesRight,
	sidesBottom,
	sidesLeft,
} from '@wordpress/icons';

import WidthControl from './WidthControl';
import PaddingControl from './PaddingControl';
import PositiveMarginControl from './PositiveMarginControl'; // New import
import NegativeMarginControl from './NegativeMarginControl'; // New import
import {
	getDisplayValues,
	getValuesFromDisplay,
	getSuggestions,
} from '../utils/helpers';
import {
	BLOCK_CONFIG,
	BREAKPOINT_DIMENSIONS,
	CLASS_OPTIONS_MAP,
} from '../config/blockConfig';
import desktopImage from '../assets/icons/desktop.png';
import laptopImage from '../assets/icons/laptop.png';
import tabletImage from '../assets/icons/tablet.png';
import mobileImage from '../assets/icons/mobile.png';

const BlockEdit = ( props ) => {
	const { attributes, setAttributes, name, clientId } = props;
	const config = BLOCK_CONFIG[ name ] || {};
	const dropdownConfig = config.dropdown || {};
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

	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );
	const isBootstrap =
		parentAtts?.className &&
		parentAtts.className.includes( 'is-style-bootstrap' );

	const tokenFields = ( config.classOptions || [] ).map( ( classType ) => {
		const classKey = `${ classType }Classes`;
		const classValue = attributes[ classKey ] || [];
		const { options } = CLASS_OPTIONS_MAP[ classType ];

		const onChange = ( newTokens ) => {
			const newValues = getValuesFromDisplay(
				newTokens,
				options,
				showValues
			);
			setAttributes( { [ classKey ]: newValues } );
		};

		return (
			<div key={ classType } style={ { marginBottom: '20px' } }>
				<FormTokenField
					label={ `${
						classType.charAt( 0 ).toUpperCase() +
						classType.slice( 1 )
					} Classes` }
					value={ getDisplayValues(
						classValue,
						options,
						showValues
					) }
					suggestions={ getSuggestions( options, showValues ) }
					onChange={ onChange }
				/>
				<details style={ { marginTop: '5px' } }>
					<summary>
						{`Available ${
							classType
							// 1) insert a space before each uppercase letter
							.replace(/([A-Z])/g, ' $1')
							// 2) uppercase the very first character
							.replace(/^./, str => str.toUpperCase())
						} Classes`}
					</summary>
					<ul
						style={ {
							fontSize: '12px',
							paddingLeft: '20px',
							margin: '5px 0',
						} }
					>
						{ options.map( ( item ) => (
							<li key={ item.value }>
								{ showValues ? item.value : item.label }
							</li>
						) ) }
					</ul>
				</details>
			</div>
		);
	} );

	const widthControls = config.hasWidthControls ? (
		<PanelBody title="Width Settings" initialOpen={ false }>
			{ ! isBootstrap && (
				<div className="custom-column-widths__bootstrap-notice">
					<p className="greyd-inspector-help">
						By setting the columns style to "Bootstrap", the columns
						no longer break unintentionally.
					</p>
					<Button
						variant="secondary"
						isSmall
						onClick={ () => {
							const newParentAtts = {
								...parentAtts,
								className:
									( parentAtts.className || '' ).replace(
										'is-style-default',
										''
									) + ' is-style-bootstrap',
							};
							updateBlockAttributes( parent[ 0 ], newParentAtts );
						} }
					>
						Set parent to "Bootstrap"
					</Button>
				</div>
			) }
			<WidthControl
				label="Base"
				subLabel={ BREAKPOINT_DIMENSIONS[ '' ] }
				image={ mobileImage }
				breakpoint=""
				value={ attributes.widthBase }
				onChange={ ( value ) => setAttributes( { widthBase: value } ) }
				options={ [
					{ label: '100%', value: '' },
					{ label: 'Automatically', value: 'auto' },
				] }
			/>
			<WidthControl
				label="Mobile"
				subLabel={ BREAKPOINT_DIMENSIONS[ 'sm' ] }
				image={ mobileImage }
				breakpoint="sm"
				value={ attributes.widthSm }
				onChange={ ( value ) => setAttributes( { widthSm: value } ) }
				options={ [
					{ label: 'Heirs ↓', value: '' },
					{ label: 'Automatically', value: 'auto' },
				] }
			/>
			<WidthControl
				label="Tablet"
				subLabel={ BREAKPOINT_DIMENSIONS[ 'md' ] }
				image={ tabletImage }
				breakpoint="md"
				value={ attributes.widthMd }
				onChange={ ( value ) => setAttributes( { widthMd: value } ) }
				options={ [
					{ label: 'Heirs ↓', value: '' },
					{ label: 'Automatically', value: 'auto' },
				] }
			/>
			<WidthControl
				label="Laptop"
				subLabel={ BREAKPOINT_DIMENSIONS[ 'lg' ] }
				image={ laptopImage }
				breakpoint="lg"
				value={ attributes.widthLg }
				onChange={ ( value ) => setAttributes( { widthLg: value } ) }
				options={ [
					{ label: 'Heirs ↓', value: '' },
					{ label: 'Automatically', value: 'auto' },
				] }
			/>
			<WidthControl
				label="Larger Screen"
				subLabel={ BREAKPOINT_DIMENSIONS[ 'xl' ] }
				image={ desktopImage }
				breakpoint="xl"
				value={ attributes.widthXl }
				onChange={ ( value ) => setAttributes( { widthXl: value } ) }
				options={ [
					{ label: 'Heirs ↓', value: '' },
					{ label: 'Automatically', value: 'auto' },
				] }
			/>
			<WidthControl
				label="XXL Screen"
				subLabel={ BREAKPOINT_DIMENSIONS[ 'xxl' ] }
				image={ desktopImage }
				breakpoint="xxl"
				value={ attributes.widthXXl }
				onChange={ ( value ) => setAttributes( { widthXXl: value } ) }
				options={ [
					{ label: 'Heirs ↓', value: '' },
					{ label: 'Automatically', value: 'auto' },
				] }
			/>
		</PanelBody>
	) : null;

	const paddingControls = (
		<PanelBody title="Padding Settings" initialOpen={ false }>
			<PaddingControl
				label="All Sides"
				subLabel="Padding"
				icon={ sidesAll }
				sideType="all"
				baseValue={ attributes.paddingAllBase }
				smValue={ attributes.paddingAllSm }
				mdValue={ attributes.paddingAllMd }
				lgValue={ attributes.paddingAllLg }
				xlValue={ attributes.paddingAllXl }
				onChangeBase={ ( value ) =>
					setAttributes( { paddingAllBase: value } )
				}
				onChangeSm={ ( value ) =>
					setAttributes( { paddingAllSm: value } )
				}
				onChangeMd={ ( value ) =>
					setAttributes( { paddingAllMd: value } )
				}
				onChangeLg={ ( value ) =>
					setAttributes( { paddingAllLg: value } )
				}
				onChangeXl={ ( value ) =>
					setAttributes( { paddingAllXl: value } )
				}
			/>
			<PaddingControl
				label="Horizontal"
				subLabel="Padding"
				icon={ sidesHorizontal }
				sideType="horizontal"
				baseValue={ attributes.paddingHorizontalBase }
				smValue={ attributes.paddingHorizontalSm }
				mdValue={ attributes.paddingHorizontalMd }
				lgValue={ attributes.paddingHorizontalLg }
				xlValue={ attributes.paddingHorizontalXl }
				onChangeBase={ ( value ) =>
					setAttributes( { paddingHorizontalBase: value } )
				}
				onChangeSm={ ( value ) =>
					setAttributes( { paddingHorizontalSm: value } )
				}
				onChangeMd={ ( value ) =>
					setAttributes( { paddingHorizontalMd: value } )
				}
				onChangeLg={ ( value ) =>
					setAttributes( { paddingHorizontalLg: value } )
				}
				onChangeXl={ ( value ) =>
					setAttributes( { paddingHorizontalXl: value } )
				}
			/>
			<PaddingControl
				label="Vertical"
				subLabel="Padding"
				icon={ sidesVertical }
				sideType="vertical"
				baseValue={ attributes.paddingVerticalBase }
				smValue={ attributes.paddingVerticalSm }
				mdValue={ attributes.paddingVerticalMd }
				lgValue={ attributes.paddingVerticalLg }
				xlValue={ attributes.paddingVerticalXl }
				onChangeBase={ ( value ) =>
					setAttributes( { paddingVerticalBase: value } )
				}
				onChangeSm={ ( value ) =>
					setAttributes( { paddingVerticalSm: value } )
				}
				onChangeMd={ ( value ) =>
					setAttributes( { paddingVerticalMd: value } )
				}
				onChangeLg={ ( value ) =>
					setAttributes( { paddingVerticalLg: value } )
				}
				onChangeXl={ ( value ) =>
					setAttributes( { paddingVerticalXl: value } )
				}
			/>
			<PaddingControl
				label="Top"
				subLabel="Padding"
				icon={ sidesTop }
				sideType="top"
				baseValue={ attributes.paddingTopBase }
				smValue={ attributes.paddingTopSm }
				mdValue={ attributes.paddingTopMd }
				lgValue={ attributes.paddingTopLg }
				xlValue={ attributes.paddingTopXl }
				onChangeBase={ ( value ) =>
					setAttributes( { paddingTopBase: value } )
				}
				onChangeSm={ ( value ) =>
					setAttributes( { paddingTopSm: value } )
				}
				onChangeMd={ ( value ) =>
					setAttributes( { paddingTopMd: value } )
				}
				onChangeLg={ ( value ) =>
					setAttributes( { paddingTopLg: value } )
				}
				onChangeXl={ ( value ) =>
					setAttributes( { paddingTopXl: value } )
				}
			/>
			<PaddingControl
				label="Right"
				subLabel="Padding"
				icon={ sidesRight }
				sideType="right"
				baseValue={ attributes.paddingRightBase }
				smValue={ attributes.paddingRightSm }
				mdValue={ attributes.paddingRightMd }
				lgValue={ attributes.paddingRightLg }
				xlValue={ attributes.paddingRightXl }
				onChangeBase={ ( value ) =>
					setAttributes( { paddingRightBase: value } )
				}
				onChangeSm={ ( value ) =>
					setAttributes( { paddingRightSm: value } )
				}
				onChangeMd={ ( value ) =>
					setAttributes( { paddingRightMd: value } )
				}
				onChangeLg={ ( value ) =>
					setAttributes( { paddingRightLg: value } )
				}
				onChangeXl={ ( value ) =>
					setAttributes( { paddingRightXl: value } )
				}
			/>
			<PaddingControl
				label="Bottom"
				subLabel="Padding"
				icon={ sidesBottom }
				sideType="bottom"
				baseValue={ attributes.paddingBottomBase }
				smValue={ attributes.paddingBottomSm }
				mdValue={ attributes.paddingBottomMd }
				lgValue={ attributes.paddingBottomLg }
				xlValue={ attributes.paddingBottomXl }
				onChangeBase={ ( value ) =>
					setAttributes( { paddingBottomBase: value } )
				}
				onChangeSm={ ( value ) =>
					setAttributes( { paddingBottomSm: value } )
				}
				onChangeMd={ ( value ) =>
					setAttributes( { paddingBottomMd: value } )
				}
				onChangeLg={ ( value ) =>
					setAttributes( { paddingBottomLg: value } )
				}
				onChangeXl={ ( value ) =>
					setAttributes( { paddingBottomXl: value } )
				}
			/>
			<PaddingControl
				label="Left"
				subLabel="Padding"
				icon={ sidesLeft }
				sideType="left"
				baseValue={ attributes.paddingLeftBase }
				smValue={ attributes.paddingLeftSm }
				mdValue={ attributes.paddingLeftMd }
				lgValue={ attributes.paddingLeftLg }
				xlValue={ attributes.paddingLeftXl }
				onChangeBase={ ( value ) =>
					setAttributes( { paddingLeftBase: value } )
				}
				onChangeSm={ ( value ) =>
					setAttributes( { paddingLeftSm: value } )
				}
				onChangeMd={ ( value ) =>
					setAttributes( { paddingLeftMd: value } )
				}
				onChangeLg={ ( value ) =>
					setAttributes( { paddingLeftLg: value } )
				}
				onChangeXl={ ( value ) =>
					setAttributes( { paddingLeftXl: value } )
				}
			/>
		</PanelBody>
	);

	const marginControls = (
		<PanelBody title="Margin Settings" initialOpen={ false }>
			<PositiveMarginControl
				label="All Sides"
				subLabel="Margin"
				icon={ sidesAll }
				sideType="all"
				baseValue={ attributes.marginAllBase }
				smValue={ attributes.marginAllSm }
				mdValue={ attributes.marginAllMd }
				lgValue={ attributes.marginAllLg }
				xlValue={ attributes.marginAllXl }
				onChangeBase={ ( value ) =>
					setAttributes( { marginAllBase: value } )
				}
				onChangeSm={ ( value ) =>
					setAttributes( { marginAllSm: value } )
				}
				onChangeMd={ ( value ) =>
					setAttributes( { marginAllMd: value } )
				}
				onChangeLg={ ( value ) =>
					setAttributes( { marginAllLg: value } )
				}
				onChangeXl={ ( value ) =>
					setAttributes( { marginAllXl: value } )
				}
			/>
			<PositiveMarginControl
				label="Horizontal"
				subLabel="Margin"
				icon={ sidesHorizontal }
				sideType="horizontal"
				baseValue={ attributes.marginHorizontalBase }
				smValue={ attributes.marginHorizontalSm }
				mdValue={ attributes.marginHorizontalMd }
				lgValue={ attributes.marginHorizontalLg }
				xlValue={ attributes.marginHorizontalXl }
				onChangeBase={ ( value ) =>
					setAttributes( { marginHorizontalBase: value } )
				}
				onChangeSm={ ( value ) =>
					setAttributes( { marginHorizontalSm: value } )
				}
				onChangeMd={ ( value ) =>
					setAttributes( { marginHorizontalMd: value } )
				}
				onChangeLg={ ( value ) =>
					setAttributes( { marginHorizontalLg: value } )
				}
				onChangeXl={ ( value ) =>
					setAttributes( { marginHorizontalXl: value } )
				}
			/>
			<PositiveMarginControl
				label="Vertical"
				subLabel="Margin"
				icon={ sidesVertical }
				sideType="vertical"
				baseValue={ attributes.marginVerticalBase }
				smValue={ attributes.marginVerticalSm }
				mdValue={ attributes.marginVerticalMd }
				lgValue={ attributes.marginVerticalLg }
				xlValue={ attributes.marginVerticalXl }
				onChangeBase={ ( value ) =>
					setAttributes( { marginVerticalBase: value } )
				}
				onChangeSm={ ( value ) =>
					setAttributes( { marginVerticalSm: value } )
				}
				onChangeMd={ ( value ) =>
					setAttributes( { marginVerticalMd: value } )
				}
				onChangeLg={ ( value ) =>
					setAttributes( { marginVerticalLg: value } )
				}
				onChangeXl={ ( value ) =>
					setAttributes( { marginVerticalXl: value } )
				}
			/>
			<PositiveMarginControl
				label="Top"
				subLabel="Margin"
				icon={ sidesTop }
				sideType="top"
				baseValue={ attributes.marginTopBase }
				smValue={ attributes.marginTopSm }
				mdValue={ attributes.marginTopMd }
				lgValue={ attributes.marginTopLg }
				xlValue={ attributes.marginTopXl }
				onChangeBase={ ( value ) =>
					setAttributes( { marginTopBase: value } )
				}
				onChangeSm={ ( value ) =>
					setAttributes( { marginTopSm: value } )
				}
				onChangeMd={ ( value ) =>
					setAttributes( { marginTopMd: value } )
				}
				onChangeLg={ ( value ) =>
					setAttributes( { marginTopLg: value } )
				}
				onChangeXl={ ( value ) =>
					setAttributes( { marginTopXl: value } )
				}
			/>
			<PositiveMarginControl
				label="Right"
				subLabel="Margin"
				icon={ sidesRight }
				sideType="right"
				baseValue={ attributes.marginRightBase }
				smValue={ attributes.marginRightSm }
				mdValue={ attributes.marginRightMd }
				lgValue={ attributes.marginRightLg }
				xlValue={ attributes.marginRightXl }
				onChangeBase={ ( value ) =>
					setAttributes( { marginRightBase: value } )
				}
				onChangeSm={ ( value ) =>
					setAttributes( { marginRightSm: value } )
				}
				onChangeMd={ ( value ) =>
					setAttributes( { marginRightMd: value } )
				}
				onChangeLg={ ( value ) =>
					setAttributes( { marginRightLg: value } )
				}
				onChangeXl={ ( value ) =>
					setAttributes( { marginRightXl: value } )
				}
			/>
			<PositiveMarginControl
				label="Bottom"
				subLabel="Margin"
				icon={ sidesBottom }
				sideType="bottom"
				baseValue={ attributes.marginBottomBase }
				smValue={ attributes.marginBottomSm }
				mdValue={ attributes.marginBottomMd }
				lgValue={ attributes.marginBottomLg }
				xlValue={ attributes.marginBottomXl }
				onChangeBase={ ( value ) =>
					setAttributes( { marginBottomBase: value } )
				}
				onChangeSm={ ( value ) =>
					setAttributes( { marginBottomSm: value } )
				}
				onChangeMd={ ( value ) =>
					setAttributes( { marginBottomMd: value } )
				}
				onChangeLg={ ( value ) =>
					setAttributes( { marginBottomLg: value } )
				}
				onChangeXl={ ( value ) =>
					setAttributes( { marginBottomXl: value } )
				}
			/>
			<PositiveMarginControl
				label="Left"
				subLabel="Margin"
				icon={ sidesLeft }
				sideType="left"
				baseValue={ attributes.marginLeftBase }
				smValue={ attributes.marginLeftSm }
				mdValue={ attributes.marginLeftMd }
				lgValue={ attributes.marginLeftLg }
				xlValue={ attributes.marginLeftXl }
				onChangeBase={ ( value ) =>
					setAttributes( { marginLeftBase: value } )
				}
				onChangeSm={ ( value ) =>
					setAttributes( { marginLeftSm: value } )
				}
				onChangeMd={ ( value ) =>
					setAttributes( { marginLeftMd: value } )
				}
				onChangeLg={ ( value ) =>
					setAttributes( { marginLeftLg: value } )
				}
				onChangeXl={ ( value ) =>
					setAttributes( { marginLeftXl: value } )
				}
			/>
		</PanelBody>
	);

	const negativeMarginControls = (
		<PanelBody title="Negative Margin Settings" initialOpen={ false }>
			<NegativeMarginControl
				label="All Sides"
				subLabel="Negative Margin"
				icon={ sidesAll }
				sideType="all"
				baseValue={ attributes.negativeMarginAllBase }
				smValue={ attributes.negativeMarginAllSm }
				mdValue={ attributes.negativeMarginAllMd }
				lgValue={ attributes.negativeMarginAllLg }
				xlValue={ attributes.negativeMarginAllXl }
				onChangeBase={ ( value ) =>
					setAttributes( { negativeMarginAllBase: value } )
				}
				onChangeSm={ ( value ) =>
					setAttributes( { negativeMarginAllSm: value } )
				}
				onChangeMd={ ( value ) =>
					setAttributes( { negativeMarginAllMd: value } )
				}
				onChangeLg={ ( value ) =>
					setAttributes( { negativeMarginAllLg: value } )
				}
				onChangeXl={ ( value ) =>
					setAttributes( { negativeMarginAllXl: value } )
				}
			/>
			<NegativeMarginControl
				label="Horizontal"
				subLabel="Negative Margin"
				icon={ sidesHorizontal }
				sideType="horizontal"
				baseValue={ attributes.negativeMarginHorizontalBase }
				smValue={ attributes.negativeMarginHorizontalSm }
				mdValue={ attributes.negativeMarginHorizontalMd }
				lgValue={ attributes.negativeMarginHorizontalLg }
				xlValue={ attributes.negativeMarginHorizontalXl }
				onChangeBase={ ( value ) =>
					setAttributes( { negativeMarginHorizontalBase: value } )
				}
				onChangeSm={ ( value ) =>
					setAttributes( { negativeMarginHorizontalSm: value } )
				}
				onChangeMd={ ( value ) =>
					setAttributes( { negativeMarginHorizontalMd: value } )
				}
				onChangeLg={ ( value ) =>
					setAttributes( { negativeMarginHorizontalLg: value } )
				}
				onChangeXl={ ( value ) =>
					setAttributes( { negativeMarginHorizontalXl: value } )
				}
			/>
			<NegativeMarginControl
				label="Vertical"
				subLabel="Negative Margin"
				icon={ sidesVertical }
				sideType="vertical"
				baseValue={ attributes.negativeMarginVerticalBase }
				smValue={ attributes.negativeMarginVerticalSm }
				mdValue={ attributes.negativeMarginVerticalMd }
				lgValue={ attributes.negativeMarginVerticalLg }
				xlValue={ attributes.negativeMarginVerticalXl }
				onChangeBase={ ( value ) =>
					setAttributes( { negativeMarginVerticalBase: value } )
				}
				onChangeSm={ ( value ) =>
					setAttributes( { negativeMarginVerticalSm: value } )
				}
				onChangeMd={ ( value ) =>
					setAttributes( { negativeMarginVerticalMd: value } )
				}
				onChangeLg={ ( value ) =>
					setAttributes( { negativeMarginVerticalLg: value } )
				}
				onChangeXl={ ( value ) =>
					setAttributes( { negativeMarginVerticalXl: value } )
				}
			/>
			<NegativeMarginControl
				label="Top"
				subLabel="Negative Margin"
				icon={ sidesTop }
				sideType="top"
				baseValue={ attributes.negativeMarginTopBase }
				smValue={ attributes.negativeMarginTopSm }
				mdValue={ attributes.negativeMarginTopMd }
				lgValue={ attributes.negativeMarginTopLg }
				xlValue={ attributes.negativeMarginTopXl }
				onChangeBase={ ( value ) =>
					setAttributes( { negativeMarginTopBase: value } )
				}
				onChangeSm={ ( value ) =>
					setAttributes( { negativeMarginTopSm: value } )
				}
				onChangeMd={ ( value ) =>
					setAttributes( { negativeMarginTopMd: value } )
				}
				onChangeLg={ ( value ) =>
					setAttributes( { negativeMarginTopLg: value } )
				}
				onChangeXl={ ( value ) =>
					setAttributes( { negativeMarginTopXl: value } )
				}
			/>
			<NegativeMarginControl
				label="Right"
				subLabel="Negative Margin"
				icon={ sidesRight }
				sideType="right"
				baseValue={ attributes.negativeMarginRightBase }
				smValue={ attributes.negativeMarginRightSm }
				mdValue={ attributes.negativeMarginRightMd }
				lgValue={ attributes.negativeMarginRightLg }
				xlValue={ attributes.negativeMarginRightXl }
				onChangeBase={ ( value ) =>
					setAttributes( { negativeMarginRightBase: value } )
				}
				onChangeSm={ ( value ) =>
					setAttributes( { negativeMarginRightSm: value } )
				}
				onChangeMd={ ( value ) =>
					setAttributes( { negativeMarginRightMd: value } )
				}
				onChangeLg={ ( value ) =>
					setAttributes( { negativeMarginRightLg: value } )
				}
				onChangeXl={ ( value ) =>
					setAttributes( { negativeMarginRightXl: value } )
				}
			/>
			<NegativeMarginControl
				label="Bottom"
				subLabel="Negative Margin"
				icon={ sidesBottom }
				sideType="bottom"
				baseValue={ attributes.negativeMarginBottomBase }
				smValue={ attributes.negativeMarginBottomSm }
				mdValue={ attributes.negativeMarginBottomMd }
				lgValue={ attributes.negativeMarginBottomLg }
				xlValue={ attributes.negativeMarginBottomXl }
				onChangeBase={ ( value ) =>
					setAttributes( { negativeMarginBottomBase: value } )
				}
				onChangeSm={ ( value ) =>
					setAttributes( { negativeMarginBottomSm: value } )
				}
				onChangeMd={ ( value ) =>
					setAttributes( { negativeMarginBottomMd: value } )
				}
				onChangeLg={ ( value ) =>
					setAttributes( { negativeMarginBottomLg: value } )
				}
				onChangeXl={ ( value ) =>
					setAttributes( { negativeMarginBottomXl: value } )
				}
			/>
			<NegativeMarginControl
				label="Left"
				subLabel="Negative Margin"
				icon={ sidesLeft }
				sideType="left"
				baseValue={ attributes.negativeMarginLeftBase }
				smValue={ attributes.negativeMarginLeftSm }
				mdValue={ attributes.negativeMarginLeftMd }
				lgValue={ attributes.negativeMarginLeftLg }
				xlValue={ attributes.negativeMarginLeftXl }
				onChangeBase={ ( value ) =>
					setAttributes( { negativeMarginLeftBase: value } )
				}
				onChangeSm={ ( value ) =>
					setAttributes( { negativeMarginLeftSm: value } )
				}
				onChangeMd={ ( value ) =>
					setAttributes( { negativeMarginLeftMd: value } )
				}
				onChangeLg={ ( value ) =>
					setAttributes( { negativeMarginLeftLg: value } )
				}
				onChangeXl={ ( value ) =>
					setAttributes( { negativeMarginLeftXl: value } )
				}
			/>
		</PanelBody>
	);

	return (
		<InspectorControls>
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
				{ tokenFields }
			</PanelBody>
			{ dropdownConfig.attributeKey && (
				<PanelBody title="Unique Dropdown" initialOpen={ false }>
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
			{ widthControls }
			{ paddingControls }
			{ marginControls }
			{ negativeMarginControls }
		</InspectorControls>
	);
};

export default BlockEdit;
