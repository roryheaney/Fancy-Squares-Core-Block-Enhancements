<?php
/**
 * Asset enqueuing functions for Fancy Squares Core Block Enhancements.
 */

defined( 'ABSPATH' ) || exit;

/**
 * Enqueue the editor script and styles that extend core blocks.
 */
function fs_core_enhancements_editor_assets() {
        $plugin_dir = plugin_dir_path( dirname( __DIR__ ) . '/fancy-squares-core-enhancements.php' );
        $plugin_url = plugin_dir_url( dirname( __DIR__ ) . '/fancy-squares-core-enhancements.php' );

        // Load asset file for dependencies and version.
        $asset_file = $plugin_dir . 'build/index.asset.php';
        if ( file_exists( $asset_file ) ) {
                $asset = include $asset_file;
        } else {
                $asset = [
                        'dependencies' => [],
                        'version'      => false,
                ];
        }

        // Enqueue the JavaScript (editor only).
        wp_enqueue_script(
                'fs-core-enhancements',
                $plugin_url . 'build/index.js',
                $asset['dependencies'],
                $asset['version'],
                true
        );

        // Enqueue the CSS (editor).
        wp_enqueue_style(
                'fs-core-enhancements-editor',
                $plugin_url . 'build/index.css',
                [],
                $asset['version']
        );
}
add_action( 'enqueue_block_editor_assets', 'fs_core_enhancements_editor_assets' );

/**
 * Enqueue the styles for the front end.
 */
function fs_core_enhancements_frontend_assets() {
        $plugin_dir = plugin_dir_path( dirname( __DIR__ ) . '/fancy-squares-core-enhancements.php' );
        $plugin_url = plugin_dir_url( dirname( __DIR__ ) . '/fancy-squares-core-enhancements.php' );

        // Load asset file for version consistency.
        $asset_file = $plugin_dir . 'build/index.asset.php';
        if ( file_exists( $asset_file ) ) {
                $asset = include $asset_file;
        } else {
                $asset = [
                        'version' => false,
                ];
        }

        // Enqueue the JavaScript for the front end.
        wp_enqueue_script(
                'fs-core-enhancements-frontend',
                $plugin_url . 'build/index.js',
                $asset['dependencies'] ?? [],
                $asset['version'],
                true
        );

        // Enqueue the CSS (front end).
        wp_enqueue_style(
                'fs-core-enhancements-frontend',
                $plugin_url . 'build/index.css',
                [],
                $asset['version']
        );
}
add_action( 'wp_enqueue_scripts', 'fs_core_enhancements_frontend_assets' );
