'use strict';
// Функция, отправляющая настройки в шаблон текущей страницы при компиляции HTML

const { functions } = require(`../store`);

functions.resolvePageData = (filename, funcs, settings) => {
  const date = new Date();
  const dateDay = date.getDate();
  const day = funcs.outputWithLeadZero(dateDay);
  const month = funcs.outputWithLeadZero(date.getMonth() + 1);

  const page = funcs.returnPageName(filename);

  const config = {
    isDev: settings.isDev,
    ...settings.project,
    ...settings.layout,
    page,
    pages: [],
    setTitle(object, value) {
      object.title = value;
    },
    today: `${day}.${month}.${date.getFullYear()}`,
    isNewYear: (month === `12` && dateDay > 24) || (month === `01` && dateDay < 15)
  };

  // Авторские страницы - индексные в подкаталогах
  if (page.slice(-6) === `/index`) {
    config.pageType = `author`;

    // Список произведений автора (с натуральной сортировкой для последующего вывода в сборники)
    config.pages = settings.pages.filter((item) => {
      const slashPos = item.indexOf(`/`);
      const isAuthorPrefix = (item.slice(0, slashPos) === page.slice(0, page.indexOf(`/`)));

      return isAuthorPrefix && (item.slice(slashPos) !== `/index`);
    });
  } else if (page === `index`) {

    // Список авторов на главной странице
    settings.pages.filter((item) => {
      return item.slice(item.indexOf(`/`)) === `/index`;
    }).forEach((item) => {

      // Передача объектом, чтобы задать свойство title, шаблонизатор его заполнит
      config.pages.push({
        page: item,
        title: ``
      });
    });
  }

  return config;
};
