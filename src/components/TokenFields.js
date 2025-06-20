// components/TokenFields.js
import { FormTokenField } from '@wordpress/components';
import {
	getDisplayValues,
	getValuesFromDisplay,
	getSuggestions,
} from '../utils/helpers';
import { CLASS_OPTIONS_MAP } from '../config/blockConfig';

const TokenFields = ( {
	config = {},
	attributes,
	setAttributes,
	showValues,
} ) => {
	return (
		<>
			{ ( config.classOptions || [] ).map( ( classType ) => {
				const classKey = `${ classType }Classes`;
				const classValue = attributes[ classKey ] || [];
				const { options } = CLASS_OPTIONS_MAP[ classType ];

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
