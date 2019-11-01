'use strict';
// Удаление протокола HTTP(S) из URL

const { filters } = require(`../store`);

filters.noProtocol = (url) => {
  return url.replace(/^(http(s)?:)?\/\//, ``);
};
