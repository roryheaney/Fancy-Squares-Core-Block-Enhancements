=== Fancy Squares - Core Block Enhancements ===
Contributors: roryheaney
Tags: gutenberg, blocks, interactivity, editor
Requires at least: 6.9
Tested up to: 6.9
Requires PHP: 7.2.24
Stable tag: 1.2.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Extends core blocks with token-driven classes, responsive width controls, and interactive block behavior.

== Description ==

Fancy Squares - Core Block Enhancements extends selected core blocks and provides optional custom blocks with WordPress Interactivity API features.

Highlights:
* Token-driven class controls for supported core blocks.
* Interactive custom blocks including accordion, tabs, content showcase, carousel, and modal.
* Conditional frontend runtime and style loading based on rendered block usage.
* Utilities stylesheet mode control in Settings > Fancy Squares Blocks.

Note:
* Carousel functionality currently uses the Swiper library loaded from jsDelivr CDN with SRI and crossorigin attributes.

== Installation ==

1. Upload the plugin folder to the /wp-content/plugins/ directory.
2. Activate the plugin through the Plugins screen in WordPress.
3. Open Settings > Fancy Squares Blocks and enable any optional custom blocks.
4. Use supported block controls in the editor.

== Frequently Asked Questions ==

= Does this plugin include optional custom blocks? =

Yes. Custom blocks are available and can be enabled from Settings > Fancy Squares Blocks.

= Does this plugin load all frontend assets on every page? =

No. Frontend runtime and styles are conditionally loaded based on rendered block features and classes.

== Changelog ==

= 1.2.0 =
* Added Columns Layout Presets panel to core/columns with responsive presets (1 mobile / 2 md+, 1 mobile / 3 md+, 1 mobile / 4 md+, 1 mobile / 2 md / 4 lg+).
* Added Reset columns action to clear applied widths and revert to default equal-width behavior.
* Fixed editor broken states where the active tab item content was hidden.
* Fixed styles not loading.
* Modal audit fixes.
* General audit and code quality improvements.

= 1.1.8 =
* Current stable release.
