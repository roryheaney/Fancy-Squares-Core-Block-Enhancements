import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { useEffect, Children } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

// Step 1: Add custom attributes to core/columns and core/column
addFilter(
	'blocks.registerBlockType',
	'fancy-squares-core-enhancements/add-custom-attributes',
	( settings, name ) => {
		if ( name === 'core/columns' ) {
			settings.attributes.isList = {
				type: 'boolean',
				default: false,
			};
		} else if ( name === 'core/column' ) {
			settings.attributes.parentIsList = {
				type: 'boolean',
				default: false,
			};
		}
		return settings;
	}
);

// Step 2: Add checkbox to core/columns editor and handle dynamic updates
addFilter(
	'editor.BlockEdit',
	'fancy-squares-core-enhancements/add-inspector-controls',
	createHigherOrderComponent( ( BlockEdit ) => {
		return ( props ) => {
			if ( props.name === 'core/columns' ) {
				const { attributes, setAttributes, clientId } = props;
				const { isList } = attributes;

				// Use useSelect to get inner blocks
				const innerBlocks = useSelect(
					( select ) =>
						select( 'core/block-editor' ).getBlocks( clientId ),
					[ clientId ]
				);

				// Use useDispatch to update block attributes
				const { updateBlockAttributes } =
					useDispatch( 'core/block-editor' );

				// Use useEffect to update child blocks' attributes when isList or innerBlocks change
				useEffect( () => {
					innerBlocks.forEach( ( innerBlock ) => {
						if ( innerBlock.name === 'core/column' ) {
							updateBlockAttributes( innerBlock.clientId, {
								parentIsList: isList,
							} );
						}
					} );
				}, [ innerBlocks, isList, updateBlockAttributes ] );

				// Toggle function for the checkbox
				const toggleIsList = () => {
					setAttributes( { isList: ! isList } );
				};

				return (
					<>
						<BlockEdit { ...props } />
						<InspectorControls>
							<PanelBody title="List Settings">
								<ToggleControl
									label="Enable List Role"
									checked={ isList }
									onChange={ toggleIsList }
									help="Adds role='list' to columns and role='listitem' to child columns."
								/>
							</PanelBody>
						</InspectorControls>
					</>
				);
			}
			return <BlockEdit { ...props } />;
		};
	}, 'addInspectorControls' )
);

// Step 3: Modify save output to add role attributes
addFilter(
	'blocks.getSaveElement',
	'fancy-squares-core-enhancements/add-role-attributes',
	( element, blockType, attributes ) => {
		if ( blockType.name === 'core/columns' && attributes.isList ) {
			return wp.element.cloneElement( element, { role: 'list' } );
		} else if (
			blockType.name === 'core/column' &&
			attributes.parentIsList
		) {
			return wp.element.cloneElement( element, { role: 'listitem' } );
		}
		return element;
	}
);

// Add lazy loading to images and videos
addFilter(
	'blocks.getSaveElement',
	'fancy-squares-core-enhancements/lazy-elements',
	( element, blockType, attributes ) => {
		// Lazy load video block source
		if ( blockType.name === 'core/video' && attributes.lazyLoadVideo ) {
			const newChildren = Children.map(
				element.props.children,
				( child ) => {
					if ( child?.type === 'video' ) {
						const videoProps = {
							...child.props,
							'data-fs-lazy-video': true,
							'data-src': child.props.src,
						};
						return wp.element.cloneElement( child, videoProps );
					}
					return child;
				}
			);
			return wp.element.cloneElement(
				element,
				element.props,
				newChildren
			);
		}

		// Lazy load video inside cover block
		if ( blockType.name === 'core/cover' && attributes.lazyLoadVideo ) {
			const newChildren = Children.map(
				element.props.children,
				( child ) => {
					if (
						child?.props?.className?.includes(
							'wp-block-cover__video-background'
						)
					) {
						return wp.element.cloneElement( child, {
							'data-src': child.props.src,
							src: '',
						} );
					}
					// layz load image inside cover block
					if (
						child?.props?.className?.includes(
							'wp-block-cover__image-background'
						)
					) {
						return wp.element.cloneElement( child, {
							loading: 'lazy',
						} );
					}
					return child;
				}
			);
			return wp.element.cloneElement(
				element,
				element.props,
				newChildren
			);
		}

		return element;
	}
);
