import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function AdvancedDropdownInspector( {
	defaultFirstItemVisible,
	topLevelLayout,
	leftMobileBehavior,
	setAttributes,
} ) {
	return (
		<InspectorControls>
			<PanelBody
				title={ __(
					'Dropdown Settings',
					'fancy-squares-core-enhancements'
				) }
				initialOpen={ true }
			>
				<ToggleControl
					__nextHasNoMarginBottom
					label={ __(
						'Default first item visible',
						'fancy-squares-core-enhancements'
					) }
					help={ __(
						'When no item is active, show the first dropdown-enabled item.',
						'fancy-squares-core-enhancements'
					) }
					checked={ defaultFirstItemVisible }
					onChange={ ( value ) =>
						setAttributes( { defaultFirstItemVisible: value } )
					}
				/>
				<SelectControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					label={ __(
						'Top-level layout',
						'fancy-squares-core-enhancements'
					) }
					value={ topLevelLayout }
					options={ [
						{
							label: __(
								'Horizontal',
								'fancy-squares-core-enhancements'
							),
							value: 'horizontal',
						},
						{
							label: __(
								'Left',
								'fancy-squares-core-enhancements'
							),
							value: 'left',
						},
					] }
					onChange={ ( value ) =>
						setAttributes( {
							topLevelLayout:
								value === 'left' ? 'left' : 'horizontal',
						} )
					}
				/>
				{ topLevelLayout === 'left' && (
					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __(
							'Left layout mobile behavior',
							'fancy-squares-core-enhancements'
						) }
						value={ leftMobileBehavior }
						options={ [
							{
								label: __(
									'Inline panels',
									'fancy-squares-core-enhancements'
								),
								value: 'inline',
							},
							{
								label: __(
									'List only (no panels)',
									'fancy-squares-core-enhancements'
								),
								value: 'list-only',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( {
								leftMobileBehavior:
									value === 'list-only'
										? 'list-only'
										: 'inline',
							} )
						}
					/>
				) }
			</PanelBody>
		</InspectorControls>
	);
}
