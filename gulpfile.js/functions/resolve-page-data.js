'use strict';
// Функция, отправляющая настройки в шаблон текущей страницы при компиляции HTML

const { functions } = require(`../store`);

functions.resolvePageData = (filename, funcs, settings) => {
  const date = new Date();
  const day = funcs.outputWithLeadZero(date.getDate());
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
    today: `${day}.${month}.${date.getFullYear()}`
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
