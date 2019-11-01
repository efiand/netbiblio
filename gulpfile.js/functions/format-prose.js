'use strict';
// Форматирование текста в виде прозы

const { functions } = require(`../store`);

functions.formatProse = (str) => {
  let content = `<p>${str.trim().replace(/\n/g, `</p><p>`)}</p>`;

  return content.replace(/<p><div/g, `<div`).replace(/<\/div><\/p>/g, `</div>`);
};
