import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect, useMemo } from '@wordpress/element';

import { alertOptions } from '../../../data/bootstrap-classes/classes.js';
import BlockEdit from '../../components/BlockEdit';
import { generateClassName } from '../../utils/helpers';
import { BLOCK_CONFIG } from '../../config/blockConfig';

const TEXT_DOMAIN = 'fancy-squares-core-enhancements';
const ALERT_STYLE_OPTIONS = [
	{ label: __( 'Default', TEXT_DOMAIN ), value: '' },
	...alertOptions,
];

export default function Edit( props ) {
	const { attributes, setAttributes, name } = props;
	const {
		alertStyle = '',
		alertContent = '',
		additionalClasses,
	} = attributes;

	const generatedClassName = useMemo(
		() => generateClassName( attributes, name, BLOCK_CONFIG ),
		[ attributes, name ]
	);

	useEffect( () => {
		const nextClasses = generatedClassName.split( /\s+/ ).filter( Boolean );
		const currentClasses = Array.isArray( additionalClasses )
			? additionalClasses
			: [];
		if ( currentClasses.join( ' ' ) !== nextClasses.join( ' ' ) ) {
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
					title={ __( 'Alert Settings', TEXT_DOMAIN ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Alert Style', TEXT_DOMAIN ) }
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
					placeholder={ __( 'Alert message here', TEXT_DOMAIN ) }
				/>
			</div>
		</>
	);
}
