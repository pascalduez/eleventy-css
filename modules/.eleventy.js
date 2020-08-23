module.exports = config => {
  config.addWatchTarget('components/**/*.css');

  // const cssModules = require('./components');

  // Object.keys(cssModules).forEach(name => {
  //   config.addPairedShortcode(name, cssModules[name]);
  // });

  config.addPairedShortcode('Button', require('./components/Button/Button'));

  // return {
  //   markdownTemplateEngine: 'njk',
  // };
};
