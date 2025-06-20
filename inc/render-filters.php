<?php
/**
 * Register render filters for Fancy Squares Core Block Enhancements.
 */

defined( 'ABSPATH' ) || exit;

foreach ( glob( __DIR__ . '/render-filters/*.php' ) as $file ) {
    require_once $file;
}
