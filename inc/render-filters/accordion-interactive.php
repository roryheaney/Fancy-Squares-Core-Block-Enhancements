<?php
/**
 * Accordion Interactive block render filter for Fancy Squares Core Block Enhancements.
 */

defined('ABSPATH') || exit;

/**
 * Fix accordion activeItem attribute before rendering.
 * This ensures that providesContext passes the correct value to children based on openFirstItem setting.
 * 
 * Without this filter, the saved activeItem value from the editor would persist to frontend,
 * causing the wrong item to open or items to open when they should all be collapsed.
 *
 * @param array $parsed_block The parsed block data.
 * @param array $source_block The source block.
 * @param WP_Block|null $parent_block The parent block instance.
 * @return array Modified block data.
 */
function fs_accordion_interactive_render_block_data($parsed_block, $source_block, $parent_block) {
	if ('fs-blocks/accordion-interactive' === $parsed_block['blockName']) {
		$open_first_item = !empty($parsed_block['attrs']['openFirstItem']);
		
		if ($open_first_item && !empty($parsed_block['innerBlocks'])) {
			// Find the first accordion item and set it as active
			foreach ($parsed_block['innerBlocks'] as $inner_block) {
				if ('fs-blocks/accordion-item-interactive' === $inner_block['blockName']) {
					$parsed_block['attrs']['activeItem'] = $inner_block['attrs']['itemId'] ?? '';
					break;
				}
			}
		} else {
			// openFirstItem is false, ensure no item is active
			$parsed_block['attrs']['activeItem'] = '';
		}
	}
	return $parsed_block;
}
add_filter('render_block_data', 'fs_accordion_interactive_render_block_data', 10, 3);
