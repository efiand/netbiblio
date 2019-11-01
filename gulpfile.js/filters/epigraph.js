'use strict';
// Добавление класса эпиграфа к блоку

const { filters } = require(`../store`);

filters.epigraph = (str) => {
  return str.replace(/class="(.*?)"/, `class="$1 art__epigraph"`);
};
