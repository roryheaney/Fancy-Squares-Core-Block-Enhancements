export default function lazyLoadVideos() {
	document.addEventListener( 'DOMContentLoaded', () => {
		const lazyVideos = document.querySelectorAll(
			'video[data-fs-lazy-video][data-src]'
		);

		if ( lazyVideos.length === 0 ) {
			return;
		}

		if ( 'IntersectionObserver' in window ) {
			const options = {
				root: null,
				rootMargin: '200px',
				threshold: 0,
			};
			const observer = new window.IntersectionObserver( ( entries ) => {
				entries.forEach( ( entry ) => {
					if ( entry.isIntersecting ) {
						const video = entry.target;
						const dataSrc = video.getAttribute( 'data-src' );
						if ( dataSrc ) {
							video.setAttribute( 'src', dataSrc );
							video.removeAttribute( 'data-src' );
						}
						observer.unobserve( video );
					}
				} );
			}, options );

			lazyVideos.forEach( ( video ) => observer.observe( video ) );
		} else {
			lazyVideos.forEach( ( video ) => {
				const dataSrc = video.getAttribute( 'data-src' );
				if ( dataSrc ) {
					video.setAttribute( 'src', dataSrc );
					video.removeAttribute( 'data-src' );
				}
			} );
		}
	} );
}
