<?php
/**
 * Image block render filter for Fancy Squares Core Block Enhancements.
 */

defined( 'ABSPATH' ) || exit;

/**
 * Add lazy attributes to core/image blocks.
 *
 * @param string $block_content Rendered HTML of the block.
 * @param array  $block         Parsed block data.
 *
 * @return string Modified block HTML.
 */
function fs_core_enhancements_image_render( $block_content, $block ) {
    if (
        isset( $block['blockName'] ) &&
        'core/image' === $block['blockName']
    ) {
        $processor = new WP_HTML_Tag_Processor( $block_content );
        if ( $processor->next_tag( 'img' ) ) {
            $processor->set_attribute( 'loading', 'lazy' );
            $processor->set_attribute( 'decoding', 'async' );
            $block_content = $processor->get_updated_html();
        }
    }

    return $block_content;
}
add_filter( 'render_block_core/image', 'fs_core_enhancements_image_render', 10, 2 );
