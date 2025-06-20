<?php

/**
 * Cover block render filter for Fancy Squares Core Block Enhancements.
 */

defined('ABSPATH') || exit;

/**
 * Add lazy loading to cover block media elements.
 *
 * @param string $block_content Rendered HTML of the block.
 * @param array  $block         Parsed block data.
 *
 * @return string Modified block HTML.
 */
function fs_core_enhancements_cover_render($block_content, $block)
{
	// Run only on core/cover blocks.
	if (! isset($block['blockName']) || 'core/cover' !== $block['blockName']) {
		return $block_content;
	}

	/* ── 1.  Read block-level intent ───────────────────────────── */
	$lazy_video_requested = ! empty($block['attrs']['lazyLoadVideo']); // bool


	/* ── 2.  Walk the markup ───────────────────────────────────── */
	$tags        = new WP_HTML_Tag_Processor($block_content);
	$found_video = false;
	$found_img   = false;

	while ($tags->next_tag()) {
		$tag_name = $tags->get_tag();

		/* video: only when attribute is set ---------------------- */
		if (
			! $found_video
			&& $lazy_video_requested
			&& 'VIDEO' === $tag_name
			&& $tags->has_class('wp-block-cover__video-background')
		) {
			if ($src = $tags->get_attribute('src')) {
				$tags->set_attribute('data-fs-lazy-video', 'true');
				$tags->set_attribute('data-src', $src);
				$tags->set_attribute('src', '');
			}
			$found_video = true;
		}

		/* image: always add lazy/async --------------------------- */
		if (
			! $found_img
			&& 'IMG' === $tag_name
			&& $tags->has_class('wp-block-cover__image-background')
		) {
			$tags->set_attribute('loading',  'lazy');
			$tags->set_attribute('decoding', 'async');
			$found_img = true;
		}

		/* 3. Break when nothing else can match ------------------- */
		if ($found_video || $found_img) {
			break;   // both jobs done; stop scanning early
		}
	}

	return $tags->get_updated_html();
}
add_filter('render_block_core/cover', 'fs_core_enhancements_cover_render', 10, 2);
