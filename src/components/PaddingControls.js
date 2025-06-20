// components/PaddingControls.js
import { PanelBody } from '@wordpress/components';
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

const PaddingControls = ( { attributes, setAttributes } ) => (
	<PanelBody title="Padding Settings" initialOpen={ false }>
		<PaddingControl
			label="All Sides"
			subLabel="Padding"
			icon={ sidesAll }
			sideType="all"
			baseValue={ attributes.paddingAllBase }
			smValue={ attributes.paddingAllSm }
			mdValue={ attributes.paddingAllMd }
			lgValue={ attributes.paddingAllLg }
			xlValue={ attributes.paddingAllXl }
			onChangeBase={ ( value ) =>
				setAttributes( { paddingAllBase: value } )
			}
			onChangeSm={ ( value ) => setAttributes( { paddingAllSm: value } ) }
			onChangeMd={ ( value ) => setAttributes( { paddingAllMd: value } ) }
			onChangeLg={ ( value ) => setAttributes( { paddingAllLg: value } ) }
			onChangeXl={ ( value ) => setAttributes( { paddingAllXl: value } ) }
		/>
		<PaddingControl
			label="Horizontal"
			subLabel="Padding"
			icon={ sidesHorizontal }
			sideType="horizontal"
			baseValue={ attributes.paddingHorizontalBase }
			smValue={ attributes.paddingHorizontalSm }
			mdValue={ attributes.paddingHorizontalMd }
			lgValue={ attributes.paddingHorizontalLg }
			xlValue={ attributes.paddingHorizontalXl }
			onChangeBase={ ( value ) =>
				setAttributes( { paddingHorizontalBase: value } )
			}
			onChangeSm={ ( value ) =>
				setAttributes( { paddingHorizontalSm: value } )
			}
			onChangeMd={ ( value ) =>
				setAttributes( { paddingHorizontalMd: value } )
			}
			onChangeLg={ ( value ) =>
				setAttributes( { paddingHorizontalLg: value } )
			}
			onChangeXl={ ( value ) =>
				setAttributes( { paddingHorizontalXl: value } )
			}
		/>
		<PaddingControl
			label="Vertical"
			subLabel="Padding"
			icon={ sidesVertical }
			sideType="vertical"
			baseValue={ attributes.paddingVerticalBase }
			smValue={ attributes.paddingVerticalSm }
			mdValue={ attributes.paddingVerticalMd }
			lgValue={ attributes.paddingVerticalLg }
			xlValue={ attributes.paddingVerticalXl }
			onChangeBase={ ( value ) =>
				setAttributes( { paddingVerticalBase: value } )
			}
			onChangeSm={ ( value ) =>
				setAttributes( { paddingVerticalSm: value } )
			}
			onChangeMd={ ( value ) =>
				setAttributes( { paddingVerticalMd: value } )
			}
			onChangeLg={ ( value ) =>
				setAttributes( { paddingVerticalLg: value } )
			}
			onChangeXl={ ( value ) =>
				setAttributes( { paddingVerticalXl: value } )
			}
		/>
		<PaddingControl
			label="Top"
			subLabel="Padding"
			icon={ sidesTop }
			sideType="top"
			baseValue={ attributes.paddingTopBase }
			smValue={ attributes.paddingTopSm }
			mdValue={ attributes.paddingTopMd }
			lgValue={ attributes.paddingTopLg }
			xlValue={ attributes.paddingTopXl }
			onChangeBase={ ( value ) =>
				setAttributes( { paddingTopBase: value } )
			}
			onChangeSm={ ( value ) => setAttributes( { paddingTopSm: value } ) }
			onChangeMd={ ( value ) => setAttributes( { paddingTopMd: value } ) }
			onChangeLg={ ( value ) => setAttributes( { paddingTopLg: value } ) }
			onChangeXl={ ( value ) => setAttributes( { paddingTopXl: value } ) }
		/>
		<PaddingControl
			label="Right"
			subLabel="Padding"
			icon={ sidesRight }
			sideType="right"
			baseValue={ attributes.paddingRightBase }
			smValue={ attributes.paddingRightSm }
			mdValue={ attributes.paddingRightMd }
			lgValue={ attributes.paddingRightLg }
			xlValue={ attributes.paddingRightXl }
			onChangeBase={ ( value ) =>
				setAttributes( { paddingRightBase: value } )
			}
			onChangeSm={ ( value ) =>
				setAttributes( { paddingRightSm: value } )
			}
			onChangeMd={ ( value ) =>
				setAttributes( { paddingRightMd: value } )
			}
			onChangeLg={ ( value ) =>
				setAttributes( { paddingRightLg: value } )
			}
			onChangeXl={ ( value ) =>
				setAttributes( { paddingRightXl: value } )
			}
		/>
		<PaddingControl
			label="Bottom"
			subLabel="Padding"
			icon={ sidesBottom }
			sideType="bottom"
			baseValue={ attributes.paddingBottomBase }
			smValue={ attributes.paddingBottomSm }
			mdValue={ attributes.paddingBottomMd }
			lgValue={ attributes.paddingBottomLg }
			xlValue={ attributes.paddingBottomXl }
			onChangeBase={ ( value ) =>
				setAttributes( { paddingBottomBase: value } )
			}
			onChangeSm={ ( value ) =>
				setAttributes( { paddingBottomSm: value } )
			}
			onChangeMd={ ( value ) =>
				setAttributes( { paddingBottomMd: value } )
			}
			onChangeLg={ ( value ) =>
				setAttributes( { paddingBottomLg: value } )
			}
			onChangeXl={ ( value ) =>
				setAttributes( { paddingBottomXl: value } )
			}
		/>
		<PaddingControl
			label="Left"
			subLabel="Padding"
			icon={ sidesLeft }
			sideType="left"
			baseValue={ attributes.paddingLeftBase }
			smValue={ attributes.paddingLeftSm }
			mdValue={ attributes.paddingLeftMd }
			lgValue={ attributes.paddingLeftLg }
			xlValue={ attributes.paddingLeftXl }
			onChangeBase={ ( value ) =>
				setAttributes( { paddingLeftBase: value } )
			}
			onChangeSm={ ( value ) =>
				setAttributes( { paddingLeftSm: value } )
			}
			onChangeMd={ ( value ) =>
				setAttributes( { paddingLeftMd: value } )
			}
			onChangeLg={ ( value ) =>
				setAttributes( { paddingLeftLg: value } )
			}
			onChangeXl={ ( value ) =>
				setAttributes( { paddingLeftXl: value } )
			}
		/>
	</PanelBody>
);

export default PaddingControls;
