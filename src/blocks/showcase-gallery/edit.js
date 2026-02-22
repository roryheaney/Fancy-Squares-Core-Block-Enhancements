import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, RangeControl } from '@wordpress/components';
import { useEffect, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import BlockEdit from '../../components/BlockEdit';
import { generateClassName } from '../../utils/helpers';
import { BLOCK_CONFIG } from '../../config/blockConfig';

const TEXT_DOMAIN = 'fancy-squares-core-enhancements';

const TRANSITION_OPTIONS = [
	{ label: __( 'Fade', TEXT_DOMAIN ), value: 'fade' },
	{ label: __( 'Slide', TEXT_DOMAIN ), value: 'slide' },
	{ label: __( 'Zoom', TEXT_DOMAIN ), value: 'zoom' },
];

export default function Edit( props ) {
	const { attributes, setAttributes, name } = props;
	const {
		transitionType,
		transitionDuration,
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
		className: [ 'fs-showcase-gallery-editor', generatedClassName ]
			.filter( Boolean )
			.join( ' ' ),
	} );

	return (
		<>
			<BlockEdit { ...props } />
			<InspectorControls>
				<PanelBody
					title={ __( 'Gallery Settings', TEXT_DOMAIN ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Transition', TEXT_DOMAIN ) }
						value={ transitionType }
						options={ TRANSITION_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( { transitionType: value } )
						}
					/>
					<RangeControl
						label={ __( 'Transition duration (ms)', TEXT_DOMAIN ) }
						value={ transitionDuration }
						onChange={ ( value ) =>
							setAttributes( { transitionDuration: value } )
						}
						min={ 100 }
						max={ 1000 }
						step={ 50 }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<p>{ __( 'Showcase Gallery Preview', TEXT_DOMAIN ) }</p>
				<p className="fs-showcase-gallery-editor__note">
					{ __(
						'Media renders on the front end based on the active item.',
						TEXT_DOMAIN
					) }
				</p>
			</div>
		</>
	);
}
