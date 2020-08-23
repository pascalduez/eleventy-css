const clsx = require('clsx');

// const { fs, vol } = require('memfs');

// const styles = vol.readFileSync('/modules.json', 'utf8').Tag;

module.exports = function (content) {
  return `<span>${content}</span>`;
  // return `<span class="${clsx(
  //   styles.root,
  //   styles.intentDefault
  // )}">${content}</span>`;
};
