<?php
/**
 * Class-token detection helpers for frontend asset decisions.
 */

defined( 'ABSPATH' ) || exit;

function fs_core_enhancements_get_class_families_manifest() {
	static $manifest = null;

	if ( null !== $manifest ) {
		return $manifest;
	}

	$manifest = [
		'families' => [],
	];

	list($plugin_dir) = fs_core_enhancements_get_plugin_paths();
	$manifest_file = $plugin_dir . 'data/class-families.json';
	if ( ! file_exists( $manifest_file ) ) {
		return $manifest;
	}

	$manifest_raw = file_get_contents( $manifest_file );
	if ( ! is_string( $manifest_raw ) || '' === trim( $manifest_raw ) ) {
		return $manifest;
	}

	$decoded = json_decode( $manifest_raw, true );
	if (
		! is_array( $decoded ) ||
		empty( $decoded['families'] ) ||
		! is_array( $decoded['families'] )
	) {
		return $manifest;
	}

	$manifest = $decoded;
	return $manifest;
}

/**
 * Get token patterns associated with a matcher function.
 *
 * @param string $matcher_function Matcher function name.
 *
 * @return string[]
 */
function fs_core_enhancements_get_matcher_patterns( $matcher_function ) {
	static $cache = [];

	if ( isset( $cache[ $matcher_function ] ) ) {
		return $cache[ $matcher_function ];
	}

	$patterns = [];
	$manifest = fs_core_enhancements_get_class_families_manifest();
	$families = isset( $manifest['families'] ) && is_array( $manifest['families'] )
		? $manifest['families']
		: [];

	foreach ( $families as $family ) {
		if ( ! is_array( $family ) ) {
			continue;
		}

		if ( ( $family['runtimeMatcherFunction'] ?? '' ) !== $matcher_function ) {
			continue;
		}

		$token_pattern = $family['tokenPattern'] ?? '';
		if ( ! is_string( $token_pattern ) ) {
			continue;
		}

		$token_pattern = trim( $token_pattern );
		if ( '' === $token_pattern ) {
			continue;
		}

		$patterns[] = $token_pattern;
	}

	$cache[ $matcher_function ] = array_values( array_unique( $patterns ) );
	return $cache[ $matcher_function ];
}

/**
 * Match a token against a manifest-backed matcher family.
 *
 * @param string $token            Candidate class token.
 * @param string $matcher_function Matcher function name.
 *
 * @return bool
 */
function fs_core_enhancements_match_manifest_token( $token, $matcher_function ) {
	if ( ! is_string( $token ) ) {
		return false;
	}

	$token = trim( $token );
	if ( '' === $token ) {
		return false;
	}

	foreach ( fs_core_enhancements_get_matcher_patterns( $matcher_function ) as $pattern ) {
		if ( ! is_string( $pattern ) || '' === trim( $pattern ) ) {
			continue;
		}

		$delimited = '/' . str_replace( '/', '\/', $pattern ) . '/';
		if ( 1 === preg_match( $delimited, $token ) ) {
			return true;
		}
	}

	return false;
}

/**
 * Detect whether a class token is provided by utilities.css.
 *
 * @param string $token Candidate class token.
 *
 * @return bool
 */
function fs_core_enhancements_is_utility_token( $token ) {
	return fs_core_enhancements_match_manifest_token(
		$token,
		'fs_core_enhancements_is_utility_token'
	);
}

/**
 * Split a class-like string into unique class tokens.
 *
 * @param string $value Input class string.
 *
 * @return string[]
 */
function fs_core_enhancements_split_tokens( $value ) {
	if ( ! is_string( $value ) ) {
		return [];
	}

	$value = trim( $value );
	if ( '' === $value ) {
		return [];
	}

	$tokens = preg_split( '/\s+/', $value );
	if ( ! is_array( $tokens ) ) {
		return [];
	}

	$tokens = array_filter(
		$tokens,
		static function ( $token ) {
			return is_string( $token ) && '' !== $token;
		}
	);

	return array_values( array_unique( $tokens ) );
}

/**
 * Extract class-like tokens from block attributes.
 *
 * @param array $attrs Block attributes.
 *
 * @return string[]
 */
