import {
	registerFormatType,
	applyFormat,
	removeFormat,
	getActiveFormat,
} from '@wordpress/rich-text';

import { RichTextToolbarButton, useSettings } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import SpanFormatModal from './span-format-modal';
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

const getOptionValues = ( options ) =>
	( Array.isArray( options ) ? options : [] ).map(
		( option ) => option.value
	);

const classifySpanTokens = ( classAttr, loadedClassOptions ) => {
	const classArray = ( classAttr || '' )
		.split( /\s+/ )
		.filter( ( token ) => token && token !== 'fs-span-base' );

	const displayVals = getOptionValues( loadedClassOptions.displayOptions );
	const marginVals = getOptionValues( loadedClassOptions.marginOptions );
	const paddingVals = getOptionValues( loadedClassOptions.paddingOptions );
	const positionVals = getOptionValues( loadedClassOptions.positionOptions );

	return classArray.reduce(
		( grouped, token ) => {
			if ( displayVals.includes( token ) ) {
				grouped.displayTokens.push( token );
				return grouped;
			}
			if ( marginVals.includes( token ) ) {
				grouped.marginTokens.push( token );
				return grouped;
			}
			if ( paddingVals.includes( token ) ) {
				grouped.paddingTokens.push( token );
				return grouped;
			}
			if ( positionVals.includes( token ) ) {
				grouped.positionTokens.push( token );
				return grouped;
			}
			grouped.otherTokens.push( token );
			return grouped;
		},
		{
			displayTokens: [],
			marginTokens: [],
			paddingTokens: [],
			positionTokens: [],
			otherTokens: [],
		}
	);
};

const parseSpanStyleDeclarations = ( styleAttr ) => {
	const declarations = ( styleAttr || '' )
		.split( ';' )
		.map( ( declaration ) => declaration.trim() )
		.filter( Boolean );

	return declarations.reduce(
		( parsed, declaration ) => {
			const separatorIndex = declaration.indexOf( ':' );
			if ( separatorIndex < 0 ) {
				parsed.otherStyleDeclarations.push( declaration );
				return parsed;
			}

			const property = declaration
				.slice( 0, separatorIndex )
				.trim()
				.toLowerCase();
			const propertyValue = declaration
				.slice( separatorIndex + 1 )
				.trim();

			if ( property === 'color' ) {
				parsed.textColor = propertyValue;
				return parsed;
			}

			if ( property === 'background-color' ) {
				parsed.backgroundColor = propertyValue;
				return parsed;
			}

			parsed.otherStyleDeclarations.push(
				`${ property }: ${ propertyValue }`
			);
			return parsed;
		},
		{
			textColor: '',
			backgroundColor: '',
			otherStyleDeclarations: [],
		}
	);
};

