import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';

const root = process.cwd();

const SOURCE_PATHS = [
	path.resolve( root, 'fancy-squares-core-enhancements.php' ),
	path.resolve( root, 'inc' ),
	path.resolve( root, 'src' ),
];

const collectPhpFiles = ( targetPath, bucket ) => {
	if ( ! fs.existsSync( targetPath ) ) {
		return;
	}

	const stat = fs.statSync( targetPath );
	if ( stat.isFile() ) {
		if ( targetPath.endsWith( '.php' ) ) {
			bucket.push( targetPath );
		}
		return;
	}

	for ( const entry of fs.readdirSync( targetPath, { withFileTypes: true } ) ) {
		collectPhpFiles( path.join( targetPath, entry.name ), bucket );
	}
};

const files = [];
for ( const targetPath of SOURCE_PATHS ) {
	collectPhpFiles( targetPath, files );
}

if ( files.length === 0 ) {
	console.log( '[lint:php] No PHP files found.' );
	process.exit( 0 );
}

let hasErrors = false;

for ( const filePath of files ) {
	const result = spawnSync( 'php', [ '-l', filePath ], {
		cwd: root,
		stdio: 'pipe',
		encoding: 'utf8',
	} );

	if ( result.error ) {
		if ( result.error.code === 'ENOENT' ) {
			console.error( '[lint:php] PHP executable not found in PATH.' );
		} else {
			console.error( `[lint:php] Failed for ${ filePath }:` );
			console.error( result.error.message );
		}
		process.exit( 1 );
	}

	const output = `${ result.stdout || '' }${ result.stderr || '' }`.trim();
	if ( result.status !== 0 ) {
		hasErrors = true;
		console.error( output || `[lint:php] Failed: ${ filePath }` );
	} else if ( output ) {
		console.log( output );
	}
}

if ( hasErrors ) {
	process.exit( 1 );
}

console.log( `[lint:php] OK (${ files.length} files checked).` );