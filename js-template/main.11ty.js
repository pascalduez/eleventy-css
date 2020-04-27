const { readFile } = require('fs').promises;
const postcssrc = require('postcss-load-config');
const postcss = require('postcss');

exports.data = () => ({
  permalink: 'styles/main.css',
  eleventyExcludeFromCollections: true,
});

exports.render = async () => {
  let { plugins, options } = await postcssrc();
  let content = await readFile('styles/index.css');
  let result = await postcss(plugins).process(content, options);

  return result.css;
};
