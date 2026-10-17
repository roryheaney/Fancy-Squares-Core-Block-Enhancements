<?php

/**
 * Accessible playback controls for native Cover background videos.
 */

defined('ABSPATH') || exit;

/**
 * Locate the Cover's own background video, excluding nested block videos.
 *
 * @param string $block_content Rendered Cover HTML.
 * @return WP_HTML_Processor|null Processor positioned on the background video.
 */
function fs_core_enhancements_get_cover_background_video($block_content)
{
	$processor = WP_HTML_Processor::create_fragment($block_content);
	if (! $processor || ! $processor->next_tag() || ! $processor->has_class('wp-block-cover')) {
		return null;
	}

	$video_depth = $processor->get_current_depth() + 1;
	while ($processor->next_tag(['tag_name' => 'VIDEO', 'class_name' => 'wp-block-cover__video-background'])) {
		if ($video_depth === $processor->get_current_depth() && null === $processor->get_attribute('hidden')) {
			return $processor;
		}
	}

	return null;
}

/**
 * Keep decorative background videos out of the tab order and add a control.
 *
 * @param string $block_content Rendered HTML of the block.
 * @param array  $block         Parsed block data.
 * @return string Modified block HTML.
 */
function fs_core_enhancements_wcag_cover_video_render($block_content, $block)
{
	if ('core/cover' !== ($block['blockName'] ?? '') || ! empty($block['attrs']['useEmbedBackground'])) {
		return $block_content;
	}

	$processor = fs_core_enhancements_get_cover_background_video($block_content);
	if (! $processor || null !== $processor->get_attribute('data-fs-cover-video')) {
		return $block_content;
	}

	$video_id = $processor->get_attribute('id');
	if (! $video_id) {
		$video_id = wp_unique_id('fs-cover-video-');
		$processor->set_attribute('id', $video_id);
	}
	$processor->set_attribute('tabindex', '-1');
	$processor->set_attribute('aria-hidden', 'true');
	$processor->set_attribute('data-fs-cover-video', 'true');

	// Existing Covers have no attribute: only an explicit per-block false opts out.
	if (false !== ($block['attrs']['supportReducedMotion'] ?? true)) {
		// Remove autoplay before the browser parses the video, not after it starts.
		// Keep the core poster and saved video HTML untouched; disabling the toggle
		// leaves the original autoplay markup intact on the next page load.
		$processor->set_attribute('data-fs-reduced-motion', 'true');
		$processor->set_attribute(
			'data-fs-cover-autoplay',
			null !== $processor->get_attribute('autoplay') ? 'true' : 'false'
		);
		$processor->remove_attribute('autoplay');
	}

	$button = sprintf(
		'<button type="button" class="fs-cover-video-toggle" aria-controls="%s" data-pause-label="%s" data-play-label="%s" aria-label="%s" hidden><svg class="fs-cover-video-toggle__play" width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true" focusable="false"><path d="M5 2 16 9 5 16Z"/></svg><svg class="fs-cover-video-toggle__pause" width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true" focusable="false"><rect x="3" y="1" width="4" height="16" rx="2"/><rect x="11" y="1" width="4" height="16" rx="2"/></svg><span class="fs-cover-video-toggle__spinner" aria-hidden="true"></span></button>',
		esc_attr($video_id),
		esc_attr__('Pause Motion', 'fancy-squares-core-enhancements'),
		esc_attr__('Play Motion', 'fancy-squares-core-enhancements'),
		esc_attr__('Play Motion', 'fancy-squares-core-enhancements')
	);

	// Prepend inside the outer Cover, before its media and nested content blocks.
	return preg_replace_callback(
		'/\A((?:\s|<!--.*?-->)*<[a-z][a-z0-9]*\b(?:[^>"\']|"[^"]*"|\'[^\']*\')*>)/is',
		static function ($matches) use ($button) {
			return $matches[1] . $button;
		},
		$processor->get_updated_html(),
		1
	);
}
add_filter('render_block_core/cover', 'fs_core_enhancements_wcag_cover_video_render', 20, 2);
