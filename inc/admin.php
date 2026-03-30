<?php
/**
 * Admin settings for Fancy Squares Core Block Enhancements.
 */

defined( 'ABSPATH' ) || exit;

if ( ! defined( 'FS_CORE_ENHANCEMENTS_OPTION_UTILITIES' ) ) {
	define(
		'FS_CORE_ENHANCEMENTS_OPTION_UTILITIES',
		'fs_core_enhancements_utilities_css'
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

function fs_core_enhancements_sanitize_utilities_css( $value ) {
	$value = sanitize_key( $value );
	$allowed = [ 'off', 'editor', 'both' ];

	if ( ! in_array( $value, $allowed, true ) ) {
		return 'both';
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
		FS_CORE_ENHANCEMENTS_OPTION_UTILITIES,
		[
			'type' => 'string',
			'default' => 'both',
			'sanitize_callback' =>
				'fs_core_enhancements_sanitize_utilities_css',
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

	$utilities_setting = get_option(
		FS_CORE_ENHANCEMENTS_OPTION_UTILITIES,
		'both'
	);
	$blocks = fs_core_enhancements_get_custom_blocks();
	$enabled = fs_core_enhancements_get_enabled_blocks();
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
								'Load Utilities CSS',
								'fancy-squares-core-enhancements'
							);
							?>
						</th>
						<td>
							<label for="fs-core-enhancements-utilities">
								<?php
								echo esc_html__(
									'Enable when your site does not already provide these utility classes.',
									'fancy-squares-core-enhancements'
								);
								?>
							</label>
							<select
								id="fs-core-enhancements-utilities"
								name="<?php echo esc_attr( FS_CORE_ENHANCEMENTS_OPTION_UTILITIES ); ?>"
							>
								<option value="off" <?php selected( $utilities_setting, 'off' ); ?>>
									<?php echo esc_html__( 'Off (site provides utilities)', 'fancy-squares-core-enhancements' ); ?>
								</option>
								<option value="editor" <?php selected( $utilities_setting, 'editor' ); ?>>
									<?php echo esc_html__( 'Editor only', 'fancy-squares-core-enhancements' ); ?>
								</option>
								<option value="both" <?php selected( $utilities_setting, 'both' ); ?>>
									<?php echo esc_html__( 'Editor + front end', 'fancy-squares-core-enhancements' ); ?>
								</option>
							</select>
							<p class="description">
								<?php
								echo esc_html__(
									'Includes spacing, display, flexbox, gap, position, z-index, and blend utility classes.',
									'fancy-squares-core-enhancements'
								);
								?>
							</p>
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

function fs_core_enhancements_enqueue_utilities_css() {
	$utilities_setting = get_option(
		FS_CORE_ENHANCEMENTS_OPTION_UTILITIES,
		'both'
	);

	if ( 'off' === $utilities_setting ) {
		return;
	}

	// Frontend utilities are conditionally enqueued in inc/assets.php.
	// Keep this path editor-only so settings and runtime conditions do not conflict.
	if ( ! is_admin() ) {
		return;
	}

	$plugin_url = plugin_dir_url( dirname( __DIR__ ) . '/fancy-squares-core-enhancements.php' );
	$plugin_dir = plugin_dir_path( dirname( __DIR__ ) . '/fancy-squares-core-enhancements.php' );

	if ( ! file_exists( $plugin_dir . 'build/utilities.css' ) ) {
		return;
	}

	$asset_file = $plugin_dir . 'build/utilities.asset.php';
	if ( file_exists( $asset_file ) ) {
		$asset = include $asset_file;
		$version = $asset['version'] ?? '1.0.0';
	} else {
		$version = '1.0.0';
	}

	wp_enqueue_style(
		'fs-core-enhancements-utilities',
		$plugin_url . 'build/utilities.css',
		[],
		$version
	);
}
add_action(
	'enqueue_block_assets',
	'fs_core_enhancements_enqueue_utilities_css'
);
