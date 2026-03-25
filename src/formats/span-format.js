import {
	registerFormatType,
	applyFormat,
	removeFormat,
	getActiveFormat,
} from '@wordpress/rich-text';

import { RichTextToolbarButton, useSettings } from '@wordpress/block-editor';

import {
	Modal,
	Button,
	ComboboxControl,
	ColorPalette,
	ToggleControl,
} from '@wordpress/components';

import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import '../assets/scss/_span-format.scss';

let spanClassOptionsPromise = null;

const loadSpanClassOptions = async () => {
	if ( ! spanClassOptionsPromise ) {
		spanClassOptionsPromise = import(
			'../../data/bootstrap-classes/index.js'
		).then( ( optionsModule ) => ( {
			displayOptions: optionsModule.displayOptions || [],
			marginOptions: optionsModule.marginOptions || [],
			paddingOptions: optionsModule.paddingOptions || [],
			positionOptions: optionsModule.positionOptions || [],
		} ) );
	}

	return spanClassOptionsPromise;
};

const dedupeTokens = ( tokens ) => [
	...new Set( ( Array.isArray( tokens ) ? tokens : [] ).filter( Boolean ) ),
];

const getOptionLabel = ( option, showValues ) => {
	if ( ! option ) {
		return '';
	}

	if ( showValues ) {
		return option.value;
	}

	return option.label || option.value;
};

