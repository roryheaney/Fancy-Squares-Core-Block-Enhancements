import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const defaultTokensPath = path.resolve( root, 'data', 'style-tokens.default.json' );
const scssOutPath = path.resolve(
	root,
	'src',
	'styles',
	'generated',
	'_framework-tokens.scss'
);
const jsTokensOutPath = path.resolve(
	root,
	'src',
	'config',
	'generated',
	'framework-tokens.js'
);
const generatedOptionsOutPath = path.resolve(
	root,
	'data',
	'bootstrap-classes',
	'generated-spacing-options.js'
);
const defaultThemeJsonPath = path.resolve( root, 'theme.json' );

const cliArgs = process.argv.slice( 2 );
const getCliArgValue = ( key ) => {
	const prefix = `--${ key }=`;
	for ( let index = 0; index < cliArgs.length; index++ ) {
		const arg = cliArgs[ index ];
		if ( arg === `--${ key }` ) {
			return cliArgs[ index + 1 ] || null;
		}
		if ( arg.startsWith( prefix ) ) {
			return arg.slice( prefix.length ) || null;
		}
	}
	return null;
};
const hasCliFlag = ( key ) => cliArgs.includes( `--${ key }` );

const explicitThemeJsonInput =
	getCliArgValue( 'theme-json-path' ) || process.env.FS_THEME_JSON_PATH || null;
const requireThemeSource =
	hasCliFlag( 'require-theme-source' ) ||
	process.env.FS_REQUIRE_THEME_SOURCE === '1' ||
	process.env.FS_REQUIRE_THEME_SOURCE === 'true';

const explicitThemeJsonPath = explicitThemeJsonInput
	? path.resolve( root, explicitThemeJsonInput )
	: null;

const readJson = ( filePath ) => {
	if ( ! fs.existsSync( filePath ) ) {
		return null;
	}
	try {
		const raw = fs.readFileSync( filePath, 'utf8' );
		return JSON.parse( raw );
	} catch ( error ) {
		console.warn( `[tokens] Failed to parse ${ filePath }:`, error.message );
		return null;
	}
};

