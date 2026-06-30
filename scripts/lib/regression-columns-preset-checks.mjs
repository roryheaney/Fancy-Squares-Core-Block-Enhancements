import fs from 'node:fs';
import path from 'node:path';

const readRequiredFile = ( root, relPath, addFailure, checkLabel ) => {
	const absPath = path.resolve( root, relPath );
	if ( ! fs.existsSync( absPath ) ) {
		addFailure( `${ relPath }: missing file for ${ checkLabel }` );
		return '';
	}

	return fs.readFileSync( absPath, 'utf8' );
};

const requireSnippets = ( relPath, content, requirements, addFailure ) => {
	for ( const requirement of requirements ) {
		if ( ! content.includes( requirement.snippet ) ) {
			addFailure( `${ relPath }: missing ${ requirement.description }` );
		}
	}
};

const runPresetHelperChecks = ( { root, addFailure } ) => {
	const helperPath = 'src/inspector-controls/columns-layout-presets.js';
	const helperContent = readRequiredFile(
		root,
		helperPath,
		addFailure,
		'columns layout preset checks'
	);

	if ( ! helperContent ) {
		return;
	}

	requireSnippets(
		helperPath,
		helperContent,
		[
			{
				description: '2-up preset value',
				snippet: "value: 'one-mobile-two-md'",
			},
			{
				description: '3-up preset value',
				snippet: "value: 'one-mobile-three-md'",
			},
			{
				description: '4-up preset value',
				snippet: "value: 'one-mobile-four-md'",
			},
			{
				description: '2-up md width mapping',
				snippet: 'mdColumns: 6',
			},
			{
				description: '3-up md width mapping',
				snippet: 'mdColumns: 4',
			},
			{
				description: '4-up md width mapping',
				snippet: 'mdColumns: 3',
			},
			{
				description: 'base width assignment',
				snippet:
					"[ getBreakpointAttributeKey( 'width', '' ) ]: BASE_COLUMN_WIDTH",
			},
			{
				description: 'md width assignment',
				snippet: "[ getBreakpointAttributeKey( 'width', 'md' ) ]:",
			},
			{
				description: 'stale breakpoint clear list',
				snippet:
					"WIDTH_BREAKPOINTS_TO_CLEAR = [ 'sm', 'lg', 'xl', 'xxl' ]",
			},
		],
		addFailure
	);
};

export const runColumnsPresetChecks = ( { root, addFailure } ) => {
	runPresetHelperChecks( { root, addFailure } );
};
