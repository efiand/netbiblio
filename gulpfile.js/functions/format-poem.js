'use strict';
// Форматирование текста в виде стихов

const { functions } = require(`../store`);

functions.formatPoem = (str) => {
  return `<p>${str.trim().replace(/\n{2,}/g, `</p><p>`).replace(/\n/g, `<br>`)}</p>`;
};
