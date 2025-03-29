import {
	registerFormatType,
	applyFormat,
	removeFormat,
	getActiveFormat,
} from '@wordpress/rich-text';
import {
	RichTextToolbarButton,
	ColorPalette,
} from '@wordpress/block-editor';
import {
	Modal,
	Button,
	FormTokenField,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

// Import your other Bootstrap class arrays
import {
	displayOptions,
	marginOptions,
	paddingOptions,
	positionOptions,
	zindexOptions,
//  blendModeOptions, // removed for brevity
} from '../../data/bootstrap-classes/classes.js';

registerFormatType( 'fs/span', {
	title: __( 'Span', 'fs-blocks' ),
	tagName: 'span',
	className: 'fs-span-base', // Unique base class to avoid collisions
	icon: 'editor-code',

	edit( { isActive, value, onChange } ) {
		const [ isModalOpen, setIsModalOpen ] = useState( false );

		// Token fields for various Bootstrap classes
		const [ displayTokens, setDisplayTokens ] = useState( [] );
		const [ marginTokens, setMarginTokens ] = useState( [] );
		const [ paddingTokens, setPaddingTokens ] = useState( [] );
		const [ positionTokens, setPositionTokens ] = useState( [] );
		const [ zindexTokens, setZindexTokens ] = useState( [] );

		// NEW: store textColor and backgroundColor for inline styles
		const [ textColor, setTextColor ] = useState( '' );
		const [ backgroundColor, setBackgroundColor ] = useState( '' );

		function openModal() {
			setIsModalOpen( true );
		}
		function closeModal() {
			setIsModalOpen( false );
		}

		/**
		 * Called when user clicks the toolbar button.
		 * If already active, parse existing attributes so we can edit them;
		 * Otherwise, open with empty defaults.
		 */
		function onToggleFormat() {
			if ( isActive ) {
				populateExistingFormat();
			} else {
				openModal();
			}
		}

		/**
		 * Parse the existing <span> for classes + inline style
		 * if the format is active, so user can edit them.
		 */
		function populateExistingFormat() {
			const activeSpan = getActiveFormat( value, 'fs/span' );
			if ( ! activeSpan ) {
				openModal();
				return;
			}

			// 1) Parse classes (excluding base class)
			let classesString = activeSpan.attributes?.class || ''; 
			let classesArray = classesString.split( /\s+/ ).filter( ( c ) => c && c !== 'fs-span-base' );

			// We’ll figure out which category each belongs to
			const displaySuggestions = displayOptions.map( ( opt ) => opt.value );
			const marginSuggestions  = marginOptions.map( ( opt ) => opt.value );
			const paddingSuggestions = paddingOptions.map( ( opt ) => opt.value );
			const positionSuggestions= positionOptions.map( ( opt ) => opt.value );
			const zindexSuggestions  = zindexOptions.map( ( opt ) => opt.value );

			const pickedDisplay   = [];
			const pickedMargin    = [];
			const pickedPadding   = [];
			const pickedPosition  = [];
			const pickedZindex    = [];

			classesArray.forEach( ( cls ) => {
				if ( displaySuggestions.includes( cls ) ) {
					pickedDisplay.push( cls );
				} else if ( marginSuggestions.includes( cls ) ) {
					pickedMargin.push( cls );
				} else if ( paddingSuggestions.includes( cls ) ) {
					pickedPadding.push( cls );
				} else if ( positionSuggestions.includes( cls ) ) {
					pickedPosition.push( cls );
				} else if ( zindexSuggestions.includes( cls ) ) {
					pickedZindex.push( cls );
				}
			} );

			setDisplayTokens( pickedDisplay );
			setMarginTokens( pickedMargin );
			setPaddingTokens( pickedPadding );
			setPositionTokens( pickedPosition );
			setZindexTokens( pickedZindex );

			// 2) Parse inline style for "color" and "background-color"
			let styleString = activeSpan.attributes?.style || ''; // e.g. "color: #ff0000; background-color: #000;"
			if ( styleString ) {
				// Basic regex or manual splitting
				const colorMatch = styleString.match( /color:\s*([^;]+)/ );
				const bgMatch    = styleString.match( /background-color:\s*([^;]+)/ );

				setTextColor( colorMatch ? colorMatch[1].trim() : '' );
				setBackgroundColor( bgMatch ? bgMatch[1].trim() : '' );
			} else {
				setTextColor( '' );
				setBackgroundColor( '' );
			}

			openModal();
		}

		/**
		 * Apply or update the format around the selected text
		 */
		function applySpanFormat() {
			// Combine classes
			const allPicked = [
				...displayTokens,
				...marginTokens,
				...paddingTokens,
				...positionTokens,
				...zindexTokens,
			];
			const classString = `fs-span-base ${ allPicked.join( ' ' ) }`.trim();

			// Build an inline style from the chosen text & background
			const styleParts = [];
			if ( textColor ) {
				styleParts.push( `color: ${ textColor }` );
			}
			if ( backgroundColor ) {
				styleParts.push( `background-color: ${ backgroundColor }` );
			}
			const styleString = styleParts.join( '; ' );

			// If the user picks no classes and no colors, remove format entirely
			if ( ! classString.replace( 'fs-span-base', '' ) && ! styleString ) {
				const removed = removeFormat( value, 'fs/span' );
				onChange( removed );
				closeModal();
				return;
			}

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

		function removeSpanFormat() {
			const removed = removeFormat( value, 'fs/span' );
			onChange( removed );
			closeModal();
		}

		// Suggestions for token fields
		const displaySuggestions = displayOptions.map( ( opt ) => opt.value );
		const marginSuggestions  = marginOptions.map( ( opt ) => opt.value );
		const paddingSuggestions = paddingOptions.map( ( opt ) => opt.value );
		const positionSuggestions= positionOptions.map( ( opt ) => opt.value );
		const zindexSuggestions  = zindexOptions.map( ( opt ) => opt.value );

		// We’ll use the default WordPress color palette or you can provide custom colors
		// The simpler approach is to let user pick from a free-form <ColorPicker>, but
		// <ColorPalette> is more "WordPress-y".
		const colors = [
			{ name: 'Red', color: '#f00' },
			{ name: 'Green', color: '#0f0' },
			{ name: 'Blue', color: '#00f' },
			// Add more or use theme colors
		];

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
					>
						<div style={ { marginBottom: '1rem' } }>
							<p>{ __( 'Select Bootstrap classes, text color, and background color.', 'fs-blocks' ) }</p>
						</div>

						{/* Two-column grid for the token fields */}
						<div
							style={ {
								display: 'grid',
								gridTemplateColumns: 'repeat(2, 1fr)',
								gap: '0.75rem',
								alignItems: 'start',
							} }
						>
							<FormTokenField
								label={ __( 'Display', 'fs-blocks' ) }
								value={ displayTokens }
								suggestions={ displaySuggestions }
								onChange={ setDisplayTokens }
							/>
							<FormTokenField
								label={ __( 'Margin', 'fs-blocks' ) }
								value={ marginTokens }
								suggestions={ marginSuggestions }
								onChange={ setMarginTokens }
							/>
							<FormTokenField
								label={ __( 'Padding', 'fs-blocks' ) }
								value={ paddingTokens }
								suggestions={ paddingSuggestions }
								onChange={ setPaddingTokens }
							/>
							<FormTokenField
								label={ __( 'Position', 'fs-blocks' ) }
								value={ positionTokens }
								suggestions={ positionSuggestions }
								onChange={ setPositionTokens }
							/>
							<FormTokenField
								label={ __( 'Z-Index', 'fs-blocks' ) }
								value={ zindexTokens }
								suggestions={ zindexSuggestions }
								onChange={ setZindexTokens }
							/>
						</div>

						<hr style={ { margin: '1rem 0' } } />

						{/* Color pickers for text and background */}
						<div style={ { marginBottom: '1rem' } }>
							<strong>{ __( 'Text Color', 'fs-blocks' ) }</strong>
							<ColorPalette
								colors={ colors }
								value={ textColor }
								onChange={ ( newVal ) => setTextColor( newVal || '' ) }
							/>
						</div>
						<div style={ { marginBottom: '1rem' } }>
							<strong>{ __( 'Background Color', 'fs-blocks' ) }</strong>
							<ColorPalette
								colors={ colors }
								value={ backgroundColor }
								onChange={ ( newVal ) => setBackgroundColor( newVal || '' ) }
							/>
						</div>

						<div style={ { marginTop: '1rem', display: 'flex', gap: '0.5rem' } }>
							<Button variant="primary" onClick={ applySpanFormat }>
								{ __( 'Apply', 'fs-blocks' ) }
							</Button>
							<Button variant="secondary" onClick={ removeSpanFormat }>
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
	},
} );
