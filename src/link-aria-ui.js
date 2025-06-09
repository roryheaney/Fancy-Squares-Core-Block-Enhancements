import { addFilter } from '@wordpress/hooks';
import { TextControl } from '@wordpress/components';
import { createElement, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Inject an "ARIA label text" field into LinkControl via filter.
 */
addFilter(
	'editor.LinkControl',
	'fancy-squares-core-enhancements/link-aria-ui',
	( OriginalComponent ) => {
		return function AriaLinkControl( props ) {
			const [ ariaText, setAriaText ] = useState(
				props?.value?.attributes?.[ 'data-aria-label-text' ] || ''
			);

			const onAriaChange = ( newText ) => {
				setAriaText( newText );
				const value = {
					...props.value,
					attributes: {
						...( props.value?.attributes || {} ),
						'data-aria-label-text': newText || undefined,
					},
				};
				props.onChange( value );
			};

			const renderControlBottom = () =>
				createElement( TextControl, {
					label: __( 'ARIA label text', 'fs-blocks' ),
					value: ariaText,
					onChange: onAriaChange,
				} );

			return createElement( OriginalComponent, {
				...props,
				renderControlBottom,
			} );
		};
	}
);
