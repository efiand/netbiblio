'use strict';
// Замена пути к корню в инлайновом CSS, сделанном из обычного для AMP-страниц

const { filters, functions } = require(`../store`);

filters.prepareInlineCss = (code, page) => {
  return code.replace(/url\(\.\.\//g, `url(${functions.getRoot(page)}`)
    .replace(/^\s*@charset "UTF-8";/, ``);
};
