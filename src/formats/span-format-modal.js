import {
	Modal,
	Button,
	ComboboxControl,
	ColorPalette,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

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

export default function SpanFormatModal( {
	isModalOpen,
	closeModal,
	showValues,
	setShowValues,
	classOptions,
	displayTokens,
	marginTokens,
	paddingTokens,
	positionTokens,
	otherTokens,
	textColor,
	setTextColor,
	backgroundColor,
	setBackgroundColor,
	otherStyleDeclarations,
	themePalette,
	onAddDisplayToken,
	onRemoveDisplayToken,
	onAddMarginToken,
	onRemoveMarginToken,
	onAddPaddingToken,
	onRemovePaddingToken,
	onAddPositionToken,
	onRemovePositionToken,
	applySpanFormat,
	removeSpanFormat,
} ) {
	if ( ! isModalOpen ) {
		return null;
	}

	return (
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
					onAddToken={ onAddDisplayToken }
					onRemoveToken={ onRemoveDisplayToken }
				/>
				<TokenSelectorControl
					label={ __( 'Margin', 'fs-blocks' ) }
					options={ classOptions.marginOptions }
					values={ marginTokens }
					showValues={ showValues }
					onAddToken={ onAddMarginToken }
					onRemoveToken={ onRemoveMarginToken }
				/>
				<TokenSelectorControl
					label={ __( 'Padding', 'fs-blocks' ) }
					options={ classOptions.paddingOptions }
					values={ paddingTokens }
					showValues={ showValues }
					onAddToken={ onAddPaddingToken }
					onRemoveToken={ onRemovePaddingToken }
				/>
				<TokenSelectorControl
					label={ __( 'Position', 'fs-blocks' ) }
					options={ classOptions.positionOptions }
					values={ positionTokens }
					showValues={ showValues }
					onAddToken={ onAddPositionToken }
					onRemoveToken={ onRemovePositionToken }
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
					<strong>{ __( 'Background Color', 'fs-blocks' ) }</strong>
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
				<Button variant="secondary" onClick={ removeSpanFormat }>
					{ __( 'Remove Format', 'fs-blocks' ) }
				</Button>
				<Button variant="tertiary" onClick={ closeModal }>
					{ __( 'Cancel', 'fs-blocks' ) }
				</Button>
			</div>
		</Modal>
	);
}
