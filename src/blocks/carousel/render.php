<?php

/**
 * Render callback for the Carousel block.
 *
 * Notes:
 * - Swiper config is serialized into `data-swiper` for frontend initialization.
 * - Breakpoints are sanitized before output.
 *
 * @param array  $attributes Block attributes.
 * @param string $content    Inner blocks content.
 */

defined('ABSPATH') || exit;

$defaults = [
	'slidesToShow' => 3,
	'columnGap' => 30,
	'pagination' => false,
	'navigation' => false,
	'autoplay' => false,
	'delay' => 2000,
	'loop' => false,
	'speed' => 300,
	'enableFade' => false,
	'fractionalSlidesEnabled' => false,
	'fractionalSlidesValue' => 0.25,
	'showPlayPauseButton' => false,
	'breakpoints' => [],
	'autoHeight' => false,
	'enforceHeight' => false,
	'elementTag' => 'div',
];

$attributes = wp_parse_args($attributes, $defaults);

$element_tag = isset($attributes['elementTag'])
	? $attributes['elementTag']
	: 'div';
if ('section' !== $element_tag) {
	$element_tag = 'div';
}

$slides_to_show = max(1, (int) $attributes['slidesToShow']);
$column_gap = max(0, (int) $attributes['columnGap']);
$speed = max(100, (int) $attributes['speed']);

$swiper_data = [
	'slidesPerView' => $slides_to_show,
	'spaceBetween' => $column_gap,
	'loop' => (bool) $attributes['loop'],
	'speed' => $speed,
];

if (
	1 === $slides_to_show &&
	! empty($attributes['fractionalSlidesEnabled']) &&
	empty($attributes['enableFade'])
) {
	$fraction = (float) $attributes['fractionalSlidesValue'];
	$fraction = max(0.05, min(0.5, $fraction));
	$swiper_data['slidesPerView'] = 1 + $fraction;
}

if (! empty($attributes['enableFade']) && 1 === $slides_to_show) {
	$swiper_data['effect'] = 'fade';
	$swiper_data['fadeEffect'] = ['crossFade' => true];
}

if (! empty($attributes['breakpoints']) && is_array($attributes['breakpoints'])) {
	$breakpoints = [];
	foreach ($attributes['breakpoints'] as $bp) {
		if (! is_array($bp)) {
			continue;
		}
		$breakpoint = isset($bp['breakpoint']) ? (int) $bp['breakpoint'] : 0;
		$slides = isset($bp['slidesToShow']) ? (int) $bp['slidesToShow'] : 0;
		if ($breakpoint > 0 && $slides > 0) {
			$breakpoints[$breakpoint] = [
				'slidesPerView' => $slides,
			];
		}
	}
	if (! empty($breakpoints)) {
		$swiper_data['breakpoints'] = $breakpoints;
	}
}

if (! empty($attributes['autoplay'])) {
	$delay = max(500, (int) $attributes['delay']);
	$swiper_data['autoplay'] = [
		'delay' => $delay,
		'pauseOnMouseEnter' => true,
		'disableOnInteraction' => false,
	];
}

if (! empty($attributes['pagination'])) {
	$swiper_data['pagination'] = [
		'el' => '.swiper-pagination',
		'clickable' => true,
		'bulletElement' => 'button',
	];
}

if (! empty($attributes['navigation'])) {
	$swiper_data['navigation'] = [
		'nextEl' => '.swiper-button-next',
		'prevEl' => '.swiper-button-prev',
	];
}

if (! empty($attributes['autoHeight'])) {
	$swiper_data['autoHeight'] = true;
}

$pause_pagination_classes = ['swiper-pause-pagination'];
$show_play_pause = ! empty($attributes['showPlayPauseButton']) && ! empty($attributes['autoplay']);
if (
	! $show_play_pause &&
	empty($attributes['pagination']) &&
	empty($attributes['navigation'])
) {
	$pause_pagination_classes[] = 'd-none';
}

$classes = ['swiper', 'wp-block-fs-blocks-carousel'];
$classes = fs_core_enhancements_get_sanitized_classes($classes, $attributes);

$block_id_source = '';
if (! empty($attributes['anchor'])) {
	$block_id_source = $attributes['anchor'];
} elseif (! empty($attributes['blockId'])) {
	$block_id_source = $attributes['blockId'];
}

$block_id = '' !== $block_id_source
	? sanitize_html_class($block_id_source)
	: wp_unique_id('fs-carousel-');

$wrapper_attributes = get_block_wrapper_attributes(
	[
		'class' => implode(' ', $classes),
		'data-swiper' => wp_json_encode($swiper_data),
		'data-swiper-id' => $block_id,
		'data-enforce-height' => ! empty($attributes['enforceHeight'])
			? 'true'
			: 'false',
		'aria-roledescription' => 'carousel',
		'aria-label' => __('Highlighted content', 'fancy-squares-core-enhancements'),
	]
);

$play_label = __('Carousel is paused, click to play', 'fancy-squares-core-enhancements');
$pause_label = __('Carousel is playing, click to pause', 'fancy-squares-core-enhancements');
?>
<<?php echo esc_attr($element_tag); ?> <?php echo $wrapper_attributes; ?>>
	<div class="swiper-wrapper">
		<?php echo $content; ?>
	</div>

	<div class="<?php echo esc_attr(implode(' ', $pause_pagination_classes)); ?>">
		<div class="swiper-pause-pagination__inner-container">
			<?php if (! empty($attributes['navigation'])) : ?>
				<button class="swiper-button-prev" aria-label="<?php esc_attr_e('Previous slide', 'fancy-squares-core-enhancements'); ?>"></button>
				<button class="swiper-button-next" aria-label="<?php esc_attr_e('Next slide', 'fancy-squares-core-enhancements'); ?>"></button>
			<?php endif; ?>

			<?php if (! empty($attributes['autoplay'])) : ?>
				<?php // Keep the control available for reduced-motion visitors; JS reveals it when needed. ?>
				<button
					type="button"
					class="swiper__button-control<?php echo $show_play_pause ? '' : ' d-none'; ?>"
					aria-label="<?php echo esc_attr($pause_label); ?>"
					data-label-play="<?php echo esc_attr($play_label); ?>"
					data-label-pause="<?php echo esc_attr($pause_label); ?>">


					<svg class="swiper__button-control-state d-none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
						width="24" height="24" viewBox="0 0 24 24"
						fill="currentColor" role="img" aria-label="Play">
						<path d="M6 3 L21 12 L6 21 Z" />
					</svg>

					<svg class="swiper__button-control-state" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
						width="24" height="24" viewBox="0 0 24 24"
						fill="currentColor" role="img" aria-label="Pause">
						<rect x="5" y="3" width="5" height="18" />
						<rect x="14" y="3" width="5" height="18" />
					</svg>

				</button>
			<?php endif; ?>

			<?php if (! empty($attributes['pagination'])) : ?>
				<div class="swiper-pagination"></div>
			<?php endif; ?>
		</div>
	</div>
</<?php echo esc_attr($element_tag); ?>>
