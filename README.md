# SVG cleaner

Node JS script to modify all SVG files in given folder at once :

- Removes \<defs>
- Unwraps \<g> tags
- Removes some attributes containing default values - for now : "fill-opacity": "1" and "fill-rule": "nonzero"

Usage :

```sh
git clone --depth 1 -b main https://github.com/Paulmicha/svg-cleaner.git
cd svg-cleaner
npm i
node index.js '/path/to/the-folder/containing/the-svg-files'
```
