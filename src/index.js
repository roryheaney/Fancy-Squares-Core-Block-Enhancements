/**
 * File: index.js
 *
 * Extends core blocks with custom attributes and InspectorControls using 10up's registerBlockExtension.
 * Adds FormTokenField and dropdowns to apply Bootstrap classes to multiple blocks.
 * Adds custom width controls to core/column for breakpoint-specific layouts.
 */

import './block-enhancements.js';

// Import span modal
import './formats/span-format.js';

// Import SCSS for compilation
import './editor.scss';

// Import helper modules
import registerExtensions from './registerExtensions';
import { registerIndexBlock } from './blocks/index-block';
import { registerContentWrapperBlock } from './blocks/content-wrapper';
import { registerPictureBlock } from './blocks/picture-block';
import { registerAlertBlock } from './blocks/alert';
import { registerTabsBlock } from './blocks/tabs';
import { registerTabItemBlock } from './blocks/tab-item';
import { registerCarouselBlock } from './blocks/carousel';
import { registerCarouselSlideBlock } from './blocks/carousel-slide';

registerExtensions();

const enabledBlocks =
	( window.fsCoreEnhancements && window.fsCoreEnhancements.enabledBlocks ) ||
	[];
if (
	Array.isArray( enabledBlocks ) &&
	enabledBlocks.includes( 'index-block' )
) {
	registerIndexBlock();
}
if (
	Array.isArray( enabledBlocks ) &&
	enabledBlocks.includes( 'content-wrapper' )
) {
	registerContentWrapperBlock();
}
if (
	Array.isArray( enabledBlocks ) &&
	enabledBlocks.includes( 'picture-block' )
) {
	registerPictureBlock();
}
if ( Array.isArray( enabledBlocks ) && enabledBlocks.includes( 'alert' ) ) {
	registerAlertBlock();
}
if ( Array.isArray( enabledBlocks ) && enabledBlocks.includes( 'tabs' ) ) {
	registerTabsBlock();
	registerTabItemBlock();
}
if ( Array.isArray( enabledBlocks ) && enabledBlocks.includes( 'carousel' ) ) {
	registerCarouselBlock();
	registerCarouselSlideBlock();
}
