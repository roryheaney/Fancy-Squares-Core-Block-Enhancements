import {
	useBlockProps,
	RichText,
	InnerBlocks,
	store as blockEditorStore,
	InspectorControls,
	LinkControl,
} from '@wordpress/block-editor';
import {
	Button,
	CheckboxControl,
	PanelBody,
	ToggleControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useEnsureUniqueAttributeId } from '../../utils/block-id';

const REL_TOKENS = [
	'alternate',
	'author',
	'bookmark',
	'external',
	'help',
	'license',
	'me',
	'next',
	'nofollow',
	'noopener',
	'noreferrer',
	'opener',
	'prev',
	'privacy-policy',
	'search',
	'tag',
	'ugc',
	'sponsored',
];

const REL_PRESETS = [
	{
		label: 'nofollow + noreferrer',
		tokens: [ 'nofollow', 'noreferrer' ],
	},
	{
		label: 'nofollow + noreferrer + noopener',
		tokens: [ 'nofollow', 'noreferrer', 'noopener' ],
	},
	{
		label: 'ugc + nofollow + noreferrer',
		tokens: [ 'ugc', 'nofollow', 'noreferrer' ],
	},
	{
		label: 'sponsored + nofollow + noreferrer',
		tokens: [ 'sponsored', 'nofollow', 'noreferrer' ],
	},
];

const ORDERED_REL_TOKENS = REL_TOKENS.slice();

const normalizeRelTokens = ( tokens ) =>
	Array.from(
		new Set(
			( Array.isArray( tokens ) ? tokens : [] )
				.map( ( token ) => String( token ).trim().toLowerCase() )
				.filter( Boolean )
		)
	);

export default function Edit( { clientId, attributes, setAttributes } ) {
	const { title, itemId, url, opensInNewTab, rel, hasDropdown } = attributes;
	const relTokens = useMemo(
		() => normalizeRelTokens( String( rel || '' ).split( /\s+/ ) ),
		[ rel ]
	);
	const setRelTokens = ( nextTokens ) => {
		const allowed = normalizeRelTokens( nextTokens ).filter( ( token ) =>
			REL_TOKENS.includes( token )
		);
		const ordered = ORDERED_REL_TOKENS.filter( ( token ) =>
			allowed.includes( token )
		);
		setAttributes( { rel: ordered.join( ' ' ) } );
	};
	const applyRelPreset = ( presetTokens ) => {
		setRelTokens( [ ...relTokens, ...presetTokens ] );
	};
	const clearRelTokens = () => setRelTokens( [] );
	const toggleRelToken = ( token, checked ) => {
		if ( checked ) {
			setRelTokens( [ ...relTokens, token ] );
			return;
		}
		setRelTokens( relTokens.filter( ( item ) => item !== token ) );
	};

	useEnsureUniqueAttributeId( {
		clientId,
		blockName: 'fs-blocks/advanced-dropdown-item',
		attributeKey: 'itemId',
		setAttributes,
	} );

	const { isActiveItem } = useSelect(
		( select ) => {
			const { getBlock, getBlockRootClientId } =
				select( blockEditorStore );
			const parentClientId = getBlockRootClientId( clientId );
			const parentBlock = getBlock( parentClientId );
			const parentActiveItem = parentBlock?.attributes?.activeItem;

			return {
				isActiveItem: parentActiveItem === ( itemId || clientId ),
			};
		},
		[ clientId, itemId ]
	);

	const blockProps = useBlockProps( {
		className: `fs-advanced-dropdown__panel ${
			isActiveItem ? 'is-active' : ''
		}`,
		hidden: ! isActiveItem,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					className="fs-advanced-dropdown-item-settings"
					title={ __(
						'Item Settings',
						'fancy-squares-core-enhancements'
					) }
					initialOpen={ true }
				>
					<LinkControl
						searchInputPlaceholder={ __(
							'Search pages or paste URL',
							'fancy-squares-core-enhancements'
						) }
						value={ {
							url,
							opensInNewTab,
						} }
						settings={ [
							{
								id: 'opensInNewTab',
								title: __(
									'Open in new tab',
									'fancy-squares-core-enhancements'
								),
							},
						] }
						forceIsEditingLink={ true }
						onChange={ ( nextValue = {} ) =>
							setAttributes( {
								url:
									typeof nextValue.url === 'string'
										? nextValue.url
										: '',
								opensInNewTab:
									typeof nextValue.opensInNewTab === 'boolean'
										? nextValue.opensInNewTab
										: opensInNewTab,
							} )
						}
					/>
					<div className="fs-advanced-dropdown__rel-control">
						<p className="fs-advanced-dropdown__rel-label">
							{ __(
								'Link rel',
								'fancy-squares-core-enhancements'
							) }
						</p>
						<p className="fs-advanced-dropdown__rel-help">
							{ __(
								'Select one or more rel tokens. Leave all unchecked for no rel attribute.',
								'fancy-squares-core-enhancements'
							) }
						</p>
						<div className="fs-advanced-dropdown__rel-actions">
							<p className="fs-advanced-dropdown__rel-label fs-advanced-dropdown__rel-label--small">
								{ __(
									'Quick add presets',
									'fancy-squares-core-enhancements'
								) }
							</p>
							<div className="fs-advanced-dropdown__rel-buttons">
								{ REL_PRESETS.map( ( preset ) => (
									<Button
										key={ preset.label }
										variant="secondary"
										size="small"
										onClick={ () =>
											applyRelPreset( preset.tokens )
										}
									>
										{ preset.label }
									</Button>
								) ) }
								<Button
									variant="tertiary"
									size="small"
									disabled={ relTokens.length === 0 }
									onClick={ clearRelTokens }
								>
									{ __(
										'Clear',
										'fancy-squares-core-enhancements'
									) }
								</Button>
							</div>
						</div>
						<div className="fs-advanced-dropdown__rel-checkboxes-scroll">
							<div className="fs-advanced-dropdown__rel-checkboxes">
								{ REL_TOKENS.map( ( token ) => (
									<CheckboxControl
										__nextHasNoMarginBottom
										key={ token }
										label={ token }
										checked={ relTokens.includes( token ) }
										onChange={ ( checked ) =>
											toggleRelToken( token, checked )
										}
									/>
								) ) }
							</div>
						</div>
					</div>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __(
							'Has dropdown content',
							'fancy-squares-core-enhancements'
						) }
						checked={ hasDropdown !== false }
						onChange={ ( value ) =>
							setAttributes( { hasDropdown: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<RichText
					tagName="div"
					className="fs-advanced-dropdown__title-editor"
					value={ title }
					allowedFormats={ [] }
					onChange={ ( newTitle ) =>
						setAttributes( { title: newTitle } )
					}
					placeholder={ __(
						'Item Label',
						'fancy-squares-core-enhancements'
					) }
				/>
				{ hasDropdown === false && (
					<p className="fs-advanced-dropdown__link-note">
						{ __(
							'Link-only item. Enable dropdown content to edit nested blocks.',
							'fancy-squares-core-enhancements'
						) }
					</p>
				) }
				{ hasDropdown !== false && (
					<div className="fs-advanced-dropdown__panel-content">
						<InnerBlocks />
					</div>
				) }
			</div>
		</>
	);
}
