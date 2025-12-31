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

	carousels.forEach( ( el ) => {
		const config = parseConfig( el );
		const swiper = new window.Swiper( el, config );

		let isPaused = false;

		if ( config.autoplay && swiper?.autoplay ) {
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

		const playPauseButton = el.querySelector( '.swiper__button-control' );
		if ( playPauseButton && swiper?.autoplay ) {
			const pauseLabel =
				playPauseButton.dataset.labelPause ||
				playPauseButton.getAttribute( 'aria-label' ) ||
				'Pause';
			const playLabel =
				playPauseButton.dataset.labelPlay ||
				'Carousel is paused, click to play';
			const labelSpans = playPauseButton.querySelectorAll( 'span' );
			const pauseSpan = labelSpans[ 0 ];
			const playSpan = labelSpans[ 1 ];

			playPauseButton.addEventListener( 'click', ( event ) => {
				event.preventDefault();

				if ( ! isPaused ) {
					swiper.autoplay.stop();
					playPauseButton.setAttribute( 'aria-label', playLabel );
					if ( pauseSpan ) {
						pauseSpan.classList.add( 'd-none' );
					}
					if ( playSpan ) {
						playSpan.classList.remove( 'd-none' );
					}
					isPaused = true;
				} else {
					swiper.autoplay.start();
					playPauseButton.setAttribute( 'aria-label', pauseLabel );
					if ( pauseSpan ) {
						pauseSpan.classList.remove( 'd-none' );
					}
					if ( playSpan ) {
						playSpan.classList.add( 'd-none' );
					}
					isPaused = false;
				}
			} );
		}
	} );
};

export default initCarousel;
