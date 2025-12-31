<?php
/**
 * Render callback for the Alert block.
 *
 * @param array $attributes Block attributes.
 */

defined( 'ABSPATH' ) || exit;

$alert_content = isset( $attributes['alertContent'] )
	? $attributes['alertContent']
	: '';
$alert_style = isset( $attributes['alertStyle'] )
	? sanitize_html_class( $attributes['alertStyle'] )
	: '';

$classes = [ 'wp-block-fs-blocks-alert', 'alert' ];
if ( '' !== $alert_style ) {
	$classes[] = $alert_style;
}

if (
	! empty( $attributes['additionalClasses'] ) &&
	is_array( $attributes['additionalClasses'] )
) {
	$classes = array_merge( $classes, $attributes['additionalClasses'] );
}

$classes = array_map( 'sanitize_html_class', $classes );
$classes = array_filter(
	$classes,
	static function ( $value ) {
		return '' !== $value;
	}
);

$wrapper_attributes = get_block_wrapper_attributes(
	[
		'class' => implode( ' ', $classes ),
		'role' => 'alert',
	]
);
?>
<div <?php echo $wrapper_attributes; ?>>
	<?php echo wp_kses_post( $alert_content ); ?>
</div>
