const path = require('path');
const { writeFile } = require('fs').promises;
const slug = require('unique-slug');
const glob = require('@modular-css/glob');
const shortnames = require('@modular-css/shortnames')();
const cssnano = require('cssnano')();

const env = process.env.NODE_ENV;

function suitcss(file, selector) {
  let name = path.basename(file, '.css');
  let hash = slug(path.relative(process.cwd(), file));

  return `${name}-${selector}__${hash}`;
}

let namer = env === 'production' ? shortnames : suitcss;
let done = env === 'production' ? cssnano : null;

exports.data = () => ({
  permalink: 'styles/modules.css',
  eleventyExcludeFromCollections: true,
});

exports.render = async () => {
  let processor = await glob({
    search: ['**/*.css'],
    cwd: 'components',
    map: false,
    namer,
    done,
  });

  let result = await processor.output();

  let compositions = Object.keys(result.compositions).reduce((acc, curr) => {
    let { name } = path.parse(curr);
    acc[name] = result.compositions[curr];
    return acc;
  }, {});

  await writeFile(
    'modules.json',
    JSON.stringify(compositions, null, 2),
    'utf-8'
  );

  return result.css;
};
