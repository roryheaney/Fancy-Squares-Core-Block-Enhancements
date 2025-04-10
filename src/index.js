/**
 * File: index.js
 *
 * Extends core blocks with custom attributes and InspectorControls using 10up's registerBlockExtension.
 * Adds FormTokenField and dropdowns to apply Bootstrap classes to multiple blocks.
 * Adds custom width controls to core/column for breakpoint-specific layouts.
 */

// Import SCSS for compilation
import './editor.scss';

// WordPress dependencies
import { registerBlockExtension } from '@10up/block-components';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, FormTokenField, CheckboxControl, Button, Icon } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { keyboard, helpFilled, globe, gallery } from '@wordpress/icons';

// Import class data (excluding columnOptionsCore)
import {
    displayOptions,
    marginOptions,
    paddingOptions,
    positionOptions,
    zindexOptions,
    blendModeOptions,
} from '../data/bootstrap-classes/classes.js';

// Allowed blocks
const ALLOWED_BLOCKS = [
    'core/heading',
    'core/paragraph',
    'core/list',
    'core/list-item',
    'core/buttons',
    'core/columns',
    'core/column',
];

// Block configuration
const BLOCK_CONFIG = {
    'core/heading': {
        classOptions: ['display', 'margin', 'padding', 'position', 'zindex', 'blendMode'],
        dropdown: {
            attributeKey: 'headingDropdownValue',
            label: 'Heading Option',
            default: 'none',
            options: [{ label: 'Select one', value: 'none' }],
        },
    },
    'core/paragraph': {
        classOptions: ['display', 'margin', 'padding'],
        dropdown: {
            attributeKey: 'paragraphDropdownValue',
            label: 'Paragraph Option',
            default: 'none',
            options: [{ label: 'Select one', value: 'none' }],
        },
    },
    'core/list': {
        classOptions: ['display', 'margin', 'padding', 'position'],
        dropdown: {
            attributeKey: 'listDropdownValue',
            label: 'List Option',
            default: 'none',
            options: [{ label: 'Select one', value: 'none' }],
        },
    },
    'core/list-item': {
        classOptions: ['margin', 'padding'],
        dropdown: {
            attributeKey: 'listItemDropdownValue',
            label: 'List Item Option',
            default: 'none',
            options: [{ label: 'Select one', value: 'none' }],
        },
    },
    'core/buttons': {
        classOptions: ['display', 'margin', 'padding', 'position', 'zindex'],
        dropdown: {
            attributeKey: 'buttonDropdownValue',
            label: 'Button Option',
            default: 'none',
            options: [{ label: 'Select one', value: 'none' }],
        },
    },
    'core/columns': {
        classOptions: ['display', 'margin', 'padding', 'position', 'zindex'],
        dropdown: {
            attributeKey: 'columnsLayout',
            label: 'Columns Layout',
            default: '',
            options: [
                { label: 'Inherit from Columns', value: '' },
                { label: '1 across all', value: 'cols-mobile-1 cols-tablet-1 cols-desktop-1' },
                { label: '2 across all', value: 'cols-mobile-2 cols-tablet-2 cols-desktop-2' },
                { label: '3 across all', value: 'cols-mobile-3 cols-tablet-3 cols-desktop-3' },
                { label: '4 across all', value: 'cols-mobile-4 cols-tablet-4 cols-desktop-4' },
                { label: '5 across all', value: 'cols-mobile-5 cols-tablet-5 cols-desktop-5' },
                { label: '6 across all', value: 'cols-mobile-6 cols-tablet-6 cols-desktop-6' },
                { label: '1 mobile, 2 tablet, 3 desktop', value: 'cols-mobile-1 cols-tablet-2 cols-desktop-3' },
                { label: '2 mobile, 3 tablet, 4 desktop', value: 'cols-mobile-2 cols-tablet-3 cols-desktop-4' },
                { label: '3 mobile, 4 tablet, 6 desktop', value: 'cols-mobile-3 cols-tablet-4 cols-desktop-6' },
            ],
        },
    },
    'core/column': {
        classOptions: ['display', 'margin', 'padding', 'position', 'zindex'],
        dropdown: {
            attributeKey: 'columnsLayout',
            label: 'Column Layout Override',
            default: '',
            options: [{ label: 'Inherit from Columns', value: '' }],
        },
        hasWidthControls: true, // Flag to enable custom width controls
    },
};

