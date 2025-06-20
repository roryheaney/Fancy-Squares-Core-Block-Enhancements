<?php
/**
 * Lazy load video filter for Fancy Squares Core Block Enhancements.
 */

defined( 'ABSPATH' ) || exit;

/**
 * Add lazy loading data attributes to core/video blocks.
 *
 * @param string $block_content Rendered HTML of the block.
 * @param array  $block         Parsed block data.
 *
 * @return string Modified block HTML.
 */
function fs_core_enhancements_lazy_video_render( $block_content, $block ) {
    if (
        isset( $block['blockName'] ) &&
        'core/video' === $block['blockName'] &&
        ! empty( $block['attrs']['lazyLoadVideo'] )
    ) {
        $processor = new WP_HTML_Tag_Processor( $block_content );

        if ( $processor->next_tag( 'video' ) ) {
            $src = $processor->get_attribute( 'src' );

            if ( $src ) {
                $processor->set_attribute( 'data-fs-lazy-video', 'true' );
                $processor->set_attribute( 'data-src', $src );
                $processor->set_attribute( 'src', '' );
            }

            $block_content = $processor->get_updated_html();
        }
    }

    return $block_content;
}
add_filter( 'render_block_core/video', 'fs_core_enhancements_lazy_video_render', 10, 2 );
