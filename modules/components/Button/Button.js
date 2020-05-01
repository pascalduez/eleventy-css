const clsx = require('clsx');

const styles = require('../../modules.json').Button;

module.exports = function (content) {
  return `<button class="${clsx(
    styles.root,
    styles.intentDefault
  )}">${content}</button>`;
};
