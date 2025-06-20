import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { PanelBody, ToggleControl, TextControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
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

			if ( props.name === 'core/video' || props.name === 'core/cover' ) {
				const { attributes, setAttributes } = props;
				const { lazyLoadVideo, useCustomPlayButton, poster } =
					attributes;
				const toggleLazyLoad = () => {
					setAttributes( { lazyLoadVideo: ! lazyLoadVideo } );
				};
				const toggleCustomPlayButton = () => {
					setAttributes( {
						useCustomPlayButton: ! useCustomPlayButton,
					} );
				};

				return (
					<>
						<BlockEdit { ...props } />
						<InspectorControls>
							<PanelBody title="Video Settings">
								<ToggleControl
									label="Lazy Load Video"
									checked={ lazyLoadVideo }
									onChange={ toggleLazyLoad }
									help="Delay loading the video until it becomes visible."
								/>
								{ props.name === 'core/video' && (
									<>
										<ToggleControl
											label="Use custom play button"
											checked={ useCustomPlayButton }
											onChange={ toggleCustomPlayButton }
											help="Requires a poster image."
										/>
										{ useCustomPlayButton && ! poster && (
											<p style={ { color: 'red' } }>
												Add a poster image to use the
												custom play button.
											</p>
										) }
									</>
								) }
							</PanelBody>
						</InspectorControls>
					</>
				);
			}

			if ( props.name === 'core/button' ) {
				const { attributes, setAttributes } = props;
				const { triggerModal, modalId } = attributes;
				const toggleTriggerModal = () => {
					setAttributes( { triggerModal: ! triggerModal } );
				};
				const updateModalId = ( value ) => {
					setAttributes( { modalId: value } );
				};

				return (
					<>
						<BlockEdit { ...props } />
						<InspectorControls>
							<PanelBody title="Modal Settings">
								<ToggleControl
									label="Trigger a modal"
									checked={ triggerModal }
									onChange={ toggleTriggerModal }
								/>
								{ triggerModal && (
									<TextControl
										label="Modal ID"
										value={ modalId }
										onChange={ updateModalId }
										help="Enter the modal element ID"
									/>
								) }
							</PanelBody>
						</InspectorControls>
					</>
				);
			}

			return <BlockEdit { ...props } />;
		};
	}, 'addInspectorControls' )
);

// The front-end PHP handles lazy-loading for video elements.
