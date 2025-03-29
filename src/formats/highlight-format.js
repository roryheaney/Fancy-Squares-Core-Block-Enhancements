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
	Modal,
	Button,
	FormTokenField,
} from '@wordpress/components';
import { useState, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

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
	className: 'fs-span-base', // a base class to avoid conflicts
	icon: 'editor-code',

	edit( { isActive, value, onChange } ) {
		// If the modal is open or closed
		const [ isModalOpen, setIsModalOpen ] = useState( false );

		// Separate states for each category
		const [ displayTokens, setDisplayTokens ] = useState( [] );
		const [ marginTokens, setMarginTokens ] = useState( [] );
		const [ paddingTokens, setPaddingTokens ] = useState( [] );
		const [ positionTokens, setPositionTokens ] = useState( [] );
		const [ zindexTokens, setZindexTokens ] = useState( [] );
		const [ blendTokens, setBlendTokens ] = useState( [] );

		const buttonElementRef = useRef( null );

		// Convert each array of objects into a list of string suggestions
		const displaySuggestions   = displayOptions.map( ( opt ) => opt.value );
		const marginSuggestions    = marginOptions.map( ( opt ) => opt.value );
		const paddingSuggestions   = paddingOptions.map( ( opt ) => opt.value );
		const positionSuggestions  = positionOptions.map( ( opt ) => opt.value );
		const zindexSuggestions    = zindexOptions.map( ( opt ) => opt.value );
		const blendSuggestions     = blendModeOptions.map( ( opt ) => opt.value );

		function onToggleFormat() {
			if ( isActive ) {
				// Already active, parse existing classes
				populateExistingClasses();
			} else {
				// Fresh usage
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
		 * Parse existing classes from the active span, if any,
		 * and populate the token fields so user can edit them.
		 */
		function populateExistingClasses() {
			const activeSpan = getActiveFormat( value, 'fs/span' );
			if ( ! activeSpan || ! activeSpan.attributes?.class ) {
				// No classes stored, just open empty
				openModal();
				return;
			}
			const classString = activeSpan.attributes.class;
			let classesArray = classString.split( /\s+/ );

			// Remove base class
			classesArray = classesArray.filter( ( c ) => c !== 'fs-span-base' );

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
				}
			} );

			// Populate states
			setDisplayTokens( pickedDisplay );
			setMarginTokens( pickedMargin );
			setPaddingTokens( pickedPadding );
			setPositionTokens( pickedPosition );
			setZindexTokens( pickedZindex );
			setBlendTokens( pickedBlend );

			openModal();
		}

		/**
		 * Apply or update the classes around the selected text
		 */
		function applySpanClasses() {
			const allPicked = [
				...displayTokens,
				...marginTokens,
				...paddingTokens,
				...positionTokens,
				...zindexTokens,
				...blendTokens,
			];

			if ( ! allPicked.length ) {
				// If no classes, remove format entirely
				const newValue = removeFormat( value, 'fs/span' );
				onChange( newValue );
				closeModal();
				return;
			}

			const classString = `fs-span-base ${ allPicked.join( ' ' ) }`.trim();
			const newValue = applyFormat( value, {
				type: 'fs/span',
				attributes: {
					class: classString,
				},
			} );
			onChange( newValue );
			closeModal();
		}

		function removeSpanFormat() {
			const newValue = removeFormat( value, 'fs/span' );
			onChange( newValue );
			closeModal();
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

				{/* Instead of a Popover, use <Modal>. It appears centered, as an overlay. */}
				{ isModalOpen && (
					<Modal
						title={ __( 'Span Classes', 'fs-blocks' ) }
						onRequestClose={ closeModal } // required for the close button
						isDismissible={ true }
						// You can pass additional props like style or className
					>
						<div style={ { marginBottom: '1rem' } }>
							<h3>{ __( 'Edit Classes', 'fs-blocks' ) }</h3>
							<p>
								{ __(
									'Pick classes from each category. Press "Apply" to update the inline span.',
									'fs-blocks'
								) }
							</p>
						</div>

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
								label={ __( 'Blend', 'fs-blocks' ) }
								value={ blendTokens }
								suggestions={ blendSuggestions }
								onChange={ setBlendTokens }
							/>
						</div>

						<div style={ { marginTop: '1rem', display: 'flex', gap: '0.5rem' } }>
							<Button variant="primary" onClick={ applySpanClasses }>
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
