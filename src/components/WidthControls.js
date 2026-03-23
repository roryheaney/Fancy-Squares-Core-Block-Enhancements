// components/WidthControls.js
import { PanelBody, Button, TabPanel } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import {
	getBreakpointAttributeKey,
	getBreakpointDimension,
	getWidthBreakpointLabel,
	getWidthBreakpointShortLabel,
	getWidthIconKey,
	WIDTH_BREAKPOINT_KEYS,
} from '../config/breakpoints';
import WidthControl from './WidthControl';
import desktopImage from '../assets/icons/desktop.png';
import laptopImage from '../assets/icons/laptop.png';
import tabletImage from '../assets/icons/tablet.png';
import mobileImage from '../assets/icons/mobile.png';

const ICONS_BY_KEY = {
	desktop: desktopImage,
	laptop: laptopImage,
	tablet: tabletImage,
	mobile: mobileImage,
};

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

	const widthTabs = WIDTH_BREAKPOINT_KEYS.map( ( breakpointKey ) => {
		const isBase = ! breakpointKey;
		return {
			name: isBase ? 'base' : breakpointKey,
			breakpoint: breakpointKey,
			label: getWidthBreakpointLabel( breakpointKey ),
			shortLabel: getWidthBreakpointShortLabel( breakpointKey ),
			subLabel: getBreakpointDimension( breakpointKey ),
			image:
				ICONS_BY_KEY[ getWidthIconKey( breakpointKey ) ] ||
				desktopImage,
			attrKey: getBreakpointAttributeKey( 'width', breakpointKey ),
			options: isBase
				? [
						{ label: '100%', value: '' },
						{ label: 'Automatically', value: 'auto' },
				  ]
				: [
						{ label: 'Inherit', value: '' },
						{ label: 'Automatically', value: 'auto' },
				  ],
		};
	} );

	const hasAnyWidths = widthTabs.some( ( tab ) =>
		hasValue( attributes[ tab.attrKey ] )
	);

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
					return (
						<WidthControl
							label={ configItem.label }
							subLabel={ configItem.subLabel }
							image={ configItem.image }
							breakpoint={ configItem.breakpoint }
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
