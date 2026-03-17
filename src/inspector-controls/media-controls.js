import { PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { useEffect, useState } from '@wordpress/element';

export default function MediaControls( BlockEdit, props ) {
	const { attributes, setAttributes, clientId, name } = props;
	const { lazyLoadVideo, useCustomPlayButton, disableForcedLazyLoading } =
		attributes;
	const [ hasPoster, setHasPoster ] = useState( false );

	const isVideoBlock = name === 'core/video';
	const isCoverBlock = name === 'core/cover';
	const isImageBlock = name === 'core/image';
	const showVideoLazyToggle = isVideoBlock || isCoverBlock;
	const showForcedLazyOptOutToggle = isCoverBlock || isImageBlock;

	useEffect( () => {
		if ( ! isVideoBlock ) {
			setHasPoster( false );
			return;
		}

		const videoEl = document.querySelector(
			`[data-block="${ clientId }"] video`
		);
		setHasPoster( !! ( videoEl && videoEl.getAttribute( 'poster' ) ) );
	}, [ clientId, isVideoBlock ] );

	const toggleLazyLoad = () => {
		setAttributes( { lazyLoadVideo: ! lazyLoadVideo } );
	};

	const toggleCustomPlayButton = () => {
		setAttributes( { useCustomPlayButton: ! useCustomPlayButton } );
	};

	const toggleForcedLazyOptOut = () => {
		setAttributes( {
			disableForcedLazyLoading: ! disableForcedLazyLoading,
		} );
	};

	const hasEnabledSetting =
		( showVideoLazyToggle && !! lazyLoadVideo ) ||
		( isVideoBlock && !! useCustomPlayButton ) ||
		( showForcedLazyOptOutToggle && !! disableForcedLazyLoading );

	const panelTitle = isImageBlock
		? 'Image Settings'
		: isCoverBlock
		? 'Cover Settings'
		: 'Video Settings';

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
							checked={ lazyLoadVideo }
							onChange={ toggleLazyLoad }
							help="Delay loading the video until it becomes visible."
						/>
					) }

					{ showForcedLazyOptOutToggle && (
						<ToggleControl
							label="Disable forced image lazy loading"
							checked={ !! disableForcedLazyLoading }
							onChange={ toggleForcedLazyOptOut }
							help="Default is forced loading='lazy'. Enable this to skip the forced lazy-loading override for this block."
						/>
					) }

					{ isVideoBlock && (
						<>
							<ToggleControl
								label="Use custom play button"
								checked={ useCustomPlayButton }
								onChange={ toggleCustomPlayButton }
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

