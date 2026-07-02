import fs from 'node:fs';
import path from 'node:path';
import {
	buildSpacingOptions,
	toSassMap,
	toSassValue,
} from './lib/style-token-formatters.mjs';
import {
	toSpacingScaleFromPresets,
	toSpacingScaleFromScale,
} from './lib/style-token-spacing.mjs';

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

const SUPPORTED_FRAMEWORK_OPTION_SET_KEYS = new Set( [
	'bleedCoverOptions',
	'alertOptions',
	'borderOptions',
	'borderRadiusOptions',
] );

const normalizeFrameworkOptionSets = ( optionSets ) => {
	if ( ! optionSets || typeof optionSets !== 'object' ) {
		return {};
	}

	const normalized = {};

	for ( const [ key, options ] of Object.entries( optionSets ) ) {
		if ( ! SUPPORTED_FRAMEWORK_OPTION_SET_KEYS.has( key ) ) {
			continue;
		}

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

const spacingScaleOptions = spacingScaleKeys.map( ( slug ) => ( {
	slug,
	label:
		spacingScaleMeta?.[ slug ]?.name
			? `${ spacingScaleMeta[ slug ].name } (${ slug })`
			: String( slug ),
	size: String( mergedTokens.spacingScale?.[ slug ] ?? '' ),
} ) );

const breakpointKeys = Object.keys( mergedTokens.gridBreakpoints || {} );
const responsiveBreakpointKeys = breakpointKeys.filter( ( key ) => key !== 'xs' );
const spacingOptions = buildSpacingOptions( {
	spacingScaleKeys,
	spacingScaleMeta,
	responsiveBreakpointKeys,
} );

const lines = [
	'// AUTO-GENERATED by scripts/generate-style-tokens.mjs. DO NOT EDIT.',
	`// theme source: ${ themeSource }`,
	'',
	`$framework-grid-breakpoints: ${ toSassMap( mergedTokens.gridBreakpoints ) } !default;`,
	`$framework-container-max-widths: ${ toSassMap( mergedTokens.containerMaxWidths ) } !default;`,
	`$framework-spacing-scale: ${ toSassMap( mergedTokens.spacingScale ) } !default;`,
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
	`export const frameworkOptionSets = ${ JSON.stringify( themeOptionSets, null, '\t' ) };`,
	'',
];

const generatedOptionsLines = [
	'// AUTO-GENERATED by scripts/generate-style-tokens.mjs. DO NOT EDIT.',
	`// theme source: ${ themeSource }`,
	`export const paddingOptions = ${ JSON.stringify( spacingOptions.paddingOptions, null, '\t' ) };`,
	`export const marginOptions = ${ JSON.stringify( spacingOptions.marginOptions, null, '\t' ) };`,
	`export const gapOptions = ${ JSON.stringify( spacingOptions.gapOptions, null, '\t' ) };`,
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






