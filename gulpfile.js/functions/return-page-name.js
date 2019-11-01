'use strict';
// Возвращает имя файла без расширения относительно /pages

const { functions } = require(`../store`);

functions.returnPageName = (filename) => {
  return functions.nameWithoutExt(filename.path.replace(filename.base, ``)
    .replace(/\\/g, `/`)).slice(1);
};
