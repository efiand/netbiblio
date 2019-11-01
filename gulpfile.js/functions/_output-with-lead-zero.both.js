'use strict';

const { functions } = require(`../store`);

functions.outputWithLeadZero = (num) => {
  return `${+num < 10 ? `0` : ``}${num}`;
};
