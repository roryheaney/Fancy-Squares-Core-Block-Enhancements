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

	$lazy_video_requested = ! empty( $block['attrs']['lazyLoadVideo'] );
	$disable_forced_lazy_loading = ! empty( $block['attrs']['disableForcedLazyLoading'] );
	$process_image = ! $disable_forced_lazy_loading;

	$tags = new WP_HTML_Tag_Processor( $block_content );
	$found_video = false;
	$found_img = false;

	while ( $tags->next_tag() ) {
		$tag_name = $tags->get_tag();

		if (
			! $found_video
			&& $lazy_video_requested
			&& 'VIDEO' === $tag_name
			&& $tags->has_class( 'wp-block-cover__video-background' )
		) {
			$src = $tags->get_attribute( 'src' );
			if ( $src ) {
				$tags->set_attribute( 'data-fs-lazy-video', 'true' );
				$tags->set_attribute( 'data-src', $src );
				$tags->set_attribute( 'src', '' );
			}
			$found_video = true;
		}

		if (
			! $found_img
			&& $process_image
			&& 'IMG' === $tag_name
			&& $tags->has_class( 'wp-block-cover__image-background' )
		) {
			$tags->set_attribute( 'loading', 'lazy' );
			$tags->set_attribute( 'decoding', 'async' );
			$found_img = true;
		}

		$video_done = ! $lazy_video_requested || $found_video;
		$image_done = ! $process_image || $found_img;
		if ( $video_done && $image_done ) {
			break;
		}
	}

	return $tags->get_updated_html();
}
add_filter( 'render_block_core/cover', 'fs_core_enhancements_cover_render', 10, 2 );
