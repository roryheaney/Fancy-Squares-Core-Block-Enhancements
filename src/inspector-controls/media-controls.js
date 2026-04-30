import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEffect, useMemo, useState } from '@wordpress/element';

const YOUTUBE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;
const VIMEO_ID_PATTERN = /^\d+$/;

const normalizeHost = ( value = '' ) =>
	value.toLowerCase().replace( /^www\./, '' );

const getYouTubeIdFromPath = ( pathname ) => {
	const segments = pathname.split( '/' ).filter( Boolean );
	if ( segments.length === 0 ) {
		return '';
	}

	if ( [ 'embed', 'shorts', 'live' ].includes( segments[ 0 ] ) ) {
		return segments[ 1 ] || '';
	}

	return segments[ 0 ] || '';
};

const getVimeoIdFromPath = ( pathname ) => {
	const segments = pathname.split( '/' ).filter( Boolean );
	if ( segments.length === 0 ) {
		return '';
	}

	if ( segments[ 0 ] === 'video' ) {
		return segments[ 1 ] || '';
	}

	const lastNumericSegment = [ ...segments ]
		.reverse()
		.find( ( segment ) => VIMEO_ID_PATTERN.test( segment ) );

	return lastNumericSegment || '';
};

const getEmbedPreviewData = ( rawUrl = '' ) => {
	const trimmedUrl = rawUrl.trim();
	if ( ! trimmedUrl ) {
		return {
			embedUrl: '',
			error: '',
		};
	}

	let parsedUrl;
	try {
		parsedUrl = new URL( trimmedUrl );
	} catch ( error ) {
		return {
			embedUrl: '',
			error: 'Enter a valid URL.',
		};
	}

	const host = normalizeHost( parsedUrl.hostname );

	if (
		host === 'youtu.be' ||
		host === 'youtube.com' ||
		host === 'm.youtube.com' ||
		host === 'youtube-nocookie.com'
	) {
		let videoId = '';

		if ( host === 'youtu.be' ) {
			videoId = getYouTubeIdFromPath( parsedUrl.pathname );
		} else {
			videoId =
				parsedUrl.searchParams.get( 'v' ) ||
				getYouTubeIdFromPath( parsedUrl.pathname );
		}

		if ( ! YOUTUBE_ID_PATTERN.test( videoId ) ) {
			return {
				embedUrl: '',
				error: 'Enter a valid YouTube URL.',
			};
		}

		const params = new URLSearchParams( {
			autoplay: '1',
			mute: '1',
			loop: '1',
			playlist: videoId,
			controls: '0',
			rel: '0',
			modestbranding: '1',
			playsinline: '1',
		} );

		return {
			embedUrl: `https://www.youtube-nocookie.com/embed/${ videoId }?${ params.toString() }`,
			error: '',
		};
	}

	if ( host === 'vimeo.com' || host === 'player.vimeo.com' ) {
		const videoId = getVimeoIdFromPath( parsedUrl.pathname );

		if ( ! VIMEO_ID_PATTERN.test( videoId ) ) {
			return {
				embedUrl: '',
				error: 'Enter a valid Vimeo URL.',
			};
		}

		const params = new URLSearchParams( {
			autoplay: '1',
			muted: '1',
			loop: '1',
			background: '1',
			title: '0',
			byline: '0',
			portrait: '0',
		} );

		return {
			embedUrl: `https://player.vimeo.com/video/${ videoId }?${ params.toString() }`,
			error: '',
		};
	}

	return {
		embedUrl: '',
		error: 'Only YouTube and Vimeo URLs are supported.',
	};
};

export default function MediaControls( { BlockEdit, ...props } ) {
	const { attributes, setAttributes, clientId, name, isSelected } = props;
	const {
		lazyLoadVideo,
		useCustomPlayButton,
		disableForcedLazyLoading,
		useEmbedBackground,
		embedBackgroundUrl,
	} = attributes;

	const isVideoBlock = name === 'core/video';
	const isCoverBlock = name === 'core/cover';
	const isImageBlock = name === 'core/image';
	const isCoverEmbedMode = isCoverBlock && !! useEmbedBackground;
	const showVideoLazyToggle =
		isVideoBlock || ( isCoverBlock && ! isCoverEmbedMode );
	const showForcedLazyOptOutToggle =
		isImageBlock || ( isCoverBlock && ! isCoverEmbedMode );

	const embedPreview = useMemo(
		() => getEmbedPreviewData( embedBackgroundUrl || '' ),
		[ embedBackgroundUrl ]
	);
	const [ showEmbedPreview, setShowEmbedPreview ] = useState( false );

	useEffect( () => {
		if ( ! isCoverEmbedMode || ! embedPreview.embedUrl ) {
			setShowEmbedPreview( false );
		}
	}, [ isCoverEmbedMode, embedPreview.embedUrl ] );

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
		( showForcedLazyOptOutToggle && !! disableForcedLazyLoading ) ||
		( isCoverBlock && !! useEmbedBackground );

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
					{ isCoverBlock && (
						<>
							<ToggleControl
								__nextHasNoMarginBottom
								label="Use embed background"
								checked={ !! useEmbedBackground }
								onChange={ () =>
									setAttributes( {
										useEmbedBackground:
											! useEmbedBackground,
										lazyLoadVideo: false,
									} )
								}
								help="Use a YouTube or Vimeo embed URL as the cover background source."
							/>
							{ isCoverEmbedMode && (
								<>
									<TextControl
										__nextHasNoMarginBottom
										label="Embed URL"
										value={ embedBackgroundUrl || '' }
										onChange={ ( value ) =>
											setAttributes( {
												embedBackgroundUrl: value,
											} )
										}
										help="Paste a YouTube or Vimeo URL."
									/>
									<ToggleControl
										__nextHasNoMarginBottom
										label="Show embed preview in editor"
										checked={ showEmbedPreview }
										disabled={ ! embedPreview.embedUrl }
										onChange={ () =>
											setShowEmbedPreview(
												( current ) => ! current
											)
										}
									/>
									{ embedPreview.error &&
										( embedBackgroundUrl || '' ).trim() && (
											<p style={ { color: 'red' } }>
												{ embedPreview.error }
											</p>
										) }
									{ showEmbedPreview &&
										embedPreview.embedUrl && (
											<iframe
												className="fs-cover-embed-preview"
												src={ embedPreview.embedUrl }
												title="Cover embed preview"
												allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
												allowFullScreen
												tabIndex="-1"
												aria-hidden="true"
												style={ {
													display: 'block',
													width: '100%',
													aspectRatio: '16 / 9',
													border: 0,
													marginTop: '8px',
												} }
											/>
										) }
									<p>
										Frontend output enforces autoplay, loop,
										muted playback, and non-interactive
										background behavior.
									</p>
								</>
							) }
						</>
					) }

					{ showVideoLazyToggle && (
						<ToggleControl
							__nextHasNoMarginBottom
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
							__nextHasNoMarginBottom
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
								__nextHasNoMarginBottom
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
