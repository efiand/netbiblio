'use strict';
// Начинается ли строка с фрагмента

const { functions } = require(`../store`);

functions.isBeginnedBy = (string, fragment) => {
  return string.indexOf(fragment) === 0;
};
