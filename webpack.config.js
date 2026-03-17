const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

// Add explicit entry points while preserving default @wordpress/scripts behavior.
const customEntries = {
	index: path.resolve( process.cwd(), 'src', 'index.js' ),
	frontend: path.resolve( process.cwd(), 'src', 'frontend.js' ),
	'frontend-styles': path.resolve(
		process.cwd(),
		'src',
		'frontend-styles.scss'
	),
	utilities: path.resolve( process.cwd(), 'src', 'utilities.scss' ),
};

if ( Array.isArray( defaultConfig ) ) {
	module.exports = defaultConfig.map( ( config, index ) => {
		if ( index !== 0 ) {
			return config;
		}

		const existingEntry = config.entry || {};
		const isEntryFunction = typeof existingEntry === 'function';

		return {
			...config,
			entry: isEntryFunction
				? async () => {
						const entries = await existingEntry();
						return { ...entries, ...customEntries };
				  }
				: { ...existingEntry, ...customEntries },
		};
	} );
} else {
	const existingEntry = defaultConfig.entry || {};
	const isEntryFunction = typeof existingEntry === 'function';

	module.exports = {
		...defaultConfig,
		entry: isEntryFunction
			? async () => {
					const entries = await existingEntry();
					return { ...entries, ...customEntries };
			  }
			: { ...existingEntry, ...customEntries },
	};
}
