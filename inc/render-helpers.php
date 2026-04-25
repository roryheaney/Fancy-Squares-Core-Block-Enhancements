<?php
/**
 * Shared render helpers for Fancy Squares custom blocks.
 */

defined( 'ABSPATH' ) || exit;

function fs_core_enhancements_get_prefixed_block_id(
	$attributes,
	$prefix,
	$attribute_key = 'blockId'
) {
	$raw_id = '';
	if ( isset( $attributes[ $attribute_key ] ) ) {
		$raw_id = sanitize_html_class( (string) $attributes[ $attribute_key ] );
	}

	if ( '' === $raw_id ) {
		return wp_unique_id( $prefix );
	}

	return $prefix . $raw_id;
}

function fs_core_enhancements_get_sanitized_classes(
	array $base_classes,
	$attributes = []
) {
	$classes = $base_classes;

	if (
		! empty( $attributes['additionalClasses'] ) &&
		is_array( $attributes['additionalClasses'] )
	) {
		$classes = array_merge( $classes, $attributes['additionalClasses'] );
	}

	$classes = array_map( 'sanitize_html_class', $classes );
	$classes = array_filter(
		$classes,
		static function ( $value ) {
			return '' !== $value;
		}
	);

	return array_values( $classes );
}
