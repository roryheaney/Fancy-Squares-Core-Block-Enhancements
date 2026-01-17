const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

// Add utilities, index, and frontend entry points while preserving all default @wordpress/scripts behavior
// @wordpress/scripts automatically handles block directories with editorScript in block.json
// when no entry points are listed on command line
const customEntries = {
	index: path.resolve( process.cwd(), 'src', 'index.js' ),
	frontend: path.resolve( process.cwd(), 'src', 'frontend.js' ),
	utilities: path.resolve( process.cwd(), 'src', 'utilities.scss' ),
};

// Handle both single config and array of configs from @wordpress/scripts
// When --experimental-modules is used, defaultConfig is an array: [scriptConfig, moduleConfig]
// Only add custom entries to the script config, not the module config
if ( Array.isArray( defaultConfig ) ) {
	module.exports = defaultConfig.map( ( config, index ) => {
		// First config is for scripts, second is for modules
		// Only add custom entries to scripts config (index 0)
		if ( index !== 0 ) {
			return config;
		}

		// Preserve existing entry (could be object or function)
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
	// Preserve existing entry (could be object or function)
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
