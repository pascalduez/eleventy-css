const postcss = require('postcss');
const postcssrc = require('postcss-load-config');

module.exports = config => {
  config.addNunjucksAsyncFilter('postcss', async (content, callback) => {
    let { plugins, options } = await postcssrc();
    let result = await postcss(plugins).process(content, options);
    callback(null, result.css);
  });
};
