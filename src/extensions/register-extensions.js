import { registerBlockExtension } from '@10up/block-components';
import BlockEdit from '../components/BlockEdit';
import { generateClassName, generateAttributes } from '../utils/helpers';
import { ALLOWED_BLOCKS, BLOCK_CONFIG } from '../config/blockConfig';

export default function registerExtensions() {
	ALLOWED_BLOCKS.forEach( ( blockName ) => {
		const config = BLOCK_CONFIG[ blockName ] || {};

		registerBlockExtension( blockName, {
			extensionName: `custom-${ blockName.replace( 'core/', '' ) }`,
			attributes: generateAttributes( config ),
			Edit: BlockEdit,
			classNameGenerator: ( attrs ) =>
				generateClassName( attrs, blockName, BLOCK_CONFIG ),
		} );
	} );
}
