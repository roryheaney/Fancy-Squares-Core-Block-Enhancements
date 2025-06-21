export default function initCustomPlayButtons() {
	document.addEventListener( 'DOMContentLoaded', () => {
		const buttons = document.querySelectorAll( '.fs-video-overlay button' );
		if ( ! buttons.length ) {
			return;
		}
		// function fadeOut(el){
		// 	el.style.opacity = 1;

		// 	(function fade() {
		// 		var interval = setInterval(function() {
		// 			if ((el.style.opacity -= .1) < 0) {
		// 				el.style.display = "none";
		// 				clearInterval(interval);
		// 			} else {
		// 				requestAnimationFrame(fade);
		// 			}
		// 		}, 35);
		// 	})();
		// };
		buttons.forEach( ( button ) => {
			button.addEventListener( 'click', () => {
				const overlay = button.closest( '.fs-video-overlay' );
				if ( ! overlay ) {
					return;
				}
				const video = overlay.nextElementSibling;
				if ( video && video.tagName === 'VIDEO' ) {
					overlay.remove();
					// fadeOut(overlay)
					video.play();
				}
			} );
		} );
	} );
}
