// components/WidthControls.js
import { PanelBody, Button, TabPanel } from '@wordpress/components';
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
	const parentId = parent?.[ 0 ];
	const hasValue = ( value ) => value && value !== 'auto' && value !== '';

	if ( ! config.hasWidthControls ) {
		return null;
	}

	const hasAnyWidths =
		hasValue( attributes.widthBase ) ||
		hasValue( attributes.widthSm ) ||
		hasValue( attributes.widthMd ) ||
		hasValue( attributes.widthLg ) ||
		hasValue( attributes.widthXl ) ||
		hasValue( attributes.widthXXl );
	const widthTabs = [
		{
			name: 'base',
			label: 'Base',
			shortLabel: 'Base',
			subLabel: BREAKPOINT_DIMENSIONS[ '' ],
			image: mobileImage,
			attrKey: 'widthBase',
			options: [
				{ label: '100%', value: '' },
				{ label: 'Automatically', value: 'auto' },
			],
		},
		{
			name: 'sm',
			label: 'Mobile',
			shortLabel: 'Sm',
			subLabel: BREAKPOINT_DIMENSIONS.sm,
			image: mobileImage,
			attrKey: 'widthSm',
			options: [
				{ label: 'Inherit', value: '' },
				{ label: 'Automatically', value: 'auto' },
			],
		},
		{
			name: 'md',
			label: 'Tablet',
			shortLabel: 'Md',
			subLabel: BREAKPOINT_DIMENSIONS.md,
			image: tabletImage,
			attrKey: 'widthMd',
			options: [
				{ label: 'Inherit', value: '' },
				{ label: 'Automatically', value: 'auto' },
			],
		},
		{
			name: 'lg',
			label: 'Laptop',
			shortLabel: 'Lg',
			subLabel: BREAKPOINT_DIMENSIONS.lg,
			image: laptopImage,
			attrKey: 'widthLg',
			options: [
				{ label: 'Inherit', value: '' },
				{ label: 'Automatically', value: 'auto' },
			],
		},
		{
			name: 'xl',
			label: 'Larger Screen',
			shortLabel: 'Xl',
			subLabel: BREAKPOINT_DIMENSIONS.xl,
			image: desktopImage,
			attrKey: 'widthXl',
			options: [
				{ label: 'Inherit', value: '' },
				{ label: 'Automatically', value: 'auto' },
			],
		},
		{
			name: 'xxl',
			label: 'XXL Screen',
			shortLabel: 'Xxl',
			subLabel: BREAKPOINT_DIMENSIONS.xxl,
			image: desktopImage,
			attrKey: 'widthXXl',
			options: [
				{ label: 'Inherit', value: '' },
				{ label: 'Automatically', value: 'auto' },
			],
		},
	];
	const activeLabels = widthTabs
		.filter( ( tab ) => hasValue( attributes[ tab.attrKey ] ) )
		.map( ( tab ) => tab.label );
	return (
		<PanelBody
			title={
				<span className="custom-column-widths__panel-title">
					Width Settings
					{ hasAnyWidths && (
						<span
							className="custom-column-widths__panel-indicator"
							aria-hidden="true"
						/>
					) }
				</span>
			}
			initialOpen={ false }
		>
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
							if ( ! parentId ) {
								return;
							}
							const currentClassName =
								parentAtts?.className || '';
							const cleanedClassName = currentClassName
								.replace( 'is-style-default', '' )
								.replace( /\s+/g, ' ' )
								.trim();
							const nextClassName = cleanedClassName
								? `${ cleanedClassName } is-style-bootstrap`
								: 'is-style-bootstrap';

							updateBlockAttributes( parentId, {
								...( parentAtts || {} ),
								className: nextClassName,
							} );
						} }
					>
						Set parent to use custom breakpoints
					</Button>
				</div>
			) }
			{ activeLabels.length > 0 && (
				<p className="custom-column-widths__summary">
					Active: { activeLabels.join( ', ' ) }
				</p>
			) }
			<TabPanel
				className="custom-column-widths__tabs"
				activeClass="is-active"
				tabs={ widthTabs.map( ( tab ) => ( {
					name: tab.name,
					title: (
						<span
							className="custom-column-widths__tab-title"
							title={
								tab.subLabel
									? `${ tab.label } (${ tab.subLabel })`
									: tab.label
							}
						>
							{ tab.shortLabel || tab.label }
							{ hasValue( attributes[ tab.attrKey ] ) && (
								<span
									className="custom-column-widths__badge"
									aria-hidden="true"
								/>
							) }
						</span>
					),
				} ) ) }
			>
				{ ( tab ) => {
					const configItem = widthTabs.find(
						( item ) => item.name === tab.name
					);
					if ( ! configItem ) {
						return null;
					}
					const value = attributes[ configItem.attrKey ];
					const breakpoint =
						configItem.name === 'base' ? '' : configItem.name;
					return (
						<WidthControl
							label={ configItem.label }
							subLabel={ configItem.subLabel }
							image={ configItem.image }
							breakpoint={ breakpoint }
							value={ value }
							isActive={ hasValue( value ) }
							onChange={ ( newValue ) =>
								setAttributes( {
									[ configItem.attrKey ]: newValue,
								} )
							}
							options={ configItem.options }
						/>
					);
				} }
			</TabPanel>
		</PanelBody>
	);
};

export default WidthControls;
