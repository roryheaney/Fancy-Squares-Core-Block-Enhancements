const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

// Handle both single config and array of configs from @wordpress/scripts
// If array, add utilities entry to each config; otherwise add to single config
if ( Array.isArray( defaultConfig ) ) {
	module.exports = defaultConfig.map( ( config ) => ( {
		...config,
		entry: {
			...config.entry,
			utilities: path.resolve( process.cwd(), 'src', 'utilities.scss' ),
		},
	} ) );
} else {
	module.exports = {
		...defaultConfig,
		entry: {
			...defaultConfig.entry,
			utilities: path.resolve( process.cwd(), 'src', 'utilities.scss' ),
		},
	};
}