// Map class types to their options and suggestions
const CLASS_OPTIONS_MAP = {
    display: { options: displayOptions, suggestions: getSuggestions(displayOptions, false) },
    margin: { options: marginOptions, suggestions: getSuggestions(marginOptions, false) },
    padding: { options: paddingOptions, suggestions: getSuggestions(paddingOptions, false) },
    position: { options: positionOptions, suggestions: getSuggestions(positionOptions, false) },
    zindex: { options: zindexOptions, suggestions: getSuggestions(zindexOptions, false) },
    blendMode: { options: blendModeOptions, suggestions: getSuggestions(blendModeOptions, false) },
};

// Helper functions for FormTokenField
function getDisplayValues(values, options, showValues) {
    const result = [];
    for (const value of values) {
        const option = options.find((opt) => opt.value === value);
        result.push(option ? (showValues ? option.value : option.label) : value);
    }
    return result;
}

function getValuesFromDisplay(displayValues, options, showValues) {
    const result = [];
    for (const display of displayValues) {
        const option = options.find((opt) =>
            showValues ? opt.value === display : opt.label === display
        );
        result.push(option ? option.value : display);
    }
    return result;
}

function getSuggestions(options, showValues) {
    return options.map((item) => (showValues ? item.value : item.label));
}

// Custom WidthControl component for core/column
const WidthControl = ({ label, icon, breakpoint, value, onChange, options }) => {
    const numericValue = value.replace(/col-[a-z]{0,2}-/, '') || '0';
    const [sliderValue, setSliderValue] = useState(numericValue);

    const handleSliderChange = (event) => {
        const newValue = event.target.value;
        setSliderValue(newValue);
        onChange(newValue === '0' ? '' : `col-${breakpoint}-${newValue}`);
    };

    const handleSquareClick = (index) => {
        const newValue = (index + 1).toString();
        setSliderValue(newValue);
        onChange(newValue === '0' ? '' : `col-${breakpoint}-${newValue}`);
    };

    const handleOptionClick = (optionValue) => {
        setSliderValue(optionValue === 'auto' ? '0' : optionValue);
        onChange(optionValue);
    };

    const squares = Array.from({ length: 12 }, (_, index) => (
        <div
            key={index}
            className={`custom-column-widths__square ${
                index < parseInt(sliderValue || '0') ? 'custom-column-widths__square--selected' : ''
            }`}
            onClick={() => handleSquareClick(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleSquareClick(index);
                }
            }}
        />
    ));

    return (
        <div className="custom-column-widths__group">
            <div className="custom-column-widths__header">
                <Icon icon={icon} className="custom-column-widths__icon" />
                <span className="custom-column-widths__label">{label}</span>
                <span className="custom-column-widths__value">
                    {value === 'auto'
                        ? 'Auto'
                        : value === ''
                        ? 'Inherit'
                        : `${numericValue} columns`}
                </span>
                {options.map((option) => (
                    <Button
                        key={option.value}
                        onClick={() => handleOptionClick(option.value)}
                        className={`custom-column-widths__option ${
                            value === option.value ? 'is-active' : ''
                        }`}
                        variant="secondary"
                    >
                        {option.label}
                    </Button>
                ))}
            </div>
            <div className="custom-column-widths__slider">
                {squares}
                <input
                    type="range"
                    min="0"
                    max="12"
                    step="1"
                    value={sliderValue}
                    onChange={handleSliderChange}
                    className="custom-column-widths__range"
                />
            </div>
        </div>
    );
};

