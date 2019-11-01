'use strict';
// Заканчивается ли строка фрагментом

const { functions } = require(`../store`);

functions.isEndedBy = (string, fragment) => {
  return new RegExp(`${fragment}$`).test(string);
};
