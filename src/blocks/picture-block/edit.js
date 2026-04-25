import { useBlockProps } from '@wordpress/block-editor';
import { useMemo, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

import PictureInspectorControls from './picture-inspector-controls';
import PicturePreview from './picture-preview';
import {
	borderOptions,
	borderRadiusOptions,
} from '../../config/framework-option-sets';
import { getValuesFromDisplay } from '../../utils/helpers.js';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const {
		defaultImageId = 0,
		defaultImageUrl = '',
		smallImageId = 0,
		smallImageUrl = '',
		mediumImageId = 0,
		mediumImageUrl = '',
		largeImageId = 0,
		largeImageUrl = '',
		aspectRatio = 'none',
		fillerAlt = '',
		borderClass = [],
		borderRadiusClass = [],
	} = attributes;

	const [ showValues, setShowValues ] = useState( false );

	const defaultMedia = useSelect(
		( select ) =>
			defaultImageId ? select( 'core' ).getMedia( defaultImageId ) : null,
		[ defaultImageId ]
	);

	const defaultAlt = defaultMedia?.alt_text || '';
	const defaultCaption = defaultMedia?.caption?.rendered || '';

	const onSelectImage = ( breakpoint ) => ( media ) => {
		if ( ! media?.id || ! media?.url ) {
			return;
		}
		setAttributes( {
			[ `${ breakpoint }ImageId` ]: media.id,
			[ `${ breakpoint }ImageUrl` ]: media.url,
		} );
	};

	const onRemoveImage = ( breakpoint ) => () => {
		setAttributes( {
			[ `${ breakpoint }ImageId` ]: 0,
			[ `${ breakpoint }ImageUrl` ]: '',
		} );
	};

	const hasSmall = !! smallImageUrl;
	const hasMedium = !! mediumImageUrl;
	const hasLarge = !! largeImageUrl;

	const figureClass = useMemo( () => {
		const figureClassNames = [ 'wp-block-image', 'fs-block-image' ];
		if ( aspectRatio && aspectRatio !== 'none' ) {
			figureClassNames.push(
				'fs-block-image--has-aspect-ratio',
				`is-aspect-ratio-${ aspectRatio }`
			);
		} else {
			figureClassNames.push( 'fs-block-image--no-aspect-ratio' );
		}
		return figureClassNames.join( ' ' );
	}, [ aspectRatio ] );

	const blockProps = useBlockProps( { className: figureClass } );

	const onChangeBorderTokens = ( tokens ) => {
		const newValues = getValuesFromDisplay(
			tokens,
			borderOptions,
			showValues
		);
		setAttributes( { borderClass: newValues } );
	};

	const onChangeRadiusTokens = ( tokens ) => {
		const newValues = getValuesFromDisplay(
			tokens,
			borderRadiusOptions,
			showValues
		);
		setAttributes( { borderRadiusClass: newValues } );
	};

	const imageProps = useMemo( () => {
		const classes = [];
		const styleObj = {};
		const borderTokens = Array.isArray( borderClass ) ? borderClass : [];
		const radiusTokens = Array.isArray( borderRadiusClass )
			? borderRadiusClass
			: [];

		if ( borderTokens.length ) {
			classes.push( ...borderTokens );
			styleObj.borderStyle = 'solid';
			styleObj.borderWidth = '1px';
		}
		if ( radiusTokens.length ) {
			classes.push( ...radiusTokens );
		}

		return {
			className: classes.length ? classes.join( ' ' ) : undefined,
			style: Object.keys( styleObj ).length ? styleObj : undefined,
		};
	}, [ borderClass, borderRadiusClass ] );

	return (
		<figure { ...blockProps }>
			<PictureInspectorControls
				showValues={ showValues }
				setShowValues={ setShowValues }
				defaultImageId={ defaultImageId }
				defaultImageUrl={ defaultImageUrl }
				smallImageId={ smallImageId }
				smallImageUrl={ smallImageUrl }
				mediumImageId={ mediumImageId }
				mediumImageUrl={ mediumImageUrl }
				largeImageId={ largeImageId }
				largeImageUrl={ largeImageUrl }
				fillerAlt={ fillerAlt }
				setFillerAlt={ ( value ) =>
					setAttributes( { fillerAlt: value } )
				}
				aspectRatio={ aspectRatio }
				setAspectRatio={ ( value ) =>
					setAttributes( { aspectRatio: value } )
				}
				borderClass={ borderClass }
				borderRadiusClass={ borderRadiusClass }
				onChangeBorderTokens={ onChangeBorderTokens }
				onChangeRadiusTokens={ onChangeRadiusTokens }
				onSelectImage={ onSelectImage }
				onRemoveImage={ onRemoveImage }
			/>
			<PicturePreview
				defaultImageUrl={ defaultImageUrl }
				defaultAlt={ defaultAlt }
				defaultCaption={ defaultCaption }
				hasSmall={ hasSmall }
				hasMedium={ hasMedium }
				hasLarge={ hasLarge }
				smallImageUrl={ smallImageUrl }
				mediumImageUrl={ mediumImageUrl }
				largeImageUrl={ largeImageUrl }
				fillerAlt={ fillerAlt }
				imageProps={ imageProps }
			/>
		</figure>
	);
}
