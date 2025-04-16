// config/constants.js
export const PADDING_SIDE_TYPES = [
	{ key: 'paddingAll', prefix: 'p', sides: [ '' ] },
	{
		key: 'paddingHorizontal',
		prefix: [ 'ps', 'pe' ],
		sides: [ 'left', 'right' ],
	},
	{
		key: 'paddingVertical',
		prefix: [ 'pt', 'pb' ],
		sides: [ 'top', 'bottom' ],
	},
	{ key: 'paddingTop', prefix: 'pt', sides: [ 'top' ] },
	{ key: 'paddingRight', prefix: 'pe', sides: [ 'right' ] },
	{ key: 'paddingBottom', prefix: 'pb', sides: [ 'bottom' ] },
	{ key: 'paddingLeft', prefix: 'ps', sides: [ 'left' ] },
];

export const MARGIN_SIDE_TYPES = [
	{ key: 'marginAll', prefix: 'm', sides: [ '' ] },
	{
		key: 'marginHorizontal',
		prefix: [ 'ms', 'me' ],
		sides: [ 'left', 'right' ],
	},
	{
		key: 'marginVertical',
		prefix: [ 'mt', 'mb' ],
		sides: [ 'top', 'bottom' ],
	},
	{ key: 'marginTop', prefix: 'mt', sides: [ 'top' ] },
	{ key: 'marginRight', prefix: 'me', sides: [ 'right' ] },
	{ key: 'marginBottom', prefix: 'mb', sides: [ 'bottom' ] },
	{ key: 'marginLeft', prefix: 'ms', sides: [ 'left' ] },
];

export const NEGATIVE_MARGIN_SIDE_TYPES = [
	{ key: 'negativeMarginAll', prefix: 'm', sides: [ '' ] },
	{
		key: 'negativeMarginHorizontal',
		prefix: [ 'ms', 'me' ],
		sides: [ 'left', 'right' ],
	},
	{
		key: 'negativeMarginVertical',
		prefix: [ 'mt', 'mb' ],
		sides: [ 'top', 'bottom' ],
	},
	{ key: 'negativeMarginTop', prefix: 'mt', sides: [ 'top' ] },
	{ key: 'negativeMarginRight', prefix: 'me', sides: [ 'right' ] },
	{ key: 'negativeMarginBottom', prefix: 'mb', sides: [ 'bottom' ] },
	{ key: 'negativeMarginLeft', prefix: 'ms', sides: [ 'left' ] },
];
