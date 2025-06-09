import { TextControl } from '@wordpress/components';
import { createElement, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

// WordPress exposes the LinkControl component on the global wp.blockEditor
const { LinkControl } = window.wp?.blockEditor || {};

/**
 * Replace the global LinkControl with a wrapper that adds an
 * "ARIA label text" field in the advanced section.
 */
if ( LinkControl ) {
       const OriginalLinkControl = LinkControl;

       window.wp.blockEditor.LinkControl = function AriaLinkControl( props ) {
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

               return createElement( OriginalLinkControl, {
                       ...props,
                       renderControlBottom,
               } );
       };
}
