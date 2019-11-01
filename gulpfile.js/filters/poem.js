'use strict';
// Форматирование текста под стихи

const { filters, functions } = require(`../store`);

filters.poem = (str, mode = ``) => {
  let text = functions.formatPoem(str);
  let tag = `div`;

  if (mode === `raw`) {
    // Форматирование как есть
    return text;
  } else if (mode === `quote`) {

    // Оборачивание в блок цитаты, с форматированием блока автора
    text = functions.citeHandler(text);
    tag = `blockquote`;
  }

  // Оборачивание текста
  return `<${tag} class="art__poem">${text}</${tag}>`;
};