function fs_core_enhancements_extract_tokens_from_attrs( $attrs ) {
	if ( ! is_array( $attrs ) ) {
		return [];
	}

	$tokens = [];

	foreach ( $attrs as $value ) {
		if ( is_string( $value ) ) {
			foreach ( fs_core_enhancements_split_tokens( $value ) as $token ) {
				$tokens[ $token ] = true;
			}
			continue;
		}

		if ( ! is_array( $value ) ) {
			continue;
		}

		foreach ( $value as $entry ) {
			if ( ! is_string( $entry ) ) {
				continue;
			}

			foreach ( fs_core_enhancements_split_tokens( $entry ) as $token ) {
				$tokens[ $token ] = true;
			}
		}
	}

	return array_keys( $tokens );
}

/**
 * Extract class tokens from rendered block markup.
 *
 * @param string $block_content Rendered block markup.
 *
 * @return string[]
 */
function fs_core_enhancements_extract_tokens_from_block_content(
	$block_content
) {
	if (
		! is_string( $block_content ) ||
		'' === $block_content ||
		false === strpos( $block_content, 'class=' )
	) {
		return [];
	}

	$matches = [];
	preg_match_all(
		'/\bclass=(["\'])(.*?)\1/s',
		$block_content,
		$matches,
		PREG_SET_ORDER
	);

	if ( empty( $matches ) ) {
		return [];
	}

	$tokens = [];

	foreach ( $matches as $match ) {
		if ( empty( $match[2] ) || ! is_string( $match[2] ) ) {
			continue;
		}

		foreach ( fs_core_enhancements_split_tokens( $match[2] ) as $token ) {
			$tokens[ $token ] = true;
		}
	}

	return array_keys( $tokens );
}

/**
 * Detect whether a class token is covered by frontend-styles.css.
 *
 * @param string $token Candidate class token.
 *
 * @return bool
 */
function fs_core_enhancements_is_frontend_style_token( $token ) {
	return fs_core_enhancements_match_manifest_token(
		$token,
		'fs_core_enhancements_is_frontend_style_token'
	);
}

/**
 * Determine whether a block uses generated utility classes.
 *
 * @param array $attrs Block attributes.
 *
 * @return bool
 */
function fs_core_enhancements_block_needs_utilities( $attrs ) {
	if ( ! is_array( $attrs ) ) {
		return false;
	}

	foreach ( $attrs as $key => $value ) {
		if ( ! is_string( $key ) ) {
			continue;
		}

		$is_spacing_attribute =
			0 === strpos( $key, 'padding' ) ||
			0 === strpos( $key, 'margin' ) ||
			0 === strpos( $key, 'negativeMargin' );

		if ( $is_spacing_attribute && is_string( $value ) && '' !== trim( $value ) ) {
			return true;
		}
	}

	foreach ( fs_core_enhancements_extract_tokens_from_attrs( $attrs ) as $token ) {
		if ( fs_core_enhancements_is_utility_token( $token ) ) {
			return true;
		}
	}

	return false;
}

/**
 * Determine whether a rendered block requires frontend styles.
 *
 * @param string $block_name Block name.
 * @param array  $attrs      Block attributes.
 *
 * @return bool
 */
function fs_core_enhancements_block_needs_frontend_style( $block_name, $attrs ) {
	foreach ( fs_core_enhancements_extract_tokens_from_attrs( $attrs ) as $token ) {
		if ( fs_core_enhancements_is_frontend_style_token( $token ) ) {
			return true;
		}
	}

	switch ( $block_name ) {
		case 'core/video':
			return ! empty( $attrs['useCustomPlayButton'] );
		case 'fs-blocks/alert':
		case 'fs-blocks/dynamic-picture-block':
		case 'fs-blocks/carousel':
			return true;
		default:
			return false;
	}
}

/**
 * Determine whether rendered markup includes classes that require frontend styles.
 *
 * @param string $block_name    Block name.
 * @param string $block_content Rendered block content.
 *
 * @return bool
 */
function fs_core_enhancements_block_content_needs_frontend_style(
	$block_name,
	$block_content
) {
	unset( $block_name );

	foreach (
		fs_core_enhancements_extract_tokens_from_block_content( $block_content )
		as $token
	) {
		if ( fs_core_enhancements_is_frontend_style_token( $token ) ) {
			return true;
		}
	}

	return false;
}

/**
 * Determine whether rendered markup includes generated utility classes.
 *
 * @param string $block_content Rendered block content.
 *
 * @return bool
 */
function fs_core_enhancements_block_content_needs_utilities( $block_content ) {
	foreach (
		fs_core_enhancements_extract_tokens_from_block_content( $block_content )
		as $token
	) {
		if ( fs_core_enhancements_is_utility_token( $token ) ) {
			return true;
		}
	}

	return false;
}
