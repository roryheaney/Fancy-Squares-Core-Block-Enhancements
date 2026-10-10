const debounce = ( callback, wait = 250 ) => {
	let timeoutId = null;
	return ( ...args ) => {
		if ( timeoutId ) {
			window.clearTimeout( timeoutId );
		}
		timeoutId = window.setTimeout( () => {
			timeoutId = null;
			callback( ...args );
		}, wait );
	};
};

const parseConfig = ( element ) => {
	const raw = element.getAttribute( 'data-swiper' );
	if ( ! raw ) {
		return {};
	}

	try {
		return JSON.parse( raw );
	} catch ( error ) {
		// eslint-disable-next-line no-console
		console.warn( 'Invalid swiper config:', error );
		return {};
	}
};

const applyEnforcedHeights = ( elements ) => {
	elements.forEach( ( carousel ) => {
		const slides = carousel.querySelectorAll( '.swiper-slide' );
		let tallest = 0;

		slides.forEach( ( slide ) => {
			slide.style.minHeight = '';
			if ( slide.offsetHeight > tallest ) {
				tallest = slide.offsetHeight;
			}
		} );

		slides.forEach( ( slide ) => {
			slide.style.minHeight = `${ tallest }px`;
			slide.classList.add( 'swiper-slide-enforced-height' );
		} );
	} );
};

const initCarousel = () => {
	const carousels = Array.from(
		document.querySelectorAll( '.wp-block-fs-blocks-carousel.swiper' )
	);

	if ( ! carousels.length ) {
		return;
	}

	const enforceHeightCarousels = carousels.filter(
		( el ) => el.dataset.enforceHeight === 'true'
	);

	if ( enforceHeightCarousels.length ) {
		const updateHeights = debounce( () =>
			applyEnforcedHeights( enforceHeightCarousels )
		);
		updateHeights();
		window.addEventListener( 'resize', updateHeights );
		window.addEventListener( 'load', updateHeights );
	}

	if ( typeof window.Swiper !== 'function' ) {
		// eslint-disable-next-line no-console
		console.warn(
			'Swiper is not available. Carousel blocks will render without motion.'
		);
		return;
	}

	const motionPreference = window.matchMedia(
		'(prefers-reduced-motion: reduce)'
	);

	carousels.forEach( ( el ) => {
		const config = parseConfig( el );
		const speed = config.speed ?? window.Swiper.defaults.speed;
		const waitForTransition = config.autoplay?.waitForTransition ?? true;
		// Suppress autoplay before initialization, keeping its configured delay.
		const swiper = new window.Swiper( el, {
			...config,
			speed: motionPreference.matches ? 0 : speed,
			autoplay: config.autoplay
				? {
						...config.autoplay,
						enabled: ! motionPreference.matches,
						// Instant transitions have no transitionend event to await.
						waitForTransition: motionPreference.matches
							? false
							: waitForTransition,
				  }
				: false,
		} );

		let isPaused = motionPreference.matches;
		const playPauseButton = el.querySelector( '.swiper__button-control' );
		const pauseLabel = playPauseButton?.dataset.labelPause || 'Pause';
		const playLabel =
			playPauseButton?.dataset.labelPlay ||
			'Carousel is paused, click to play';
		const labelSpans = playPauseButton?.querySelectorAll(
			'.swiper__button-control-state'
		);
		const playSpan = labelSpans?.[ 0 ];
		const pauseSpan = labelSpans?.[ 1 ];
		const updateControl = () => {
			playPauseButton?.setAttribute(
				'aria-label',
				isPaused ? playLabel : pauseLabel
			);
			playSpan?.classList.toggle( 'd-none', ! isPaused );
			pauseSpan?.classList.toggle( 'd-none', isPaused );
		};
		const revealControl = () => {
			if ( config.autoplay && playPauseButton ) {
				// Keep an explicit restart available, even if the editor hid it.
				playPauseButton.classList.remove( 'd-none' );
				el.querySelector( '.swiper-pause-pagination' ).classList.remove(
					'd-none'
				);
			}
		};
		const handleMotionChange = () => {
			const nextSpeed = motionPreference.matches ? 0 : speed;
			swiper.params.speed = nextSpeed;
			swiper.originalParams.speed = nextSpeed;
			if ( config.autoplay ) {
				swiper.params.autoplay.waitForTransition =
					motionPreference.matches ? false : waitForTransition;
				if ( motionPreference.matches ) {
					isPaused = true;
					swiper.autoplay.stop();
					revealControl();
					updateControl();
				}
			}
			// Restoring normal motion must not resume a user/preference pause.
		};
		motionPreference.addEventListener( 'change', handleMotionChange );
		swiper.on( 'destroy', () =>
			motionPreference.removeEventListener( 'change', handleMotionChange )
		);
		if ( motionPreference.matches ) {
			revealControl();
		}
		updateControl();

		if ( config.autoplay && swiper?.autoplay ) {
			// Swiper's A11y module sets this only at initialization.
			swiper.on( 'autoplayStart', () =>
				swiper.wrapperEl.setAttribute( 'aria-live', 'off' )
			);
			swiper.on( 'autoplayStop', () =>
				swiper.wrapperEl.setAttribute( 'aria-live', 'polite' )
			);
			el.addEventListener( 'mouseenter', () => {
				if ( ! isPaused ) {
					swiper.autoplay.stop();
				}
			} );
			el.addEventListener( 'mouseleave', () => {
				if ( ! isPaused ) {
					swiper.autoplay.start();
				}
			} );
		}

		if ( config.autoplay && playPauseButton && swiper?.autoplay ) {
			playPauseButton.addEventListener( 'click', ( event ) => {
				event.preventDefault();

				if ( ! isPaused ) {
					swiper.autoplay.stop();
					isPaused = true;
				} else {
					swiper.autoplay.start();
					isPaused = false;
				}
				updateControl();
			} );
		}
	} );
};

export default initCarousel;
