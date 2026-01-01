import {
	useBlockProps,
	RichText,
	InnerBlocks,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const TEXT_DOMAIN = 'fancy-squares-core-enhancements';

export default function Edit( { clientId, attributes, setAttributes } ) {
	const { title, tabId } = attributes;

	useEffect( () => {
		if ( ! tabId ) {
			setAttributes( { tabId: clientId } );
		}
	}, [ clientId, tabId, setAttributes ] );

	const { isActiveTab } = useSelect(
		( select ) => {
			const { getBlock, getBlockRootClientId } =
				select( blockEditorStore );
			const parentClientId = getBlockRootClientId( clientId );
			const parentBlock = getBlock( parentClientId );
			const parentActiveTab = parentBlock?.attributes?.activeTab;
			return {
				isActiveTab: parentActiveTab === ( tabId || clientId ),
			};
		},
		[ clientId, tabId ]
	);

	const blockProps = useBlockProps( {
		className: `fs-tabs__panel ${ isActiveTab ? 'is-active' : '' }`,
		hidden: ! isActiveTab,
	} );

	return (
		<div { ...blockProps }>
			<RichText
				tagName="div"
				className="fs-tabs__title-editor"
				value={ title }
				allowedFormats={ [] }
				onChange={ ( newTitle ) =>
					setAttributes( { title: newTitle } )
				}
				placeholder={ __( 'Tab Title', TEXT_DOMAIN ) }
			/>
			<div className="fs-tabs__panel-content">
				<InnerBlocks />
			</div>
		</div>
	);
}
