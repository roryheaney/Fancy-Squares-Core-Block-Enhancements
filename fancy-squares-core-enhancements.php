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
 * Register custom block attributes on the server.
 */
function fs_core_enhancements_register_attributes( $args, $name ) {
       if ( in_array( $name, array( 'core/video', 'core/cover' ), true ) ) {
               if ( ! isset( $args['attributes']['lazyLoadVideo'] ) ) {
                       $args['attributes']['lazyLoadVideo'] = array(
                               'type'    => 'boolean',
                               'default' => true,
                       );
               }
       }
       return $args;
}
add_filter( 'register_block_type_args', 'fs_core_enhancements_register_attributes', 10, 2 );

/**
 * Add lazy loading data attributes to core/video blocks.
 *
 * @param string $block_content Rendered HTML of the block.
 * @param array  $block         Parsed block data.
 *
 * @return string Modified block HTML.
 */
function fs_core_enhancements_lazy_video_render( $block_content, $block ) {
       if (
               isset( $block['blockName'] ) &&
               'core/video' === $block['blockName'] &&
               ! empty( $block['attrs']['lazyLoadVideo'] )
       ) {
               $processor = new WP_HTML_Tag_Processor( $block_content );

               if ( $processor->next_tag( 'video' ) ) {
                       $src = $processor->get_attribute( 'src' );

                       if ( $src ) {
                               $processor->set_attribute( 'data-fs-lazy-video', 'true' );
                               $processor->set_attribute( 'data-src', $src );
                               $processor->set_attribute( 'src', '' );
                       }

                       $block_content = $processor->get_updated_html();
               }
       }

       return $block_content;
}
add_filter( 'render_block', 'fs_core_enhancements_lazy_video_render', 10, 2 );
