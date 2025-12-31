<?php
/**
 * Block registration for Fancy Squares Core Block Enhancements.
 */

defined( 'ABSPATH' ) || exit;

if ( ! defined( 'FS_CORE_ENHANCEMENTS_OPTION_ENABLED_BLOCKS' ) ) {
	define( 'FS_CORE_ENHANCEMENTS_OPTION_ENABLED_BLOCKS', 'fs_core_enhancements_enabled_blocks' );
}

function fs_core_enhancements_get_custom_blocks() {
	return [
		'index-block' => [
			'name' => 'fs-blocks/index-block',
			'label' => __( 'Index Block', 'fancy-squares-core-enhancements' ),
			'description' => __(
				'Shows the column index inside core/columns.',
				'fancy-squares-core-enhancements'
			),
			'path' => dirname( __DIR__ ) . '/src/blocks/index-block',
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
			'path' => dirname( __DIR__ ) . '/src/blocks/content-wrapper',
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
			'path' => dirname( __DIR__ ) . '/src/blocks/picture-block',
		],
		'alert' => [
			'name' => 'fs-blocks/alert',
			'label' => __( 'Alert', 'fancy-squares-core-enhancements' ),
			'description' => __(
				'Bootstrap-style alert with selectable variant and spacing.',
				'fancy-squares-core-enhancements'
			),
			'path' => dirname( __DIR__ ) . '/src/blocks/alert',
		],
		'tabs' => [
			'name' => 'fs-blocks/tabs',
			'label' => __( 'Tabs', 'fancy-squares-core-enhancements' ),
			'description' => __(
				'Tabbed content container with nested tab items.',
				'fancy-squares-core-enhancements'
			),
			'path' => dirname( __DIR__ ) . '/src/blocks/tabs',
		],
		'carousel' => [
			'name' => 'fs-blocks/carousel',
			'label' => __( 'Carousel', 'fancy-squares-core-enhancements' ),
			'description' => __(
				'Carousel container with optional navigation and autoplay.',
				'fancy-squares-core-enhancements'
			),
			'path' => dirname( __DIR__ ) . '/src/blocks/carousel',
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
		if ( 'tabs' === $slug ) {
			register_block_type( dirname( __DIR__ ) . '/src/blocks/tab-item' );
		}
		if ( 'carousel' === $slug ) {
			register_block_type( dirname( __DIR__ ) . '/src/blocks/carousel-slide' );
		}
	}
}
add_action( 'init', 'fs_core_enhancements_register_blocks' );
