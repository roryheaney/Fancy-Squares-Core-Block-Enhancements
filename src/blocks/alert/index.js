import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
import { generateAttributes } from '../../utils/helpers';

export const registerAlertBlock = () => {
	const attributes = {
		...metadata.attributes,
		...generateAttributes(),
		displayClasses: {
			type: 'array',
			items: { type: 'string' },
			default: [],
		},
	};

	registerBlockType( metadata.name, {
		...metadata,
		attributes,
		edit: Edit,
		save: () => null,
	} );
};
