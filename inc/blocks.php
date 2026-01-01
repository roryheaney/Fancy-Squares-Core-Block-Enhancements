<?php
/**
 * Block registration for Fancy Squares Core Block Enhancements.
 */

defined( 'ABSPATH' ) || exit;

if ( ! defined( 'FS_CORE_ENHANCEMENTS_OPTION_ENABLED_BLOCKS' ) ) {
	define( 'FS_CORE_ENHANCEMENTS_OPTION_ENABLED_BLOCKS', 'fs_core_enhancements_enabled_blocks' );
}

function fs_core_enhancements_register_interactivity_module() {
	if ( ! function_exists( 'wp_register_script_module' ) ) {
		return;
	}

	if ( wp_script_is( '@wordpress/interactivity', 'registered' ) ) {
		return;
	}

	wp_register_script_module(
		'@wordpress/interactivity',
		includes_url( 'js/dist/interactivity.min.js' ),
		[],
		get_bloginfo( 'version' )
	);
}
add_action(
	'init',
	'fs_core_enhancements_register_interactivity_module',
	5
);

function fs_core_enhancements_get_custom_blocks() {
	$base_dir = dirname( __DIR__ );
	$build_dir = $base_dir . '/build/blocks';
	$src_dir = $base_dir . '/src/blocks';

	$get_block_path = static function( $slug ) use ( $build_dir, $src_dir ) {
		$build_path = $build_dir . '/' . $slug;
		if ( file_exists( $build_path . '/block.json' ) ) {
			return $build_path;
		}

		return $src_dir . '/' . $slug;
	};

	return [
		'index-block' => [
			'name' => 'fs-blocks/index-block',
			'label' => __( 'Index Block', 'fancy-squares-core-enhancements' ),
			'description' => __(
				'Shows the column index inside core/columns.',
				'fancy-squares-core-enhancements'
			),
			'path' => $get_block_path( 'index-block' ),
		],
		'content-wrapper' => [
			'name' => 'fs-blocks/content-wrapper',
			'label' => __(
				'Content Wrapper',
				'fancy-squares-core-enhancements'
			),
			'description' => __(
				'Adds a wrapper with selectable HTML tag and utility classes.',
				'fancy-squares-core-enhancements'
			),
			'path' => $get_block_path( 'content-wrapper' ),
		],
		'picture-block' => [
			'name' => 'fs-blocks/dynamic-picture-block',
			'label' => __(
				'Dynamic Picture Block',
				'fancy-squares-core-enhancements'
			),
			'description' => __(
				'Outputs a picture element with responsive image sources.',
				'fancy-squares-core-enhancements'
			),
			'path' => $get_block_path( 'picture-block' ),
		],
		'alert' => [
			'name' => 'fs-blocks/alert',
			'label' => __( 'Alert', 'fancy-squares-core-enhancements' ),
			'description' => __(
				'Bootstrap-style alert with selectable variant and spacing.',
				'fancy-squares-core-enhancements'
			),
			'path' => $get_block_path( 'alert' ),
		],
		'tabs-interactive' => [
			'name' => 'fs-blocks/tabs-interactive',
			'label' => __(
				'Tabs (Interactive)',
				'fancy-squares-core-enhancements'
			),
			'description' => __(
				'Interactivity API-driven tabs with local state.',
				'fancy-squares-core-enhancements'
			),
			'path' => $get_block_path( 'tabs-interactive' ),
		],
		'accordion-interactive' => [
			'name' => 'fs-blocks/accordion-interactive',
			'label' => __(
				'Accordion (Interactive)',
				'fancy-squares-core-enhancements'
			),
			'description' => __(
				'Interactivity API-driven accordion with Bootstrap 5-quality animations.',
				'fancy-squares-core-enhancements'
			),
			'path' => $get_block_path( 'accordion-interactive' ),
		],
		'carousel' => [
			'name' => 'fs-blocks/carousel',
			'label' => __( 'Carousel', 'fancy-squares-core-enhancements' ),
			'description' => __(
				'Carousel container with optional navigation and autoplay.',
				'fancy-squares-core-enhancements'
			),
			'path' => $get_block_path( 'carousel' ),
		],
	];
}

function fs_core_enhancements_get_enabled_blocks() {
	$enabled = get_option( FS_CORE_ENHANCEMENTS_OPTION_ENABLED_BLOCKS, [] );
	if ( ! is_array( $enabled ) ) {
		return [];
	}

	$blocks = fs_core_enhancements_get_custom_blocks();
	$valid = [];

	foreach ( $enabled as $slug ) {
		$slug = sanitize_key( $slug );
		if ( isset( $blocks[ $slug ] ) ) {
			$valid[] = $slug;
		}
	}

	return array_values( array_unique( $valid ) );
}

function fs_core_enhancements_register_blocks() {
	$blocks = fs_core_enhancements_get_custom_blocks();
	$enabled = fs_core_enhancements_get_enabled_blocks();

	foreach ( $enabled as $slug ) {
		if ( isset( $blocks[ $slug ]['path'] ) ) {
			register_block_type( $blocks[ $slug ]['path'] );
		}
		if ( 'tabs-interactive' === $slug ) {
			$tab_item_path =
				fs_core_enhancements_get_custom_blocks()['tabs-interactive']['path'];
			$tab_item_path = str_replace(
				'/tabs-interactive',
				'/tab-item-interactive',
				$tab_item_path
			);
			register_block_type( $tab_item_path );
		}
		if ( 'accordion-interactive' === $slug ) {
			$accordion_item_path =
				fs_core_enhancements_get_custom_blocks()['accordion-interactive']['path'];
			$accordion_item_path = str_replace(
				'/accordion-interactive',
				'/accordion-item-interactive',
				$accordion_item_path
			);
			register_block_type( $accordion_item_path );
		}
		if ( 'carousel' === $slug ) {
			$carousel_path =
				fs_core_enhancements_get_custom_blocks()['carousel']['path'];
			$carousel_slide_path = str_replace(
				'/carousel',
				'/carousel-slide',
				$carousel_path
			);
			register_block_type( $carousel_slide_path );
		}
	}
}
add_action( 'init', 'fs_core_enhancements_register_blocks' );

/**
 * Fix accordion-interactive activeItem before rendering.
 * This ensures providesContext passes the correct value to children.
 */
function fs_core_enhancements_fix_accordion_active_item( $parsed_block, $source_block, $parent_block ) {
	// Only process accordion-interactive blocks
	if ( 'fs-blocks/accordion-interactive' !== $parsed_block['blockName'] ) {
		return $parsed_block;
	}

	$open_first_item = ! empty( $parsed_block['attrs']['openFirstItem'] );
	
	// activeItem is transient editor state - compute correct value for frontend
	$active_item = '';
	if ( $open_first_item && ! empty( $parsed_block['innerBlocks'] ) ) {
		foreach ( $parsed_block['innerBlocks'] as $inner_block ) {
			if ( 'fs-blocks/accordion-item-interactive' === $inner_block['blockName'] ) {
				$active_item = isset( $inner_block['attrs']['itemId'] ) ? $inner_block['attrs']['itemId'] : '';
				break;
			}
		}
	}

	// Override the saved activeItem with the computed value
	$parsed_block['attrs']['activeItem'] = $active_item;

	return $parsed_block;
}
add_filter( 'render_block_data', 'fs_core_enhancements_fix_accordion_active_item', 10, 3 );
