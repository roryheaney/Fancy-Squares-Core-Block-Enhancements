// components/NegativeMarginControls.js
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
import NegativeMarginControl from './NegativeMarginControl';

const NegativeMarginControls = ( { attributes, setAttributes } ) => (
	<PanelBody title="Negative Margin Settings" initialOpen={ false }>
		<NegativeMarginControl
			label="All Sides"
			subLabel="Negative Margin"
			icon={ sidesAll }
			sideType="all"
			baseValue={ attributes.negativeMarginAllBase }
			smValue={ attributes.negativeMarginAllSm }
			mdValue={ attributes.negativeMarginAllMd }
			lgValue={ attributes.negativeMarginAllLg }
			xlValue={ attributes.negativeMarginAllXl }
			onChangeBase={ ( value ) =>
				setAttributes( { negativeMarginAllBase: value } )
			}
			onChangeSm={ ( value ) =>
				setAttributes( { negativeMarginAllSm: value } )
			}
			onChangeMd={ ( value ) =>
				setAttributes( { negativeMarginAllMd: value } )
			}
			onChangeLg={ ( value ) =>
				setAttributes( { negativeMarginAllLg: value } )
			}
			onChangeXl={ ( value ) =>
				setAttributes( { negativeMarginAllXl: value } )
			}
		/>
		<NegativeMarginControl
			label="Horizontal"
			subLabel="Negative Margin"
			icon={ sidesHorizontal }
			sideType="horizontal"
			baseValue={ attributes.negativeMarginHorizontalBase }
			smValue={ attributes.negativeMarginHorizontalSm }
			mdValue={ attributes.negativeMarginHorizontalMd }
			lgValue={ attributes.negativeMarginHorizontalLg }
			xlValue={ attributes.negativeMarginHorizontalXl }
			onChangeBase={ ( value ) =>
				setAttributes( { negativeMarginHorizontalBase: value } )
			}
			onChangeSm={ ( value ) =>
				setAttributes( { negativeMarginHorizontalSm: value } )
			}
			onChangeMd={ ( value ) =>
				setAttributes( { negativeMarginHorizontalMd: value } )
			}
			onChangeLg={ ( value ) =>
				setAttributes( { negativeMarginHorizontalLg: value } )
			}
			onChangeXl={ ( value ) =>
				setAttributes( { negativeMarginHorizontalXl: value } )
			}
		/>
		<NegativeMarginControl
			label="Vertical"
			subLabel="Negative Margin"
			icon={ sidesVertical }
			sideType="vertical"
			baseValue={ attributes.negativeMarginVerticalBase }
			smValue={ attributes.negativeMarginVerticalSm }
			mdValue={ attributes.negativeMarginVerticalMd }
			lgValue={ attributes.negativeMarginVerticalLg }
			xlValue={ attributes.negativeMarginVerticalXl }
			onChangeBase={ ( value ) =>
				setAttributes( { negativeMarginVerticalBase: value } )
			}
			onChangeSm={ ( value ) =>
				setAttributes( { negativeMarginVerticalSm: value } )
			}
			onChangeMd={ ( value ) =>
				setAttributes( { negativeMarginVerticalMd: value } )
			}
			onChangeLg={ ( value ) =>
				setAttributes( { negativeMarginVerticalLg: value } )
			}
			onChangeXl={ ( value ) =>
				setAttributes( { negativeMarginVerticalXl: value } )
			}
		/>
		<NegativeMarginControl
			label="Top"
			subLabel="Negative Margin"
			icon={ sidesTop }
			sideType="top"
			baseValue={ attributes.negativeMarginTopBase }
			smValue={ attributes.negativeMarginTopSm }
			mdValue={ attributes.negativeMarginTopMd }
			lgValue={ attributes.negativeMarginTopLg }
			xlValue={ attributes.negativeMarginTopXl }
			onChangeBase={ ( value ) =>
				setAttributes( { negativeMarginTopBase: value } )
			}
			onChangeSm={ ( value ) =>
				setAttributes( { negativeMarginTopSm: value } )
			}
			onChangeMd={ ( value ) =>
				setAttributes( { negativeMarginTopMd: value } )
			}
			onChangeLg={ ( value ) =>
				setAttributes( { negativeMarginTopLg: value } )
			}
			onChangeXl={ ( value ) =>
				setAttributes( { negativeMarginTopXl: value } )
			}
		/>
		<NegativeMarginControl
			label="Right"
			subLabel="Negative Margin"
			icon={ sidesRight }
			sideType="right"
			baseValue={ attributes.negativeMarginRightBase }
			smValue={ attributes.negativeMarginRightSm }
			mdValue={ attributes.negativeMarginRightMd }
			lgValue={ attributes.negativeMarginRightLg }
			xlValue={ attributes.negativeMarginRightXl }
			onChangeBase={ ( value ) =>
				setAttributes( { negativeMarginRightBase: value } )
			}
			onChangeSm={ ( value ) =>
				setAttributes( { negativeMarginRightSm: value } )
			}
			onChangeMd={ ( value ) =>
				setAttributes( { negativeMarginRightMd: value } )
			}
			onChangeLg={ ( value ) =>
				setAttributes( { negativeMarginRightLg: value } )
			}
			onChangeXl={ ( value ) =>
				setAttributes( { negativeMarginRightXl: value } )
			}
		/>
		<NegativeMarginControl
			label="Bottom"
			subLabel="Negative Margin"
			icon={ sidesBottom }
			sideType="bottom"
			baseValue={ attributes.negativeMarginBottomBase }
			smValue={ attributes.negativeMarginBottomSm }
			mdValue={ attributes.negativeMarginBottomMd }
			lgValue={ attributes.negativeMarginBottomLg }
			xlValue={ attributes.negativeMarginBottomXl }
			onChangeBase={ ( value ) =>
				setAttributes( { negativeMarginBottomBase: value } )
			}
			onChangeSm={ ( value ) =>
				setAttributes( { negativeMarginBottomSm: value } )
			}
			onChangeMd={ ( value ) =>
				setAttributes( { negativeMarginBottomMd: value } )
			}
			onChangeLg={ ( value ) =>
				setAttributes( { negativeMarginBottomLg: value } )
			}
			onChangeXl={ ( value ) =>
				setAttributes( { negativeMarginBottomXl: value } )
			}
		/>
		<NegativeMarginControl
			label="Left"
			subLabel="Negative Margin"
			icon={ sidesLeft }
			sideType="left"
			baseValue={ attributes.negativeMarginLeftBase }
			smValue={ attributes.negativeMarginLeftSm }
			mdValue={ attributes.negativeMarginLeftMd }
			lgValue={ attributes.negativeMarginLeftLg }
			xlValue={ attributes.negativeMarginLeftXl }
			onChangeBase={ ( value ) =>
				setAttributes( { negativeMarginLeftBase: value } )
			}
			onChangeSm={ ( value ) =>
				setAttributes( { negativeMarginLeftSm: value } )
			}
			onChangeMd={ ( value ) =>
				setAttributes( { negativeMarginLeftMd: value } )
			}
			onChangeLg={ ( value ) =>
				setAttributes( { negativeMarginLeftLg: value } )
			}
			onChangeXl={ ( value ) =>
				setAttributes( { negativeMarginLeftXl: value } )
			}
		/>
	</PanelBody>
);

export default NegativeMarginControls;
