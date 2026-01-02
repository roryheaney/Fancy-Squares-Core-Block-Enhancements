import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import edit from './edit';
import metadata from './block.json';

export function registerAccordionItemInteractiveBlock() {
	registerBlockType( metadata.name, {
		...metadata,
		edit,
		// dynamic block => we rely on render.php for front-end.
		save: () => <InnerBlocks.Content />,
	} );
}
