<?php
/**
 * Render callback for the Showcase Gallery block.
 *
 * @param array  $attributes Block attributes.
 * @param string $content    Block inner content (unused).
 */

defined( 'ABSPATH' ) || exit;

$stack_context = function_exists( 'fs_showcase_context_stack_peek' )
	? fs_showcase_context_stack_peek()
	: null;
$items_data = is_array( $stack_context ) && isset( $stack_context['itemsData'] )
	? $stack_context['itemsData']
	: [];

$transition_type = isset( $attributes['transitionType'] )
	? sanitize_key( $attributes['transitionType'] )
	: 'fade';
$transition_duration = isset( $attributes['transitionDuration'] )
	? (int) $attributes['transitionDuration']
	: 300;
$additional_classes = [];
if ( ! empty( $attributes['additionalClasses'] ) && is_array( $attributes['additionalClasses'] ) ) {
	foreach ( $attributes['additionalClasses'] as $class_name ) {
		if ( is_string( $class_name ) && '' !== $class_name ) {
			$additional_classes[] = sanitize_html_class( $class_name );
		}
	}
}

$items_list = [];
foreach ( $items_data as $item_id => $media_data ) {
	if ( empty( $media_data['hasMedia'] ) ) {
		continue;
	}
	$media_id = isset( $media_data['id'] ) ? (int) $media_data['id'] : 0;
	if ( ! $media_id ) {
		continue;
	}

	$media_type = wp_attachment_is( 'video', $media_id ) ? 'video' : 'image';
	$media_url = 'video' === $media_type
		? wp_get_attachment_url( $media_id )
		: wp_get_attachment_image_url( $media_id, 'large' );
	$media_alt = 'image' === $media_type
		? get_post_meta( $media_id, '_wp_attachment_image_alt', true )
		: '';
	$media_srcset = 'image' === $media_type
		? wp_get_attachment_image_srcset( $media_id, 'large' )
		: '';

	$items_list[] = [
		'itemId' => sanitize_html_class( $item_id ),
		'url' => $media_url ? $media_url : '',
		'type' => $media_type,
		'alt' => $media_alt,
		'srcset' => $media_srcset ? $media_srcset : '',
	];
}

$wrapper_attributes = get_block_wrapper_attributes(
	[
		'class' => implode(
			' ',
			array_filter(
				array_merge(
					[ 'fs-showcase-gallery' ],
					$additional_classes
				)
			)
		),
		'data-transition' => $transition_type,
		'data-transition-duration' => $transition_duration,
		'style' => sprintf(
			'--fs-showcase-transition: %dms;',
			max( 100, $transition_duration )
		),
		'aria-live' => 'polite',
	]
);
?>
<div
	<?php echo $wrapper_attributes; ?>
	data-wp-class--has-no-media="!state.hasActiveMedia"
>
	<?php if ( empty( $items_list ) ) : ?>
		<div class="showcase-gallery__placeholder">
			<p><?php esc_html_e( 'No media available for this showcase.', 'fancy-squares-core-enhancements' ); ?></p>
		</div>
	<?php else : ?>
		<?php foreach ( $items_list as $media ) : ?>
			<div
				class="showcase-gallery__media-wrapper"
				<?php
				echo wp_interactivity_data_wp_context(
					[
						'itemId' => $media['itemId'],
					]
				);
				?>
				data-wp-class--is-active="state.isActiveMedia"
			>
				<?php if ( 'video' === $media['type'] ) : ?>
					<video
						class="showcase-gallery__video"
						data-fs-lazy-video="true"
						data-src="<?php echo esc_url( $media['url'] ); ?>"
						autoplay
						muted
						loop
						playsinline
					></video>
				<?php else : ?>
					<img
						class="showcase-gallery__image"
						src="<?php echo esc_url( $media['url'] ); ?>"
						alt="<?php echo esc_attr( $media['alt'] ); ?>"
						srcset="<?php echo esc_attr( $media['srcset'] ); ?>"
						loading="lazy"
						decoding="async"
					/>
				<?php endif; ?>
			</div>
		<?php endforeach; ?>
	<?php endif; ?>
</div>
