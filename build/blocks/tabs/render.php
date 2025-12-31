<?php
/**
 * Render callback for the Tabs block.
 *
 * Notes:
 * - Tabs/panes are built from child `fs-blocks/tab-item` blocks.
 * - `activeTab` is sanitized and defaulted to the first tab if missing.
 * - IDs are prefixed with `fs-tabs-` for consistent ARIA wiring.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block inner content.
 * @param WP_Block $block      Block instance.
 */

defined( 'ABSPATH' ) || exit;

$block_id = isset( $attributes['blockId'] ) ? $attributes['blockId'] : '';
$block_id = '' !== $block_id ? sanitize_html_class( $block_id ) : '';
if ( '' === $block_id ) {
	$block_id = wp_unique_id( 'fs-tabs-' );
} else {
	$block_id = 'fs-tabs-' . $block_id;
}

$active_tab = isset( $attributes['activeTab'] ) ? $attributes['activeTab'] : '';
$active_tab = sanitize_html_class( $active_tab );

$responsive_tabs = ! empty( $attributes['responsiveTabs'] );

$tabs = [];
if ( isset( $block ) && $block instanceof WP_Block ) {
	foreach ( $block->inner_blocks as $inner_block ) {
		if ( 'fs-blocks/tab-item' !== $inner_block->name ) {
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

$classes = [ 'fs-tabs', 'wp-block-fs-blocks-tabs' ];
if ( $responsive_tabs ) {
	$classes[] = 'fs-tabs--responsive';
}

if (
	! empty( $attributes['additionalClasses'] ) &&
	is_array( $attributes['additionalClasses'] )
) {
	$classes = array_merge( $classes, $attributes['additionalClasses'] );
}

$classes = array_map( 'sanitize_html_class', $classes );

$wrapper_attributes = get_block_wrapper_attributes(
	[
		'class' => implode( ' ', $classes ),
		'data-bs-target' => $block_id,
	]
);

$base_id = $block_id;
$content_id = $base_id . '-content';
?>
<div <?php echo $wrapper_attributes; ?>>
	<ul class="nav nav-tabs" role="tablist">
		<?php foreach ( $tabs as $index => $tab ) : ?>
			<?php
			$is_active = $tab['id'] === $active_tab;
			$tab_button_id = $base_id . '-tab-' . $tab['id'];
			$pane_id = $base_id . '-pane-' . $tab['id'];
			?>
			<li class="nav-item" role="presentation">
				<button
					id="<?php echo esc_attr( $tab_button_id ); ?>"
					type="button"
					class="nav-link<?php echo $is_active ? ' active' : ''; ?>"
					data-bs-toggle="tab"
					data-bs-target="#<?php echo esc_attr( $pane_id ); ?>"
					role="tab"
					aria-controls="<?php echo esc_attr( $pane_id ); ?>"
					aria-selected="<?php echo $is_active ? 'true' : 'false'; ?>"
				>
					<?php echo esc_html( $tab['title'] ); ?>
				</button>
			</li>
		<?php endforeach; ?>
	</ul>

	<div id="<?php echo esc_attr( $content_id ); ?>" class="tab-content">
		<?php foreach ( $tabs as $index => $tab ) : ?>
			<?php
			$is_active = $tab['id'] === $active_tab;
			$tab_button_id = $base_id . '-tab-' . $tab['id'];
			$pane_id = $base_id . '-pane-' . $tab['id'];
			$collapse_id = $base_id . '-collapse-' . $tab['id'];
			$heading_id = $base_id . '-heading-' . $tab['id'];
			?>
			<div
				id="<?php echo esc_attr( $pane_id ); ?>"
				class="tab-pane fade<?php echo $is_active ? ' show active' : ''; ?><?php echo $responsive_tabs ? ' card' : ''; ?>"
				role="tabpanel"
				aria-labelledby="<?php echo esc_attr( $tab_button_id ); ?>"
			>
				<?php if ( $responsive_tabs ) : ?>
					<div class="card-header" role="tab" id="<?php echo esc_attr( $heading_id ); ?>">
						<button
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#<?php echo esc_attr( $collapse_id ); ?>"
							aria-expanded="<?php echo $is_active ? 'true' : 'false'; ?>"
							aria-controls="<?php echo esc_attr( $collapse_id ); ?>"
						>
							<?php echo esc_html( $tab['title'] ); ?>
						</button>
					</div>
					<div
						id="<?php echo esc_attr( $collapse_id ); ?>"
						class="collapse<?php echo $is_active ? ' show' : ''; ?>"
						data-bs-parent="#<?php echo esc_attr( $content_id ); ?>"
						role="tabpanel"
						aria-labelledby="<?php echo esc_attr( $heading_id ); ?>"
					>
						<div class="card-body">
							<?php echo $tab['content']; ?>
						</div>
					</div>
				<?php else : ?>
					<?php echo $tab['content']; ?>
				<?php endif; ?>
			</div>
		<?php endforeach; ?>
	</div>
</div>
