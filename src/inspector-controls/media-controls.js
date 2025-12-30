import { PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { useEffect, useState } from '@wordpress/element';

export default function MediaControls( BlockEdit, props ) {
	const { attributes, setAttributes, clientId } = props;
	const { lazyLoadVideo, useCustomPlayButton } = attributes;
	const [ hasPoster, setHasPoster ] = useState( false );

	useEffect( () => {
		const videoEl = document.querySelector(
			`[data-block="${ clientId }"] video`
		);
		setHasPoster( !! ( videoEl && videoEl.getAttribute( 'poster' ) ) );
	}, [ clientId ] );

	const toggleLazyLoad = () => {
		setAttributes( { lazyLoadVideo: ! lazyLoadVideo } );
	};

	const toggleCustomPlayButton = () => {
		setAttributes( { useCustomPlayButton: ! useCustomPlayButton } );
	};

	return (
		<>
			<BlockEdit { ...props } />
			<InspectorControls>
				<PanelBody
					title={
						<span className="fs-panel-title">
							Video Settings
							{ ( lazyLoadVideo || useCustomPlayButton ) && (
								<span
									className="fs-panel-indicator"
									aria-hidden="true"
								/>
							) }
						</span>
					}
				>
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
