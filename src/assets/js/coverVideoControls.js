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
		let playRequest = 0;
		let initialLoading = video.readyState < 3;
		const updateControl = () => {
			button.classList.toggle( 'is-loading', initialLoading && playing );
			button.classList.toggle( 'is-playing', playing );
			button.setAttribute(
				'aria-label',
				playing ? button.dataset.pauseLabel : button.dataset.playLabel
			);
		};
		const syncPlayback = () => {
			playing = ! video.paused && ! video.ended;
			updateControl();
		};
		const pauseVideo = () => {
			// A later lazy-load must not override a pause or reduced-motion request.
			playRequest++;
			initialLoading = false;
			video.autoplay = false;
			video.pause();
			syncPlayback();
		};
		const playVideo = () => {
			const request = ++playRequest;
			playing = true;
			updateControl();
			video.play().catch( () => {
				// A canceled request must not clear a newer Play request's state.
				if ( request === playRequest ) {
					pauseVideo();
				}
			} );
		};

		video.addEventListener( 'play', () => {
			if ( video.paused ) {
				return;
			}
			playing = true;
			updateControl();
		} );
		video.addEventListener( 'playing', () => {
			initialLoading = false;
			syncPlayback();
		} );
		video.addEventListener( 'canplay', () => {
			initialLoading = false;
			updateControl();
			// Native lazy autoplay has no promise to report policy rejection.
			if ( playing && video.paused ) {
				playVideo();
			}
		} );
		video.addEventListener( 'pause', () => {
			if ( video.paused ) {
				pauseVideo();
			}
		} );
		video.addEventListener( 'ended', pauseVideo );
		video.addEventListener( 'error', pauseVideo );
		button.addEventListener( 'click', () => {
			// Loading feedback is initial-only, never a response to a user toggle.
			initialLoading = false;
			if ( playing ) {
				document.documentElement.classList.add( 'fs-motion-paused' );
				pauseVideo();
				document.dispatchEvent( new Event( 'fs:motionchange' ) );
				return;
			}

			document.documentElement.classList.remove( 'fs-motion-paused' );
			document.dispatchEvent( new Event( 'fs:motionchange' ) );
			if ( video.dataset.src ) {
				video.src = video.dataset.src;
				video.removeAttribute( 'data-src' );
			}
			playVideo();
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
					playVideo();
				}
			}

			motionPreference.addEventListener( 'change', ( event ) => {
				if ( event.matches ) {
					pauseVideo();
				}
				// Do not auto-resume on preference changes: preserve user intent.
			} );
		}

		updateControl();
		button.hidden = false;
	} );
}
