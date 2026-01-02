import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import edit from './edit';
import metadata from './block.json';
import { generateAttributes } from '../../utils/helpers';
import './style.scss';
import './editor.scss';

export function registerAccordionInteractiveBlock() {
	const attributes = {
		...metadata.attributes,
		...generateAttributes(),
	};

	registerBlockType( metadata.name, {
		...metadata,
		attributes,
		edit,
		// dynamic block => we rely on render.php for front-end.
		save: () => <InnerBlocks.Content />,
	} );
}
