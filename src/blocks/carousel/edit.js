import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { useEffect, useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

import CarouselInspectorControls from './carousel-inspector-controls';
import { generateClassName } from '../../utils/helpers';
import { useEnsureUniqueAttributeId } from '../../utils/block-id';
import { useSyncGeneratedClasses } from '../../utils/use-sync-generated-classes';
import { BLOCK_CONFIG } from '../../config/blockConfig';

const TEMPLATE = [ [ 'fs-blocks/carousel-slide' ] ];
const ALLOWED_BLOCKS = [ 'fs-blocks/carousel-slide' ];

const getPreviewSlidesToShow = ( slidesToShow, breakpoints ) => {
	let slides = slidesToShow;
	let largest = 0;

	if ( Array.isArray( breakpoints ) ) {
		breakpoints.forEach( ( bp ) => {
			if ( bp?.breakpoint > largest ) {
				largest = bp.breakpoint;
				slides = bp.slidesToShow;
			}
		} );
	}

	return slides || 1;
};

export default function Edit( props ) {
	const { attributes, setAttributes, clientId, name } = props;
	const {
		slidesToShow,
		columnGap,
		pagination,
		navigation,
		autoplay,
		delay,
		loop,
		breakpoints,
		speed,
		templateLock,
		enableFade,
		fractionalSlidesEnabled,
		fractionalSlidesValue,
		showPlayPauseButton,
		autoHeight,
		enforceHeight,
		elementTag,
		additionalClasses,
	} = attributes;

	const normalizedBreakpoints = useMemo(
		() => ( Array.isArray( breakpoints ) ? breakpoints : [] ),
		[ breakpoints ]
	);

	const { hasChildBlocks } = useSelect(
		( select ) => ( {
			hasChildBlocks:
				select( 'core/block-editor' ).getBlockCount( clientId ) > 0,
		} ),
		[ clientId ]
	);

	const previewSlides = useMemo(
		() => getPreviewSlidesToShow( slidesToShow, normalizedBreakpoints ),
		[ slidesToShow, normalizedBreakpoints ]
	);

	const generatedClassName = useMemo(
		() => generateClassName( attributes, name, BLOCK_CONFIG ),
		[ attributes, name ]
	);
	useSyncGeneratedClasses( {
		additionalClasses,
		generatedClassName,
		setAttributes,
	} );

	useEnsureUniqueAttributeId( {
		clientId,
		blockName: 'fs-blocks/carousel',
		attributeKey: 'blockId',
		setAttributes,
	} );

	useEffect( () => {
		if ( slidesToShow !== 1 ) {
			if ( enableFade || fractionalSlidesEnabled ) {
				setAttributes( {
					enableFade: false,
					fractionalSlidesEnabled: false,
				} );
			}
		}
	}, [ enableFade, fractionalSlidesEnabled, slidesToShow, setAttributes ] );

	useEffect( () => {
		if ( enableFade && fractionalSlidesEnabled ) {
			setAttributes( { fractionalSlidesEnabled: false } );
		}
	}, [ enableFade, fractionalSlidesEnabled, setAttributes ] );

	useEffect( () => {
		if ( ! autoplay && showPlayPauseButton ) {
			setAttributes( { showPlayPauseButton: false } );
		}
	}, [ autoplay, setAttributes, showPlayPauseButton ] );

	const blockProps = useBlockProps( {
		className: [
			`fs-carousel-shows-${ previewSlides }-slides`,
			hasChildBlocks
				? 'fs-carousel-show-scrollbar'
				: 'fs-carousel-hide-scrollbar',
		]
			.filter( Boolean )
			.join( ' ' ),
	} );

	const updateBreakpoint = ( index, updates ) => {
		const next = [ ...normalizedBreakpoints ];
		next[ index ] = { ...next[ index ], ...updates };
		setAttributes( { breakpoints: next } );
	};

	const removeBreakpoint = ( index ) => {
		const next = normalizedBreakpoints.filter( ( _, i ) => i !== index );
		setAttributes( { breakpoints: next } );
	};

	const addBreakpoint = () => {
		const next = [
			...normalizedBreakpoints,
			{ breakpoint: 768, slidesToShow: 2 },
		];
		setAttributes( { breakpoints: next } );
	};

	return (
		<>
			<CarouselInspectorControls
				slidesToShow={ slidesToShow }
				columnGap={ columnGap }
				pagination={ pagination }
				navigation={ navigation }
				autoplay={ autoplay }
				delay={ delay }
				loop={ loop }
				breakpoints={ normalizedBreakpoints }
				speed={ speed }
				elementTag={ elementTag }
				enableFade={ enableFade }
				fractionalSlidesEnabled={ fractionalSlidesEnabled }
				fractionalSlidesValue={ fractionalSlidesValue }
				showPlayPauseButton={ showPlayPauseButton }
				autoHeight={ autoHeight }
				enforceHeight={ enforceHeight }
				setAttributes={ setAttributes }
				updateBreakpoint={ updateBreakpoint }
				removeBreakpoint={ removeBreakpoint }
				addBreakpoint={ addBreakpoint }
			/>

			<div { ...blockProps }>
				<InnerBlocks
					orientation="horizontal"
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ TEMPLATE }
					templateLock={ templateLock || false }
					renderAppender={ InnerBlocks.ButtonBlockAppender }
				/>
			</div>
		</>
	);
}
