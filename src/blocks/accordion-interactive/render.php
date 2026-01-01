<?php
/**
 * Render callback for the Accordion Interactive block.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block inner content (child accordion items already rendered).
 * @param WP_Block $block      Block instance.
 */

defined( 'ABSPATH' ) || exit;

$block_id = isset( $attributes['blockId'] ) ? $attributes['blockId'] : '';
$block_id = '' !== $block_id ? sanitize_html_class( $block_id ) : '';
if ( '' === $block_id ) {
	$block_id = wp_unique_id( 'fs-accordion-interactive-' );
} else {
	$block_id = 'fs-accordion-interactive-' . $block_id;
}

// activeItem has been corrected by render_block_data filter
// to respect openFirstItem setting (see inc/blocks.php)
$active_item = isset( $attributes['activeItem'] ) ? $attributes['activeItem'] : '';

$classes = [ 'fs-accordion', 'wp-block-fs-blocks-accordion-interactive' ];

if (
	! empty( $attributes['additionalClasses'] ) &&
	is_array( $attributes['additionalClasses'] )
) {
	$classes = array_merge( $classes, $attributes['additionalClasses'] );
}

$classes = array_map( 'sanitize_html_class', $classes );

$wrapper_attributes = get_block_wrapper_attributes( [ 'class' => implode( ' ', $classes ) ] );

$initial_context = [
	'blockId'    => $block_id,
	'activeItem' => $active_item,
	'collapsing' => null,
];
?>
<div
	<?php echo $wrapper_attributes; ?>
	data-wp-interactive="fancySquaresAccordionInteractive"
	<?php echo wp_interactivity_data_wp_context( $initial_context ); ?>
>
	<?php echo $content; ?>
</div>
