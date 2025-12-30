// components/PaddingControls.js
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
import PaddingControl from './PaddingControl';

const CONTROL_OPTIONS = [
	{ name: 'all', label: 'All Sides', icon: sidesAll },
	{ name: 'horizontal', label: 'Horizontal', icon: sidesHorizontal },
	{ name: 'vertical', label: 'Vertical', icon: sidesVertical },
	{ name: 'top', label: 'Top', icon: sidesTop },
	{ name: 'right', label: 'Right', icon: sidesRight },
	{ name: 'bottom', label: 'Bottom', icon: sidesBottom },
	{ name: 'left', label: 'Left', icon: sidesLeft },
];

const capitalize = ( str ) => str.charAt( 0 ).toUpperCase() + str.slice( 1 );
const isSetValue = ( value ) =>
	value !== '' && value !== undefined && value !== null;

const PaddingControls = ( {
	attributes,
	setAttributes,
	allowedControls = CONTROL_OPTIONS.map( ( o ) => o.name ),
} ) => {
	const tabs = CONTROL_OPTIONS.filter( ( option ) =>
		allowedControls.includes( option.name )
	);
	const getKeys = ( name ) => {
		const type = capitalize( name );
		return [
			`padding${ type }Base`,
			`padding${ type }Sm`,
			`padding${ type }Md`,
			`padding${ type }Lg`,
			`padding${ type }Xl`,
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
		const type = capitalize( option.name );
		const baseKey = `padding${ type }Base`;
		const smKey = `padding${ type }Sm`;
		const mdKey = `padding${ type }Md`;
		const lgKey = `padding${ type }Lg`;
		const xlKey = `padding${ type }Xl`;

		return (
			<PaddingControl
				label={ option.label }
				subLabel="Padding"
				icon={ option.icon }
				sideType={ option.name }
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
					Padding Settings
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
				className="padding-tabs"
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

export default PaddingControls;
