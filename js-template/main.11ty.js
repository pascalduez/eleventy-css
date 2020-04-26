const { readFile } = require('fs').promises;
const postcssrc = require('postcss-load-config');
const postcss = require('postcss');

module.exports = class {
  data() {
    return {
      permalink: 'styles/main.css',
      eleventyExcludeFromCollections: true,
    };
  }

  async render() {
    let { plugins, options } = await postcssrc();
    let content = await readFile('styles/index.css');
    let result = await postcss(plugins).process(content, options);

    return result.css;
  }
};
