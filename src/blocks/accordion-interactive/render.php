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

// Compute activeItem: if openFirstItem is true and activeItem is empty, use first child's itemId
$active_item = isset( $attributes['activeItem'] ) ? $attributes['activeItem'] : '';
$open_first_item = ! empty( $attributes['openFirstItem'] );

if ( $open_first_item && empty( $active_item ) && ! empty( $block->parsed_block['innerBlocks'] ) ) {
	foreach ( $block->parsed_block['innerBlocks'] as $inner_block ) {
		if ( 'fs-blocks/accordion-item-interactive' === $inner_block['blockName'] ) {
			$active_item = isset( $inner_block['attrs']['itemId'] ) ? $inner_block['attrs']['itemId'] : '';
			if ( $active_item ) {
				break;
			}
		}
	}
}

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
	'blockId'             => $block_id,
	'activeItem'          => $active_item,
	'transitioningItem'   => null,
	'closingItem'         => null,
	'transitionHeight'    => '',
	'closingHeight'       => '',
	'transitionDirection' => null,
];

// Define derived state for isActive (computed from context)
wp_interactivity_state( 'fancySquaresAccordionInteractive', [
	'isActive' => function() {
		$context = wp_interactivity_get_context();
		$active_item = $context['activeItem'] ?? '';
		$item_id = $context['itemId'] ?? '';
		return $active_item === $item_id;
	},
] );
?>
<div
	<?php echo $wrapper_attributes; ?>
	data-wp-interactive="fancySquaresAccordionInteractive"
	<?php echo wp_interactivity_data_wp_context( $initial_context ); ?>
>
	<?php echo $content; ?>
</div>
