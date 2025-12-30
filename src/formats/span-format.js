import {
	registerFormatType,
	applyFormat,
	removeFormat,
	getActiveFormat,
} from '@wordpress/rich-text';

import {
	RichTextToolbarButton,
	useSetting, // WP 6.2+ only!
} from '@wordpress/block-editor';

import {
	Modal,
	Button,
	FormTokenField,
	ColorPicker,
	Tooltip, // If WP < 6.3, consider __experimentalTooltip as Tooltip
	CheckboxControl,
} from '@wordpress/components';

import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import {
	getDisplayValues,
	getValuesFromDisplay,
	getSuggestions,
} from '../utils/helpers';

// Import your Bootstrap arrays (minus z-index, blend modes, etc.)
import {
	displayOptions,
	marginOptions,
	paddingOptions,
	positionOptions,
} from '../../data/bootstrap-classes/index.js';

/*
 * Edit component for the "fs/span" RichText format.
 *
 * @param {Object}   props
 * @param {boolean}  props.isActive   Whether this format is currently active.
 * @param {Object}   props.value      The RichText value object.
 * @param {Function} props.onChange   Callback to update the RichText value.
 *
 * @return {JSX.Element} The element to render.
 */
function EditSpan( { isActive, value, onChange } ) {
	// Modal open/close
	const [ isModalOpen, setIsModalOpen ] = useState( false );

	// States for class tokens
	const [ displayTokens, setDisplayTokens ] = useState( [] );
	const [ marginTokens, setMarginTokens ] = useState( [] );
	const [ paddingTokens, setPaddingTokens ] = useState( [] );
	const [ positionTokens, setPositionTokens ] = useState( [] );

	// States for inline color styles
	const [ textColor, setTextColor ] = useState( '' );
	const [ backgroundColor, setBackgroundColor ] = useState( '' );

	// Toggle between showing class labels or values
	const [ showValues, setShowValues ] = useState( false );

	// Fetch theme palette (WP 6.2+). If older WP, this is undefined or an error.
	const themePalette = useSetting( 'color.palette' ) || [];

	/**
	 * Toggle the format: if it's active, parse existing data so user can edit;
	 * otherwise, open the modal fresh.
	 */
	function onToggleFormat() {
		if ( isActive ) {
			populateExistingFormat();
		} else {
			openModal();
		}
	}

	function openModal() {
		setIsModalOpen( true );
	}
	function closeModal() {
		setIsModalOpen( false );
	}

	/**
	 * Parse the existing <span> attributes: classes & inline style
	 */
	function populateExistingFormat() {
		const activeSpan = getActiveFormat( value, 'fs/span' );
		if ( ! activeSpan ) {
			openModal();
			return;
		}

		// 1) Classes
		const classAttr = activeSpan.attributes?.class || '';
		// Remove base class
		const classArray = classAttr
			.split( /\s+/ )
			.filter( ( c ) => c && c !== 'fs-span-base' );

		// Convert arrays to plain strings for membership checks
		const displayVals = displayOptions.map( ( o ) => o.value );
		const marginVals = marginOptions.map( ( o ) => o.value );
		const paddingVals = paddingOptions.map( ( o ) => o.value );
		const positionVals = positionOptions.map( ( o ) => o.value );

		const pickedDisplay = [];
		const pickedMargin = [];
		const pickedPadding = [];
		const pickedPosition = [];

		classArray.forEach( ( cls ) => {
			if ( displayVals.includes( cls ) ) {
				pickedDisplay.push( cls );
			} else if ( marginVals.includes( cls ) ) {
				pickedMargin.push( cls );
			} else if ( paddingVals.includes( cls ) ) {
				pickedPadding.push( cls );
			} else if ( positionVals.includes( cls ) ) {
				pickedPosition.push( cls );
			}
		} );

		setDisplayTokens( pickedDisplay );
		setMarginTokens( pickedMargin );
		setPaddingTokens( pickedPadding );
		setPositionTokens( pickedPosition );

		// 2) Inline style (e.g., "color: #FFF; background-color: #000;")
		const styleAttr = activeSpan.attributes?.style || '';
		const getStyleValue = ( style, prop ) => {
			const match = style.match(
				new RegExp( `(?:^|;)\\s*${ prop }\\s*:\\s*([^;]+)`, 'i' )
			);
			return match ? match[ 1 ].trim() : '';
		};
		setTextColor( styleAttr ? getStyleValue( styleAttr, 'color' ) : '' );
		setBackgroundColor(
			styleAttr ? getStyleValue( styleAttr, 'background-color' ) : ''
		);

		openModal();
	}

	/**
	 * Apply or update the format around the selected text
	 */
	function applySpanFormat() {
		// Combine chosen tokens
		const allTokens = [
			...displayTokens,
			...marginTokens,
			...paddingTokens,
			...positionTokens,
		];
		const classString = `fs-span-base ${ allTokens.join( ' ' ) }`.trim();

		// Build inline style
		const styleParts = [];
		if ( textColor ) {
			styleParts.push( `color: ${ textColor }` );
		}
		if ( backgroundColor ) {
			styleParts.push( `background-color: ${ backgroundColor }` );
		}
		const styleString = styleParts.join( '; ' );

		// If user sets no classes or colors, remove format entirely
		const noExtra = classString === 'fs-span-base' && ! styleString;
		if ( noExtra ) {
			const removed = removeFormat( value, 'fs/span' );
			onChange( removed );
			closeModal();
			return;
		}

		// Otherwise, apply or update
		const newValue = applyFormat( value, {
			type: 'fs/span',
			attributes: {
				class: classString,
				style: styleString,
			},
		} );
		onChange( newValue );
		closeModal();
	}

	/**
	 * Remove the <span> format entirely
	 */
	function removeSpanFormat() {
		const removed = removeFormat( value, 'fs/span' );
		onChange( removed );
		closeModal();
	}

	// Convert objects to strings for FormTokenField
	const displaySuggestions = getSuggestions( displayOptions, showValues );
	const marginSuggestions = getSuggestions( marginOptions, showValues );
	const paddingSuggestions = getSuggestions( paddingOptions, showValues );
	const positionSuggestions = getSuggestions( positionOptions, showValues );

	return (
		<>
			<RichTextToolbarButton
				icon="editor-code"
				title={ __( 'Span', 'fs-blocks' ) }
				onClick={ onToggleFormat }
				isActive={ isActive }
			/>

			{ isModalOpen && (
				<Modal
					title={ __( 'Span Settings', 'fs-blocks' ) }
					onRequestClose={ closeModal }
					isDismissible={ true }
					className="fs-span-modal"
				>
					<h3>{ __( 'Bootstrap Classes', 'fs-blocks' ) }</h3>
					<CheckboxControl
						label={ __( 'Show Values', 'fs-blocks' ) }
						checked={ showValues }
						onChange={ setShowValues }
						help={ __(
							'Display class names instead of labels.',
							'fs-blocks'
						) }
						style={ { marginBottom: '1rem' } }
					/>
					<div
						style={ {
							display: 'grid',
							gridTemplateColumns: 'repeat(2, 1fr)',
							gap: '0.75rem',
							alignItems: 'start',
							marginBottom: '1rem',
						} }
					>
						<FormTokenField
							label={ __( 'Display', 'fs-blocks' ) }
							value={ getDisplayValues(
								displayTokens,
								displayOptions,
								showValues
							) }
							suggestions={ displaySuggestions }
							onChange={ ( tokens ) =>
								setDisplayTokens(
									getValuesFromDisplay(
										tokens,
										displayOptions,
										showValues
									)
								)
							}
						/>
						<FormTokenField
							label={ __( 'Margin', 'fs-blocks' ) }
							value={ getDisplayValues(
								marginTokens,
								marginOptions,
								showValues
							) }
							suggestions={ marginSuggestions }
							onChange={ ( tokens ) =>
								setMarginTokens(
									getValuesFromDisplay(
										tokens,
										marginOptions,
										showValues
									)
								)
							}
						/>
						<FormTokenField
							label={ __( 'Padding', 'fs-blocks' ) }
							value={ getDisplayValues(
								paddingTokens,
								paddingOptions,
								showValues
							) }
							suggestions={ paddingSuggestions }
							onChange={ ( tokens ) =>
								setPaddingTokens(
									getValuesFromDisplay(
										tokens,
										paddingOptions,
										showValues
									)
								)
							}
						/>
						<FormTokenField
							label={ __( 'Position', 'fs-blocks' ) }
							value={ getDisplayValues(
								positionTokens,
								positionOptions,
								showValues
							) }
							suggestions={ positionSuggestions }
							onChange={ ( tokens ) =>
								setPositionTokens(
									getValuesFromDisplay(
										tokens,
										positionOptions,
										showValues
									)
								)
							}
						/>
					</div>

					<hr style={ { margin: '1rem 0' } } />

					<h3>{ __( 'Colors', 'fs-blocks' ) }</h3>
					<div
						style={ {
							display: 'flex',
							gap: '1rem',
							marginBottom: '1rem',
						} }
					>
						{ /* Text Color */ }
						<div style={ { flex: '1' } }>
							<strong>{ __( 'Text Color', 'fs-blocks' ) }</strong>
							{ /* Render theme palette swatches */ }
							<div
								style={ {
									display: 'flex',
									flexWrap: 'wrap',
									gap: '4px',
									marginTop: '0.5rem',
								} }
							>
								{ themePalette.map( ( pItem ) => (
									<Tooltip
										text={ pItem.name || pItem.color }
										key={ pItem.color }
									>
										<button
											type="button"
											onClick={ () =>
												setTextColor( pItem.color )
											}
											style={ {
												width: '24px',
												height: '24px',
												border:
													textColor === pItem.color
														? '2px solid #444'
														: '1px solid #ccc',
												backgroundColor: pItem.color,
												cursor: 'pointer',
											} }
											aria-label={ `Set text color to ${
												pItem.name || pItem.color
											}` }
										/>
									</Tooltip>
								) ) }
							</div>

							<ColorPicker
								color={ textColor || '#000000' }
								onChangeComplete={ ( colorObj ) => {
									setTextColor( colorObj.hex );
								} }
								disableAlpha={ false }
								style={ { marginTop: '0.5rem' } }
							/>
						</div>

						{ /* Background Color */ }
						<div style={ { flex: '1' } }>
							<strong>
								{ __( 'Background Color', 'fs-blocks' ) }
							</strong>
							<div
								style={ {
									display: 'flex',
									flexWrap: 'wrap',
									gap: '4px',
									marginTop: '0.5rem',
								} }
							>
								{ themePalette.map( ( pItem ) => (
									<Tooltip
										text={ pItem.name || pItem.color }
										key={ pItem.color }
									>
										<button
											type="button"
											onClick={ () =>
												setBackgroundColor(
													pItem.color
												)
											}
											style={ {
												width: '24px',
												height: '24px',
												border:
													backgroundColor ===
													pItem.color
														? '2px solid #444'
														: '1px solid #ccc',
												backgroundColor: pItem.color,
												cursor: 'pointer',
											} }
											aria-label={ `Set background color to ${
												pItem.name || pItem.color
											}` }
										/>
									</Tooltip>
								) ) }
							</div>

							<ColorPicker
								color={ backgroundColor || '#ffffff' }
								onChangeComplete={ ( colorObj ) => {
									setBackgroundColor( colorObj.hex );
								} }
								disableAlpha={ false }
								style={ { marginTop: '0.5rem' } }
							/>
						</div>
					</div>

					<div style={ { display: 'flex', gap: '0.5rem' } }>
						<Button variant="primary" onClick={ applySpanFormat }>
							{ __( 'Apply', 'fs-blocks' ) }
						</Button>
						<Button
							variant="secondary"
							onClick={ removeSpanFormat }
						>
							{ __( 'Remove Format', 'fs-blocks' ) }
						</Button>
						<Button variant="tertiary" onClick={ closeModal }>
							{ __( 'Cancel', 'fs-blocks' ) }
						</Button>
					</div>
				</Modal>
			) }
		</>
	);
}

// Finally, registerFormatType with our uppercase component
registerFormatType( 'fs/span', {
	title: __( 'Span', 'fs-blocks' ),
	tagName: 'span',
	className: 'fs-block-span',
	icon: 'editor-code',
	attributes: {
		class: 'class',
		style: 'style',
	},
	edit: EditSpan,
} );
