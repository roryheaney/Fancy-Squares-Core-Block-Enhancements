<?php
/**
 * Lightbox interactivity filters.
 */

defined( 'ABSPATH' ) || exit;

/**
 * Add interactivity attributes to core/image blocks.
 *
 * @param string $block_content Rendered block HTML.
 * @param array  $block         Block data.
 *
 * @return string Modified HTML.
 */
function fs_core_enhancements_lightbox_image( $block_content, $block ) {
    if ( isset( $block['blockName'] ) && 'core/image' === $block['blockName'] ) {
        $class = $block['attrs']['className'] ?? '';
        if ( ! empty( $block['attrs']['enableLightbox'] ) || str_contains( $class, 'fs-enable-lightbox' ) ) {
            $processor = new WP_HTML_Tag_Processor( $block_content );
            if ( $processor->next_tag( 'img' ) ) {
                $processor->set_attribute( 'data-wp-interactive', 'fs/lightbox' );
                $processor->set_attribute( 'data-wp-on--click', 'callbacks.open' );
                $processor->add_class( 'fs-lightbox-img' );
                $block_content = $processor->get_updated_html();
            }
        }
    }

    return $block_content;
}
add_filter( 'render_block_core/image', 'fs_core_enhancements_lightbox_image', 10, 2 );

/**
 * Add interactivity attributes to images within core/gallery blocks.
 *
 * @param string $block_content Rendered block HTML.
 * @param array  $block         Block data.
 *
 * @return string Modified HTML.
 */
function fs_core_enhancements_lightbox_gallery( $block_content, $block ) {
    if ( isset( $block['blockName'] ) && 'core/gallery' === $block['blockName'] ) {
        $class = $block['attrs']['className'] ?? '';
        if ( ! empty( $block['attrs']['enableLightbox'] ) || str_contains( $class, 'fs-enable-lightbox' ) ) {
            $processor = new WP_HTML_Tag_Processor( $block_content );
            while ( $processor->next_tag( 'img' ) ) {
                $processor->set_attribute( 'data-wp-interactive', 'fs/lightbox' );
                $processor->set_attribute( 'data-wp-on--click', 'callbacks.open' );
                $processor->add_class( 'fs-lightbox-img' );
            }
            $block_content = $processor->get_updated_html();
        }
    }

    return $block_content;
}
add_filter( 'render_block_core/gallery', 'fs_core_enhancements_lightbox_gallery', 10, 2 );

/**
 * Output the lightbox overlay markup.
 */
function fs_core_enhancements_lightbox_overlay() {
    ?>
    <div class="fs-lightbox-overlay fade" data-wp-interactive="fs/lightbox" data-wp-class--show="state.phase === 'open' || state.phase === 'opened'" data-wp-on--click="actions.close" data-wp-effect="effects.handleEscape effects.manageBodyScroll effects.trapFocus">
        <div class="fs-lightbox-dialog" role="dialog" aria-modal="true" aria-hidden="false">
            <button type="button" class="fs-lightbox-close" aria-label="Close" data-wp-on--click="actions.close">&times;</button>
            <button type="button" class="fs-lightbox-prev" aria-label="Previous" data-wp-on--click="actions.prev">&lsaquo;</button>
            <img alt="" data-wp-bind--src="state.src" />
            <button type="button" class="fs-lightbox-next" aria-label="Next" data-wp-on--click="actions.next">&rsaquo;</button>
        </div>
    </div>
    <?php
}
add_action( 'wp_footer', 'fs_core_enhancements_lightbox_overlay' );
