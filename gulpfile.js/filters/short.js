'use strict';
// Оборачивание текстового фрагмента в короткий блок

const { filters } = require(`../store`);

filters.short = (str) => {
  return `<p class="art__short">${str}</p>`;
};
