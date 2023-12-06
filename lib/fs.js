/**
 * @file
 * Filesystem-related functions.
 */

import * as fs from 'fs';
import * as path from 'path';
import { mkdirp } from 'mkdirp';

/**
 * Helper to write file creating missing parent folder(s) if necessary.
 *
 * See https://stackoverflow.com/a/50927704/2592338
 *
 * @param {String} filePath
 * @param {String|NodeJS.ArrayBufferView} content
 */
export const writeFile = (filePath, content) => {
	const dirname = path.dirname(filePath);
	if (!fs.existsSync(dirname)) {
		mkdirp.sync(dirname);
	}
	fs.writeFileSync(filePath, content);
};

/**
 * Recursively gets file paths from given dir.
 *
 * @param {String} dir
 * @param {String} extension optional: filter by file extension.
 * @returns {Array} List of file paths sorted by name.
 */
export const walk = (dir, extension) => {
	let files = [];
	fs.readdirSync(dir).map(file => {
		if (fs.statSync(path.join(dir, file)).isFile()) {
			if (extension === undefined || path.extname(file) === extension) {
				files.push(path.join(dir, file));
			}
		}
		else {
			files = files.concat(walk(path.join(dir, file), extension));
		}
	});
	return files.sort();
};

/**
 * Rewrites given file by replacing its contents with given transformer result.
 *
 * @param {String} filePath
 * @param {Function} transformer
 */
export const rewriteFile = (filePath, transformer) => fs.writeFileSync(filePath, transformer(fs.readFileSync(filePath)));

/**
 * Use rewriteFile() on all files in given dir, optionnally filtered by extension.
 *
 * @see rewriteFile()
 *
 * @param {String} dir
 * @param {Function} transformer
 * @param {String} extension optional: filter by file extension.
 */
export const rewriteFiles = (dir, transformer, extension) => {
	const files = walk(dir, extension);
	if (files.length) {
		files.forEach(filePath => rewriteFile(filePath, transformer));
	}
};
