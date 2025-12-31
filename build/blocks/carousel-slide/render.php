<?php
/**
 * Render callback for the Carousel Slide block.
 *
 * Note: The parent Carousel block controls the Swiper wrapper markup.
 *
 * @param array  $attributes Block attributes.
 * @param string $content    Inner blocks content.
 */

defined( 'ABSPATH' ) || exit;

$vertical_align = isset( $attributes['verticalAlign'] )
	? sanitize_html_class( $attributes['verticalAlign'] )
	: '';

$classes = [ 'wp-block-fs-blocks-carousel-slide', 'swiper-slide' ];
if ( '' !== $vertical_align ) {
	$classes[] = 'are-vertically-aligned-' . $vertical_align;
}

$wrapper_attributes = get_block_wrapper_attributes(
	[
		'class' => implode( ' ', $classes ),
		'aria-roledescription' => 'slide',
	]
);
?>
<div <?php echo $wrapper_attributes; ?>>
	<?php echo $content; ?>
</div>
