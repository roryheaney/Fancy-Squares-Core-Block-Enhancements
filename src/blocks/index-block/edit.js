import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useEffect, useMemo } from '@wordpress/element';

import BlockEdit from '../../components/BlockEdit';
import { generateClassName } from '../../utils/helpers';
import { BLOCK_CONFIG } from '../../config/blockConfig';

const BLOCK_CLASSES = [
	'wp-block-fs-blocks-index-block',
	'custom-index-block',
];

export default function Edit( props ) {
	const { attributes, setAttributes, clientId, name } = props;
	const { blockIndex, additionalClasses } = attributes;

	const oneBasedIndex = useSelect(
		( select ) => {
			const { getBlockParents, getBlocks } =
				select( 'core/block-editor' );
			const parentIds = getBlockParents( clientId );
			const columnsContainerId =
				parentIds.length >= 2 ? parentIds[ parentIds.length - 2 ] : '';
			const thisColumnId =
				parentIds.length >= 1 ? parentIds[ parentIds.length - 1 ] : '';
			if ( ! columnsContainerId || ! thisColumnId ) {
				return -1;
			}
			const siblings = getBlocks( columnsContainerId );
			const zeroBasedIndex = siblings.findIndex(
				( block ) => block.clientId === thisColumnId
			);
			return zeroBasedIndex >= 0 ? zeroBasedIndex + 1 : -1;
		},
		[ clientId ]
	);

	useEffect( () => {
		if ( blockIndex !== oneBasedIndex ) {
			setAttributes( { blockIndex: oneBasedIndex } );
		}
	}, [ blockIndex, oneBasedIndex, setAttributes ] );

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
		className: [ ...BLOCK_CLASSES, generatedClassName ]
			.filter( Boolean )
			.join( ' ' ),
	} );

	return (
		<>
			<BlockEdit { ...props } />
			<div { ...blockProps }>
				{ oneBasedIndex > 0 && (
					<span className="index-number">{ oneBasedIndex }</span>
				) }
			</div>
		</>
	);
}
