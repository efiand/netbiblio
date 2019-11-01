'use strict';
// Превращение параграфа в блок автора цитаты

const { functions } = require(`../store`);

functions.citeHandler = (str) => {
  return str.replace(/<p>\s*\[(.*?)\]<\/p>/, `<cite class="art__cite-author">$1</cite>`);
};
