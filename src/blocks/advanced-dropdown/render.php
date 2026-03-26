<?php
/**
 * Render callback for the Advanced Dropdown block.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block inner content.
 * @param WP_Block $block      Block instance.
 */

defined( 'ABSPATH' ) || exit;

$block_id = isset( $attributes['blockId'] ) ? $attributes['blockId'] : '';
$block_id = '' !== $block_id ? sanitize_html_class( $block_id ) : '';
if ( '' === $block_id ) {
	$block_id = wp_unique_id( 'fs-advanced-dropdown-' );
} else {
	$block_id = 'fs-advanced-dropdown-' . $block_id;
}

$top_level_layout = isset( $attributes['topLevelLayout'] )
	? sanitize_key( (string) $attributes['topLevelLayout'] )
	: 'horizontal';
if ( 'left' !== $top_level_layout ) {
	$top_level_layout = 'horizontal';
}
$left_mobile_behavior = isset( $attributes['leftMobileBehavior'] )
	? sanitize_key( (string) $attributes['leftMobileBehavior'] )
	: 'inline';
if ( 'list-only' !== $left_mobile_behavior ) {
	$left_mobile_behavior = 'inline';
}

$default_first_item_visible = ! empty( $attributes['defaultFirstItemVisible'] );

$items = [];
if ( isset( $block ) && $block instanceof WP_Block ) {
	foreach ( $block->inner_blocks as $inner_block ) {
		if ( 'fs-blocks/advanced-dropdown-item' !== $inner_block->name ) {
			continue;
		}

		$item_id = isset( $inner_block->attributes['itemId'] )
			? $inner_block->attributes['itemId']
			: '';
		$item_id = sanitize_html_class( $item_id );
		if ( '' === $item_id ) {
			$item_id = wp_unique_id( 'item-' );
		}

		$title = isset( $inner_block->attributes['title'] )
			? $inner_block->attributes['title']
			: __( 'New Item', 'fancy-squares-core-enhancements' );
		$url = isset( $inner_block->attributes['url'] )
			? trim( (string) $inner_block->attributes['url'] )
			: '';
		$opens_in_new_tab = ! empty( $inner_block->attributes['opensInNewTab'] );
		$rel = isset( $inner_block->attributes['rel'] )
			? trim( (string) $inner_block->attributes['rel'] )
			: '';
		$has_dropdown = ! isset( $inner_block->attributes['hasDropdown'] ) ||
			! empty( $inner_block->attributes['hasDropdown'] );
		$panel_content = trim( $inner_block->render() );

		$items[] = [
			'id' => $item_id,
			'title' => wp_strip_all_tags( $title ),
			'url' => $url,
			'opensInNewTab' => $opens_in_new_tab,
			'rel' => $rel,
			'hasDropdown' => $has_dropdown,
			'content' => $panel_content,
			'hasPanel' => $has_dropdown && '' !== $panel_content,
		];
	}
}

if ( empty( $items ) ) {
	return;
}

$default_item_id = '';
foreach ( $items as $item ) {
	if ( ! empty( $item['hasPanel'] ) ) {
		$default_item_id = $item['id'];
		break;
	}
}

$classes = [];
if (
	! empty( $attributes['additionalClasses'] ) &&
	is_array( $attributes['additionalClasses'] )
) {
	$classes = array_map( 'sanitize_html_class', $attributes['additionalClasses'] );
}

if ( 'left' === $top_level_layout ) {
	$classes[] = 'fs-advanced-dropdown--layout-left';
	if ( 'list-only' === $left_mobile_behavior ) {
		$classes[] = 'fs-advanced-dropdown--left-mobile-list-only';
	}
}

$wrapper_attributes = get_block_wrapper_attributes(
	[
		'class' => implode( ' ', $classes ),
	]
);

$initial_context = [
	'activeItem' => '',
	'defaultFirstItemVisible' => $default_first_item_visible,
	'defaultItemId' => $default_item_id,
	'leftMobileBehavior' => $left_mobile_behavior,
	'isMobileViewport' => false,
];
$is_left_layout = 'left' === $top_level_layout;
$left_instructions_id = $block_id . '-left-instructions';

