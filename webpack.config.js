const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

// Get base config (might be an array from wp-scripts)
const baseConfig = Array.isArray( defaultConfig )
	? defaultConfig[ 0 ]
	: defaultConfig;

module.exports = {
	...baseConfig,
	entry: {
		...baseConfig.entry,
		utilities: path.resolve( process.cwd(), 'src', 'utilities.scss' ),
	},
};
