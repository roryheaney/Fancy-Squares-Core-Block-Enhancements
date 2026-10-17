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
		const motionReduced = () =>
			motionPreference.matches ||
			document.documentElement.classList.contains( 'fs-motion-paused' );
		const config = parseConfig( el );
		const speed = config.speed ?? window.Swiper.defaults.speed;
		const waitForTransition = config.autoplay?.waitForTransition ?? true;
		// Suppress autoplay before initialization, keeping its configured delay.
		const swiper = new window.Swiper( el, {
			...config,
			speed: motionReduced() ? 0 : speed,
			autoplay: config.autoplay
				? {
						...config.autoplay,
						enabled: ! motionReduced(),
						// Instant transitions have no transitionend event to await.
						waitForTransition: motionReduced()
							? false
							: waitForTransition,
				  }
				: false,
		} );

		let isPaused = motionReduced();
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
		const handleMotionChange = ( event ) => {
			const reduced = motionReduced();
			const nextSpeed = reduced ? 0 : speed;
			swiper.params.speed = nextSpeed;
			swiper.originalParams.speed = nextSpeed;
			if ( config.autoplay ) {
				swiper.params.autoplay.waitForTransition = reduced
					? false
					: waitForTransition;
				if (
					event.type === 'fs:motionchange' &&
					! document.documentElement.classList.contains(
						'fs-motion-paused'
					)
				) {
					swiper.autoplay.start();
				} else if ( reduced ) {
					isPaused = true;
					swiper.autoplay.stop();
					revealControl();
					updateControl();
					swiper.wrapperEl.setAttribute( 'aria-live', 'polite' );
				}
			}
			if ( reduced && swiper.animating ) {
				// Changing duration alone does not finish an existing CSS transition.
				swiper.setTransition( 0 );
				for ( const transition of swiper.wrapperEl.getAnimations( {
					subtree: true,
				} ) ) {
					if ( transition instanceof window.CSSTransition ) {
						transition.finish();
					}
				}
				swiper.wrapperEl.dispatchEvent( new Event( 'transitionend' ) );
			}
			// Only explicit Play Motion resumes autoplay, not preference changes.
		};
		motionPreference.addEventListener( 'change', handleMotionChange );
		document.addEventListener( 'fs:motionchange', handleMotionChange );
		swiper.on( 'destroy', () => {
			motionPreference.removeEventListener(
				'change',
				handleMotionChange
			);
			document.removeEventListener(
				'fs:motionchange',
				handleMotionChange
			);
		} );
		if ( motionReduced() ) {
			revealControl();
		}
		if ( config.autoplay && isPaused ) {
			swiper.wrapperEl.setAttribute( 'aria-live', 'polite' );
		}
		updateControl();

		if ( config.autoplay && swiper?.autoplay ) {
			// Swiper's A11y module sets aria-live only at initialization.
			swiper.on( 'autoplayStart', () => {
				isPaused = false;
				updateControl();
				swiper.wrapperEl.setAttribute( 'aria-live', 'off' );
			} );
			swiper.on( 'autoplayStop', () => {
				isPaused = true;
				revealControl();
				updateControl();
				swiper.wrapperEl.setAttribute( 'aria-live', 'polite' );
			} );
			const pauseForInteraction = () => swiper.autoplay.stop();
			el.addEventListener( 'mouseenter', pauseForInteraction );
			el.addEventListener( 'focusin', pauseForInteraction );
			// Capture navigation before it runs, but let explicit Play resume.
			el.addEventListener(
				'click',
				( event ) => {
					if ( ! playPauseButton?.contains( event.target ) ) {
						pauseForInteraction();
					}
				},
				true
			);
			el.addEventListener( 'keydown', ( event ) => {
				if (
					playPauseButton?.contains( event.target ) &&
					( event.key === 'Enter' || event.key === ' ' )
				) {
					return;
				}
				pauseForInteraction();
			} );
			swiper.on( 'sliderFirstMove', pauseForInteraction );
			swiper.on( 'keyPress', ( instance, keyCode ) => {
				if ( [ 33, 34, 37, 38, 39, 40 ].includes( keyCode ) ) {
					pauseForInteraction();
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
