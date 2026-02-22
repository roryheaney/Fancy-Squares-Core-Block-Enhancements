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

/**
 * Recursively find the first accordion block and collect media data from its items.
 *
 * @param WP_Block $block_instance Block instance to search.
 * @return array|null Array with keys: itemsData, activeItemId, or null if not found.
 */
$find_accordion_data = function( $block_instance ) use ( &$find_accordion_data ) {
	if ( 'fs-blocks/accordion-interactive' === $block_instance->name ) {
		$items_data = [];
		$first_item_id = '';
		$first_media_item_id = '';
		$accordion_opens_first = ! empty(
			$block_instance->attributes['openFirstItem']
		);

		foreach ( $block_instance->inner_blocks as $accordion_item ) {
			if ( 'fs-blocks/accordion-item-interactive' !== $accordion_item->name ) {
				continue;
			}

			$item_id = isset( $accordion_item->attributes['itemId'] )
				? sanitize_html_class( $accordion_item->attributes['itemId'] )
				: '';
			if ( '' === $item_id ) {
				continue;
			}

			if ( '' === $first_item_id ) {
				$first_item_id = $item_id;
			}

			$media_id = ! empty( $accordion_item->attributes['showcaseMediaId'] )
				? (int) $accordion_item->attributes['showcaseMediaId']
				: 0;

			if ( $media_id ) {
				$items_data[ $item_id ] = [
					'id' => $media_id,
					'hasMedia' => true,
				];

				if ( '' === $first_media_item_id ) {
					$first_media_item_id = $item_id;
				}
			} else {
				$items_data[ $item_id ] = [
					'hasMedia' => false,
				];
			}
		}

		$active_item_id = '';
		if (
			$accordion_opens_first &&
			'' !== $first_item_id &&
			! empty( $items_data[ $first_item_id ]['hasMedia'] )
		) {
			$active_item_id = $first_item_id;
		}
		if ( '' === $active_item_id ) {
			$active_item_id = $first_media_item_id;
		}

		return [
			'itemsData' => $items_data,
			'activeItemId' => $active_item_id,
		];
	}

	if ( ! empty( $block_instance->inner_blocks ) ) {
		foreach ( $block_instance->inner_blocks as $inner_block ) {
			$result = $find_accordion_data( $inner_block );
			if ( null !== $result ) {
				return $result;
			}
		}
	}

	return null;
};

$stack_context = function_exists( 'fs_showcase_context_stack_peek' )
	? fs_showcase_context_stack_peek()
	: null;
$accordion_data = is_array( $stack_context )
	? $stack_context
	: $find_accordion_data( $block );
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
