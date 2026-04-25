import {
	useBlockProps,
	InspectorControls,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { useMemo } from '@wordpress/element';

import BlockEdit from '../../components/BlockEdit';
import { generateClassName } from '../../utils/helpers';
import { useSyncGeneratedClasses } from '../../utils/use-sync-generated-classes';
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

	// Sync generated classes to additionalClasses for frontend rendering
	const generatedClassName = useMemo(
		() => generateClassName( attributes, name, BLOCK_CONFIG ),
		[ attributes, name ]
	);
	useSyncGeneratedClasses( {
		additionalClasses,
		generatedClassName,
		setAttributes,
	} );

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
						__nextHasNoMarginBottom
						__next40pxDefaultSize
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
