<?php
/**
 * Render callback for the Content Showcase block.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block inner content.
 * @param WP_Block $block      Block instance.
 */

defined( 'ABSPATH' ) || exit;

$block_id_source = isset( $attributes['blockId'] ) ? $attributes['blockId'] : '';
$block_id = '' !== $block_id_source
	? sanitize_html_class( $block_id_source )
	: wp_unique_id( 'showcase-' );

$layout_type = isset( $attributes['layoutType'] )
	? sanitize_key( $attributes['layoutType'] )
	: 'two-column';
$hide_gallery = ! empty( $attributes['hideGalleryOnMobile'] );
$source_event_name = isset( $attributes['sourceEventName'] )
	? sanitize_text_field( $attributes['sourceEventName'] )
	: 'shown.fs.accordion';

$classes = [ 'fs-content-showcase', 'd-block' ];
if ( $layout_type ) {
	$classes[] = 'fs-content-showcase--layout-' . $layout_type;
}
if ( $hide_gallery ) {
	$classes[] = 'fs-content-showcase--hide-gallery-mobile';
}

if (
	! empty( $attributes['additionalClasses'] ) &&
	is_array( $attributes['additionalClasses'] )
) {
	foreach ( $attributes['additionalClasses'] as $class_name ) {
		if ( is_string( $class_name ) && '' !== $class_name ) {
			$classes[] = sanitize_html_class( $class_name );
		}
	}
}

$accordion_data = function_exists( 'fs_showcase_context_stack_peek' )
	? fs_showcase_context_stack_peek()
	: null;

if (
	! is_array( $accordion_data ) &&
	isset( $block->parsed_block ) &&
	is_array( $block->parsed_block ) &&
	function_exists( 'fs_showcase_collect_accordion_data' )
) {
	$accordion_data = fs_showcase_collect_accordion_data( $block->parsed_block );
}

if ( ! is_array( $accordion_data ) ) {
	$accordion_data = [
		'itemsData' => [],
		'activeItemId' => '',
	];
}

$items_data = $accordion_data['itemsData'] ?? [];
$active_item_id = $accordion_data['activeItemId'] ?? '';

$initial_context = [
	'blockId' => $block_id,
	'activeItemId' => $active_item_id,
	'itemsData' => $items_data,
	'sourceEventName' => $source_event_name,
];

$wrapper_attributes = get_block_wrapper_attributes(
	[
		'class' => implode( ' ', array_filter( $classes ) ),
	]
);
?>
<div
	<?php echo $wrapper_attributes; ?>
	data-wp-interactive="fancySquaresContentShowcase"
	<?php echo wp_interactivity_data_wp_context( $initial_context ); ?>
	data-wp-init--showcase="callbacks.initShowcase"
>
	<?php echo $content; ?>
</div>