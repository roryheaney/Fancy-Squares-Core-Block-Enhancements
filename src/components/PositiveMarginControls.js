// components/PositiveMarginControls.js
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
import PositiveMarginControl from './PositiveMarginControl';

const PositiveMarginControls = ( { attributes, setAttributes } ) => (
	<PanelBody title="Margin Settings" initialOpen={ false }>
		<PositiveMarginControl
			label="All Sides"
			subLabel="Margin"
			icon={ sidesAll }
			sideType="all"
			baseValue={ attributes.marginAllBase }
			smValue={ attributes.marginAllSm }
			mdValue={ attributes.marginAllMd }
			lgValue={ attributes.marginAllLg }
			xlValue={ attributes.marginAllXl }
			onChangeBase={ ( value ) =>
				setAttributes( { marginAllBase: value } )
			}
			onChangeSm={ ( value ) => setAttributes( { marginAllSm: value } ) }
			onChangeMd={ ( value ) => setAttributes( { marginAllMd: value } ) }
			onChangeLg={ ( value ) => setAttributes( { marginAllLg: value } ) }
			onChangeXl={ ( value ) => setAttributes( { marginAllXl: value } ) }
		/>
		<PositiveMarginControl
			label="Horizontal"
			subLabel="Margin"
			icon={ sidesHorizontal }
			sideType="horizontal"
			baseValue={ attributes.marginHorizontalBase }
			smValue={ attributes.marginHorizontalSm }
			mdValue={ attributes.marginHorizontalMd }
			lgValue={ attributes.marginHorizontalLg }
			xlValue={ attributes.marginHorizontalXl }
			onChangeBase={ ( value ) =>
				setAttributes( { marginHorizontalBase: value } )
			}
			onChangeSm={ ( value ) =>
				setAttributes( { marginHorizontalSm: value } )
			}
			onChangeMd={ ( value ) =>
				setAttributes( { marginHorizontalMd: value } )
			}
			onChangeLg={ ( value ) =>
				setAttributes( { marginHorizontalLg: value } )
			}
			onChangeXl={ ( value ) =>
				setAttributes( { marginHorizontalXl: value } )
			}
		/>
		<PositiveMarginControl
			label="Vertical"
			subLabel="Margin"
			icon={ sidesVertical }
			sideType="vertical"
			baseValue={ attributes.marginVerticalBase }
			smValue={ attributes.marginVerticalSm }
			mdValue={ attributes.marginVerticalMd }
			lgValue={ attributes.marginVerticalLg }
			xlValue={ attributes.marginVerticalXl }
			onChangeBase={ ( value ) =>
				setAttributes( { marginVerticalBase: value } )
			}
			onChangeSm={ ( value ) =>
				setAttributes( { marginVerticalSm: value } )
			}
			onChangeMd={ ( value ) =>
				setAttributes( { marginVerticalMd: value } )
			}
			onChangeLg={ ( value ) =>
				setAttributes( { marginVerticalLg: value } )
			}
			onChangeXl={ ( value ) =>
				setAttributes( { marginVerticalXl: value } )
			}
		/>
		<PositiveMarginControl
			label="Top"
			subLabel="Margin"
			icon={ sidesTop }
			sideType="top"
			baseValue={ attributes.marginTopBase }
			smValue={ attributes.marginTopSm }
			mdValue={ attributes.marginTopMd }
			lgValue={ attributes.marginTopLg }
			xlValue={ attributes.marginTopXl }
			onChangeBase={ ( value ) =>
				setAttributes( { marginTopBase: value } )
			}
			onChangeSm={ ( value ) => setAttributes( { marginTopSm: value } ) }
			onChangeMd={ ( value ) => setAttributes( { marginTopMd: value } ) }
			onChangeLg={ ( value ) => setAttributes( { marginTopLg: value } ) }
			onChangeXl={ ( value ) => setAttributes( { marginTopXl: value } ) }
		/>
		<PositiveMarginControl
			label="Right"
			subLabel="Margin"
			icon={ sidesRight }
			sideType="right"
			baseValue={ attributes.marginRightBase }
			smValue={ attributes.marginRightSm }
			mdValue={ attributes.marginRightMd }
			lgValue={ attributes.marginRightLg }
			xlValue={ attributes.marginRightXl }
			onChangeBase={ ( value ) =>
				setAttributes( { marginRightBase: value } )
			}
			onChangeSm={ ( value ) =>
				setAttributes( { marginRightSm: value } )
			}
			onChangeMd={ ( value ) =>
				setAttributes( { marginRightMd: value } )
			}
			onChangeLg={ ( value ) =>
				setAttributes( { marginRightLg: value } )
			}
			onChangeXl={ ( value ) =>
				setAttributes( { marginRightXl: value } )
			}
		/>
		<PositiveMarginControl
			label="Bottom"
			subLabel="Margin"
			icon={ sidesBottom }
			sideType="bottom"
			baseValue={ attributes.marginBottomBase }
			smValue={ attributes.marginBottomSm }
			mdValue={ attributes.marginBottomMd }
			lgValue={ attributes.marginBottomLg }
			xlValue={ attributes.marginBottomXl }
			onChangeBase={ ( value ) =>
				setAttributes( { marginBottomBase: value } )
			}
			onChangeSm={ ( value ) =>
				setAttributes( { marginBottomSm: value } )
			}
			onChangeMd={ ( value ) =>
				setAttributes( { marginBottomMd: value } )
			}
			onChangeLg={ ( value ) =>
				setAttributes( { marginBottomLg: value } )
			}
			onChangeXl={ ( value ) =>
				setAttributes( { marginBottomXl: value } )
			}
		/>
		<PositiveMarginControl
			label="Left"
			subLabel="Margin"
			icon={ sidesLeft }
			sideType="left"
			baseValue={ attributes.marginLeftBase }
			smValue={ attributes.marginLeftSm }
			mdValue={ attributes.marginLeftMd }
			lgValue={ attributes.marginLeftLg }
			xlValue={ attributes.marginLeftXl }
			onChangeBase={ ( value ) =>
				setAttributes( { marginLeftBase: value } )
			}
			onChangeSm={ ( value ) => setAttributes( { marginLeftSm: value } ) }
			onChangeMd={ ( value ) => setAttributes( { marginLeftMd: value } ) }
			onChangeLg={ ( value ) => setAttributes( { marginLeftLg: value } ) }
			onChangeXl={ ( value ) => setAttributes( { marginLeftXl: value } ) }
		/>
	</PanelBody>
);

export default PositiveMarginControls;
