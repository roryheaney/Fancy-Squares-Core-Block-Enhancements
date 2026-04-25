import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const failures = [];

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

const manifestPath = 'data/class-families.json';
const baselinePath = 'data/class-family-baseline.snapshot.json';
const assetsPath = 'inc/assets.php';
const assetsMatcherPaths = [ assetsPath, 'inc/assets-token-detection.php' ];

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

const valueRegex = /value\s*:\s*['\"]([^'\"]+)['\"]/g;

const tokenSourceMap = new Map();
const ALLOWED_RUNTIME_MATCHERS = new Set( [
	'fs_core_enhancements_is_utility_token',
	'fs_core_enhancements_is_frontend_style_token',
] );
const bundleAliasMap = {
	utilities: 'utilities',
	frontend: 'frontend',
	'frontend-styles': 'frontend',
};

const readJson = ( relPath, label ) => {
	const absPath = path.resolve( root, relPath );
	if ( ! fs.existsSync( absPath ) ) {
		failures.push( {
			token: relPath,
			type: `missing-${ label }-file`,
			sources: [ relPath ],
		} );
		return null;
	}

	try {
		const parsed = JSON.parse( fs.readFileSync( absPath, 'utf8' ) );
		if ( ! parsed || typeof parsed !== 'object' ) {
			throw new Error( `${ label } root value must be an object` );
		}
		return parsed;
	} catch ( error ) {
		failures.push( {
			token: relPath,
			type: `invalid-${ label }-json`,
			sources: [ String( error?.message || error ) ],
		} );
		return null;
	}
};

const manifest = readJson( manifestPath, 'manifest' );
const baseline = readJson( baselinePath, 'baseline' );

const familyMatchers = [];
const runtimeFunctionsPresent = new Set();

if ( manifest ) {
	const families = Array.isArray( manifest.families ) ? manifest.families : [];
	if ( families.length === 0 ) {
		failures.push( {
			token: manifestPath,
			type: 'manifest-empty-families',
			sources: [ manifestPath ],
		} );
	}

	for ( const family of families ) {
		if ( ! family || typeof family !== 'object' ) {
			failures.push( {
				token: manifestPath,
				type: 'manifest-family-invalid',
				sources: [ 'non-object family entry' ],
			} );
			continue;
		}

		const key = String( family.key || '' ).trim();
		const runtimeMatcherFunction = String(
			family.runtimeMatcherFunction || ''
		).trim();
		const tokenPattern = String( family.tokenPattern || '' ).trim();
		const rawBundle = String( family.bundle || '' ).trim();
		const bundle = bundleAliasMap[ rawBundle ] || null;

		if ( ! key || ! runtimeMatcherFunction || ! tokenPattern || ! bundle ) {
			failures.push( {
				token: key || '(missing-key)',
				type: 'manifest-family-missing-fields',
				sources: [ manifestPath ],
			} );
			continue;
		}

		if ( ! ALLOWED_RUNTIME_MATCHERS.has( runtimeMatcherFunction ) ) {
			failures.push( {
				token: key,
				type: 'manifest-family-unknown-runtime-matcher',
				sources: [ runtimeMatcherFunction ],
			} );
			continue;
		}

		let regex = null;
		try {
			regex = new RegExp( tokenPattern );
		} catch ( error ) {
			failures.push( {
				token: key,
				type: 'manifest-family-invalid-regex',
				sources: [ String( error?.message || error ) ],
			} );
			continue;
		}

		runtimeFunctionsPresent.add( runtimeMatcherFunction );
		familyMatchers.push( {
			key,
			bundle,
			runtimeMatcherFunction,
			regex,
		} );
	}

	for ( const requiredMatcher of ALLOWED_RUNTIME_MATCHERS ) {
		if ( ! runtimeFunctionsPresent.has( requiredMatcher ) ) {
			failures.push( {
				token: requiredMatcher,
				type: 'manifest-runtime-matcher-missing-family',
				sources: [ manifestPath ],
			} );
		}
	}
}

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

const getExpectedBundle = ( token ) => {
	const matchedBundles = new Set();

	for ( const matcher of familyMatchers ) {
		if ( matcher.regex.test( token ) ) {
			matchedBundles.add( matcher.bundle );
		}
	}

	if ( matchedBundles.size === 0 ) {
		return null;
	}

	if ( matchedBundles.size > 1 ) {
		return 'ambiguous';
	}

	return [ ...matchedBundles ][0];
};

if ( baseline ) {
	const fixtures = Array.isArray( baseline.fixtures ) ? baseline.fixtures : [];
	if ( fixtures.length === 0 ) {
		failures.push( {
			token: baselinePath,
			type: 'baseline-empty-fixtures',
			sources: [ baselinePath ],
		} );
	}

	if ( baseline.defaultUtilitiesMode !== 'both' ) {
		failures.push( {
			token: 'defaultUtilitiesMode',
			type: 'baseline-utilities-mode-mismatch',
			sources: [ `expected both, received ${ baseline.defaultUtilitiesMode }` ],
		} );
	}

	for ( const fixture of fixtures ) {
		const token = String( fixture?.token || '' ).trim();
		const expectedBundle = bundleAliasMap[ fixture?.expectedBundle ] || null;
		const actualBundle = getExpectedBundle( token );
		if ( actualBundle !== expectedBundle ) {
			failures.push( {
				token,
				type: 'baseline-parity-mismatch',
				sources: [ `expected=${ expectedBundle } actual=${ actualBundle }` ],
			} );
		}
	}
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

const existingAssetsMatcherPaths = assetsMatcherPaths.filter( ( relPath ) =>
	fs.existsSync( path.resolve( root, relPath ) )
);

if ( existingAssetsMatcherPaths.length === 0 ) {
	failures.push( {
		token: assetsPath,
		type: 'missing-assets-file',
		sources: [ assetsMatcherPaths.join( ', ' ) ],
	} );
} else {
	const assetsContent = existingAssetsMatcherPaths
		.map( ( relPath ) =>
			fs.readFileSync( path.resolve( root, relPath ), 'utf8' )
		)
		.join( '\n' );
	const requiredMarkers = [
		'function fs_core_enhancements_get_matcher_patterns',
		'function fs_core_enhancements_match_manifest_token',
	];

	for ( const marker of requiredMarkers ) {
		if ( ! assetsContent.includes( marker ) ) {
			failures.push( {
				token: marker,
				type: 'missing-assets-matcher-adapter',
				sources: [ existingAssetsMatcherPaths.join( ', ' ) ],
			} );
		}
	}

	for ( const runtimeMatcher of runtimeFunctionsPresent ) {
		if ( ! assetsContent.includes( runtimeMatcher ) ) {
			failures.push( {
				token: runtimeMatcher,
				type: 'missing-assets-runtime-matcher-reference',
				sources: [ existingAssetsMatcherPaths.join( ', ' ) ],
			} );
		}
	}
}

for ( const [ token, sourceSet ] of tokenSourceMap.entries() ) {
	const expectedBundle = getExpectedBundle( token );
	const sources = [ ...sourceSet ];

	if ( 'ambiguous' === expectedBundle ) {
		failures.push( {
			token,
			type: 'ambiguous-token-family',
			sources,
		} );
		continue;
	}

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
		} else if ( failure.type === 'missing-assets-matcher-adapter' ) {
			console.error(
				` - ${ failure.token }: missing matcher adapter in ${ failure.sources[0] }`
			);
		} else if ( failure.type === 'missing-assets-file' ) {
			console.error(
				` - ${ failure.token }: required file missing (cannot verify runtime matcher sync) (${ failure.sources[0] })`
			);
		} else if ( failure.type === 'missing-assets-runtime-matcher-reference' ) {
			console.error(
				` - ${ failure.token }: runtime matcher not referenced in ${ failure.sources[0] }`
			);
		} else if ( failure.type === 'baseline-parity-mismatch' ) {
			console.error(
				` - ${ failure.token }: baseline parity mismatch (${ sourceList })`
			);
		} else if ( failure.type === 'ambiguous-token-family' ) {
			console.error(
				` - ${ failure.token }: token matches multiple family bundles (sources: ${ sourceList })`
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
	`[coverage] OK: ${ tokenSourceMap.size } token(s) validated with manifest-backed family routing.`
);
