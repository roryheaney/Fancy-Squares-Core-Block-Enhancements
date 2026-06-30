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
			{
				description: 'lg preset value',
				snippet: "value: 'one-mobile-two-md-four-lg'",
			},
			{
				description: '2-up widths map',
				snippet: "widths: { '': 12, md: 6 }",
			},
			{
				description: '3-up widths map',
				snippet: "widths: { '': 12, md: 4 }",
			},
			{
				description: '4-up widths map',
				snippet: "widths: { '': 12, md: 3 }",
			},
			{
				description: 'lg preset widths map',
				snippet: "widths: { '': 12, md: 6, lg: 3 }",
			},
			{
				description: 'WIDTH_BREAKPOINT_KEYS import',
				snippet: 'WIDTH_BREAKPOINT_KEYS',
			},
			{
				description: 'reset helper export',
				snippet: 'export const getColumnsLayoutResetAttributeUpdates',
			},
			{
				description: 'buildWidthClass helper',
				snippet: 'buildWidthClass',
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

const runPresetDocsChecks = ( { root, addFailure } ) => {
	const userGuidePath = 'docs/plugin/user-guide.md';
	const userGuideContent = readRequiredFile(
		root,
		userGuidePath,
		addFailure,
		'columns layout preset user docs checks'
	);

	if ( userGuideContent ) {
		requireSnippets(
			userGuidePath,
			userGuideContent,
			[
				{
					description: 'columns layout presets heading',
					snippet: '### Columns Layout Presets (`core/columns`)',
				},
				{
					description: 'one-time helper explanation',
					snippet:
						'Preset applications update child column Width Settings once.',
				},
				{
					description: '2-up preset docs',
					snippet: '`1 mobile / 2 md+`',
				},
				{
					description: 'md breakpoint docs',
					snippet: 'Base to 12 columns and Md+',
				},
			],
			addFailure
		);
	}

	const developerGuidePath = 'docs/plugin/developer-guide.md';
	const developerGuideContent = readRequiredFile(
		root,
		developerGuidePath,
		addFailure,
		'columns layout preset developer docs checks'
	);

	if ( developerGuideContent ) {
		requireSnippets(
			developerGuidePath,
			developerGuideContent,
			[
				{
					description: 'preset UI source docs',
					snippet:
						'Parent preset UI: `src/inspector-controls/columns-layout-presets-control.js`',
				},
				{
					description: 'preset mapping source docs',
					snippet:
						'Preset mapping: `src/inspector-controls/columns-layout-presets.js`',
				},
			],
			addFailure
		);
	}
};

export const runColumnsPresetChecks = ( { root, addFailure } ) => {
	runPresetHelperChecks( { root, addFailure } );
	runPresetUiChecks( { root, addFailure } );
	runPresetDocsChecks( { root, addFailure } );
};
