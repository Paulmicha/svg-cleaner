import { rewriteFiles } from './lib/fs.js';
import { svgRemoveDefsAndGroups } from './lib/svg.js';

// Support passing any number of dirs as unnamed CLI args.
process.argv.forEach(arg => {
	if (arg.endsWith("node") || arg.endsWith(".js")) {
		return;
	}

	console.log(`Rewriting SVG files in '${arg}' ...`)

	rewriteFiles(arg, svgRemoveDefsAndGroups, '.svg');

	console.log(`Rewriting SVG files in '${arg}' : done.`)
});
