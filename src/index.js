/**
 * File: index.js
 *
 * Extends core blocks with custom attributes and InspectorControls using 10up's registerBlockExtension.
 * Adds FormTokenField and dropdowns to apply Bootstrap classes to multiple blocks.
 * Adds custom width controls to core/column for breakpoint-specific layouts.
 */

import './block-enhancements.js';

// Import span modal
import './formats/span-format.js';

// Import SCSS for compilation
import './editor.scss';

// Import helper modules
import registerExtensions from './registerExtensions';

registerExtensions();
