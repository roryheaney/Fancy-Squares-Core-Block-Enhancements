import fs from 'node:fs';
import path from 'node:path';

const normalizeContent = ( source ) => String( source || '' ).replace( /\r\n/g, '\n' );

const FIRST_PAINT_CHECKS = [
	{
		file: 'src/blocks/tabs-interactive/render.php',
		requiredSnippets: [
			{
				description: 'tab button static active class output',
				snippet: "class=\"fs-tabs__tab<?php echo $is_active ? ' is-active' : ''; ?>\"",
			},
			{
				description: 'tab panel static active class output',
				snippet: "class=\"fs-tabs__panel<?php echo $is_active ? ' is-active' : ''; ?>\"",
			},
			{
				description: 'responsive accordion trigger static active class output',
				snippet:
					"class=\"fs-tabs__accordion-trigger<?php echo $is_active ? ' is-active' : ''; ?>\"",
			},
			{
				description: 'tab button static aria-selected parity',
				snippet:
					"aria-selected=\"<?php echo $is_active ? 'true' : 'false'; ?>\"",
			},
			{
				description: 'responsive accordion trigger static aria-expanded parity',
				snippet:
					"aria-expanded=\"<?php echo $is_active ? 'true' : 'false'; ?>\"",
			},
		],
	},
	{
		file: 'src/blocks/advanced-dropdown/render.php',
		requiredSnippets: [
			{
				description: 'initial active item resolution variable',
				snippet: '$is_initial_active =',
			},
			{
				description: 'item static open class output',
				snippet:
					"class=\"fs-advanced-dropdown__item<?php echo $has_panel ? ' has-dropdown' : ''; ?><?php echo $is_initial_active ? ' is-open' : ''; ?>\"",
			},
			{
				description: 'toggle static active class output',
				snippet:
					"class=\"fs-advanced-dropdown__toggle<?php echo $is_initial_active ? ' is-active' : ''; ?>\"",
			},
			{
				description: 'panel static open class output',
				snippet:
					"class=\"fs-advanced-dropdown__panel<?php echo $is_initial_active ? ' is-open' : ''; ?>\"",
			},
			{
				description: 'panel static hidden attribute parity',
				snippet: "<?php echo $is_initial_active ? '' : 'hidden'; ?>",
			},
			{
				description: 'toggle static aria-expanded parity',
				snippet:
					"aria-expanded=\"<?php echo $is_initial_active ? 'true' : 'false'; ?>\"",
			},
		],
	},
	{
		file: 'src/blocks/showcase-gallery/render.php',
		requiredSnippets: [
			{
				description: 'showcase initial active media resolution',
				snippet: "$is_initial_active = $media['itemId'] === $active_item_id;",
			},
			{
				description: 'media wrapper static active class output',
				snippet:
					"class=\"showcase-gallery__media-wrapper<?php echo $is_initial_active ? ' is-active' : ''; ?>\"",
			},
		],
	},
];

export const runFirstPaintParityChecks = ( { root, addFailure } ) => {
	for ( const check of FIRST_PAINT_CHECKS ) {
		const absPath = path.resolve( root, check.file );
		if ( ! fs.existsSync( absPath ) ) {
			addFailure( `${ check.file }: missing file for first-paint parity checks` );
			continue;
		}

		const content = normalizeContent( fs.readFileSync( absPath, 'utf8' ) );
		for ( const requirement of check.requiredSnippets ) {
			if ( ! content.includes( requirement.snippet ) ) {
				addFailure(
					`${ check.file }: first-paint parity missing (${ requirement.description })`
				);
			}
		}
	}
};
