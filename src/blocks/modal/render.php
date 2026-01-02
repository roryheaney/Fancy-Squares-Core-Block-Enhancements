<?php
/**
 * Render callback for the Modal block.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block inner content.
 * @param WP_Block $block      Block instance.
 */

defined( 'ABSPATH' ) || exit;

$modal_id = isset( $attributes['modalId'] ) ? sanitize_html_class( $attributes['modalId'] ) : '';
if ( empty( $modal_id ) ) {
	$modal_id = wp_unique_id( 'modal-' );
}

$size = isset( $attributes['size'] ) ? $attributes['size'] : 'default';
$centered = isset( $attributes['centered'] ) && $attributes['centered'];
$scrollable = isset( $attributes['scrollable'] ) && $attributes['scrollable'];
$static_backdrop = isset( $attributes['staticBackdrop'] ) && $attributes['staticBackdrop'];
$close_on_escape = ! isset( $attributes['closeOnEscape'] ) || $attributes['closeOnEscape'];
$show_header = ! isset( $attributes['showHeader'] ) || $attributes['showHeader'];
$title = isset( $attributes['title'] ) ? $attributes['title'] : __( 'Modal Title', 'fancy-squares-core-enhancements' );

// Build wrapper classes
$classes = [ 'fs-modal', 'fade', 'wp-block-fs-blocks-modal' ];

if (
	! empty( $attributes['additionalClasses'] ) &&
	is_array( $attributes['additionalClasses'] )
) {
	$classes = array_merge( $classes, $attributes['additionalClasses'] );
}

$classes = array_map( 'sanitize_html_class', $classes );

// Build dialog classes with fs- prefix
$dialog_classes = [ 'fs-modal-dialog' ];
if ( $size !== 'default' ) {
	$dialog_classes[] = 'fs-modal-' . sanitize_html_class( $size );
}
if ( $centered ) {
	$dialog_classes[] = 'fs-modal-dialog-centered';
}
if ( $scrollable ) {
	$dialog_classes[] = 'fs-modal-dialog-scrollable';
}

$dialog_class_string = implode( ' ', $dialog_classes );

// Initial context
$initial_context = [
	'modalId' => $modal_id,
	'isOpen' => false,
	'staticBackdrop' => $static_backdrop,
	'closeOnEscape' => $close_on_escape,
];

$wrapper_attributes = get_block_wrapper_attributes( [
	'class' => implode( ' ', $classes ),
	'id' => $modal_id,
	'tabindex' => '-1',
	'aria-labelledby' => $modal_id . '-label',
	'aria-modal' => 'true',
	'role' => 'dialog',
] );
?>
<div
	<?php echo $wrapper_attributes; ?>
	data-wp-interactive="fancySquaresModal"
	<?php echo wp_interactivity_data_wp_context( $initial_context ); ?>
	data-wp-class--show="state.currentModalId === context.modalId"
	data-wp-bind--aria-hidden="state.currentModalId === context.modalId ? 'false' : 'true'"
	data-wp-on--keydown="actions.handleKeydown"
>
	<!-- Backdrop -->
	<div
		class="fs-modal-backdrop fade"
		data-wp-class--show="state.currentModalId === context.modalId"
		data-wp-on--click="actions.handleBackdropClick"
	></div>

	<!-- Dialog -->
	<div class="<?php echo esc_attr( $dialog_class_string ); ?>">
		<div class="fs-modal-content">
			<?php if ( $show_header ) : ?>
				<div class="fs-modal-header">
					<h5 class="fs-modal-title" id="<?php echo esc_attr( $modal_id . '-label' ); ?>">
						<?php echo esc_html( $title ); ?>
					</h5>
					<button
						type="button"
						class="fs-btn-close"
						data-wp-on--click="actions.closeModal"
						aria-label="<?php echo esc_attr__( 'Close', 'fancy-squares-core-enhancements' ); ?>"
					></button>
				</div>
			<?php else : ?>
				<!-- Floating close button when header is hidden -->
				<div class="fs-modal-close-floating">
					<button
						type="button"
						class="fs-btn-close"
						data-wp-on--click="actions.closeModal"
						aria-label="<?php echo esc_attr__( 'Close', 'fancy-squares-core-enhancements' ); ?>"
					></button>
				</div>
			<?php endif; ?>

			<div class="fs-modal-body">
				<?php echo $content; ?>
			</div>
		</div>
	</div>
</div>
