<?php

/**
 * Button modal render filter for Fancy Squares Core Block Enhancements.
 */

defined('ABSPATH') || exit;

/**
 * Convert core/button links to modal triggers when enabled.
 *
 * @param string $block_content Rendered HTML of the block.
 * @param array  $block         Parsed block data.
 *
 * @return string Modified block HTML.
 */
function fs_core_enhancements_button_modal_render($block_content, $block)
{
	if (
		isset($block['blockName']) &&
		'core/button' === $block['blockName'] &&
		! empty($block['attrs']['triggerModal']) &&
		! empty($block['attrs']['modalId'])
	) {
		$processor = new WP_HTML_Tag_Processor($block_content);

		if ($processor->next_tag('a')) {
			$modal_id        = sanitize_html_class($block['attrs']['modalId']);

			$processor->set_attribute('type', 'button');
			$processor->add_class('wp-element-button--modal-btn');
			$processor->set_attribute('data-bs-toggle', 'modal');
			$processor->set_attribute('data-bs-target', '#' . $modal_id);
			$processor->remove_attribute('href');
			$processor->remove_attribute('target');
			$processor->remove_attribute('rel');

			$block_content = $processor->get_updated_html();
			$block_content = preg_replace('/<a\b/i', '<button', $block_content, 1);
			$block_content = preg_replace('/<\/a>/', '</button>', $block_content, 1);
		}
	}

	return $block_content;
}
add_filter('render_block_core/button', 'fs_core_enhancements_button_modal_render', 10, 2);
