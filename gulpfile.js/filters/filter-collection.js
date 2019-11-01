'use strict';
// Фильтрует коллекцию по общему префиксу

const { filters } = require(`../store`);

filters.filterCollection = (list, prefix) => {
  // Начальный счетчик серии
  let i = 0;

  // Массив, в который будут собираться только элементы с общим префиксом
  let collection = [];

  // Проверка наличия элемента с указанным индексом
  const findItem = (index) => {
    let target = list.find((item) => {
      return item.split(`/`)[1] === `${prefix}-${index}`;
    });

    if (target) {
      collection.push(target);
      i++;
    } else {
      i = 0;
    }
  };

  // Добавление нулевой страницы, если есть
  findItem(0);
  i = 1;

  while (i) {
    findItem(i);
  }

  return collection.length ? collection : list;
};
