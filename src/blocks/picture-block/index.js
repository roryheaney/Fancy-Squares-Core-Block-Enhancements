import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';

export const registerPictureBlock = () => {
	registerBlockType( metadata.name, {
		...metadata,
		edit: Edit,
		save: () => null,
	} );
};
