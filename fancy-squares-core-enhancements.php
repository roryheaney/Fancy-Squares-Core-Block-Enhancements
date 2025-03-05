<?php

/**
 * Plugin Name: Fancy Squares - Core Block Enhancements
 * Description: Adds additional classes and unique dropdowns to core blocks (heading, paragraph, list, button, etc.).
 * Version: 1.0.1
 * Author: Rory Heaney
 * License: GPLv2 or later
 */

defined('ABSPATH') || exit;

/**
 * Enqueue the editor script that extends core blocks.
 */
function fs_core_enhancements_editor_assets()
{
	$plugin_dir = plugin_dir_path(__FILE__);
	$plugin_url = plugin_dir_url(__FILE__);

	// If you use the default WP asset loader from @wordpress/scripts build:
	$asset_file = $plugin_dir . 'build/index.asset.php'; // or extend-core-blocks.asset.php
	if (file_exists($asset_file)) {
		$asset = include $asset_file;
	} else {
		$asset = [
			'dependencies' => [],
			'version'      => false,
		];
	}

	wp_enqueue_script(
		'fs-core-enhancements',
		$plugin_url . 'build/index.js', // or build/extend-core-blocks.js
		$asset['dependencies'],
		$asset['version'],
		true
	);
}
add_action('enqueue_block_editor_assets', 'fs_core_enhancements_editor_assets');
