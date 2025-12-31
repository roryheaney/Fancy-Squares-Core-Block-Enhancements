<?php
/**
 * Admin settings for Fancy Squares Core Block Enhancements.
 */

defined( 'ABSPATH' ) || exit;

if ( ! defined( 'FS_CORE_ENHANCEMENTS_OPTION_BOOTSTRAP' ) ) {
	define(
		'FS_CORE_ENHANCEMENTS_OPTION_BOOTSTRAP',
		'fs_core_enhancements_bootstrap_cdn'
	);
}

function fs_core_enhancements_sanitize_enabled_blocks( $value ) {
	if ( ! is_array( $value ) ) {
		return [];
	}

	$blocks = fs_core_enhancements_get_custom_blocks();
	$enabled = [];

	foreach ( $value as $slug ) {
		$slug = sanitize_key( $slug );
		if ( isset( $blocks[ $slug ] ) ) {
			$enabled[] = $slug;
		}
	}

	return array_values( array_unique( $enabled ) );
}

function fs_core_enhancements_sanitize_bootstrap_cdn( $value ) {
	$value = sanitize_key( $value );
	$allowed = [ 'off', 'editor', 'both' ];

	if ( ! in_array( $value, $allowed, true ) ) {
		return 'off';
	}

	return $value;
}

function fs_core_enhancements_register_settings() {
	register_setting(
		'fs_core_enhancements_settings',
		FS_CORE_ENHANCEMENTS_OPTION_ENABLED_BLOCKS,
		[
			'type' => 'array',
			'default' => [],
			'sanitize_callback' => 'fs_core_enhancements_sanitize_enabled_blocks',
		]
	);
	register_setting(
		'fs_core_enhancements_settings',
		FS_CORE_ENHANCEMENTS_OPTION_BOOTSTRAP,
		[
			'type' => 'string',
			'default' => 'off',
			'sanitize_callback' =>
				'fs_core_enhancements_sanitize_bootstrap_cdn',
		]
	);
}
add_action( 'admin_init', 'fs_core_enhancements_register_settings' );

function fs_core_enhancements_add_settings_page() {
	add_options_page(
		__( 'Fancy Squares Blocks', 'fancy-squares-core-enhancements' ),
		__( 'Fancy Squares Blocks', 'fancy-squares-core-enhancements' ),
		'manage_options',
		'fs-core-enhancements-blocks',
		'fs_core_enhancements_render_settings_page'
	);
}
add_action( 'admin_menu', 'fs_core_enhancements_add_settings_page' );

function fs_core_enhancements_render_settings_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	$blocks = fs_core_enhancements_get_custom_blocks();
	$enabled = fs_core_enhancements_get_enabled_blocks();
	$bootstrap_setting = get_option(
		FS_CORE_ENHANCEMENTS_OPTION_BOOTSTRAP,
		'off'
	);
	?>
	<div class="wrap">
		<h1><?php echo esc_html__( 'Fancy Squares Blocks', 'fancy-squares-core-enhancements' ); ?></h1>
		<p>
			<?php
			echo esc_html__(
				'Enable custom blocks before they appear in the editor.',
				'fancy-squares-core-enhancements'
			);
			?>
		</p>
		<form method="post" action="options.php">
			<?php settings_fields( 'fs_core_enhancements_settings' ); ?>
			<table class="form-table" role="presentation">
				<tbody>
					<tr>
						<th scope="row">
							<?php
							echo esc_html__(
								'Include Bootstrap 5 CDN',
								'fancy-squares-core-enhancements'
							);
							?>
						</th>
						<td>
							<label for="fs-core-enhancements-bootstrap">
								<?php
								echo esc_html__(
									'Choose where Bootstrap 5 loads.',
									'fancy-squares-core-enhancements'
								);
								?>
							</label>
							<select
								id="fs-core-enhancements-bootstrap"
								name="<?php echo esc_attr( FS_CORE_ENHANCEMENTS_OPTION_BOOTSTRAP ); ?>"
							>
								<option value="off" <?php selected( $bootstrap_setting, 'off' ); ?>>
									<?php echo esc_html__( 'Off (theme only)', 'fancy-squares-core-enhancements' ); ?>
								</option>
								<option value="editor" <?php selected( $bootstrap_setting, 'editor' ); ?>>
									<?php echo esc_html__( 'Editor only', 'fancy-squares-core-enhancements' ); ?>
								</option>
								<option value="both" <?php selected( $bootstrap_setting, 'both' ); ?>>
									<?php echo esc_html__( 'Editor + front end', 'fancy-squares-core-enhancements' ); ?>
								</option>
							</select>
						</td>
					</tr>
					<?php foreach ( $blocks as $slug => $block ) : ?>
						<tr>
							<th scope="row"><?php echo esc_html( $block['label'] ); ?></th>
							<td>
								<label>
									<input
										type="checkbox"
										name="<?php echo esc_attr( FS_CORE_ENHANCEMENTS_OPTION_ENABLED_BLOCKS ); ?>[]"
										value="<?php echo esc_attr( $slug ); ?>"
										<?php checked( in_array( $slug, $enabled, true ) ); ?>
									/>
									<?php echo esc_html( $block['description'] ); ?>
								</label>
							</td>
						</tr>
					<?php endforeach; ?>
				</tbody>
			</table>
			<?php submit_button(); ?>
		</form>
	</div>
	<?php
}

function fs_core_enhancements_enqueue_bootstrap_cdn() {
	$bootstrap_setting = get_option(
		FS_CORE_ENHANCEMENTS_OPTION_BOOTSTRAP,
		'off'
	);

	if ( 'off' === $bootstrap_setting ) {
		return;
	}

	if ( 'editor' === $bootstrap_setting ) {
		if ( ! is_admin() ) {
			return;
		}
	}

	wp_enqueue_style(
		'fs-core-enhancements-bootstrap5',
		'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
		[],
		'5.3.3'
	);
	wp_enqueue_script(
		'fs-core-enhancements-bootstrap5',
		'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
		[],
		'5.3.3',
		true
	);
}
add_action(
	'enqueue_block_assets',
	'fs_core_enhancements_enqueue_bootstrap_cdn'
);
