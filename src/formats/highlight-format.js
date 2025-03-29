import {
	registerFormatType,
	applyFormat,
	removeFormat,
	getActiveFormat,
} from '@wordpress/rich-text';
import {
	RichTextToolbarButton,
} from '@wordpress/block-editor';
import {
	Popover,
	Button,
	FormTokenField,
} from '@wordpress/components';
import { useState, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

// Import your Bootstrap arrays
import {
	displayOptions,
	marginOptions,
	paddingOptions,
	positionOptions,
	zindexOptions,
	blendModeOptions,
} from '../../data/bootstrap-classes/classes.js';

registerFormatType( 'fs/span', {
	title: __( 'Span', 'fs-blocks' ),
	tagName: 'span',
	className: 'fs-span-base', // Unique base class to avoid collisions
	icon: 'editor-code',

	edit( { isActive, value, onChange } ) {
		const [ isPopoverVisible, setIsPopoverVisible ] = useState( false );

		// Separate states for each category
		const [ displayTokens, setDisplayTokens ] = useState( [] );
		const [ marginTokens, setMarginTokens ] = useState( [] );
		const [ paddingTokens, setPaddingTokens ] = useState( [] );
		const [ positionTokens, setPositionTokens ] = useState( [] );
		const [ zindexTokens, setZindexTokens ] = useState( [] );
		const [ blendTokens, setBlendTokens ] = useState( [] );

		const buttonElementRef = useRef( null );

		// Utility: convert each array of {value, label?} to just string values
		const displaySuggestions   = displayOptions.map( ( opt ) => opt.value );
		const marginSuggestions    = marginOptions.map( ( opt ) => opt.value );
		const paddingSuggestions   = paddingOptions.map( ( opt ) => opt.value );
		const positionSuggestions  = positionOptions.map( ( opt ) => opt.value );
		const zindexSuggestions    = zindexOptions.map( ( opt ) => opt.value );
		const blendSuggestions     = blendModeOptions.map( ( opt ) => opt.value );

		/**
		 * When user toggles the button:
		 * - If the format is not active, open a fresh popover
		 * - If it is active, parse existing classes and open the popover for editing
		 */
		function onToggleFormat() {
			if ( isActive ) {
				// Format is already active, so parse existing classes
				populateExistingClasses();
			} else {
				// Fresh usage: just open popover with empty states
				openPopover();
			}
		}

		function openPopover() {
			setIsPopoverVisible( true );
		}
		function closePopover() {
			setIsPopoverVisible( false );
		}

		/**
		 * Parse existing classes from the <span> if the format is active,
		 * then split them into display, margin, etc. states.
		 */
		function populateExistingClasses() {
			const activeSpan = getActiveFormat( value, 'fs/span' );
			if ( ! activeSpan || ! activeSpan.attributes?.class ) {
				// No existing classes found, just open
				openPopover();
				return;
			}

			// Example class attribute might be: "fs-span-base d-none m-2 p-3"
			const classString = activeSpan.attributes.class;

			// Split by spaces
			let classesArray = classString.split( /\s+/ );

			// Remove the base "fs-span-base" so we only store user-chosen tokens
			classesArray = classesArray.filter( ( c ) => c !== 'fs-span-base' );

			// Now figure out which category each class belongs to
			const pickedDisplay   = [];
			const pickedMargin    = [];
			const pickedPadding   = [];
			const pickedPosition  = [];
			const pickedZindex    = [];
			const pickedBlend     = [];

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
				} else if ( blendSuggestions.includes( cls ) ) {
					pickedBlend.push( cls );
				} else {
					// This class doesn't match any known category
					// You could store it somewhere or ignore it
				}
			} );

			// Update state so the user sees them in the form
			setDisplayTokens( pickedDisplay );
			setMarginTokens( pickedMargin );
			setPaddingTokens( pickedPadding );
			setPositionTokens( pickedPosition );
			setZindexTokens( pickedZindex );
			setBlendTokens( pickedBlend );

			// Finally, open the popover
			openPopover();
		}

		/**
		 * Apply or update the classes around the selected text
		 */
		function applySpanClasses() {
			// Combine tokens from all categories
			const allPicked = [
				...displayTokens,
				...marginTokens,
				...paddingTokens,
				...positionTokens,
				...zindexTokens,
				...blendTokens,
			];

			if ( ! allPicked.length ) {
				// If user ended up with no classes, you might remove the format entirely or just keep the base.
				const newValue = removeFormat( value, 'fs/span' );
				onChange( newValue );
				closePopover();
				return;
			}

			// Add base class plus chosen classes
			const classString = `fs-span-base ${ allPicked.join( ' ' ) }`.trim();

			const newValue = applyFormat( value, {
				type: 'fs/span',
				attributes: {
					class: classString,
				},
			} );

			onChange( newValue );
			closePopover();
		}

		/**
		 * Optional: A simple way to remove the format from this popover.
		 */
		function removeSpanFormat() {
			const newValue = removeFormat( value, 'fs/span' );
			onChange( newValue );
			closePopover();
		}

		return (
			<>
				<span ref={ buttonElementRef }>
					<RichTextToolbarButton
						icon="editor-code"
						title={ __( 'Span', 'fs-blocks' ) }
						onClick={ onToggleFormat }
						isActive={ isActive }
					/>
				</span>

				{ isPopoverVisible && (
					<Popover
						anchor={ buttonElementRef.current }
						position="bottom center"
						onClose={ closePopover }
					>
						<div style={ { padding: '1rem', minWidth: '320px' } }>
							<h3 style={ { marginTop: 0 } }>
								{ __( 'Edit Span Classes', 'fs-blocks' ) }
							</h3>

							{/* A grid for multiple token fields, or single column layout */}
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
								<FormTokenField
									label={ __( 'Blend Mode', 'fs-blocks' ) }
									value={ blendTokens }
									suggestions={ blendSuggestions }
									onChange={ setBlendTokens }
								/>
							</div>

							<div style={ { marginTop: '1rem', display: 'flex', gap: '0.5rem' } }>
								<Button
									variant="primary"
									onClick={ applySpanClasses }
								>
									{ __( 'Apply', 'fs-blocks' ) }
								</Button>
								<Button
									variant="secondary"
									onClick={ removeSpanFormat }
								>
									{ __( 'Remove', 'fs-blocks' ) }
								</Button>
							</div>
						</div>
					</Popover>
				) }
			</>
		);
	},
} );