$ensure_safe_rel = static function( $rel, $opens_in_new_tab ) {
	$tokens = preg_split( '/\s+/', strtolower( (string) $rel ) );
	$tokens = array_filter( array_map( 'trim', $tokens ) );

	if ( $opens_in_new_tab ) {
		if ( ! in_array( 'noopener', $tokens, true ) ) {
			$tokens[] = 'noopener';
		}
		if ( ! in_array( 'noreferrer', $tokens, true ) ) {
			$tokens[] = 'noreferrer';
		}
	}

	$tokens = array_unique( $tokens );

	return implode( ' ', $tokens );
};
?>
<div
	<?php echo $wrapper_attributes; ?>
	data-fs-advanced-dropdown-root="<?php echo esc_attr( $block_id ); ?>"
	data-wp-interactive="fancySquaresAdvancedDropdown"
	<?php echo wp_interactivity_data_wp_context( $initial_context ); ?>
	<?php if ( $is_left_layout ) : ?>
		data-wp-init--responsive-panels="callbacks.initResponsivePanelsLayout"
	<?php endif; ?>
>
	<?php if ( $is_left_layout ) : ?>
		<div class="fs-advanced-dropdown__layout">
			<p id="<?php echo esc_attr( $left_instructions_id ); ?>" class="screen-reader-text">
				<?php
				esc_html_e(
					'Selecting a left-side item updates the adjacent panel content.',
					'fancy-squares-core-enhancements'
				);
				?>
			</p>
			<ul class="fs-advanced-dropdown__list fs-advanced-dropdown__list--left">
				<?php foreach ( $items as $item ) : ?>
					<?php
					$panel_id = $block_id . '-panel-' . $item['id'];
					$toggle_id = $block_id . '-toggle-' . $item['id'];
					$has_panel = ! empty( $item['hasPanel'] );
					$link_target = ! empty( $item['opensInNewTab'] ) ? '_blank' : '_self';
					$link_rel = $ensure_safe_rel( $item['rel'], ! empty( $item['opensInNewTab'] ) );
					?>
					<li
						class="fs-advanced-dropdown__item<?php echo $has_panel ? ' has-dropdown' : ''; ?>"
						data-fs-item-id="<?php echo esc_attr( $item['id'] ); ?>"
						<?php if ( $has_panel ) : ?>
							data-wp-context='<?php echo wp_json_encode( [ 'itemId' => $item['id'] ] ); ?>'
							data-wp-class--is-open="state.isActive"
							data-wp-on--mouseenter="actions.openItemOnHover"
							data-wp-on--focusin="actions.openItemOnFocus"
							data-wp-on--keydown="actions.handleItemKeyDown"
						<?php endif; ?>
					>
						<div class="fs-advanced-dropdown__item-header">
							<?php if ( '' !== $item['url'] ) : ?>
								<a
									class="fs-advanced-dropdown__link"
									href="<?php echo esc_url( $item['url'] ); ?>"
									target="<?php echo esc_attr( $link_target ); ?>"
									<?php if ( '' !== $link_rel ) : ?>
										rel="<?php echo esc_attr( $link_rel ); ?>"
									<?php endif; ?>
								>
									<?php echo esc_html( $item['title'] ); ?>
								</a>
							<?php else : ?>
								<span class="fs-advanced-dropdown__label">
									<?php echo esc_html( $item['title'] ); ?>
								</span>
							<?php endif; ?>

							<?php if ( $has_panel ) : ?>
								<button
									id="<?php echo esc_attr( $toggle_id ); ?>"
									type="button"
									class="fs-advanced-dropdown__toggle"
									data-wp-on--click="actions.toggleItem"
									data-wp-on--focus="actions.openItemOnFocus"
									data-wp-on--keydown="actions.handleToggleKeyDown"
									data-wp-class--is-active="state.isActive"
									data-wp-bind--aria-expanded="state.ariaExpanded"
									aria-controls="<?php echo esc_attr( $panel_id ); ?>"
									aria-describedby="<?php echo esc_attr( $left_instructions_id ); ?>"
									aria-expanded="false"
								>
									<span class="fs-advanced-dropdown__toggle-icon" aria-hidden="true"></span>
									<span class="screen-reader-text">
										<?php
										printf(
											/* translators: %s: dropdown item title. */
											esc_html__( 'Toggle submenu for %s', 'fancy-squares-core-enhancements' ),
											esc_html( $item['title'] )
										);
										?>
									</span>
								</button>
							<?php endif; ?>
						</div>
					</li>
				<?php endforeach; ?>
			</ul>

			<div class="fs-advanced-dropdown__desktop-panels">
				<?php foreach ( $items as $item ) : ?>
					<?php
					$panel_id = $block_id . '-panel-' . $item['id'];
					$toggle_id = $block_id . '-toggle-' . $item['id'];
					$has_panel = ! empty( $item['hasPanel'] );
					if ( ! $has_panel ) {
						continue;
					}
					?>
					<div
						id="<?php echo esc_attr( $panel_id ); ?>"
						class="fs-advanced-dropdown__panel"
						data-fs-item-id="<?php echo esc_attr( $item['id'] ); ?>"
						data-wp-context='<?php echo wp_json_encode( [ 'itemId' => $item['id'] ] ); ?>'
						data-wp-class--is-open="state.isActive"
						data-wp-bind--hidden="state.isHidden"
						data-wp-on--keydown="actions.handleItemKeyDown"
						role="region"
						aria-labelledby="<?php echo esc_attr( $toggle_id ); ?>"
						hidden
					>
						<div class="fs-advanced-dropdown__panel-content">
							<?php echo $item['content']; ?>
						</div>
					</div>
				<?php endforeach; ?>
			</div>
		</div>
	<?php else : ?>
		<ul class="fs-advanced-dropdown__list">
			<?php foreach ( $items as $item ) : ?>
				<?php
				$panel_id = $block_id . '-panel-' . $item['id'];
				$has_panel = ! empty( $item['hasPanel'] );
				$link_target = ! empty( $item['opensInNewTab'] ) ? '_blank' : '_self';
				$link_rel = $ensure_safe_rel( $item['rel'], ! empty( $item['opensInNewTab'] ) );
				?>
				<li
					class="fs-advanced-dropdown__item<?php echo $has_panel ? ' has-dropdown' : ''; ?>"
					data-fs-item-id="<?php echo esc_attr( $item['id'] ); ?>"
					<?php if ( $has_panel ) : ?>
						data-wp-context='<?php echo wp_json_encode( [ 'itemId' => $item['id'] ] ); ?>'
						data-wp-class--is-open="state.isActive"
						data-wp-on--mouseenter="actions.openItemOnHover"
						data-wp-on--mouseleave="actions.closeItemOnHover"
						data-wp-on--focusout="actions.handleItemFocusOut"
						data-wp-on--keydown="actions.handleItemKeyDown"
					<?php endif; ?>
				>
					<div class="fs-advanced-dropdown__item-header">
						<?php if ( '' !== $item['url'] ) : ?>
							<a
								class="fs-advanced-dropdown__link"
								href="<?php echo esc_url( $item['url'] ); ?>"
								target="<?php echo esc_attr( $link_target ); ?>"
								<?php if ( '' !== $link_rel ) : ?>
									rel="<?php echo esc_attr( $link_rel ); ?>"
								<?php endif; ?>
							>
								<?php echo esc_html( $item['title'] ); ?>
							</a>
						<?php else : ?>
							<span class="fs-advanced-dropdown__label">
								<?php echo esc_html( $item['title'] ); ?>
							</span>
						<?php endif; ?>

						<?php if ( $has_panel ) : ?>
							<button
								type="button"
								class="fs-advanced-dropdown__toggle"
								data-wp-on--click="actions.toggleItem"
								data-wp-on--focus="actions.openItemOnFocus"
								data-wp-on--keydown="actions.handleToggleKeyDown"
								data-wp-class--is-active="state.isActive"
								data-wp-bind--aria-expanded="state.ariaExpanded"
								aria-controls="<?php echo esc_attr( $panel_id ); ?>"
								aria-expanded="false"
							>
								<span class="fs-advanced-dropdown__toggle-icon" aria-hidden="true"></span>
								<span class="screen-reader-text">
									<?php
									printf(
										/* translators: %s: dropdown item title. */
										esc_html__( 'Toggle submenu for %s', 'fancy-squares-core-enhancements' ),
										esc_html( $item['title'] )
									);
									?>
								</span>
							</button>
						<?php endif; ?>
					</div>

					<?php if ( $has_panel ) : ?>
						<div
							id="<?php echo esc_attr( $panel_id ); ?>"
							class="fs-advanced-dropdown__panel"
							data-wp-class--is-open="state.isActive"
							data-wp-bind--hidden="state.isHidden"
							hidden
						>
							<div class="fs-advanced-dropdown__panel-content">
								<?php echo $item['content']; ?>
							</div>
						</div>
					<?php endif; ?>
				</li>
			<?php endforeach; ?>
		</ul>
	<?php endif; ?>
</div>
