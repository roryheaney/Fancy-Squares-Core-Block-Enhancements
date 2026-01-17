<?php
/**
 * Asset enqueuing functions for Fancy Squares Core Block Enhancements.
 */

defined( 'ABSPATH' ) || exit;

/**
 * Enqueue the editor script and styles that extend core blocks.
 */
function fs_core_enhancements_editor_assets() {
        $plugin_dir = plugin_dir_path( dirname( __DIR__ ) . '/fancy-squares-core-enhancements.php' );
        $plugin_url = plugin_dir_url( dirname( __DIR__ ) . '/fancy-squares-core-enhancements.php' );

        // Load asset file for dependencies and version.
       $asset_file = $plugin_dir . 'build/index.asset.php';
        if ( file_exists( $asset_file ) ) {
                $asset = include $asset_file;
        } else {
                $asset = [
                        'dependencies' => [],
                        'version'      => false,
                ];
        }

	// Enqueue the JavaScript (editor only).
	wp_enqueue_script(
		'fs-core-enhancements',
		$plugin_url . 'build/index.js',
		$asset['dependencies'],
		$asset['version'],
		true
	);

	$enabled_blocks = function_exists( 'fs_core_enhancements_get_enabled_blocks' )
		? fs_core_enhancements_get_enabled_blocks()
		: [];
	wp_add_inline_script(
		'fs-core-enhancements',
		'window.fsCoreEnhancements = window.fsCoreEnhancements || {};' .
			'window.fsCoreEnhancements.enabledBlocks = ' .
			wp_json_encode( $enabled_blocks ) .
			';',
		'before'
	);

	// Enqueue the CSS (editor) - includes column widths.
	wp_enqueue_style(
		'fs-core-enhancements-editor',
                $plugin_url . 'build/index.css',
                [],
                $asset['version']
        );

	// Note: Per-block styles (tabs, accordion, modal) are automatically
	// enqueued by WordPress via the "style" field in each block.json.
}
add_action( 'enqueue_block_editor_assets', 'fs_core_enhancements_editor_assets' );

function fs_core_enhancements_should_enqueue_swiper() {
	if ( function_exists( 'has_block' ) && has_block( 'fs-blocks/carousel' ) ) {
		return true;
	}

	return (bool) apply_filters( 'fs_core_enhancements_enqueue_swiper', false );
}

/**
 * Enqueue the styles for the front end.
 */
function fs_core_enhancements_frontend_assets() {
        $plugin_dir = plugin_dir_path( dirname( __DIR__ ) . '/fancy-squares-core-enhancements.php' );
        $plugin_url = plugin_dir_url( dirname( __DIR__ ) . '/fancy-squares-core-enhancements.php' );

       // Load asset file for version consistency.
       $asset_file = $plugin_dir . 'build/frontend.asset.php';
        if ( file_exists( $asset_file ) ) {
                $asset = include $asset_file;
        } else {
                $asset = [
                        'version' => false,
                ];
        }

	$script_dependencies = $asset['dependencies'] ?? [];

	if ( fs_core_enhancements_should_enqueue_swiper() ) {
		wp_enqueue_style(
			'fs-core-enhancements-swiper',
			'https://cdn.jsdelivr.net/npm/swiper@11.1.1/swiper-bundle.min.css',
			[],
			'11.1.1'
		);
		wp_register_script(
			'fs-core-enhancements-swiper',
			'https://cdn.jsdelivr.net/npm/swiper@11.1.1/swiper-bundle.min.js',
			[],
			'11.1.1',
			true
		);
		$script_dependencies[] = 'fs-core-enhancements-swiper';
	}

	$script_dependencies = array_values( array_unique( $script_dependencies ) );

	// Enqueue the JavaScript for the front end.
	wp_enqueue_script(
		'fs-core-enhancements-frontend',
		$plugin_url . 'build/frontend.js',
		$script_dependencies,
		$asset['version'],
		true
	);

	// Enqueue column width styles on frontend.
	if ( file_exists( $plugin_dir . 'build/index.css' ) ) {
		wp_enqueue_style(
			'fs-core-enhancements-column-widths',
			$plugin_url . 'build/index.css',
			[],
			$asset['version']
		);
	}

	// Note: Per-block styles (tabs, accordion, modal) are automatically
	// enqueued by WordPress via the "style" field in each block.json.
	// WordPress lazy-loads these styles only when the blocks are used.
}
add_action( 'wp_enqueue_scripts', 'fs_core_enhancements_frontend_assets' );
