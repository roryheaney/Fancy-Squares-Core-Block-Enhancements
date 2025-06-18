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

// WordPress dependencies
import { registerBlockExtension } from '@10up/block-components';

// Import components
import BlockEdit from './components/BlockEdit';

// Import utilities
import { generateClassName, generateAttributes } from './utils/helpers';

// Import configurations
import { ALLOWED_BLOCKS, BLOCK_CONFIG } from './config/blockConfig';

// Register extensions for each block
ALLOWED_BLOCKS.forEach( ( blockName ) => {
	const config = BLOCK_CONFIG[ blockName ] || {};
	const dropdownConfig = config.dropdown || {};

	// Define attributes
	const attributes = {
		...generateAttributes(), // Dynamically generate padding, margin, and negative margin attributes
	};

	// Add FormTokenField attributes
	for ( const classType of config.classOptions || [] ) {
		attributes[ `${ classType }Classes` ] = {
			type: 'array',
			items: { type: 'string' },
			default: [],
		};
	}

	// Add dropdown attribute if applicable
	if ( dropdownConfig.attributeKey ) {
		attributes[ dropdownConfig.attributeKey ] = {
			type: 'string',
			default: dropdownConfig.default || 'none',
		};
	}

	// Add width attributes for core/column
	if ( config.hasWidthControls ) {
		attributes.widthBase = { type: 'string', default: '' };
		attributes.widthSm = { type: 'string', default: '' };
		attributes.widthMd = { type: 'string', default: '' };
		attributes.widthLg = { type: 'string', default: '' };
		attributes.widthXl = { type: 'string', default: '' };
		attributes.widthXXl = { type: 'string', default: '' };
	}

	// Add lazy load attribute for videos and cover blocks
	if ( blockName === 'core/video' || blockName === 'core/cover' ) {
		attributes.lazyLoadVideo = { type: 'boolean', default: true };
	}

	// Register the extension
	registerBlockExtension( blockName, {
		extensionName: `custom-${ blockName.replace( 'core/', '' ) }`,
		attributes,
		Edit: BlockEdit,
		classNameGenerator: ( attrs ) =>
			generateClassName( attrs, blockName, BLOCK_CONFIG ),
	} );
} );

// Lazy load cover background videos
document.addEventListener( 'DOMContentLoaded', () => {
	const lazyVideos = document.querySelectorAll(
		'.wp-block-cover__video-background[data-src]'
	);

	if ( 'IntersectionObserver' in window ) {
		const options = {
			root: null,
			rootMargin: '200px',
			threshold: 0,
		};
		const observer = new window.IntersectionObserver( ( entries ) => {
			entries.forEach( ( entry ) => {
				if ( entry.isIntersecting ) {
					const video = entry.target;
					const dataSrc = video.getAttribute( 'data-src' );
					if ( dataSrc ) {
						video.setAttribute( 'src', dataSrc );
						video.removeAttribute( 'data-src' );
					}
					observer.unobserve( video );
				}
			} );
		}, options );

		lazyVideos.forEach( ( video ) => observer.observe( video ) );
	} else {
		lazyVideos.forEach( ( video ) => {
			const dataSrc = video.getAttribute( 'data-src' );
			if ( dataSrc ) {
				video.setAttribute( 'src', dataSrc );
				video.removeAttribute( 'data-src' );
			}
		} );
	}
} );
