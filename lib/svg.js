/**
 * @file
 * SVG-related functions.
 */

import { JSDOM } from 'jsdom';

/**
 * Remove all <defs> and <g> from given SVG code + clean some default attr val.
 *
 * @param {String} svgCode input.
 * @return {String} the transformed output.
 */
export const svgRemoveDefsAndGroups = svgCode => {
	let i = 0;
	const dom = new JSDOM(svgCode);

	// Remove all <defs> contents.
	let defs = dom.window.document.getElementsByTagName("defs");
	for(i = 0; i < defs.length; i++) {
		defs[i].remove();
	}

	// Unwrap all <g> tags (remove them while keeping their children).
	let g = dom.window.document.getElementsByTagName("g");
	while (g && g.length > 0) {
		for (i = 0; i < g.length; i++) {
			g[i].replaceWith(...g[i].childNodes);
		}
		g = dom.window.document.getElementsByTagName("g");
	}

	// Cleanup unneccessary default values in inline attributes.
	const defaultAttrValCleanup = {
		"fill-opacity": "1",
		"fill-rule": "nonzero"
	};
	dom.window.document.querySelectorAll("svg *").forEach(node => {
		for (let attr in defaultAttrValCleanup) {
			if (node.hasAttribute(attr) && node.getAttribute(attr) == defaultAttrValCleanup[attr]) {
				node.removeAttribute(attr);
			}
		}
	});

	return dom.window.document.querySelector("svg").outerHTML;
};
