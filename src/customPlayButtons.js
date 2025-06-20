export default function initCustomPlayButtons() {
	document.addEventListener( 'DOMContentLoaded', () => {
		const buttons = document.querySelectorAll( '.fs-video-overlay button' );
		buttons.forEach( ( button ) => {
			button.addEventListener( 'click', () => {
				const overlay = button.closest( '.fs-video-overlay' );
				if ( ! overlay ) {
					return;
				}
				const video = overlay.nextElementSibling;
				if ( video && video.tagName === 'VIDEO' ) {
					overlay.remove();
					video.play();
				}
			} );
		} );
	} );
}
