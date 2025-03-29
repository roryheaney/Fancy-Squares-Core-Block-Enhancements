/**
 * File: extend-core-blocks-variations.js
 *
 * Extends these core blocks with custom attributes + InspectorControls:
 *   - core/heading
 *   - core/paragraph
 *   - core/list
 *   - core/buttons
 *
 * Then registers block variations for each, making your custom version
 * the default in the block inserter (hiding the original).
 */

import './formats/span-format.js';

/**
 * ------------------------
 * WordPress dependencies
 * ------------------------
 */
import {
	registerBlockVariation,
	getBlockDefaultClassName,
} from '@wordpress/blocks';

const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor || wp.editor;
const { PanelBody, SelectControl, FormTokenField } = wp.components;

/**
 * ------------------------
 * 1) Allowed blocks
 * ------------------------
 */
const ALLOWED_BLOCKS = [
	'core/heading',
	'core/paragraph',
	'core/list',
	'core/list-item',
	'core/buttons',
];

/**
 * ------------------------
 * 2) Import your class data
 * ------------------------
 */
import {
	displayOptions,
	marginOptions,
	paddingOptions,
	positionOptions,
	zindexOptions,
	blendModeOptions,
} from '../data/bootstrap-classes/classes.js';

// Convert them into arrays of string suggestions for FormTokenField
const displaySuggestions = displayOptions.map( ( o ) => o.value );
const marginSuggestions = marginOptions.map( ( o ) => o.value );
const paddingSuggestions = paddingOptions.map( ( o ) => o.value );
const positionSuggestions = positionOptions.map( ( o ) => o.value );
const zindexSuggestions = zindexOptions.map( ( o ) => o.value );
const blendModeSuggestions = blendModeOptions.map( ( o ) => o.value );

/**
 * ------------------------
 * 3) Unique dropdown configs
 * ------------------------
 */
const BLOCK_DROPDOWN_CONFIG = {
	'core/heading': {
		attributeKey: 'headingDropdownValue',
		label: 'Heading Option',
		default: '',
		options: [ { label: 'Select one', value: 'none' } ],
	},
	'core/paragraph': {
		attributeKey: 'paragraphDropdownValue',
		label: 'Paragraph Option',
		default: '',
		options: [ { label: 'Select one', value: 'none' } ],
	},
	'core/list': {
		attributeKey: 'listDropdownValue',
		label: 'List Option',
		default: '',
		options: [ { label: 'Select one', value: 'none' } ],
	},
	'core/list-item': {
		attributeKey: 'listItemDropdownValue',
		label: 'List Item Option',
		default: '',
		options: [ { label: 'Select one', value: 'none' } ],
	},
	'core/buttons': {
		attributeKey: 'buttonDropdownValue',
		label: 'Button Option',
		default: '',
		options: [ { label: 'Select one', value: 'none' } ],
	},
};

/**
 * ------------------------
 * 4) Add new attributes
 * ------------------------
 */
addFilter(
	'blocks.registerBlockType',
	'fs-blocks/extend-core-blocks/attributes',
	( settings, name ) => {
		if ( ! ALLOWED_BLOCKS.includes( name ) ) {
			return settings;
		}

		const dropdownConfig = BLOCK_DROPDOWN_CONFIG[ name ] || {};

		// Inject attributes for the token fields + unique dropdown
		settings.attributes = {
			...settings.attributes,

			displayClasses: {
				type: 'array',
				items: { type: 'string' },
				default: [],
			},
			marginClasses: {
				type: 'array',
				items: { type: 'string' },
				default: [],
			},
			paddingClasses: {
				type: 'array',
				items: { type: 'string' },
				default: [],
			},
			positionClasses: {
				type: 'array',
				items: { type: 'string' },
				default: [],
			},
			zindexClasses: {
				type: 'array',
				items: { type: 'string' },
				default: [],
			},
			blendModeClasses: {
				type: 'array',
				items: { type: 'string' },
				default: [],
			},

			[ dropdownConfig.attributeKey ]: {
				type: 'string',
				default: dropdownConfig.default || '',
			},
		};

		return settings;
	}
);

/**
 * ------------------------
 * 5) Custom Inspector Controls
 * ------------------------
 */
