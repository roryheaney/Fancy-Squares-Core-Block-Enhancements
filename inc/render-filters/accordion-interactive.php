<?php
/**
 * Accordion Interactive block render filter for Fancy Squares Core Block Enhancements.
 */

defined('ABSPATH') || exit;

/**
 * Add 'show' class to first accordion item when openFirstItem is true.
 * Uses WP_HTML_Tag_Processor to modify the rendered HTML.
 *
 * @param string   $block_content Rendered HTML of the block.
 * @param array    $block         Parsed block data.
 * @return string Modified block HTML.
 */
function fs_accordion_interactive_render_block($block_content, $block) {
	if ('fs-blocks/accordion-interactive' !== $block['blockName']) {
		return $block_content;
	}

	$open_first_item = !empty($block['attrs']['openFirstItem']);

	// If openFirstItem is false, nothing to do
	if (!$open_first_item) {
		return $block_content;
	}

	// Use HTML Tag Processor to find and modify the first accordion item
	$processor = new WP_HTML_Tag_Processor($block_content);

	// Find parent accordion wrapper and bookmark it
	if (!$processor->next_tag(['tag_name' => 'div', 'class_name' => 'fs-accordion'])) {
		return $block_content;
	}
	$processor->set_bookmark('accordion-wrapper');

	// Find first accordion item and extract its itemId
	if (!$processor->next_tag(['tag_name' => 'div', 'class_name' => 'wp-block-fs-blocks-accordion-item-interactive'])) {
		return $block_content;
	}

	$item_context_json = $processor->get_attribute('data-wp-context');
	if (!$item_context_json) {
		return $block_content;
	}

	$item_context = json_decode($item_context_json, true);
	$first_item_id = $item_context['itemId'] ?? '';
	if (!$first_item_id) {
		return $block_content;
	}

	// Bookmark the first item position
	$processor->set_bookmark('first-item');

	// Find and modify the button within this item
	if ($processor->next_tag(['tag_name' => 'button', 'class_name' => 'fs-accordion__trigger'])) {
		$processor->set_attribute('aria-expanded', 'true');
	}

	// Find and modify the content div within this item
	if ($processor->next_tag(['tag_name' => 'div', 'class_name' => 'fs-accordion__content'])) {
		$processor->add_class('show');
		$processor->set_attribute('aria-hidden', 'false');
	}

	// Seek back to parent accordion wrapper and update its context
	if ($processor->seek('accordion-wrapper')) {
		$context_json = $processor->get_attribute('data-wp-context');
		$context = $context_json ? json_decode($context_json, true) : [];
		$context['activeItem'] = $first_item_id;
		$processor->set_attribute('data-wp-context', wp_json_encode($context));
	}

	// Clean up bookmarks
	$processor->release_bookmark('accordion-wrapper');
	$processor->release_bookmark('first-item');

	return $processor->get_updated_html();
}
add_filter('render_block', 'fs_accordion_interactive_render_block', 10, 2);
