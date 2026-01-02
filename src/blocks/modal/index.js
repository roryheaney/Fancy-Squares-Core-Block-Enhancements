import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import edit from './edit';
import metadata from './block.json';
import { generateAttributes } from '../../utils/helpers';
import './style.scss';
import './editor.scss';

export function registerModalBlock() {
	const attributes = {
		...metadata.attributes,
		...generateAttributes(),
	};

	registerBlockType( metadata.name, {
		...metadata,
		attributes,
		edit,
		// Dynamic block - render.php handles frontend output
		save: () => <InnerBlocks.Content />,
	} );
}
