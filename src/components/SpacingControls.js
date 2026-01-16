// components/SpacingControls.js
import { PanelBody, TabPanel, Icon } from '@wordpress/components';
import {
	sidesAll,
	sidesHorizontal,
	sidesVertical,
	sidesTop,
	sidesRight,
	sidesBottom,
	sidesLeft,
} from '@wordpress/icons';
import SpacingControl from './SpacingControl';

const CONTROL_OPTIONS = [
	{ name: 'all', label: 'All Sides', icon: sidesAll },
	{ name: 'horizontal', label: 'Horizontal', icon: sidesHorizontal },
	{ name: 'vertical', label: 'Vertical', icon: sidesVertical },
	{ name: 'top', label: 'Top', icon: sidesTop },
	{ name: 'right', label: 'Right', icon: sidesRight },
	{ name: 'bottom', label: 'Bottom', icon: sidesBottom },
	{ name: 'left', label: 'Left', icon: sidesLeft },
];

/**
 * Configuration for different spacing types
 */
const SPACING_TYPE_CONFIG = {
	padding: {
		title: 'Padding Settings',
		subLabel: 'Padding',
		className: 'padding-tabs',
		attributePrefix: 'padding',
		isSetValue: ( value ) =>
			value !== '' && value !== undefined && value !== null,
	},
	margin: {
		title: 'Margin Settings',
		subLabel: 'Margin',
		className: 'positive-margin-tabs',
		attributePrefix: 'margin',
		isSetValue: ( value ) =>
			value !== '' && value !== undefined && value !== null,
	},
	negativeMargin: {
		title: 'Negative Margin Settings',
		subLabel: 'Negative Margin',
		className: 'negative-margin-tabs',
		attributePrefix: 'negativeMargin',
		isSetValue: ( value ) =>
			value !== '' &&
			value !== undefined &&
			value !== null &&
			value !== '0' &&
			value !== 0,
	},
};

const capitalize = ( str ) => str.charAt( 0 ).toUpperCase() + str.slice( 1 );

/**
 * Unified spacing controls component
 *
 * @param {Object} props - Component props
 * @param {string} props.type - Type of spacing: 'padding', 'margin', or 'negativeMargin'
 * @param {Object} props.attributes - Block attributes
 * @param {Function} props.setAttributes - Function to update block attributes
 * @param {Array} props.allowedControls - Array of allowed control names
 */
const SpacingControls = ( {
	type = 'padding',
	attributes,
	setAttributes,
	allowedControls = CONTROL_OPTIONS.map( ( o ) => o.name ),
} ) => {
	const config = SPACING_TYPE_CONFIG[ type ];
	const { title, subLabel, className, attributePrefix, isSetValue } = config;

	const tabs = CONTROL_OPTIONS.filter( ( option ) =>
		allowedControls.includes( option.name )
	);

	const getKeys = ( name ) => {
		const capitalizedType = capitalize( name );
		return [
			`${ attributePrefix }${ capitalizedType }Base`,
			`${ attributePrefix }${ capitalizedType }Sm`,
			`${ attributePrefix }${ capitalizedType }Md`,
			`${ attributePrefix }${ capitalizedType }Lg`,
			`${ attributePrefix }${ capitalizedType }Xl`,
		];
	};

	const isTabActive = ( option ) =>
		getKeys( option.name ).some( ( key ) =>
			isSetValue( attributes[ key ] )
		);

	const activeLabels = tabs
		.filter( ( option ) => isTabActive( option ) )
		.map( ( option ) => option.label );

	const hasActive = activeLabels.length > 0;

	const renderControl = ( option ) => {
		const capitalizedType = capitalize( option.name );
		const baseKey = `${ attributePrefix }${ capitalizedType }Base`;
		const smKey = `${ attributePrefix }${ capitalizedType }Sm`;
		const mdKey = `${ attributePrefix }${ capitalizedType }Md`;
		const lgKey = `${ attributePrefix }${ capitalizedType }Lg`;
		const xlKey = `${ attributePrefix }${ capitalizedType }Xl`;

		return (
			<SpacingControl
				type={ type }
				label={ option.label }
				subLabel={ subLabel }
				icon={ option.icon }
				baseValue={ attributes[ baseKey ] }
				smValue={ attributes[ smKey ] }
				mdValue={ attributes[ mdKey ] }
				lgValue={ attributes[ lgKey ] }
				xlValue={ attributes[ xlKey ] }
				onChangeBase={ ( value ) =>
					setAttributes( { [ baseKey ]: value } )
				}
				onChangeSm={ ( value ) =>
					setAttributes( { [ smKey ]: value } )
				}
				onChangeMd={ ( value ) =>
					setAttributes( { [ mdKey ]: value } )
				}
				onChangeLg={ ( value ) =>
					setAttributes( { [ lgKey ]: value } )
				}
				onChangeXl={ ( value ) =>
					setAttributes( { [ xlKey ]: value } )
				}
			/>
		);
	};

	return (
		<PanelBody
			title={
				<span className="fs-panel-title">
					{ title }
					{ hasActive && (
						<span
							className="fs-panel-indicator"
							aria-hidden="true"
						/>
					) }
				</span>
			}
			initialOpen={ false }
		>
			{ hasActive && (
				<p className="fs-control-summary">
					Active: { activeLabels.join( ', ' ) }
				</p>
			) }
			<TabPanel
				className={ className }
				tabs={ tabs.map( ( option ) => ( {
					name: option.name,
					title: (
						<span className="fs-tab-title" title={ option.label }>
							<Icon icon={ option.icon } />
							{ isTabActive( option ) && (
								<span
									className="fs-tab-badge"
									aria-hidden="true"
								/>
							) }
						</span>
					),
				} ) ) }
			>
				{ ( tab ) =>
					renderControl( tabs.find( ( t ) => t.name === tab.name ) )
				}
			</TabPanel>
		</PanelBody>
	);
};

export default SpacingControls;
