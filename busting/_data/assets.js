const env = require('./env');
const manifest = require('./manifest.json');

module.exports = {
  styles: `/styles/${env === 'production' ? manifest['main.css'] : 'main.css'}`,
};
