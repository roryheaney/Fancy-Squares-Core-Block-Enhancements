const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

// Add utilities entry point while preserving all default @wordpress/scripts behavior
// The default config already handles view.js files for blocks with viewScriptModule
const utilitiesEntry = {
	utilities: path.resolve( process.cwd(), 'src', 'utilities.scss' ),
};

// Handle both single config and array of configs from @wordpress/scripts
if ( Array.isArray( defaultConfig ) ) {
	module.exports = defaultConfig.map( ( config ) => {
		// Preserve existing entry (could be object or function)
		const existingEntry = config.entry || {};
		const isEntryFunction = typeof existingEntry === 'function';

		return {
			...config,
			entry: isEntryFunction
				? async () => {
						const entries = await existingEntry();
						return { ...entries, ...utilitiesEntry };
				  }
				: { ...existingEntry, ...utilitiesEntry },
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
					return { ...entries, ...utilitiesEntry };
			  }
			: { ...existingEntry, ...utilitiesEntry },
	};
}
