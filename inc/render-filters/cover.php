<?php
/**
 * Cover block render filter for Fancy Squares Core Block Enhancements.
 */

defined( 'ABSPATH' ) || exit;

/**
 * Normalize host names for provider matching.
 *
 * @param string $host URL host.
 *
 * @return string
 */
function fs_core_enhancements_cover_normalize_host( $host ) {
	$host = strtolower( (string) $host );
	return preg_replace( '/^www\./', '', $host );
}

/**
 * Extract a YouTube video ID from parsed URL parts.
 *
 * @param array $parsed_url Parsed URL from wp_parse_url.
 *
 * @return string
 */
function fs_core_enhancements_cover_extract_youtube_id( array $parsed_url ) {
	$path = isset( $parsed_url['path'] ) ? trim( (string) $parsed_url['path'], '/' ) : '';
	$segments = '' === $path ? [] : explode( '/', $path );

	$query_args = [];
	if ( ! empty( $parsed_url['query'] ) ) {
		parse_str( (string) $parsed_url['query'], $query_args );
	}

	if ( ! empty( $query_args['v'] ) && is_string( $query_args['v'] ) ) {
		return $query_args['v'];
	}

	if ( empty( $segments ) ) {
		return '';
	}

	if ( in_array( $segments[0], [ 'embed', 'shorts', 'live' ], true ) ) {
		return $segments[1] ?? '';
	}

	return $segments[0];
}

/**
 * Extract a Vimeo video ID from parsed URL parts.
 *
 * @param array $parsed_url Parsed URL from wp_parse_url.
 *
 * @return string
 */
function fs_core_enhancements_cover_extract_vimeo_id( array $parsed_url ) {
	$path = isset( $parsed_url['path'] ) ? trim( (string) $parsed_url['path'], '/' ) : '';
	$segments = '' === $path ? [] : explode( '/', $path );

	if ( empty( $segments ) ) {
		return '';
	}

	if ( 'video' === $segments[0] && ! empty( $segments[1] ) ) {
		return $segments[1];
	}

	for ( $index = count( $segments ) - 1; $index >= 0; $index-- ) {
		if ( preg_match( '/^\d+$/', $segments[ $index ] ) ) {
			return $segments[ $index ];
		}
	}

	return '';
}

/**
 * Build a normalized and constrained embed URL for supported providers.
 *
 * @param string $raw_url User-provided URL.
 *
 * @return string Empty string when invalid or unsupported.
 */
function fs_core_enhancements_cover_get_embed_background_url( $raw_url ) {
	$raw_url = trim( (string) $raw_url );
	if ( '' === $raw_url ) {
		return '';
	}

	$parsed_url = wp_parse_url( $raw_url );
	if ( ! is_array( $parsed_url ) ) {
		return '';
	}

	$scheme = isset( $parsed_url['scheme'] ) ? strtolower( (string) $parsed_url['scheme'] ) : '';
	if ( ! in_array( $scheme, [ 'http', 'https' ], true ) ) {
		return '';
	}

	$host = isset( $parsed_url['host'] ) ? fs_core_enhancements_cover_normalize_host( $parsed_url['host'] ) : '';
	if ( '' === $host ) {
		return '';
	}

	$youtube_hosts = [ 'youtube.com', 'm.youtube.com', 'youtube-nocookie.com', 'youtu.be' ];
	if ( in_array( $host, $youtube_hosts, true ) ) {
		$video_id = fs_core_enhancements_cover_extract_youtube_id( $parsed_url );
		if ( ! preg_match( '/^[A-Za-z0-9_-]{11}$/', $video_id ) ) {
			return '';
		}

		$params = [
			'autoplay' => '1',
			'mute' => '1',
			'loop' => '1',
			'playlist' => $video_id,
			'controls' => '0',
			'rel' => '0',
			'modestbranding' => '1',
			'playsinline' => '1',
		];

		return 'https://www.youtube-nocookie.com/embed/' .
			rawurlencode( $video_id ) .
			'?' .
			http_build_query( $params, '', '&', PHP_QUERY_RFC3986 );
	}

	if ( in_array( $host, [ 'vimeo.com', 'player.vimeo.com' ], true ) ) {
		$video_id = fs_core_enhancements_cover_extract_vimeo_id( $parsed_url );
		if ( ! preg_match( '/^\d+$/', $video_id ) ) {
			return '';
		}

		$params = [
			'autoplay' => '1',
			'muted' => '1',
			'loop' => '1',
			'background' => '1',
			'title' => '0',
			'byline' => '0',
			'portrait' => '0',
		];

		return 'https://player.vimeo.com/video/' .
			rawurlencode( $video_id ) .
			'?' .
			http_build_query( $params, '', '&', PHP_QUERY_RFC3986 );
	}

	return '';
}

/**
 * Build iframe markup for a cover background embed.
 *
 * @param string $embed_url Normalized embed URL.
 *
 * @return string
 */
