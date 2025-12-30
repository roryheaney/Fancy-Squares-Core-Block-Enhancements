import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';

// Import Inspector Control helpers
import ColumnsListControl from './inspector-controls/columns-list-control.js';
import MediaControls from './inspector-controls/media-controls.js';
import ModalButtonControl from './inspector-controls/modal-button-control.js';

const WIDTH_ATTR_KEYS = [
	'widthBase',
	'widthSm',
	'widthMd',
	'widthLg',
	'widthXl',
	'widthXXl',
];

const applyBootstrapStyle = ( className = '' ) => {
	if ( className.includes( 'is-style-bootstrap' ) ) {
		return className;
	}
	const cleaned = className
		.replace( 'is-style-default', '' )
		.replace( /\s+/g, ' ' )
		.trim();
	return cleaned ? `${ cleaned } is-style-bootstrap` : 'is-style-bootstrap';
};

const removeBootstrapStyle = ( className = '' ) => {
	if ( ! className.includes( 'is-style-bootstrap' ) ) {
		return className;
	}
	return className
		.replace( 'is-style-bootstrap', '' )
		.replace( /\s+/g, ' ' )
		.trim();
};

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
			const { clientId, name } = props;
			const { updateBlockAttributes } =
				useDispatch( 'core/block-editor' );
			const { hasCustomChildWidths, className } = useSelect(
				( select ) => {
					if ( name !== 'core/columns' ) {
						return { hasCustomChildWidths: false, className: '' };
					}
					const { getBlockOrder, getBlockAttributes } =
						select( 'core/block-editor' );
					const childIds = getBlockOrder( clientId ) || [];
					const parentAtts = getBlockAttributes( clientId ) || {};

					const hasCustom = childIds.some( ( childId ) => {
						const childAtts = getBlockAttributes( childId ) || {};
						return WIDTH_ATTR_KEYS.some( ( key ) => {
							const value = childAtts[ key ];
							return value && value !== 'auto';
						} );
					} );

					return {
						hasCustomChildWidths: hasCustom,
						className: parentAtts.className || '',
					};
				},
				[ clientId, name ]
			);

			useEffect( () => {
				if ( name !== 'core/columns' ) {
					return;
				}

				if ( hasCustomChildWidths ) {
					const nextClassName = applyBootstrapStyle( className );
					if ( nextClassName === className ) {
						return;
					}
					updateBlockAttributes( clientId, {
						className: nextClassName,
					} );
					return;
				}

				const nextClassName = removeBootstrapStyle( className );
				if ( nextClassName === className ) {
					return;
				}
				updateBlockAttributes( clientId, {
					className: nextClassName,
				} );
			}, [
				name,
				hasCustomChildWidths,
				className,
				clientId,
				updateBlockAttributes,
			] );

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
