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

// Get parent context for active state
$parent_context = $block->context;
$active_item = isset( $parent_context['fs-blocks/accordion-interactive/activeItem'] )
	? $parent_context['fs-blocks/accordion-interactive/activeItem']
	: '';
$is_active = $active_item === $item_id;

$trigger_id = 'fs-accordion-trigger-' . $item_id;
$content_id = 'fs-accordion-content-' . $item_id;

// Build initial classes
$wrapper_classes = 'fs-accordion__item';
if ( $is_active ) {
	$wrapper_classes .= ' is-active';
}

// Add inline style to prevent FOUC for active items
$inline_style = '';
if ( $is_active ) {
	$inline_style = ' style="--accordion-content-height: auto; --accordion-content-opacity: 1;"';
}
?>
<div
	class="<?php echo esc_attr( $wrapper_classes ); ?>"<?php echo $inline_style; ?>
	data-wp-context='<?php echo wp_json_encode( [ 'itemId' => $item_id ] ); ?>'
>
	<h3 class="fs-accordion__header">
		<button
			id="<?php echo esc_attr( $trigger_id ); ?>"
			type="button"
			class="fs-accordion__trigger"
			aria-controls="<?php echo esc_attr( $content_id ); ?>"
			aria-expanded="<?php echo $is_active ? 'true' : 'false'; ?>"
			data-wp-bind--aria-expanded="state.ariaExpanded"
			data-wp-on--click="actions.toggleItem"
			data-wp-on--keydown="actions.handleKeydown"
		>
			<span><?php echo wp_kses_post( $title ); ?></span>
		</button>
	</h3>

	<div
		id="<?php echo esc_attr( $content_id ); ?>"
		class="fs-accordion__content"
		role="region"
		aria-labelledby="<?php echo esc_attr( $trigger_id ); ?>"
		aria-hidden="<?php echo $is_active ? 'false' : 'true'; ?>"
		data-wp-bind--aria-hidden="state.ariaHidden"
	>
		<?php echo $content; ?>
	</div>
</div>
