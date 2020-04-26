module.exports = ({ env }) => ({
  plugins: {
    'postcss-preset-env': {},
    ...(env === 'production' && { cssnano: {} }),
  },
});