// Custom Edit component for the block inspector
const BlockEdit = (props) => {
    const { attributes, setAttributes, name, clientId } = props;
    const config = BLOCK_CONFIG[name] || {};
    const dropdownConfig = config.dropdown || {};
    const uniqueDropdownValue = attributes[dropdownConfig.attributeKey];
    const [showValues, setShowValues] = useState(false);

    // Bootstrap style check for core/column
    const { parent, parentAtts } = useSelect(
        (select) => ({
            parent: select('core/block-editor').getBlockParents(clientId),
            parentAtts: select('core/block-editor').getBlockAttributes(
                select('core/block-editor').getBlockParents(clientId)[0]
            ),
        }),
        [clientId]
    );

    const { updateBlockAttributes } = useDispatch('core/block-editor');
    const isBootstrap =
        parentAtts?.className && parentAtts.className.includes('is-style-bootstrap');

    // FormTokenField controls for Bootstrap classes
    const tokenFields = (config.classOptions || []).map((classType) => {
        const classKey = `${classType}Classes`;
        const classValue = attributes[classKey] || [];
        const { options } = CLASS_OPTIONS_MAP[classType];

        const onChange = (newTokens) => {
            const newValues = getValuesFromDisplay(newTokens, options, showValues);
            setAttributes({ [classKey]: newValues });
        };

        return (
            <div key={classType} style={{ marginBottom: '20px' }}>
                <FormTokenField
                    label={`${classType.charAt(0).toUpperCase() + classType.slice(1)} Classes`}
                    value={getDisplayValues(classValue, options, showValues)}
                    suggestions={getSuggestions(options, showValues)}
                    onChange={onChange}
                />
                <details style={{ marginTop: '5px' }}>
                    <summary>{`Available ${classType.charAt(0).toUpperCase() + classType.slice(1)} Classes`}</summary>
                    <ul style={{ fontSize: '12px', paddingLeft: '20px', margin: '5px 0' }}>
                        {options.map((item) => (
                            <li key={item.value}>{showValues ? item.value : item.label}</li>
                        ))}
                    </ul>
                </details>
            </div>
        );
    });

    // Width controls for core/column
    const widthControls = config.hasWidthControls ? (
        <PanelBody title="Width Settings" initialOpen={true}>
            {!isBootstrap && (
                <div className="custom-column-widths__bootstrap-notice">
                    <p className="greyd-inspector-help">
                        By setting the columns style to "Bootstrap", the columns no longer break unintentionally.
                    </p>
                    <Button
                        variant="secondary"
                        isSmall
                        onClick={() => {
                            const newParentAtts = {
                                ...parentAtts,
                                className:
                                    (parentAtts.className || '').replace('is-style-default', '') +
                                    ' is-style-bootstrap',
                            };
                            updateBlockAttributes(parent[0], newParentAtts);
                        }}
                    >
                        Set parent to "Bootstrap"
                    </Button>
                </div>
            )}
            <WidthControl
                label="Larger Screen"
                icon={keyboard}
                breakpoint="lg"
                value={attributes.widthLg}
                onChange={(value) => setAttributes({ widthLg: value })}
                options={[
                    { label: 'Heirs ↓', value: '' },
                    { label: 'Automatically', value: 'auto' },
                ]}
            />
            <WidthControl
                label="Laptop"
                icon={helpFilled}
                breakpoint="md"
                value={attributes.widthMd}
                onChange={(value) => setAttributes({ widthMd: value })}
                options={[
                    { label: 'Heirs ↓', value: '' },
                    { label: 'Automatically', value: 'auto' },
                ]}
            />
            <WidthControl
                label="Tablet"
                icon={globe}
                breakpoint="sm"
                value={attributes.widthSm}
                onChange={(value) => setAttributes({ widthSm: value })}
                options={[
                    { label: 'Heirs ↓', value: '' },
                    { label: 'Automatically', value: 'auto' },
                ]}
            />
            <WidthControl
                label="Mobile"
                icon={gallery}
                breakpoint=""
                value={attributes.widthXs}
                onChange={(value) => setAttributes({ widthXs: value })}
                options={[
                    { label: '100%', value: '' },
                    { label: 'Automatically', value: 'auto' },
                ]}
            />
        </PanelBody>
    ) : null;

    return (
        <InspectorControls>
            <PanelBody title="Bootstrap Classes" initialOpen={true}>
                <CheckboxControl
                    label="Show Values"
                    checked={showValues}
                    onChange={setShowValues}
                    help="Display class names instead of labels."
                    style={{ marginBottom: '20px' }}
                />
                {tokenFields}
            </PanelBody>
            {dropdownConfig.attributeKey && (
                <PanelBody title="Unique Dropdown" initialOpen={false}>
                    <SelectControl
                        label={dropdownConfig.label || 'Unique Option'}
                        value={uniqueDropdownValue}
                        options={dropdownConfig.options || []}
                        onChange={(newVal) =>
                            setAttributes({ [dropdownConfig.attributeKey]: newVal })
                        }
                    />
                </PanelBody>
            )}
            {widthControls}
        </InspectorControls>
    );
};

