const clsx = require('clsx');

const styles = require('../../modules.json').Tag;

module.exports = function (content) {
  return `<span class="${clsx(
    styles.root,
    styles.intentDefault
  )}">${content}</span>`;
};
