'use strict';
// Нахождение пути к корню относительно текущего

const { functions } = require(`../store`);

functions.getRoot = (path) => {
  const slashCount = (path.match(/\//g) || []).length;

  let root = ``;
  for (let i = 0; i < slashCount; i++) {
    root += `../`;
  }

  return root;
};
