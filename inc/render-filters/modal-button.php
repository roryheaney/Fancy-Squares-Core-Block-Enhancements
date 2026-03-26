<?php
/**
 * Button modal render filter for Fancy Squares Core Block Enhancements.
 */

defined( 'ABSPATH' ) || exit;

/**
 * Convert the tagged modal trigger anchor into a button element.
 *
 * WP_HTML_Tag_Processor can modify attributes but cannot rename a tag.
 * This performs a bounded replacement only for the processor-tagged anchor.
 *
 * @param string $html HTML containing the tagged trigger anchor.
 *
 * @return string
 */
function fs_core_enhancements_convert_modal_trigger_anchor_to_button( $html ) {
	if ( '' === $html || false === strpos( $html, 'data-fs-modal-trigger="1"' ) ) {
		return $html;
	}

	$trigger_attribute_offset = strpos( $html, 'data-fs-modal-trigger="1"' );
	if ( false === $trigger_attribute_offset ) {
		return $html;
	}

	$before_trigger = substr( $html, 0, $trigger_attribute_offset );
	$opening_tag_start = strripos( $before_trigger, '<a' );
	if ( false === $opening_tag_start ) {
		return $html;
	}

	$opening_tag_end = strpos( $html, '>', $trigger_attribute_offset );
	if ( false === $opening_tag_end ) {
		return $html;
	}

	$opening_length = $opening_tag_end - $opening_tag_start + 1;
	$opening_tag = substr( $html, $opening_tag_start, $opening_length );

	$clean_opening_tag = str_replace(
		[ ' data-fs-modal-trigger="1"', " data-fs-modal-trigger='1'", ' data-fs-modal-trigger' ],
		'',
		$opening_tag
	);

	if ( 0 !== stripos( $clean_opening_tag, '<a' ) ) {
		return $html;
	}

	$button_opening_tag = '<button' . substr( $clean_opening_tag, 2 );

	$html = substr_replace(
		$html,
		$button_opening_tag,
		$opening_tag_start,
		$opening_length
	);

	$search_offset = $opening_tag_start + strlen( $button_opening_tag );
	$closing_offset = stripos( $html, '</a>', $search_offset );
	if ( false === $closing_offset ) {
		return $html;
	}

	return substr_replace( $html, '</button>', $closing_offset, 4 );
}

/**
 * Convert core/button links to modal triggers when enabled.
 *
 * @param string $block_content Rendered HTML of the block.
 * @param array  $block         Parsed block data.
 *
 * @return string Modified block HTML.
 */
function fs_core_enhancements_button_modal_render( $block_content, $block ) {
	if (
		isset( $block['blockName'] ) &&
		'core/button' === $block['blockName'] &&
		! empty( $block['attrs']['triggerModal'] ) &&
		! empty( $block['attrs']['modalId'] )
	) {
		$processor = new WP_HTML_Tag_Processor( $block_content );

		if ( $processor->next_tag( 'a' ) ) {
			$modal_id = sanitize_html_class( $block['attrs']['modalId'] );

			$processor->set_attribute( 'data-wp-interactive', 'fancySquaresModal' );
			$processor->set_attribute(
				'data-wp-context',
				wp_json_encode( [ 'modalId' => $modal_id ] )
			);
			$processor->set_attribute( 'data-wp-on--click', 'actions.openModal' );
			$processor->set_attribute(
				'data-wp-bind--aria-expanded',
				'state.currentModalId === context.modalId'
			);
			$processor->set_attribute( 'data-fs-modal-trigger', '1' );

			$processor->set_attribute( 'aria-controls', $modal_id );
			$processor->set_attribute( 'aria-haspopup', 'dialog' );
			$processor->set_attribute( 'aria-expanded', 'false' );
			$processor->set_attribute( 'type', 'button' );
			$processor->add_class( 'wp-element-button--modal-btn' );

			$processor->remove_attribute( 'href' );
			$processor->remove_attribute( 'target' );
			$processor->remove_attribute( 'rel' );

			$block_content = $processor->get_updated_html();
			$block_content =
				fs_core_enhancements_convert_modal_trigger_anchor_to_button(
					$block_content
				);
		}
	}

	return $block_content;
}
add_filter( 'render_block_core/button', 'fs_core_enhancements_button_modal_render', 10, 2 );