const withExtendedInspectorControls = createHigherOrderComponent(
	( BlockEdit ) => {
		return ( props ) => {
			if ( ! ALLOWED_BLOCKS.includes( props.name ) ) {
				return <BlockEdit { ...props } />;
			}

			const { attributes, setAttributes } = props;
			const {
				displayClasses,
				marginClasses,
				paddingClasses,
				positionClasses,
				zindexClasses,
				blendModeClasses,
			} = attributes;

			// Find this block's dropdown config
			const dropdownConfig = BLOCK_DROPDOWN_CONFIG[ props.name ] || {};
			const uniqueDropdownValue =
				attributes[ dropdownConfig.attributeKey ];

			// Handle changes for each token field
			function onChangeDisplay( newTokens ) {
				setAttributes( { displayClasses: newTokens } );
			}
			function onChangeMargin( newTokens ) {
				setAttributes( { marginClasses: newTokens } );
			}
			function onChangePadding( newTokens ) {
				setAttributes( { paddingClasses: newTokens } );
			}
			function onChangePosition( newTokens ) {
				setAttributes( { positionClasses: newTokens } );
			}
			function onChangeZIndex( newTokens ) {
				setAttributes( { zindexClasses: newTokens } );
			}
			function onChangeBlendMode( newTokens ) {
				setAttributes( { blendModeClasses: newTokens } );
			}

			// Handle changes for the unique dropdown
			function onChangeUniqueDropdown( newVal ) {
				setAttributes( { [ dropdownConfig.attributeKey ]: newVal } );
			}

			return (
				<Fragment>
					<BlockEdit { ...props } />

					<InspectorControls>
						<PanelBody
							title="Bootstrap Classes"
							initialOpen={ true }
						>
							<FormTokenField
								label="Display Classes"
								value={ displayClasses }
								suggestions={ displaySuggestions }
								onChange={ onChangeDisplay }
							/>
							<FormTokenField
								label="Margin Classes"
								value={ marginClasses }
								suggestions={ marginSuggestions }
								onChange={ onChangeMargin }
							/>
							<FormTokenField
								label="Padding Classes"
								value={ paddingClasses }
								suggestions={ paddingSuggestions }
								onChange={ onChangePadding }
							/>
							<FormTokenField
								label="Position Classes"
								value={ positionClasses }
								suggestions={ positionSuggestions }
								onChange={ onChangePosition }
							/>
							<FormTokenField
								label="Z-Index Classes"
								value={ zindexClasses }
								suggestions={ zindexSuggestions }
								onChange={ onChangeZIndex }
							/>
							<FormTokenField
								label="Blend Mode Classes"
								value={ blendModeClasses }
								suggestions={ blendModeSuggestions }
								onChange={ onChangeBlendMode }
							/>
						</PanelBody>

						<PanelBody
							title="Unique Dropdown"
							initialOpen={ false }
						>
							<SelectControl
								label={
									dropdownConfig.label || 'Unique Option'
								}
								value={ uniqueDropdownValue }
								options={ dropdownConfig.options || [] }
								onChange={ onChangeUniqueDropdown }
							/>
						</PanelBody>
					</InspectorControls>
				</Fragment>
			);
		};
	},
	'withExtendedInspectorControls'
);

addFilter(
	'editor.BlockEdit',
	'fs-blocks/extend-core-blocks/inspector-controls',
	withExtendedInspectorControls
);

/**
 * ------------------------
 * 6) Editor Preview Classes
 * ------------------------
 */
addFilter(
	'editor.BlockListBlock',
	'fs-blocks/extend-core-blocks/editor-preview-classes',
	createHigherOrderComponent( ( BlockListBlock ) => {
		return ( props ) => {
			const { block } = props;
			const { name, attributes } = block;

			if ( ! ALLOWED_BLOCKS.includes( name ) ) {
				return <BlockListBlock { ...props } />;
			}

			// Start with the default class
			const defaultClass = getBlockDefaultClassName( name ) || '';
			let combinedClass = defaultClass;

			// Merge arrays
			const display = attributes.displayClasses || [];
			const margin = attributes.marginClasses || [];
			const padding = attributes.paddingClasses || [];
			const pos = attributes.positionClasses || [];
			const zindex = attributes.zindexClasses || [];
			const blend = attributes.blendModeClasses || [];

			const combinedTokens = [
				...display,
				...margin,
				...padding,
				...pos,
				...zindex,
				...blend,
			];

			if ( combinedTokens.length ) {
				combinedClass += ' ' + combinedTokens.join( ' ' );
			}

			// Unique dropdown
			const dropdownConfig = BLOCK_DROPDOWN_CONFIG[ name ] || {};
			const uniqueVal = attributes[ dropdownConfig.attributeKey ];
			if ( uniqueVal && uniqueVal !== 'none' ) {
				combinedClass += ' ' + uniqueVal;
			}

			return (
				<BlockListBlock
					{ ...props }
					wrapperProps={ {
						...props.wrapperProps,
						className: combinedClass.trim(),
					} }
				/>
			);
		};
	}, 'withEditorPreviewClasses' )
);

