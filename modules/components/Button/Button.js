const clsx = require('clsx');

// const { fs, vol } = require('memfs');

// console.log(vol);

// const styles = vol.readFileSync('/modules.json', 'utf8').Button;

const styles = require('../../modules.json');

console.log('/////////////////////');
console.log(styles);
console.log('/////////////////////');

module.exports = content => {
  return `<button>${content}</button>`;
  // return `<button class="${clsx(
  //   styles.root,
  //   styles.intentDefault
  // )}">${content}</button>`;
};
