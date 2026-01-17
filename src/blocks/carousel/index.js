import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import Edit from './edit';
import { generateAttributes } from '../../utils/helpers';

export const registerCarouselBlock = () => {
	const attributes = {
		...metadata.attributes,
		...generateAttributes(),
		displayClasses: {
			type: 'array',
			items: { type: 'string' },
			default: [],
		},
		positionClasses: {
			type: 'array',
			items: { type: 'string' },
			default: [],
		},
		zindexClasses: {
			type: 'array',
			items: { type: 'string' },
			default: [],
		},
	};

	registerBlockType( metadata.name, {
		...metadata,
		attributes,
		edit: Edit,
		save: () => <InnerBlocks.Content />,
	} );
};

registerCarouselBlock();
