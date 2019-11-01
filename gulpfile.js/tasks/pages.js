'use strict';

const { gulp, plugins, functions, settings } = require(`../store`);

// Получение списка всех страниц проекта
gulp.task(`pages`, () => {
  settings.pages = [];

  return gulp.src(settings.tasks.html.src.compile, { read: false })
    .pipe(plugins.plumber())
    .pipe(plugins.data((filename) => {
      settings.pages.push(functions.returnPageName(filename));
    }));
});
