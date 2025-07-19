// components/PositiveMarginControls.js
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
import PositiveMarginControl from './PositiveMarginControl';

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

const PositiveMarginControls = ( {
	attributes,
	setAttributes,
	allowedControls = CONTROL_OPTIONS.map( ( o ) => o.name ),
} ) => {
	const tabs = CONTROL_OPTIONS.filter( ( option ) =>
		allowedControls.includes( option.name )
	);

	const renderControl = ( option ) => {
		const type = capitalize( option.name );
		const baseKey = `margin${ type }Base`;
		const smKey = `margin${ type }Sm`;
		const mdKey = `margin${ type }Md`;
		const lgKey = `margin${ type }Lg`;
		const xlKey = `margin${ type }Xl`;

		return (
			<PositiveMarginControl
				label={ option.label }
				subLabel="Margin"
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
		<PanelBody title="Margin Settings" initialOpen={ false }>
			<TabPanel
				className="positive-margin-tabs"
				tabs={ tabs.map( ( { name, icon } ) => ( {
					name,
					title: <Icon icon={ icon } />,
				} ) ) }
			>
				{ ( tab ) =>
					renderControl( tabs.find( ( t ) => t.name === tab.name ) )
				}
			</TabPanel>
		</PanelBody>
	);
};

export default PositiveMarginControls;
