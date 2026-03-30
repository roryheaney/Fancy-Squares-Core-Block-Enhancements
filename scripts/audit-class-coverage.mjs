import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const tokenSourceFiles = [
	'data/bootstrap-classes/display-options.js',
	'data/bootstrap-classes/generated-spacing-options.js',
	'data/bootstrap-classes/position-options.js',
	'data/bootstrap-classes/zindex-options.js',
	'data/bootstrap-classes/blend-mode-options.js',
	'data/bootstrap-classes/align-items-options.js',
	'data/bootstrap-classes/self-alignment-options.js',
	'data/bootstrap-classes/justify-content-options.js',
	'data/bootstrap-classes/order-options.js',
	'data/bootstrap-classes/bleed-cover-options.js',
	'data/bootstrap-classes/classes.js',
	'src/config/framework-option-sets.js',
];

const cssBundles = {
	utilities: 'build/utilities.css',
	frontend: 'build/frontend-styles.css',
};

const syntheticTokenFamilies = [
	{
		token: 'wp-block-column--column-6',
		source: 'synthetic/width-controls',
	},
	{
		token: 'wp-block-column--column-md-4',
		source: 'synthetic/width-controls',
	},
	{
		token: 'wp-block-columns--constrained',
		source: 'synthetic/constrain-toggle',
	},
	{
		token: 'is-style-bootstrap',
		source: 'synthetic/columns-parent-style',
	},
	{
		token: 'cover-negative-margin-left',
		source: 'synthetic/cover-bleed',
	},
	{
		token: 'cover-negative-margin-right',
		source: 'synthetic/cover-bleed',
	},
];

const enqueueRouteChecks = [
	{
		name: 'utilities-family-detector',
		snippet: 'mix-blend-[a-z-]+',
	},
	{
		name: 'column-width-detector',
		snippet: 'wp-block-column--column(?:-[a-z0-9-]+)?',
	},
	{
		name: 'cover-bleed-detector',
		snippet: 'cover-negative-margin-(?:left|right)',
	},
	{
		name: 'columns-constrain-detector',
		snippet: '(?:is-style-bootstrap|wp-block-columns--constrained)',
	},
	{
		name: 'alert-family-detector',
		snippet: 'alert-[a-z0-9-]+',
	},
	{
		name: 'border-family-detector',
		snippet: 'border-(?:0|[1-5]|(?:top|end|bottom|start)',
	},
	{
		name: 'rounded-family-detector',
		snippet: 'rounded-(?:circle|pill|top|end|bottom|start',
	},
];

const utilitiesTokenRegex = /^(?:[mp][trbsexy]?-(?:[a-z0-9]+-)?(?:n)?[a-z0-9][a-z0-9-]*|[mp][trbsexy]?-(?:[a-z0-9]+-)?auto|(?:row-|column-)?gap(?:-[a-z0-9]+)?-[a-z0-9][a-z0-9-]*|d(?:-[a-z0-9]+)?-[a-z-]+|justify-content(?:-[a-z0-9]+)?-[a-z-]+|align-(?:items|self)(?:-[a-z0-9]+)?-[a-z-]+|order(?:-[a-z0-9]+)?-(?:[0-9]+|first|last)|position-[a-z]+|(?:top|bottom|start|end)-(?:0|50|100)|translate-middle(?:-x|-y)?|z-(?:n1|0|1|2|3)|mix-blend-[a-z-]+)$/;

const frontendTokenPatterns = [
	/^wp-block-column--column(?:-[a-z0-9-]+)?$/,
	/^cover-negative-margin-(?:left|right)$/,
	/^(?:is-style-bootstrap|wp-block-columns--constrained)$/,
	/^alert-[a-z0-9-]+$/,
	/^border-(?:0|[1-5]|(?:top|end|bottom|start)(?:-(?:0|[1-5]))?|(?:primary|secondary|success|danger|warning|info|light|dark|white))$/,
	/^rounded-(?:circle|pill|top|end|bottom|start|[0-5]|(?:top|end|bottom|start)-[0-5])$/,
];

