<?php

/**
 * Columns block render filter for Fancy Squares Core Block Enhancements.
 */

defined('ABSPATH') || exit;

/**
 * Add a role of list and list-item classes to core/columns blocks.
 *
 * @param string $block_content Rendered HTML of the block.
 * @param array  $block         Parsed block data.
 *
 * @return string Modified block HTML.
 */
function fs_core_enhancements_columns_render($block_content, $block)
{
        if (
                isset($block['blockName']) &&
                'core/columns' === $block['blockName']
        ) {
                $processor = new WP_HTML_Tag_Processor($block_content);
                if ($processor->next_tag(array('tag_name' => 'div', 'class_name' => 'wp-block-columns'))) {
                        if (! empty($block['attrs']['isList'])) {
                                $processor->set_attribute('role', 'list');
                                $processor->add_class('wp-block-fancysquares-columns');
                        }
                        if (! empty($block['attrs']['isConstrained'])) {
                                $processor->add_class('wp-block-columns--constrained');
                        }

                        if (! empty($block['attrs']['isList'])) {
                                while ($processor->next_tag(array('tag_name' => 'div', 'class_name' => 'wp-block-column'))) {
                                        $processor->set_attribute('role', 'listitem');
                                        $processor->add_class('wp-block-fancysquares-column');
                                }
                        }

                        $block_content = $processor->get_updated_html();
                }
        }

	return $block_content;
}
add_filter('render_block_core/columns', 'fs_core_enhancements_columns_render', 10, 2);
