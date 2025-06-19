<?php

/**
 * Plugin Name: Fancy Squares - Core Block Enhancements
 * Description: Adds additional classes and unique dropdowns to core blocks (heading, paragraph, list, button, columns, etc.).
 * Version: 0.0.5
 * Author: Rory Heaney
 * License: GPLv2 or later
 */

defined('ABSPATH') || exit;

/**
 * Enqueue the editor script and styles that extend core blocks.
 */
function fs_core_enhancements_editor_assets()
{

	$plugin_dir = plugin_dir_path(__FILE__);
	$plugin_url = plugin_dir_url(__FILE__);

	// Load asset file for dependencies and version
	$asset_file = $plugin_dir . 'build/index.asset.php';
	if (file_exists($asset_file)) {
		$asset = include $asset_file;
	} else {
		$asset = [
			'dependencies' => [],
			'version' => false,
		];
	}

	// Enqueue the JavaScript (editor only)
	wp_enqueue_script(
		'fs-core-enhancements',
		$plugin_url . 'build/index.js',
		$asset['dependencies'],
		$asset['version'],
		true
	);

	// Enqueue the CSS (editor)
	wp_enqueue_style(
		'fs-core-enhancements-editor',
		$plugin_url . 'build/index.css',
		[], // No dependencies needed
		$asset['version']
	);
}
add_action('enqueue_block_editor_assets', 'fs_core_enhancements_editor_assets');

/**
 * Enqueue the styles for the front end.
 */
function fs_core_enhancements_frontend_assets()
{
	$plugin_dir = plugin_dir_path(__FILE__);
	$plugin_url = plugin_dir_url(__FILE__);

	// Load asset file for version consistency
	$asset_file = $plugin_dir . 'build/index.asset.php';
	if (file_exists($asset_file)) {
		$asset = include $asset_file;
	} else {
		$asset = [
			'version' => false,
		];
	}

	// Enqueue the JavaScript for the front end
	wp_enqueue_script(
		'fs-core-enhancements-frontend',
		$plugin_url . 'build/index.js',
		$asset['dependencies'] ?? [],
		$asset['version'],
		true
	);

	// Enqueue the CSS (front end)
	wp_enqueue_style(
		'fs-core-enhancements-frontend',
		$plugin_url . 'build/index.css',
		[],
		$asset['version']
	);
}
add_action('wp_enqueue_scripts', 'fs_core_enhancements_frontend_assets');


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
 * Add a role of list to and a role of list-item to wp-block-columns.
 * "parentIsList":true is used to indicate that the parent block is a list.
 * "isList":true is used to indicate that the block itself is a list item.
 *
 * @param string $block_content Rendered HTML of the block.
 * @param array  $block         Parsed block data.
 *
 * @return string Modified block HTML.
 */
function fs_core_enhancements_columns_render($block_content, $block)
{
	// error_log('block' . json_encode($block));
	if (
		isset($block['blockName']) &&
		'core/columns' === $block['blockName'] &&
		! empty($block['attrs']['isList'])
	) {
		$processor = new WP_HTML_Tag_Processor($block_content);

		if ($processor->next_tag('div')) {
			$processor->set_attribute('role', 'list');
			$processor->add_class('wp-block-fancysquares-columns');
			while ($processor->next_tag('div')) {
				$processor->set_attribute('role', 'listitem');
				$processor->add_class('wp-block-fancysquares-column');
			}

			$block_content = $processor->get_updated_html();
		}
	}

	return $block_content;
}
add_filter('render_block_core/columns', 'fs_core_enhancements_columns_render', 10, 2);

/**
 * Add loading="lazy" and decoding="async" to core/image blocks.
 *
 * @param string $block_content Rendered HTML of the block.
 * @param array  $block         Parsed block data.
 *
 * @return string Modified block HTML.
 */
function fs_core_enhancements_image_render($block_content, $block)
{
	if (
		isset($block['blockName']) &&
		'core/image' === $block['blockName']
	) {
		$processor = new WP_HTML_Tag_Processor($block_content);
		if ($processor->next_tag('img')) {
			$processor->set_attribute('loading', 'lazy');
			$processor->set_attribute('decoding', 'async');
			$block_content = $processor->get_updated_html();
		}
	}

	return $block_content;
}
add_filter('render_block_core/image', 'fs_core_enhancements_image_render', 10, 2);

/**
 * Add lazy loading data attributes to core/cover block videos (wp-block-cover__video-background).
 * Add loading="lazy" and decoding="async" to core/cover blocks images (wp-block-cover__image-background).
 *
 * @param string $block_content Rendered HTML of the block.
 * @param array  $block         Parsed block data.
 *
 * @return string Modified block HTML.
 */
function fs_core_enhancements_cover_render($block_content, $block)
{
	if (! isset($block['blockName']) || 'core/cover' !== $block['blockName']) {
		return $block_content;
	}

	$processor = new WP_HTML_Tag_Processor($block_content);

	$found_video = false;
	$found_img   = false;

	while ($processor->next_tag()) {
		$tag = $processor->get_tag();
		/* video ───────────────────────── */
		if (
			! $found_video
			&& 'VIDEO' === $tag
			&& $processor->has_class('wp-block-cover__video-background')
		) {
			if ($src = $processor->get_attribute('src')) {
				$processor->set_attribute('data-fs-lazy-video', 'true');
				$processor->set_attribute('data-src', $src);
				$processor->set_attribute('src', '');
			}
			$found_video = true;
			// don't `continue`—we want to check whether we can break
		}

		/* image ───────────────────────── */
		if (
			! $found_img
			&& 'IMG' === $tag
			&& $processor->has_class('wp-block-cover__image-background')
		) {
			$processor->set_attribute('loading',  'lazy');
			$processor->set_attribute('decoding', 'async');
			$found_img = true;
		}

		// break if either is found
		if ($found_video || $found_img) {
			break;
		}
	}

	return $processor->get_updated_html();
}
add_filter('render_block_core/cover', 'fs_core_enhancements_cover_render', 10, 2);
