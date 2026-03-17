const pages = [
	{
		slug: 'block-editor',
		url: 'https://developer.wordpress.org/block-editor/',
	},
	{
		slug: 'explanations',
		url: 'https://developer.wordpress.org/block-editor/explanations/',
	},
	{
		slug: 'getting-started',
		url: 'https://developer.wordpress.org/block-editor/getting-started/',
	},
	{
		slug: 'how-to-guides',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/',
	},
	{
		slug: 'reference-guides',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/',
	},
	{
		slug: 'internationalization',
		url: 'https://developer.wordpress.org/block-editor/developers/internationalization/',
	},
	{
		slug: 'architecture',
		url: 'https://developer.wordpress.org/block-editor/explanations/architecture/',
	},
	{
		slug: 'history',
		url: 'https://developer.wordpress.org/block-editor/explanations/history/',
	},
	{
		slug: 'user-interface',
		url: 'https://developer.wordpress.org/block-editor/explanations/user-interface/',
	},
	{
		slug: 'create-block',
		url: 'https://developer.wordpress.org/block-editor/getting-started/create-block/',
	},
	{
		slug: 'devenv',
		url: 'https://developer.wordpress.org/block-editor/getting-started/devenv/',
	},
	{
		slug: 'faq',
		url: 'https://developer.wordpress.org/block-editor/getting-started/faq/',
	},
	{
		slug: 'fundamentals',
		url: 'https://developer.wordpress.org/block-editor/getting-started/fundamentals/',
	},
	{
		slug: 'glossary',
		url: 'https://developer.wordpress.org/block-editor/getting-started/glossary/',
	},
	{
		slug: 'quick-start-guide',
		url: 'https://developer.wordpress.org/block-editor/getting-started/quick-start-guide/',
	},
	{
		slug: 'tutorial',
		url: 'https://developer.wordpress.org/block-editor/getting-started/tutorial/',
	},
	{
		slug: 'accessibility',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/accessibility/',
	},
	{
		slug: 'block-tutorial',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/',
	},
	{
		slug: 'curating-the-editor-experience',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/curating-the-editor-experience/',
	},
	{
		slug: 'data-basics',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/data-basics/',
	},
	{
		slug: 'enqueueing-assets-in-the-editor',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/enqueueing-assets-in-the-editor/',
	},
	{
		slug: 'feature-flags',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/feature-flags/',
	},
	{
		slug: 'format-api',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/format-api/',
	},
	{
		slug: 'internationalization-2',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/internationalization/',
	},
	{
		slug: 'metabox',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/metabox/',
	},
	{
		slug: 'notices',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/notices/',
	},
	{
		slug: 'platform',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/platform/',
	},
	{
		slug: 'plugin-sidebar-0',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/plugin-sidebar-0/',
	},
	{
		slug: 'propagating-updates',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/propagating-updates/',
	},
	{
		slug: 'themes',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/themes/',
	},
	{
		slug: 'thunks',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/thunks/',
	},
	{
		slug: 'widgets',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/widgets/',
	},
	{
		slug: 'packages-block-editor',
		url: 'https://developer.wordpress.org/block-editor/packages/packages-block-editor/',
	},
	{
		slug: 'packages-block-serialization-default-parser',
		url: 'https://developer.wordpress.org/block-editor/packages/packages-block-serialization-default-parser/',
	},
	{
		slug: 'packages-dependency-extraction-webpack-plugin',
		url: 'https://developer.wordpress.org/block-editor/packages/packages-dependency-extraction-webpack-plugin/',
	},
	{
		slug: 'packages-scripts',
		url: 'https://developer.wordpress.org/block-editor/packages/packages-scripts/',
	},
	{
		slug: 'README.md',
		url: 'https://developer.wordpress.org/block-editor/packages/README.md/',
	},
	{
		slug: 'key-concepts',
		url: 'https://developer.wordpress.org/block-editor/principles/key-concepts/',
	},
	{
		slug: 'versions-in-wordpress',
		url: 'https://developer.wordpress.org/block-editor/principles/versions-in-wordpress/',
	},
	{
		slug: 'components',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/',
	},
	{
		slug: 'block-api',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/block-api/',
	},
	{
		slug: 'components-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/',
	},
	{
		slug: 'CONTRIBUTING.md',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/CONTRIBUTING.md/',
	},
	{
		slug: 'core-blocks',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/core-blocks/',
	},
	{
		slug: 'data',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/data/',
	},
	{
		slug: 'filters',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/filters/',
	},
	{
		slug: 'interactivity-api',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/',
	},
	{
		slug: 'packages',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/',
	},
	{
		slug: 'richtext',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/richtext/',
	},
	{
		slug: 'slotfills',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/slotfills/',
	},
	{
		slug: 'theme-json-reference',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/theme-json-reference/',
	},
	{
		slug: 'block-annotations',
		url: 'https://developer.wordpress.org/block-editor/developers/block-api/block-annotations/',
	},
	{
		slug: 'block-attributes',
		url: 'https://developer.wordpress.org/block-editor/developers/block-api/block-attributes/',
	},
	{
		slug: 'block-registration',
		url: 'https://developer.wordpress.org/block-editor/developers/block-api/block-registration/',
	},
	{
		slug: 'block-supports',
		url: 'https://developer.wordpress.org/block-editor/developers/block-api/block-supports/',
	},
	{
		slug: 'block-templates',
		url: 'https://developer.wordpress.org/block-editor/developers/block-api/block-templates/',
	},
	{
		slug: 'automated-testing',
		url: 'https://developer.wordpress.org/block-editor/explanations/architecture/automated-testing/',
	},
	{
		slug: 'data-flow',
		url: 'https://developer.wordpress.org/block-editor/explanations/architecture/data-flow/',
	},
	{
		slug: 'entities',
		url: 'https://developer.wordpress.org/block-editor/explanations/architecture/entities/',
	},
	{
		slug: 'full-site-editing-templates',
		url: 'https://developer.wordpress.org/block-editor/explanations/architecture/full-site-editing-templates/',
	},
	{
		slug: 'key-concepts-2',
		url: 'https://developer.wordpress.org/block-editor/explanations/architecture/key-concepts/',
	},
	{
		slug: 'modularity',
		url: 'https://developer.wordpress.org/block-editor/explanations/architecture/modularity/',
	},
	{
		slug: 'performance',
		url: 'https://developer.wordpress.org/block-editor/explanations/architecture/performance/',
	},
	{
		slug: 'styles',
		url: 'https://developer.wordpress.org/block-editor/explanations/architecture/styles/',
	},
	{
		slug: 'animation',
		url: 'https://developer.wordpress.org/block-editor/explanations/user-interface/animation/',
	},
	{
		slug: 'block-design',
		url: 'https://developer.wordpress.org/block-editor/explanations/user-interface/block-design/',
	},
	{
		slug: 'design-resources',
		url: 'https://developer.wordpress.org/block-editor/explanations/user-interface/design-resources/',
	},
	{
		slug: 'get-started-with-create-block',
		url: 'https://developer.wordpress.org/block-editor/getting-started/devenv/get-started-with-create-block/',
	},
	{
		slug: 'get-started-with-wp-env',
		url: 'https://developer.wordpress.org/block-editor/getting-started/devenv/get-started-with-wp-env/',
	},
	{
		slug: 'get-started-with-wp-scripts',
		url: 'https://developer.wordpress.org/block-editor/getting-started/devenv/get-started-with-wp-scripts/',
	},
	{
		slug: 'nodejs-development-environment',
		url: 'https://developer.wordpress.org/block-editor/getting-started/devenv/nodejs-development-environment/',
	},
	{
		slug: 'registration-of-a-block',
		url: 'https://developer.wordpress.org/block-editor/getting-started/fundamentals-block-development/registration-of-a-block/',
	},
	{
		slug: 'block-in-the-editor',
		url: 'https://developer.wordpress.org/block-editor/getting-started/fundamentals/block-in-the-editor/',
	},
	{
		slug: 'block-json',
		url: 'https://developer.wordpress.org/block-editor/getting-started/fundamentals/block-json/',
	},
	{
		slug: 'block-wrapper',
		url: 'https://developer.wordpress.org/block-editor/getting-started/fundamentals/block-wrapper/',
	},
	{
		slug: 'file-structure-of-a-block',
		url: 'https://developer.wordpress.org/block-editor/getting-started/fundamentals/file-structure-of-a-block/',
	},
	{
		slug: 'javascript-in-the-block-editor',
		url: 'https://developer.wordpress.org/block-editor/getting-started/fundamentals/javascript-in-the-block-editor/',
	},
	{
		slug: 'markup-representation-block',
		url: 'https://developer.wordpress.org/block-editor/getting-started/fundamentals/markup-representation-block/',
	},
	{
		slug: 'registration-of-a-block-2',
		url: 'https://developer.wordpress.org/block-editor/getting-started/fundamentals/registration-of-a-block/',
	},
	{
		slug: 'static-dynamic-rendering',
		url: 'https://developer.wordpress.org/block-editor/getting-started/fundamentals/static-dynamic-rendering/',
	},
	{
		slug: 'applying-styles-with-stylesheets',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/applying-styles-with-stylesheets/',
	},
	{
		slug: 'block-supports-in-dynamic-blocks',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/block-supports-in-dynamic-blocks/',
	},
	{
		slug: 'creating-dynamic-blocks',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/creating-dynamic-blocks/',
	},
	{
		slug: 'extending-the-query-loop-block',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/extending-the-query-loop-block/',
	},
	{
		slug: 'nested-blocks-inner-blocks',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/nested-blocks-inner-blocks/',
	},
	{
		slug: 'block-locking',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/curating-the-editor-experience/block-locking/',
	},
	{
		slug: 'disable-editor-functionality',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/curating-the-editor-experience/disable-editor-functionality/',
	},
	{
		slug: 'filters-and-hooks',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/curating-the-editor-experience/filters-and-hooks/',
	},
	{
		slug: 'patterns',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/curating-the-editor-experience/patterns/',
	},
	{
		slug: 'theme-json',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/curating-the-editor-experience/theme-json/',
	},
	{
		slug: '1-data-basics-setup',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/data-basics/1-data-basics-setup/',
	},
	{
		slug: '2-building-a-list-of-pages',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/data-basics/2-building-a-list-of-pages/',
	},
	{
		slug: '3-building-an-edit-form',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/data-basics/3-building-an-edit-form/',
	},
	{
		slug: '4-building-a-create-page-form',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/data-basics/4-building-a-create-page-form/',
	},
	{
		slug: '5-adding-a-delete-button',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/data-basics/5-adding-a-delete-button/',
	},
	{
		slug: 'js-build-setup',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/javascript/js-build-setup/',
	},
	{
		slug: 'loading-javascript',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/javascript/loading-javascript/',
	},
	{
		slug: 'custom-block-editor',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/platform/custom-block-editor/',
	},
	{
		slug: 'plugin-sidebar-0-2',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/sidebar-tutorial/plugin-sidebar-0/',
	},
	{
		slug: 'global-settings-and-styles.md',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/themes/global-settings-and-styles.md/',
	},
	{
		slug: 'global-settings-and-styles',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/themes/global-settings-and-styles/',
	},
	{
		slug: 'theme-support',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-support/',
	},
	{
		slug: 'legacy-widget-block',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/widgets/legacy-widget-block/',
	},
	{
		slug: 'opting-out',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/widgets/opting-out/',
	},
	{
		slug: 'overview',
		url: 'https://developer.wordpress.org/block-editor/how-to-guides/widgets/overview/',
	},
	{
		slug: 'README.md-2',
		url: 'https://developer.wordpress.org/block-editor/packages/wp-build/README.md/',
	},
	{
		slug: 'animate',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/animate/',
	},
	{
		slug: 'button',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/button/',
	},
	{
		slug: 'custom-select-control',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/custom-select-control/',
	},
	{
		slug: 'divider',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/divider/',
	},
	{
		slug: 'dropdown-menu',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/dropdown-menu/',
	},
	{
		slug: 'dropdown',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/dropdown/',
	},
	{
		slug: 'elevation',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/elevation/',
	},
	{
		slug: 'flex',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/flex/',
	},
	{
		slug: 'icon-button',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/icon-button/',
	},
	{
		slug: 'icon',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/icon/',
	},
	{
		slug: 'modal',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/modal/',
	},
	{
		slug: 'select-control',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/select-control/',
	},
	{
		slug: 'slot-fill',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/slot-fill/',
	},
	{
		slug: 'surface',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/surface/',
	},
	{
		slug: 'tab-panel',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/tab-panel/',
	},
	{
		slug: 'text-control',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/text-control/',
	},
	{
		slug: 'text',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/text/',
	},
	{
		slug: 'toolbar-button',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/toolbar-button/',
	},
	{
		slug: 'toolbar-group',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/toolbar-group/',
	},
	{
		slug: 'toolbar-Item',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/toolbar-Item/',
	},
	{
		slug: 'toolbar',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/toolbar/',
	},
	{
		slug: 'packages-block-editor-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/packages/packages-block-editor/',
	},
	{
		slug: 'packages-blocks',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/packages/packages-blocks/',
	},
	{
		slug: 'packages-data',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/packages/packages-data/',
	},
	{
		slug: 'packages-dependency-extraction-webpack-plugin-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/packages/packages-dependency-extraction-webpack-plugin/',
	},
	{
		slug: 'packages-edit-post',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/packages/packages-edit-post/',
	},
	{
		slug: 'packages-editor',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/packages/packages-editor/',
	},
	{
		slug: 'packages-element',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/packages/packages-element/',
	},
	{
		slug: 'packages-env',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/packages/packages-env/',
	},
	{
		slug: 'packages-hooks',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/packages/packages-hooks/',
	},
	{
		slug: 'packages-plugins',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/packages/packages-plugins/',
	},
	{
		slug: 'packages-primitives',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/packages/packages-primitives/',
	},
	{
		slug: 'packages-rich-text',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/packages/packages-rich-text/',
	},
	{
		slug: 'packages-scripts-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/packages/packages-scripts/',
	},
	{
		slug: 'packages-server-side-render',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/packages/packages-server-side-render/',
	},
	{
		slug: 'packages-shortcode',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/packages/packages-shortcode/',
	},
	{
		slug: 'block-annotations-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/block-api/block-annotations/',
	},
	{
		slug: 'block-api-versions',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/block-api/block-api-versions/',
	},
	{
		slug: 'block-attributes-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/block-api/block-attributes/',
	},
	{
		slug: 'block-bindings',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/block-api/block-bindings/',
	},
	{
		slug: 'block-context',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/block-api/block-context/',
	},
	{
		slug: 'block-deprecation',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/block-api/block-deprecation/',
	},
	{
		slug: 'block-edit-save',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/',
	},
	{
		slug: 'block-metadata',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/',
	},
	{
		slug: 'block-patterns',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/block-api/block-patterns/',
	},
	{
		slug: 'block-registration-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/',
	},
	{
		slug: 'block-selectors',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/block-api/block-selectors/',
	},
	{
		slug: 'block-styles',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/block-api/block-styles/',
	},
	{
		slug: 'block-supports-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/',
	},
	{
		slug: 'block-templates-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/block-api/block-templates/',
	},
	{
		slug: 'block-transforms',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/block-api/block-transforms/',
	},
	{
		slug: 'block-variations',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/',
	},
	{
		slug: 'alignment-matrix-control',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/alignment-matrix-control/',
	},
	{
		slug: 'angle-picker-control',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/angle-picker-control/',
	},
	{
		slug: 'animate-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/animate/',
	},
	{
		slug: 'autocomplete',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/autocomplete/',
	},
	{
		slug: 'base-control',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/base-control/',
	},
	{
		slug: 'base-field',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/base-field/',
	},
	{
		slug: 'border-box-control',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/border-box-control/',
	},
	{
		slug: 'border-control',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/border-control/',
	},
	{
		slug: 'box-control',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/box-control/',
	},
	{
		slug: 'button-group',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/button-group/',
	},
	{
		slug: 'button-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/button/',
	},
	{
		slug: 'card-body',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/card-body/',
	},
	{
		slug: 'card-divider',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/card-divider/',
	},
	{
		slug: 'card-footer',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/card-footer/',
	},
	{
		slug: 'card-header',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/card-header/',
	},
	{
		slug: 'card-media',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/card-media/',
	},
	{
		slug: 'card',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/card/',
	},
	{
		slug: 'checkbox-control',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/checkbox-control/',
	},
	{
		slug: 'circular-option-picker',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/circular-option-picker/',
	},
	{
		slug: 'clipboard-button',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/clipboard-button/',
	},
	{
		slug: 'color-indicator',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/color-indicator/',
	},
	{
		slug: 'color-palette',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/color-palette/',
	},
	{
		slug: 'color-picker',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/color-picker/',
	},
	{
		slug: 'combobox-control',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/combobox-control/',
	},
	{
		slug: 'composite',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/composite/',
	},
	{
		slug: 'confirm-dialog',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/confirm-dialog/',
	},
	{
		slug: 'custom-select-control-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/custom-select-control/',
	},
	{
		slug: 'dashicon',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/dashicon/',
	},
	{
		slug: 'date-calendar',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/date-calendar/',
	},
	{
		slug: 'date-range-calendar',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/date-range-calendar/',
	},
	{
		slug: 'date-time',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/date-time/',
	},
	{
		slug: 'dimension-control',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/dimension-control/',
	},
	{
		slug: 'disabled',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/disabled/',
	},
	{
		slug: 'divider-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/divider/',
	},
	{
		slug: 'draggable',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/draggable/',
	},
	{
		slug: 'drop-zone',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/drop-zone/',
	},
	{
		slug: 'dropdown-menu-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/dropdown-menu/',
	},
	{
		slug: 'dropdown-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/dropdown/',
	},
	{
		slug: 'duotone-picker',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/duotone-picker/',
	},
	{
		slug: 'elevation-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/elevation/',
	},
	{
		slug: 'external-link',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/external-link/',
	},
	{
		slug: 'flex-block',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/flex-block/',
	},
	{
		slug: 'flex-item',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/flex-item/',
	},
	{
		slug: 'flex-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/flex/',
	},
	{
		slug: 'flyout',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/flyout/',
	},
	{
		slug: 'focal-point-picker',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/focal-point-picker/',
	},
	{
		slug: 'focusable-iframe',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/focusable-iframe/',
	},
	{
		slug: 'font-size-picker',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/font-size-picker/',
	},
	{
		slug: 'form-file-upload',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/form-file-upload/',
	},
	{
		slug: 'form-toggle',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/form-toggle/',
	},
	{
		slug: 'form-token-field',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/form-token-field/',
	},
	{
		slug: 'gradient-picker',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/gradient-picker/',
	},
	{
		slug: 'grid',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/grid/',
	},
	{
		slug: 'guide',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/guide/',
	},
	{
		slug: 'h-stack',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/h-stack/',
	},
	{
		slug: 'heading',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/heading/',
	},
	{
		slug: 'higher-order',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/higher-order/',
	},
	{
		slug: 'icon-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/icon/',
	},
	{
		slug: 'input-control',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/input-control/',
	},
	{
		slug: 'isolated-event-container',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/isolated-event-container/',
	},
	{
		slug: 'item-group',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/item-group/',
	},
	{
		slug: 'item',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/item/',
	},
	{
		slug: 'keyboard-shortcuts',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/keyboard-shortcuts/',
	},
	{
		slug: 'menu-group',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/menu-group/',
	},
	{
		slug: 'menu-item',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/menu-item/',
	},
	{
		slug: 'menu-items-choice',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/menu-items-choice/',
	},
	{
		slug: 'modal-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/modal/',
	},
	{
		slug: 'navigable-container',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/navigable-container/',
	},
	{
		slug: 'navigate-regions',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/navigate-regions/',
	},
	{
		slug: 'navigation',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/navigation/',
	},
	{
		slug: 'navigator',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/navigator/',
	},
	{
		slug: 'notice',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/notice/',
	},
	{
		slug: 'number-control',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/number-control/',
	},
	{
		slug: 'panel',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/panel/',
	},
	{
		slug: 'placeholder',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/placeholder/',
	},
	{
		slug: 'popover',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/popover/',
	},
	{
		slug: 'progress-bar',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/progress-bar/',
	},
	{
		slug: 'query-controls',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/query-controls/',
	},
	{
		slug: 'radio-control',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/radio-control/',
	},
	{
		slug: 'radio-group',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/radio-group/',
	},
	{
		slug: 'range-control',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/range-control/',
	},
	{
		slug: 'resizable-box',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/resizable-box/',
	},
	{
		slug: 'resize-tooltip',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/resize-tooltip/',
	},
	{
		slug: 'responsive-wrapper',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/responsive-wrapper/',
	},
	{
		slug: 'sandbox',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/sandbox/',
	},
	{
		slug: 'scroll-lock',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/scroll-lock/',
	},
	{
		slug: 'scrollable',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/scrollable/',
	},
	{
		slug: 'search-control',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/search-control/',
	},
	{
		slug: 'select-control-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/select-control/',
	},
	{
		slug: 'slot-fill-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/slot-fill/',
	},
	{
		slug: 'snackbar',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/snackbar/',
	},
	{
		slug: 'spacer',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/spacer/',
	},
	{
		slug: 'spinner',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/spinner/',
	},
	{
		slug: 'surface-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/surface/',
	},
	{
		slug: 'tab-panel-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/tab-panel/',
	},
	{
		slug: 'text-control-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/text-control/',
	},
	{
		slug: 'text-highlight',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/text-highlight/',
	},
	{
		slug: 'text-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/text/',
	},
	{
		slug: 'textarea-control',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/textarea-control/',
	},
	{
		slug: 'toggle-control',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/toggle-control/',
	},
	{
		slug: 'toggle-group-control-option-base',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/toggle-group-control-option-base/',
	},
	{
		slug: 'toggle-group-control-option-icon',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/toggle-group-control-option-icon/',
	},
	{
		slug: 'toggle-group-control-option',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/toggle-group-control-option/',
	},
	{
		slug: 'toggle-group-control',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/toggle-group-control/',
	},
	{
		slug: 'toolbar-button-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/toolbar-button/',
	},
	{
		slug: 'toolbar-dropdown-menu',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/toolbar-dropdown-menu/',
	},
	{
		slug: 'toolbar-group-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/toolbar-group/',
	},
	{
		slug: 'toolbar-item',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/toolbar-item/',
	},
	{
		slug: 'toolbar-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/toolbar/',
	},
	{
		slug: 'tools-panel-header',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/tools-panel-header/',
	},
	{
		slug: 'tools-panel-item',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/tools-panel-item/',
	},
	{
		slug: 'tools-panel',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/tools-panel/',
	},
	{
		slug: 'tooltip',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/tooltip/',
	},
	{
		slug: 'tree-grid',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/tree-grid/',
	},
	{
		slug: 'tree-select',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/tree-select/',
	},
	{
		slug: 'truncate',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/truncate/',
	},
	{
		slug: 'unit-control',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/unit-control/',
	},
	{
		slug: 'v-stack',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/v-stack/',
	},
	{
		slug: 'visually-hidden',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/visually-hidden/',
	},
	{
		slug: 'with-constrained-tabbing',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/with-constrained-tabbing/',
	},
	{
		slug: 'with-fallback-styles',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/with-fallback-styles/',
	},
	{
		slug: 'with-filters',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/with-filters/',
	},
	{
		slug: 'with-focus-outside',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/with-focus-outside/',
	},
	{
		slug: 'with-focus-return',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/with-focus-return/',
	},
	{
		slug: 'with-notices',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/with-notices/',
	},
	{
		slug: 'with-spoken-messages',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/with-spoken-messages/',
	},
	{
		slug: 'z-stack',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/components/z-stack/',
	},
	{
		slug: 'data-core-annotations',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/data/data-core-annotations/',
	},
	{
		slug: 'data-core-block-directory',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/data/data-core-block-directory/',
	},
	{
		slug: 'data-core-block-editor',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/data/data-core-block-editor/',
	},
	{
		slug: 'data-core-blocks',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/data/data-core-blocks/',
	},
	{
		slug: 'data-core-commands',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/data/data-core-commands/',
	},
	{
		slug: 'data-core-customize-widgets',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/data/data-core-customize-widgets/',
	},
	{
		slug: 'data-core-edit-post',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/data/data-core-edit-post/',
	},
	{
		slug: 'data-core-edit-site',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/data/data-core-edit-site/',
	},
	{
		slug: 'data-core-edit-widgets',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/data/data-core-edit-widgets/',
	},
	{
		slug: 'data-core-editor',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/data/data-core-editor/',
	},
	{
		slug: 'data-core-keyboard-shortcuts',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/data/data-core-keyboard-shortcuts/',
	},
	{
		slug: 'data-core-notices',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/data/data-core-notices/',
	},
	{
		slug: 'data-core-nux',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/data/data-core-nux/',
	},
	{
		slug: 'data-core-preferences',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/data/data-core-preferences/',
	},
	{
		slug: 'data-core-reusable-blocks',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/data/data-core-reusable-blocks/',
	},
	{
		slug: 'data-core-rich-text',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/data/data-core-rich-text/',
	},
	{
		slug: 'data-core-viewport',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/data/data-core-viewport/',
	},
	{
		slug: 'data-core',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/data/data-core/',
	},
	{
		slug: 'autocomplete-filters',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/filters/autocomplete-filters/',
	},
	{
		slug: 'block-filters',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/',
	},
	{
		slug: 'editor-filters',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/filters/editor-filters/',
	},
	{
		slug: 'global-styles-filters',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/filters/global-styles-filters/',
	},
	{
		slug: 'i18n-filters',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/filters/i18n-filters/',
	},
	{
		slug: 'parser-filters',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/filters/parser-filters/',
	},
	{
		slug: 'api-reference',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/api-reference/',
	},
	{
		slug: 'core-concepts',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/core-concepts/',
	},
	{
		slug: 'iapi-about',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/iapi-about/',
	},
	{
		slug: 'iapi-faq',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/iapi-faq/',
	},
	{
		slug: 'iapi-quick-start-guide',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/iapi-quick-start-guide/',
	},
	{
		slug: 'i18n',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/i18n/',
	},
	{
		slug: 'packages-a11y',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-a11y/',
	},
	{
		slug: 'packages-abilities',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-abilities/',
	},
	{
		slug: 'packages-admin-ui',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-admin-ui/',
	},
	{
		slug: 'packages-annotations',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-annotations/',
	},
	{
		slug: 'packages-api-fetch',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-api-fetch/',
	},
	{
		slug: 'packages-asset-loader',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-asset-loader/',
	},
	{
		slug: 'packages-autop',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-autop/',
	},
	{
		slug: 'packages-babel-plugin-import-jsx-pragma',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-babel-plugin-import-jsx-pragma/',
	},
	{
		slug: 'packages-babel-plugin-makepot',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-babel-plugin-makepot/',
	},
	{
		slug: 'packages-babel-preset-default',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-babel-preset-default/',
	},
	{
		slug: 'packages-base-styles',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-base-styles/',
	},
	{
		slug: 'packages-blob',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blob/',
	},
	{
		slug: 'packages-block-directory',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-directory/',
	},
	{
		slug: 'packages-block-editor-3',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/',
	},
	{
		slug: 'packages-block-library',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-library/',
	},
	{
		slug: 'packages-block-serialization-default-parser-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-serialization-default-parser/',
	},
	{
		slug: 'packages-block-serialization-spec-parser',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-serialization-spec-parser/',
	},
	{
		slug: 'packages-blocks-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/',
	},
	{
		slug: 'packages-boot',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-boot/',
	},
	{
		slug: 'packages-browserslist-config',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-browserslist-config/',
	},
	{
		slug: 'packages-commands',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-commands/',
	},
	{
		slug: 'packages-components',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/',
	},
	{
		slug: 'packages-compose',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-compose/',
	},
	{
		slug: 'packages-core-abilities',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-core-abilities/',
	},
	{
		slug: 'packages-core-commands',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-core-commands/',
	},
	{
		slug: 'packages-core-data',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-core-data/',
	},
	{
		slug: 'packages-create-block-interactive-template',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-create-block-interactive-template/',
	},
	{
		slug: 'packages-create-block-tutorial-template',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-create-block-tutorial-template/',
	},
	{
		slug: 'packages-create-block',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-create-block/',
	},
	{
		slug: 'packages-custom-templated-path-webpack-plugin',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-custom-templated-path-webpack-plugin/',
	},
	{
		slug: 'packages-customize-widgets',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-customize-widgets/',
	},
	{
		slug: 'packages-data-controls',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data-controls/',
	},
	{
		slug: 'packages-data-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/',
	},
	{
		slug: 'packages-dataviews',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-dataviews/',
	},
	{
		slug: 'packages-date',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-date/',
	},
	{
		slug: 'packages-dependency-extraction-webpack-plugin-3',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-dependency-extraction-webpack-plugin/',
	},
	{
		slug: 'packages-deprecated',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-deprecated/',
	},
	{
		slug: 'packages-docgen',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-docgen/',
	},
	{
		slug: 'packages-dom-ready',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-dom-ready/',
	},
	{
		slug: 'packages-dom',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-dom/',
	},
	{
		slug: 'packages-e2e-test-utils-playwright',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-e2e-test-utils-playwright/',
	},
	{
		slug: 'packages-e2e-test-utils',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-e2e-test-utils/',
	},
	{
		slug: 'packages-e2e-tests',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-e2e-tests/',
	},
	{
		slug: 'packages-edit-post-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-edit-post/',
	},
	{
		slug: 'packages-edit-site',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-edit-site/',
	},
	{
		slug: 'packages-edit-widgets',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-edit-widgets/',
	},
	{
		slug: 'packages-editor-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-editor/',
	},
	{
		slug: 'packages-element-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/',
	},
	{
		slug: 'packages-env-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/',
	},
	{
		slug: 'packages-escape-html',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-escape-html/',
	},
	{
		slug: 'packages-eslint-plugin',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-eslint-plugin/',
	},
	{
		slug: 'packages-experiments',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-experiments/',
	},
	{
		slug: 'packages-fields',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-fields/',
	},
	{
		slug: 'packages-format-library',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-format-library/',
	},
	{
		slug: 'packages-global-styles-engine',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-global-styles-engine/',
	},
	{
		slug: 'packages-global-styles-ui',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-global-styles-ui/',
	},
	{
		slug: 'packages-hooks-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-hooks/',
	},
	{
		slug: 'packages-html-entities',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-html-entities/',
	},
	{
		slug: 'packages-i18n',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/',
	},
	{
		slug: 'packages-icons',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-icons/',
	},
	{
		slug: 'packages-image-cropper',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-image-cropper/',
	},
	{
		slug: 'packages-interactivity-router',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-interactivity-router/',
	},
	{
		slug: 'packages-interactivity',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-interactivity/',
	},
	{
		slug: 'packages-interface',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-interface/',
	},
	{
		slug: 'packages-is-shallow-equal',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-is-shallow-equal/',
	},
	{
		slug: 'packages-jest-console',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-jest-console/',
	},
	{
		slug: 'packages-jest-preset-default',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-jest-preset-default/',
	},
	{
		slug: 'packages-jest-puppeteer-axe',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-jest-puppeteer-axe/',
	},
	{
		slug: 'packages-keyboard-shortcuts',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-keyboard-shortcuts/',
	},
	{
		slug: 'packages-keycodes',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-keycodes/',
	},
	{
		slug: 'packages-latex-to-mathml',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-latex-to-mathml/',
	},
	{
		slug: 'packages-lazy-editor',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-lazy-editor/',
	},
	{
		slug: 'packages-lazy-import',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-lazy-import/',
	},
	{
		slug: 'packages-library-export-default-webpack-plugin',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-library-export-default-webpack-plugin/',
	},
	{
		slug: 'packages-list-reusable-blocks',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-list-reusable-blocks/',
	},
	{
		slug: 'packages-media-fields',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-media-fields/',
	},
	{
		slug: 'packages-media-utils',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-media-utils/',
	},
	{
		slug: 'packages-notices',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-notices/',
	},
	{
		slug: 'packages-npm-package-json-lint-config',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-npm-package-json-lint-config/',
	},
	{
		slug: 'packages-nux',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-nux/',
	},
	{
		slug: 'packages-patterns',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-patterns/',
	},
	{
		slug: 'packages-plugins-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-plugins/',
	},
	{
		slug: 'packages-postcss-plugins-preset',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-postcss-plugins-preset/',
	},
	{
		slug: 'packages-postcss-themes',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-postcss-themes/',
	},
	{
		slug: 'packages-preferences-persistence',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-preferences-persistence/',
	},
	{
		slug: 'packages-preferences',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-preferences/',
	},
	{
		slug: 'packages-prettier-config',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-prettier-config/',
	},
	{
		slug: 'packages-primitives-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-primitives/',
	},
	{
		slug: 'packages-priority-queue',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-priority-queue/',
	},
	{
		slug: 'packages-private-apis',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-private-apis/',
	},
	{
		slug: 'packages-project-management-automation',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-project-management-automation/',
	},
	{
		slug: 'packages-react-i18n',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-react-i18n/',
	},
	{
		slug: 'packages-readable-js-assets-webpack-plugin',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-readable-js-assets-webpack-plugin/',
	},
	{
		slug: 'packages-redux-routine',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-redux-routine/',
	},
	{
		slug: 'packages-reusable-blocks',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-reusable-blocks/',
	},
	{
		slug: 'packages-rich-text-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-rich-text/',
	},
	{
		slug: 'packages-route',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-route/',
	},
	{
		slug: 'packages-router',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-router/',
	},
	{
		slug: 'packages-scripts-3',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/',
	},
	{
		slug: 'packages-server-side-render-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-server-side-render/',
	},
	{
		slug: 'packages-shortcode-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-shortcode/',
	},
	{
		slug: 'packages-style-engine',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-style-engine/',
	},
	{
		slug: 'packages-stylelint-config',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-stylelint-config/',
	},
	{
		slug: 'packages-sync',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-sync/',
	},
	{
		slug: 'packages-theme',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-theme/',
	},
	{
		slug: 'packages-token-list',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-token-list/',
	},
	{
		slug: 'packages-ui',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-ui/',
	},
	{
		slug: 'packages-undo-manager',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-undo-manager/',
	},
	{
		slug: 'packages-upload-media',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-upload-media/',
	},
	{
		slug: 'packages-url',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-url/',
	},
	{
		slug: 'packages-viewport',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-viewport/',
	},
	{
		slug: 'packages-views',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-views/',
	},
	{
		slug: 'packages-warning',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-warning/',
	},
	{
		slug: 'packages-widgets',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-widgets/',
	},
	{
		slug: 'packages-wordcount',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-wordcount/',
	},
	{
		slug: 'packages-wp-build',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-wp-build/',
	},
	{
		slug: 'README.md-3',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/README.md/',
	},
	{
		slug: 'main-dashboard-button',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/slotfills/main-dashboard-button/',
	},
	{
		slug: 'plugin-block-settings-menu-item',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/slotfills/plugin-block-settings-menu-item/',
	},
	{
		slug: 'plugin-document-setting-panel',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/slotfills/plugin-document-setting-panel/',
	},
	{
		slug: 'plugin-more-menu-item',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/slotfills/plugin-more-menu-item/',
	},
	{
		slug: 'plugin-post-publish-panel',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/slotfills/plugin-post-publish-panel/',
	},
	{
		slug: 'plugin-post-status-info',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/slotfills/plugin-post-status-info/',
	},
	{
		slug: 'plugin-pre-publish-panel',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/slotfills/plugin-pre-publish-panel/',
	},
	{
		slug: 'plugin-sidebar-more-menu-item',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/slotfills/plugin-sidebar-more-menu-item/',
	},
	{
		slug: 'plugin-sidebar',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/slotfills/plugin-sidebar/',
	},
	{
		slug: 'styles-versions',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/theme-json-reference/styles-versions/',
	},
	{
		slug: 'theme-json-living',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/theme-json-reference/theme-json-living/',
	},
	{
		slug: 'theme-json-migrations',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/theme-json-reference/theme-json-migrations/',
	},
	{
		slug: 'theme-json-v1',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/theme-json-reference/theme-json-v1/',
	},
	{
		slug: 'theme-json-v2',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/theme-json-reference/theme-json-v2/',
	},
	{
		slug: 'nested-blocks-inner-blocks-2',
		url: 'https://developer.wordpress.org/block-editor/tutorials/block-tutorial/nested-blocks-inner-blocks/',
	},
	{
		slug: 'card-body-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/card/card-body/',
	},
	{
		slug: 'card-divider-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/card/card-divider/',
	},
	{
		slug: 'card-footer-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/card/card-footer/',
	},
	{
		slug: 'card-header-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/card/card-header/',
	},
	{
		slug: 'card-media-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/card/card-media/',
	},
	{
		slug: 'card-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/card/card/',
	},
	{
		slug: 'flex-3',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/flex/flex/',
	},
	{
		slug: 'navigate-regions-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/higher-order/navigate-regions/',
	},
	{
		slug: 'index.tsx',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/icon/index.tsx/',
	},
	{
		slug: 'item-group-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/item-group/item-group/',
	},
	{
		slug: 'item-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/item-group/item/',
	},
	{
		slug: 'toggle-group-control-option-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/toggle-group-control/toggle-group-control-option/',
	},
	{
		slug: 'toggle-group-control-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/toggle-group-control/toggle-group-control/',
	},
	{
		slug: 'toolbar-button-3',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/toolbar/toolbar-button/',
	},
	{
		slug: 'toolbar-item-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/toolbar/toolbar-item/',
	},
	{
		slug: 'toolbar-3',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/toolbar/toolbar/',
	},
	{
		slug: 'tools-panel-2',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/components/tools-panel/tools-panel/',
	},
	{
		slug: 'CHANGELOG',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/packages/packages-scripts/CHANGELOG/',
	},
	{
		slug: 'block-migration-for-iframe-editor-compatibility',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/block-api/block-api-versions/block-migration-for-iframe-editor-compatibility/',
	},
	{
		slug: 'server-side-rendering',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/core-concepts/server-side-rendering/',
	},
	{
		slug: 'the-reactive-and-declarative-mindset',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/core-concepts/the-reactive-and-declarative-mindset/',
	},
	{
		slug: 'undestanding-global-state-local-context-and-derived-state',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/core-concepts/undestanding-global-state-local-context-and-derived-state/',
	},
	{
		slug: 'using-typescript',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/core-concepts/using-typescript/',
	},
	{
		slug: 'packages-create-block-external-template',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-create-block/packages-create-block-external-template/',
	},
	{
		slug: 'packages-interactivity-api-reference',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-interactivity/packages-interactivity-api-reference/',
	},
	{
		slug: 'using-the-style-engine-with-block-supports',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-style-engine/using-the-style-engine-with-block-supports/',
	},
	{
		slug: '.markdownlint.json',
		url: 'https://developer.wordpress.org/block-editor/reference-guide/packages/packages-scripts/config/.markdownlint.json/',
	},
	{
		slug: 'ds-tokens.md',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-theme/docs/ds-tokens.md/',
	},
	{
		slug: 'actions.js',
		url: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-directory/src/store/actions.js/',
	},
	{
		slug: 'javascript-in-the-block-editor-2',
		url: 'https://developer.wordpress.org/block-editor/getting-started/fundamentals/file-structure-of-a-block/docs/block-editor/getting-started/fundamentals/javascript-in-the-block-editor/',
	},
	{
		slug: 'block-attributes-3',
		url: 'https://developer.wordpress.org/block-editor/getting-started/fundamentals/file-structure-of-a-block/docs/block-editor/reference-guides/block-api/block-attributes/',
	},
	{
		slug: 'block-metadata-2',
		url: 'https://developer.wordpress.org/block-editor/getting-started/fundamentals/file-structure-of-a-block/docs/block-editor/reference-guides/block-api/block-metadata/',
	},
	{
		slug: 'block-supports-3',
		url: 'https://developer.wordpress.org/block-editor/getting-started/fundamentals/file-structure-of-a-block/docs/block-editor/reference-guides/block-api/block-supports/',
	},
];
