import {
	useBlockProps,
	InspectorControls,
	InnerBlocks,
	store as blockEditorStore,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect, useMemo, useRef } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

import BlockEdit from '../../components/BlockEdit';
import { generateClassName } from '../../utils/helpers';
import { useEnsureUniqueAttributeId } from '../../utils/block-id';
import { useSyncGeneratedClasses } from '../../utils/use-sync-generated-classes';
import { BLOCK_CONFIG } from '../../config/blockConfig';

const TEMPLATE = [ [ 'fs-blocks/tab-item-interactive' ] ];
const ALLOWED_BLOCKS = [ 'fs-blocks/tab-item-interactive' ];

export default function Edit( props ) {
	const { clientId, attributes, setAttributes, name } = props;
	const { responsiveTabs, verticalTabs, additionalClasses, activeTab } =
		attributes;
	const { selectBlock } = useDispatch( blockEditorStore );
	const editorActiveTab = activeTab || '';

	const { childBlocks } = useSelect(
		( select ) => ( {
			childBlocks: select( blockEditorStore ).getBlocks( clientId ),
		} ),
		[ clientId ]
	);

	const tabs = useMemo(
		() =>
			childBlocks.map( ( block ) => ( {
				clientId: block.clientId,
				tabId: block.attributes.tabId || block.clientId,
				title:
					block.attributes.title ||
					__( 'New Tab', 'fancy-squares-core-enhancements' ),
			} ) ),
		[ childBlocks ]
	);

	useEnsureUniqueAttributeId( {
		clientId,
		blockName: 'fs-blocks/tabs-interactive',
		attributeKey: 'blockId',
		setAttributes,
	} );

	useEffect( () => {
		if ( tabs.length === 0 ) {
			if ( editorActiveTab ) {
				setAttributes( { activeTab: '' } );
			}
			return;
		}

		const tabIds = tabs.map( ( tab ) => tab.tabId );
		if ( ! editorActiveTab || ! tabIds.includes( editorActiveTab ) ) {
			setAttributes( { activeTab: tabs[ 0 ].tabId } );
		}
	}, [ editorActiveTab, setAttributes, tabs ] );

	const previousCountRef = useRef( tabs.length );
	useEffect( () => {
		if ( tabs.length > previousCountRef.current ) {
			const newTab = tabs[ tabs.length - 1 ];
			setAttributes( { activeTab: newTab.tabId } );
			selectBlock( newTab.clientId );
		}
		previousCountRef.current = tabs.length;
	}, [ selectBlock, setAttributes, tabs ] );

	const handleTabClick = ( tab ) => {
		setAttributes( { activeTab: tab.tabId } );
		selectBlock( tab.clientId );
	};

	// Sync generated classes to additionalClasses for frontend rendering
	const generatedClassName = useMemo(
		() => generateClassName( attributes, name, BLOCK_CONFIG ),
		[ attributes, name ]
	);
	useSyncGeneratedClasses( {
		additionalClasses,
		generatedClassName,
		setAttributes,
	} );

	const blockProps = useBlockProps( {
		className: [
			'fs-tabs',
			'wp-block-fs-blocks-tabs-interactive',
			responsiveTabs ? 'fs-tabs--responsive' : '',
			verticalTabs ? 'fs-tabs--vertical' : '',
			generatedClassName,
		]
			.filter( Boolean )
			.join( ' ' ),
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'fs-tabs__panels' },
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
			renderAppender: false,
		}
	);

	return (
		<>
			<BlockEdit { ...props } />
			<InspectorControls>
				<PanelBody
					title={ __(
						'Tabs Settings',
						'fancy-squares-core-enhancements'
					) }
					initialOpen={ true }
				>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __(
							'Responsive tabs',
							'fancy-squares-core-enhancements'
						) }
						help={ __(
							'Use an accordion on mobile.',
							'fancy-squares-core-enhancements'
						) }
						checked={ responsiveTabs }
						onChange={ ( value ) =>
							setAttributes( { responsiveTabs: value } )
						}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __(
							'Vertical tabs',
							'fancy-squares-core-enhancements'
						) }
						help={ __(
							'Display tabs vertically on the left.',
							'fancy-squares-core-enhancements'
						) }
						checked={ verticalTabs }
						onChange={ ( value ) =>
							setAttributes( { verticalTabs: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<div className="wp-block-fs-blocks-tabs-editor">
					<div className="fs-tabs__tablist" role="tablist">
						{ tabs.map( ( tab ) => (
							<button
								key={ tab.clientId }
								type="button"
								className={ `fs-tabs__tab ${
									editorActiveTab === tab.tabId
										? 'is-active'
										: ''
								}` }
								onClick={ () => handleTabClick( tab ) }
								role="tab"
								aria-selected={
									editorActiveTab === tab.tabId
										? 'true'
										: 'false'
								}
							>
								{ tab.title }
							</button>
						) ) }
						<div className="fs-tabs__tab-appender">
							<InnerBlocks.ButtonBlockAppender />
						</div>
					</div>
					<div { ...innerBlocksProps } />
				</div>
			</div>
		</>
	);
}
