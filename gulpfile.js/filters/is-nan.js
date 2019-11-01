'use strict';
// Яаляется ли значение не числом

const { filters } = require(`../store`);

filters.isNaN = (num) => {
  return isNaN(parseInt(num, 10));
};
