<?php
/**
 * Content Showcase context stack for nested block rendering.
 */

defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'fs_showcase_context_stack_init' ) ) {
	function fs_showcase_context_stack_init() {
		if ( ! isset( $GLOBALS['fs_showcase_context_stack'] ) || ! is_array( $GLOBALS['fs_showcase_context_stack'] ) ) {
			$GLOBALS['fs_showcase_context_stack'] = [];
		}
	}
}

if ( ! function_exists( 'fs_showcase_context_stack_push' ) ) {
	function fs_showcase_context_stack_push( array $context ) {
		fs_showcase_context_stack_init();
		$GLOBALS['fs_showcase_context_stack'][] = $context;
	}
}

if ( ! function_exists( 'fs_showcase_context_stack_pop' ) ) {
	function fs_showcase_context_stack_pop() {
		fs_showcase_context_stack_init();
		array_pop( $GLOBALS['fs_showcase_context_stack'] );
	}
}

if ( ! function_exists( 'fs_showcase_context_stack_peek' ) ) {
	function fs_showcase_context_stack_peek() {
		fs_showcase_context_stack_init();
		if ( empty( $GLOBALS['fs_showcase_context_stack'] ) ) {
			return null;
		}
		return $GLOBALS['fs_showcase_context_stack'][ array_key_last( $GLOBALS['fs_showcase_context_stack'] ) ];
	}
}

if ( ! function_exists( 'fs_showcase_collect_accordion_data' ) ) {
	function fs_showcase_collect_accordion_data( array $block ) {
		$block_name = isset( $block['blockName'] ) ? $block['blockName'] : '';
		if ( 'fs-blocks/accordion-interactive' === $block_name ) {
			$items_data = [];
			$first_item_id = '';
			$first_media_item_id = '';
			$attrs = isset( $block['attrs'] ) && is_array( $block['attrs'] )
				? $block['attrs']
				: [];
			$accordion_opens_first = ! empty( $attrs['openFirstItem'] );

			$inner_blocks = isset( $block['innerBlocks'] ) && is_array( $block['innerBlocks'] )
				? $block['innerBlocks']
				: [];

			foreach ( $inner_blocks as $accordion_item ) {
				if ( empty( $accordion_item['blockName'] ) || 'fs-blocks/accordion-item-interactive' !== $accordion_item['blockName'] ) {
					continue;
				}
				$item_attrs = isset( $accordion_item['attrs'] ) && is_array( $accordion_item['attrs'] )
					? $accordion_item['attrs']
					: [];
				$item_id = isset( $item_attrs['itemId'] )
					? sanitize_html_class( $item_attrs['itemId'] )
					: '';
				if ( '' === $item_id ) {
					continue;
				}
				if ( '' === $first_item_id ) {
					$first_item_id = $item_id;
				}

				$media_id = ! empty( $item_attrs['showcaseMediaId'] )
					? (int) $item_attrs['showcaseMediaId']
					: 0;

				if ( $media_id ) {
					$items_data[ $item_id ] = [
						'id' => $media_id,
						'hasMedia' => true,
					];
					if ( '' === $first_media_item_id ) {
						$first_media_item_id = $item_id;
					}
				} else {
					$items_data[ $item_id ] = [
						'hasMedia' => false,
					];
				}
			}

			$active_item_id = '';
			if (
				$accordion_opens_first &&
				'' !== $first_item_id &&
				! empty( $items_data[ $first_item_id ]['hasMedia'] )
			) {
				$active_item_id = $first_item_id;
			}
			if ( '' === $active_item_id ) {
				$active_item_id = $first_media_item_id;
			}

			return [
				'itemsData' => $items_data,
				'activeItemId' => $active_item_id,
			];
		}

		$inner_blocks = isset( $block['innerBlocks'] ) && is_array( $block['innerBlocks'] )
			? $block['innerBlocks']
			: [];
		foreach ( $inner_blocks as $inner_block ) {
			$result = fs_showcase_collect_accordion_data( $inner_block );
			if ( null !== $result ) {
				return $result;
			}
		}

		return null;
	}
}

if ( ! function_exists( 'fs_showcase_pre_render_block' ) ) {
	function fs_showcase_pre_render_block( $pre_render, $parsed_block, $parent_block ) {
		if ( null !== $pre_render ) {
			return $pre_render;
		}

		if ( empty( $parsed_block['blockName'] ) || 'fs-blocks/content-showcase' !== $parsed_block['blockName'] ) {
			return $pre_render;
		}

		$accordion_data = fs_showcase_collect_accordion_data( $parsed_block );
		if ( ! is_array( $accordion_data ) ) {
			$accordion_data = [
				'itemsData' => [],
				'activeItemId' => '',
			];
		}

		fs_showcase_context_stack_push( $accordion_data );

		return $pre_render;
	}
	add_filter( 'pre_render_block', 'fs_showcase_pre_render_block', 10, 3 );
}

if ( ! function_exists( 'fs_showcase_render_block' ) ) {
	function fs_showcase_render_block( $block_content, $block ) {
		if ( isset( $block['blockName'] ) && 'fs-blocks/content-showcase' === $block['blockName'] ) {
			fs_showcase_context_stack_pop();
		}
		return $block_content;
	}
	add_filter( 'render_block', 'fs_showcase_render_block', 10, 2 );
}
