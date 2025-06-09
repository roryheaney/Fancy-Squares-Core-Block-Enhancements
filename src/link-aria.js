import { addFilter } from '@wordpress/hooks';
import { cloneElement } from '@wordpress/element';

// Recursively collect text content from children
function getTextContent( children ) {
	if ( typeof children === 'string' ) {
		return children;
	}
	if ( Array.isArray( children ) ) {
		return children.map( getTextContent ).join( '' );
	}
	if ( children && children.props ) {
		return getTextContent( children.props.children );
	}
	return '';
}

addFilter(
	'blocks.getSaveElement',
	'fancy-squares-core-enhancements/link-aria-new-window',
	( element ) => {
		if ( ! element || element.type !== 'a' ) {
			return element;
		}

		const { target, ...props } = element.props;
		if ( target !== '_blank' ) {
			return element;
		}

		const override = props[ 'data-aria-label-text' ];
		const text = getTextContent( element.props.children );
		const baseText = override || text;
		const ariaLabel = `${ baseText } opens in a new window`;

		return cloneElement( element, {
			...props,
			target,
			'aria-label': ariaLabel,
		} );
	}
);
