import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import edit from './edit';
import { generateAttributes } from '../../utils/helpers';
import './style.scss';
import './editor.scss';

export function registerContentShowcaseBlock() {
	const attributes = {
		...metadata.attributes,
		...generateAttributes(),
	};

	registerBlockType( metadata.name, {
		...metadata,
		attributes,
		edit,
		save: () => <InnerBlocks.Content />,
	} );
}

registerContentShowcaseBlock();
