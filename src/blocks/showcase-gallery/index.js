import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import edit from './edit';
import { generateAttributes } from '../../utils/helpers';
import { BLOCK_CONFIG } from '../../config/blockConfig';
import './style.scss';
import './editor.scss';

export function registerShowcaseGalleryBlock() {
	const config = BLOCK_CONFIG[ metadata.name ] || {};
	const attributes = {
		...metadata.attributes,
		...generateAttributes( config ),
	};

	registerBlockType( metadata.name, {
		...metadata,
		attributes,
		edit,
		save: () => null,
	} );
}

registerShowcaseGalleryBlock();