// Generate class names based on attributes
const generateClassName = (attributes, blockName) => {
    const config = BLOCK_CONFIG[blockName] || {};
    const combinedTokens = [];

    // Add classes from FormTokenField
    for (const classType of config.classOptions || []) {
        const classValue = attributes[`${classType}Classes`] || [];
        combinedTokens.push(...classValue);
    }

    // Add classes from dropdown
    const dropdownConfig = config.dropdown || {};
    const uniqueVal = attributes[dropdownConfig.attributeKey];
    if (uniqueVal && uniqueVal !== 'none' && uniqueVal !== '') {
        combinedTokens.push(uniqueVal);
    }

    // Add width classes for core/column
    if (config.hasWidthControls) {
        const { widthXs, widthSm, widthMd, widthLg } = attributes;
        if (widthLg && widthLg !== 'auto' && widthLg !== '') {
            combinedTokens.push(widthLg);
        }
        if (widthMd && widthMd !== 'auto' && widthMd !== '') {
            combinedTokens.push(widthMd);
        }
        if (widthSm && widthSm !== 'auto' && widthSm !== '') {
            combinedTokens.push(widthSm);
        }
        if (widthXs && widthXs !== 'auto' && widthXs !== '') {
            combinedTokens.push(widthXs);
        }
    }

    return combinedTokens.join(' ');
};

// Register extensions for each block
ALLOWED_BLOCKS.forEach((blockName) => {
    const config = BLOCK_CONFIG[blockName] || {};
    const dropdownConfig = config.dropdown || {};

    // Define attributes
    const attributes = {};
    for (const classType of config.classOptions || []) {
        attributes[`${classType}Classes`] = {
            type: 'array',
            items: { type: 'string' },
            default: [],
        };
    }
    if (dropdownConfig.attributeKey) {
        attributes[dropdownConfig.attributeKey] = {
            type: 'string',
            default: dropdownConfig.default || 'none',
        };
    }
    if (config.hasWidthControls) {
        attributes.widthXs = { type: 'string', default: '' };
        attributes.widthSm = { type: 'string', default: '' };
        attributes.widthMd = { type: 'string', default: '' };
        attributes.widthLg = { type: 'string', default: '' };
    }

    // Register the extension
    registerBlockExtension(blockName, {
        extensionName: `custom-${blockName.replace('core/', '')}`,
        attributes: attributes,
        Edit: BlockEdit,
        classNameGenerator: (attributes) => generateClassName(attributes, blockName),
    });
});