function TokenSelectorControl( {
	label,
	options,
	values,
	onAddToken,
	onRemoveToken,
	showValues,
} ) {
	const [ pendingToken, setPendingToken ] = useState( '' );

	const selectOptions = ( Array.isArray( options ) ? options : [] ).map(
		( option ) => ( {
			value: option.value,
			label: getOptionLabel( option, showValues ),
		} )
	);

	return (
		<div className="fs-span-token-control">
			<div className="fs-span-token-control__header">{ label }</div>
			<div className="fs-span-token-control__picker">
				<ComboboxControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					label={ __( 'Search and select class', 'fs-blocks' ) }
					value={ pendingToken }
					options={ selectOptions }
					onChange={ ( nextValue ) =>
						setPendingToken( nextValue || '' )
					}
				/>
				<Button
					variant="secondary"
					onClick={ () => {
						if ( ! pendingToken ) {
							return;
						}
						onAddToken( pendingToken );
						setPendingToken( '' );
					} }
					disabled={ ! pendingToken }
				>
					{ __( 'Add', 'fs-blocks' ) }
				</Button>
			</div>
			<div className="fs-span-token-control__chips">
				{ values.length === 0 && (
					<span className="fs-span-token-control__empty">
						{ __( 'No classes selected.', 'fs-blocks' ) }
					</span>
				) }
				{ values.map( ( token ) => {
					const matchedOption = ( options || [] ).find(
						( option ) => option.value === token
					);
					const tokenLabel = matchedOption
						? getOptionLabel( matchedOption, showValues )
						: token;

					return (
						<Button
							key={ `${ label }-${ token }` }
							variant="tertiary"
							onClick={ () => onRemoveToken( token ) }
							className="fs-span-token-control__chip"
						>
							{ tokenLabel } &times;
						</Button>
					);
				} ) }
			</div>
		</div>
	);
}

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
	const [ classOptionsReady, setClassOptionsReady ] = useState( false );
	const [ classOptions, setClassOptions ] = useState( {
		displayOptions: [],
		marginOptions: [],
		paddingOptions: [],
		positionOptions: [],
	} );

	// States for class tokens
	const [ displayTokens, setDisplayTokens ] = useState( [] );
	const [ marginTokens, setMarginTokens ] = useState( [] );
	const [ paddingTokens, setPaddingTokens ] = useState( [] );
	const [ positionTokens, setPositionTokens ] = useState( [] );
	const [ otherTokens, setOtherTokens ] = useState( [] );

	// States for inline color styles
	const [ textColor, setTextColor ] = useState( '' );
	const [ backgroundColor, setBackgroundColor ] = useState( '' );
	const [ otherStyleDeclarations, setOtherStyleDeclarations ] = useState(
		[]
	);

	// Toggle between showing class labels or values
	const [ showValues, setShowValues ] = useState( false );

	const [ themePalette = [] ] = useSettings( 'color.palette' );

	/**
	 * Toggle the format: if it's active, parse existing data so user can edit;
	 * otherwise, open the modal fresh.
	 */
	async function onToggleFormat() {
		const loadedClassOptions = await ensureClassOptionsLoaded();

		if ( isActive ) {
			populateExistingFormat( loadedClassOptions );
		} else {
			resetEditingState();
			openModal();
		}
	}

	function resetEditingState() {
		setDisplayTokens( [] );
		setMarginTokens( [] );
		setPaddingTokens( [] );
		setPositionTokens( [] );
		setOtherTokens( [] );
		setTextColor( '' );
		setBackgroundColor( '' );
		setOtherStyleDeclarations( [] );
	}

	async function ensureClassOptionsLoaded() {
		if ( classOptionsReady ) {
			return classOptions;
		}

		const loaded = await loadSpanClassOptions();
		setClassOptions( loaded );
		setClassOptionsReady( true );
		return loaded;
	}

	function openModal() {
		setIsModalOpen( true );
	}
	function closeModal() {
		setIsModalOpen( false );
	}

	/**
	 * Parse the existing <span> attributes: classes & inline style
	 *
	 * @param {Object} loadedClassOptions Loaded token option arrays.
	 */
	function populateExistingFormat( loadedClassOptions = classOptions ) {
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
		const displayVals = loadedClassOptions.displayOptions.map(
			( o ) => o.value
		);
		const marginVals = loadedClassOptions.marginOptions.map(
			( o ) => o.value
		);
		const paddingVals = loadedClassOptions.paddingOptions.map(
			( o ) => o.value
		);
		const positionVals = loadedClassOptions.positionOptions.map(
			( o ) => o.value
		);

		const pickedDisplay = [];
		const pickedMargin = [];
		const pickedPadding = [];
		const pickedPosition = [];
		const pickedOther = [];

		classArray.forEach( ( cls ) => {
			if ( displayVals.includes( cls ) ) {
				pickedDisplay.push( cls );
			} else if ( marginVals.includes( cls ) ) {
				pickedMargin.push( cls );
			} else if ( paddingVals.includes( cls ) ) {
				pickedPadding.push( cls );
			} else if ( positionVals.includes( cls ) ) {
				pickedPosition.push( cls );
			} else {
				pickedOther.push( cls );
			}
		} );

		setDisplayTokens( pickedDisplay );
		setMarginTokens( pickedMargin );
		setPaddingTokens( pickedPadding );
		setPositionTokens( pickedPosition );
		setOtherTokens( pickedOther );

		// 2) Inline styles (preserve unknown declarations).
		const styleAttr = activeSpan.attributes?.style || '';
		const declarations = styleAttr
			.split( ';' )
			.map( ( declaration ) => declaration.trim() )
			.filter( Boolean );

		let nextTextColor = '';
		let nextBackgroundColor = '';
		const nextOtherDeclarations = [];

		declarations.forEach( ( declaration ) => {
			const separatorIndex = declaration.indexOf( ':' );
			if ( separatorIndex < 0 ) {
				nextOtherDeclarations.push( declaration );
				return;
			}

			const property = declaration
				.slice( 0, separatorIndex )
				.trim()
				.toLowerCase();
			const propertyValue = declaration
				.slice( separatorIndex + 1 )
				.trim();

			if ( property === 'color' ) {
				nextTextColor = propertyValue;
				return;
			}

			if ( property === 'background-color' ) {
				nextBackgroundColor = propertyValue;
				return;
			}

			nextOtherDeclarations.push( `${ property }: ${ propertyValue }` );
		} );

		setTextColor( nextTextColor );
		setBackgroundColor( nextBackgroundColor );
		setOtherStyleDeclarations( nextOtherDeclarations );

		openModal();
	}

	/**
	 * Apply or update the format around the selected text
	 */
	function applySpanFormat() {
		// Combine chosen tokens
		const allTokens = dedupeTokens( [
			...displayTokens,
			...marginTokens,
			...paddingTokens,
			...positionTokens,
			...otherTokens,
		] );
		const classString = `fs-span-base ${ allTokens.join( ' ' ) }`.trim();

		// Build inline style
		const styleParts = [];
		if ( textColor ) {
			styleParts.push( `color: ${ textColor }` );
		}
		if ( backgroundColor ) {
			styleParts.push( `background-color: ${ backgroundColor }` );
		}
		styleParts.push( ...otherStyleDeclarations );
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
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Show Classes', 'fs-blocks' ) }
						checked={ showValues }
						onChange={ setShowValues }
						help={ __(
							'Display class names instead of labels.',
							'fs-blocks'
						) }
						className="fs-span-modal__show-values-toggle"
					/>
					<div className="fs-span-modal__token-grid">
						<TokenSelectorControl
							label={ __( 'Display', 'fs-blocks' ) }
							options={ classOptions.displayOptions }
							values={ displayTokens }
							showValues={ showValues }
							onAddToken={ ( token ) =>
								setDisplayTokens( ( current ) =>
									dedupeTokens( [ ...current, token ] )
								)
							}
							onRemoveToken={ ( token ) =>
								setDisplayTokens( ( current ) =>
									current.filter( ( item ) => item !== token )
								)
							}
						/>
						<TokenSelectorControl
							label={ __( 'Margin', 'fs-blocks' ) }
							options={ classOptions.marginOptions }
							values={ marginTokens }
							showValues={ showValues }
							onAddToken={ ( token ) =>
								setMarginTokens( ( current ) =>
									dedupeTokens( [ ...current, token ] )
								)
							}
							onRemoveToken={ ( token ) =>
								setMarginTokens( ( current ) =>
									current.filter( ( item ) => item !== token )
								)
							}
						/>
						<TokenSelectorControl
							label={ __( 'Padding', 'fs-blocks' ) }
							options={ classOptions.paddingOptions }
							values={ paddingTokens }
							showValues={ showValues }
							onAddToken={ ( token ) =>
								setPaddingTokens( ( current ) =>
									dedupeTokens( [ ...current, token ] )
								)
							}
							onRemoveToken={ ( token ) =>
								setPaddingTokens( ( current ) =>
									current.filter( ( item ) => item !== token )
								)
							}
						/>
						<TokenSelectorControl
							label={ __( 'Position', 'fs-blocks' ) }
							options={ classOptions.positionOptions }
							values={ positionTokens }
							showValues={ showValues }
							onAddToken={ ( token ) =>
								setPositionTokens( ( current ) =>
									dedupeTokens( [ ...current, token ] )
								)
							}
							onRemoveToken={ ( token ) =>
								setPositionTokens( ( current ) =>
									current.filter( ( item ) => item !== token )
								)
							}
						/>
					</div>
					{ otherTokens.length > 0 && (
						<p className="fs-span-modal__preserved-note">
							{ __(
								'Additional existing classes are preserved:',
								'fs-blocks'
							) }{ ' ' }
							<code>{ otherTokens.join( ' ' ) }</code>
						</p>
					) }

					<hr className="fs-span-modal__separator" />

					<h3>{ __( 'Colors', 'fs-blocks' ) }</h3>
					<div className="fs-span-modal__color-grid">
						<div className="fs-span-modal__color-column">
							<strong>{ __( 'Text Color', 'fs-blocks' ) }</strong>
							<ColorPalette
								colors={ themePalette }
								value={ textColor || undefined }
								onChange={ ( nextColor ) =>
									setTextColor( nextColor || '' )
								}
								clearable
								disableCustomColors={ true }
							/>
						</div>

						<div className="fs-span-modal__color-column">
							<strong>
								{ __( 'Background Color', 'fs-blocks' ) }
							</strong>
							<ColorPalette
								colors={ themePalette }
								value={ backgroundColor || undefined }
								onChange={ ( nextColor ) =>
									setBackgroundColor( nextColor || '' )
								}
								clearable
								disableCustomColors={ true }
							/>
						</div>
					</div>
					{ otherStyleDeclarations.length > 0 && (
						<p className="fs-span-modal__preserved-note">
							{ __(
								'Additional existing inline styles are preserved:',
								'fs-blocks'
							) }{ ' ' }
							<code>{ otherStyleDeclarations.join( '; ' ) }</code>
						</p>
					) }

					<div className="fs-span-modal__actions">
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