const toSpacingScaleFromPresets = ( spacingSizes ) => {
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
			name:
				typeof preset.name === 'string' ? preset.name.trim() : '',
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

const toSpacingScaleFromScale = ( spacingScale ) => {
	const generatedPresets = computeSpacingSizesFromScale( spacingScale );
	return toSpacingScaleFromPresets( generatedPresets );
};

const normalizeFrameworkOptionSets = ( optionSets ) => {
	if ( ! optionSets || typeof optionSets !== 'object' ) {
		return {};
	}

	const normalized = {};

	for ( const [ key, options ] of Object.entries( optionSets ) ) {
		if ( ! Array.isArray( options ) || options.length === 0 ) {
			continue;
		}

		const normalizedOptions = options
			.map( ( option ) => {
				if ( ! option || typeof option !== 'object' ) {
					return null;
				}

				const label =
					typeof option.label === 'string'
						? option.label.trim()
						: '';
				const value =
					option.value === undefined || option.value === null
						? ''
						: String( option.value ).trim();

				if ( ! label ) {
					return null;
				}

				return {
					label,
					value,
				};
			} )
			.filter( Boolean );

		if ( normalizedOptions.length > 0 ) {
			normalized[ key ] = normalizedOptions;
		}
	}

	return normalized;
};

const toThemeOptionSets = ( themeJson ) => {
	const framework = themeJson?.settings?.custom?.framework;

	if ( ! framework || typeof framework !== 'object' ) {
		return {};
	}

	return normalizeFrameworkOptionSets( framework.optionSets );
};

const toThemeOverride = ( themeJson ) => {
	const framework = themeJson?.settings?.custom?.framework;
	const spacingScaleFromPresets = toSpacingScaleFromPresets(
		themeJson?.settings?.spacing?.spacingSizes
	);
	const spacingScaleFromScale = toSpacingScaleFromScale(
		themeJson?.settings?.spacing?.spacingScale
	);

	const frameworkSpacingScale =
		framework &&
		typeof framework === 'object' &&
		framework.spacingScale &&
		typeof framework.spacingScale === 'object'
			? framework.spacingScale
			: null;

	const spacingScale =
		spacingScaleFromPresets.scale ||
		spacingScaleFromScale.scale ||
		frameworkSpacingScale;
	const spacingScaleMeta = spacingScaleFromPresets.scale
		? spacingScaleFromPresets.meta
		: spacingScaleFromScale.scale
			? spacingScaleFromScale.meta
			: {};

	if ( ! framework || typeof framework !== 'object' ) {
		return {
			spacingScale,
			spacingScaleMeta,
		};
	}

	return {
		gridBreakpoints: framework.breakpoints,
		containerMaxWidths: framework.containerMaxWidths,
		spacingScale,
		spacingScaleMeta,
		halfGap: framework.halfGap,
		containerPaddingX: framework.containerPaddingX,
	};
};

const REPLACE_MAP_KEYS = new Set( [
	'gridBreakpoints',
	'containerMaxWidths',
	'spacingScale',
	'spacingScaleMeta',
] );

const mergeTokenMaps = ( base = {}, override = {} ) => {
	const merged = { ...base };
	for ( const [ key, value ] of Object.entries( override || {} ) ) {
		if ( value === null || value === undefined || value === '' ) {
			continue;
		}
		if (
			REPLACE_MAP_KEYS.has( key ) &&
			typeof value === 'object' &&
			! Array.isArray( value )
		) {
			merged[ key ] = { ...value };
			continue;
		}
		if (
			typeof value === 'object' &&
			! Array.isArray( value ) &&
			typeof base[ key ] === 'object' &&
			base[ key ] !== null
		) {
			merged[ key ] = { ...base[ key ], ...value };
			continue;
		}
		merged[ key ] = value;
	}
	return merged;
};

const formatKey = ( key ) => {
	if ( /^\d+$/.test( key ) ) {
		return key;
	}
	if ( /^[a-zA-Z_-][a-zA-Z0-9_-]*$/.test( key ) ) {
		return key;
	}
	return `"${ key }"`;
};

const toSassValue = ( value ) => {
	if ( value === null || value === undefined ) {
		return 'null';
	}
	if ( typeof value === 'number' || typeof value === 'boolean' ) {
		return String( value );
	}
	if ( Array.isArray( value ) ) {
		return `( ${ value.map( toSassValue ).join( ', ' ) } )`;
	}
	if ( typeof value === 'object' ) {
		return toSassMap( value );
	}
	return String( value );
};

const toSassMap = ( obj ) => {
	const entries = Object.entries( obj || {} ).map(
		( [ key, value ] ) => `${ formatKey( key ) }: ${ toSassValue( value ) }`
	);
	return `( ${ entries.join( ', ' ) } )`;
};

const defaultTokens = readJson( defaultTokensPath );
if ( ! defaultTokens ) {
	throw new Error(
		`[tokens] Missing or invalid default token source: ${ defaultTokensPath }`
	);
}

let themeSource = 'none';
let themeOverride = {};
let themeOptionSets = {};

if ( explicitThemeJsonPath ) {
	const explicitTheme = readJson( explicitThemeJsonPath );
	if ( ! explicitTheme ) {
		throw new Error(
			`[tokens] Explicit theme source could not be read: ${ explicitThemeJsonPath }`
		);
	}

	themeSource = explicitThemeJsonPath;
	themeOverride = toThemeOverride( explicitTheme );
	themeOptionSets = toThemeOptionSets( explicitTheme );
} else {
	const localTheme = readJson( defaultThemeJsonPath );
	if ( localTheme ) {
		themeSource = defaultThemeJsonPath;
		themeOverride = toThemeOverride( localTheme );
		themeOptionSets = toThemeOptionSets( localTheme );
	}
}

if ( requireThemeSource && themeSource === 'none' ) {
	throw new Error(
		'[tokens] Theme source is required but none was resolved. Provide --theme-json-path or FS_THEME_JSON_PATH.'
	);
}

const mergedTokens = mergeTokenMaps( defaultTokens, themeOverride );
const spacingScaleMeta = mergedTokens.spacingScaleMeta || {};

const spacingScaleEntries = Object.entries( mergedTokens.spacingScale || {} )
	.map( ( [ slug, size ] ) => [ String( slug ), size ] )
	.filter(
		( [ slug, size ] ) =>
			slug && size !== null && size !== undefined && String( size ) !== ''
	);

const spacingScaleKeys = spacingScaleEntries.map( ( [ slug ] ) => slug );

if ( spacingScaleKeys.length === 0 ) {
	throw new Error(
		'[tokens] spacingScale must contain at least one key/value pair.'
	);
}

const getSpacingScaleLabel = ( slug ) => {
	const meta = spacingScaleMeta[ slug ];
	if ( meta && typeof meta === 'object' && meta.name ) {
		return `${ meta.name } (${ slug })`;
	}
	return String( slug );
};

const spacingScaleOptions = spacingScaleKeys.map( ( slug ) => ( {
	slug,
	label: getSpacingScaleLabel( slug ),
	size: String( mergedTokens.spacingScale?.[ slug ] ?? '' ),
} ) );

const isZeroSpacingSlug = ( slug ) => String( slug ).trim() === '0';

const breakpointKeys = Object.keys( mergedTokens.gridBreakpoints || {} );
const responsiveBreakpointKeys = breakpointKeys.filter( ( key ) => key !== 'xs' );

const spacingSides = [
	{ key: '', label: 'All' },
	{ key: 't', label: 'Top' },
	{ key: 'b', label: 'Bottom' },
	{ key: 's', label: 'Start' },
	{ key: 'e', label: 'End' },
	{ key: 'x', label: 'Horizontal' },
	{ key: 'y', label: 'Vertical' },
];

const getBreakpointLabelSuffix = ( breakpoint ) =>
	breakpoint ? ` (${ breakpoint.toUpperCase() })` : '';

const generatePaddingOptions = () => {
	const options = [];
	const allBreakpoints = [ '', ...responsiveBreakpointKeys ];

	for ( const breakpoint of allBreakpoints ) {
		const breakpointSuffix = breakpoint ? `-${ breakpoint }` : '';
		const breakpointLabel = getBreakpointLabelSuffix( breakpoint );
		for ( const side of spacingSides ) {
			for ( const size of spacingScaleKeys ) {
				options.push( {
					label: `Padding ${ side.label }${ breakpointLabel } ${ getSpacingScaleLabel(
						size
					) }`,
					value: `p${ side.key }${ breakpointSuffix }-${ size }`,
				} );
			}
		}
	}

	return options;
};

const generateMarginOptions = () => {
	const options = [];
	const allBreakpoints = [ '', ...responsiveBreakpointKeys ];

	for ( const breakpoint of allBreakpoints ) {
		const breakpointSuffix = breakpoint ? `-${ breakpoint }` : '';
		const breakpointLabel = getBreakpointLabelSuffix( breakpoint );
		for ( const side of spacingSides ) {
			for ( const size of spacingScaleKeys ) {
				options.push( {
					label: `Margin ${ side.label }${ breakpointLabel } ${ getSpacingScaleLabel(
						size
					) }`,
					value: `m${ side.key }${ breakpointSuffix }-${ size }`,
				} );
				if ( ! isZeroSpacingSlug( size ) ) {
					options.push( {
						label: `Negative Margin ${ side.label }${ breakpointLabel } ${ getSpacingScaleLabel(
							size
						) }`,
						value: `m${ side.key }${ breakpointSuffix }-n${ size }`,
					} );
				}
			}
			options.push( {
				label: `Margin ${ side.label }${ breakpointLabel } Auto`,
				value: `m${ side.key }${ breakpointSuffix }-auto`,
			} );
		}
	}

	return options;
};

const generateGapOptions = () => {
	const options = [];
	const allBreakpoints = [ '', ...responsiveBreakpointKeys ];
	const gapTypes = [
		{ key: 'gap', label: 'Gap' },
		{ key: 'row-gap', label: 'Row Gap' },
		{ key: 'column-gap', label: 'Column Gap' },
	];

	for ( const breakpoint of allBreakpoints ) {
		const breakpointSuffix = breakpoint ? `-${ breakpoint }` : '';
		const breakpointLabel = getBreakpointLabelSuffix( breakpoint );
		for ( const type of gapTypes ) {
			for ( const size of spacingScaleKeys ) {
				options.push( {
					label: `${ type.label }${ breakpointLabel } ${ getSpacingScaleLabel(
						size
					) }`,
					value: `${ type.key }${ breakpointSuffix }-${ size }`,
				} );
			}
		}
	}

	return options;
};

const lines = [
	'// AUTO-GENERATED by scripts/generate-style-tokens.mjs. DO NOT EDIT.',
	`// theme source: ${ themeSource }`,
	'',
	`$framework-grid-breakpoints: ${ toSassMap( mergedTokens.gridBreakpoints ) } !default;`,
	`$framework-container-max-widths: ${ toSassMap( mergedTokens.containerMaxWidths ) } !default;`,
	`$framework-spacing-scale: ${ toSassMap( mergedTokens.spacingScale ) } !default;`,
	`$framework-half-gap: ${ toSassValue( mergedTokens.halfGap ) } !default;`,
	`$framework-container-padding-x: ${ toSassValue( mergedTokens.containerPaddingX ) } !default;`,
	'',
];

const jsTokenLines = [
	'// AUTO-GENERATED by scripts/generate-style-tokens.mjs. DO NOT EDIT.',
	`// theme source: ${ themeSource }`,
	`export const frameworkTokens = ${ JSON.stringify( mergedTokens, null, '\t' ) };`,
	`export const frameworkSpacingScaleKeys = ${ JSON.stringify( spacingScaleKeys ) };`,
	`export const frameworkSpacingScaleOptions = ${ JSON.stringify(
		spacingScaleOptions,
		null,
		'\t'
	) };`,
	`export const frameworkBreakpointKeys = ${ JSON.stringify( breakpointKeys ) };`,
`	export const frameworkOptionSets = ${ JSON.stringify( themeOptionSets, null, '\t' ) };`,
	'',
];

const generatedOptionsLines = [
	'// AUTO-GENERATED by scripts/generate-style-tokens.mjs. DO NOT EDIT.',
	`// theme source: ${ themeSource }`,
	`export const paddingOptions = ${ JSON.stringify( generatePaddingOptions(), null, '\t' ) };`,
	`export const marginOptions = ${ JSON.stringify( generateMarginOptions(), null, '\t' ) };`,
	`export const gapOptions = ${ JSON.stringify( generateGapOptions(), null, '\t' ) };`,
	'',
];

fs.mkdirSync( path.dirname( scssOutPath ), { recursive: true } );
fs.writeFileSync( scssOutPath, lines.join( '\n' ), 'utf8' );

fs.mkdirSync( path.dirname( jsTokensOutPath ), { recursive: true } );
fs.writeFileSync( jsTokensOutPath, jsTokenLines.join( '\n' ), 'utf8' );

fs.mkdirSync( path.dirname( generatedOptionsOutPath ), { recursive: true } );
fs.writeFileSync(
	generatedOptionsOutPath,
	generatedOptionsLines.join( '\n' ),
	'utf8'
);

console.log( `[tokens] Generated ${ scssOutPath }` );
console.log( `[tokens] Generated ${ jsTokensOutPath }` );
console.log( `[tokens] Generated ${ generatedOptionsOutPath }` );





