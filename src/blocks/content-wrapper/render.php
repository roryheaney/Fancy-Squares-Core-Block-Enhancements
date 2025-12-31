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

$single_class = isset( $attributes['singularSelectClass'] )
	? sanitize_html_class( $attributes['singularSelectClass'] )
	: '';

$classes = [];
if (
	! empty( $attributes['additionalClasses'] ) &&
	is_array( $attributes['additionalClasses'] )
) {
	$classes = $attributes['additionalClasses'];
}

if ( '' !== $single_class && ! in_array( $single_class, $classes, true ) ) {
	$classes[] = $single_class;
}

$classes = array_map( 'sanitize_html_class', $classes );
$wrapper_attributes = get_block_wrapper_attributes(
	[
		'class' => implode( ' ', $classes ),
	]
);
?>
<<?php echo esc_attr( $element_tag ); ?> <?php echo $wrapper_attributes; ?>>
	<?php echo $content; ?>
</<?php echo esc_attr( $element_tag ); ?>>