const valueRegex = /value\s*:\s*['\"]([^'\"]+)['\"]/g;

const tokenSourceMap = new Map();

const addTokenSource = ( token, source ) => {
	const cleanedToken = String( token || '' ).trim();
	if ( ! cleanedToken ) {
		return;
	}

	if ( ! tokenSourceMap.has( cleanedToken ) ) {
		tokenSourceMap.set( cleanedToken, new Set() );
	}

	tokenSourceMap.get( cleanedToken ).add( source );
};

for ( const relPath of tokenSourceFiles ) {
	const absPath = path.resolve( root, relPath );
	if ( ! fs.existsSync( absPath ) ) {
		continue;
	}

	const content = fs.readFileSync( absPath, 'utf8' );
	let match;

	while ( ( match = valueRegex.exec( content ) ) ) {
		const rawValue = match[1]?.trim() || '';
		if ( ! rawValue ) {
			continue;
		}

		for ( const token of rawValue.split( /\s+/ ) ) {
			if ( ! token || token === 'none' ) {
				continue;
			}

			addTokenSource( token, relPath );
		}
	}
}

for ( const familyToken of syntheticTokenFamilies ) {
	addTokenSource( familyToken.token, familyToken.source );
}

const cssContent = {};
for ( const [ bundle, relPath ] of Object.entries( cssBundles ) ) {
	const absPath = path.resolve( root, relPath );
	if ( ! fs.existsSync( absPath ) ) {
		console.error(
			`[coverage] Missing required CSS bundle: ${ relPath }. Run npm run build first.`
		);
		process.exit( 1 );
	}
	cssContent[ bundle ] = fs.readFileSync( absPath, 'utf8' );
}

const escapeRegex = ( value ) =>
	value.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' );

const tokenInCss = ( token, css ) =>
	new RegExp( `\\.${ escapeRegex( token ) }(?=[\\s\\{,:>\\.\\[#])` ).test(
		css
	);

const getExpectedBundle = ( token ) => {
	if ( utilitiesTokenRegex.test( token ) ) {
		return 'utilities';
	}

	for ( const pattern of frontendTokenPatterns ) {
		if ( pattern.test( token ) ) {
			return 'frontend';
		}
	}

	return null;
};

const failures = [];

const assetsPath = path.resolve( root, 'inc/assets.php' );
if ( ! fs.existsSync( assetsPath ) ) {
	failures.push( {
		token: 'inc/assets.php',
		type: 'missing-enqueue-route-file',
		sources: [ 'enqueue-route-check' ],
	} );
} else {
	const assetsContent = fs.readFileSync( assetsPath, 'utf8' );
	for ( const routeCheck of enqueueRouteChecks ) {
		if ( ! assetsContent.includes( routeCheck.snippet ) ) {
			failures.push( {
				token: routeCheck.name,
				type: 'missing-enqueue-route',
				sources: [ 'inc/assets.php' ],
			} );
		}
	}
}

for ( const [ token, sourceSet ] of tokenSourceMap.entries() ) {
	const expectedBundle = getExpectedBundle( token );
	const sources = [ ...sourceSet ];

	if ( ! expectedBundle ) {
		failures.push( {
			token,
			type: 'unsupported-token-family',
			sources,
		} );
		continue;
	}

	const hasCssSelector = tokenInCss( token, cssContent[ expectedBundle ] );
	if ( ! hasCssSelector ) {
		failures.push( {
			token,
			type: 'missing-css-emitter',
			expectedBundle,
			sources,
		} );
	}
}

if ( failures.length > 0 ) {
	console.error(
		`[coverage] Failed: ${ failures.length } token(s) are unsupported or missing CSS coverage.`
	);

	for ( const failure of failures.slice( 0, 80 ) ) {
		const sourceList = failure.sources.join( ', ' );
		if ( failure.type === 'missing-css-emitter' ) {
			console.error(
				` - ${ failure.token }: expected selector in ${ cssBundles[ failure.expectedBundle ] } (sources: ${ sourceList })`
			);
		} else if ( failure.type === 'missing-enqueue-route' ) {
			console.error(
				` - ${ failure.token }: missing enqueue-family detector in inc/assets.php`
			);
		} else if ( failure.type === 'missing-enqueue-route-file' ) {
			console.error(
				` - ${ failure.token }: required file missing (cannot verify enqueue routes)`
			);
		} else {
			console.error(
				` - ${ failure.token }: unsupported token family (sources: ${ sourceList })`
			);
		}
	}

	if ( failures.length > 80 ) {
		console.error(
			`[coverage] ... ${ failures.length - 80 } more failure(s) not shown.`
		);
	}

	process.exit( 1 );
}

console.log(
	`[coverage] OK: ${ tokenSourceMap.size } token(s) validated across selectable class sources.`
);