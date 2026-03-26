import {
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	Notice,
	PanelBody,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { flattenBlockTree, sanitizeDomIdToken } from '../utils/block-id';

const getTopLevelRootClientId = ( getBlockParents, clientId ) => {
	const parents = getBlockParents( clientId ) || [];
	return parents.length > 0 ? parents[ parents.length - 1 ] : clientId;
};

const getSubtreeClientIds = ( getBlock, rootClientId ) => {
	const rootBlock = getBlock( rootClientId );
	if ( ! rootBlock ) {
		return [];
	}

	const ids = [];
	const walk = ( block ) => {
		ids.push( block.clientId );
		if ( Array.isArray( block?.innerBlocks ) && block.innerBlocks.length ) {
			block.innerBlocks.forEach( walk );
		}
	};

	walk( rootBlock );
	return ids;
};

export default function ModalButtonControl( { BlockEdit, ...props } ) {
	const { attributes, setAttributes, isSelected, clientId } = props;
	const { triggerModal, modalId } = attributes;
	const { nextModalId, isAmbiguous } = useSelect(
		( select ) => {
			if ( ! triggerModal || ! clientId ) {
				return { nextModalId: '', isAmbiguous: false };
			}

			const currentModalId = sanitizeDomIdToken( modalId );
			if ( ! currentModalId ) {
				return { nextModalId: '', isAmbiguous: false };
			}

			const { getBlocks, getBlock, getBlockParents } =
				select( blockEditorStore );

			const topLevelRootClientId = getTopLevelRootClientId(
				getBlockParents,
				clientId
			);
			const localClientIdSet = new Set(
				getSubtreeClientIds( getBlock, topLevelRootClientId )
			);

			const allBlocks = flattenBlockTree( getBlocks() );
			const modalBlocks = allBlocks.filter(
				( block ) => block.name === 'fs-blocks/modal'
			);

			const localModalIds = [];
			let localModalCount = 0;
			const outsideModalIds = [];
			modalBlocks.forEach( ( block ) => {
				const candidateId = sanitizeDomIdToken(
					block?.attributes?.modalId
				);
				if ( ! candidateId ) {
					return;
				}

				if ( localClientIdSet.has( block.clientId ) ) {
					localModalCount += 1;
					localModalIds.push( candidateId );
					return;
				}

				outsideModalIds.push( candidateId );
			} );

			const uniqueLocalModalIds = [ ...new Set( localModalIds ) ];
			const hasLocalTarget =
				uniqueLocalModalIds.includes( currentModalId );
			const hasOutsideTarget = outsideModalIds.includes( currentModalId );

			if (
				! hasLocalTarget &&
				hasOutsideTarget &&
				localModalCount === 1 &&
				uniqueLocalModalIds.length === 1
			) {
				return {
					nextModalId: uniqueLocalModalIds[ 0 ],
					isAmbiguous: false,
				};
			}

			if (
				! hasLocalTarget &&
				hasOutsideTarget &&
				uniqueLocalModalIds.length > 1
			) {
				return { nextModalId: '', isAmbiguous: true };
			}

			return { nextModalId: '', isAmbiguous: false };
		},
		[ clientId, modalId, triggerModal ]
	);

	useEffect( () => {
		if ( ! triggerModal || ! nextModalId || nextModalId === modalId ) {
			return;
		}

		setAttributes( { modalId: nextModalId } );
	}, [ modalId, nextModalId, setAttributes, triggerModal ] );

	if ( ! isSelected ) {
		return <BlockEdit { ...props } />;
	}

	return (
		<>
			<BlockEdit { ...props } />
			<InspectorControls>
				<PanelBody
					title={
						<span className="fs-panel-title">
							Modal Settings
							{ ( triggerModal ||
								( modalId && modalId.trim() !== '' ) ) && (
								<span
									className="fs-panel-indicator"
									aria-hidden="true"
								/>
							) }
						</span>
					}
				>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __(
							'Trigger a modal',
							'fancy-squares-core-enhancements'
						) }
						checked={ !! triggerModal }
						onChange={ () =>
							setAttributes( { triggerModal: ! triggerModal } )
						}
					/>
					{ triggerModal && (
						<>
							<TextControl
								__nextHasNoMarginBottom
								__next40pxDefaultSize
								label={ __(
									'Modal ID',
									'fancy-squares-core-enhancements'
								) }
								value={ modalId }
								onChange={ ( value ) =>
									setAttributes( { modalId: value } )
								}
								help={ __(
									'Enter the modal element ID.',
									'fancy-squares-core-enhancements'
								) }
							/>
							{ isAmbiguous && (
								<Notice
									status="warning"
									isDismissible={ false }
								>
									{ __(
										'Multiple modal blocks were found in this duplicated section. Please manually relink this trigger to the correct modal ID.',
										'fancy-squares-core-enhancements'
									) }
								</Notice>
							) }
						</>
					) }
				</PanelBody>
			</InspectorControls>
		</>
	);
}