function fs_core_enhancements_cover_get_embed_markup( $embed_url ) {
	$allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
	$style = 'position:absolute;inset:0;width:100%;height:100%;border:0;pointer-events:none;';

	return sprintf(
		'<iframe class="wp-block-cover__video-background fs-cover-embed-background" src="%1$s" allow="%2$s" tabindex="-1" aria-hidden="true" title="%3$s" frameborder="0" style="%4$s"></iframe>',
		esc_url( $embed_url ),
		esc_attr( $allow ),
		esc_attr__( 'Cover background embed', 'fancy-squares-core-enhancements' ),
		esc_attr( $style )
	);
}

/**
 * Insert embed markup before the tagged anchor element.
 *
 * @param string $html         HTML with temporary anchor attribute.
 * @param string $anchor_token Anchor token value.
 * @param string $embed_markup Embed iframe markup.
 *
 * @return string Empty string when insertion cannot be performed safely.
 */
function fs_core_enhancements_cover_insert_embed_before_anchor( $html, $anchor_token, $embed_markup ) {
	$needle = 'data-fs-cover-embed-anchor="' . $anchor_token . '"';
	$anchor_position = strpos( $html, $needle );

	if ( false === $anchor_position ) {
		return '';
	}

	if ( false !== strpos( $html, $needle, $anchor_position + strlen( $needle ) ) ) {
		return '';
	}

	$tag_start = strrpos( substr( $html, 0, $anchor_position ), '<' );

	if ( false === $tag_start ) {
		return '';
	}

	return substr( $html, 0, $tag_start ) . $embed_markup . substr( $html, $tag_start );
}

/**
 * Render cover markup with embedded background in place of native media.
 *
 * @param string $block_content Rendered HTML of the block.
 * @param string $embed_url     Normalized embed URL.
 *
 * @return string
 */
function fs_core_enhancements_cover_render_embed_background( $block_content, $embed_url ) {
	$anchor_token = 'fs-' . wp_generate_uuid4();
	$anchor_attribute = 'data-fs-cover-embed-anchor';

	$tags = new WP_HTML_Tag_Processor( $block_content );
	$found_anchor = false;

	while ( $tags->next_tag() ) {
		$tag_name = $tags->get_tag();

		if ( ! $found_anchor && $tags->has_class( 'wp-block-cover__inner-container' ) ) {
			$tags->set_attribute( $anchor_attribute, $anchor_token );
			$found_anchor = true;
		}

		if ( 'VIDEO' === $tag_name && $tags->has_class( 'wp-block-cover__video-background' ) ) {
			$tags->set_attribute( 'src', '' );
			$tags->set_attribute( 'preload', 'none' );
			$tags->set_attribute( 'aria-hidden', 'true' );
			$tags->set_attribute( 'tabindex', '-1' );
			$tags->set_attribute( 'hidden', 'hidden' );
		}

		if ( 'IMG' === $tag_name && $tags->has_class( 'wp-block-cover__image-background' ) ) {
			$tags->remove_attribute( 'src' );
			$tags->remove_attribute( 'srcset' );
			$tags->remove_attribute( 'sizes' );
			$tags->set_attribute( 'aria-hidden', 'true' );
			$tags->set_attribute( 'tabindex', '-1' );
			$tags->set_attribute( 'hidden', 'hidden' );
		}
	}

	if ( ! $found_anchor ) {
		return $block_content;
	}

	$with_anchor = $tags->get_updated_html();
	$with_embed = fs_core_enhancements_cover_insert_embed_before_anchor(
		$with_anchor,
		$anchor_token,
		fs_core_enhancements_cover_get_embed_markup( $embed_url )
	);

	if ( '' === $with_embed ) {
		return $block_content;
	}

	$cleanup_tags = new WP_HTML_Tag_Processor( $with_embed );
	while ( $cleanup_tags->next_tag() ) {
		if ( $cleanup_tags->get_attribute( $anchor_attribute ) === $anchor_token ) {
			$cleanup_tags->remove_attribute( $anchor_attribute );
			break;
		}
	}

	return $cleanup_tags->get_updated_html();
}

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

	$attrs = isset( $block['attrs'] ) && is_array( $block['attrs'] ) ? $block['attrs'] : [];
	$use_embed_background = ! empty( $attrs['useEmbedBackground'] );
	$embed_background_url = isset( $attrs['embedBackgroundUrl'] ) ? (string) $attrs['embedBackgroundUrl'] : '';

	if ( $use_embed_background ) {
		$embed_url = fs_core_enhancements_cover_get_embed_background_url( $embed_background_url );
		if ( '' !== $embed_url ) {
			return fs_core_enhancements_cover_render_embed_background( $block_content, $embed_url );
		}
	}

	$lazy_video_requested = ! empty( $attrs['lazyLoadVideo'] );
	$disable_forced_lazy_loading = ! empty( $attrs['disableForcedLazyLoading'] );
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
