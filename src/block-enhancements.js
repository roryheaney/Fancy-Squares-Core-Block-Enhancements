import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';

// Import Inspector Control helpers
import ColumnsListControl from './inspector-controls/columns-list-control.js';
import MediaControls from './inspector-controls/media-controls.js';
import ModalButtonControl from './inspector-controls/modal-button-control.js';

// Step 1: Add custom attributes to core blocks
addFilter(
	'blocks.registerBlockType',
	'fancy-squares-core-enhancements/add-custom-attributes',
	( settings, name ) => {
		if ( name === 'core/columns' ) {
			settings.attributes.isList = {
				type: 'boolean',
				default: false,
			};
		} else if ( name === 'core/video' || name === 'core/cover' ) {
			settings.attributes.lazyLoadVideo = {
				type: 'boolean',
				default: false,
			};
			if ( name === 'core/video' ) {
				settings.attributes.useCustomPlayButton = {
					type: 'boolean',
					default: false,
				};
			}
		} else if ( name === 'core/button' ) {
			settings.attributes.triggerModal = {
				type: 'boolean',
				default: false,
			};
			settings.attributes.modalId = {
				type: 'string',
				default: '',
			};
		}
		return settings;
	}
);

// Step 2: Add inspector controls for specific blocks
addFilter(
	'editor.BlockEdit',
	'fancy-squares-core-enhancements/add-inspector-controls',
	createHigherOrderComponent( ( BlockEdit ) => {
		return ( props ) => {
			if ( props.name === 'core/columns' ) {
				return ColumnsListControl( BlockEdit, props );
			}
			if ( props.name === 'core/video' || props.name === 'core/cover' ) {
				return MediaControls( BlockEdit, props );
			}
			if ( props.name === 'core/button' ) {
				return ModalButtonControl( BlockEdit, props );
			}
			return <BlockEdit { ...props } />;
		};
	}, 'withInspectorControls' )
);
