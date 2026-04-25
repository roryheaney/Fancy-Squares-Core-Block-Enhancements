const sanitizeSpacingScaleUnit = ( unit ) =>
	String( unit )
		.toLowerCase()
		.replace( /[^a-z0-9_-]/g, '' );

const roundSpacingValue = ( value ) => Math.round( value * 100 ) / 100;

const computeSpacingSizesFromScale = ( spacingScale ) => {
	const steps = Number( spacingScale?.steps );
	const mediumStep = Number( spacingScale?.mediumStep );
	const operator = spacingScale?.operator;
	const increment = Number( spacingScale?.increment );

	if (
		! Number.isFinite( steps ) ||
		steps === 0 ||
		! Number.isFinite( mediumStep ) ||
		! spacingScale?.unit ||
		( operator !== '+' && operator !== '*' ) ||
		! Number.isFinite( increment )
	) {
		return [];
	}

	const unit =
		spacingScale.unit === '%'
			? '%'
			: sanitizeSpacingScaleUnit( spacingScale.unit );

	let currentStep = mediumStep;
	const stepsMidPoint = Math.round( steps / 2 );
	let xSmallCount = null;
	const belowSizes = [];
	let slug = 40;
	let remainder = 0;

	for (
		let belowMidpointCount = stepsMidPoint - 1;
		steps > 1 && slug > 0 && belowMidpointCount > 0;
		belowMidpointCount--
	) {
		if ( operator === '+' ) {
			currentStep -= increment;
		} else if ( increment > 1 ) {
			currentStep /= increment;
		} else {
			currentStep *= increment;
		}

		if ( currentStep <= 0 ) {
			remainder = belowMidpointCount;
			break;
		}

		belowSizes.push( {
			name:
				belowMidpointCount === stepsMidPoint - 1
					? 'Small'
					: `${ xSmallCount || '' }X-Small`,
			slug: String( slug ),
			size: `${ roundSpacingValue( currentStep ) }${ unit }`,
		} );

		if ( belowMidpointCount === stepsMidPoint - 2 ) {
			xSmallCount = 2;
		}

		if ( belowMidpointCount < stepsMidPoint - 2 ) {
			xSmallCount++;
		}

		slug -= 10;
	}

	belowSizes.reverse();
	belowSizes.push( {
		name: 'Medium',
		slug: '50',
		size: `${ mediumStep }${ unit }`,
	} );

	currentStep = mediumStep;
	let xLargeCount = null;
	const aboveSizes = [];
	slug = 60;
	const stepsAbove = steps - stepsMidPoint + remainder;

	for ( let aboveMidpointCount = 0; aboveMidpointCount < stepsAbove; aboveMidpointCount++ ) {
		currentStep =
			operator === '+'
				? currentStep + increment
				: increment >= 1
					? currentStep * increment
					: currentStep / increment;

		aboveSizes.push( {
			name:
				aboveMidpointCount === 0
					? 'Large'
					: `${ xLargeCount || '' }X-Large`,
			slug: String( slug ),
			size: `${ roundSpacingValue( currentStep ) }${ unit }`,
		} );

		if ( aboveMidpointCount === 1 ) {
			xLargeCount = 2;
		}

		if ( aboveMidpointCount > 1 ) {
			xLargeCount++;
		}

		slug += 10;
	}

	return [ ...belowSizes, ...aboveSizes ];
};

export const toSpacingScaleFromPresets = ( spacingSizes ) => {
	if ( ! Array.isArray( spacingSizes ) || spacingSizes.length === 0 ) {
		return {
			scale: null,
			meta: {},
		};
	}

	const scale = {};
	const meta = {};

	for ( const preset of spacingSizes ) {
		if ( ! preset || typeof preset !== 'object' ) {
			continue;
		}

		const slug =
			preset.slug === undefined || preset.slug === null
				? ''
				: String( preset.slug ).trim();
		const size =
			preset.size === undefined || preset.size === null
				? ''
				: String( preset.size ).trim();

		if ( ! slug || ! size ) {
			continue;
		}

		scale[ slug ] = size;
		meta[ slug ] = {
			name: typeof preset.name === 'string' ? preset.name.trim() : '',
			size,
		};
	}

	if ( Object.keys( scale ).length === 0 ) {
		return {
			scale: null,
			meta: {},
		};
	}

	return {
		scale,
		meta,
	};
};

export const toSpacingScaleFromScale = ( spacingScale ) => {
	const generatedPresets = computeSpacingSizesFromScale( spacingScale );
	return toSpacingScaleFromPresets( generatedPresets );
};
