import fs from 'node:fs';
import path from 'node:path';

const DUPLICATE_WINDOW_LINES = 8;
const DUPLICATE_MIN_CHARS = 220;
const COMPLEXITY_FILE_LINE_WARN = 450;
const COMPLEXITY_FUNCTION_LINE_WARN = 220;

const normalizeCodeLine = ( line ) => {
	return String( line || '' )
		.replace( /\/\/.*$/g, '' )
		.replace( /^\s*#.*$/g, '' )
		.replace( /\s+/g, ' ' )
		.trim();
};

const stripBlockComments = ( fileContent ) => {
	const source = String( fileContent || '' );
	let result = '';
	let inBlockComment = false;

	for ( let index = 0; index < source.length; index++ ) {
		const char = source[ index ];
		const next = source[ index + 1 ];

		if ( ! inBlockComment && char === '/' && next === '*' ) {
			inBlockComment = true;
			index++;
			continue;
		}

		if ( inBlockComment && char === '*' && next === '/' ) {
			inBlockComment = false;
			index++;
			continue;
		}

		if ( ! inBlockComment ) {
			result += char;
			continue;
		}

		if ( char === '\n' || char === '\r' ) {
			result += char;
		}
	}

	return result;
};

const isLowSignalSnippet = ( snippetLines ) => {
	if ( snippetLines.length === 0 ) {
		return true;
	}

	const importExportPattern =
		/^(?:import|export|from\s+['"]|const\s+[A-Z0-9_]+\s*=)/;
	const lowSignalCount = snippetLines.filter( ( line ) =>
		importExportPattern.test( line )
	).length;
	return lowSignalCount === snippetLines.length;
};

const detectCrossFileDuplicates = ( root, sourceFiles ) => {
	const snippetEntries = new Map();

	for ( const relPath of sourceFiles ) {
		const fileContent = fs.readFileSync( path.resolve( root, relPath ), 'utf8' );
		const normalizedContent = stripBlockComments( fileContent );
		const rawLines = normalizedContent.split( /\r?\n/ );
		const normalizedRows = rawLines
			.map( ( line, index ) => ( {
				text: normalizeCodeLine( line ),
				line: index + 1,
			} ) )
			.filter( ( row ) => row.text );

		for (
			let i = 0;
			i <= normalizedRows.length - DUPLICATE_WINDOW_LINES;
			i++
		) {
			const slice = normalizedRows.slice( i, i + DUPLICATE_WINDOW_LINES );
			const snippetLines = slice.map( ( row ) => row.text );
			const snippetText = snippetLines.join( '\n' );
			if ( snippetText.length < DUPLICATE_MIN_CHARS ) {
				continue;
			}

			if ( isLowSignalSnippet( snippetLines ) ) {
				continue;
			}

			if ( ! snippetEntries.has( snippetText ) ) {
				snippetEntries.set( snippetText, [] );
			}

			snippetEntries.get( snippetText ).push( {
				file: relPath,
				line: slice[0].line,
				length: snippetText.length,
			} );
		}
	}

	const pairFindings = new Map();

	for ( const [ snippetText, entries ] of snippetEntries.entries() ) {
		const firstByFile = new Map();
		for ( const entry of entries ) {
			if ( ! firstByFile.has( entry.file ) ) {
				firstByFile.set( entry.file, entry );
			}
		}

		const fileEntries = [ ...firstByFile.values() ];
		if ( fileEntries.length < 2 ) {
			continue;
		}

		for ( let i = 0; i < fileEntries.length; i++ ) {
			for ( let j = i + 1; j < fileEntries.length; j++ ) {
				const a = fileEntries[ i ];
				const b = fileEntries[ j ];
				const pairKey =
					a.file < b.file
						? `${ a.file }::${ b.file }`
						: `${ b.file }::${ a.file }`;
				const existing = pairFindings.get( pairKey );
				const candidate = {
					pairKey,
					a,
					b,
					length: snippetText.length,
				};

				if ( ! existing || candidate.length > existing.length ) {
					pairFindings.set( pairKey, candidate );
				}
			}
		}
	}

	return [ ...pairFindings.values() ].sort( ( left, right ) => {
		return right.length - left.length;
	} );
};

const countBraces = ( line ) => {
	let depth = 0;
	for ( const ch of String( line || '' ) ) {
		if ( ch === '{' ) {
			depth++;
			continue;
		}
		if ( ch === '}' ) {
			depth--;
		}
	}
	return depth;
};

const getFunctionLengthWarnings = ( relPath, lines ) => {
	const ext = path.extname( relPath ).toLowerCase();
	const warningsLocal = [];
	const functionStartPatterns =
		'.php' === ext
			? [ /^\s*function\s+[A-Za-z0-9_]+\s*\(/ ]
			: [
					/^\s*(?:export\s+default\s+)?function\s+[A-Za-z0-9_]+\s*\(/,
					/^\s*const\s+[A-Za-z0-9_]+\s*=\s*(?:async\s*)?\([^)]*\)\s*=>\s*\{/,
					/^\s*[A-Za-z0-9_]+\s*:\s*function\s*\(/,
			  ];

	for ( let i = 0; i < lines.length; i++ ) {
		const line = lines[ i ];
		if (
			! functionStartPatterns.some( ( pattern ) => pattern.test( line ) )
		) {
			continue;
		}

		let depth = countBraces( line );
		if ( depth <= 0 ) {
			continue;
		}

		let end = i;
		for ( let j = i + 1; j < lines.length; j++ ) {
			depth += countBraces( lines[ j ] );
			if ( depth <= 0 ) {
				end = j;
				break;
			}
		}

		const length = end - i + 1;
		if ( length > COMPLEXITY_FUNCTION_LINE_WARN ) {
			warningsLocal.push(
				`${ relPath}:${ i + 1 }-${ end + 1 } function block is ${ length } lines (>${ COMPLEXITY_FUNCTION_LINE_WARN })`
			);
		}
	}

	return warningsLocal;
};

export const runSourceChecks = ( {
	root,
	sourceFiles,
	sourceLabel,
	addFailure,
	addWarning,
} ) => {
	if ( sourceFiles.length === 0 ) {
		addWarning(
			`No source files selected for ${ sourceLabel } duplication/complexity checks.`
		);
		return;
	}

	const duplicateFindings = detectCrossFileDuplicates( root, sourceFiles );
	for ( const finding of duplicateFindings ) {
		addFailure(
			`duplicate snippet across ${ sourceLabel} source files: ${ finding.a.file }:${ finding.a.line } <-> ${ finding.b.file }:${ finding.b.line }`
		);
	}

	for ( const relPath of sourceFiles ) {
		const lines = fs
			.readFileSync( path.resolve( root, relPath ), 'utf8' )
			.split( /\r?\n/ );

		if ( lines.length > COMPLEXITY_FILE_LINE_WARN ) {
			addWarning(
				`${ relPath}: file length is ${ lines.length } lines (>${ COMPLEXITY_FILE_LINE_WARN })`
			);
		}

		for ( const warning of getFunctionLengthWarnings( relPath, lines ) ) {
			addWarning( warning );
		}
	}
};
