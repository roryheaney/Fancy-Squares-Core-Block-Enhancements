import lazyLoadVideos from './assets/js/lazyVideos';
import initCustomPlayButtons from './assets/js/customPlayButtons';

const init = () => {
	lazyLoadVideos();
	initCustomPlayButtons();
};

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', init );
} else {
	init();
}
