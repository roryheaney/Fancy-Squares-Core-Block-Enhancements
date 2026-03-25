// components/TokenFields.js
import { FormTokenField, Spinner } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import {
	getDisplayValues,
	getValuesFromDisplay,
	getSuggestions,
} from '../utils/helpers';
import { loadClassOptionsMap } from '../config/class-options-map';

const TokenFields = ( {
	config = {},
	attributes,
	setAttributes,
	showValues,
} ) => {
	const [ classOptionsMap, setClassOptionsMap ] = useState( null );

	useEffect( () => {
		let isMounted = true;

		loadClassOptionsMap().then( ( loadedMap ) => {
			if ( isMounted ) {
				setClassOptionsMap( loadedMap );
			}
		} );

		return () => {
			isMounted = false;
		};
	}, [] );

	if ( ! classOptionsMap ) {
		return <Spinner />;
	}

	return (
		<>
			{ ( config.classOptions || [] ).map( ( classType ) => {
				const classKey = `${ classType }Classes`;
				const classValue = attributes[ classKey ] || [];
				const { options = [] } = classOptionsMap[ classType ] || {};

				const onChange = ( newTokens ) => {
					const newValues = getValuesFromDisplay(
						newTokens,
						options,
						showValues
					);
					setAttributes( { [ classKey ]: newValues } );
				};

				return (
					<div key={ classType } style={ { marginBottom: '20px' } }>
						<FormTokenField
							__nextHasNoMarginBottom
							__next40pxDefaultSize
							label={ `${
								classType.charAt( 0 ).toUpperCase() +
								classType.slice( 1 )
							} Classes` }
							value={ getDisplayValues(
								classValue,
								options,
								showValues
							) }
							suggestions={ getSuggestions(
								options,
								showValues
							) }
							onChange={ onChange }
						/>
						<details style={ { marginTop: '5px' } }>
							<summary>
								{ `Available ${ classType
									.replace( /([A-Z])/g, ' $1' )
									.replace( /^./, ( str ) =>
										str.toUpperCase()
									) } Classes` }
							</summary>
							<ul
								style={ {
									fontSize: '12px',
									paddingLeft: '20px',
									margin: '5px 0',
								} }
							>
								{ options.map( ( item ) => (
									<li key={ item.value }>
										{ showValues ? item.value : item.label }
									</li>
								) ) }
							</ul>
						</details>
					</div>
				);
			} ) }
		</>
	);
};

export default TokenFields;
