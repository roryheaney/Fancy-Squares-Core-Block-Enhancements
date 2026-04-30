<?php
/**
 * Asset enqueuing functions for Fancy Squares Core Block Enhancements.
 */

defined( 'ABSPATH' ) || exit;

/**
 * Return plugin dir/url paths.
 *
 * @return array{0:string,1:string}
 */
function fs_core_enhancements_get_plugin_paths() {
	$plugin_file = dirname( __DIR__ ) . '/fancy-squares-core-enhancements.php';
	return [
		plugin_dir_path( $plugin_file ),
		plugin_dir_url( $plugin_file ),
	];
}

/**
 * Enqueue the editor script and styles that extend core blocks.
 */
function fs_core_enhancements_editor_assets() {
	list($plugin_dir, $plugin_url) = fs_core_enhancements_get_plugin_paths();

	$asset_file = $plugin_dir . 'build/index.asset.php';
	$asset = file_exists( $asset_file )
		? include $asset_file
		: [
			'dependencies' => [],
			'version' => false,
		];

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

}
add_action( 'enqueue_block_editor_assets', 'fs_core_enhancements_editor_assets' );

/**
 * Enqueue editor styles through enqueue_block_assets so they are iframe-safe.
 */
function fs_core_enhancements_editor_canvas_assets() {
	if ( ! is_admin() ) {
		return;
	}

	if (
		function_exists( 'wp_should_load_block_editor_scripts_and_styles' ) &&
		! wp_should_load_block_editor_scripts_and_styles()
	) {
		return;
	}

	list($plugin_dir, $plugin_url) = fs_core_enhancements_get_plugin_paths();

	$asset_file = $plugin_dir . 'build/index.asset.php';
	$asset = file_exists( $asset_file )
		? include $asset_file
		: [
			'version' => false,
		];

	wp_enqueue_style(
		'fs-core-enhancements-editor',
		$plugin_url . 'build/index.css',
		[],
		$asset['version']
	);
}
add_action( 'enqueue_block_assets', 'fs_core_enhancements_editor_canvas_assets' );

/**
 * Register frontend assets.
 */
function fs_core_enhancements_register_frontend_assets() {
	list($plugin_dir, $plugin_url) = fs_core_enhancements_get_plugin_paths();

	$frontend_asset_file = $plugin_dir . 'build/frontend.asset.php';
	$frontend_asset = file_exists( $frontend_asset_file )
		? include $frontend_asset_file
		: [
			'dependencies' => [],
			'version' => false,
		];

	$frontend_dependencies = $frontend_asset['dependencies'] ?? [];
	$frontend_version = $frontend_asset['version'] ?? false;

	wp_register_script(
		'fs-core-enhancements-frontend',
		$plugin_url . 'build/frontend.js',
		$frontend_dependencies,
		$frontend_version,
		true
	);

	wp_register_style(
		'fs-core-enhancements-swiper',
		'https://cdn.jsdelivr.net/npm/swiper@11.1.1/swiper-bundle.min.css',
		[],
		'11.1.1'
	);
	wp_style_add_data(
		'fs-core-enhancements-swiper',
		'integrity',
		'sha384-PWmRGB2I6kV3gYyFAvr+8VRU2qg603tGFzX74EhRRfRScQ36ptuVjQQFWOOJVWRM'
	);
	wp_style_add_data(
		'fs-core-enhancements-swiper',
		'crossorigin',
		'anonymous'
	);

	wp_register_script(
		'fs-core-enhancements-swiper',
		'https://cdn.jsdelivr.net/npm/swiper@11.1.1/swiper-bundle.min.js',
		[],
		'11.1.1',
		true
	);
	wp_script_add_data(
		'fs-core-enhancements-swiper',
		'integrity',
		'sha384-2YLKPVDmBctT3U8nF+92s9qRznFC7Smwhnaj29vPzzWOxnlIUm3GVXI00avNjg1J'
	);
	wp_script_add_data(
		'fs-core-enhancements-swiper',
		'crossorigin',
		'anonymous'
	);

	$frontend_style_file = $plugin_dir . 'build/frontend-styles.css';
	if ( file_exists( $frontend_style_file ) ) {
		$frontend_style_version = $frontend_version;
		$frontend_style_asset_file =
			$plugin_dir . 'build/frontend-styles.asset.php';
		if ( file_exists( $frontend_style_asset_file ) ) {
			$frontend_style_asset = include $frontend_style_asset_file;
			$frontend_style_version =
				$frontend_style_asset['version'] ?? $frontend_style_version;
		}

		wp_register_style(
			'fs-core-enhancements-frontend-style',
			$plugin_url . 'build/frontend-styles.css',
			[],
			$frontend_style_version
		);
	}

	$utilities_style_file = $plugin_dir . 'build/utilities.css';
	if ( file_exists( $utilities_style_file ) ) {
		$utilities_style_version = $frontend_version;
		$utilities_style_asset_file = $plugin_dir . 'build/utilities.asset.php';
		if ( file_exists( $utilities_style_asset_file ) ) {
			$utilities_style_asset = include $utilities_style_asset_file;
			$utilities_style_version =
				$utilities_style_asset['version'] ?? $utilities_style_version;
		}

		wp_register_style(
			'fs-core-enhancements-utilities',
			$plugin_url . 'build/utilities.css',
			[],
			$utilities_style_version
		);
	}
}
add_action( 'wp_enqueue_scripts', 'fs_core_enhancements_register_frontend_assets' );

