import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
import { generateAttributes } from '../../utils/helpers';
import { BLOCK_CONFIG } from '../../config/blockConfig';

export const registerIndexBlock = () => {
	const config = BLOCK_CONFIG[ metadata.name ] || {};
	const attributes = {
		...metadata.attributes,
		...generateAttributes( config ),
	};

	registerBlockType( metadata.name, {
		...metadata,
		attributes,
		edit: Edit,
		save: () => null,
	} );
};

registerIndexBlock();
