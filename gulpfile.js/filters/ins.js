'use strict';
// Оборачивание в блок врезки (или добавление класса в существующую обёртку)

const { filters, functions } = require(`../store`);

filters.ins = (str) => {
  if (!/class="/.test(str)) {
    return `<div class="art__ins">${functions.formatProse(str)}</div>`;
  }

  return str.replace(/class="(.*?)"/, (all, group) => `class="${group} art__ins"`);
};
