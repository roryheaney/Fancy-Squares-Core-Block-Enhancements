import { __ } from '@wordpress/i18n';

export const FILLER_IMAGE_DATA =
	'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export default function PicturePreview( {
	defaultImageUrl,
	defaultAlt,
	defaultCaption,
	hasSmall,
	hasMedium,
	hasLarge,
	smallImageUrl,
	mediumImageUrl,
	largeImageUrl,
	fillerAlt,
	imageProps,
} ) {
	const noBreakpoints = ! hasSmall && ! hasMedium && ! hasLarge;

	if ( noBreakpoints ) {
		if ( ! defaultImageUrl ) {
			return (
				<p>
					{ __(
						'No default image selected.',
						'fancy-squares-core-enhancements'
					) }
				</p>
			);
		}

		return (
			<>
				<img
					src={ defaultImageUrl }
					alt={ defaultAlt }
					style={ { maxWidth: '100%' } }
					{ ...imageProps }
				/>
				{ defaultCaption && (
					<figcaption
						dangerouslySetInnerHTML={ { __html: defaultCaption } }
					/>
				) }
			</>
		);
	}

	let sourceSmall = null;
	let sourceMedium = null;
	let sourceLarge = null;

	if ( hasSmall ) {
		sourceSmall = (
			<source media="(max-width: 600px)" srcSet={ smallImageUrl } />
		);
	} else if ( hasMedium ) {
		sourceSmall = (
			<source media="(max-width: 600px)" srcSet={ mediumImageUrl } />
		);
	}

	if ( hasMedium && hasSmall ) {
		sourceMedium = (
			<source
				media="(min-width: 601px) and (max-width: 1023px)"
				srcSet={ mediumImageUrl }
			/>
		);
	} else if ( hasMedium && ! hasSmall ) {
		sourceMedium = (
			<source media="(max-width: 1023px)" srcSet={ mediumImageUrl } />
		);
	}

	if ( hasLarge ) {
		sourceLarge = (
			<source media="(min-width: 1024px)" srcSet={ largeImageUrl } />
		);
	} else if ( hasMedium ) {
		sourceLarge = (
			<source media="(min-width: 1024px)" srcSet={ mediumImageUrl } />
		);
	}

	const fallbackUrl = defaultImageUrl || FILLER_IMAGE_DATA;
	const fallbackAlt = defaultImageUrl ? defaultAlt : fillerAlt;

	return (
		<>
			<picture>
				{ sourceSmall }
				{ sourceMedium }
				{ sourceLarge }
				<img
					src={ fallbackUrl }
					alt={ fallbackAlt }
					style={ { maxWidth: '100%' } }
					{ ...imageProps }
				/>
			</picture>
			{ defaultCaption && (
				<figcaption
					dangerouslySetInnerHTML={ { __html: defaultCaption } }
				/>
			) }
		</>
	);
}
