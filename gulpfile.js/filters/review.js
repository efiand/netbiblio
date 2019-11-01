'use strict';
// Форматирование отзыва

const { filters, functions } = require(`../store`);

filters.review = (message, name, url, datetime, mode = ``, rawFlag = false) => {
  if (/@/.test(url)) {
    url = `mailto:${url}`;
  } else if (!/\//.test(url)) {

    // Ссылка без слэшей - никнейм автора
    url = `/${url}/index.html`;
  } else if (/\/\//.test(url)) {

    // Двойной слэш - признак внешней ссылки
    url = `${url}" rel="nofollow`;
  }

  const date = datetime.split(` `);
  return `
  <div class="reviews__item ${mode ? ` reviews__item--${mode}` : ``}">
    <a class="reviews__name page__author-link" href="${url}">${name}</a>
    <time class="reviews__date" datetime="${functions.dateToUtc(date[0], 3, date[1])}">(${datetime})</time>
    <div class="reviews__body art__ins ${rawFlag ? `` : ` art__prose`}">
      ${rawFlag ? message : functions.formatProse(message)}
    </div>
  </div>`;
};
