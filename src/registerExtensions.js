import { registerBlockExtension } from '@10up/block-components';
import BlockEdit from './components/BlockEdit';
import { generateClassName, generateAttributes } from './utils/helpers';
import { ALLOWED_BLOCKS, BLOCK_CONFIG } from './config/blockConfig';

export default function registerExtensions() {
	ALLOWED_BLOCKS.forEach( ( blockName ) => {
		const config = BLOCK_CONFIG[ blockName ] || {};
		const dropdownConfig = config.dropdown || {};

		const attributes = {
			...generateAttributes(),
		};

		for ( const classType of config.classOptions || [] ) {
			attributes[ `${ classType }Classes` ] = {
				type: 'array',
				items: { type: 'string' },
				default: [],
			};
		}

		if ( dropdownConfig.attributeKey ) {
			attributes[ dropdownConfig.attributeKey ] = {
				type: 'string',
				default: dropdownConfig.default || 'none',
			};
		}

		if ( config.hasWidthControls ) {
			attributes.widthBase = { type: 'string', default: '' };
			attributes.widthSm = { type: 'string', default: '' };
			attributes.widthMd = { type: 'string', default: '' };
			attributes.widthLg = { type: 'string', default: '' };
			attributes.widthXl = { type: 'string', default: '' };
			attributes.widthXXl = { type: 'string', default: '' };
		}

		registerBlockExtension( blockName, {
			extensionName: `custom-${ blockName.replace( 'core/', '' ) }`,
			attributes,
			Edit: BlockEdit,
			classNameGenerator: ( attrs ) =>
				generateClassName( attrs, blockName, BLOCK_CONFIG ),
		} );
	} );
}
