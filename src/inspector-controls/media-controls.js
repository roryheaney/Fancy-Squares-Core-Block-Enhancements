import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

export default function MediaControls( { BlockEdit, ...props } ) {
	const { attributes, setAttributes, clientId, name, isSelected } = props;
	const { lazyLoadVideo, useCustomPlayButton, disableForcedLazyLoading } =
		attributes;

	const isVideoBlock = name === 'core/video';
	const isCoverBlock = name === 'core/cover';
	const isImageBlock = name === 'core/image';
	const showVideoLazyToggle = isVideoBlock || isCoverBlock;
	const showForcedLazyOptOutToggle = isCoverBlock || isImageBlock;

	const hasPoster = useSelect(
		( select ) => {
			if ( ! isVideoBlock ) {
				return false;
			}
			const blockAttrs =
				select( 'core/block-editor' ).getBlockAttributes( clientId );
			return !! blockAttrs?.poster;
		},
		[ clientId, isVideoBlock ]
	);

	if ( ! isSelected ) {
		return <BlockEdit { ...props } />;
	}

	const hasEnabledSetting =
		( showVideoLazyToggle && !! lazyLoadVideo ) ||
		( isVideoBlock && !! useCustomPlayButton ) ||
		( showForcedLazyOptOutToggle && !! disableForcedLazyLoading );

	let panelTitle = 'Video Settings';
	if ( isImageBlock ) {
		panelTitle = 'Image Settings';
	} else if ( isCoverBlock ) {
		panelTitle = 'Cover Settings';
	}

	return (
		<>
			<BlockEdit { ...props } />
			<InspectorControls>
				<PanelBody
					title={
						<span className="fs-panel-title">
							{ panelTitle }
							{ hasEnabledSetting && (
								<span
									className="fs-panel-indicator"
									aria-hidden="true"
								/>
							) }
						</span>
					}
				>
					{ showVideoLazyToggle && (
						<ToggleControl
							label="Lazy Load Video"
							checked={ !! lazyLoadVideo }
							onChange={ () =>
								setAttributes( {
									lazyLoadVideo: ! lazyLoadVideo,
								} )
							}
							help="Delay loading the video until it becomes visible."
						/>
					) }

					{ showForcedLazyOptOutToggle && (
						<ToggleControl
							label="Disable forced image lazy loading"
							checked={ !! disableForcedLazyLoading }
							onChange={ () =>
								setAttributes( {
									disableForcedLazyLoading:
										! disableForcedLazyLoading,
								} )
							}
							help="Default is forced loading='lazy'. Enable this to skip the forced lazy-loading override for this block."
						/>
					) }

					{ isVideoBlock && (
						<>
							<ToggleControl
								label="Use custom play button"
								checked={ !! useCustomPlayButton }
								onChange={ () =>
									setAttributes( {
										useCustomPlayButton:
											! useCustomPlayButton,
									} )
								}
								help="Requires a poster image."
							/>
							{ useCustomPlayButton && ! hasPoster && (
								<p style={ { color: 'red' } }>
									Add a poster image to use the custom play
									button.
								</p>
							) }
						</>
					) }
				</PanelBody>
			</InspectorControls>
		</>
	);
}
