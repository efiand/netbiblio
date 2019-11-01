'use strict';
// Список сносок

const { filters } = require(`../store`);

filters.notesList = (str) => {
  str = str.trim();
  if (str) {
    return `<dl class="art__notes-list">${str.trim().split(`\n`).map((item, i) => {

      // "Человеческий" индекс
      i++;

      let prepend = `<dt class="art__note-name"><a class="art__note-link" href="#note-${i}-place">${i}</a>`;
      prepend += `<span class="art__note-place" id="note-${i}">`;
      const append = `</span></dt><dd class="art__note-comment">`;

      return `<div class="art__note">${item.trim().replace(/\[(.*?)\] /, `${prepend}$1${append}`)}</dd></div>`;
    }).join(``)}</dl>`;
  }
  return ``;
};
