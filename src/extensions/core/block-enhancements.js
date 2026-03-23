import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';

import ColumnsListControl from '../../inspector-controls/columns-list-control.js';
import MediaControls from '../../inspector-controls/media-controls.js';
import ModalButtonControl from '../../inspector-controls/modal-button-control.js';
import {
	getBreakpointAttributeKey,
	WIDTH_BREAKPOINT_KEYS,
} from '../../config/breakpoints';

const WIDTH_ATTR_KEYS = WIDTH_BREAKPOINT_KEYS.map( ( breakpointKey ) =>
	getBreakpointAttributeKey( 'width', breakpointKey )
);

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

const withCustomAttributes = ( settings, name ) => {
	if ( ! settings?.attributes ) {
		return settings;
	}

	const nextAttributes = { ...settings.attributes };

	if ( name === 'core/columns' ) {
		nextAttributes.isList = {
			type: 'boolean',
			default: false,
		};
	}

	if (
		name === 'core/video' ||
		name === 'core/cover' ||
		name === 'core/image'
	) {
		if ( name === 'core/video' || name === 'core/cover' ) {
			nextAttributes.lazyLoadVideo = {
				type: 'boolean',
				default: false,
			};
		}
		if ( name === 'core/cover' || name === 'core/image' ) {
			nextAttributes.disableForcedLazyLoading = {
				type: 'boolean',
				default: false,
			};
		}
		if ( name === 'core/video' ) {
			nextAttributes.useCustomPlayButton = {
				type: 'boolean',
				default: false,
			};
		}
	}

	if ( name === 'core/button' ) {
		nextAttributes.triggerModal = {
			type: 'boolean',
			default: false,
		};
		nextAttributes.modalId = {
			type: 'string',
			default: '',
		};
	}

	return {
		...settings,
		attributes: nextAttributes,
	};
};

addFilter(
	'blocks.registerBlockType',
	'fancy-squares-core-enhancements/add-custom-attributes',
	withCustomAttributes
);

const withInspectorControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { clientId, name } = props;
		const { updateBlockAttributes } = useDispatch( 'core/block-editor' );

		const isColumnsBlock = name === 'core/columns';
		const isMediaBlock =
			name === 'core/video' ||
			name === 'core/cover' ||
			name === 'core/image';
		const isModalButtonBlock = name === 'core/button';

		const { hasCustomChildWidths, className } = useSelect(
			( select ) => {
				if ( ! isColumnsBlock ) {
					return {
						hasCustomChildWidths: false,
						className: '',
					};
				}

				const blockEditor = select( 'core/block-editor' );
				const childIds = blockEditor.getBlockOrder( clientId ) || [];
				const parentAtts =
					blockEditor.getBlockAttributes( clientId ) || {};

				const hasCustom = childIds.some( ( childId ) => {
					const childAtts =
						blockEditor.getBlockAttributes( childId ) || {};
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
			[ clientId, isColumnsBlock ]
		);

		useEffect( () => {
			if ( ! isColumnsBlock ) {
				return;
			}

			if ( hasCustomChildWidths ) {
				const nextClassName = applyBootstrapStyle( className );
				if ( nextClassName !== className ) {
					updateBlockAttributes( clientId, {
						className: nextClassName,
					} );
				}
				return;
			}

			const nextClassName = removeBootstrapStyle( className );
			if ( nextClassName !== className ) {
				updateBlockAttributes( clientId, {
					className: nextClassName,
				} );
			}
		}, [
			isColumnsBlock,
			hasCustomChildWidths,
			className,
			clientId,
			updateBlockAttributes,
		] );

		if ( isColumnsBlock ) {
			return <ColumnsListControl BlockEdit={ BlockEdit } { ...props } />;
		}

		if ( isMediaBlock ) {
			return <MediaControls BlockEdit={ BlockEdit } { ...props } />;
		}

		if ( isModalButtonBlock ) {
			return <ModalButtonControl BlockEdit={ BlockEdit } { ...props } />;
		}

		return <BlockEdit { ...props } />;
	};
}, 'withInspectorControls' );

addFilter(
	'editor.BlockEdit',
	'fancy-squares-core-enhancements/add-inspector-controls',
	withInspectorControls
);
