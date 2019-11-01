'use strict';
// Вывод фрагмента кода как есть внутри контейнера с преформатированием

const { filters } = require(`../store`);

filters.code = (str) => {
  return `<code class="code code--block"><!-- htmlmin:ignore -->${str.trim()}<!-- htmlmin:ignore --></code>`;
};
