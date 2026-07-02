import fs from 'node:fs';
import path from 'node:path';

const normalizeContent = ( source ) => String( source || '' ).replace( /\r\n/g, '\n' );

const PERFORMANCE_GUARD_CHECKS = [
	{
		file: 'src/blocks/tabs-interactive/view.js',
		requiredSnippets: [
			{
				description: 'mobile transition fallback timeout constant',
				snippet: 'const MOBILE_TRANSITION_FALLBACK_MS = 450;',
			},
			{
				description: 'transition fallback helper',
				snippet: 'const runTransitionWithFallback = ( element, onDone ) => {',
			},
			{
				description: 'single-fire transitionend listener',
				snippet:
					"element.addEventListener( 'transitionend', complete, { once: true } );",
			},
			{
				description: 'timeout fallback for transition completion',
				snippet:
					"fallbackId = window.setTimeout( complete, MOBILE_TRANSITION_FALLBACK_MS );",
			},
			{
				description: 'mobile-only transition guard condition',
				snippet: 'window.innerWidth <= MOBILE_MAX_WIDTH &&',
			},
			{
				description: 'requestAnimationFrame scheduling for panel activation',
				snippet: 'window.requestAnimationFrame( () => {',
			},
		],
	},
	{
		file: 'src/blocks/advanced-dropdown/view.js',
		requiredSnippets: [
			{
				description: 'mobile media query constant',
				snippet: "const MOBILE_MEDIA_QUERY = '(max-width: 781px)';",
			},
			{
				description: 'responsive panel placement helper',
				snippet: 'const placePanelsForViewport = ( root, useMobileLayout ) => {',
			},
			{
				description: 'desktop reparenting guard prevents redundant append',
				snippet: 'if ( panel.parentElement !== desktopPanelsContainer ) {',
			},
			{
				description: 'mobile reparenting guard prevents redundant append',
				snippet: 'if ( panel.parentElement !== item ) {',
			},
			{
				description: 'media-query change listener registration',
				snippet:
					"mediaQuery.addEventListener( 'change', syncPlacement );",
			},
			{
				description: 'media-query change listener cleanup',
				snippet:
					"mediaQuery.removeEventListener( 'change', syncPlacement );",
			},
			{
				description: 'responsive callback teardown function',
				snippet: 'return () => {',
			},
		],
	},
];

export const runPerformanceGuardChecks = ( { root, addFailure } ) => {
	for ( const check of PERFORMANCE_GUARD_CHECKS ) {
		const absPath = path.resolve( root, check.file );
		if ( ! fs.existsSync( absPath ) ) {
			addFailure( `${ check.file }: missing file for performance guard checks` );
			continue;
		}

		const content = normalizeContent( fs.readFileSync( absPath, 'utf8' ) );
		for ( const requirement of check.requiredSnippets ) {
			if ( ! content.includes( requirement.snippet ) ) {
				addFailure(
					`${ check.file }: performance guard missing (${ requirement.description })`
				);
			}
		}
	}
};
