export default function initCoverVideoControls() {
	const buttons = document.querySelectorAll( '.fs-cover-video-toggle' );
	buttons.forEach( ( button ) => {
		const video = document.getElementById(
			button.getAttribute( 'aria-controls' )
		);
		if ( ! video || ! video.matches( 'video[data-fs-cover-video]' ) ) {
			return;
		}

		// Autoplay may still be waiting for a lazy source or media readiness.
		let playing = ! video.paused || video.autoplay;
		const updateLabel = () => {
			button.textContent = playing
				? button.dataset.pauseLabel
				: button.dataset.playLabel;
		};
		const syncPlayback = () => {
			playing = ! video.paused && ! video.ended;
			updateLabel();
		};
		const pauseVideo = () => {
			// A later lazy-load must not override a pause or reduced-motion request.
			video.autoplay = false;
			video.pause();
			syncPlayback();
		};

		video.addEventListener( 'play', syncPlayback );
		video.addEventListener( 'pause', syncPlayback );
		video.addEventListener( 'ended', syncPlayback );
		video.addEventListener( 'error', syncPlayback );
		button.addEventListener( 'click', () => {
			if ( playing ) {
				pauseVideo();
				return;
			}

			if ( video.dataset.src ) {
				video.src = video.dataset.src;
				video.removeAttribute( 'data-src' );
			}
			video.play().catch( syncPlayback );
		} );

		if ( video.dataset.fsReducedMotion === 'true' ) {
			const motionPreference = window.matchMedia(
				'(prefers-reduced-motion: reduce)'
			);
			// PHP withheld autoplay so the poster is shown before this decision.
			if ( motionPreference.matches ) {
				pauseVideo();
			} else if ( video.dataset.fsCoverAutoplay === 'true' ) {
				video.autoplay = true;
				playing = true;
				// Lazy videos start when their source is hydrated, not before it.
				if ( ! video.dataset.src ) {
					video.play().catch( syncPlayback );
				}
			}

			motionPreference.addEventListener( 'change', ( event ) => {
				if ( event.matches ) {
					pauseVideo();
				}
				// Do not auto-resume on preference changes: preserve user intent.
			} );
		}

		updateLabel();
		button.hidden = false;
	} );
}
