'use strict';
// Оборачивание текста, отформатированного под прозу

const { filters, functions } = require(`../store`);

filters.prose = (str, mode = ``) => {
  // Оборачивание в одиночный параграф прозы
  let text = str;
  let tag = `p`;
  let cssClass = `art__prose`;

  // Кастомное преобразование markdown для режимов *-marked
  if (functions.isEndedBy(mode, `marked`)) {
    text = text.replace(/`(.*?)`/g, `<code class="code code--example"><!-- htmlmin:ignore -->$1<!-- htmlmin:ignore --></code>`);
  }

  // Оборачивание нескольких параграфов
  if (!functions.isBeginnedBy(mode, `short`)) {
    text = functions.formatProse(text);
    tag = `div`;

    if (functions.isBeginnedBy(mode, `quote`)) {
      // Оборачивание в блок цитаты, с форматированием блока автора
      text = functions.citeHandler(text).replace(/<p><\/p>/g, ``);
      tag = `blockquote`;

    } else if (functions.isBeginnedBy(mode, `list`)) {
      // Оборачивание в неупорядоченный список
      tag = `ul`;
      cssClass = `art__prose art__prose--list`;
      text = text.replace(/<(\/?)p>/g, (matches, pattern) => {
        return `<${pattern}li${pattern ? `` : ` class="art__list-item"`}>`;
      });
    }
  }

  return `<${tag} class="${cssClass}">${text}</${tag}>`;
};
