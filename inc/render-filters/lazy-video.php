<?php

/**
 * Lazy load video filter for Fancy Squares Core Block Enhancements.
 */

defined('ABSPATH') || exit;

/**
 * Add lazy loading data attributes to core/video blocks.
 *
 * @param string $block_content Rendered HTML of the block.
 * @param array  $block         Parsed block data.
 *
 * @return string Modified block HTML.
 */
function fs_core_enhancements_lazy_video_render($block_content, $block)
{
	if (
		isset($block['blockName']) &&
		'core/video' === $block['blockName'] &&
		! empty($block['attrs']['lazyLoadVideo'])
	) {
		$processor = new WP_HTML_Tag_Processor($block_content);

		if ($processor->next_tag('video')) {
			$src = $processor->get_attribute('src');

			if ($src) {
				$processor->set_attribute('data-fs-lazy-video', 'true');
				$processor->set_attribute('data-src', $src);
				$processor->set_attribute('src', '');
			}

			$block_content = $processor->get_updated_html();
		}
	}

	return $block_content;
}
add_filter('render_block_core/video', 'fs_core_enhancements_lazy_video_render', 10, 2);

/**
 * Apply best-effort download deterrents to all videos in rendered blocks.
 *
 * These attributes do not prevent saving and may be ignored by browsers.
 *
 * @param string $block_content Rendered HTML of the block.
 * @return string Modified block HTML.
 */
function fs_core_enhancements_video_controls_render($block_content)
{
	$processor = new WP_HTML_Tag_Processor($block_content);

	while ($processor->next_tag('video')) {
		$processor->set_attribute('controlsList', 'nodownload');
		$processor->set_attribute('disablePictureInPicture', 'true');
		$processor->set_attribute('oncontextmenu', 'return false;');
	}

	return $processor->get_updated_html();
}
add_filter('render_block', 'fs_core_enhancements_video_controls_render');
