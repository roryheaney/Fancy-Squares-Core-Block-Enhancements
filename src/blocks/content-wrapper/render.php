<?php
/**
 * Render callback for the Content Wrapper block.
 *
 * Notes:
 * - Classes are supplied by the editor via `additionalClasses`.
 * - get_block_wrapper_attributes() handles color/gradient classes + inline styles.
 *
 * @param array  $attributes Block attributes.
 * @param string $content    Inner block markup.
 */

defined( 'ABSPATH' ) || exit;

$element_tag = isset( $attributes['elementTag'] ) ? $attributes['elementTag'] : 'div';
if ( 'section' !== $element_tag ) {
	$element_tag = 'div';
}

$classes = fs_core_enhancements_get_sanitized_classes( [], $attributes );

$wrapper_attributes = get_block_wrapper_attributes(
	[
		'class' => implode( ' ', $classes ),
	]
);
?>
<<?php echo esc_attr( $element_tag ); ?> <?php echo $wrapper_attributes; ?>>
	<?php echo $content; ?>
</<?php echo esc_attr( $element_tag ); ?>>
