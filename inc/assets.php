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

	wp_enqueue_style(
		'fs-core-enhancements-editor',
		$plugin_url . 'build/index.css',
		[],
		$asset['version']
	);
}
add_action( 'enqueue_block_editor_assets', 'fs_core_enhancements_editor_assets' );

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
		wp_enqueue_style( 'fs-core-enhancements-frontend-style' );
	}
}
add_action( 'wp_enqueue_scripts', 'fs_core_enhancements_register_frontend_assets' );

/**
 * Enqueue frontend runtime script when needed.
 *
 * @param bool $needs_swiper Whether carousel runtime is required.
 */
function fs_core_enhancements_enqueue_frontend_runtime( $needs_swiper = false ) {
	if ( $needs_swiper ) {
		wp_enqueue_style( 'fs-core-enhancements-swiper' );
		wp_enqueue_script( 'fs-core-enhancements-swiper' );
	}

	wp_enqueue_script( 'fs-core-enhancements-frontend' );
}

/**
 * Enqueue frontend runtime script only when required by rendered blocks.
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
		if ( ! empty( $attrs['lazyLoadVideo'] ) ) {
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
