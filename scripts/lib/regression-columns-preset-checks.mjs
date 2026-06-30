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
			{ description: '2-up preset value', snippet: "value: 'one-mobile-two-md'" },
			{ description: '3-up preset value', snippet: "value: 'one-mobile-three-md'" },
			{ description: '4-up preset value', snippet: "value: 'one-mobile-four-md'" },
			{ description: '2-up md width mapping', snippet: 'mdColumns: 6' },
			{ description: '3-up md width mapping', snippet: 'mdColumns: 4' },
			{ description: '4-up md width mapping', snippet: 'mdColumns: 3' },
			{
				description: 'base width assignment',
				snippet: "[ getBreakpointAttributeKey( 'width', '' ) ]: BASE_COLUMN_WIDTH",
			},
			{
				description: 'md width assignment',
				snippet: "[ getBreakpointAttributeKey( 'width', 'md' ) ]:",
			},
			{
				description: 'stale breakpoint clear list',
				snippet: "WIDTH_BREAKPOINTS_TO_CLEAR = [ 'sm', 'lg', 'xl', 'xxl' ]",
			},
		],
		addFailure
	);
};

const runPresetUiChecks = ( { root, addFailure } ) => {
	const controlPath = 'src/inspector-controls/columns-layout-presets-control.js';
	const controlContent = readRequiredFile(
		root,
		controlPath,
		addFailure,
		'columns layout preset UI checks'
	);

	if ( controlContent ) {
		requireSnippets(
			controlPath,
			controlContent,
			[
				{
					description: 'preset helper import',
					snippet: "from './columns-layout-presets'",
				},
				{ description: 'panel title', snippet: 'Columns Layout Presets' },
				{
					description: 'admin help copy',
					snippet: 'Apply a responsive layout preset to the current child columns.',
				},
				{ description: 'explicit apply button', snippet: 'Apply layout preset' },
				{
					description: 'child column update call',
					snippet: 'updateBlockAttributes( childId, updates );',
				},
				{ description: 'success confirmation', snippet: 'Layout preset applied to' },
				{
					description: 'no child warning',
					snippet: 'No child columns were found. Add columns before applying a layout preset.',
				},
			],
			addFailure
		);
	}

	const columnsControlPath = 'src/inspector-controls/columns-list-control.js';
	const columnsControlContent = readRequiredFile(
		root,
		columnsControlPath,
		addFailure,
		'columns layout preset integration checks'
	);

	if ( columnsControlContent ) {
		requireSnippets(
			columnsControlPath,
			columnsControlContent,
			[
				{
					description: 'preset control import',
					snippet: "import ColumnsLayoutPresetsControl from './columns-layout-presets-control';",
				},
				{
					description: 'preset control render',
					snippet: '<ColumnsLayoutPresetsControl clientId={ clientId } />',
				},
			],
			addFailure
		);
	}
};

export const runColumnsPresetChecks = ( { root, addFailure } ) => {
	runPresetHelperChecks( { root, addFailure } );
	runPresetUiChecks( { root, addFailure } );
};
