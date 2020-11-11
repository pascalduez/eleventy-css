const path = require('path');

let production = {
  cssnano: {},
  'postcss-hash': {
    trim: 20,
    manifest: path.join(__dirname, '_data', 'manifest.json'),
  },
};

module.exports = ({ env }) => ({
  plugins: {
    'postcss-preset-env': {},
    ...(env === 'production' && production),
  },
});
