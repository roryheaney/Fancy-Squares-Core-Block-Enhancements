<?php
/**
 * Render callback for the Dynamic Picture Block.
 *
 * Notes:
 * - If no default image is selected, a 1x1 filler image is used.
 * - Alt text and captions are pulled from the Media Library when available.
 * - Border and radius classes apply to the <img> element.
 *
 * @param array  $attributes Block attributes.
 * @param string $content    Inner block markup (unused).
 */

defined( 'ABSPATH' ) || exit;

$default_id  = ! empty( $attributes['defaultImageId'] ) ? (int) $attributes['defaultImageId'] : 0;
$default_url = ! empty( $attributes['defaultImageUrl'] ) ? $attributes['defaultImageUrl'] : '';

$small_url  = ! empty( $attributes['smallImageUrl'] ) ? $attributes['smallImageUrl'] : '';
$medium_url = ! empty( $attributes['mediumImageUrl'] ) ? $attributes['mediumImageUrl'] : '';
$large_url  = ! empty( $attributes['largeImageUrl'] ) ? $attributes['largeImageUrl'] : '';

$aspect     = ! empty( $attributes['aspectRatio'] ) ? $attributes['aspectRatio'] : 'none';
$filler_alt = ! empty( $attributes['fillerAlt'] ) ? $attributes['fillerAlt'] : '';

$border_class = ! empty( $attributes['borderClass'] ) && is_array( $attributes['borderClass'] )
	? $attributes['borderClass']
	: [];
$radius_class = ! empty( $attributes['borderRadiusClass'] ) && is_array( $attributes['borderRadiusClass'] )
	? $attributes['borderRadiusClass']
	: [];

if ( ! $default_url ) {
	$default_url = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
} else {
	$default_url = esc_url( $default_url );
}

$small_url  = esc_url( $small_url );
$medium_url = esc_url( $medium_url );
$large_url  = esc_url( $large_url );

$has_small  = ! empty( $small_url );
$has_medium = ! empty( $medium_url );
$has_large  = ! empty( $large_url );

$alt_text = '';
$caption  = '';

if ( $default_id ) {
	$alt_text = get_post_meta( $default_id, '_wp_attachment_image_alt', true ) ?: '';
	$caption  = wp_get_attachment_caption( $default_id ) ?: '';
} else {
	$alt_text = $filler_alt;
}

$figure_classes = [ 'wp-block-image', 'fs-block-image' ];
if ( $aspect && 'none' !== $aspect ) {
	$figure_classes[] = 'is-aspect-ratio-' . $aspect;
	$figure_classes[] = 'fs-block-image--has-aspect-ratio';
} else {
	$figure_classes[] = 'fs-block-image--no-aspect-ratio';
}
$figure_class = implode( ' ', array_map( 'sanitize_html_class', $figure_classes ) );
$wrapper_attributes = get_block_wrapper_attributes( [ 'class' => $figure_class ] );

$img_classes = [];
$img_style   = '';
if ( ! empty( $border_class ) ) {
	$img_classes = array_merge( $img_classes, $border_class );
	$img_style   = 'border-style: solid;';
}
if ( ! empty( $radius_class ) ) {
	$img_classes = array_merge( $img_classes, $radius_class );
}

$img_class_str = '';
if ( ! empty( $img_classes ) ) {
	$img_class_str = ' class="' . esc_attr( implode( ' ', array_map( 'sanitize_html_class', $img_classes ) ) ) . '"';
}

$img_style_str = '';
if ( $img_style ) {
	$img_style_str = ' style="' . esc_attr( $img_style ) . '"';
}

if ( ! $has_small && ! $has_medium && ! $has_large ) : ?>
	<figure <?php echo $wrapper_attributes; ?>>
		<img
			decoding="async"
			loading="lazy"
			src="<?php echo $default_url; ?>"
			alt="<?php echo esc_attr( $alt_text ); ?>" <?php echo $img_class_str . $img_style_str; ?> />
		<?php if ( ! empty( $caption ) ) : ?>
			<figcaption><?php echo wp_kses_post( $caption ); ?></figcaption>
		<?php endif; ?>
	</figure>
	<?php
	return;
endif;
?>

<figure <?php echo $wrapper_attributes; ?>>
	<picture>
		<?php if ( $has_small ) : ?>
			<source media="(max-width: 600px)" srcset="<?php echo $small_url; ?>" />
		<?php elseif ( $has_medium ) : ?>
			<source media="(max-width: 600px)" srcset="<?php echo $medium_url; ?>" />
		<?php endif; ?>

		<?php if ( $has_medium && $has_small ) : ?>
			<source
				media="(min-width: 601px) and (max-width: 1023px)"
				srcset="<?php echo $medium_url; ?>" />
		<?php elseif ( $has_medium && ! $has_small ) : ?>
			<source media="(max-width: 1023px)" srcset="<?php echo $medium_url; ?>" />
		<?php endif; ?>

		<?php if ( $has_large ) : ?>
			<source media="(min-width: 1024px)" srcset="<?php echo $large_url; ?>" />
		<?php elseif ( $has_medium ) : ?>
			<source media="(min-width: 1024px)" srcset="<?php echo $medium_url; ?>" />
		<?php endif; ?>

		<img
			decoding="async"
			loading="lazy"
			src="<?php echo $default_url; ?>"
			alt="<?php echo esc_attr( $alt_text ); ?>" <?php echo $img_class_str . $img_style_str; ?> />
	</picture>

	<?php if ( ! empty( $caption ) ) : ?>
		<figcaption><?php echo wp_kses_post( $caption ); ?></figcaption>
	<?php endif; ?>
</figure>
