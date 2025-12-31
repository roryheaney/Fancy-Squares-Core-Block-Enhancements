import {
	useBlockProps,
	InnerBlocks,
	BlockControls,
	BlockVerticalAlignmentToolbar,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { verticalAlign } = attributes;

	const { hasChildBlocks, parentAttributes } = useSelect(
		( select ) => {
			const {
				getBlockCount,
				getBlockParentsByBlockName,
				getBlockAttributes,
			} = select( 'core/block-editor' );

			const parents = getBlockParentsByBlockName(
				clientId,
				'fs-blocks/carousel'
			);
			const parentAttrs = parents.length
				? getBlockAttributes( parents[ 0 ] )
				: {};

			return {
				hasChildBlocks: getBlockCount( clientId ) > 0,
				parentAttributes: parentAttrs,
			};
		},
		[ clientId ]
	);

	const className = verticalAlign
		? `are-vertically-aligned-${ verticalAlign }`
		: '';

	let style = {};
	if ( parentAttributes?.slidesToShow ) {
		const fraction = ( 100 / parentAttributes.slidesToShow ).toFixed( 2 );
		const gap = parentAttributes.columnGap || 0;
		style = {
			flexBasis: `calc(${ fraction }% - ${ gap }px)`,
			maxWidth: `calc(${ fraction }% - ${ gap }px)`,
			marginLeft: `${ gap }px`,
			minWidth: `calc(${ fraction }% - ${ gap }px)`,
		};
	}

	const blockProps = useBlockProps( {
		className: [ 'swiper-slide', className ].filter( Boolean ).join( ' ' ),
		style,
	} );

	return (
		<div { ...blockProps }>
			<BlockControls>
				<BlockVerticalAlignmentToolbar
					value={ verticalAlign }
					onChange={ ( newAlign ) =>
						setAttributes( { verticalAlign: newAlign } )
					}
				/>
			</BlockControls>

			<InnerBlocks
				orientation="vertical"
				allowedBlocks={ [
					'core/cover',
					'core/paragraph',
					'core/heading',
					'core/image',
					'core/group',
					'core/buttons',
					'core/list',
					'core/list-item',
				] }
				templateLock={ false }
				renderAppender={
					! hasChildBlocks && InnerBlocks.ButtonBlockAppender
				}
			/>
		</div>
	);
}
