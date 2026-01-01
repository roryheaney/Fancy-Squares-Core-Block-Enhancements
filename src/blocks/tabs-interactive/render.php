<?php
/**
 * Render callback for the Interactive Tabs block.
 *
 * Notes:
 * - Tab state is managed with Interactivity API directives.
 * - Tabs/panes are built from child `fs-blocks/tab-item-interactive` blocks.
 * - IDs are prefixed with `fs-tabs-interactive-` for consistent ARIA wiring.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block inner content.
 * @param WP_Block $block      Block instance.
 */

defined( 'ABSPATH' ) || exit;

$block_id = isset( $attributes['blockId'] ) ? $attributes['blockId'] : '';
$block_id = '' !== $block_id ? sanitize_html_class( $block_id ) : '';
if ( '' === $block_id ) {
	$block_id = wp_unique_id( 'fs-tabs-interactive-' );
} else {
	$block_id = 'fs-tabs-interactive-' . $block_id;
}

$active_tab = isset( $attributes['activeTab'] ) ? $attributes['activeTab'] : '';
$active_tab = sanitize_html_class( $active_tab );

$tabs = [];
if ( isset( $block ) && $block instanceof WP_Block ) {
	foreach ( $block->inner_blocks as $inner_block ) {
		if ( 'fs-blocks/tab-item-interactive' !== $inner_block->name ) {
			continue;
		}
		$tab_id = isset( $inner_block->attributes['tabId'] )
			? $inner_block->attributes['tabId']
			: '';
		$tab_id = sanitize_html_class( $tab_id );
		if ( '' === $tab_id ) {
			$tab_id = wp_unique_id( 'tab-' );
		}
		$tabs[] = [
			'id' => $tab_id,
			'title' => isset( $inner_block->attributes['title'] )
				? $inner_block->attributes['title']
				: __( 'New Tab', 'fancy-squares-core-enhancements' ),
			'content' => $inner_block->render(),
		];
	}
}

if ( empty( $tabs ) ) {
	return;
}

$tab_ids = array_column( $tabs, 'id' );
if ( '' === $active_tab || ! in_array( $active_tab, $tab_ids, true ) ) {
	$active_tab = $tabs[0]['id'];
}

$responsive_enabled = isset( $attributes['responsiveTabs'] ) && $attributes['responsiveTabs'];
$wrapper_classes = $responsive_enabled ? 'fs-tabs--responsive' : '';
$wrapper_attributes = get_block_wrapper_attributes( [ 'class' => $wrapper_classes ] );

// Initialize context for Interactivity API
$initial_context = [
	'activeTab' => $active_tab,
];
?>
<div
	<?php echo $wrapper_attributes; ?>
	data-wp-interactive="fancySquaresTabsInteractive"
	<?php echo wp_interactivity_data_wp_context( $initial_context ); ?>
>
	<div class="fs-tabs__tablist" role="tablist" aria-orientation="horizontal">
		<?php foreach ( $tabs as $tab ) : ?>
			<?php
			$tab_button_id = $block_id . '-tab-' . $tab['id'];
			$pane_id = $block_id . '-pane-' . $tab['id'];
			$is_active = $tab['id'] === $active_tab;
			?>
			<button
				id="<?php echo esc_attr( $tab_button_id ); ?>"
				type="button"
				class="fs-tabs__tab"
				data-wp-context='<?php echo wp_json_encode( [ 'tabId' => $tab['id'] ] ); ?>'
				data-wp-on-async--click="actions.setActiveTab"
				data-wp-on--keydown="actions.handleKeyDown"
				data-wp-class--is-active="state.isActive"
				data-wp-bind--aria-selected="state.ariaSelected"
				data-wp-bind--tabindex="state.tabIndex"
				role="tab"
				aria-controls="<?php echo esc_attr( $pane_id ); ?>"
				aria-selected="<?php echo $is_active ? 'true' : 'false'; ?>"
				tabindex="<?php echo $is_active ? '0' : '-1'; ?>"
			>
				<?php echo esc_html( $tab['title'] ); ?>
			</button>
		<?php endforeach; ?>
	</div>

	<div class="fs-tabs__panels">
		<?php foreach ( $tabs as $tab ) : ?>
			<?php
			$tab_button_id = $block_id . '-tab-' . $tab['id'];
			$pane_id = $block_id . '-pane-' . $tab['id'];
			$accordion_id = $block_id . '-accordion-' . $tab['id'];
			$is_active = $tab['id'] === $active_tab;
			?>
			<div
				id="<?php echo esc_attr( $pane_id ); ?>"
				class="fs-tabs__panel"
				data-wp-context='<?php echo wp_json_encode( [ 'tabId' => $tab['id'] ] ); ?>'
				data-wp-class--is-active="state.isActive"
				data-wp-bind--hidden="state.isHidden"
				role="tabpanel"
				aria-labelledby="<?php echo esc_attr( $tab_button_id ); ?>"
				<?php echo $is_active ? '' : 'hidden'; ?>
			>
				<?php if ( $responsive_enabled ) : ?>
					<button
						id="<?php echo esc_attr( $accordion_id ); ?>"
						type="button"
						class="fs-tabs__accordion-trigger"
						data-wp-on-async--click="actions.setActiveTab"
						data-wp-on--keydown="actions.handleKeyDown"
						data-wp-class--is-active="state.isActive"
						data-wp-bind--aria-expanded="state.ariaSelected"
						role="button"
						aria-expanded="<?php echo $is_active ? 'true' : 'false'; ?>"
						aria-controls="<?php echo esc_attr( $pane_id ); ?>-content"
					>
						<?php echo esc_html( $tab['title'] ); ?>
					</button>
				<?php endif; ?>
				<div
					id="<?php echo esc_attr( $pane_id ); ?>-content"
					class="fs-tabs__panel-content"
					data-wp-class--is-collapsing="state.isCollapsing"
				>
					<?php echo $tab['content']; ?>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
</div>
