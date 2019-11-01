'use strict';
// Манипуляции с URL-значением параметра HTML-атрибутор

const { filters, functions } = require(`../store`);

filters.manageUrl = (code, page, protocol = `https://`) => {
  // Если указан протокол для замены, меняем относительный протокол на указанный
  if (protocol) {
    code = code.replace(/(action|content|href|src(set)*)="\/\//g, `$1="${protocol}`);
  }

  // Если передан путь к текущей странице, можно определить относительный путь до корня
  if (page) {
    code = code.replace(/(action|content|href|src(set)*)="\/(?!\/)/g, `$1="${functions.getRoot(page)}`);
  }

  return code;
};
