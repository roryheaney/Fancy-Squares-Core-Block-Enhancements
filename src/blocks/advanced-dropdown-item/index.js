import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import Edit from './edit';

export const registerAdvancedDropdownItemBlock = () => {
	registerBlockType( metadata.name, {
		...metadata,
		edit: Edit,
		save: () => <InnerBlocks.Content />,
	} );
};

registerAdvancedDropdownItemBlock();
