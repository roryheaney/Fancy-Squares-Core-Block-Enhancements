import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import Edit from './edit';
import { generateAttributes } from '../../utils/helpers';
import { BLOCK_CONFIG } from '../../config/blockConfig';
import './style.scss';
import './editor.scss';

export const registerTabsInteractiveBlock = () => {
	const config = BLOCK_CONFIG[ metadata.name ] || {};
	const attributes = {
		...metadata.attributes,
		...generateAttributes( config ),
	};

	registerBlockType( metadata.name, {
		...metadata,
		attributes,
		edit: Edit,
		save: () => <InnerBlocks.Content />,
	} );
};

registerTabsInteractiveBlock();
