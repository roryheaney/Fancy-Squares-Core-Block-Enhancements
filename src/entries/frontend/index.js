import lazyLoadVideos from '../../assets/js/lazyVideos';
import initCustomPlayButtons from '../../assets/js/customPlayButtons';
import initCarousel from '../../assets/js/carousel';
import initCoverVideoControls from '../../assets/js/coverVideoControls';

const init = () => {
	// Decide Cover autoplay before any deferred video sources are hydrated.
	initCoverVideoControls();
	lazyLoadVideos();
	initCustomPlayButtons();
	initCarousel();
};

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', init );
} else {
	init();
}
