import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect, useMemo } from '@wordpress/element';

import { alertOptions } from '../../config/framework-option-sets';
import BlockEdit from '../../components/BlockEdit';
import { generateClassName } from '../../utils/helpers';
import { BLOCK_CONFIG } from '../../config/blockConfig';

const ALERT_STYLE_OPTIONS = [
	{ label: __( 'Default', 'fancy-squares-core-enhancements' ), value: '' },
	...alertOptions,
];

export default function Edit( props ) {
	const { attributes, setAttributes, name } = props;
	const {
		alertStyle = '',
		alertContent = '',
		additionalClasses,
	} = attributes;

	// Sync generated classes to additionalClasses for frontend rendering
	const generatedClassName = useMemo(
		() => generateClassName( attributes, name, BLOCK_CONFIG ),
		[ attributes, name ]
	);

	useEffect( () => {
		const currentClasses = Array.isArray( additionalClasses )
			? additionalClasses
			: [];
		const nextClasses = generatedClassName.split( ' ' ).filter( Boolean );
		if (
			JSON.stringify( currentClasses ) !== JSON.stringify( nextClasses )
		) {
			setAttributes( { additionalClasses: nextClasses } );
		}
	}, [ additionalClasses, generatedClassName, setAttributes ] );

	const blockProps = useBlockProps( {
		className: [
			'wp-block-fs-blocks-alert',
			'alert',
			alertStyle,
			generatedClassName,
		]
			.filter( Boolean )
			.join( ' ' ),
		role: 'alert',
	} );

	return (
		<>
			<BlockEdit { ...props } />
			<InspectorControls>
				<PanelBody
					title={ __(
						'Alert Settings',
						'fancy-squares-core-enhancements'
					) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __(
							'Alert Style',
							'fancy-squares-core-enhancements'
						) }
						value={ alertStyle }
						options={ ALERT_STYLE_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( { alertStyle: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<RichText
					tagName="p"
					value={ alertContent }
					onChange={ ( value ) =>
						setAttributes( { alertContent: value } )
					}
					placeholder={ __(
						'Alert message here',
						'fancy-squares-core-enhancements'
					) }
				/>
			</div>
		</>
	);
}