function EditSpan( { isActive, value, onChange } ) {
	const [ isModalOpen, setIsModalOpen ] = useState( false );
	const [ classOptionsReady, setClassOptionsReady ] = useState( false );
	const [ classOptions, setClassOptions ] = useState( {
		displayOptions: [],
		marginOptions: [],
		paddingOptions: [],
		positionOptions: [],
	} );

	const [ displayTokens, setDisplayTokens ] = useState( [] );
	const [ marginTokens, setMarginTokens ] = useState( [] );
	const [ paddingTokens, setPaddingTokens ] = useState( [] );
	const [ positionTokens, setPositionTokens ] = useState( [] );
	const [ otherTokens, setOtherTokens ] = useState( [] );

	const [ textColor, setTextColor ] = useState( '' );
	const [ backgroundColor, setBackgroundColor ] = useState( '' );
	const [ otherStyleDeclarations, setOtherStyleDeclarations ] = useState(
		[]
	);
	const [ showValues, setShowValues ] = useState( false );

	const [ themePalette = [] ] = useSettings( 'color.palette' );

	const openModal = () => setIsModalOpen( true );
	const closeModal = () => setIsModalOpen( false );

	const resetEditingState = () => {
		setDisplayTokens( [] );
		setMarginTokens( [] );
		setPaddingTokens( [] );
		setPositionTokens( [] );
		setOtherTokens( [] );
		setTextColor( '' );
		setBackgroundColor( '' );
		setOtherStyleDeclarations( [] );
	};

	const ensureClassOptionsLoaded = async () => {
		if ( classOptionsReady ) {
			return classOptions;
		}

		const loaded = await loadSpanClassOptions();
		setClassOptions( loaded );
		setClassOptionsReady( true );
		return loaded;
	};

	const populateExistingFormat = ( loadedClassOptions = classOptions ) => {
		const activeSpan = getActiveFormat( value, 'fs/span' );
		if ( ! activeSpan ) {
			openModal();
			return;
		}

		const groupedTokens = classifySpanTokens(
			activeSpan.attributes?.class || '',
			loadedClassOptions
		);
		setDisplayTokens( groupedTokens.displayTokens );
		setMarginTokens( groupedTokens.marginTokens );
		setPaddingTokens( groupedTokens.paddingTokens );
		setPositionTokens( groupedTokens.positionTokens );
		setOtherTokens( groupedTokens.otherTokens );

		const parsedStyles = parseSpanStyleDeclarations(
			activeSpan.attributes?.style || ''
		);
		setTextColor( parsedStyles.textColor );
		setBackgroundColor( parsedStyles.backgroundColor );
		setOtherStyleDeclarations( parsedStyles.otherStyleDeclarations );
		openModal();
	};

	const applySpanFormat = () => {
		const allTokens = dedupeTokens( [
			...displayTokens,
			...marginTokens,
			...paddingTokens,
			...positionTokens,
			...otherTokens,
		] );
		const classString = `fs-span-base ${ allTokens.join( ' ' ) }`.trim();

		const styleParts = [];
		if ( textColor ) {
			styleParts.push( `color: ${ textColor }` );
		}
		if ( backgroundColor ) {
			styleParts.push( `background-color: ${ backgroundColor }` );
		}
		styleParts.push( ...otherStyleDeclarations );
		const styleString = styleParts.join( '; ' );

		const noExtra = classString === 'fs-span-base' && ! styleString;
		if ( noExtra ) {
			onChange( removeFormat( value, 'fs/span' ) );
			closeModal();
			return;
		}

		onChange(
			applyFormat( value, {
				type: 'fs/span',
				attributes: {
					class: classString,
					style: styleString,
				},
			} )
		);
		closeModal();
	};

	const removeSpanFormat = () => {
		onChange( removeFormat( value, 'fs/span' ) );
		closeModal();
	};

	const onToggleFormat = async () => {
		const loadedClassOptions = await ensureClassOptionsLoaded();
		if ( isActive ) {
			populateExistingFormat( loadedClassOptions );
			return;
		}
		resetEditingState();
		openModal();
	};

	const addToken = ( setter ) => ( token ) =>
		setter( ( current ) => dedupeTokens( [ ...current, token ] ) );
	const removeToken = ( setter ) => ( token ) =>
		setter( ( current ) => current.filter( ( item ) => item !== token ) );

	return (
		<>
			<RichTextToolbarButton
				icon="editor-code"
				title={ __( 'Span', 'fs-blocks' ) }
				onClick={ onToggleFormat }
				isActive={ isActive }
			/>

			<SpanFormatModal
				isModalOpen={ isModalOpen }
				closeModal={ closeModal }
				showValues={ showValues }
				setShowValues={ setShowValues }
				classOptions={ classOptions }
				displayTokens={ displayTokens }
				marginTokens={ marginTokens }
				paddingTokens={ paddingTokens }
				positionTokens={ positionTokens }
				otherTokens={ otherTokens }
				textColor={ textColor }
				setTextColor={ setTextColor }
				backgroundColor={ backgroundColor }
				setBackgroundColor={ setBackgroundColor }
				otherStyleDeclarations={ otherStyleDeclarations }
				themePalette={ themePalette }
				onAddDisplayToken={ addToken( setDisplayTokens ) }
				onRemoveDisplayToken={ removeToken( setDisplayTokens ) }
				onAddMarginToken={ addToken( setMarginTokens ) }
				onRemoveMarginToken={ removeToken( setMarginTokens ) }
				onAddPaddingToken={ addToken( setPaddingTokens ) }
				onRemovePaddingToken={ removeToken( setPaddingTokens ) }
				onAddPositionToken={ addToken( setPositionTokens ) }
				onRemovePositionToken={ removeToken( setPositionTokens ) }
				applySpanFormat={ applySpanFormat }
				removeSpanFormat={ removeSpanFormat }
			/>
		</>
	);
}

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