/**
 * Conditionally enqueue the frontend stylesheet bundle.
 */
function fs_core_enhancements_enqueue_frontend_style() {
	if ( wp_style_is( 'fs-core-enhancements-frontend-style', 'registered' ) ) {
		wp_enqueue_style( 'fs-core-enhancements-frontend-style' );
	}
}

/**
 * Get utilities CSS load setting.
 *
 * @return string One of `off`, `editor`, or `both`.
 */
function fs_core_enhancements_get_utilities_setting() {
	$option_name = defined( 'FS_CORE_ENHANCEMENTS_OPTION_UTILITIES' )
		? FS_CORE_ENHANCEMENTS_OPTION_UTILITIES
		: 'fs_core_enhancements_utilities_css';

	$value = get_option( $option_name, 'both' );
	$allowed = [ 'off', 'editor', 'both' ];

	if ( ! is_string( $value ) || ! in_array( $value, $allowed, true ) ) {
		return 'both';
	}

	return $value;
}

/**
 * Determine whether utilities stylesheet is allowed on the frontend.
 *
 * @return bool
 */
function fs_core_enhancements_should_enqueue_utilities_frontend() {
	return 'both' === fs_core_enhancements_get_utilities_setting();
}

/**
 * Conditionally enqueue generated utility classes.
 */
function fs_core_enhancements_enqueue_utilities_style() {
	if ( ! fs_core_enhancements_should_enqueue_utilities_frontend() ) {
		return;
	}

	if ( wp_style_is( 'fs-core-enhancements-utilities', 'registered' ) ) {
		wp_enqueue_style( 'fs-core-enhancements-utilities' );
	}
}

require_once __DIR__ . '/assets-token-detection.php';

function fs_core_enhancements_enqueue_frontend_runtime( $needs_swiper = false ) {
	if ( $needs_swiper ) {
		wp_enqueue_style( 'fs-core-enhancements-swiper' );
		wp_enqueue_script( 'fs-core-enhancements-swiper' );
	}

	wp_enqueue_script( 'fs-core-enhancements-frontend' );
}

/**
 * Enqueue frontend runtime script and styles only when required by rendered blocks.
 *
 * @param string $block_content Rendered block content.
 * @param array  $block Parsed block.
 *
 * @return string
 */
function fs_core_enhancements_maybe_enqueue_frontend_runtime( $block_content, $block ) {
	if ( is_admin() || ! is_array( $block ) || empty( $block['blockName'] ) ) {
		return $block_content;
	}

	$block_name = $block['blockName'];
	$attrs = isset( $block['attrs'] ) && is_array( $block['attrs'] )
		? $block['attrs']
		: [];

	$needs_frontend_style = fs_core_enhancements_block_needs_frontend_style(
		$block_name,
		$attrs
	) || fs_core_enhancements_block_content_needs_frontend_style(
		$block_name,
		$block_content
	);
	if ( $needs_frontend_style ) {
		fs_core_enhancements_enqueue_frontend_style();
	}

	$needs_utilities = fs_core_enhancements_block_needs_utilities( $attrs )
		|| fs_core_enhancements_block_content_needs_utilities( $block_content );
	if ( $needs_utilities ) {
		fs_core_enhancements_enqueue_utilities_style();
	}

	if ( 'fs-blocks/carousel' === $block_name ) {
		fs_core_enhancements_enqueue_frontend_runtime( true );
		return $block_content;
	}

	if ( 'core/video' === $block_name ) {
		if ( ! empty( $attrs['lazyLoadVideo'] ) || ! empty( $attrs['useCustomPlayButton'] ) ) {
			fs_core_enhancements_enqueue_frontend_runtime();
		}
		return $block_content;
	}

	if ( 'core/cover' === $block_name ) {
		if ( ! empty( $attrs['lazyLoadVideo'] ) && empty( $attrs['useEmbedBackground'] ) ) {
			fs_core_enhancements_enqueue_frontend_runtime();
		}
		return $block_content;
	}

	if (
		'fs-blocks/accordion-item-interactive' === $block_name ||
		'fs-blocks/showcase-gallery' === $block_name
	) {
		fs_core_enhancements_enqueue_frontend_runtime();
	}

	return $block_content;
}
add_filter(
	'render_block',
	'fs_core_enhancements_maybe_enqueue_frontend_runtime',
	10,
	2
);
