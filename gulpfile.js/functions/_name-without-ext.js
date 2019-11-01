'use strict';
// Возвращает имя файла без расширения

const { functions, filters } = require(`../store`);

functions.nameWithoutExt = (string) => {
  return string.slice(0, string.lastIndexOf(`.`));
};

filters.withoutExt = functions.nameWithoutExt;
