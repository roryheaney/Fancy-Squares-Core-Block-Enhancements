import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import Edit from './edit';
import { generateAttributes } from '../../utils/helpers';

export const registerContentWrapperBlock = () => {
	const attributes = {
		...metadata.attributes,
		...generateAttributes(),
		displayClasses: {
			type: 'array',
			items: { type: 'string' },
			default: [],
		},
		orderClasses: {
			type: 'array',
			items: { type: 'string' },
			default: [],
		},
		selfAlignmentClasses: {
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
		widthBase: { type: 'string', default: '' },
		widthSm: { type: 'string', default: '' },
		widthMd: { type: 'string', default: '' },
		widthLg: { type: 'string', default: '' },
		widthXl: { type: 'string', default: '' },
		widthXXl: { type: 'string', default: '' },
	};

	registerBlockType( metadata.name, {
		...metadata,
		attributes,
		edit: Edit,
		save: () => <InnerBlocks.Content />,
	} );
};
