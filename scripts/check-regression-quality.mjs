import fs from 'node:fs';
import path from 'node:path';

import { runFirstPaintParityChecks } from './lib/regression-first-paint-checks.mjs';
import { runPerformanceGuardChecks } from './lib/regression-performance-guard-checks.mjs';
import { runSourceChecks } from './lib/regression-quality-source-checks.mjs';

const root = process.cwd();
const failures = [];
const warnings = [];

const SOURCE_EXTENSIONS = new Set( [ '.js', '.jsx', '.php', '.scss', '.mjs' ] );
const EXCLUDED_TOP_LEVEL_DIRS = new Set( [
	'node_modules',
	'build',
	'.git',
	'.kilo',
] );
const EXCLUDED_PATH_PREFIXES = [
	'docs/',
	'src/config/generated/',
	'src/styles/generated/',
];
const EXCLUDED_FILES = new Set( [
	'data/bootstrap-classes/generated-spacing-options.js',
] );

const addFailure = ( message ) => failures.push( message );
const addWarning = ( message ) => warnings.push( message );

const normalizePath = ( value ) =>
	String( value || '' )
		.replace( /\\/g, '/' )
		.replace( /^\.\//, '' )
		.trim();

const isExcludedPath = ( relPath ) => {
	const normalized = normalizePath( relPath );
	if ( ! normalized || normalized.startsWith( '..' ) ) {
		return true;
	}

	const topLevel = normalized.split( '/' )[0];
	if ( EXCLUDED_TOP_LEVEL_DIRS.has( topLevel ) ) {
		return true;
	}

	if ( EXCLUDED_FILES.has( normalized ) ) {
		return true;
	}

	for ( const prefix of EXCLUDED_PATH_PREFIXES ) {
		const cleanPrefix = prefix.endsWith( '/' )
			? prefix.slice( 0, -1 )
			: prefix;
		if ( normalized === cleanPrefix || normalized.startsWith( prefix ) ) {
			return true;
		}
	}

	return false;
};

const isCodeFilePath = ( relPath ) => {
	const normalized = normalizePath( relPath );
	if ( isExcludedPath( normalized ) ) {
		return false;
	}

	const ext = path.extname( normalized ).toLowerCase();
	if ( ! SOURCE_EXTENSIONS.has( ext ) ) {
		return false;
	}

	return true;
};

const parseArgs = ( argv ) => {
	const options = {
		coreOnly: false,
		paths: null,
	};

	for ( let i = 0; i < argv.length; i++ ) {
		const arg = argv[ i ];
		if ( '--core-only' === arg ) {
			options.coreOnly = true;
			continue;
		}

		if ( arg.startsWith( '--paths=' ) ) {
			options.paths = arg.slice( '--paths='.length );
			continue;
		}

		if ( '--paths' === arg ) {
			options.paths = argv[ i + 1 ] || '';
			i++;
		}
	}

	return options;
};

const readJson = ( relPath ) => {
	const absPath = path.resolve( root, relPath );
	if ( ! fs.existsSync( absPath ) ) {
		addFailure( `${ relPath }: file missing` );
		return null;
	}

	try {
		const parsed = JSON.parse( fs.readFileSync( absPath, 'utf8' ) );
		if ( ! parsed || typeof parsed !== 'object' ) {
			addFailure( `${ relPath }: root value must be an object` );
			return null;
		}
		return parsed;
	} catch ( error ) {
		addFailure(
			`${ relPath }: invalid JSON (${ String( error?.message || error ) })`
		);
		return null;
	}
};

const resolveProvidedPaths = ( pathsValue ) => {
	const selected = new Set();
	const parts = String( pathsValue || '' )
		.split( ',' )
		.map( ( part ) => part.trim() )
		.filter( Boolean );

	const appendFromPath = ( absPath ) => {
		if ( ! fs.existsSync( absPath ) ) {
			return;
		}

		const stat = fs.statSync( absPath );
		if ( stat.isDirectory() ) {
			for ( const entry of fs.readdirSync( absPath, { withFileTypes: true } ) ) {
				appendFromPath( path.join( absPath, entry.name ) );
			}
			return;
		}

		const relPath = normalizePath( path.relative( root, absPath ) );
		if ( ! relPath || relPath.startsWith( '..' ) ) {
			return;
		}

		if ( ! isCodeFilePath( relPath ) ) {
			return;
		}

		selected.add( relPath );
	};

	for ( const part of parts ) {
		const absPath = path.isAbsolute( part )
			? part
			: path.resolve( root, part );
		appendFromPath( absPath );
	}

	return [ ...selected ];
};

const getAllSourceFiles = () => {
	const selected = [];
	const walk = ( absPath ) => {
		if ( ! fs.existsSync( absPath ) ) {
			return;
		}

		const stat = fs.statSync( absPath );
		const relPath = normalizePath( path.relative( root, absPath ) );
		if ( relPath && isExcludedPath( relPath ) ) {
			return;
		}

		if ( stat.isDirectory() ) {
			for ( const entry of fs.readdirSync( absPath, { withFileTypes: true } ) ) {
				walk( path.join( absPath, entry.name ) );
			}
			return;
		}

		if ( isCodeFilePath( relPath ) ) {
			selected.push( relPath );
		}
	};

	walk( root );

	if ( selected.length === 0 ) {
		addFailure(
			'No plugin code files found for regression-quality checks (after exclusions).'
		);
	}

	return selected.sort();
};

const runCoreChecks = () => {
	runFirstPaintParityChecks( { root, addFailure } );
	runPerformanceGuardChecks( { root, addFailure } );

	const accordionItemEditPath =
		'src/blocks/accordion-item-interactive/edit.js';
	const accordionItemEditAbsPath = path.resolve(
		root,
		accordionItemEditPath
	);
	if ( ! fs.existsSync( accordionItemEditAbsPath ) ) {
		addFailure( `${ accordionItemEditPath }: file missing` );
	} else {
		const accordionItemEditContent = fs.readFileSync(
			accordionItemEditAbsPath,
			'utf8'
		);
		const keydownHandlerMatch = accordionItemEditContent.match(
			/const\s+handleTriggerKeyDown\s*=\s*\(\s*event\s*\)\s*=>\s*\{([\s\S]*?)^\s*\};/m
		);

		if ( ! keydownHandlerMatch ) {
			addFailure(
				`${ accordionItemEditPath }: handleTriggerKeyDown handler missing`
			);
		} else {
			const handlerBody = keydownHandlerMatch[1];
			const richTextSpacePredicateMatch = accordionItemEditContent.match(
				/const\s+isRichTextTitleSpaceKeyDown\s*=\s*\(\s*event\s*\)\s*=>\s*event\.key\s*===\s*' '\s*&&\s*event\.target\.closest\(\s*'\.block-editor-rich-text__editable'\s*\)\s*;/
			);
			const richTextSpaceGuardMatch = handlerBody.match(
				/if\s*\(\s*isRichTextTitleSpaceKeyDown\(\s*event\s*\)\s*\)\s*\{\s*return;\s*\}/
			);
			const triggerSpaceHandlerIndex = handlerBody.indexOf(
				"event.key === 'Enter' || event.key === ' '"
			);

			if (
				! richTextSpacePredicateMatch ||
				! richTextSpaceGuardMatch ||
				triggerSpaceHandlerIndex < 0 ||
				richTextSpaceGuardMatch.index > triggerSpaceHandlerIndex
			) {
				addFailure(
					`${ accordionItemEditPath }: handleTriggerKeyDown must return before handling Space from the RichText title editor`
				);
			}
		}
	}

	const manifest = readJson( 'data/class-families.json' );
	if ( manifest ) {
		const families = Array.isArray( manifest.families ) ? manifest.families : [];
		const keyCounts = new Map();
		const patternCounts = new Map();

		for ( const family of families ) {
			const key = String( family?.key || '' ).trim();
			const pattern = String( family?.tokenPattern || '' ).trim();
			const bundle = String( family?.bundle || '' ).trim();
			const matcher = String( family?.runtimeMatcherFunction || '' ).trim();

			if ( key ) {
				keyCounts.set( key, ( keyCounts.get( key ) || 0 ) + 1 );
			}

			if ( pattern ) {
				patternCounts.set( pattern, ( patternCounts.get( pattern ) || 0 ) + 1 );
			}

			if (
				'utilities' === bundle &&
				'fs_core_enhancements_is_utility_token' !== matcher
			) {
				addFailure(
					`data/class-families.json: ${ key } bundle/matcher mismatch (utilities)`
				);
			}

			if (
				'frontend-styles' === bundle &&
				'fs_core_enhancements_is_frontend_style_token' !== matcher
			) {
				addFailure(
					`data/class-families.json: ${ key } bundle/matcher mismatch (frontend-styles)`
				);
			}
		}

		for ( const [ key, count ] of keyCounts.entries() ) {
			if ( count > 1 ) {
				addFailure(
					`data/class-families.json: duplicate key "${ key }" (${ count })`
				);
			}
		}

		for ( const [ pattern, count ] of patternCounts.entries() ) {
			if ( count > 1 ) {
				addFailure(
					`data/class-families.json: duplicate tokenPattern "${ pattern }" (${ count })`
				);
			}
		}
	}

	const assetsPath = path.resolve( root, 'inc/assets.php' );
	if ( ! fs.existsSync( assetsPath ) ) {
		addFailure( 'inc/assets.php: file missing' );
	} else {
		const assetsContent = fs.readFileSync( assetsPath, 'utf8' );
		const blockedSnippets = [
			'function fs_core_enhancements_get_matcher_fallback_patterns',
			'utilitiesTokenRegex',
			'frontendTokenPatterns',
		];

		for ( const snippet of blockedSnippets ) {
			if ( assetsContent.includes( snippet ) ) {
				addFailure(
					`inc/assets.php: legacy matcher duplication detected (${ snippet })`
				);
			}
		}
	}

	const readmePath = path.resolve( root, 'README.md' );
	if ( ! fs.existsSync( readmePath ) ) {
		addFailure( 'README.md: file missing' );
		return;
	}

	const readmeContent = fs.readFileSync( readmePath, 'utf8' );
	if ( ! readmeContent.includes( 'docs/plugin/release-notes.md' ) ) {
		addFailure(
			'README.md: missing release notes link (docs/plugin/release-notes.md)'
		);
	}

	if ( ! readmeContent.includes( 'docs/plugin/maintenance-regression-policy.md' ) ) {
		addFailure(
			'README.md: missing maintenance policy link (docs/plugin/maintenance-regression-policy.md)'
		);
	}
};

const options = parseArgs( process.argv.slice( 2 ) );
runCoreChecks();

if ( ! options.coreOnly ) {
	const selectedSourceFiles = options.paths
		? resolveProvidedPaths( options.paths )
		: getAllSourceFiles();
	const sourceLabel = options.paths ? 'selected' : 'plugin';
	runSourceChecks( {
		root,
		sourceFiles: selectedSourceFiles,
		sourceLabel,
		addFailure,
		addWarning,
	} );
}

if ( failures.length > 0 ) {
	console.error( '[regression-quality] RESULT: FAIL' );
	console.error( `[regression-quality] Failures: ${ failures.length }` );
	for ( const failure of failures.slice( 0, 60 ) ) {
		console.error( ` - ${ failure }` );
	}
	if ( failures.length > 60 ) {
		console.error(
			`[regression-quality] ... ${ failures.length - 60 } more failure(s) not shown.`
		);
	}
	if ( warnings.length > 0 ) {
		console.error( `[regression-quality] Warnings: ${ warnings.length }` );
		for ( const warning of warnings.slice( 0, 40 ) ) {
			console.error( ` - ${ warning }` );
		}
	}
	process.exit( 1 );
}

if ( warnings.length > 0 ) {
	console.log( '[regression-quality] RESULT: PASS_WITH_WARNINGS' );
	console.log( `[regression-quality] Warnings: ${ warnings.length }` );
	for ( const warning of warnings.slice( 0, 40 ) ) {
		console.log( ` - ${ warning }` );
	}
	process.exit( 0 );
}

if ( options.coreOnly ) {
	console.log( '[regression-quality] RESULT: PASS (core-only)' );
} else {
	console.log( '[regression-quality] RESULT: PASS' );
}
