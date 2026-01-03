<?php
/**
 * Render callback for the Accordion Item Interactive block.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block inner content (InnerBlocks).
 * @param WP_Block $block      Block instance.
 */

defined( 'ABSPATH' ) || exit;

$item_id = isset( $attributes['itemId'] ) ? sanitize_html_class( $attributes['itemId'] ) : '';
$title   = isset( $attributes['title'] ) ? $attributes['title'] : '';

if ( '' === $item_id ) {
	$item_id = wp_unique_id( 'accordion-item-' );
}

$trigger_id = 'fs-accordion-trigger-' . $item_id;
$content_id = 'fs-accordion-content-' . $item_id;

// Get base wrapper attributes (is-active class added via render_block filter)
$wrapper_attributes = get_block_wrapper_attributes();

// Item-level context with only itemId
$item_context = [
	'itemId' => $item_id,
];

?>
<div
	<?php echo $wrapper_attributes; ?>
	data-wp-interactive="fancySquaresAccordionInteractive"
	<?php echo wp_interactivity_data_wp_context( $item_context ); ?>
	data-wp-class--is-active="state.isActive"
>
	<h3 class="fs-accordion__header">
		<button
			id="<?php echo esc_attr( $trigger_id ); ?>"
			type="button"
			class="fs-accordion__trigger"
			aria-controls="<?php echo esc_attr( $content_id ); ?>"
			aria-expanded="false"
			data-wp-bind--aria-expanded="state.isActive"
			data-wp-on-async--click="actions.toggleItem"
			data-wp-on--keydown="actions.handleKeydown"
		>
			<span><?php echo wp_kses_post( $title ); ?></span>
		</button>
	</h3>

	<div
		id="<?php echo esc_attr( $content_id ); ?>"
		class="fs-accordion__content collapse"
		role="region"
		aria-labelledby="<?php echo esc_attr( $trigger_id ); ?>"
		aria-hidden="true"
		data-wp-bind--aria-hidden="!state.isActive"
		data-item-id="<?php echo esc_attr( $item_id ); ?>"
	>
		<div class="fs-accordion__body">
			<?php echo $content; ?>
		</div>
	</div>
</div>
