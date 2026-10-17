import lazyLoadVideos from '../../assets/js/lazyVideos';
import initCustomPlayButtons from '../../assets/js/customPlayButtons';
import initCarousel from '../../assets/js/carousel';
import initCoverVideoControls from '../../assets/js/coverVideoControls';

const privateVideos = new WeakSet();
window.performaInitializeVideo = ( root ) => {
	if ( root ) {
		for ( const video of root.querySelectorAll( 'video' ) ) {
			if ( ! privateVideos.has( video ) ) {
				privateVideos.add( video );
				video.addEventListener( 'contextmenu', ( event ) =>
					event.preventDefault()
				);
			}
		}
		lazyLoadVideos( root );
		initCustomPlayButtons( root );
	}
};

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
