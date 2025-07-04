// components/NegativeMarginControls.js
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
import NegativeMarginControl from './NegativeMarginControl';

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

const NegativeMarginControls = ( {
	attributes,
	setAttributes,
	allowedControls = CONTROL_OPTIONS.map( ( o ) => o.name ),
} ) => {
	const tabs = CONTROL_OPTIONS.filter( ( option ) =>
		allowedControls.includes( option.name )
	);

	const renderControl = ( option ) => {
		const type = capitalize( option.name );
		const baseKey = `negativeMargin${ type }Base`;
		const smKey = `negativeMargin${ type }Sm`;
		const mdKey = `negativeMargin${ type }Md`;
		const lgKey = `negativeMargin${ type }Lg`;
		const xlKey = `negativeMargin${ type }Xl`;

		return (
			<NegativeMarginControl
				label={ option.label }
				subLabel="Negative Margin"
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
		<PanelBody title="Negative Margin Settings" initialOpen={ false }>
			<TabPanel
				className="negative-margin-tabs"
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

export default NegativeMarginControls;
