'use strict';
// Минификация JSON и JSON-LD

const { filters } = require(`../store`);

filters.minifyJson = (code) => {
  return code.trim().replace(/({|:|,)\s+/g, `$1`).replace(/\s+}/g, `}`);
};
