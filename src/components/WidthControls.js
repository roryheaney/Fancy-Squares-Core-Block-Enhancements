// components/WidthControls.js
import { PanelBody, Button } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { BREAKPOINT_DIMENSIONS } from '../config/blockConfig';
import WidthControl from './WidthControl';
import desktopImage from '../assets/icons/desktop.png';
import laptopImage from '../assets/icons/laptop.png';
import tabletImage from '../assets/icons/tablet.png';
import mobileImage from '../assets/icons/mobile.png';

const WidthControls = ( {
	attributes,
	setAttributes,
	isBootstrap,
	parent,
	parentAtts,
	config = {},
} ) => {
	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );
	if ( ! config.hasWidthControls ) {
		return null;
	}
	return (
		<PanelBody title="Width Settings" initialOpen={ false }>
			{ ! isBootstrap && (
				<div className="custom-column-widths__bootstrap-notice">
					<p className="greyd-inspector-help">
						By setting the columns style to &quot;Custom
						Breakpoints&quot;, the columns no longer break
						unintentionally.
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
						Set parent to use custom breakpoints
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
				subLabel={ BREAKPOINT_DIMENSIONS.sm }
				image={ mobileImage }
				breakpoint="sm"
				value={ attributes.widthSm }
				onChange={ ( value ) => setAttributes( { widthSm: value } ) }
				options={ [
					{ label: 'Inherit ↓', value: '' },
					{ label: 'Automatically', value: 'auto' },
				] }
			/>
			<WidthControl
				label="Tablet"
				subLabel={ BREAKPOINT_DIMENSIONS.md }
				image={ tabletImage }
				breakpoint="md"
				value={ attributes.widthMd }
				onChange={ ( value ) => setAttributes( { widthMd: value } ) }
				options={ [
					{ label: 'Inherit ↓', value: '' },
					{ label: 'Automatically', value: 'auto' },
				] }
			/>
			<WidthControl
				label="Laptop"
				subLabel={ BREAKPOINT_DIMENSIONS.lg }
				image={ laptopImage }
				breakpoint="lg"
				value={ attributes.widthLg }
				onChange={ ( value ) => setAttributes( { widthLg: value } ) }
				options={ [
					{ label: 'Inherit ↓', value: '' },
					{ label: 'Automatically', value: 'auto' },
				] }
			/>
			<WidthControl
				label="Larger Screen"
				subLabel={ BREAKPOINT_DIMENSIONS.xl }
				image={ desktopImage }
				breakpoint="xl"
				value={ attributes.widthXl }
				onChange={ ( value ) => setAttributes( { widthXl: value } ) }
				options={ [
					{ label: 'Inherit ↓', value: '' },
					{ label: 'Automatically', value: 'auto' },
				] }
			/>
			<WidthControl
				label="XXL Screen"
				subLabel={ BREAKPOINT_DIMENSIONS.xxl }
				image={ desktopImage }
				breakpoint="xxl"
				value={ attributes.widthXXl }
				onChange={ ( value ) => setAttributes( { widthXXl: value } ) }
				options={ [
					{ label: 'Inherit ↓', value: '' },
					{ label: 'Automatically', value: 'auto' },
				] }
			/>
		</PanelBody>
	);
};

export default WidthControls;
