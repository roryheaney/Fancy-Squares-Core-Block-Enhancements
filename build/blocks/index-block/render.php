<?php
/**
 * Render callback for the Index Block.
 *
 * Notes:
 * - Classes are supplied by the editor via `additionalClasses`.
 * - get_block_wrapper_attributes() handles color/gradient classes + inline styles.
 *
 * @var array $attributes Block attributes.
 */

defined( 'ABSPATH' ) || exit;

// Ensure blockIndex is set and is a number.
$block_index = isset( $attributes['blockIndex'] )
	? (int) $attributes['blockIndex']
	: -1;

// Base classes plus any editor-generated utility classes.
$classes = [ 'wp-block-fs-blocks-index-block', 'custom-index-block' ];
if (
	! empty( $attributes['additionalClasses'] ) &&
	is_array( $attributes['additionalClasses'] )
) {
	$classes = array_merge( $classes, $attributes['additionalClasses'] );
}
$classes = array_map( 'sanitize_html_class', $classes );

$wrapper_attributes = get_block_wrapper_attributes(
	[
		'class' => implode( ' ', $classes ),
		'data-block-index' => $block_index,
	]
);
?>
<div <?php echo $wrapper_attributes; ?>>
	<span class="index-number"><?php echo esc_html( $block_index ); ?></span>
</div>