/**
 * ------------------------
 * 7) Final Saved Classes
 * ------------------------
 */
addFilter(
	'blocks.getSaveContent.extraProps',
	'fs-blocks/extend-core-blocks/save-props',
	( extraProps, blockType, attributes ) => {
		const { name } = blockType;
		if ( ! ALLOWED_BLOCKS.includes( name ) ) {
			return extraProps;
		}

		// Start with WP's default class
		const defaultClass = getBlockDefaultClassName( name ) || '';
		const existing = extraProps.className || defaultClass;

		// Combine token arrays
		const combinedTokens = [
			...( attributes.displayClasses || [] ),
			...( attributes.marginClasses || [] ),
			...( attributes.paddingClasses || [] ),
			...( attributes.positionClasses || [] ),
			...( attributes.zindexClasses || [] ),
			...( attributes.blendModeClasses || [] ),
		];

		let finalClass = existing;
		if ( combinedTokens.length ) {
			finalClass += ' ' + combinedTokens.join( ' ' );
		}

		// Unique dropdown
		const dropdownConfig = BLOCK_DROPDOWN_CONFIG[ name ] || {};
		const uniqueVal = attributes[ dropdownConfig.attributeKey ];
		if ( uniqueVal && uniqueVal !== 'none' ) {
			finalClass += ' ' + uniqueVal;
		}

		extraProps.className = finalClass.trim();
		return extraProps;
	}
);

/**
 * ------------------------
 * 8) Define and register variations
 * ------------------------
 */
const BLOCK_VARIATIONS = {
	'core/heading': [
		{
			// Unique variation name (no "default" in it)
			name: 'heading-custom',
			title: 'Heading (Custom)',
			description:
				'A custom heading variation with default classes/options.',
			icon: 'editor-bold',
			attributes: {
				// Using the "none" fallback so there's no empty string
				headingDropdownValue: 'none',
			},
			isDefault: true, // replaces the core block in the inserter
			scope: [ 'inserter' ],
		},
	],
	'core/paragraph': [
		{
			name: 'paragraph-custom',
			title: 'Paragraph (Custom)',
			description: 'A paragraph with a chosen style by default.',
			icon: 'editor-paragraph',
			attributes: {
				paragraphDropdownValue: 'none',
			},
			isDefault: true,
			scope: [ 'inserter' ],
		},
	],
	'core/list': [
		{
			name: 'list-custom',
			title: 'List (Custom)',
			description: 'A list block with a chosen style by default.',
			icon: 'editor-ul',
			attributes: {
				listDropdownValue: 'none',
			},
			isDefault: true,
			scope: [ 'inserter' ],
		},
	],
	'core/list-item': [
		{
			name: 'list-item-custom',
			title: 'List Item (Custom)',
			description: 'A list item variation that replaces the default.',
			icon: 'editor-ul',
			attributes: {
				listItemDropdownValue: 'none',
			},
			isDefault: true,
			scope: [ 'inserter' ],
		},
	],
	'core/buttons': [
		{
			name: 'buttons-custom',
			title: 'Buttons (Custom)',
			description: 'A button group with a chosen style by default.',
			icon: 'button',
			attributes: {
				buttonDropdownValue: 'none',
			},
			isDefault: true,
			scope: [ 'inserter' ],
		},
	],
};

Object.keys( BLOCK_VARIATIONS ).forEach( ( blockName ) => {
	BLOCK_VARIATIONS[ blockName ].forEach( ( variation ) => {
		registerBlockVariation( blockName, variation );
	} );
} );
