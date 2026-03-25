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

	$value = get_option( $option_name, 'off' );
	$allowed = [ 'off', 'editor', 'both' ];

	if ( ! is_string( $value ) || ! in_array( $value, $allowed, true ) ) {
		return 'off';
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

/**
 * Detect whether a class token is provided by utilities.css.
 *
 * @param string $token Candidate class token.
 *
 * @return bool
 */
function fs_core_enhancements_is_utility_token( $token ) {
	if ( ! is_string( $token ) ) {
		return false;
	}

	$token = trim( $token );
	if ( '' === $token ) {
		return false;
	}

	return 1 === preg_match(
		'/^(?:' .
		'[mp][trbsexy]?-(?:[a-z0-9]+-)?(?:n)?[a-z0-9][a-z0-9-]*' .
		'|' .
		'[mp][trbsexy]?-(?:[a-z0-9]+-)?auto' .
		'|' .
		'(?:row-|column-)?gap(?:-[a-z0-9]+)?-[a-z0-9][a-z0-9-]*' .
		'|' .
		'd(?:-[a-z0-9]+)?-[a-z-]+' .
		'|' .
		'justify-content(?:-[a-z0-9]+)?-[a-z-]+' .
		'|' .
		'align-(?:items|self)(?:-[a-z0-9]+)?-[a-z-]+' .
		'|' .
		'order(?:-[a-z0-9]+)?-(?:[0-9]+|first|last)' .
		'|' .
		'position-[a-z]+' .
		'|' .
		'(?:top|bottom|start|end)-(?:0|50|100)' .
		'|' .
		'translate-middle(?:-x|-y)?' .
		'|' .
		'z-(?:n1|0|1|2|3)' .
		'|' .
		'mix-blend-[a-z-]+' .
		')$/',
		$token
	);
}

/**
 * Determine whether a block uses generated utility classes.
 *
 * @param array $attrs Block attributes.
 *
 * @return bool
 */
function fs_core_enhancements_block_needs_utilities( $attrs ) {
	if ( ! is_array( $attrs ) ) {
		return false;
	}

	foreach ( $attrs as $key => $value ) {
		if ( ! is_string( $key ) ) {
			continue;
		}

		$is_spacing_attribute =
			0 === strpos( $key, 'padding' ) ||
			0 === strpos( $key, 'margin' ) ||
			0 === strpos( $key, 'negativeMargin' );

		if ( $is_spacing_attribute && is_string( $value ) && '' !== trim( $value ) ) {
			return true;
		}

		if ( 'Classes' === substr( $key, -7 ) ) {
			if ( is_array( $value ) ) {
				foreach ( $value as $token ) {
					if ( fs_core_enhancements_is_utility_token( $token ) ) {
						return true;
					}
				}
			} elseif ( is_string( $value ) && fs_core_enhancements_is_utility_token( $value ) ) {
				return true;
			}
		}
	}

	$class_name = isset( $attrs['className'] ) && is_string( $attrs['className'] )
		? $attrs['className']
		: '';
	if ( '' === $class_name ) {
		return false;
	}

	foreach ( preg_split( '/\s+/', $class_name ) as $token ) {
		if ( fs_core_enhancements_is_utility_token( $token ) ) {
			return true;
		}
	}

	return false;
}

/**
 * Determine whether a rendered block requires frontend styles.
 *
 * @param string $block_name Block name.
 * @param array  $attrs      Block attributes.
 *
 * @return bool
 */
function fs_core_enhancements_block_needs_frontend_style( $block_name, $attrs ) {
	$class_name = isset( $attrs['className'] ) && is_string( $attrs['className'] )
		? $attrs['className']
		: '';

	switch ( $block_name ) {
		case 'core/columns':
			return false !== strpos( $class_name, 'is-style-bootstrap' )
				|| false !== strpos( $class_name, 'wp-block-columns--constrained' );
		case 'core/column':
			return false !== strpos( $class_name, 'wp-block-column--column' );
		case 'core/cover':
			if (
				false !== strpos( $class_name, 'cover-negative-margin-left' ) ||
				false !== strpos( $class_name, 'cover-negative-margin-right' )
			) {
				return true;
			}

			$bleed_cover = isset( $attrs['bleedCover'] ) && is_string( $attrs['bleedCover'] )
				? $attrs['bleedCover']
				: '';
			return false !== strpos( $bleed_cover, 'cover-negative-margin' );
		case 'core/video':
			return ! empty( $attrs['useCustomPlayButton'] );
		case 'fs-blocks/dynamic-picture-block':
		case 'fs-blocks/carousel':
			return true;
		default:
			return false;
	}
}

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

	if ( fs_core_enhancements_block_needs_frontend_style( $block_name, $attrs ) ) {
		fs_core_enhancements_enqueue_frontend_style();
	}

	if ( fs_core_enhancements_block_needs_utilities( $attrs ) ) {
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
