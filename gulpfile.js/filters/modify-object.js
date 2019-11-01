'use strict';
// Модификация объекта

const { filters } = require(`../store`);

filters.modifyObject = (object, key, value) => {
  object[key] = value;
  return object;
};
