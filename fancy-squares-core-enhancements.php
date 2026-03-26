<?php

/**
 * Plugin Name: Fancy Squares - Core Block Enhancements
 * Description: Adds additional classes and unique dropdowns to core blocks (heading, paragraph, list, button, columns, etc.).
 * Version: 1.1.6
 * Author: Rory Heaney
 * License: GPLv2 or later
 * Text Domain: fancy-squares-core-enhancements
 * Domain Path: /languages
 */

defined('ABSPATH') || exit;

/**
 * Load plugin translations.
 */
function fs_core_enhancements_load_textdomain()
{
	load_plugin_textdomain(
		'fancy-squares-core-enhancements',
		false,
		dirname(plugin_basename(__FILE__)) . '/languages'
	);
}
add_action('init', 'fs_core_enhancements_load_textdomain');

require_once plugin_dir_path(__FILE__) . 'inc/blocks.php';
require_once plugin_dir_path(__FILE__) . 'inc/assets.php';
require_once plugin_dir_path(__FILE__) . 'inc/admin.php';
require_once plugin_dir_path(__FILE__) . 'inc/render-filters.php';
