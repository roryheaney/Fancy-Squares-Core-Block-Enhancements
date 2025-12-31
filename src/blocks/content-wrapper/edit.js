import {
	useBlockProps,
	InspectorControls,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { useEffect, useMemo } from '@wordpress/element';

import BlockEdit from '../../components/BlockEdit';
import { generateClassName } from '../../utils/helpers';
import { BLOCK_CONFIG } from '../../config/blockConfig';

const TEMPLATE = [
	[ 'core/heading', { placeholder: 'Enter heading' } ],
	[ 'core/paragraph', { placeholder: 'Enter text' } ],
];

const ELEMENT_OPTIONS = [
	{ label: 'div', value: 'div' },
	{ label: 'section', value: 'section' },
];

export default function Edit( props ) {
	const { attributes, setAttributes, name } = props;
	const { elementTag, additionalClasses } = attributes;

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

	const TagName = elementTag === 'section' ? 'section' : 'div';
	const blockProps = useBlockProps( {
		className: generatedClassName,
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		template: TEMPLATE,
	} );

	return (
		<>
			<BlockEdit { ...props } />
			<InspectorControls>
				<PanelBody title="Wrapper Settings" initialOpen={ false }>
					<SelectControl
						label="HTML Element"
						value={ elementTag }
						options={ ELEMENT_OPTIONS }
						onChange={ ( val ) =>
							setAttributes( { elementTag: val } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<TagName { ...innerBlocksProps } />
		</>
	);
}
