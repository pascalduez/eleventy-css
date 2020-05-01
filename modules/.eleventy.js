module.exports = config => {
  config.addWatchTarget('components/**/*.css');

  config.addPairedShortcode('Button', require('./components/Button/Button'));
  config.addPairedShortcode('Tag', require('./components/Tag/Tag'));
};
