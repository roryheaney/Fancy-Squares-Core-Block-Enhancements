<?php
/**
 * Cover block render filter for Fancy Squares Core Block Enhancements.
 */

defined( 'ABSPATH' ) || exit;

/**
 * Add lazy loading to cover block media elements.
 *
 * @param string $block_content Rendered HTML of the block.
 * @param array  $block         Parsed block data.
 *
 * @return string Modified block HTML.
 */
function fs_core_enhancements_cover_render( $block_content, $block ) {
    if ( ! isset( $block['blockName'] ) || 'core/cover' !== $block['blockName'] ) {
        return $block_content;
    }

    $processor = new WP_HTML_Tag_Processor( $block_content );

    $found_video = false;
    $found_img   = false;

    while ( $processor->next_tag() ) {
        $tag = $processor->get_tag();
        if ( ! $found_video && 'VIDEO' === $tag && $processor->has_class( 'wp-block-cover__video-background' ) ) {
            if ( $src = $processor->get_attribute( 'src' ) ) {
                $processor->set_attribute( 'data-fs-lazy-video', 'true' );
                $processor->set_attribute( 'data-src', $src );
                $processor->set_attribute( 'src', '' );
            }
            $found_video = true;
        }

        if ( ! $found_img && 'IMG' === $tag && $processor->has_class( 'wp-block-cover__image-background' ) ) {
            $processor->set_attribute( 'loading', 'lazy' );
            $processor->set_attribute( 'decoding', 'async' );
            $found_img = true;
        }

        if ( $found_video || $found_img ) {
            break;
        }
    }

    return $processor->get_updated_html();
}
add_filter( 'render_block_core/cover', 'fs_core_enhancements_cover_render', 10, 2 );
