import lazyLoadVideos from './assets/js/lazyVideos';
import initCustomPlayButtons from './assets/js/customPlayButtons';
import initCarousel from './assets/js/carousel';

const init = () => {
	lazyLoadVideos();
	initCustomPlayButtons();
	initCarousel();
};

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', init );
} else {
	init();
}
