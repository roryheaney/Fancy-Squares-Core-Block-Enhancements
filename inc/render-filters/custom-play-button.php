<?php
/**
 * Custom play button filter for Fancy Squares Core Block Enhancements.
 */

defined( 'ABSPATH' ) || exit;

/**
 * Insert an overlay play button before video tag when enabled.
 *
 * @param string $block_content Rendered HTML of the block.
 * @param array  $block         Parsed block data.
 *
 * @return string Modified block HTML.
 */
function fs_core_enhancements_custom_play_button_render( $block_content, $block ) {
    if (
        isset( $block['blockName'] ) &&
        'core/video' === $block['blockName'] &&
        ! empty( $block['attrs']['useCustomPlayButton'] )
    ) {
        // Extract poster attribute from the markup using WP_HTML_Tag_Processor.
        $poster = '';
        if ( class_exists( '\\WP_HTML_Tag_Processor' ) ) {
            $processor = new WP_HTML_Tag_Processor( $block_content );
            if ( $processor->next_tag( 'video' ) ) {
                $poster = esc_url( (string) $processor->get_attribute( 'poster' ) );
            }
        }

        if ( $poster ) {
            $overlay       = '<div class="fs-video-overlay" style="background-image:url(' . $poster . ');"><button aria-label="Play video"></button></div>';
            $block_content = preg_replace( '/(<video\b)/', $overlay . '$1', $block_content, 1 );
        }
    }

    return $block_content;
}
add_filter( 'render_block_core/video', 'fs_core_enhancements_custom_play_button_render', 10, 2 );
