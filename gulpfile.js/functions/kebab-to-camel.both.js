'use strict';

const { functions } = require(`../store`);

functions.kebabToCamel = (string) => {
  return string.replace(/\-([a-z]{1})/g, (matches, pattern) => {
    return pattern.toUpperCase();
  });
};
