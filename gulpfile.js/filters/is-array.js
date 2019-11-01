'use strict';
// Является ли значение массивом

const { filters } = require(`../store`);

filters.isArray = (variable) => {
  return Array.isArray(variable);
};
